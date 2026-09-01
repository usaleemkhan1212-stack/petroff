"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import PackageBox from "@/assets/icons/package-box.svg";
import Storefront from "@/assets/icons/storefront.svg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/** Five steps per door, and the three entry rows. */
const steps = ["s1", "s2", "s3", "s4", "s5"] as const;
const rows = ["etape", "delai", "forfait"] as const;

/** The two doors, in Figma's order; the first is the one it draws chosen. */
const doors = [
  { key: "creation", Icon: Storefront },
  { key: "enLigne", Icon: PackageBox },
] as const;

type Door = (typeof doors)[number]["key"];

/**
 * Figma's `13331:12970`: the five-step process beside the "Deux portes" card.
 *
 * Its two columns are 598.5 each with a 48px gutter, and the right one is
 * padded — so the row is a **grid**, not two `flex-1` siblings: `flex-basis: 0`
 * cannot resolve below a padded item's padding, which would hand the card its
 * own 28px twice over and take the same from the steps. Same fix as Quand
 * consulter.
 *
 * **The two doors are a real control.** Figma marks the first one selected and
 * gives the second no target, so it was built as a picture of that state;
 * `public/petroff-deux-portes-demo.html` supplies the behaviour it could not
 * draw — choosing a door rewrites **both** columns, the five steps on the left
 * and the entry block on the right. Figma's own copy is exactly that demo's
 * first door, so the section opens on the comp's own state.
 *
 * Buttons with `aria-pressed`, not a `role="tablist"`: two separate regions
 * are driven rather than one panel per tab, so a tablist would promise a
 * widget this is not — the same call the Bibliotheque's filters make. The demo
 * uses `role="tab"`; this is the one place it is not followed.
 */
export function CommentCaMarche() {
  const t = useTranslations("EcommercePage.process");
  const [door, setDoor] = useState<Door>("creation");

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

            <ol aria-live="polite" className="flex flex-col gap-7">
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
                        {t(`paths.${door}.steps.${key}.title`)}
                      </h3>
                      <p className="text-body text-encre/62">
                        {t(`paths.${door}.steps.${key}.body`)}
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

            {/* A lilas trough holding the two doors. */}
            <div className="rounded-tile bg-lilas flex flex-col gap-2 p-2 sm:flex-row">
              {doors.map(({ key, Icon }) => {
                const chosen = key === door;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={chosen}
                    onClick={() => setDoor(key)}
                    className={cn(
                      "rounded-note focus-visible:outline-gold flex min-w-0 flex-1 cursor-pointer flex-col gap-2 p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2",
                      chosen
                        ? "bg-white shadow-[0px_8px_22px_0px_rgba(18,41,77,0.1)]"
                        : "hover:bg-white/60",
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
                    <p className="text-small text-encre/62">{t(`doors.${key}.note`)}</p>
                  </button>
                );
              })}
            </div>

            <span aria-hidden="true" className="bg-encre/10 h-px w-full" />

            <div aria-live="polite" className="flex flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("entry.overline")}
              </p>
              <p className="text-h4 font-poppins text-encre">
                {t(`paths.${door}.title`)}
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
                        {t(`paths.${door}.values.${key}`)}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              {/* Full width, unlike every other CTA on this page. */}
              <ConsultButton variant="gold" size="lg" className="w-full px-0">
                {t(`paths.${door}.cta`)}
              </ConsultButton>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
