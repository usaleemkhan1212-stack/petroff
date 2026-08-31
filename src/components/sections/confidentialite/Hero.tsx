import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/**
 * Figma `13549:1042` — the privacy page's head, over the full-width rule
 * `13549:1048` (1920x1 in `stone`, #e9e4d8, which is an exact token match).
 *
 * One 1245 column on a uniform 16px gap: overline, the Display H1, a meta line
 * and a 920-wide lead. The band is **64 above and 36 below**, not a symmetric
 * pad — the rule then closes it.
 *
 * The meta line takes `whitespace-pre-wrap` because Figma types three spaces
 * either side of its middle dot; HTML would otherwise collapse them to one and
 * the separator would read tight.
 */
export function Hero() {
  const t = useTranslations("ConfidentialitePage.hero");

  return (
    <section className="border-stone bg-lilas border-b">
      <Container className="pt-12 pb-9 lg:pt-16">
        <div className="flex flex-col gap-4">
          <p className="text-overline font-poppins text-brique uppercase">
            {t("overline")}
          </p>
          <h1 className="text-display text-encre font-poppins">{t("title")}</h1>

          <p className="text-body text-encre/62 whitespace-pre-wrap">
            {t.rich("meta", {
              s: (chunks) => (
                <span className="text-body-strong text-encre">{chunks}</span>
              ),
            })}
          </p>

          <p className="text-lead text-encre/62 max-w-230">{t("lead")}</p>
        </div>
      </Container>
    </section>
  );
}
