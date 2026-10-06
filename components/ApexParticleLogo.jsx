'use client';

/**
 * ApexParticleLogo
 * A 3D particle model of the ApexHub Labs logo, built from the logo PNG at runtime.
 *
 * - Star particles, continuous 360° spin, no shimmer (the chosen setup)
 * - Drag to rotate, hover pushes particles aside, click scatters and rebuilds
 * - Device tiers + live FPS downgrade; honors prefers-reduced-motion (renders a still frame)
 * - Pauses when off-screen or when the tab is hidden; cleans up fully on unmount
 *
 * Requires: npm i three
 * Load it client-side only, e.g. next/dynamic with { ssr: false }.
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const TIERS = {
  high:   { count: 22000, motes: 320, atoms: 6, pr: 2.5, size: 1.0 },
  mid:    { count: 11000, motes: 180, atoms: 4, pr: 1.5, size: 1.15 },
  low:    { count: 4500,  motes: 80,  atoms: 2, pr: 1,   size: 1.35 },
  static: { count: 11000, motes: 180, atoms: 4, pr: 1.5, size: 1.15 },
};

export default function ApexParticleLogo({
  logoSrc = '/apex-logo.png',
  particleStyle = 'star',     // 'star' | 'atomic'
  spin = true,                // continuous 360° turn; false = gentle sway facing front
  shimmer = false,            // twinkle + light sweep
  scatterOnClick = true,
  hoverScatter = true,
  placement = 'auto',         // 'auto' (right on wide screens, bottom-center on narrow) | 'right' | 'center'
  tier: forcedTier,           // optional: 'high' | 'mid' | 'low' | 'static'
  onStats,                    // optional: ({ tier, count, fps }) => void, for debugging
  className = '',
  style,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !wrapRef.current) return;
    let cleanup = () => {};
    try {
      cleanup = createScene(canvasRef.current, wrapRef.current, {
        logoSrc, particleStyle, spin, shimmer, scatterOnClick, hoverScatter, placement, forcedTier, onStats,
        onFail: () => setFailed(true),
      });
    } catch (e) {
      setFailed(true);
    }
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoSrc, particleStyle, spin, shimmer, scatterOnClick, hoverScatter, placement, forcedTier]);

  return (
    <div ref={wrapRef} className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}>
      {failed ? (
        <img
          src={logoSrc}
          alt="ApexHub Labs"
          style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', width: 'min(38%, 420px)', height: 'auto' }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="ApexHub Labs logo made of particles. Drag to rotate."
          style={{ display: 'block', width: '100%', height: '100%', touchAction: 'pan-y', cursor: 'grab' }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

const hex = h => { const n = parseInt(h.slice(1), 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; };

function hasWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }
  catch (e) { return false; }
}

function detectTier() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static';
  const cores = navigator.hardwareConcurrency || 4, mem = navigator.deviceMemory || 4;
  const mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
  if (cores <= 4 || mem <= 2) return mobile ? 'low' : 'mid';
  return mobile ? 'mid' : 'high';
}

/* Turn the logo image into a 3D point model.
   Mountains: each column's top edge is a ridge and the slopes fall away front and back,
   deeper under tall peaks. Wordmark: letters are extruded with front, back and side walls. */
