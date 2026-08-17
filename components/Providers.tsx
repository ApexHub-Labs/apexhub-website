"use client";

import { MotionConfig } from "motion/react";

/** App-wide motion config — honours the user's reduced-motion preference. */
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
