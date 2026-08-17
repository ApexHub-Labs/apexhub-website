import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { ArrowUpRight } from "./icons";

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
    <section className="section" id="services">
      <div className="container">
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

        <div className="rows">
          {PILLARS.map((p, i) => (
            <Reveal key={p.num} className="row" delay={i * 60} y={40}>
              <span className="row__num">{p.num}</span>
              <h3 className="row__title">{p.title}</h3>
              <p className="row__desc">{p.desc}</p>
              <span className="row__icon" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
