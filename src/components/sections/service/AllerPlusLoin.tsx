import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LinkRow } from "@/components/sections/service/LinkRow";

/**
 * The four interventions, in Figma's order — read down each column, not
 * across: Figma splits them into two independent `vigil` lists.
 */
const columns = [
  ["constitution", "transformation"],
  ["pacte", "preuve"],
] as const;

/**
 * Figma `13445:24956` — "Sécuriser votre société".
 *
 * Two lists of two on a **96px gap**, each row closing on its own `encre/10`
 * rule with no gap between rows — the same anatomy as "Comment nous procédons"
 * and the six levers.
 */
export function AllerPlusLoin() {
  const t = useTranslations("ServicePage.allerPlusLoin");

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
                    secondary={t("quote")}
                    href={`/prestations/${key}`}
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
