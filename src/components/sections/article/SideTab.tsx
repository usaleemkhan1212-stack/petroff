"use client";

import { useTranslations } from "next-intl";
import SpeechBubble from "@/assets/icons/speech-bubble.svg";

/**
 * Figma's `13170:1046`: the gold tab hugging the right edge of the article.
 *
 * It used to be the sticky bar's collapsed state, which meant it only appeared
 * once the reader had passed half the page *and* dismissed the bar — so on a
 * first read it looked absent. The comp draws it high up the article with the
 * drawer open, so it is a persistent control with one job: opening the drawer.
 *
 * `writing-mode: vertical-rl` rather than a rotation — no transform arithmetic
 * to hug the edge, and it reflows. The 45x236 box is the comp's, set
 * explicitly: intrinsic sizing under vertical-rl resolves the icon and the gap
 * onto axes that give 59x221 instead.
 *
 * Hidden below `lg` alongside the bar, where it would sit on top of the text.
 * Readers there still get the same form inline, as the article column's
 * `consult` block.
 */
export function SideTab({
  hidden,
  onOpen,
}: {
  hidden: boolean;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const t = useTranslations("ArticlePage.stickyBar");

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-hidden={hidden}
      inert={hidden}
      className={`bg-gold hover:bg-brique fixed top-1/2 right-0 z-20 hidden h-59 w-11.25 -translate-y-1/2 cursor-pointer items-center justify-center gap-3 rounded-l-[14px] text-white shadow-[0px_10px_30px_0px_rgba(18,42,76,0.2)] transition-[translate,background-color] duration-300 [writing-mode:vertical-rl] motion-reduce:transition-none lg:flex ${
        hidden ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <SpeechBubble aria-hidden="true" width={18} height={18} />
      <span className="text-button font-poppins whitespace-nowrap">
        {t("reopen")}
      </span>
    </button>
  );
}
