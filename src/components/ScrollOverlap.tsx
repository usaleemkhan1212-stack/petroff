"use client";

import { useEffect, useState, type ReactNode } from "react";

/** How far the wrapped section rides up over the one above, in px. */
const MAX_OVERLAP = 25;
/** The scroll distance over which it gets there. */
const TRAVEL = 120;

/**
 * How far the section has climbed for a given scroll position, rounded to
 * whole pixels: 25 steps over 120px of scroll is one step every 4.8px, which
 * reads as continuous at this size and caps the re-renders at 26 rather than
 * one per frame. Pulling a section up is a layout change, so the rounding is
 * what keeps it cheap.
 */
const overlapFor = (scrollY: number) =>
  Math.round(Math.min(Math.max(scrollY, 0) / TRAVEL, 1) * MAX_OVERLAP);

/**
 * Wraps a page's **second** section so that, as the reader scrolls, it climbs
 * up to 25px over the hero's bottom edge — the hero appears to lose that much
 * height and tuck underneath.
 *
 * **A negative `margin-top`, not a transform.** Everything below has to come
 * with it: a `translateY` would leave the sections after this one 20px too low
 * and open a gap above the footer. The margin makes the document itself 25px
 * shorter, which is exactly right.
 *
 * `relative z-10` is what lets the wrapped section's own ground paint over the
 * hero once the margin bites; the header sits at z-30, well clear. The section
 * being wrapped therefore needs an opaque background of its own.
 *
 * **Nothing moves under `prefers-reduced-motion: reduce`** — the effect
 * returns before it subscribes, so the margin stays 0.
 */
export function ScrollOverlap({ children }: { children: ReactNode }) {
  const [overlap, setOverlap] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setOverlap(overlapFor(window.scrollY));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative z-10" style={{ marginTop: -overlap }}>
      {children}
    </div>
  );
}
