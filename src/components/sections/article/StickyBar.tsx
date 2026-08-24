"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Fraction of the page that must be scrolled before the bar appears. */
const APPEAR_AT = 0.5;

/**
 * The article's contact bar.
 *
 * It appears once the reader is half way down the page and then stays fixed
 * to the bottom — the page scrolls normally underneath, since the bar is
 * fixed rather than in flow. Its ✕ dismisses it for the rest of the visit;
 * the gold `SideTab` is no longer its collapsed state but a control of its
 * own, so dismissing the bar no longer takes the consultation away with it.
 *
 * Hidden below lg, where a 78px bar would cover too much of a phone screen.
 */
export function StickyBar({
  onConsult,
}: {
  onConsult: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const t = useTranslations("ArticlePage.stickyBar");
  const [passedHalf, setPassedHalf] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      /* A page shorter than the viewport has no halfway point to reach. */
      setPassedHalf(max > 0 && window.scrollY / max >= APPEAR_AT);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const barOpen = passedHalf && !dismissed;

  return (
    <div
      role="region"
      aria-label={t("label")}
      /*
        Kept mounted and slid out of view rather than unmounted, so the
        transition runs both ways. aria-hidden and inert while it is down,
        so nothing focusable hides off-screen.
      */
      aria-hidden={!barOpen}
      inert={!barOpen}
      className={`bg-encre fixed inset-x-0 bottom-0 z-20 hidden transition-transform duration-300 motion-reduce:transition-none lg:block ${
        barOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/*
        The row goes INSIDE Container, not on it: Container renders a padded
        outer div wrapping a max-w inner one, so flex utilities passed to it
        land on the outer element and the inner one becomes a single child —
        which stacked the copy, the button and the ✕ vertically and made the
        bar 119 tall against the comp's 78.
      */}
      <Container className="py-3.5">
        <div className="flex items-center gap-4.5">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-h4 font-poppins text-white">{t("title")}</p>
            <p className="text-small text-white/70">{t("detail")}</p>
          </div>

          {/* Figma draws 22/11 sides, between Button's sm (20/12) and md (28/12). */}
          <Button
            variant="gold"
            onClick={onConsult}
            className="shrink-0 px-5.5 py-2.75"
          >
            {t("cta")}
          </Button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label={t("dismiss")}
            className="text-lead font-inter w-5.5 shrink-0 cursor-pointer text-center leading-none text-white/70 transition-colors hover:text-white focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </Container>
    </div>
  );
}
