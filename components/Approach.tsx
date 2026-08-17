"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

const STEPS = [
  { num: "01", name: "Discover", note: "Understand the goal, users and constraints." },
  { num: "02", name: "Design", note: "Shape the experience, system and interface." },
  { num: "03", name: "Build", note: "Engineer it — cleanly, reliably, at pace." },
  { num: "04", name: "Launch", note: "Ship to the world and measure what matters." },
  { num: "05", name: "Grow", note: "Iterate, scale and keep moving forward." },
];

export default function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section className="section approach" id="approach">
      <div className="container">
        <div className="sec-head">
          <div className="sec-head__lead">
            <Reveal className="eyebrow" delay={0}>
              04 — Process
            </Reveal>
            <SplitText
              as="h2"
              text="Our Approach"
              className="head sec-head__title"
            />
          </div>
          <Reveal as="p" className="sec-head__note" delay={120}>
            A clear, disciplined path from idea to impact — every engagement
            moves through the same five stages, sized to fit the work.
          </Reveal>
        </div>

        <div className="steps" ref={ref}>
          <div className="steps__track" aria-hidden="true">
            <motion.div className="steps__fill" style={{ scaleX }} />
          </div>
          {STEPS.map((s, i) => (
            <Reveal key={s.num} className="step" delay={i * 90} y={36}>
              <span className="step__num">{s.num}</span>
              <div className="step__dot" aria-hidden="true" />
              <div className="step__name">{s.name}</div>
              <p className="step__note">{s.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
