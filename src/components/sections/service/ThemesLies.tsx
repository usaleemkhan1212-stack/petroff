import { useTranslations } from "next-intl";
import { LinkRow } from "@/components/sections/service/LinkRow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * The six neighbouring subjects, in Figma's order — read down each column,
 * not across: Figma splits them into two independent `vigil` lists.
 */
const columns = [
  ["rupture", "recouvrement", "fiscalite"],
  ["distribution", "ma", "arbitrage"],
] as const;

/**
 * Figma `13445:24999` — "Au-delà du litige entre associés".
 *
 * **Structurally identical to "Aller plus loin"** three sections earlier —
 * same head, same two-column `vigil` lists on a 96px gap, same ruled rows,
 * same closing button. Only the labels differ: its rows read "Parler à un
 * avocat →" and "Lire l'article" where that one reads "En savoir plus →" and
 * "Devis". The row markup they share lives in `LinkRow`.
 */
export function ThemesLies() {
  const t = useTranslations("ServicePage.themesLies");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="flex flex-col gap-3">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62 max-w-170">{t("lead")}</p>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-24">
            {columns.map((column, i) => (
              <ul key={i} className="flex min-w-0 flex-1 flex-col">
                {column.map((key) => (
                  <LinkRow
                    key={key}
                    title={t(`items.${key}.title`)}
                    body={t(`items.${key}.body`)}
                    cta={t("cta")}
                    secondary={t("read")}
                    href={`/expertises/${key}`}
                  />
                ))}
              </ul>
            ))}
          </div>

          <Button
            size="lg"
            className="w-full whitespace-normal sm:w-auto sm:self-start sm:whitespace-nowrap"
          >
            {t("bookCta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
