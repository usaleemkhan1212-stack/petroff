import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/*
  Three plans. `featured` carries Figma's gold border, permanent shadow and
  badge; `largePrice` is the 40px amount only the middle plan uses. Literal
  keys, so `t(`items.${key}.title`)` stays typed.
*/
const plans = [
  { key: "audit", featured: false, largePrice: false },
  { key: "pack", featured: true, largePrice: true },
  { key: "dgccrf", featured: false, largePrice: false },
] as const;

/**
 * Figma's `13331:12906`: three priced missions over a footnote.
 *
 * The same anatomy as both domain pages' Forfaits, with three differences —
 * there is no unit or flash line beside the price, its feature text is
 * `text-small` rather than `text-body`, and the head is written out because
 * this page's overlines are uppercased in the style.
 */
export function Forfaits() {
  const t = useTranslations("EcommercePage.forfaits");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="flex max-w-170 flex-col gap-3">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62">{t("lead")}</p>
          </div>

          {/* Three plans, 3 -> 1, equal height. */}
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {plans.map(({ key, featured, largePrice }) => (
              <li key={key} className="flex">
                <Card
                  className={cn(
                    "relative flex min-w-0 flex-1 flex-col gap-2 px-7 py-9",
                    featured &&
                      "border-gold border-2 shadow-[0px_14px_17px_rgba(0,0,0,0.1)]",
                  )}
                >
                  {featured ? (
                    /* Absolute so it straddles the top border; the offsets
                       absorb that card's 2px border. */
                    <span className="bg-gold text-button font-poppins absolute -top-4 left-5 rounded-full px-3 py-1 text-white">
                      {t("badge")}
                    </span>
                  ) : null}

                  <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>

                  {/* Only the featured plan's amount is 40px. */}
                  <p
                    className={cn(
                      "font-poppins text-encre",
                      largePrice ? "text-h2" : "text-price",
                    )}
                  >
                    {t(`items.${key}.price`)}
                  </p>

                  <p className="text-body text-encre/62">
                    {t(`items.${key}.description`)}
                  </p>
                  <span aria-hidden="true" className="h-1.5" />

                  <ul className="flex flex-col gap-2">
                    {(t.raw(`items.${key}.features`) as string[]).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        {/* Falls back to a system font — the site's Inter
                            subset carries no U+2713, as the domain pages note. */}
                        <span
                          aria-hidden="true"
                          className="text-small-strong text-result-green shrink-0"
                        >
                          ✓
                        </span>
                        <span className="text-small text-encre/62 min-w-0 flex-1">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* No grow: Figma lets the shorter plans' CTAs ride up. */}
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

          {/* Figma's 967 measure; 968 is the nearest scale value. */}
          <p className="text-small text-encre/62 max-w-242">{t("footnote")}</p>
        </div>
      </Container>
    </section>
  );
}
