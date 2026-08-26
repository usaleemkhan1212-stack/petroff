"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { popularSearches } from "@/lib/search";

/** How far this band rides up over the Hero, in px, at full scroll. */
const MAX_OVERLAP = 20;
/** The scroll distance over which it gets there. */
const TRAVEL = 120;

/**
 * How far the band has climbed for a given scroll position, rounded to whole
 * pixels: 20 steps over 120px of scroll is one step every 6px, which reads as
 * continuous at this size and caps the re-renders at 21 rather than one per
 * frame. Pulling the band up is a layout change, so the rounding is what keeps
 * it cheap.
 */
const overlapFor = (scrollY: number) =>
  Math.round(Math.min(Math.max(scrollY, 0) / TRAVEL, 1) * MAX_OVERLAP);

export function SearchBand() {
  const t = useTranslations("SearchBand");
  const [query, setQuery] = useState("");
  const [overlap, setOverlap] = useState(0);

  /*
    As the reader scrolls, this band climbs up to 20px over the Hero's bottom
    edge — so the Hero appears to lose that much height and tuck underneath.

    It is done with a negative `margin-top` rather than a transform: everything
    below has to come with it, and a transform would leave the sections after
    this one 20px too low and open a gap above the footer. The document simply
    gets 20px shorter.

    Nothing moves for a reader who has asked for less motion.
  */
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

  /**
   * TODO: navigate to /recherche?q= once that route exists. Until then
   * nothing on this page routes anywhere, so submitting is inert and the
   * popular chips just prefill the field.
   */
  const search = (term: string) => {
    setQuery(term.trim());
  };

  return (
    /* `relative z-10` is what lets the band's own ground paint over the Hero
       once the margin pulls it up; the header sits at z-30, well clear. */
    <section className="bg-encre relative z-10" style={{ marginTop: -overlap }}>
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-5">
          <h2 className="text-h3 font-poppins text-white">{t("heading")}</h2>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              search(query);
            }}
            className="flex w-full max-w-205 items-center gap-2 rounded-full bg-white p-2"
          >
            <label htmlFor="site-search" className="sr-only">
              {t("label")}
            </label>
            {/*
              type="text", not "search": Chrome's search decoration reserves
              inline space and adds a cancel button once there is a value,
              which clipped the tail of the designed placeholder.
            */}
            <input
              id="site-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("placeholder")}
              className="text-body text-encre placeholder:text-encre/62 min-w-0 flex-1 bg-transparent pl-2 text-ellipsis outline-none"
            />
            <Button type="submit" variant="gold" size="md">
              {t("submit")}
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-small text-white/70">{t("popular")}</span>
            {popularSearches.map((term) => (
              <Chip key={term} onClick={() => search(term)}>
                {term}
              </Chip>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
