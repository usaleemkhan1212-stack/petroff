"use client";

import { useTranslations } from "next-intl";
import SpeechBubble from "@/assets/icons/speech-bubble.svg";

/**
 * Gold on the article (`13170:1046`), red on the home page (`13323:4812`).
 * No hover colour: the tab's only hover state is the nudge below.
 */
const tones = {
  gold: "bg-gold",
  red: "bg-red",
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
 *
 * **Its only hover state is a 6px nudge out of the edge** — 45 to 51 wide,
 * over 180ms, growing leftward because the tab is pinned to `right: 0`. Taken
 * from the mockup's `.sidetab:hover{padding-right:19px}`; the ground does not
 * change with it, on the user's instruction. The two transitions carry their
 * own durations, so the nudge stays quick while the slide keeps the 300ms it
 * shares with the drawer panel. Figma draws no hover state at all.
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
      className={`${tones[tone]} fixed top-1/2 right-0 z-20 hidden h-59 w-11.25 -translate-y-1/2 cursor-pointer items-center justify-center gap-3 rounded-l-[14px] text-white shadow-[0px_10px_30px_0px_rgba(18,42,76,0.2)] transition-[translate,width] [transition-duration:300ms,180ms] [writing-mode:vertical-rl] hover:w-12.75 motion-reduce:transition-none lg:flex ${
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
