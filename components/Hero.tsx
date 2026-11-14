import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Parallax from "./Parallax";
import Magnetic from "./Magnetic";
import HeroParticles from "./HeroParticles";
import CtaLink from "./CtaLink";
import { ArrowRight, ArrowDown } from "./icons";
import { BOOKING_URL } from "@/lib/site";

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Interactive 3D particle logo — decorative canvas, client-only */}
      <HeroParticles />

      {/* Oversized ghost wordmark, drifting on scroll */}
      <div className="hero__ghost" aria-hidden="true">
        <Parallax distance={70}>
          <span>APEXHUB</span>
        </Parallax>
      </div>

      <div className="container hero__inner">
        <Reveal className="hero__kicker" delay={80}>
          <span className="eyebrow">
            <span className="hero__kicker-mark">(01)</span> Build. Transform.
            Innovate.
          </span>
        </Reveal>

        <SplitText
          as="h1"
          text="We build websites and business systems for US businesses, from Addis Ababa."
          highlight="US businesses"
          className="head hero__title"
          stagger={0.04}
        />

        <div className="hero__foot">
          <Reveal as="p" className="lead hero__lead" delay={520}>
            We help organizations build their digital presence, create the
            systems they need, bring software ideas to life, and turn innovation
            into real-world solutions.
          </Reveal>

          <Reveal className="hero__cta" delay={620}>
            <Magnetic strength={0.35}>
              <CtaLink
                className="btn"
                href={BOOKING_URL}
                ctaLabel="Book a free discovery call"
                ctaLocation="hero"
              >
                Book a free discovery call <ArrowRight />
              </CtaLink>
            </Magnetic>
            <Magnetic strength={0.35}>
              <CtaLink
                className="btn btn--ghost"
                href="/#work"
                ctaLabel="See the work"
                ctaLocation="hero"
              >
                See the work <ArrowRight />
              </CtaLink>
            </Magnetic>
          </Reveal>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <ArrowDown />
      </div>
    </section>
  );
}
