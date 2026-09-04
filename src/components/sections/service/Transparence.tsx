import { useTranslations } from "next-intl";
import { SignalLink } from "@/components/contact/SignalLink";
import { Container } from "@/components/ui/Container";

/**
 * Figma `13445:17935` — the article's Transparence band, duplicated again.
 *
 * Every value matches: white ground, gold overline, encre title, encre/62
 * sources, a full-encre disclaimer, the closing `Signalez-la-nous.` in rose,
 * the 1100 column at x=360, the head capped at 784 with 8/8 gaps, 20px between
 * blocks and 72/52 padding. All five strings come from the shared top-level
 * `Transparence` namespace — this is its **fourth** user, after the article,
 * the Bibliotheque hub's dark version and the e-commerce page.
 *
 * Its column is pinned at `top: 72` in the export — the article's original
 * padding, **not** the 62.43 centring the new article page's frame uses. Two
 * frames of the same block genuinely differ here, so read the offset rather
 * than assuming; the section measures 370 either way.
 */
export function Transparence() {
  const t = useTranslations("Transparence");

  return (
    <section className="bg-white">
      <Container className="pt-12 pb-9 lg:pt-18 lg:pb-13">
        <div className="mx-auto flex max-w-300 flex-col gap-5">
          <div className="flex max-w-196 flex-col gap-2">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62">{t("sources")}</p>
          </div>

          <p className="text-body text-encre max-w-275">{t("disclaimer")}</p>

          <p className="text-small text-encre/62 max-w-275">
            {t.rich("translation", {
              link: (chunks) => <SignalLink>{chunks}</SignalLink>,
            })}
          </p>
        </div>
      </Container>
    </section>
  );
}
