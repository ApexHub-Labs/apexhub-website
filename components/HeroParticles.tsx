"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

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
  return (
    <ApexParticleLogo
      className="hero__particles"
      particleStyle="star"
      placement="auto"
    />
  );
}
