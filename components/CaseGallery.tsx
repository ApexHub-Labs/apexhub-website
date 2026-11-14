"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import { track } from "@/lib/analytics";
import type { ProjectImage } from "@/data/projects";

/** Screenshot grid for a case-study page. Every thumbnail opens the same
 *  lightbox the project cards use, starting on the image that was clicked. */
export default function CaseGallery({
  images,
  title,
}: {
  images: ProjectImage[];
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="case-gallery">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              className="proj-card__cover"
              onClick={() => {
                setOpen(i);
                track("project_gallery_open", { project_name: title });
              }}
              aria-label={`Open screenshot ${i + 1} of ${images.length}: ${img.alt}`}
            >
              {/* blurred fill so the frame reads full-bleed behind the full image */}
              <Image
                src={img.src}
                alt=""
                aria-hidden
                fill
                sizes="20vw"
                quality={75}
                className="proj-card__bg"
              />
              {/* the full, uncropped screenshot */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 720px) 50vw, (max-width: 1100px) 33vw, 24vw"
                quality={90}
                className="proj-card__img"
              />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Lightbox
          images={images}
          startIndex={open}
          title={title}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
