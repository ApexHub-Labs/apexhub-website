import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";
import { CASE_STUDY_PATH } from "@/lib/site";

/** One line of proof directly under the hero: who we delivered for, and where. */
export default function ProofStrip() {
  return (
    <section className="proof" aria-label="Client work">
      <Reveal className="container proof__inner" delay={0}>
        <p className="proof__line">
          <span className="eyebrow">Built for</span>
          <span className="proof__name">
            American Prep Academy, Washington, DC
          </span>
          <span className="proof__type">US K–12 tutoring provider</span>
        </p>
        <Link className="proj-link proof__link" href={CASE_STUDY_PATH}>
          Case study
          <ArrowRight size={14} />
        </Link>
      </Reveal>
    </section>
  );
}
