import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { espaceFeatures, espaceProgress, espaceRows } from "@/lib/contentieux";
import { cn } from "@/lib/utils";

/* Four tints since the redesign — blue, gold, pink, mint down the list. */
const tones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
  mint: "bg-pale-mint",
  pink: "bg-pink-soft/40",
} as const;

/** How each mock status reads: settled, waiting on someone, not started. */
const statusTones = {
  done: "text-small-strong text-result-green",
  waiting: "text-small-strong text-brique",
  todo: "text-small text-encre/62",
} as const;

export function Espace() {
  const t = useTranslations("ContentieuxPage.espace");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        {/*
          Copy and mock sit side by side, stacking below lg. Figma marks the
          row items-center but gives both cells self-stretch, which overrides
          it — so the columns are equal height and the mock fills its cell with
          its content packed to the top. Grid stretches by default.
        */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            {/* The lead sits 20px under the H2 here, not the usual 12. */}
            <SectionHeading
              overline={t("overline")}
              title={t("title")}
              className="gap-3"
            />
            <p className="text-body text-encre/62">{t("lead")}</p>

            <ul className="flex flex-col gap-4">
              {espaceFeatures.map(({ key, Icon, tone }) => (
                <li key={key} className="flex items-start gap-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "rounded-field flex size-11 shrink-0 items-center justify-center",
                      tones[tone],
                    )}
                  >
                    <Icon className="text-encre" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="text-button font-poppins text-encre">
                      {t(`features.${key}.title`)}
                    </p>
                    <p className="text-small text-encre/62">
                      {t(`features.${key}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Static preview of the portal, not a live view. */}
          <figure
            aria-label={t("mock.label")}
            className="rounded-card border-encre/7 flex h-full flex-col gap-3 border bg-white p-6 shadow-[0px_24px_60px_0px_rgba(0,0,0,0.1)]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-button font-poppins text-encre">{t("mock.title")}</p>
              <span className="text-small-strong bg-pale-gold text-encre ml-auto rounded-full px-3 py-1">
                {t("mock.badge")}
              </span>
            </div>

            <div
              role="progressbar"
              aria-label={t("mock.progressLabel")}
              aria-valuenow={espaceProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="bg-lilas h-2 w-full overflow-hidden rounded-full"
            >
              {/* Width is data, so it comes from the value rather than a class. */}
              <span
                className="bg-periwinkle block h-full rounded-full"
                style={{ width: `${espaceProgress}%` }}
              />
            </div>

            {/*
              Figma makes each row a direct child of the card, so the card's
              12px gap falls between every row as well — not just around the
              block. Without gap-3 here the rows sit flush and the list ends
              ~50px short of the designed height.
            */}
            <dl className="flex flex-col gap-3">
              {espaceRows.map(({ key, tone }, index) => (
                <div
                  key={key}
                  className={cn(
                    "flex flex-wrap items-center gap-3 py-2",
                    // Figma leaves the last row without a rule.
                    index < espaceRows.length - 1 &&
                      "border-b border-dashed border-black/10",
                  )}
                >
                  <dt className="text-small text-encre/62">
                    {t(`mock.rows.${key}.label`)}
                  </dt>
                  <dd className={cn("ml-auto text-right", statusTones[tone])}>
                    {t(`mock.rows.${key}.status`)}
                  </dd>
                </div>
              ))}
            </dl>
          </figure>
        </div>
      </Container>
    </section>
  );
}
