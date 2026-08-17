import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Parallax from "./Parallax";
import Magnetic from "./Magnetic";
import { ArrowRight, ArrowDown } from "./icons";

const CAPABILITIES = [
  { k: "01", v: "Digital Presence" },
  { k: "02", v: "Business Systems" },
  { k: "03", v: "Software Products" },
  { k: "04", v: "Innovation" },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Oversized ghost wordmark, drifting on scroll */}
      <div className="hero__ghost" aria-hidden="true">
        <Parallax distance={70}>
          <span>APEXHUB</span>
        </Parallax>
      </div>

      <div className="container hero__inner">
        <Reveal className="hero__kicker" delay={80}>
          <span className="eyebrow">
            <span className="hero__kicker-mark">(01)</span> Digital Innovation
            &amp; Transformation Studio
          </span>
        </Reveal>

        <h1 className="head hero__title">
          <SplitText as="span" text="Build." className="hero__line" />
          <SplitText
            as="span"
            text="Transform."
            className="hero__line"
            delay={0.12}
          />
          <SplitText
            as="span"
            text="Innovate."
            className="hero__line hero__line--muted"
            delay={0.24}
          />
        </h1>

        <div className="hero__foot">
          <Reveal as="p" className="lead hero__lead" delay={520}>
            We help organizations build their digital presence, create the
            systems they need, bring software ideas to life, and turn innovation
            into real-world solutions.
          </Reveal>

          <Reveal className="hero__cta" delay={620}>
            <Magnetic strength={0.35}>
              <a className="btn" href="#contact">
                Start a Project <ArrowRight />
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a className="btn btn--ghost" href="#work">
                Explore Our Work <ArrowRight />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal as="dl" className="hero__meta" delay={720}>
          {CAPABILITIES.map((c) => (
            <div key={c.k}>
              <dt>{c.k}</dt>
              <dd>{c.v}</dd>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <ArrowDown />
      </div>
    </section>
  );
}
