import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { missions } from "@/lib/contrats";
import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
} as const;

/** Fourth copy of this pill — extract to ui/ next time it is touched. */
const tag =
  "text-small-strong text-encre/62 border-encre/8 bg-lilas rounded-full border px-3 py-1";

export function Domaines() {
  const t = useTranslations("ContratsPage.domaines");

  return (
    <section className="bg-white">
      <Container className="py-24">
        <div className="flex flex-col gap-12">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            lead={t("lead")}
            className="max-w-170 gap-3"
            leadClassName="max-w-170"
          />

          <div className="flex flex-col gap-5">
            {/* Nine missions, 3 -> 2 -> 1, cards equal height per row. */}
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {missions.map(({ key, Icon, tone, raised }) => (
                <li key={key} className="flex">
                  {/*
                    Cards rest on lilas here, against the Contentieux page's
                    white, and lift to white with a 34px shadow on hover.
                    Figma draws the first card already in that lifted state, so
                    it is rendered that way rather than "corrected" — if that
                    turns out to be the designer demonstrating hover, drop
                    `raised` from the first mission and nothing else changes.
                  */}
                  <Card
                    className={cn(
                      "flex min-w-0 flex-1 flex-col gap-2 px-6 py-7 transition",
                      "hover:bg-white hover:shadow-[0px_14px_34px_rgba(0,0,0,0.1)]",
                      raised
                        ? "bg-white shadow-[0px_14px_34px_rgba(0,0,0,0.1)]"
                        : "bg-lilas",
                    )}
                  >
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

            <p className="text-small text-encre/62">{t("footnote")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
