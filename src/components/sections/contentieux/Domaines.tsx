import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { missions } from "@/lib/contentieux";
import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
} as const;

/** Same pill the hub's Domaines tags use — identical values in both comps. */
const tag =
  "text-small-strong text-encre/62 border-encre/8 bg-lilas rounded-full border px-3 py-1";

export function Domaines() {
  const t = useTranslations("ContentieuxPage.domaines");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            lead={t("lead")}
            className="gap-3"
            leadClassName="max-w-170"
          />

          {/* The footnote sits 20px under the grid, inside the same stack. */}
          <div className="flex flex-col gap-5">
            {/* Nine missions, 3 -> 2 -> 1, cards equal height per row. */}
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {missions.map(({ key, Icon, tone }) => (
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
                    {/* Figma closes each card with a 14px spacer below the tags. */}
                    <span aria-hidden="true" className="h-3.5" />
                  </Card>
                </li>
              ))}
            </ul>

            <p className="text-small text-encre/62">{t("footnote")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
