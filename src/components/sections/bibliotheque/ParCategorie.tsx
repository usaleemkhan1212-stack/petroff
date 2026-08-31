import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { categories } from "@/lib/bibliotheque";
import { cn } from "@/lib/utils";

/*
  Four tints since the redesign, where this grid alternated blue/gold. The
  pink is Figma's `#EFCFD9` at 40% — the same third hex under the library name
  "Petroff/Pink" the Expertises hub and the new article's ladder both use, so
  `--color-pink-soft` is reused rather than a fourth pink added. Compare the
  hex, never the style name.
*/
const tones = {
  blue: "bg-pale-periwinkle",
  gold: "bg-pale-gold",
  mint: "bg-pale-mint",
  pink: "bg-pink-soft/40",
} as const;

/**
 * Its own pill again: lilas ground with encre/62 text, where the content
 * cards use pale periwinkle with full-strength encre. Fifth variant on the
 * site — see the extraction note in CLAUDE.md.
 */
const pill =
  "text-small-strong text-encre/62 bg-lilas flex h-8 items-center rounded-full px-3";

export function ParCategorie() {
  const t = useTranslations("BibliothequePage.parCategorie");

  return (
    <section className="bg-lilas">
      {/* 1200 centred inside the Container lands on 360, as in Resultats. */}
      <Container className="py-16 lg:py-21.5">
        <div className="mx-auto max-w-300">
          <p className="text-overline font-poppins text-brique uppercase">
            {t("overline")}
          </p>
          <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>
          <p className="text-body text-encre/62 mt-1.5 max-w-190">{t("lead")}</p>

          {/* 3 -> 1. Figma draws every tile at a flat 350. */}
          <ul className="mt-3.5 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {categories.map(({ key, Icon, tone }) => (
              <li key={key} className="flex">
                <article className="rounded-card border-encre/8 flex min-h-87.5 min-w-0 flex-1 flex-col border bg-white px-6 pt-5.5 pb-5">
                  <div className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "rounded-field flex size-11.5 shrink-0 items-center justify-center",
                        tones[tone],
                      )}
                    >
                      <Icon className="text-encre" width={24} height={24} />
                    </span>
                    {/*
                      min-h-13 and the 2px nudge: Figma sets the title 2px
                      below the icon tile and pins the counts line to a fixed
                      y, so the title reserves its two lines whether or not it
                      needs them — the same fixed-slot layout the Resultats
                      cards use.
                    */}
                    <h3 className="text-h3 text-encre mt-0.5 min-h-13">
                      {t(`items.${key}.title`)}
                    </h3>
                  </div>

                  <p className="text-small text-encre/62 mt-1.5 min-h-12">
                    {t(`items.${key}.counts`)}
                  </p>

                  <ul className="mt-1 flex flex-wrap gap-2">
                    {t.raw(`items.${key}.tags`).map((tag: string) => (
                      <li key={tag} className={pill}>
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* mt-auto holds the CTA on the tile's bottom edge. */}
                  <p className="text-button font-poppins text-periwinkle mt-auto pt-4">
                    {t("cta")}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
