import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/**
 * Figma `13833:432` — the mediation notice's head, over the full-width rule
 * `13833:438` (1920x1 in `stone`, an exact `--color-stone` match).
 *
 * The same column the two other legal documents carry: overline, Display H1, a
 * meta line with two Inter SemiBold runs, and a 920-wide lead, on a uniform
 * 16px gap and banded 64 above and 36 below.
 *
 * **It closes on the rule, where the cookie policy closes on nothing** — that
 * frame has no such node and no room for one. Two frames, two answers; read
 * each rather than carrying one across.
 */
export function Hero() {
  const t = useTranslations("MediateurPage.hero");

  return (
    <section className="border-stone bg-lilas border-b">
      <Container className="pt-12 pb-9 lg:pt-16">
        {/* Figma marks this column `word-break: break-word` on all three
            legal frames. It is load-bearing here: at 320 the fluid
            `text-display` still draws 40px, and a single long word in the
            title ("consommation", "confidentialité") is wider than the
            280px content box. */}
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
