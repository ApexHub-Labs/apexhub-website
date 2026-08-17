import "./sections.css";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhatWeBuild from "@/components/WhatWeBuild";
import FeaturedWork from "@/components/FeaturedWork";
import Approach from "@/components/Approach";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const MARQUEE = [
  "Digital Presence",
  "Business Systems",
  "Software Products",
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
        <Marquee items={MARQUEE} />
        <WhatWeBuild />
        <FeaturedWork />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
