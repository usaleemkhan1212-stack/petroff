import { useTranslations } from "next-intl";
import PlusCircle from "@/assets/icons/plus-circle.svg";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { domaines } from "@/lib/domaines";
import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
} as const;

/** Shared by the domain tags and, in inverse, by the transverse card. */
const tag =
  "text-small-strong text-encre/62 border-encre/8 bg-lilas rounded-full border px-3 py-1";

const cta =
  "text-button font-poppins inline-flex items-center gap-2 self-start transition-colors";

export function Domaines() {
  const t = useTranslations("ExpertisesPage.domaines");

  return (
    <section className="bg-white">
      <Container className="py-24">
        <div className="flex flex-col gap-12">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            lead={t("lead")}
            className="gap-3"
            leadClassName="max-w-170"
          />

          {/* Eleven domains plus the transverse card; 3 -> 2 -> 1. */}
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {domaines.map(({ key, Icon, tone, href }) => (
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
                  <span aria-hidden="true" className="h-3" />

                  <ul className="flex flex-wrap gap-2">
                    {(t.raw(`items.${key}.tags`) as string[]).map((label) => (
                      <li key={label} className={tag}>
                        {label}
                      </li>
                    ))}
                  </ul>
                  <span aria-hidden="true" className="h-3.5" />

                  <MaybeLink
                    href={href}
                    className={cn(cta, "text-brique hover:text-encre")}
                  >
                    {t("cta")}
                    <span aria-hidden="true">&rarr;</span>
                  </MaybeLink>
                </Card>
              </li>
            ))}

            {/* Inverse card closing the grid — encre ground, gold CTA. */}
            <li className="flex">
              <Card className="border-encre bg-encre flex flex-1 flex-col gap-2 px-6 py-7">
                <span
                  aria-hidden="true"
                  className="rounded-tile flex size-13 shrink-0 items-center justify-center bg-white/12"
                >
                  <PlusCircle className="text-white" />
                </span>
                <span aria-hidden="true" className="h-3" />

                <h3 className="text-h3 text-white">{t("transverse.title")}</h3>
                <p className="text-body text-white/70">{t("transverse.description")}</p>
                <span aria-hidden="true" className="h-3.5" />

                <MaybeLink
                  href="/contact"
                  className={cn(cta, "text-gold hover:text-pale-gold")}
                >
                  {t("transverse.cta")}
                  <span aria-hidden="true">&rarr;</span>
                </MaybeLink>
              </Card>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
