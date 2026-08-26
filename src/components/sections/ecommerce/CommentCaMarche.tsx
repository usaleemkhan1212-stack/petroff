import { useTranslations } from "next-intl";
import PackageBox from "@/assets/icons/package-box.svg";
import Storefront from "@/assets/icons/storefront.svg";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/** The five steps and the three entry rows, in Figma's order. */
const steps = ["dossier", "analyse", "devis", "execution", "suivi"] as const;
const rows = ["etape", "delai", "forfait"] as const;

/**
 * Figma's `13331:12970`: the five-step process beside the "Deux portes" card.
 *
 * Its two columns are 598.5 each with a 48px gutter, and the right one is
 * padded — so the row is a **grid**, not two `flex-1` siblings: `flex-basis: 0`
 * cannot resolve below a padded item's padding, which would hand the card its
 * own 28px twice over and take the same from the steps. Same fix as Quand
 * consulter.
 *
 * The two doors are a **picture of a chosen state**, not controls: Figma marks
 * the first one selected and gives the second no target, exactly as the two
 * article tools do. Reproduced with `aria-current` on a list row.
 */
export function CommentCaMarche() {
  const t = useTranslations("EcommercePage.process");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-7">
            <div className="flex flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
              <p className="text-body text-encre/62">{t("lead")}</p>
            </div>

            <ol className="flex flex-col gap-7">
              {steps.map((key, index) => (
                <li key={key}>
                  <Card className="rounded-note-lg flex items-start gap-4 p-6">
                    {/* The numeral is decoration — the <ol> carries the order. */}
                    <span
                      aria-hidden="true"
                      className="rounded-field bg-lilas-2 text-h3 font-poppins text-periwinkle flex size-11 shrink-0 items-center justify-center"
                    >
                      {index + 1}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <h3 className="text-h3 text-encre">
                        {t(`steps.${key}.title`)}
                      </h3>
                      <p className="text-body text-encre/62">
                        {t(`steps.${key}.body`)}
                      </p>
                    </div>
                  </Card>
                </li>
              ))}
            </ol>
          </div>

          {/*
            Sticky at `lg`, like the Principe and Parlons-en cards. It is ~545
            tall against the steps column's ~1075, so it pins at 24px and rides
            the five steps past. `self-start` is what makes that possible — a
            stretched grid item fills the row and has nothing left to stick
            against. Below `lg` the two stack and it goes back to static.
          */}
          <Card className="flex min-w-0 flex-col gap-4 p-6 sm:p-7 lg:sticky lg:top-6 lg:self-start">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("doors.overline")}
            </p>
            <h3 className="text-h3 text-encre">{t("doors.title")}</h3>

            {/* A lilas trough holding the two doors; the first is chosen. */}
            <ul className="rounded-tile bg-lilas flex flex-col gap-2 p-2 sm:flex-row">
              {(
                [
                  { key: "creation", Icon: Storefront, chosen: true },
                  { key: "enLigne", Icon: PackageBox, chosen: false },
                ] as const
              ).map(({ key, Icon, chosen }) => (
                <li
                  key={key}
                  aria-current={chosen ? "true" : undefined}
                  className={cn(
                    "rounded-note flex min-w-0 flex-1 flex-col gap-2 p-4",
                    chosen &&
                      "bg-white shadow-[0px_8px_22px_0px_rgba(18,41,77,0.1)]",
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    width={26}
                    height={26}
                    className={chosen ? "text-gold" : "text-encre/62"}
                  />
                  <p
                    className={cn(
                      "text-small-strong",
                      chosen ? "text-encre" : "text-encre/62",
                    )}
                  >
                    {t(`doors.${key}.label`)}
                  </p>
                  <p className="text-small text-encre/62">
                    {t(`doors.${key}.note`)}
                  </p>
                </li>
              ))}
            </ul>

            <span aria-hidden="true" className="bg-encre/10 h-px w-full" />

            <div className="flex flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("entry.overline")}
              </p>
              <p className="text-h4 font-poppins text-encre">
                {t("entry.title")}
              </p>

              <dl className="flex flex-col gap-2">
                {rows.map((key, index) => (
                  <div key={key} className="flex flex-col gap-2">
                    {/* Figma draws a 2/2 dashed encre/10 rule between rows. */}
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className="border-encre/10 w-full border-t border-dashed"
                      />
                    ) : null}
                    <div className="flex flex-wrap items-center justify-between gap-x-4">
                      <dt className="text-small text-encre/62">
                        {t(`entry.rows.${key}.label`)}
                      </dt>
                      <dd className="text-small-strong text-encre">
                        {t(`entry.rows.${key}.value`)}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              {/* Full width, unlike every other CTA on this page. */}
              <Button variant="gold" size="lg" className="w-full px-0">
                {t("entry.cta")}
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
