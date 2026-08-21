import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { parcoursItems } from "@/lib/bibliotheque";

export function Parcours() {
  const t = useTranslations("BibliothequePage.parcours");

  return (
    <section className="bg-white">
      {/* 1200 centred inside the Container lands on 360, as in Resultats. */}
      <Container className="py-21.5">
        <div className="mx-auto max-w-300">
          <p className="text-overline font-poppins text-brique">{t("overline")}</p>
          <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>

          {/* 3 -> 1. Figma draws every card at a flat 300, and no border. */}
          <ul className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {parcoursItems.map((key) => (
              <li key={key} className="flex">
                <article className="rounded-card bg-lilas-2 flex min-h-75 min-w-0 flex-1 flex-col px-7 pt-6.5 pb-6">
                  <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                  <p className="text-small-strong text-encre/62 mt-1.5">
                    {t(`items.${key}.meta`)}
                  </p>

                  {/*
                    A real <ol>, so the sequence is conveyed rather than typed
                    into the copy. list-inside, not the default outside: Figma
                    lets a wrapped step return flush to the left edge instead
                    of hanging under its label, which is what card 3's
                    four-line step shows.
                  */}
                  <ol className="text-small text-encre mt-3.75 flex list-inside list-decimal flex-col gap-3">
                    {t.raw(`items.${key}.steps`).map((step: string) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>

                  {/*
                    mt-auto and no padding: on the card whose last step wraps
                    to two lines Figma leaves only 4px above the CTA, so a
                    guaranteed gap here would push that card past the 300 the
                    comp draws — and the grid levels the other two with it.
                  */}
                  <p className="text-button font-poppins text-periwinkle mt-auto">
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
