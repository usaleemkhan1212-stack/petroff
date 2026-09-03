import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/**
 * Figma `13852:934` — the legal notice's head, and the tallest of the four:
 * **433 against the others' 361**, because its title runs to two lines at 68px.
 * Everything else is the shared column — overline, Display H1, a meta line with
 * two Inter SemiBold runs and a 920-wide lead, on a uniform 16px gap, banded 64
 * above and 36 below.
 *
 * **It closes on nothing**, like the cookie policy's and unlike the privacy and
 * mediation ones, which draw a full-width `stone` rule of their own. Here the
 * document's first section supplies the rule instead.
 */
export function Hero() {
  const t = useTranslations("MentionsPage.hero");

  return (
    <section className="bg-lilas">
      <Container className="pt-12 pb-9 lg:pt-16">
        {/* Figma marks this column `word-break: break-word` on all four legal
            frames, and it is load-bearing: at 320 the fluid `text-display`
            still draws 40px, and "d’utilisation" is wider than the 280px
            content box. */}
        <div className="flex flex-col gap-4 break-words">
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
