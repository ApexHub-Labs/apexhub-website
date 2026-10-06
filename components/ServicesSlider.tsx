"use client";

import { useRef } from "react";
import { ArrowUpRight } from "./icons";

type Pillar = { num: string; title: string; desc: string };

/** Minimal horizontal slider: drag with the mouse, swipe on touch, or scroll
 *  the track directly. Snap settles the cards; snap is dropped mid-drag so the
 *  grab feels free. */
export default function ServicesSlider({ items }: { items: Pillar[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.dataset.dragging = "true";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.down = false;
    delete el.dataset.dragging;
  };

  return (
    <div
      ref={trackRef}
      className="svc-slider"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      {items.map((p) => (
        <article className="svc-card" key={p.num}>
          <span className="svc-card__num">{p.num}</span>
          <h3 className="svc-card__title">{p.title}</h3>
          <p className="svc-card__desc">{p.desc}</p>
          <span className="svc-card__icon" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </article>
      ))}
    </div>
  );
}
