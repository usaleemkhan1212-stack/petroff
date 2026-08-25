"use client";

import { useTranslations } from "next-intl";
import SpeechBubble from "@/assets/icons/speech-bubble.svg";

/** Gold on the article (`13170:1046`), red on the home page (`13323:4812`). */
const tones = {
  gold: "bg-gold hover:bg-brique",
  red: "bg-red hover:bg-brique",
} as const;

/**
 * The tab hugging the right edge of the viewport, whose one job is opening
 * the consultation drawer.
 *
 * `writing-mode: vertical-rl` rather than a rotation — no transform arithmetic
 * to hug the edge, and it reflows. The 45x236 box is the comp's, set
 * explicitly: intrinsic sizing under vertical-rl resolves the icon and the gap
 * onto axes that give 59x221 instead.
 *
 * Hidden below `lg`, where it would sit on top of the text. Figma only draws
 * it at desktop. On the article, readers there still get the same form inline
 * as the `consult` block; the home page has no such fallback, so showing it on
 * mobile is a one-class change if that gap matters.
 */
export function SideTab({
  hidden,
  onOpen,
  tone = "gold",
}: {
  hidden: boolean;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  tone?: keyof typeof tones;
}) {
  const t = useTranslations("Consultation");

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-hidden={hidden}
      inert={hidden}
      className={`${tones[tone]} fixed top-1/2 right-0 z-20 hidden h-59 w-11.25 -translate-y-1/2 cursor-pointer items-center justify-center gap-3 rounded-l-[14px] text-white shadow-[0px_10px_30px_0px_rgba(18,42,76,0.2)] transition-[translate,background-color] duration-300 [writing-mode:vertical-rl] motion-reduce:transition-none lg:flex ${
        hidden ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <SpeechBubble aria-hidden="true" width={18} height={18} />
      <span className="text-button font-poppins whitespace-nowrap">
        {t("tabLabel")}
      </span>
    </button>
  );
}
