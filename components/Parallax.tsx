"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** total travel in px across the element's scroll pass; +down, -up */
  distance?: number;
  as?: "div" | "span";
};

/** Moves content vertically as it passes through the viewport. */
export default function Parallax({
  children,
  className,
  distance = 80,
  as = "div",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(yRaw, { stiffness: 120, damping: 30, mass: 0.4 });

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag ref={ref} className={className} style={{ y }}>
      {children}
    </MotionTag>
  );
}
