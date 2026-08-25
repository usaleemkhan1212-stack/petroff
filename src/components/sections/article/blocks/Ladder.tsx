import type { FC, SVGProps } from "react";
import { useTranslations } from "next-intl";
import CircleHalf from "@/assets/icons/circle-half.svg";
import CircleSlash from "@/assets/icons/circle-slash.svg";
import CourthouseLine from "@/assets/icons/courthouse-line.svg";
import Padlock from "@/assets/icons/padlock.svg";
import { cn } from "@/lib/utils";

/*
  Left un-annotated so the keys stay literal: a `key: string` widens the
  template literal and next-intl then rejects `t(`${key}.title`)`.
*/
const rungs = [
  { key: "simple", Icon: CircleSlash, tone: "bg-pale-blue" },
  { key: "avancee", Icon: CircleHalf, tone: "bg-pale-gold" },
  { key: "qualifiee", Icon: Padlock, tone: "bg-pale-blue" },
  { key: "authentique", Icon: CourthouseLine, tone: "bg-pale-gold" },
] as const satisfies readonly {
  key: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  tone: string;
}[];

/**
 * Figma's `ladder`: the four levels of signature, each a card with a tinted
 * icon tile, a title, a status pill and a body indented to clear the tile.
 * The tints alternate pale blue / pale gold rather than tracking the level.
 */
export function Ladder() {
  const t = useTranslations("ArticlePage.ladder");

  return (
    <ol className="flex flex-col gap-6">
      {rungs.map(({ key, Icon, tone }) => (
        <li
          key={key}
          className="rounded-note-lg border-encre/8 flex flex-col gap-2.5 border bg-white p-5 sm:p-7"
        >
          <div className="flex flex-wrap items-center gap-4">
            <span
              aria-hidden="true"
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-2xl",
                tone,
              )}
            >
              <Icon className="text-encre" width={24} height={24} />
            </span>
            {/*
              `grow basis-40`, not `flex-1`. flex-1 sets flex-basis:0, so the
              row always "fits" and the pill never wraps — it just got squeezed
              and painted over the title. A 160px basis makes the line overflow
              on a phone, which is what pushes the pill onto its own row.
            */}
            <h3 className="text-h3 text-encre min-w-0 grow basis-40">
              {t(`${key}.title`)}
            </h3>
            <span className="text-small-strong bg-pale-mint text-encre/62 shrink-0 rounded-full px-3.5 py-1.25">
              {t(`${key}.level`)}
            </span>
          </div>

          {/* Indented to the tile's right edge — 44 plus the 16 gap. */}
          <p className="text-body text-encre/62 sm:pl-15">{t(`${key}.body`)}</p>
        </li>
      ))}
    </ol>
  );
}
