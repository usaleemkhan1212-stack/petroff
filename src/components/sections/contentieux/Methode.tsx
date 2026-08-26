import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { methodeSteps } from "@/lib/contentieux";

export function Methode() {
  const t = useTranslations("ContentieuxPage.methode");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Overline and H2 only — this one has no lead. */}
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            className="max-w-170 gap-3"
          />

          {/* Ordered: the numbers are the point. 4 -> 2 -> 1. */}
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {methodeSteps.map((key, index) => (
              /*
                The badge is positioned against the LI, not the Card. It has to
                straddle the card's top edge, and anchoring it here means
                Figma's -22/14 are exactly the offsets used — against the Card
                they would resolve from its padding box and pick up its 1px
                border, as the Forfaits badge does.
              */
              <li key={key} className="relative flex">
                <Card className="flex min-w-0 flex-1 flex-col gap-2 px-6 py-7">
                  {/*
                    Petroff/Overline, not H3: 16px Poppins on 0.18em, the same
                    style the section overline uses. It is a <p>, so it needs
                    font-poppins explicitly — only h1-h4 inherit it.
                  */}
                  <p className="text-overline font-poppins uppercase text-brique">
                    {t(`items.${key}.kicker`)}
                  </p>
                  <span aria-hidden="true" className="h-1" />

                  <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                  <p className="text-body text-encre/62">
                    {t(`items.${key}.description`)}
                  </p>
                </Card>

                {/*
                  Solid periwinkle with a white numeral, verified against the
                  Figma render itself. aria-hidden because the <ol> already
                  carries the sequence.
                */}
                <span
                  aria-hidden="true"
                  className="bg-periwinkle text-h3 font-poppins absolute -top-5.5 left-3.5 flex size-11 items-center justify-center rounded-full text-white"
                >
                  {index + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
