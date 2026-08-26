import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/*
  The ten notes, in Figma's order — the grid fills row-major, as the comp does.

  Each chip carries its own tint, sampled card by card from the node render:
  four grounds cycling, and five text colours across them. `plateformes` is
  the odd one — the same pale-mint ground as `garanties` but **mint** copy
  where that one is result-green.
*/
const chips = {
  gold: "bg-pale-gold text-brique",
  pink: "bg-pink-soft/40 text-red",
  mintGreen: "bg-pale-mint text-result-green",
  blue: "bg-pale-blue text-periwinkle",
  mint: "bg-pale-mint text-mint",
} as const;

const notes = [
  { key: "lcen", chip: "gold" },
  { key: "retractation", chip: "pink" },
  { key: "garanties", chip: "mintGreen" },
  { key: "prix", chip: "blue" },
  { key: "pratiques", chip: "gold" },
  { key: "dgccrf", chip: "pink" },
  { key: "mediation", chip: "blue" },
  { key: "plateformes", chip: "mint" },
  { key: "distance", chip: "pink" },
  { key: "choisir", chip: "gold" },
] as const satisfies readonly { key: string; chip: keyof typeof chips }[];

const paragraphs = ["p1", "p2", "p3"] as const;

/**
 * Figma's `13331:13264`: ten explainer cards on a lilas-2 ground.
 *
 * **The comp calls the block `masonry` but does not behave like one** — its
 * rows are aligned, so every row is as tall as its taller card and a short one
 * leaves a hole beneath it. Built as real masonry on the user's instruction:
 * two independent columns, each packing upward on the same 24px gap, with the
 * horizontal gap and both column widths unchanged. A deliberate deviation.
 *
 * **Only the first card carries Figma's `0px 14px 34px` shadow**, sampled
 * card by card: the other nine sit on flat lilas-2. That is the designer
 * showing `Card`'s hover state, for the fifth time on this build, so it is not
 * reproduced statically. Its blur is 34 against `Card`'s 17, the same outlier
 * the home Actus grid has.
 */
export function ComprendreLeDroit() {
  const t = useTranslations("EcommercePage.comprendre");

  return (
    <section className="bg-lilas-2">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="flex max-w-163 flex-col gap-3">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
          </div>

          {/*
            Two independent columns, not a row-aligned grid. A `grid-cols-2`
            makes every row as tall as its taller card, so a short card leaves
            a hole under it; here each column is its own flex stack with the
            same 24px gap, so a short card lets the next one in that column
            move up. The horizontal gap stays the grid's, so both columns are
            still exactly 598.5 wide.

            Cards alternate left/right by index, which is where Figma puts
            them. Below `lg` the two stacks follow one another, so the reading
            order there is the odd cards then the even ones — DOM order and
            visual order still agree.
          */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            {([0, 1] as const).map((column) => (
              <ul key={column} className="flex flex-col gap-6">
                {notes
                  .filter((_, index) => index % 2 === column)
                  .map(({ key, chip }) => (
                    <li key={key} className="flex">
                      <Card className="flex min-w-0 flex-1 flex-col items-start gap-3 p-6 sm:p-7">
                        {/* Tinted per card; 12/4 padding, where the Vitrine's
                            type pill is 11/3, so it is a variant of its own. */}
                        <span
                          className={cn(
                            "text-small-strong rounded-full px-3 py-1",
                            chips[chip],
                          )}
                        >
                          {t(`items.${key}.tag`)}
                        </span>

                        <h3 className="text-h3 text-encre">
                          {t(`items.${key}.title`)}
                        </h3>

                        {paragraphs.map((paragraph) => (
                          <p key={paragraph} className="text-body text-encre/62">
                            {t(`items.${key}.${paragraph}`)}
                          </p>
                        ))}

                        {/* Inert, like every CTA on the site until its route
                            exists. The arrow sits in a gap-2 span, as every
                            other "→" does. */}
                        <span className="text-button font-poppins text-periwinkle flex items-center gap-2">
                          {t("cta")}
                          <span aria-hidden="true">→</span>
                        </span>
                      </Card>
                    </li>
                  ))}
              </ul>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
