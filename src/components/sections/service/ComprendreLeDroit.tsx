import { ConsultTrigger } from "@/components/consultation/ConsultButton";
import { useTranslations } from "next-intl";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * The six levers, in Figma's order.
 *
 * Each closes on a **tinted pill with encre copy** rather than one of
 * `Button`'s variants, and the tints cycle blue / pink / gold across the six.
 */
const levers = [
  { key: "abus", tone: "bg-pale-blue" },
  { key: "assemblee", tone: "bg-pink-soft/40" },
  { key: "blocage", tone: "bg-pale-gold" },
  { key: "sortie", tone: "bg-pale-blue" },
  { key: "shotgun", tone: "bg-pink-soft/40" },
  { key: "etranger", tone: "bg-pale-gold" },
] as const;

/**
 * Figma `13445:17363` — "Ce que le droit français donne à l'associé en conflit".
 *
 * A 679 column of six levers beside the 470 `sticky` card. **The row takes no
 * gap** — 679 + 470 is 1149 inside 1245, which `justify-between` spaces by
 * exactly 96, the third section on this page built that way.
 *
 * Its lead says "Dix leviers" but the frame draws six. Left as written.
 */
export function ComprendreLeDroit() {
  const t = useTranslations("ServicePage.droit");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between xl:gap-0">
          <div className="flex min-w-0 flex-col gap-9 xl:w-169.75">
            <div className="flex flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
              <p className="text-body text-encre/62">{t("lead")}</p>
            </div>

            {/* Six rows flush against one another, each closing on its own
                encre/10 rule — the same shape "Comment nous procédons" uses. */}
            <ul className="flex flex-col">
              {levers.map(({ key, tone }) => (
                <li
                  key={key}
                  className="border-encre/10 flex flex-col items-start gap-6 border-b py-6"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-body-strong text-brique">
                      {t(`items.${key}.kicker`)}
                    </p>
                    <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                  </div>
                  <p className="text-small text-encre/62">{t(`items.${key}.body`)}</p>
                  <ConsultTrigger
                    className={cn(
                      "text-button font-poppins text-encre inline-flex items-center rounded-full px-7 py-4",
                      tone,
                    )}
                  >
                    {t("cta")}
                  </ConsultTrigger>
                </li>
              ))}
            </ul>
          </div>

          {/* Figma names this frame `sticky`, and at ~430 against a ~2050
              column it has the whole section to ride. */}
          <div className="bg-encre rounded-card flex flex-col items-start gap-6 p-6 sm:p-9 xl:sticky xl:top-6 xl:w-117.5 xl:self-start">
            <div className="flex flex-col gap-4">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("card.overline")}
              </p>
              <h3 className="text-price font-poppins max-w-92.25 text-white">
                {t("card.title")}
              </h3>
            </div>
            <p className="text-body text-white/70">{t("card.body")}</p>
            <ConsultButton size="lg" variant="gold">
              {t("card.cta")}
            </ConsultButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
