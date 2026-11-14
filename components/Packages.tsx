import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import CtaLink from "./CtaLink";
import { ArrowRight } from "./icons";
import { BOOKING_URL } from "@/lib/site";

// Starting prices in USD. `from: false` means the amount is the whole price.
const PACKAGES = [
  {
    num: "01",
    title: "Free Website Review",
    desc: "15-minute recorded video review with 3 to 5 concrete fixes.",
    amount: "Free",
    from: false,
  },
  {
    num: "02",
    title: "Landing Page",
    desc: "1 to 3 pages, custom design, contact or booking form, basic SEO.",
    amount: "$450",
    from: true,
  },
  {
    num: "03",
    title: "Business Website",
    desc: "5 to 7 pages, editable content, SEO basics, analytics.",
    amount: "$900",
    from: true,
  },
  {
    num: "04",
    title: "Learning Platform Lite",
    desc: "Student and teacher accounts, programs and content, session scheduling, admin dashboard.",
    amount: "$1,500",
    from: true,
  },
  {
    num: "05",
    title: "Booking / Client Portal",
    desc: "Accounts and roles, timezone-aware scheduling, online payments, admin dashboard.",
    amount: "$2,500",
    from: true,
  },
  {
    num: "06",
    title: "Learning Platform Standard",
    desc: "Lite plus payments, virtual classroom, progress tracking, cloud deployment.",
    amount: "$3,500",
    from: true,
  },
];

const CARE_PLANS = [
  {
    amount: "$75",
    desc: "Monitoring, updates, backups, small changes.",
  },
  {
    amount: "$200",
    desc: "Adds up to 5 hours of changes, a monthly report, priority response.",
  },
];

export default function Packages() {
  return (
    <section className="section packages" id="pricing">
      <div className="container">
        <div className="sec-head">
          <div className="sec-head__lead">
            <Reveal className="eyebrow" delay={0}>
              <span className="sec-num">03</span> — Packages
            </Reveal>
            <SplitText
              as="h2"
              text="US-quality products at offshore prices"
              className="head sec-head__title"
              stagger={0.045}
            />
          </div>
          <Reveal as="p" className="sec-head__note" delay={120}>
            Starting prices, in US dollars.
          </Reveal>
        </div>

        <div className="pkg-grid">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.num} className="pkg-cell" delay={(i % 3) * 90}>
              <article className="svc-card">
                <span className="svc-card__num">{p.num}</span>
                <h3 className="svc-card__title">{p.title}</h3>
                <p className="svc-card__desc">{p.desc}</p>
                <p className="pkg-price">
                  {p.from && <span className="pkg-price__from">From</span>}
                  <span className="pkg-price__amount">{p.amount}</span>
                </p>
              </article>
            </Reveal>
          ))}

          <Reveal className="pkg-cell pkg-cell--wide" delay={0}>
            <article className="svc-card">
              <span className="svc-card__num">07</span>
              <h3 className="svc-card__title">Care Plans</h3>
              <div className="pkg-plans">
                {CARE_PLANS.map((plan) => (
                  <div key={plan.amount} className="pkg-plan">
                    <p className="pkg-price">
                      <span className="pkg-price__amount">{plan.amount}</span>
                      <span className="pkg-price__from">per month</span>
                    </p>
                    <p className="svc-card__desc">{plan.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal className="pkg-foot" delay={0}>
          <Magnetic strength={0.35}>
            <CtaLink
              className="btn"
              href={BOOKING_URL}
              ctaLabel="Book a free discovery call"
              ctaLocation="packages"
            >
              Book a free discovery call <ArrowRight />
            </CtaLink>
          </Magnetic>
          <p className="pkg-foot__note">
            Final quote after a free 20-minute discovery call.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
