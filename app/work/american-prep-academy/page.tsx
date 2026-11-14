import type { Metadata } from "next";
import "../../sections.css";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import Magnetic from "@/components/Magnetic";
import CtaLink from "@/components/CtaLink";
import SiteLink from "@/components/SiteLink";
import CaseGallery from "@/components/CaseGallery";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { featured } from "@/data/projects";
import { BOOKING_URL, CASE_STUDY_PATH, SITE_URL } from "@/lib/site";

const TITLE = "American Prep Academy case study";
const DESCRIPTION =
  "How ApexHub Labs built the public website and the learning platform for American Prep Academy, a US K-12 tutoring provider based in Washington, DC.";
const CLIENT_URL = "https://americanprepacademy.com";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CASE_STUDY_PATH },
  // Nested fields are not merged with the root layout's, so restate them.
  openGraph: {
    type: "article",
    url: `${SITE_URL}${CASE_STUDY_PATH}`,
    title: `${TITLE} · ApexHub Labs`,
    description: DESCRIPTION,
    siteName: "ApexHub Labs",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "ApexHub Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · ApexHub Labs`,
    description: DESCRIPTION,
    images: ["/og.svg"],
  },
};

const PLATFORM_FEATURES = [
  "Student and teacher dashboards",
  "Timezone-aware session scheduling, so teachers and students each see sessions in their own local time",
  "Virtual classrooms",
  "An admin dashboard for students, teachers, programs, sessions, worksheets and files",
  "Program management",
  "Role-based login",
  "Online payments",
];

const TECHNOLOGY = ["Next.js", "PostgreSQL", "Microsoft Azure"];

const [website, platform] = featured.deliverables;

export default function AmericanPrepAcademyCaseStudy() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <article className="section case">
          <div className="container">
            <header className="case__head">
              <SiteLink className="proj-link case__back" href="/#work">
                ← All work
              </SiteLink>
              <Reveal className="eyebrow" delay={0}>
                Case study — Website and learning platform
              </Reveal>
              <SplitText
                as="h1"
                text="American Prep Academy"
                className="head sec-head__title"
              />
              <Reveal as="p" className="lead case__lead" delay={120}>
                American Prep Academy is a US K–12 tutoring provider based in
                Washington, DC. We built their public website and their learning
                platform.
              </Reveal>
            </header>

            <section className="case__block">
              <Reveal as="h2" className="eyebrow case__label" delay={0}>
                <span className="sec-num">01</span> — Solution
              </Reveal>
              <div className="case__body">
                <Reveal className="case__part" delay={80}>
                  <h3 className="case__title">Public website</h3>
                </Reveal>
                <CaseGallery
                  images={website.images}
                  title="American Prep Academy website"
                />

                <Reveal className="case__part case__part--next" delay={80}>
                  <h3 className="case__title">Learning platform</h3>
                  <ul className="case__list">
                    {PLATFORM_FEATURES.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Reveal>
                <CaseGallery
                  images={platform.images}
                  title="American Prep Academy learning platform"
                />
              </div>
            </section>

            <section className="case__block">
              <Reveal as="h2" className="eyebrow case__label" delay={0}>
                <span className="sec-num">02</span> — My role
              </Reveal>
              <Reveal className="case__body" delay={80}>
                <p className="case__statement">
                  Project Manager and Lead Software Developer, working with one
                  other developer.
                </p>
                <p className="case__byline">
                  Michael Behailu, Founder and Lead Engineer
                </p>
              </Reveal>
            </section>

            <section className="case__block">
              <Reveal as="h2" className="eyebrow case__label" delay={0}>
                <span className="sec-num">03</span> — Technology
              </Reveal>
              <Reveal className="case__body" delay={80}>
                <ul className="proj-tags case__tags">
                  {TECHNOLOGY.map((t) => (
                    <li key={t} className="proj-tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            <section className="case__block">
              <Reveal as="h2" className="eyebrow case__label" delay={0}>
                <span className="sec-num">04</span> — Outcome
              </Reveal>
              <Reveal className="case__body" delay={80}>
                <p className="case__statement">
                  The website and the platform are live.
                </p>
                <a
                  className="proj-link"
                  href={CLIENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  americanprepacademy.com
                  <ArrowUpRight size={16} />
                </a>
              </Reveal>
            </section>

            <Reveal className="case__cta" delay={0}>
              <Magnetic strength={0.35}>
                <CtaLink
                  className="btn"
                  href={BOOKING_URL}
                  ctaLabel="Book a call"
                  ctaLocation="case_study"
                >
                  Book a call <ArrowRight />
                </CtaLink>
              </Magnetic>
            </Reveal>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
