# Prompt: add the 3D particle logo to the ApexHub Labs hero

Copy everything below the line into your AI coding assistant (Claude Code, Cursor, etc.) from the root of the website repo.

---

I'm adding an interactive 3D particle version of our logo to the hero section of the ApexHub Labs website (Next.js, deployed on Vercel). The component is already written and tested. Your job is to integrate it cleanly without changing how it looks or behaves.

## Files I'm giving you

1. `ApexParticleLogo.jsx`: a self-contained client component. It renders a canvas that builds a 3D particle model of our logo from the PNG at runtime, plus a background of floating glowing particles and small "atoms". It already handles device performance tiers, an automatic FPS-based downgrade, `prefers-reduced-motion` (renders one still frame), pausing when off-screen or when the tab is hidden, and full cleanup on unmount.
2. `public/apex-logo.png`: our logo (white mountains with grey shaded faces and the APEXHUB LABS wordmark, on a transparent background). The component samples this image, so it must be served as a static file.

## Steps

1. Install the dependency: `npm i three`.
2. Put the component at `components/ApexParticleLogo.jsx` (or this repo's components folder). If the project is TypeScript and `allowJs` is off, rename it to `.tsx` and add `// @ts-nocheck` at the top. Do not rewrite it.
3. Put the logo at `public/apex-logo.png`.
4. In the hero component, load it client-side only so three.js stays out of the initial bundle and server rendering:
   ```jsx
   import dynamic from 'next/dynamic';
   const ApexParticleLogo = dynamic(() => import('@/components/ApexParticleLogo'), {
     ssr: false,
     loading: () => null,
   });
   ```
5. Hero layout:
   - Make the hero section `position: relative`, at least full viewport height (`min-height: 100svh`), with `overflow: hidden`.
   - Give the hero a near-black background: `background: radial-gradient(ellipse 42% 48% at 70% 50%, rgba(38,50,140,0.11), transparent 72%), radial-gradient(ellipse 110% 90% at 50% 50%, #020309 0%, #000 70%);`. The canvas is transparent and the particles are drawn with additive light, so they need this dark stage.
   - Render `<ApexParticleLogo />` as the first child of the hero. It fills the hero with `position: absolute; inset: 0`.
   - Keep the existing hero text (the H1 "Build. Transform. Innovate.", paragraph and buttons) above it with `position: relative; z-index: 1`. Give the text container `pointer-events: none` and set `pointer-events: auto` back on links and buttons, so people can drag the logo everywhere except on the actual controls.
   - On wide screens the component draws the logo in the right half. On narrow screens it draws it bottom-center, so on mobile keep the hero text in the top part of the hero.
6. Keep SEO intact. The H1 and hero copy must stay real HTML text. The canvas is decoration plus interaction and does not replace any text.

## Props (defaults are the chosen design, don't change them unless I ask)

```jsx
<ApexParticleLogo
  logoSrc="/apex-logo.png"
  particleStyle="star"   // 'star' | 'atomic'
  spin={true}            // continuous 360° turn
  shimmer={false}        // twinkle + light sweep
  scatterOnClick={true}  // click scatters the logo and it rebuilds
  hoverScatter={true}    // particles near the cursor get pushed aside
  placement="auto"       // 'auto' | 'right' | 'center'
/>
```

There is also an optional `tier` prop ('high' | 'mid' | 'low' | 'static') to force a performance tier, and an `onStats` callback that reports `{ tier, count, fps }`. Use these only for debugging.

## Rules

- Don't modify the shader code, particle counts, colors or the model-building logic in the component.
- Don't add other animation libraries for this.
- Don't wrap it in anything that re-mounts it on every render. Re-mounting rebuilds the whole scene.
- If the site has a light theme, the hero stays dark in both themes.

## Check before you finish

- `npm run build` passes with no errors, and there are no hydration warnings in the console.
- On desktop: the logo assembles from particles, spins 360°, rotates when dragged, pushes particles away from the cursor on hover, and scatters then rebuilds on click.
- On a phone (or DevTools device mode): sideways swipes rotate the logo, vertical swipes still scroll the page, and the logo sits below the hero text.
- With "reduce motion" enabled in the OS, the logo shows as a still 3D frame with no animation.
- Scrolling the hero out of view pauses rendering. You can confirm this in the Performance panel.
- Lighthouse performance on mobile doesn't drop noticeably compared to before. three.js should load in its own chunk after the page is interactive.
