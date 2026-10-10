"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { ProjectImage } from "@/data/projects";

const figVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 44 : -44 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -44 : 44 }),
};

/** Accessible image gallery: arrow keys + Esc, focus trap, body scroll lock,
 *  animated open + slide transitions, portaled to <body>. */
export default function Lightbox({
  images,
  startIndex,
  title,
  onClose,
}: {
  images: ProjectImage[];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [i, setI] = useState(startIndex);
  const dir = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => {
    dir.current = -1;
    setI((v) => (v - 1 + images.length) % images.length);
  }, [images.length]);
  const next = useCallback(() => {
    dir.current = 1;
    setI((v) => (v + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "Tab") {
        const root = rootRef.current;
        if (!root) return;
        const f = root.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() =>
      rootRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus()
    );

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
    };
  }, [onClose, prev, next]);

  const img = images[i];

  return createPortal(
    <div
      ref={rootRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — screenshots`}
    >
      <motion.div
        className="lightbox__backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />

      <div className="lightbox__bar">
        <span className="lightbox__count" aria-live="polite">
          {i + 1} / {images.length}
        </span>
        <button
          data-autofocus
          className="lightbox__close"
          onClick={onClose}
          aria-label="Close gallery"
        >
          ✕
        </button>
      </div>

      {images.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={prev}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      <div className="lightbox__figwrap">
        <AnimatePresence mode="wait" custom={dir.current}>
          <motion.figure
            key={img.src}
            className="lightbox__figure"
            custom={dir.current}
            variants={figVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 900px) 92vw, 1400px"
              quality={95}
              className="lightbox__img"
              priority
            />
            <figcaption className="lightbox__cap">{img.alt}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={next}
          aria-label="Next image"
        >
          ›
        </button>
      )}
    </div>,
    document.body
  );
}
