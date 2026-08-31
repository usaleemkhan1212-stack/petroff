"use client";

import { ConsultTrigger } from "@/components/consultation/ConsultButton";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const options = ["processus", "unilateral", "denie", "officier"] as const;
const rows = ["diligence", "delai", "honoraires"] as const;

/**
 * **Closed by default, and it toggles** — no option chosen and no result panel
 * until one is clicked, and clicking the chosen option again clears it and
 * closes the panel. The template does neither: `#tri-res` ships `hidden` but
 * never hides again, and Figma draws the third option already open. Both are
 * deliberate departures, asked for.
 */
const DEFAULT_OPTION: number | null = null;

/**
 * Figma's `outil-triage` (`13318:2948`): lilas-2, 18px corners, four options
 * and a result panel.
 *
 * **It is a real control**, matching `PETROFF-GABARIT-ARTICLE-v6.html`'s own
 * `triage()`: choosing an option marks it and rewrites the three result rows
 * and the note beneath. The template hides the panel until a choice is made;
 * Figma draws the third option already chosen with its result open, so that is
 * the initial state here and the panel is never empty.
 *
 * The chosen row is white with a 2px periwinkle border and its label in Inter
 * SemiBold; the rest are white at 90% with a hairline `encre/12`, and take the
 * template's `.opt:hover` red edge.
 *
 * **Its result panel is pale blue** — it was a white bordered box. Its CTA is
 * an encre button with a separate periwinkle "15 minutes gratuites" beside it.
 *
 * The block uses spacer frames rather than a column gap — 18 above the
 * options, 20 below — so those are margins here.
 */
export function Triage() {
  const t = useTranslations("ArticlePage.triage");
  const page = useTranslations("NewArticlePage.triage");
  const [selected, setSelected] = useState<number | null>(DEFAULT_OPTION);
  const result = selected === null ? null : options[selected];

  return (
    <div className="rounded-note-lg bg-lilas-2 flex flex-col p-5 sm:p-7">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-h3 text-encre font-poppins" id="triage-title">
            {t("title")}
          </p>
          <span className="text-button font-poppins bg-encre/8 text-encre/62 rounded-full px-3 py-1">
            {t("pill")}
          </span>
        </div>
        <p className="text-body text-encre/62">{t("lead")}</p>
      </div>

      {/*
        Buttons with `aria-pressed`, not a radiogroup: there is one result
        panel rather than one per option, so a radiogroup would promise a
        widget this is not — the same call the Bibliotheque's filter tabs make.
      */}
      <div
        role="group"
        aria-labelledby="triage-title"
        className="mt-4.5 flex flex-col gap-2.5"
      >
        {options.map((key, i) => {
          const on = i === selected;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(on ? null : i)}
              className={cn(
                "rounded-field focus-visible:outline-gold cursor-pointer px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                on
                  ? "border-periwinkle text-body-strong text-encre border-2 bg-white"
                  : "border-encre/12 hover:border-encre text-body text-encre border bg-white/90",
              )}
            >
              {t(`options.${key}`)}
            </button>
          );
        })}
      </div>

      {/* The panel only exists once a branch is chosen. */}
      {result === null ? null : (
        <div
          aria-live="polite"
          className="rounded-note-lg border-encre/10 bg-pale-blue mt-5 flex flex-col gap-3 border px-3 py-4 sm:px-6 sm:py-5.5"
        >
          <dl className="flex flex-col">
            {rows.map((key, index) => (
              <div
                key={key}
                className={cn(
                  "flex flex-col gap-1 py-2.5 sm:flex-row sm:gap-4.5",
                  index < rows.length - 1 && "border-encre/12 border-b border-dashed",
                )}
              >
                <dt className="text-body text-encre sm:w-40 sm:shrink-0">
                  {t(`rows.${key}.label`)}
                </dt>
                <dd className="text-h4 font-poppins text-encre min-w-0 flex-1">
                  {t(`results.${result}.${key}`)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-4">
            <p className="text-small text-encre/62">{t(`results.${result}.note`)}</p>
            <div className="flex flex-wrap items-center gap-4">
              {/* Inert, like every other form control on this page. */}
              <ConsultTrigger className="text-button font-poppins bg-encre rounded-full px-6.5 py-3.5 text-white">
                {page("cta")}
              </ConsultTrigger>
              <span className="text-button font-poppins text-periwinkle">
                {page("ctaNote")}
              </span>
            </div>
            <p className="text-small text-encre/62">
              {page.rich("disclaimer", {
                s: (chunks) => (
                  <span className="text-button font-poppins">{chunks}</span>
                ),
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
