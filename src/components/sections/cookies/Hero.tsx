import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/**
 * Figma `13872:934` — the cookie policy's head.
 *
 * The privacy hero's anatomy exactly: one 1245 column on a uniform 16px gap —
 * overline, the Display H1, a meta line with two Inter SemiBold runs, and a
 * 920-wide lead — banded **64 above and 36 below**, not a symmetric pad.
 *
 * **It closes on nothing, where the privacy hero closes on a full-width
 * `stone` rule.** That frame draws the rule as its own 1920x1 node; this one
 * has no such node, and 64 + 261 + 36 is exactly its 361, so there is no room
 * for one. Confirmed against the node's own render: lilas to the last row.
 *
 * Its meta needs no `whitespace-pre-wrap` either — the privacy frame types
 * three spaces either side of its middle dot and this one types one.
 */
export function Hero() {
  const t = useTranslations("CookiesPage.hero");

  return (
    <section className="bg-lilas">
      <Container className="pt-12 pb-9 lg:pt-16">
        <div className="flex flex-col gap-4">
          <p className="text-overline font-poppins text-brique uppercase">
            {t("overline")}
          </p>
          <h1 className="text-display text-encre font-poppins">{t("title")}</h1>

          <p className="text-body text-encre/62">
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
