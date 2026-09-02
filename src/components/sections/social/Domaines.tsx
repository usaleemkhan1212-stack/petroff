import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { missions } from "@/lib/social";
import { cn } from "@/lib/utils";

/*
  Four tints since the redesign. The pink is Figma's `#EFCFD9` at 40%, which
  composites within 3/255 of `--color-pink-soft` — the same reuse the hub and
  the Contentieux grid make.
*/
const tones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
  mint: "bg-pale-mint",
  pink: "bg-pink-soft/40",
} as const;

/** Fourth copy of this pill — extract to ui/ next time it is touched. */
const tag =
  "text-small-strong text-encre/62 border-encre/8 bg-lilas rounded-full border px-3 py-1";

export function Domaines() {
  const t = useTranslations("SocialPage.domaines");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
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
              {missions.map(({ key, Icon, tone }) => (
                <li key={key} className="flex">
                  {/*
                    White on white, like the Contentieux page. Settled by
                    counting pixels in the node render: #ffffff covers both the
                    section and every card, and lilas appears only inside the
                    tag pills. Figma draws a shadow on the first card and none
                    on the others, which is the designer showing `Card`'s hover
                    state — exactly as on the home Domaines and Actus grids.
                    The blur is 34px here rather than Card's default 17.
                  */}
                  {/* A flat 16 between every child, on all nine cards — unlike
                      the Contrats grid, where one card is still set to 8. */}
                  <Card className="flex min-w-0 flex-1 flex-col gap-4 px-6 py-7 transition hover:shadow-[0px_14px_34px_rgba(0,0,0,0.1)]">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "rounded-tile flex size-13 shrink-0 items-center justify-center",
                        tones[tone],
                      )}
                    >
                      <Icon className="text-encre" />
                    </span>

                    <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                    <p className="text-body text-encre/62">
                      {t(`items.${key}.description`)}
                    </p>

                    <ul className="flex flex-wrap gap-2">
                      {(t.raw(`items.${key}.tags`) as string[]).map((label) => (
                        <li key={label} className={tag}>
                          {label}
                        </li>
                      ))}
                    </ul>

                    {/* New in the redesign: a ruled footer whose pill takes the
                        card's own tint. Inert — no per-domain page exists. */}
                    <div className="mt-auto flex flex-col gap-4">
                      <span aria-hidden="true" className="bg-encre/10 h-px w-full" />
                      <span
                        className={cn(
                          "text-button font-poppins text-encre w-fit rounded-full px-7 py-4",
                          tones[tone],
                        )}
                      >
                        {t("cta")}
                      </span>
                    </div>
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
