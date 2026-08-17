"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { ArrowUpRight } from "./icons";

type Project = {
  title: string;
  tag: string;
  monogram: string;
  year: string;
  /** Drop a screenshot at /public/work/<file> and set it here to replace the
   *  typographic placeholder. Left undefined until real assets are available. */
  image?: string;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    title: "American Prep Academy",
    tag: "Website Development",
    monogram: "APA",
    year: "Education",
  },
  {
    title: "American Prep Academy",
    tag: "LMS Development",
    monogram: "LMS",
    year: "Education",
  },
  {
    title: "SafeLight Initiative",
    tag: "Digital Presence & Website",
    monogram: "SL",
    year: "Non-Profit",
  },
];

export default function FeaturedWork() {
  const [hovered, setHovered] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 200, damping: 22, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  const active = hovered !== null ? PROJECTS[hovered] : null;

  return (
    <section className="section work" id="work">
      <div className="container">
        <div className="sec-head">
          <div className="sec-head__lead">
            <Reveal className="eyebrow" delay={0}>
              03 — Selected Projects
            </Reveal>
            <SplitText
              as="h2"
              text="Featured Work"
              className="head sec-head__title"
            />
          </div>
          <Reveal as="p" className="sec-head__note" delay={120}>
            A sample of what we&apos;ve built with the organizations we partner
            with.
          </Reveal>
        </div>

        <div className="work-index" onMouseMove={onMove}>
          {/* Cursor-following preview */}
          <motion.div
            className="work-preview"
            aria-hidden="true"
            style={{ x, y }}
            animate={{
              opacity: active ? 1 : 0,
              scale: active ? 1 : 0.85,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="work-preview__inner">
              {active?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.image} alt="" />
              ) : (
                <span className="work-preview__monogram">
                  {active?.monogram}
                </span>
              )}
            </div>
          </motion.div>

          {PROJECTS.map((p, i) => {
            const Tag = p.href ? "a" : "div";
            return (
              <Reveal key={`${p.title}-${p.tag}`} delay={i * 50} y={30}>
                <Tag
                  className="work-row"
                  data-dim={hovered !== null && hovered !== i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  {...(p.href
                    ? {
                        href: p.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                >
                  <span className="work-row__index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="work-row__title">{p.title}</span>
                  <span className="work-row__meta">
                    <span className="work-row__cat">{p.year}</span>
                    <span className="work-row__tag">{p.tag}</span>
                  </span>
                  <span className="work-row__icon" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </Tag>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
