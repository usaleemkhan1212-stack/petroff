"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SpeechBubble from "@/assets/icons/speech-bubble.svg";
import { Container } from "@/components/ui/Container";

/** Fraction of the page that must be scrolled before the bar appears. */
const APPEAR_AT = 0.5;

/**
 * Figma's `stickybar` (`13318:3406`): the page's contact bar — a **lilas band
 * at 60%** under a 1px `encre/30` rule, an encre title over an encre detail
 * line, a **red** button with white copy and a speech bubble rotated a quarter
 * turn, and a ✕.
 *
 * **The designer has moved this again**, so it is not the bar the original
 * article page carries: that one is a pale-rose band under a **2px red** rule,
 * with a **periwinkle** detail line and a **white** button carrying red copy.
 * Everything here is the other way round. Note too that Figma now specifies
 * the 60% ground itself, where the original build had to depart from a 30%
 * comp to keep the copy readable over live page content.
 *
 * It is `position: fixed`, so it sits as a separate node at the end of the
 * frame's tree rather than in the static flow — grep the metadata for it
 * rather than assuming the section list is complete.
 *
 * It appears once the reader is half way down and then stays fixed to the
 * bottom; its ✕ dismisses it for the rest of the visit. The `SideTab` is a
 * control of its own, not the bar's collapsed state, so dismissing the bar
 * does not take the consultation away with it.
 *
 * **The 60% ground needs a backdrop blur to read as translucent.** Figma's
 * fill is `rgba(246,245,241,0.60)` over a 1px `rgba(18,42,76,0.30)` rule, and
 * at 60% over the article's white column that composites to about
 * `rgb(251,249,247)` — near enough to white that the bar looks solid while the
 * page text stays sharp behind it. `backdrop-blur-lg` (16px) is what makes the
 * translucency visible. The export carries no blur radius, so 16px is a
 * judgement call rather than a Figma number.
 *
 * **It fades as well as slides.** `translate-y-full` alone leaves the rule
 * painting along the bottom edge once the bar is down, so the closed state
 * carries `opacity-0` too.
 *
 * Hidden below `lg`, where it would cover too much of a phone screen.
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
        transition runs both ways. `aria-hidden` and `inert` while it is down,
        so nothing focusable hides off-screen.
      */
      aria-hidden={!barOpen}
      inert={!barOpen}
      className={`bg-lilas/60 border-encre/30 fixed inset-x-0 bottom-0 z-20 hidden border-t backdrop-blur-lg transition-[translate,opacity] duration-300 motion-reduce:transition-none lg:block ${
        barOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {/*
        The row goes INSIDE `Container`, not on it: it renders a padded outer
        div wrapping a max-w inner one, so flex utilities passed to it land on
        the outer element and the inner one becomes a single flex child —
        which stacks the copy, the button and the ✕ into a column.
      */}
      <Container className="py-6">
        <div className="flex items-center gap-4.5">
          <div className="text-encre flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-h4 font-poppins">{t("title")}</p>
            <p className="text-small">{t("detail")}</p>
          </div>

          {/* Written out rather than using `Button`: a red pill carrying an
              icon beside its label is not one of its variants. */}
          <button
            type="button"
            onClick={onConsult}
            className="text-button font-poppins bg-red focus-visible:outline-gold hover:bg-red/90 flex h-10.75 shrink-0 cursor-pointer items-center gap-3 rounded-full px-5 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <SpeechBubble
              aria-hidden="true"
              width={18}
              height={18}
              className="-rotate-90"
            />
            {t("cta")}
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label={t("dismiss")}
            className="text-lead font-inter text-encre/62 hover:text-encre focus-visible:outline-gold w-5.5 shrink-0 cursor-pointer text-center leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </Container>
    </div>
  );
}
