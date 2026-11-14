"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import SiteLink from "./SiteLink";
import { track } from "@/lib/analytics";
import { ArrowRight } from "./icons";

// `index` is the number shown on that section's own label.
const LINKS = [
  { id: "services", label: "Services", index: "02" },
  { id: "pricing", label: "Pricing", index: "03" },
  { id: "work", label: "Work", index: "04" },
  { id: "about", label: "About", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: whichever section crosses the middle of the viewport is the
  // active nav item. Sections without a nav entry simply light nothing.
  useEffect(() => {
    if (pathname !== "/") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -55% 0px" }
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // On a project page, Work is where you are.
  const active =
    pathname === "/" ? section : pathname.startsWith("/work") ? "work" : null;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <div className="container nav__inner">
        <SiteLink
          href="/#top"
          className="nav__logo"
          aria-label="ApexHub Labs — home"
        >
          <Image
            src="/logo-dark.png"
            alt="ApexHub Labs"
            width={2573}
            height={542}
            priority
          />
        </SiteLink>

        <nav aria-label="Primary" id="primary-nav">
          <ul className="nav__links" data-open={open}>
            {LINKS.map((link) => (
              <li key={link.id}>
                <SiteLink
                  className="nav__link"
                  href={`/#${link.id}`}
                  aria-current={
                    active !== link.id
                      ? undefined
                      : pathname === "/"
                        ? "location"
                        : "true"
                  }
                  onClick={() => setOpen(false)}
                >
                  <span className="nav__link-index">{link.index}</span>
                  <span className="nav__link-label">{link.label}</span>
                </SiteLink>
              </li>
            ))}
            <li className="nav__link--cta">
              <SiteLink
                className="btn"
                href="/#contact"
                onClick={() => {
                  setOpen(false);
                  track("cta_click", {
                    cta_label: "Start a Project",
                    cta_location: "nav",
                  });
                }}
              >
                Start a Project <ArrowRight />
              </SiteLink>
            </li>
          </ul>
        </nav>

        <div className="nav__cta--desktop">
          <Magnetic strength={0.4}>
            <SiteLink
              className="btn"
              href="/#contact"
              onClick={() =>
                track("cta_click", {
                  cta_label: "Start a Project",
                  cta_location: "nav",
                })
              }
            >
              Start a Project <ArrowRight />
            </SiteLink>
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
