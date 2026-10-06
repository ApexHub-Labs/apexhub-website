import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Parallax from "./Parallax";
import ServicesSlider from "./ServicesSlider";

const PILLARS = [
  {
    num: "01",
    title: "Digital Presence",
    desc: "Websites, branding, social media, digital marketing, graphic design and video.",
  },
  {
    num: "02",
    title: "Business Systems",
    desc: "Information systems, LMS, CRM, ERP, automation and custom platforms.",
  },
  {
    num: "03",
    title: "Software Products",
    desc: "Web apps, mobile apps, SaaS, MVPs and AI-powered products.",
  },
  {
    num: "04",
    title: "Innovation",
    desc: "AI, automation, emerging technologies and ApexHub's own digital products.",
  },
];

export default function WhatWeBuild() {
  return (
    <section className="section section--light services" id="services">
      {/* Oversized outlined wordmark, drifting on scroll */}
      <div className="services__ghost" aria-hidden="true">
        <Parallax distance={110}>
          <span>APEXHUB</span>
        </Parallax>
      </div>

      <div className="container services__inner">
        <div className="sec-head">
          <div className="sec-head__lead">
            <Reveal className="eyebrow" delay={0}>
              02 — Capabilities
            </Reveal>
            <SplitText
              as="h2"
              text="What We Build"
              className="head sec-head__title"
            />
          </div>
          <Reveal as="p" className="sec-head__note" delay={120}>
            Four disciplines, one partner — from first impression to the systems
            and products that run the work.
          </Reveal>
        </div>

        <ServicesSlider items={PILLARS} />
        <p className="svc-hint" aria-hidden="true">
          Drag to explore →
        </p>
      </div>
    </section>
  );
}
