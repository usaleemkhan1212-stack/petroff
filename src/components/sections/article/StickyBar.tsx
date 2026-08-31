"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SpeechBubble from "@/assets/icons/speech-bubble.svg";
import { Container } from "@/components/ui/Container";

/** Fraction of the page that must be scrolled before the bar appears. */
const APPEAR_AT = 0.5;

/**
 * The article's contact bar.
 *
 * It appears once the reader is half way down the page and then stays fixed
 * to the bottom — the page scrolls normally underneath, since the bar is
 * fixed rather than in flow. Its ✕ dismisses it for the rest of the visit;
 * the `SideTab` is no longer its collapsed state but a control of its own, so
 * dismissing the bar no longer takes the consultation away with it.
 *
 * **A pale-rose band since the redesign** (`13318:3406`), under a 2px red rule
 * and 98 tall rather than 78: it was an encre bar with white copy and a gold
 * button. Its button is now white with red copy and a rotated speech bubble.
 *
 * Two deliberate departures from the comp, both asked for:
 * - its ground is **60%**, not Figma's 30% — the bar is fixed over live page
 *   content, and at 30% the copy could not be read against whatever ran
 *   underneath it;
 * - it fades as well as slides. `translate-y-full` alone left the 2px red rule
 *   showing along the bottom edge when the bar was dismissed, so the closed
 *   state carries `opacity-0` too.
 *
 * Hidden below lg, where it would cover too much of a phone screen.
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
      className={`bg-lilas/60 border-encre/30 fixed inset-x-0 bottom-0 z-20 hidden border-t backdrop-blur-lg transition-[translate,opacity] duration-300 motion-reduce:transition-none lg:block ${
        barOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {/*
        The row goes INSIDE Container, not on it: Container renders a padded
        outer div wrapping a max-w inner one, so flex utilities passed to it
        land on the outer element and the inner one becomes a single child —
        which stacked the copy, the button and the ✕ vertically and made the
        bar 119 tall against the comp's 78.
      */}
      <Container className="py-6">
        <div className="flex items-center gap-4.5">
          <div className="text-encre flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-h4 font-poppins">{t("title")}</p>
            <p className="text-small">{t("detail")}</p>
          </div>

          {/* Written out rather than using `Button`: white ground with red
              copy and a rotated speech bubble is not one of its variants. */}
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
