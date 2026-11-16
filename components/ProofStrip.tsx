import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";
import { CASE_STUDY_PATH } from "@/lib/site";
import { projects } from "@/data/projects";

/** Proof directly under the hero: the lead client, then the rest of the work. */
export default function ProofStrip() {
  return (
    <section className="proof" aria-label="Client work">
      <Reveal className="container proof__inner" delay={0}>
        <p className="proof__line">
          <span className="eyebrow">Built for</span>
          <span className="proof__name">
            American Prep Academy, Washington, DC
          </span>
          <span className="proof__type">K–12 tutoring provider</span>
        </p>
        <Link className="proj-link proof__link" href={CASE_STUDY_PATH}>
          Case study
          <ArrowRight size={14} />
        </Link>
      </Reveal>
      <div className="container">
        <Reveal className="proof__more" delay={100}>
          <span className="eyebrow">Also built</span>
          <ul className="proof__list">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href="/#work">{p.name}</Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