async function buildModel(src, n) {
  const LOGO_W = 5.0, D_MAX = 0.62, T_TEXT = 0.12;
  const img = new Image(); img.crossOrigin = 'anonymous'; img.src = src; await img.decode();
  const K = 2, W = img.width * K, H = img.height * K;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d', { willReadFrequently: true }); ctx.drawImage(img, 0, 0, W, H);
  const d = ctx.getImageData(0, 0, W, H).data;
  const cls = new Uint8Array(W * H); // 0 empty, 1 light, 2 shaded face
  let minY = H, maxY = 0, minX = W, maxX = 0;
  for (let i = 0; i < W * H; i++) {
    if (d[i * 4 + 3] < 110) continue;
    const g = (d[i * 4] + d[i * 4 + 1] + d[i * 4 + 2]) / 3;
    cls[i] = g < 190 ? 2 : 1;
    const x = i % W, y = (i / W) | 0;
    if (y < minY) minY = y; if (y > maxY) maxY = y; if (x < minX) minX = x; if (x > maxX) maxX = x;
  }
  // split the mark from the wordmark at the widest empty band
  const rowCount = new Int32Array(H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (cls[y * W + x]) rowCount[y]++;
  let split = 0, bestLen = 0, run = 0;
  for (let y = minY; y <= maxY; y++) { if (!rowCount[y]) { run++; if (run > bestLen) { bestLen = run; split = y - (run >> 1); } } else run = 0; }
  const top = new Int32Array(W).fill(-1); let markBase = 0, markTop = H;
  for (let y = 0; y < split; y++) for (let x = 0; x < W; x++) if (cls[y * W + x]) {
    if (top[x] < 0) top[x] = y; if (y > markBase) markBase = y; if (y < markTop) markTop = y;
  }
  const isEdge = (x, y) => { const v = cls[y * W + x];
    return x === 0 || y === 0 || x === W - 1 || y === H - 1 ||
      cls[y * W + x - 1] !== v || cls[y * W + x + 1] !== v || cls[(y - 1) * W + x] !== v || cls[(y + 1) * W + x] !== v; };
  const mark = [], text = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const v = cls[y * W + x]; if (!v) continue;
    const e = isEdge(x, y) ? 1 : 0, list = y < split ? mark : text;
    // outlines and shaded faces carry the logo's shape, so they get most of the particles
    const copies = e ? 4 : v === 2 ? 2 : (Math.random() < 0.4 ? 1 : 0);
    for (let k = 0; k < copies; k++) list.push(x, y, v, e);
  }
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, S = LOGO_W / (maxX - minX);
  const out = new Float32Array(n * 3), kind = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const fromMark = i % 100 < 52;
    const list = fromMark ? mark : text, k = ((Math.random() * (list.length / 4)) | 0) * 4;
    const x = list[k], y = list[k + 1], v = list[k + 2], e = list[k + 3];
    let z;
    if (fromMark) {
      const colH = Math.max(1, markBase - top[x]);
      const frac = Math.min(1, Math.max(0, (y - top[x]) / colH));
      const hd = D_MAX * (colH / (markBase - markTop)) * Math.pow(frac, 0.8);
      z = Math.random() < 0.12 ? (Math.random() * 2 - 1) * hd : (Math.random() < 0.6 ? hd : -hd);
    } else {
      z = e && Math.random() < 0.35 ? (Math.random() * 2 - 1) * T_TEXT : (Math.random() < 0.62 ? T_TEXT : -T_TEXT);
    }
    out[i * 3] = (x + Math.random() - 0.5 - cx) * S;
    out[i * 3 + 1] = -(y + Math.random() - 0.5 - cy) * S;
    out[i * 3 + 2] = z + (Math.random() - 0.5) * 0.015;
    kind[i] = fromMark ? (v === 2 ? 2 : e ? 4 : 1) : (e ? 3 : 5); // 1 mtn fill, 2 shaded face, 3 letter edge, 4 mtn edge, 5 letter fill
  }
  return { out, kind, width: LOGO_W };
}

const STAR_VERT = `
  attribute float aSize; attribute vec3 aColor; attribute float aPhase; attribute float aSpike;
  uniform float uPR, uSize, uTime, uMaxSize, uScan, uCenterZ, uShimmer, uStyle; uniform vec3 uMouse;
  varying vec3 vColor; varying float vBright, vSpike, vRot, vPx;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * mix(1.0, 1.1, uStyle) * uSize * uPR * (6.0 / -mv.z), uMaxSize);
    vPx = gl_PointSize;
    gl_Position = projectionMatrix * mv;
    vColor = aColor; vSpike = aSpike; vRot = fract(aPhase * 3.71) * 0.7 - 0.35;
    float tw = mix(1.0, 0.7 + 0.3 * sin(uTime * (1.1 + fract(aPhase * 7.13) * 2.4) + aPhase * 6.2831), uShimmer);
    float scan = exp(-pow((position.x - uScan) * 3.0, 2.0)) * 1.7 * uShimmer;
    vec2 md = position.xy - uMouse.xy;
    float hover = exp(-dot(md, md) * 5.0);
    float depth = smoothstep(-0.7, 0.12, mv.z - uCenterZ);   // far side of the model is dimmer
    vBright = tw * (1.0 + scan + hover * 1.3) * mix(0.32, 1.0, depth);
  }`;

