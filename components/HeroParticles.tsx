"use client";

import dynamic from "next/dynamic";
import { useRef, type ComponentType, type PointerEvent } from "react";
import { track } from "@/lib/analytics";

// Load the three.js particle logo on the client only, so three stays out of the
// initial bundle and off the server render. `ssr: false` requires this to live
// in a Client Component (not allowed in a Server Component like Hero).
//
// The artifact is a .jsx file, so TS infers its props from the function
// signature and treats props without a default (tier/onStats/style) as
// required. They're all optional by design, so we type the loaded component
// with just the prop we actually pass.
const ApexParticleLogo = dynamic(() => import("@/components/ApexParticleLogo"), {
  ssr: false,
  loading: () => null,
}) as unknown as ComponentType<{
  className?: string;
  particleStyle?: "star" | "atomic";
  placement?: "auto" | "right" | "center";
}>;

export default function HeroParticles() {
  // Fire hero_logo_interact once per page view. We listen on a wrapper (the
  // canvas lives inside ApexParticleLogo, which we don't touch) in the capture
  // phase so it runs regardless of the canvas's own pointer handlers. A drag
  // vs. click is told apart by how far the pointer moved between down and up,
  // mirroring the logo's own 6px threshold.
  const fired = useRef(false);
  const start = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: PointerEvent) => {
    if (fired.current || !start.current) return;
    const moved =
      Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) > 6;
    fired.current = true;
    track("hero_logo_interact", { interaction: moved ? "drag" : "click" });
  };

  return (
    <div
      className="hero__particles-wrap"
      onPointerDownCapture={onPointerDown}
      onPointerUpCapture={onPointerUp}
    >
      <ApexParticleLogo
        className="hero__particles"
        particleStyle="star"
        placement="auto"
      />
    </div>
  );
}
