import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { facons } from "@/lib/facons";
import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
} as const;

export function Facons() {
  const t = useTranslations("ExpertisesPage.facons");

  return (
    <section className="bg-lilas">
      <Container className="py-24">
        <div className="flex flex-col gap-12">
          {/* No lead in this one — overline and H2 only. */}
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            className="gap-3"
          />

          {/* Three engagement models, equal height; 3 -> 1. */}
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {facons.map(({ key, Icon, tone, href }) => (
              <li key={key} className="flex">
                <Card className="flex flex-1 flex-col gap-2 px-7 py-9">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "rounded-tile flex size-13 shrink-0 items-center justify-center",
                      tones[tone],
                    )}
                  >
                    <Icon className="text-encre" />
                  </span>
                  <span aria-hidden="true" className="h-1.5" />

                  <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                  <p className="text-body text-encre/62">
                    {t(`items.${key}.description`)}
                  </p>
                  <span aria-hidden="true" className="h-2.5" />

                  <MaybeLink
                    href={href}
                    className="text-button font-poppins text-brique hover:text-encre inline-flex items-center gap-2 self-start transition-colors"
                  >
                    {t(`items.${key}.cta`)}
                    <span aria-hidden="true">&rarr;</span>
                  </MaybeLink>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
