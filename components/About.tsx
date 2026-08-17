import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Parallax from "./Parallax";

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="about__ghost" aria-hidden="true">
        <Parallax distance={60}>
          <span>(A)</span>
        </Parallax>
      </div>

      <div className="container">
        <div className="sec-head">
          <div className="sec-head__lead">
            <Reveal className="eyebrow" delay={0}>
              05 — Who We Are
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
      </div>
    </section>
  );
}
