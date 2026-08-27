import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { forfaits } from "@/lib/contentieux";
import { cn } from "@/lib/utils";

export function Forfaits() {
  const t = useTranslations("ContentieuxPage.forfaits");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            lead={t("lead")}
            className="max-w-170 gap-3"
            leadClassName="max-w-170"
          />

          {/* Three plans, 3 -> 1, equal height so the CTAs align. */}
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {forfaits.map(({ key, featured, largePrice }) => (
              <li key={key} className="flex">
                <Card
                  className={cn(
                    "relative flex min-w-0 flex-1 flex-col gap-2 px-7 py-9",
                    // The featured plan keeps the shadow permanently — here it
                    // marks the highlighted plan rather than showing hover.
                    featured &&
                      "border-gold border-2 shadow-[0px_14px_17px_rgba(0,0,0,0.1)]",
                  )}
                >
                  {featured ? (
                    /* Deliberately absolute: the badge has to straddle the
                       card's top border, which no in-flow box can do. Figma
                       puts it at top -14 / left 22 measured from the card
                       edge; these offsets resolve against the padding box,
                       so they carry the featured card's 2px border. */
                    <span className="bg-gold text-button font-poppins absolute -top-4 left-5 rounded-full px-3 py-1 text-white">
                      {t("badge")}
                    </span>
                  ) : null}

                  <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>

                  <p className="flex flex-wrap items-baseline gap-2">
                    {/* The two outer plans are 40px, the featured middle one 30. */}
                    <span
                      className={cn(
                        "font-poppins text-encre",
                        largePrice ? "text-h2" : "text-price",
                      )}
                    >
                      {t(`items.${key}.price`)}
                    </span>
                    <span className="text-small text-encre/62">
                      {t(`items.${key}.unit`)}
                    </span>
                  </p>

                  <p className="text-small-strong text-brique">
                    {t(`items.${key}.flash`)}
                  </p>
                  <span aria-hidden="true" className="h-1.5" />

                  <ul className="flex flex-col gap-2">
                    {(t.raw(`items.${key}.features`) as string[]).map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="text-small-strong text-result-green shrink-0"
                        >
                          ✓
                        </span>
                        <span className="text-body text-encre/62 min-w-0 flex-1">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* No grow, as in Facons: the cards stretch to equal height
                      but Figma lets the third plan's shorter feature list pull
                      its CTA ~26px above the other two. */}
                  <span aria-hidden="true" className="h-2.5" />

                  <Button
                    size="md"
                    variant={featured ? "gold" : "outline"}
                    className="self-start"
                  >
                    {t(`items.${key}.cta`)}
                  </Button>
                </Card>
              </li>
            ))}
          </ul>

          <p className="text-small text-encre/62">{t("footnote")}</p>
        </div>
      </Container>
    </section>
  );
}
