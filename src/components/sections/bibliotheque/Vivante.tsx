import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { vivanteItems } from "@/lib/bibliotheque";

export function Vivante() {
  const t = useTranslations("BibliothequePage.vivante");

  return (
    <section className="bg-lilas">
      {/* 1200 centred inside the Container lands on 360, as in Resultats. */}
      <Container className="py-21.5">
        <div className="mx-auto max-w-300">
          <p className="text-overline font-poppins text-brique">{t("overline")}</p>
          <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>
          <p className="text-body text-encre/62 mt-1.5 max-w-205">{t("lead")}</p>

          {/* 3 -> 1. Figma draws every card at a flat 208. */}
          <ul className="mt-3.5 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {vivanteItems.map((key) => (
              <li key={key} className="flex">
                <article className="rounded-card border-encre/8 flex min-h-52 min-w-0 flex-1 flex-col border bg-white px-6.5 pt-5.5 pb-5">
                  <p className="text-small-strong text-encre/62">
                    {t(`items.${key}.date`)}
                  </p>
                  <h3 className="text-h3 text-encre mt-1">{t(`items.${key}.title`)}</h3>
                  <p className="text-small text-encre/62 mt-3.5">
                    {t(`items.${key}.description`)}
                  </p>

                  {/* mt-auto holds the CTA on the card's bottom edge, with no
                      padding above it — see the Parcours note. */}
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
