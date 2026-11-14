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
  /** a phrase inside `text` to set on the highlighter mark (`.hl`); it stays
   *  together as one unit and rises like a single word */
  highlight?: string;
};

type Token = { text: string; mark?: boolean; tail?: string };

// Words, with the highlighted phrase (if any) kept whole. Punctuation that
// touches the phrase rides along as `tail`, outside the mark.
function tokenize(text: string, highlight?: string): Token[] {
  const words = (s: string) =>
    s
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ text: w }));
  const at = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || at < 0) return words(text);

  const rest = text.slice(at + highlight.length);
  const tail = rest.split(" ")[0];
  return [
    ...words(text.slice(0, at)),
    { text: highlight, mark: true, tail },
    ...words(rest.slice(tail.length)),
  ];
}

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
  highlight,
}: SplitTextProps) {
  const tokens = tokenize(text, highlight);

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
      {tokens.map((t, i) => (
        <span
          key={`${t.text}-${i}`}
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
            {t.mark ? (
              <>
                <span className="hl">{t.text}</span>
                {t.tail}
              </>
            ) : (
              t.text
            )}
            {i < tokens.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
