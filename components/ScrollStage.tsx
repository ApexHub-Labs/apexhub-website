"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "motion/react";

/** Wraps a section so it rises, scales up and un-rounds as it scrolls into
 *  view — a stacked-card transition between sections. Honors reduced-motion
 *  through the app-wide MotionConfig. */
export default function ScrollStage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  const style: MotionStyle = {
    scale,
    opacity,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    transformOrigin: "center top",
    overflow: "hidden",
    willChange: "transform",
  };

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
}
