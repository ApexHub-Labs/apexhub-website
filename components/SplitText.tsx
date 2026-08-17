"use client";

import { motion, type Variants } from "motion/react";

type SplitTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** delay before the whole line starts (seconds) */
  delay?: number;
  /** per-word stagger (seconds) */
  stagger?: number;
  once?: boolean;
};

/**
 * Editorial word-by-word mask reveal: each word sits in an overflow-hidden
 * clip and rises into place with a stagger. Used for large display headings.
 */
export default function SplitText({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.055,
  once = true,
}: SplitTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { y: "115%" },
    visible: {
      y: "0%",
      transition: { duration: 0.9, ease: [0.65, 0.05, 0, 1] },
    },
  };

  const Tag = motion[as] as typeof motion.span;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      variants={container}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden="true"
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          <motion.span
            variants={word}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
