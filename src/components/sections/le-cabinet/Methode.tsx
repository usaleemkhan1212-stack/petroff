import { useTranslations } from "next-intl";
import ColumnedBuilding from "@/assets/icons/columned-building.svg";
import ShieldBadge from "@/assets/icons/shield-badge.svg";
import ThreeFigures from "@/assets/icons/three-figures.svg";
import { Container } from "@/components/ui/Container";
import { methodePillars, methodeSources } from "@/lib/le-cabinet";

/** Figma's three illustrations, in order — every one a reuse. */
const art = {
  conseil: ColumnedBuilding,
  donnees: ShieldBadge,
  ia: ThreeFigures,
} as const;

/**
 * Figma `13689:21454` — "Notre méthode", a white band on `py-96` with a 64px
 * gap between its three blocks: the head, a three-column row, and a chipped
 * list of the data sources.
 *
 * **Its columns are separated by dashed rules, and Figma draws one after the
 * last column too** — a `2 2` dash in `encre/10`, the same rule the e-commerce
 * "Comment ça marche" rows use. Reproduced including that trailing one, which
 * hugs the container's right edge; it is almost certainly a slip, so flag it.
 *
 * Each pillar's body is two paragraphs separated by a blank line, which Figma
 * writes as a double `<br>`. Kept as one string with `whitespace-pre-line`, so
 * the gap is a real empty line rather than a gap value that only approximates
 * one.
 */
export function Methode() {
  const t = useTranslations("CabinetPage.methode");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-10 lg:gap-16">
          <div className="flex flex-col gap-4">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62 max-w-250">{t("lead")}</p>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-9">
            {methodePillars.map(({ key, width }) => {
              const Art = art[key];
              return (
                <div
                  key={key}
                  className="flex min-w-0 flex-1 flex-col gap-6 lg:contents"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <Art
                        aria-hidden="true"
                        width={width}
                        height={90}
                        className="shrink-0"
                      />
                      <h3 className="text-h3 text-encre min-w-0 flex-1">
                        {t(`pillars.${key}.title`)}
                      </h3>
                    </div>
                    <p className="text-body text-encre/62 whitespace-pre-line">
                      {t(`pillars.${key}.body`)}
                    </p>
                  </div>
                  {/* Figma puts one of these after every column, the last
                      included — see the note above. */}
                  <span
                    aria-hidden="true"
                    className="border-encre/10 hidden w-0 self-stretch border-l border-dashed lg:block"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="text-body-strong text-encre/62">{t("sourcesLabel")}</p>
            {methodeSources.map((key) => (
              <span
                key={key}
                className="text-small-strong text-encre bg-lilas rounded-full px-3 py-1"
              >
                {t(`sources.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
