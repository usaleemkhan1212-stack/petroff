import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections } from "@/lib/bibliotheque";

export function Bibliotheque() {
  const t = useTranslations("Bibliotheque");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            lead={t("lead")}
          />

          {/* Three cards side by side in the comp; they reflow 3 -> 1. */}
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {collections.map(({ key }) => (
              <li key={key} className="flex">
                <Card className="flex flex-1 flex-col gap-2 px-7 py-9">
                  {/* Poppins Bold 40 — the same style the section H2 uses.
                      Mint since the colour pass; it was periwinkle before. */}
                  <p className="text-h2 font-poppins text-mint">
                    {t(`collections.${key}.count`)}
                  </p>
                  <h3 className="text-h3 text-encre">
                    {t(`collections.${key}.title`)}
                  </h3>
                  <p className="text-body text-encre/62">
                    {t(`collections.${key}.description`)}
                  </p>
                  <span aria-hidden="true" className="h-2.5" />
                  {/* Reads as a link but does not navigate — no route yet. */}
                  <span className="text-button font-poppins text-brique inline-flex items-center gap-2 self-start">
                    {t(`collections.${key}.cta`)}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
