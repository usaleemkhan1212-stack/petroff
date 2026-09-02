"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ChevronRight from "@/assets/icons/chevron-right.svg";
import { Container } from "@/components/ui/Container";
import { type ContentType, contentByKey, vitrineItems } from "@/lib/bibliotheque";
import { cn } from "@/lib/utils";

/**
 * Pale blue marks a fiche here, pale gold a guide; the domain pill is always
 * pale periwinkle. The Resultats grid tints a fiche lilas-2 instead, so the
 * two sections keep their own maps — see the note in CLAUDE.md.
 */
const typeTones: Record<ContentType, string> = {
  fiche: "bg-pale-blue",
  guide: "bg-pale-gold",
  modele: "bg-lilas-2",
};

const pill = "text-small-strong text-encre rounded-full px-2.75 py-0.75";

/**
 * A real scroll container, not a transform: the track keeps its snap points
 * and stays usable with the keyboard, a trackpad or no JavaScript at all, and
 * the page count follows however many cards fit at the current width — three
 * from lg, one below — with no breakpoint arithmetic here.
 */
export function Vitrine() {
  const t = useTranslations("BibliothequePage.vitrine");
  /* Titles, domains and type labels are shared with the Resultats grid. */
  const shared = useTranslations("BibliothequePage");
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  /**
   * A page is however many whole cards fit, so it is measured from the card
   * step rather than from scrollWidth — the gaps between cards make
   * scrollWidth/clientWidth overcount, which produced a ninth dot for eight
   * cards at 375.
   */
  const metrics = () => {
    const el = trackRef.current;
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
    const count = Math.ceil(vitrineItems.length / m.perView);
    setPages(count);
    setPage(Math.min(count - 1, Math.round(m.el.scrollLeft / m.pageWidth)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  const scrollToPage = (next: number) => {
    const m = metrics();
    if (!m) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    m.el.scrollTo({
      left: next * m.pageWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section className="bg-lilas">
      {/* 64 above, 96 below — Figma's own asymmetry since the redesign, where
          this section used to take 96 on both sides. Two-step below lg, as
          every other page's sections do. */}
      <Container className="pt-12 pb-16 lg:pt-16 lg:pb-24">
        {/*
          Written out rather than using SectionHeading: this head puts 8px
          under the overline and 12px under the title where SectionHeading
          uses one gap for both, and it has to sit beside the arrows.
        */}
        <div className="flex items-end gap-8">
          <div className="min-w-0 flex-1">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre mt-2">{t("title")}</h2>
            <p className="text-small text-encre/62 mt-3">{t("lead")}</p>
          </div>

          {/*
            Figma draws page 1: previous dimmed, next full. That is exactly
            the disabled state, so the styling follows the real bounds rather
            than being hard-coded.
          */}
          <div className="hidden shrink-0 gap-3 sm:flex">
            {[
              { dir: -1, label: t("prev"), off: page <= 0, flip: true },
              { dir: 1, label: t("next"), off: page >= pages - 1, flip: false },
            ].map(({ dir, label, off, flip }) => (
              <button
                key={dir}
                type="button"
                aria-label={label}
                disabled={off}
                onClick={() => scrollToPage(page + dir)}
                className={cn(
                  "flex size-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] bg-white transition",
                  "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2",
                  off
                    ? "border-encre/6 cursor-default opacity-35"
                    : "border-encre/16 hover:bg-lilas-2",
                )}
              >
                <ChevronRight
                  className={cn("text-encre", flip && "-scale-x-100")}
                  width={20}
                  height={20}
                />
              </button>
            ))}
          </div>
        </div>

        {/*
          The cards stretch to one height across the whole track, so every page
          lines up and the "Lire" row sits on the same baseline. Figma draws
          them ragged — card 1 runs 61px taller than card 3 — so this is a
          deliberate deviation; drop the stretch and the mt-auto below to go
          back to the comp. Three per view from lg, one below: the basis is
          what makes the page arithmetic above work.
        */}
        <ul
          ref={trackRef}
          onScroll={sync}
          tabIndex={0}
          role="region"
          aria-label={t("carouselLabel")}
          className="no-scrollbar focus-visible:outline-gold mt-12 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {vitrineItems.map(({ key, photo }) => {
            const { domain, type } = contentByKey.get(key)!;
            return (
              <li
                key={key}
                className="flex shrink-0 basis-full snap-start lg:basis-[calc((100%-3rem)/3)]"
              >
                <article className="rounded-note-lg border-encre/8 flex min-w-0 flex-1 flex-col overflow-hidden border bg-white transition-shadow hover:shadow-[0px_14px_34px_rgba(0,0,0,0.1)]">
                  <Image
                    src={photo}
                    alt=""
                    sizes="(min-width: 1024px) 399px, 100vw"
                    className="h-56 w-full object-cover"
                  />

                  <div className="flex flex-1 flex-col gap-2.5 px-7 pt-6 pb-7">
                    <div className="flex flex-wrap gap-2">
                      <span className={cn(pill, "bg-pale-periwinkle")}>
                        {shared(`domains.${domain}`)}
                      </span>
                      <span className={cn(pill, typeTones[type])}>
                        {shared(`types.${type}`)}
                      </span>
                    </div>

                    <h3 className="text-h3 text-encre">
                      {shared(`contents.${key}.title`)}
                    </h3>
                    <p className="text-small text-encre/62">
                      {shared(`contents.${key}.description`)}
                    </p>

                    {/* mt-auto holds the meta row on the card's bottom edge;
                      the flex gap already guarantees the 10px above it. */}
                    <p className="text-small-strong text-encre/62 mt-auto">
                      {t.rich(`meta.${key}`, {
                        cta: (chunks) => (
                          <span className="text-button font-poppins text-periwinkle">
                            {chunks}
                          </span>
                        ),
                      })}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex justify-center gap-3">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={t("goToPage", { page: i + 1 })}
              aria-current={i === page ? "true" : undefined}
              onClick={() => scrollToPage(i)}
              className={cn(
                "h-2.25 cursor-pointer rounded-full transition-all",
                "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2",
                i === page
                  ? "bg-periwinkle w-7.5"
                  : "bg-encre/20 hover:bg-encre/35 w-2.25",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
