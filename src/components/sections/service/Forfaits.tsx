import { useTranslations } from "next-intl";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/** The three plans, in Figma's order; the middle one is the featured card. */
const plans = ["diagnostic", "phases", "referé"] as const;

/**
 * Figma `13445:17231` — "Ce que coûte la résolution d'un litige".
 *
 * The site's **fifth Forfaits**, and the first that does not price its plans:
 * there is no `text-price` amount anywhere. The figures sit inside each card's
 * description as a `text-body-strong` run ("À partir de 990 € HT", "Sur devis"),
 * so this block carries none of the price/unit/flash anatomy the four others
 * share. Two more differences: every plan has a **brique heading over its
 * feature list**, and the closing footnote is a **pale-gold panel** rather than
 * a bare line.
 */
export function Forfaits() {
  const t = useTranslations("ServicePage.forfaits");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="flex flex-col gap-3">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62">{t("lead")}</p>
          </div>

          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {plans.map((key) => {
              const featured = key === "phases";
              return (
                <li key={key} className="flex">
                  <Card
                    className={cn(
                      "relative flex flex-1 flex-col gap-6 px-5 py-7 sm:px-7 sm:py-9",
                      featured &&
                        "border-gold border-2 drop-shadow-[0px_14px_17px_rgba(0,0,0,0.1)]",
                    )}
                  >
                    {featured && (
                      /* Absolutely positioned so it can straddle the card's top
                         edge. Its offsets resolve against the padding box, so
                         they absorb the 2px border: Figma's -14/22 is -top-4
                         left-5 — the same arithmetic the domain Forfaits use. */
                      <span className="text-button font-poppins bg-gold absolute -top-4 left-5 rounded-full px-3 py-1 text-white">
                        {t("badge")}
                      </span>
                    )}

                    <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>

                    <p className="text-body text-encre/62">
                      {t.rich(`items.${key}.description`, {
                        b: (chunks) => (
                          <span className="text-body-strong text-encre">{chunks}</span>
                        ),
                      })}
                    </p>

                    <div className="flex flex-col gap-3">
                      <p className="text-body-strong text-brique">
                        {t(`items.${key}.featuresLabel`)}
                      </p>
                      <ul className="flex flex-col gap-3">
                        {(t.raw(`items.${key}.features`) as string[]).map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            {/* The Inter subset carries no U+2713, so this
                                  resolves to a system font — the documented
                                  fallback every other ✓ on the site takes. */}
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
                    </div>

                    {/* Deliberately NOT bottom-aligned: the cards stretch to
                        one height, but Figma lets each CTA sit right after its
                        own feature list, so the shortest plan's button is the
                        highest. Same behaviour as Facons, Bib and the two
                        domain Forfaits — an `mt-auto` here would level them. */}
                    <ConsultButton
                      size="lg"
                      variant={featured ? "gold" : "outline"}
                      className="w-full whitespace-normal sm:w-auto sm:self-start sm:whitespace-nowrap"
                    >
                      {t("cta")}
                    </ConsultButton>
                  </Card>
                </li>
              );
            })}
          </ul>

          {/* A pale-gold panel, not the bare footnote line the other four
              Forfaits close on. */}
          <p className="bg-pale-gold text-body text-encre/62 rounded-note-lg p-6 sm:p-7">
            {t.rich("footnote", {
              b: (chunks) => (
                <span className="text-body-strong text-encre">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </Container>
    </section>
  );
}
