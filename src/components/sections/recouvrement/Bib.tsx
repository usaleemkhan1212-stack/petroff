import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections } from "@/lib/bibliotheque";

export function Bib() {
  const t = useTranslations("RecouvrementPage.bib");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Overline and H2 only — no lead in this one. */}
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            className="max-w-170 gap-3"
          />

          {/* The same three collections the home Bibliotheque lists, with
              counts and copy scoped to this domain. 3 -> 1. */}
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {collections.map(({ key, href }) => (
              <li key={key} className="flex">
                <Card className="flex min-w-0 flex-1 flex-col gap-2 px-7 py-9">
                  {/* Mint since the redesign, as on the Contentieux twin and the
                      home Bibliotheque counts; they were periwinkle. */}
                  <p className="text-h2 font-poppins text-mint">
                    {t(`items.${key}.count`)}
                  </p>
                  <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                  <p className="text-body text-encre/62">
                    {t(`items.${key}.description`)}
                  </p>
                  <span aria-hidden="true" className="h-1.5" />

                  <MaybeLink
                    href={href}
                    className="text-button font-poppins text-brique hover:text-encre inline-flex items-center gap-2 self-start transition-colors"
                  >
                    {t("cta")}
                    <span aria-hidden="true">&rarr;</span>
                  </MaybeLink>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
