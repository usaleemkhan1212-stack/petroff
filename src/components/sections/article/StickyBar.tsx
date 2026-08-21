"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SpeechBubble from "@/assets/icons/speech-bubble.svg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Fraction of the page that must be scrolled before the bar appears. */
const APPEAR_AT = 0.5;

/**
 * The article's contact bar and its collapsed side tab.
 *
 * It appears once the reader is half way down the page and then stays fixed
 * to the bottom — the page scrolls normally underneath, since the bar is
 * fixed rather than in flow. Dismissing it with the ✕ collapses it to the
 * gold tab on the right edge, which brings it back; that is the reading that
 * makes both elements in the comp purposeful, and it is one prop to change if
 * the tab is meant to stand alone.
 *
 * Both are hidden below lg, where a 78px bar would cover too much of a phone
 * screen and the tab would sit on top of the text.
 */
export function StickyBar() {
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
    <>
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
            <Button variant="gold" className="shrink-0 px-5.5 py-2.75">
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

      {/*
        The collapsed state. writing-mode rather than a rotation: it needs no
        transform arithmetic to hug the edge, and it reflows. The 45x236 box
        is the comp's, with its rounded corners facing away from the edge —
        set explicitly, because intrinsic sizing under vertical-rl does not
        land on it (the icon and the gap resolve onto axes that make the box
        59x221 rather than 45x236).
      */}
      <button
        type="button"
        onClick={() => setDismissed(false)}
        aria-hidden={barOpen || !passedHalf}
        inert={barOpen || !passedHalf}
        className={`bg-gold fixed top-1/2 right-0 z-20 hidden h-59 w-11.25 -translate-y-1/2 cursor-pointer items-center justify-center gap-3 rounded-l-[14px] text-white shadow-[0px_10px_30px_0px_rgba(18,42,76,0.2)] transition-transform duration-300 [writing-mode:vertical-rl] motion-reduce:transition-none lg:flex ${
          !barOpen && passedHalf ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SpeechBubble aria-hidden="true" width={18} height={18} />
        <span className="text-button font-poppins whitespace-nowrap">
          {t("reopen")}
        </span>
      </button>
    </>
  );
}
