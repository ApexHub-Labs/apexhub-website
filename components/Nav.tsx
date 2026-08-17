"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import { ArrowRight } from "./icons";

const LINKS = [
  { href: "#services", label: "Services", index: "01" },
  { href: "#work", label: "Work", index: "02" },
  { href: "#about", label: "About", index: "04" },
  { href: "#contact", label: "Contact", index: "06" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" aria-label="ApexHub Labs — home">
          <Image
            src="/logo-dark.png"
            alt="ApexHub Labs"
            width={2573}
            height={542}
            priority
          />
        </a>

        <nav aria-label="Primary" id="primary-nav">
          <ul className="nav__links" data-open={open}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  className="nav__link"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  <span className="nav__link-index">{link.index}</span>
                  <span className="nav__link-label">{link.label}</span>
                </a>
              </li>
            ))}
            <li className="nav__link--cta">
              <a
                className="btn"
                href="#contact"
                onClick={() => setOpen(false)}
              >
                Start a Project <ArrowRight />
              </a>
            </li>
          </ul>
        </nav>

        <div className="nav__cta--desktop">
          <Magnetic strength={0.4}>
            <a className="btn" href="#contact">
              Start a Project <ArrowRight />
            </a>
          </Magnetic>
        </div>

        <button
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