const STAR_FRAG = `
  varying vec3 vColor; varying float vBright, vSpike, vRot, vPx;
  uniform float uStyle;
  void main() {
    if (uStyle > 0.5) {   // atomic: crisp anti-aliased sphere with highlight and thin glow
      vec2 o = (gl_PointCoord - 0.5) * 2.0; float r = length(o); if (r > 1.0) discard;
      float aa = 2.4 / max(vPx, 1.0), rc = 0.3;
      float body = 1.0 - smoothstep(rc - aa, rc + aa, r);
      float shade = 0.72 + 0.28 * (1.0 - pow(r / rc, 2.0));
      vec2 so = o - vec2(-0.09, 0.09);
      float spec = exp(-dot(so, so) * 260.0) * 0.9;
      float glow = exp(-max(r - rc, 0.0) * 9.0) * 0.1 * (1.0 - body);
      float a = (body * shade + glow) * vBright * 0.4 * (1.0 - smoothstep(0.85, 1.0, r)) + spec * body * vBright * 0.35;
      if (a < 0.003) discard;
      gl_FragColor = vec4(mix(vColor, vec3(1.0), clamp(spec + body * 0.25, 0.0, 1.0)) * a, a);
      return;
    }
    // star: pin-sharp core, glow, light spikes; detail holds up at large sizes
    vec2 p = (gl_PointCoord - 0.5) * 2.0;
    float c = cos(vRot), s = sin(vRot); p = mat2(c, -s, s, c) * p;
    float d = length(p); if (d > 1.0) discard;
    float core = exp(-d * d * 170.0), corona = exp(-d * 9.0) * 0.34, halo = exp(-d * 3.0) * 0.05;
    float k = mix(50.0, 110.0, clamp(vPx / 140.0, 0.0, 1.0));
    float main = exp(-abs(p.x) * k) * exp(-abs(p.y) * 2.8) + exp(-abs(p.y) * k) * exp(-abs(p.x) * 2.8);
    vec2 q = mat2(0.7071, -0.7071, 0.7071, 0.7071) * p;
    float diag = (exp(-abs(q.x) * k * 1.4) * exp(-abs(q.y) * 6.5) + exp(-abs(q.y) * k * 1.4) * exp(-abs(q.x) * 6.5)) * 0.3;
    float spikes = (main + diag) * vSpike;
    float ring = exp(-pow((d - 0.2) * 30.0, 2.0)) * 0.07 * smoothstep(30.0, 90.0, vPx);
    float a = (core * 1.9 + corona + halo + spikes * 0.85 + ring) * vBright * (1.0 - smoothstep(0.72, 1.0, d));
    if (a < 0.003) discard;
    vec3 col = mix(vColor, vec3(1.0), clamp(core * 1.3 + spikes * 0.25, 0.0, 1.0)) + vec3(0.25, 0.4, 1.0) * ring * 4.0;
    gl_FragColor = vec4(col * a, a);
  }`;

const MOTE_VERT = `
  attribute float aSize; attribute vec3 aColor; attribute float aPhase;
  uniform float uPR, uSize, uTime, uMaxSize;
  varying vec3 vColor; varying float vBright, vBokeh;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float dist = -mv.z;
    gl_PointSize = min(aSize * uSize * uPR * (6.0 / dist), uMaxSize);
    gl_Position = projectionMatrix * mv;
    vColor = aColor;
    vBokeh = smoothstep(4.5, 1.8, dist);
    vBright = (0.6 + 0.4 * sin(uTime * (0.5 + fract(aPhase * 5.3) * 0.9) + aPhase * 6.2831)) * mix(1.0, 0.45, vBokeh);
  }`;

const MOTE_FRAG = `
  varying vec3 vColor; varying float vBright, vBokeh;
  void main() {
    vec2 p = (gl_PointCoord - 0.5) * 2.0; float d = length(p); if (d > 1.0) discard;
    float core = exp(-d * d * 22.0), glow = exp(-d * 4.2) * 0.4;
    float disc = (1.0 - smoothstep(0.6, 0.92, d)) * 0.16 + exp(-d * 3.0) * 0.08;
    float a = mix(core + glow, disc, vBokeh) * vBright;
    if (a < 0.003) discard;
    gl_FragColor = vec4(mix(vColor, vec3(1.0), core * 0.55 * (1.0 - vBokeh)) * a, a);
  }`;

