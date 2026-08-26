import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/**
 * Figma's `13331:11268` — the article's Transparence band, duplicated.
 *
 * Every value matches: white ground, gold overline, encre title, encre/62
 * sources, a full-encre disclaimer, the closing `Signalez-la-nous.` in rose,
 * the 1100 column at x=360, the head capped at 784 with 8/8 gaps, 20px between
 * blocks and 72/52 padding. All five strings come from the shared top-level
 * `Transparence` namespace, which the Bibliotheque hub's dark version also
 * reads.
 *
 * **One difference: this frame uppercases the overline in the style**, as
 * every other overline on this page does and none on the article does — which
 * is why the same shared string renders mixed case there and uppercase here.
 */
export function Transparence() {
  const t = useTranslations("Transparence");

  return (
    <section className="bg-white">
      <Container className="pt-12 pb-9 lg:pt-18 lg:pb-13">
        <div className="mx-auto flex max-w-300 flex-col gap-5">
          <div className="flex max-w-196 flex-col gap-2">
            <p className="text-overline font-poppins text-gold uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62">{t("sources")}</p>
          </div>

          <p className="text-body text-encre max-w-275">{t("disclaimer")}</p>

          <p className="text-small text-encre/62 max-w-275">
            {t.rich("translation", {
              link: (chunks) => (
                <span className="text-small-strong text-rose">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </Container>
    </section>
  );
}
