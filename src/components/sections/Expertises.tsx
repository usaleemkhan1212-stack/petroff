import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { expertises } from "@/lib/expertises";
import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
  mint: "bg-pale-mint",
  /* Figma draws Petroff/Pink at 40% here, never at full strength. */
  pink: "bg-pink/40",
} as const;

export function Expertises() {
  const t = useTranslations("Expertises");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            lead={t("lead")}
          />

          {/* Figma lays this out as two rows of four; one grid reflows
              4 -> 2 -> 1 without duplicating the markup. */}
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {expertises.map(({ key, Icon, tone }) => (
              <li key={key} className="flex">
                <Card className="flex flex-1 flex-col gap-2 px-6 py-7">
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
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
