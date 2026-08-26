import { useTranslations } from "next-intl";
import CircleHalf from "@/assets/icons/circle-half.svg";
import CircleSlash from "@/assets/icons/circle-slash.svg";
import CourthouseLine from "@/assets/icons/courthouse-line.svg";
import Padlock from "@/assets/icons/padlock.svg";
import { cn } from "@/lib/utils";

/**
 * Figma's `ladder` (`13318:2624`): the four levels of signature, one card
 * each, on a 24px gap.
 *
 * Its tile tints do not track the level and do not repeat a pattern — pale
 * blue, pale gold, pink at 40%, pale mint — so they are carried per rung.
 * Every status pill is pale mint, whatever the tile.
 *
 * The pink is Figma's `rgba(239,207,217,0.4)`. Composited it lands within two
 * units of `--color-pink-soft` at the same alpha, so that token is reused
 * rather than a third pink added — the same call the arc reuse makes.
 */
const rungs = [
  { key: "simple", Icon: CircleSlash, tile: "bg-pale-blue" },
  { key: "avancee", Icon: CircleHalf, tile: "bg-pale-gold" },
  { key: "qualifiee", Icon: Padlock, tile: "bg-pink-soft/40" },
  { key: "authentique", Icon: CourthouseLine, tile: "bg-pale-mint" },
] as const;

export function Ladder() {
  const t = useTranslations("ArticlePage.ladder");

  return (
    <ul className="flex flex-col gap-6">
      {rungs.map(({ key, Icon, tile }) => (
        <li
          key={key}
          className="rounded-note-lg border-encre/8 flex flex-col gap-2.5 border bg-white p-5 sm:p-7"
        >
          {/*
            `flex-1` on the title would set its basis to 0, so the line always
            "fits" and the row never wraps — the pill just gets squeezed over
            it on a narrow card. A real basis makes it wrap instead.
          */}
          <div className="flex flex-wrap items-center gap-4">
            <span
              aria-hidden="true"
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-[16px]",
                tile,
              )}
            >
              <Icon width={24} height={24} className="text-encre" />
            </span>
            <h3 className="text-h3 text-encre min-w-0 grow basis-40">
              {t(`${key}.title`)}
            </h3>
            <span className="text-small-strong bg-pale-mint text-encre/62 shrink-0 rounded-full px-3.5 py-1.25">
              {t(`${key}.level`)}
            </span>
          </div>
          {/* Indented past the 44px tile and its 16px gap. */}
          <p className="text-body text-encre/62 sm:pl-15">{t(`${key}.body`)}</p>
        </li>
      ))}
    </ul>
  );
}
