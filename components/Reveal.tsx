"use client";

import { motion, type Variants } from "motion/react";

type MotionTag = keyof typeof motion;

type RevealProps = {
  children: React.ReactNode;
  as?: MotionTag;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Fades + slides content in when it scrolls into view.
 * Built on `motion` (framer-motion). Respects reduced-motion automatically
 * via MotionConfig / the CSS fallback in globals.css.
 */
export default function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "0px 0px -8% 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
