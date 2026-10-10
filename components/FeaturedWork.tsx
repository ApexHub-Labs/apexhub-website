"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { ArrowUpRight } from "./icons";
import {
  featured,
  projects,
  type Project,
  type ProjectImage,
  type ProjectLink,
} from "@/data/projects";

type OpenFn = (images: ProjectImage[], title: string) => void;

function LinkView({ link }: { link: ProjectLink | null }) {
  if (!link) return null;
  if (!link.href) {
    return <span className="proj-link proj-link--static">{link.label}</span>;
  }
  return (
    <a
      className="proj-link"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {link.label}
      <ArrowUpRight size={16} />
    </a>
  );
}

function ProjectCard({
  project,
  onOpen,
  heading = "h3",
  className = "",
  index = 0,
}: {
  project: Project;
  onOpen: OpenFn;
  heading?: "h3" | "h4";
  className?: string;
  index?: number;
}) {
  const cover = project.cover;
  const Heading = heading;
  return (
    <motion.article
      className={`proj-card ${className}`}
      initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index * 0.09, 0.4),
      }}
    >
      <button
        type="button"
        className="proj-card__cover"
        onClick={() => onOpen(project.images, project.name)}
        aria-label={`Open ${project.name} gallery, ${project.images.length} screenshots`}
      >
        {/* blurred fill so the frame reads full-bleed behind the full image */}
        <Image
          src={cover.src}
          alt=""
          aria-hidden
          fill
          sizes="20vw"
          quality={75}
          className="proj-card__bg"
        />
        {/* the full, uncropped screenshot */}
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 42vw"
          quality={90}
          className="proj-card__img"
        />
        {project.badge && (
          <span className="proj-card__badge">{project.badge}</span>
        )}
        <span className="proj-card__overlay" aria-hidden="true">
          <span className="proj-card__view">
            View gallery <ArrowUpRight size={16} />
          </span>
        </span>
      </button>

      <div className="proj-card__body">
        <Heading className="proj-card__name">{project.name}</Heading>
        <p className="proj-card__type">{project.type}</p>
        <p className="proj-card__summary">{project.summary}</p>
        <ul className="proj-tags">
          {project.tech.map((t) => (
            <li key={t} className="proj-tag">
              {t}
            </li>
          ))}
        </ul>
        <LinkView link={project.link} />
      </div>
    </motion.article>
  );
}

export default function FeaturedWork() {
  const [gallery, setGallery] = useState<{
    images: ProjectImage[];
    title: string;
  } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const onOpen: OpenFn = (images, title) => setGallery({ images, title });

  const INITIAL = 4;
  const visible = showAll ? projects : projects.slice(0, INITIAL);
  const remaining = projects.length - INITIAL;

  return (
    <section className="section projects" id="work">
      <div className="container">
        <header className="sec-head">
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
        </header>

        {/* Featured case study: American Prep Academy (website + platform) */}
        <article className="proj-feature">
          <div className="proj-feature__intro">
            <h3 className="proj-feature__name">{featured.name}</h3>
            <p className="proj-feature__type">{featured.type}</p>
            <p className="proj-feature__summary">{featured.summary}</p>
          </div>
          <div className="proj-feature__deliverables">
            {featured.deliverables.map((d, i) => (
              <ProjectCard
                key={d.slug}
                project={d}
                onOpen={onOpen}
                heading="h4"
                index={i}
              />
            ))}
          </div>
        </article>

        {/* Two per row; the rest reveal on demand */}
        <div className="proj-grid">
          {visible.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              onOpen={onOpen}
              index={i < INITIAL ? i : 0}
            />
          ))}
        </div>

        {!showAll && remaining > 0 && (
          <div className="proj-more">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setShowAll(true)}
            >
              More projects
              <span className="proj-more__count">({remaining})</span>
            </button>
          </div>
        )}
      </div>

      {gallery && (
        <Lightbox
          images={gallery.images}
          startIndex={0}
          title={gallery.title}
          onClose={() => setGallery(null)}
        />
      )}
    </section>
  );
}
