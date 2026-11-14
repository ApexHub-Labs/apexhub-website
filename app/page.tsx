import "./sections.css";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import Marquee from "@/components/Marquee";
import WhatWeBuild from "@/components/WhatWeBuild";
import Packages from "@/components/Packages";
import FeaturedWork from "@/components/FeaturedWork";
import ScrollStage from "@/components/ScrollStage";
import Approach from "@/components/Approach";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const MARQUEE = [
  "Business Systems",
  "Software Products",
  "Digital Presence",
  "Innovation",
  "Web",
  "Mobile",
  "SaaS",
  "AI",
  "Automation",
  "Branding",
];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Marquee items={MARQUEE} />
        <ScrollStage>
          <WhatWeBuild />
        </ScrollStage>
        <Packages />
        <FeaturedWork />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
