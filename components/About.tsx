import Image from "next/image";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="sec-head">
          <div className="sec-head__lead">
            <Reveal className="eyebrow" delay={0}>
              <span className="sec-num">06</span> — Who We Are
            </Reveal>
            <SplitText
              as="h2"
              text="About ApexHub Labs"
              className="head sec-head__title"
            />
          </div>
        </div>

        <div className="about__grid">
          <div className="about__statement">
            <SplitText
              as="p"
              text="We turn ideas and operational challenges into practical digital solutions."
              stagger={0.04}
            />
          </div>

          <Reveal className="about__body" delay={120}>
            <p>
              ApexHub Labs exists to help organizations move from where they are
              to where they want to be — closing the gap between an idea, an
              everyday operational challenge, and a working digital solution.
            </p>
            <p>
              We are a digital innovation and transformation partner, not simply
              a web-development agency. That means we look past the deliverable
              to the outcome: the presence that earns trust, the system that
              runs the work, the product that reaches people, and the innovation
              that moves an organization forward.
            </p>
            <p>
              We work with organizations in Ethiopia and internationally,
              bringing the same standard of craft and rigor to every engagement.
            </p>
          </Reveal>
        </div>

        <div className="about__grid founder">
          <Reveal className="founder__id" delay={0}>
            <div className="founder__photo">
              <Image
                src="/founder-michael-behailu.jpg"
                alt="Michael Behailu, founder of ApexHub Labs"
                width={1080}
                height={1350}
                sizes="(max-width: 820px) 60vw, 18vw"
              />
            </div>
            <div>
              <span className="eyebrow">Founder</span>
              <h3 className="founder__name">Michael Behailu</h3>
              <p className="founder__role">Founder and Lead Engineer</p>
            </div>
          </Reveal>
          <Reveal className="about__body" delay={120}>
            <p>
              Michael leads ApexHub Labs from Addis Ababa. He was project
              manager and lead software developer on the American Prep Academy
              website and learning platform.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
