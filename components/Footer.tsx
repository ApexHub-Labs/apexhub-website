import Image from "next/image";
import Reveal from "./Reveal";
import CtaLink from "./CtaLink";
import SiteLink from "./SiteLink";
import { ArrowUpRight } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <Reveal className="footer__cta" delay={0}>
          <CtaLink
            href="/#contact"
            className="footer__cta-link"
            ctaLabel="Start the Conversation"
            ctaLocation="footer"
          >
            <span className="footer__cta-kicker eyebrow">Let&apos;s build</span>
            <span className="head footer__cta-title">
              Start the Conversation
              <ArrowUpRight size={48} />
            </span>
          </CtaLink>
        </Reveal>

        <div className="footer__mark">
          <Image
            src="/logo-green.png"
            alt="ApexHub Labs logo"
            width={2573}
            height={542}
            className="footer__logo"
          />
        </div>

        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <p className="footer__tag head">Build. Transform. Innovate.</p>
            <p className="footer__desc">
              Digital innovation &amp; transformation partner. Ethiopia &amp;
              international.
            </p>
          </div>

          <nav className="footer__col" aria-label="Sitemap">
            <span className="footer__col-head eyebrow">Index</span>
            <SiteLink href="/#services">Services</SiteLink>
            <SiteLink href="/#pricing">Pricing</SiteLink>
            <SiteLink href="/#work">Work</SiteLink>
            <SiteLink href="/#about">About</SiteLink>
            <SiteLink href="/#contact">Contact</SiteLink>
          </nav>

          <nav className="footer__col" aria-label="Social">
            <span className="footer__col-head eyebrow">Connect</span>
            <a
              href="https://www.linkedin.com/company/apexhub-labs"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.facebook.com/apexhublabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook <ArrowUpRight size={14} />
            </a>
            <a href="mailto:hello@apexhublabs.com">
              Email <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>

        <div className="footer__bottom">
          <span>© {year} ApexHub Labs. All rights reserved.</span>
          <span>Build. Transform. Innovate.</span>
        </div>
      </div>
    </footer>
  );
}
