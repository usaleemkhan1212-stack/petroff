"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The article-card rows, as a carousel below `lg` and the comp's grid at `lg`.
 *
 * Figma draws a pagination row under these grids, which only means anything if
 * the row can actually page — so the track is a carousel at **every** width:
 * one card per view on a phone, two from `sm`, and the comp's three from `lg`.
 * The dots page it wherever there is more than a viewful.
 *
 * The track is a **scroll container, not a transform** — the same call the
 * Bibliotheque's Vitrine makes — so it keeps working with a swipe, a
 * trackpad, the keyboard (it is a focusable `role="region"`) or no JavaScript
 * at all, and the page count follows whatever fits at the current width with
 * no breakpoint arithmetic.
 *
 * Its page count is measured from the **card step**, never from
 * `scrollWidth / clientWidth`: the gaps inflate that ratio and produce a dot
 * that scrolls nowhere.
 */
export function CardCarousel({
  label,
  count,
  className,
  trackClassName,
  dotsClassName,
  children,
}: {
  /** Names the scrollable region, and the dots that page it. */
  label: string;
  /** How many cards are inside, for the page arithmetic. */
  count: number;
  className?: string;
  /** Track classes — the gap, and anything the row needs of its own. */
  trackClassName?: string;
  dotsClassName?: string;
  children: React.ReactNode;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const metrics = () => {
    const el = track.current;
    const first = el?.firstElementChild;
    if (!el || !(first instanceof HTMLElement) || el.clientWidth === 0) return null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = first.getBoundingClientRect().width + gap;
    const perView = Math.max(1, Math.round((el.clientWidth + gap) / step));
    return { el, pageWidth: perView * step, perView };
  };

  const sync = useCallback(() => {
    const m = metrics();
    if (!m) return;
    /* Nothing overflowing means one page, whatever the card count says. */
    const total =
      m.el.scrollWidth <= m.el.clientWidth + 1 ? 1 : Math.ceil(count / m.perView);
    setPages(total);
    /*
      The page comes from the scroll *fraction*, not from scrollLeft/pageWidth:
      the last page is usually partial — four cards three per view leaves it a
      third of a page wide — so dividing by a full page width rounds the end of
      the track back to page one and the active dot never moves.
    */
    const max = m.el.scrollWidth - m.el.clientWidth;
    setPage(max <= 0 ? 0 : Math.round((m.el.scrollLeft / max) * (total - 1)));
  }, [count]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  const goTo = (next: number) => {
    const m = metrics();
    if (!m) return;
    /* Same arithmetic in reverse, so the last dot lands on the track's end
       rather than short of it. */
    const max = m.el.scrollWidth - m.el.clientWidth;
    const left = pages > 1 ? (next / (pages - 1)) * max : 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    m.el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  };

  const paged = pages > 1;

  return (
    <div className={className}>
      <ul
        ref={track}
        onScroll={sync}
        role={paged ? "region" : undefined}
        aria-label={paged ? label : undefined}
        tabIndex={paged ? 0 : undefined}
        className={cn(
          "no-scrollbar flex snap-x snap-mandatory overflow-x-auto",
          /* `overflow-x: auto` clips vertically too, which would cut the
             cards' hover shadow. The padding gives it room and the negative
             margin takes the space back, so nothing moves. */
          "-my-6 py-6",
          "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-4",
          trackClassName,
        )}
      >
        {children}
      </ul>

      {/*
        Figma's pagination row. It pages the track wherever there is more than
        a viewful; with nothing to page it falls back to the comp's static
        state — first dot active, `aria-hidden`, exactly as it was.
      */}
      <div
        aria-hidden={paged ? undefined : "true"}
        className={cn("flex justify-center gap-3", dotsClassName)}
      >
        {Array.from({ length: paged ? pages : 3 }, (_, i) => {
          const on = i === (paged ? page : 0);
          const dot = cn(
            "rounded-full transition-all",
            on ? "bg-periwinkle h-2.25 w-7.5" : "bg-encre/20 size-2.25",
          );
          return paged ? (
            <button
              key={i}
              type="button"
              aria-label={`${label} — ${i + 1}/${pages}`}
              aria-current={on ? "true" : undefined}
              onClick={() => goTo(i)}
              className={cn(
                dot,
                "focus-visible:outline-gold cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2",
              )}
            />
          ) : (
            <span key={i} className={dot} />
          );
        })}
      </div>
    </div>
  );
}
