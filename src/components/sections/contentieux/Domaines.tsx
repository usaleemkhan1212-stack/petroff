import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { missions } from "@/lib/contentieux";
import { cn } from "@/lib/utils";

/*
  Four tints since the redesign, non-repeating across the nine missions. The
  pink is Figma's `#EFCFD9` at 40%, which composites to within 3/255 of
  `--color-pink-soft` — the same reuse the hub's grid makes.
*/
const tones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
  mint: "bg-pale-mint",
  pink: "bg-pink-soft/40",
} as const;

/** Same pill the hub's Domaines tags use — identical values in both comps. */
const tag =
  "text-small-strong text-encre/62 border-encre/8 rounded-full border px-3 py-1";

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
              {missions.map(({ key, Icon, tone, whiteTag }) => (
                <li key={key} className="flex">
                  {/* Figma spaces every child of the card by a flat 16 since
                      the redesign, where it used to mix an 8px gap with 12/14px
                      spacer frames. */}
                  <Card className="flex flex-1 flex-col gap-4 px-6 py-7">
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
                        <li
                          key={label}
                          className={cn(tag, whiteTag ? "bg-white" : "bg-lilas")}
                        >
                          {label}
                        </li>
                      ))}
                    </ul>

                    {/* New in the redesign: a ruled footer closing each card.
                        One pale-blue pill here, where the hub's cards carry a
                        brique text link beside theirs. Inert — the per-mission
                        pages do not exist. */}
                    <div className="mt-auto flex flex-col gap-4">
                      <span aria-hidden="true" className="bg-encre/10 h-px w-full" />
                      {/* The pill takes the card's own tint — Figma grounds
                          it in whatever the icon tile uses, not a flat blue. */}
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