function createScene(canvas, wrap, opts) {
  if (!hasWebGL()) { opts.onFail(); return () => {}; }

  const MAX = TIERS.high.count, MOTE_MAX = TIERS.high.motes, ATOM_MAX = TIERS.high.atoms;
  let tier = opts.forcedTier || detectTier();
  const auto = !opts.forcedTier;
  const prFor = t => Math.min(window.devicePixelRatio || 1, TIERS[t].pr);
  let disposed = false, target = null, logoW = 5.0;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  const gl = renderer.getContext();
  const maxPoint = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)[1] || 64;
  const scene = new THREE.Scene();
  const BASE_Z = 6;
  const camera = new THREE.PerspectiveCamera(50, 1, 0.05, 150);
  camera.position.z = BASE_Z;
  const group = new THREE.Group(); scene.add(group);

  const blend = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending };
  const starMat = new THREE.ShaderMaterial({
    uniforms: { uPR: { value: 1 }, uSize: { value: 1 }, uTime: { value: 0 }, uMaxSize: { value: maxPoint },
      uScan: { value: -99 }, uCenterZ: { value: -BASE_Z }, uShimmer: { value: opts.shimmer ? 1 : 0 },
      uStyle: { value: opts.particleStyle === 'atomic' ? 1 : 0 }, uMouse: { value: new THREE.Vector3(99, 99, 0) } },
    vertexShader: STAR_VERT, fragmentShader: STAR_FRAG, ...blend });
  const moteMat = new THREE.ShaderMaterial({
    uniforms: { uPR: { value: 1 }, uSize: { value: 1 }, uTime: { value: 0 }, uMaxSize: { value: maxPoint } },
    vertexShader: MOTE_VERT, fragmentShader: MOTE_FRAG, ...blend });
  const mats = [starMat, moteMat];
  const disposables = [starMat, moteMat];

  function attrGeo(n, withSpike) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(n), 1));
    g.setAttribute('aPhase', new THREE.BufferAttribute(new Float32Array(n), 1));
    if (withSpike) g.setAttribute('aSpike', new THREE.BufferAttribute(new Float32Array(n), 1));
    disposables.push(g);
    return g;
  }

  // --- logo particles
  const geo = attrGeo(MAX, true);
  const positions = geo.attributes.position.array, colors = geo.attributes.aColor.array;
  const sizes = geo.attributes.aSize.array, phase = geo.attributes.aPhase.array, spike = geo.attributes.aSpike.array;
  const vel = new Float32Array(MAX * 3), speed = new Float32Array(MAX), delay = new Float32Array(MAX), swirl = new Float32Array(MAX);
  for (let i = 0; i < MAX; i++) {
    const r = 6 + Math.random() * 8, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(ph) * Math.cos(th);
    positions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    positions[i * 3 + 2] = r * Math.cos(ph) - 4;
    const hero = Math.random() < 0.018;
    sizes[i] = hero ? 26 + Math.random() * 14 : 6 + Math.random() * 6;
    spike[i] = hero ? 1 : 0.15;
    phase[i] = Math.random() * Math.PI * 2;
    speed[i] = 0.03 + Math.random() * 0.045;
    swirl[i] = (Math.random() < 0.5 ? -1 : 1) * (0.35 + Math.random() * 0.6);
    delay[i] = Math.random() * 1.2;
  }
  function paint(kind) {
    const light = ['#ffffff', '#eef3ff', '#dbe6ff'].map(hex), shade = ['#5d74ff', '#7b63ff', '#4f8dff'].map(hex);
    const dims = { 1: 0.55, 2: 1.0, 3: 1.0, 4: 1.0, 5: 0.7 };
    for (let i = 0; i < MAX; i++) {
      const set = kind[i] === 2 ? shade : light, c = set[(Math.random() * set.length) | 0], dim = dims[kind[i]];
      colors[i * 3] = c[0] * dim; colors[i * 3 + 1] = c[1] * dim; colors[i * 3 + 2] = c[2] * dim;
    }
    geo.attributes.aColor.needsUpdate = true;
  }
  group.add(new THREE.Points(geo, starMat));

  // --- floating background particles
  const bg = new THREE.Group(); scene.add(bg);
  const moteGeo = attrGeo(MOTE_MAX, false);
  const mPos = moteGeo.attributes.position.array, mPhase = moteGeo.attributes.aPhase.array;
  const mBase = new Float32Array(MOTE_MAX * 3), mRise = new Float32Array(MOTE_MAX);
  {
    const pal = ['#9db8ff', '#b7a6ff', '#7fd4ff', '#dfe7ff'].map(hex);
    const col = moteGeo.attributes.aColor.array, sz = moteGeo.attributes.aSize.array;
    for (let i = 0; i < MOTE_MAX; i++) {
      const near = Math.random() < 0.06;
      mBase[i * 3] = (Math.random() - 0.5) * (near ? 14 : 60);
      mBase[i * 3 + 1] = (Math.random() - 0.5) * 44;
      mBase[i * 3 + 2] = near ? 1 + Math.random() * 2.5 : -4 - Math.random() * 34;
      mRise[i] = 0.04 + Math.random() * 0.12;
      const c = pal[(Math.random() * pal.length) | 0], dim = 0.35 + Math.random() * 0.5;
      col[i * 3] = c[0] * dim; col[i * 3 + 1] = c[1] * dim; col[i * 3 + 2] = c[2] * dim;
      sz[i] = near ? 40 + Math.random() * 40 : 22 + Math.random() * 46;
      mPhase[i] = Math.random() * Math.PI * 2;
    }
  }
  bg.add(new THREE.Points(moteGeo, moteMat));

  // --- atoms: glowing nucleus with electrons on tilted orbits
  const TRAIL = 12;
  const ringMat = new THREE.LineBasicMaterial({ color: 0x6a7cff, transparent: true, opacity: 0.09, blending: THREE.AdditiveBlending, depthWrite: false });
  disposables.push(ringMat);
  const atoms = [];
  for (let a = 0; a < ATOM_MAX; a++) {
    const g = new THREE.Group(), side = a % 2 ? 1 : -1;
    g.position.set(side * (5 + Math.random() * 11), (Math.random() - 0.5) * 12, -7 - Math.random() * 14);
    g.scale.setScalar(0.7 + Math.random() * 0.8);
    g.rotation.set(Math.random() * 3, Math.random() * 3, 0);
    const nuc = attrGeo(3, false);
    [[0, 0, 0], [0.07, 0.04, 0.02], [-0.05, -0.05, 0.03]].forEach((p, i) => {
      nuc.attributes.position.array.set(p, i * 3); nuc.attributes.aColor.array.set([0.75, 0.82, 1.0], i * 3);
      nuc.attributes.aSize.array[i] = 26 + i * 4; nuc.attributes.aPhase.array[i] = i * 2.1;
    });
    g.add(new THREE.Points(nuc, moteMat));
    const orbits = [];
    for (let o = 0; o < 3; o++) {
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(o * 1.05 + Math.random() * 0.3, o * 0.6, o * 0.4));
      const pts = []; for (let s = 0; s <= 96; s++) { const th = s / 96 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(th), Math.sin(th) * 0.36, 0).applyQuaternion(q)); }
      const lg = new THREE.BufferGeometry().setFromPoints(pts); disposables.push(lg);
      g.add(new THREE.Line(lg, ringMat));
      orbits.push({ q, speed: 1.2 + Math.random() * 1.4, phase: Math.random() * 6.28 });
    }
    const eGeo = attrGeo(3 * TRAIL, false);
    for (let i = 0; i < 3 * TRAIL; i++) { const f = Math.pow(1 - (i % TRAIL) / TRAIL, 1.6);
      eGeo.attributes.aColor.array.set([0.55 * f, 0.85 * f, 1.0 * f], i * 3);
      eGeo.attributes.aSize.array[i] = (i % TRAIL === 0 ? 22 : 14) * (0.4 + 0.6 * f); }
    eGeo.attributes.aPhase.array.fill(1.57);
    g.add(new THREE.Points(eGeo, moteMat));
    bg.add(g);
    atoms.push({ g, orbits, eGeo, spin: (Math.random() - 0.5) * 0.25, base: g.position.clone(), ph: Math.random() * 6.28 });
  }
  const tmpV = new THREE.Vector3();
  function updateAtoms(t) {
    for (const at of atoms) {
      if (!at.g.visible) continue;
      at.g.rotation.z += at.spin * 0.01;
      at.g.position.set(at.base.x + Math.sin(t * 0.11 + at.ph) * 0.8, at.base.y + Math.sin(t * 0.09 + at.ph * 2) * 0.6, at.base.z);
      const p = at.eGeo.attributes.position.array;
      at.orbits.forEach((o, oi) => {
        for (let j = 0; j < TRAIL; j++) {
          const th = t * o.speed + o.phase - j * 0.07;
          tmpV.set(Math.cos(th), Math.sin(th) * 0.36, 0).applyQuaternion(o.q);
          const k = (oi * TRAIL + j) * 3; p[k] = tmpV.x; p[k + 1] = tmpV.y; p[k + 2] = tmpV.z;
        }
      });
      at.eGeo.attributes.position.needsUpdate = true;
    }
  }
  function updateMotes(t) {
    const n = TIERS[tier].motes;
    for (let i = 0; i < n; i++) {
      const j = i * 3, ph = mPhase[i];
      mPos[j] = mBase[j] + Math.sin(t * 0.17 + ph) * 0.7;
      mPos[j + 1] = ((mBase[j + 1] + t * mRise[i] + 22) % 44 + 44) % 44 - 22;
      mPos[j + 2] = mBase[j + 2] + Math.cos(t * 0.13 + ph * 1.7) * 0.5;
    }
    moteGeo.attributes.position.needsUpdate = true;
  }

  // --- layout: logo sits to the right on wide containers, bottom-center on narrow ones
  let baseYaw = 0, baseTilt = 0;
  function layout() {
    const w = wrap.clientWidth || 1, h = wrap.clientHeight || 1;
    renderer.setPixelRatio(prFor(tier)); mats.forEach(m => (m.uniforms.uPR.value = prFor(tier)));
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const visH = 2 * BASE_Z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), visW = visH * camera.aspect;
    const wide = camera.aspect > 1.1;
    const mode = opts.placement === 'auto' ? (wide ? 'right' : 'bottom') : opts.placement;
    if (mode === 'right') { group.position.set(visW * 0.23, 0.05, 0); group.scale.setScalar(Math.min(0.92, (visW * 0.34) / logoW)); }
    else if (mode === 'center') { group.position.set(0, 0, 0); group.scale.setScalar(Math.min(1, (visW * 0.7) / logoW)); }
    else { group.position.set(0, -visH * 0.22, 0); group.scale.setScalar(Math.min(0.9, (visW * 0.86) / logoW)); }
    // turn the logo to face the camera, so its front reads cleanly
    baseYaw = -Math.atan2(group.position.x, BASE_Z); baseTilt = Math.atan2(group.position.y, BASE_Z);
  }

  let count = TIERS[tier].count;
  function applyTier(t) {
    tier = t; const cfg = TIERS[t]; count = cfg.count;
    mats.forEach(m => (m.uniforms.uSize.value = cfg.size));
    geo.setDrawRange(0, count); moteGeo.setDrawRange(0, cfg.motes);
    atoms.forEach((a, i) => (a.g.visible = i < cfg.atoms));
    layout();
    if (t === 'static') { positions.set(target); geo.attributes.position.needsUpdate = true; updateMotes(0); updateAtoms(0); renderStatic(); }
    else start();
    report(null);
  }

  // --- interaction
  let spinDir = 1, rotY = 0, rotX = 0, velY = 0, velX = 0, dragging = false, lastInteract = -99, moved = 0, lastX = 0, lastY = 0;
  const mouse = new THREE.Vector2(), mouseLocal = new THREE.Vector3(99, 99, 0);
  let mouseActive = false;
  const raycaster = new THREE.Raycaster(), localPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), inv = new THREE.Matrix4(), hit = new THREE.Vector3();
  // tiny clock (THREE.Clock is deprecated in newer three.js releases)
  const clock = { elapsedTime: 0, last: performance.now(),
    getDelta() { const n = performance.now(), d = (n - this.last) / 1000; this.last = n; this.elapsedTime += d; return d; } };

  const onDown = e => { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; velX = velY = 0;
    canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; };
  const onMove = e => {
    const r = canvas.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); mouseActive = true;
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    velY = dx * 0.009; velX = dy * 0.006; if (Math.abs(dx) > 1) spinDir = Math.sign(dx);
    rotY += velY; rotX = Math.max(-0.75, Math.min(0.75, rotX + velX));
    lastInteract = clock.elapsedTime;
    if (tier === 'static') renderStatic();
  };
  const onUp = e => {
    if (!dragging) return; dragging = false; canvas.style.cursor = 'grab';
    if (e.type === 'pointerup' && moved < 6 && tier !== 'static' && opts.scatterOnClick && target) scatter();
  };
  const onLeave = () => { if (!dragging) mouseActive = false; };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  canvas.addEventListener('pointerleave', onLeave);

  function updateMouse() {
    if (!mouseActive || !opts.hoverScatter) { mouseLocal.set(99, 99, 0); return; }
    raycaster.setFromCamera(mouse, camera);
    group.updateMatrixWorld(); inv.copy(group.matrixWorld).invert();
    const ray = raycaster.ray.clone().applyMatrix4(inv);
    if (ray.intersectPlane(localPlane, hit)) mouseLocal.copy(hit); else mouseLocal.set(99, 99, 0);
  }

  let pullStart = 0.2, swirlStart = 0.2;
  function scatter() {
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const j = i * 3, x = positions[j], y = positions[j + 1], z = positions[j + 2] + 0.3;
      const len = Math.hypot(x, y, z) || 1, f = 0.06 + Math.random() * 0.14;
      vel[j] = (x / len) * f + (Math.random() - 0.5) * 0.05;
      vel[j + 1] = (y / len) * f + (Math.random() - 0.5) * 0.05;
      vel[j + 2] = (z / len) * f + (Math.random() - 0.5) * 0.08;
      delay[i] = Math.random() * 0.6;
    }
    pullStart = t + 0.55; swirlStart = pullStart; lastInteract = t;
  }

  // --- animation
  let running = false, visible = true, rafId = 0;
  const centerV = new THREE.Vector3();
  function frame() {
    rafId = requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime, f = dt * 60;

    if (!dragging) {
      rotY += velY * f; rotX = Math.max(-0.75, Math.min(0.75, rotX + velX * f));
      velY *= Math.pow(0.95, f); velX *= Math.pow(0.9, f);
      if (opts.spin && t - lastInteract > 1.2) {
        rotY += spinDir * 0.32 * dt * Math.min(1, (t - lastInteract - 1.2) / 1.5);
        rotX += ((mouseActive ? -mouse.y * 0.14 : 0) + Math.sin(t * 0.27) * 0.08 - rotX) * 0.03 * f;
      } else if (!opts.spin && t - lastInteract > 2.5) {
        const front = Math.round(rotY / (Math.PI * 2)) * Math.PI * 2;
        rotY += (front + Math.sin(t * 0.35) * 0.42 - rotY) * 0.015 * f;
        rotX += ((mouseActive ? -mouse.y * 0.14 : 0) + Math.sin(t * 0.27) * 0.08 - rotX) * 0.03 * f;
      }
    }
    group.rotation.set(baseTilt + rotX, baseYaw + rotY, 0);
    updateMouse();

    const since = t - pullStart, swirlAmt = Math.max(0, 1 - (t - swirlStart) / 2.4);
    const R = 0.5, R2 = R * R, damp = Math.pow(0.93, f);
    for (let i = 0; i < count; i++) {
      const j = i * 3;
      let x = positions[j], y = positions[j + 1], z = positions[j + 2];
      x += vel[j] * f; y += vel[j + 1] * f; z += vel[j + 2] * f;
      vel[j] *= damp; vel[j + 1] *= damp; vel[j + 2] *= damp;
      if (since > delay[i]) {
        const p = phase[i];
        const tx = target[j] + Math.sin(t * 0.7 + p) * 0.008, ty = target[j + 1] + Math.cos(t * 0.6 + p * 1.3) * 0.008, tz = target[j + 2];
        const k = Math.min(speed[i] * f, 1), dx = tx - x, dy = ty - y, sw = swirl[i] * swirlAmt;
        x += dx * k - dy * k * sw; y += dy * k + dx * k * sw; z += (tz - z) * k;
      }
      // hover: particles near the cursor get pushed aside, then drift back
      const mx = x - mouseLocal.x, my = y - mouseLocal.y, d2 = mx * mx + my * my;
      if (!dragging && d2 < R2 && d2 > 1e-5) { const dd = Math.sqrt(d2), push = (1 - dd / R) * 0.06 * f; x += (mx / dd) * push; y += (my / dd) * push; }
      positions[j] = x; positions[j + 1] = y; positions[j + 2] = z;
    }
    geo.attributes.position.needsUpdate = true;

    const cyc = (t - 3) % 9, scanT = cyc / 1.8;
    starMat.uniforms.uScan.value = opts.shimmer && t > 3 && scanT < 1 ? -3.2 + scanT * 6.4 : -99;
    starMat.uniforms.uMouse.value.copy(mouseLocal);
    centerV.setFromMatrixPosition(group.matrixWorld).applyMatrix4(camera.matrixWorldInverse);
    starMat.uniforms.uCenterZ.value = centerV.z;
    mats.forEach(m => (m.uniforms.uTime.value = t));

    updateMotes(t); updateAtoms(t);
    bg.position.x += ((mouseActive ? -mouse.x * 0.7 : 0) - bg.position.x) * 0.02 * f;
    bg.position.y += ((mouseActive ? -mouse.y * 0.45 : 0) - bg.position.y) * 0.02 * f;

    renderer.render(scene, camera);
    trackFps(t);
  }
  function start() { if (disposed || running || !visible || tier === 'static' || !target) return; running = true; clock.getDelta(); frame(); }
  function stop() { running = false; cancelAnimationFrame(rafId); }
  function renderStatic() {
    stop(); group.rotation.set(baseTilt + rotX, baseYaw + rotY, 0); group.updateMatrixWorld();
    centerV.setFromMatrixPosition(group.matrixWorld).applyMatrix4(camera.matrixWorldInverse);
    starMat.uniforms.uCenterZ.value = centerV.z;
    renderer.render(scene, camera);
  }

  // --- live FPS monitor: steps down a tier if the device struggles
  let frames = 0, windowStart = 0, slowWindows = 0;
  function trackFps(t) {
    frames++; if (!windowStart) windowStart = t;
    if (t - windowStart < 1) return;
    const fps = frames / (t - windowStart); frames = 0; windowStart = t;
    if (auto && t > 3) {
      slowWindows = fps < (tier === 'high' ? 45 : 30) ? slowWindows + 1 : 0;
      if (slowWindows >= 2 && tier !== 'low') { slowWindows = 0; applyTier(tier === 'high' ? 'mid' : 'low'); }
    }
    report(fps);
  }
  function report(fps) { if (opts.onStats) opts.onStats({ tier, count, fps: fps ? Math.round(fps) : null }); }

  // --- pause off-screen / hidden tab, follow container size
  const onVis = () => { visible = !document.hidden; visible ? start() : stop(); };
  document.addEventListener('visibilitychange', onVis);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting && !document.hidden; visible ? start() : stop(); });
  io.observe(canvas);
  const ro = new ResizeObserver(() => { layout(); if (tier === 'static' && target) renderStatic(); });
  ro.observe(wrap);

  // --- boot
  buildModel(opts.logoSrc, MAX).then(({ out, kind, width }) => {
    if (disposed) return;
    target = out; logoW = width; paint(kind);
    applyTier(tier);
  }).catch(() => { if (!disposed) opts.onFail(); });

  return function cleanup() {
    disposed = true; stop();
    canvas.removeEventListener('pointerdown', onDown);
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerup', onUp);
    canvas.removeEventListener('pointercancel', onUp);
    canvas.removeEventListener('pointerleave', onLeave);
    document.removeEventListener('visibilitychange', onVis);
    io.disconnect(); ro.disconnect();
    disposables.forEach(d => d.dispose());
    renderer.dispose();
  };
}
