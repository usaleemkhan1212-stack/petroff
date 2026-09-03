import { useTranslations } from "next-intl";
import GlobePaperPlane from "@/assets/icons/globe-paper-plane-sm.svg";
import MapPin from "@/assets/icons/map-pin.svg";
import { Bullet } from "@/components/ui/Bullet";
import { Container } from "@/components/ui/Container";
import { clientCountries, clientFacts, clientLanguages } from "@/lib/le-cabinet";
import { cn } from "@/lib/utils";

/**
 * Figma `13701:23826` — "Nos clients", a white band on `py-96` split into two
 * equal columns on a 64px gap: the head with two ruled facts and the language
 * chips on the left, the country list on the right.
 *
 * **`globe-paper-plane-sm.svg` is a fork, not a reuse**, and only the stroke
 * says so: its geometry matches the stored 153x136 file to 0.000, but Figma
 * keeps `stroke-width` **5** at this 90x80 box too, where scaling the stored
 * file would draw it at 2.94 — 41% too thin. Compare stroke-width at the
 * target box, never just path data.
 *
 * Its puce is the shared 9x20 glyph — periwinkle in the comp, gold here under
 * the site-wide bullet rule.
 */
export function Clients() {
  const t = useTranslations("CabinetPage.clients");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex min-w-0 flex-1 flex-col gap-9">
            <div className="flex flex-col gap-4">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
              <p className="text-body text-encre/62">{t("lead")}</p>
            </div>

            <dl className="flex flex-col gap-1">
              {clientFacts.map((key) => (
                <div
                  key={key}
                  className="border-encre/10 flex flex-wrap items-center gap-2 border-b py-4.5"
                >
                  <dt className="text-h4 font-poppins text-encre">
                    {t(`facts.${key}.title`)}
                  </dt>
                  <dd className="text-body text-encre/62">{t(`facts.${key}.note`)}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-4">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("languagesLabel")}
              </p>
              <ul className="flex flex-wrap gap-3">
                {clientLanguages.map(({ key, solid }) => (
                  <li
                    key={key}
                    className={cn(
                      "text-small-strong rounded-full px-3 py-1",
                      solid ? "bg-encre text-white" : "bg-lilas text-encre",
                    )}
                  >
                    {t(`languages.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-9">
            <div className="flex flex-col gap-3">
              <div className="border-encre/10 flex items-center gap-4.5 border-b py-4.5">
                <GlobePaperPlane
                  aria-hidden="true"
                  width={90}
                  height={80}
                  className="shrink-0"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
                  <p className="text-h3 font-poppins text-encre">
                    {t("countriesTitle")}
                  </p>
                  <p className="text-body text-encre/62">{t("countriesSub")}</p>
                </div>
              </div>

              <div className="flex flex-col gap-x-16 sm:flex-row">
                {clientCountries.map((column, i) => (
                  <ul key={i} className="flex min-w-0 flex-1 flex-col">
                    {column.map((key) => (
                      <li
                        key={key}
                        className="border-encre/10 flex items-center gap-4.5 border-b py-4.5"
                      >
                        <Bullet />
                        <p
                          className={cn(
                            "text-h3 font-poppins min-w-0 flex-1",
                            /* Figma closes the list in brique. */
                            key === "international" ? "text-brique" : "text-encre",
                          )}
                        >
                          {t(`countries.${key}`)}
                        </p>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin
                aria-hidden="true"
                width={20}
                height={20}
                className="text-encre/62 shrink-0"
              />
              <p className="text-small text-encre/62">{t("note")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
