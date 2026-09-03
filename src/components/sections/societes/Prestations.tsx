import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prestations } from "@/lib/societes";
import { cn } from "@/lib/utils";

/* Four tints since the redesign — blue, gold, mint, pink across the row. */
const tones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
  mint: "bg-pale-mint",
  pink: "bg-pink-soft/40",
} as const;

/** Fifth copy of this pill — extract to ui/ next time it is touched. */
const tag =
  "text-small-strong text-encre/62 border-encre/8 bg-lilas rounded-full border px-3 py-1";

export function Prestations() {
  const t = useTranslations("SocietesPage.prestations");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Figma caps the title at 680 too, which is what wraps it to two lines. */}
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            lead={t("lead")}
            className="max-w-170 gap-3"
            leadClassName="max-w-170"
          />

          {/* Four forfait cards, 4 -> 2 -> 1. */}
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {prestations.map(({ key, Icon, tone }) => (
              <li key={key} className="flex">
                <Card className="flex min-w-0 flex-1 flex-col gap-2 px-6 py-7">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "rounded-tile flex size-13 shrink-0 items-center justify-center",
                      tones[tone],
                    )}
                  >
                    <Icon className="text-encre" />
                  </span>
                  <span aria-hidden="true" className="h-3" />

                  <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                  <p className="text-body text-encre/62">
                    {t(`items.${key}.description`)}
                  </p>
                  {/* 10px here, not the 12px Domaines uses. */}
                  <span aria-hidden="true" className="h-2.5" />

                  <ul className="flex flex-wrap gap-2">
                    {(t.raw(`items.${key}.tags`) as string[]).map((label) => (
                      <li key={label} className={tag}>
                        {label}
                      </li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
