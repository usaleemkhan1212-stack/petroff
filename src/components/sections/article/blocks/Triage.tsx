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
 * Figma's `outil-triage`, the article's second tool — and **a real control**,
 * matching `PETROFF-GABARIT-ARTICLE-v6.html`'s own `triage()`: choosing an
 * option marks it and rewrites the three result rows and the note beneath.
 *
 * The template hides the panel until a choice is made; Figma draws the third
 * option already chosen with its result open, so that is the initial state
 * here and the panel is never empty.
 */
export function Triage() {
  const t = useTranslations("ArticlePage.triage");
  const [selected, setSelected] = useState<number | null>(DEFAULT_OPTION);
  const result = selected === null ? null : options[selected];

  return (
    <div className="rounded-note-lg bg-lilas-2 p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-h3 text-encre font-poppins" id="triage-title-ad">
          {t("title")}
        </p>
        <span className="text-button font-poppins bg-encre/8 text-encre/62 rounded-full px-3 py-1">
          {t("pill")}
        </span>
      </div>
      <p className="text-body text-encre/62 mt-3">{t("lead")}</p>

      {/* Buttons with `aria-pressed`, not a radiogroup: there is one result
          panel rather than one per option. */}
      <div
        role="group"
        aria-labelledby="triage-title-ad"
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
                "rounded-field text-body text-encre focus-visible:outline-gold cursor-pointer bg-white px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                on
                  ? "border-periwinkle border-2"
                  : "border-encre/12 hover:border-encre border",
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
          className="rounded-note-lg border-encre/10 mt-5 flex flex-col gap-3 border bg-white px-4 py-5 sm:px-6 sm:py-5.5"
        >
          <dl>
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

          <p className="text-body text-encre/62">{t(`results.${result}.note`)}</p>

          <ConsultTrigger className="text-button font-poppins bg-red w-fit rounded-full px-6.5 py-3.5 text-white">
            {t("cta")}
          </ConsultTrigger>
        </div>
      )}
    </div>
  );
}
