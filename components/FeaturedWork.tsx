"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { ArrowUpRight } from "./icons";

type Media = { type: "image" | "video"; src: string; poster?: string };

type Project = {
  title: string;
  tag: string;
  monogram: string;
  year: string;
  /** Drop a screenshot/clip at /public/work/<file> and set it here to replace
   *  the typographic placeholder. Left undefined until real assets exist. */
  media?: Media;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    title: "American Prep Academy",
    tag: "Website Development",
    monogram: "APA",
    year: "Education",
  },
  {
    title: "American Prep Academy",
    tag: "LMS Development",
    monogram: "LMS",
    year: "Education",
  },
  {
    title: "SafeLight Initiative",
    tag: "Digital Presence & Website",
    monogram: "SL",
    year: "Non-Profit",
  },
];

/** Renders project media, or the typographic placeholder until assets land. */
function CardMedia({ project }: { project: Project }) {
  if (project.media?.type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="work-card__img" src={project.media.src} alt="" />;
  }
  if (project.media?.type === "video") {
    return (
      <video
        className="work-card__img"
        src={project.media.src}
        poster={project.media.poster}
        muted
        loop
        autoPlay
        playsInline
      />
    );
  }
  return <span className="work-card__mono">{project.monogram}</span>;
}

function WorkCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // media drifts within its frame as the card passes the viewport
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.article
      ref={ref}
      className="work-card"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 48 }}
      viewport={{ once: false, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`${project.title} — ${project.tag}. Open preview.`}
    >
      <div className="work-card__frame">
        <motion.div className="work-card__media" style={{ y: mediaY }}>
          <CardMedia project={project} />
        </motion.div>
        <span className="work-card__open" aria-hidden="true">
          <ArrowUpRight />
        </span>
      </div>
      <div className="work-card__foot">
        <span className="work-card__index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="work-card__title">{project.title}</h3>
        <span className="work-card__meta">
          <span className="work-card__cat">{project.year}</span>
          <span className="work-card__tag">{project.tag}</span>
        </span>
      </div>
    </motion.article>
  );
}

function WorkModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="work-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} preview`}
    >
      <div className="work-modal__backdrop" />
      <motion.div
        className="work-modal__panel"
        initial={{ scale: 0.92, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="work-modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="work-modal__media">
          <CardMedia project={project} />
        </div>
        <div className="work-modal__info">
          <div>
            <span className="eyebrow">{project.year}</span>
            <h3 className="head work-modal__title">{project.title}</h3>
          </div>
          <span className="work-modal__tag">{project.tag}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedWork() {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <section className="section work" id="work">
      <div className="container">
        <div className="sec-head">
          <div className="sec-head__lead">
            <Reveal className="eyebrow" delay={0}>
              03 — Selected Projects
            </Reveal>
            <SplitText
              as="h2"
              text="Featured Work"
              className="head sec-head__title"
            />
          </div>
          <Reveal as="p" className="sec-head__note" delay={120}>
            A sample of what we&apos;ve built with the organizations we partner
            with.
          </Reveal>
        </div>

        <div className="work-grid">
          {PROJECTS.map((p, i) => (
            <WorkCard
              key={`${p.title}-${p.tag}`}
              project={p}
              index={i}
              onOpen={() => setOpen(i)}
            />
          ))}
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open !== null && (
              <WorkModal project={PROJECTS[open]} onClose={() => setOpen(null)} />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
