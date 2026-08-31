"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Select } from "@/components/ui/Select";
import {
  analyse,
  defaults,
  natures,
  niveaux,
  qualites,
  type Analysis,
  type Nature,
  type Niveau,
  type Qualite,
} from "@/lib/simulator";
import { cn } from "@/lib/utils";

const rows = ["ecrit", "presomption", "charge", "mention"] as const;

const fieldBox =
  "rounded-field border-encre/12 hover:border-encre/30 text-body text-encre w-full border bg-white px-4.5 py-3.25 " +
  "transition-colors outline-none focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * Figma's `outil-simulateur`: a filled-in form with its result already shown.
 *
 * Deliberately static. Figma gives each field one chosen value and no option
 * list, and labels the panel "Résultat (démo)" — so this is a picture of a
 * completed run, not a working tool, and the fields render as read-only rows
 * rather than pretending to be controls. Same call as the Tools section's
 * inert inputs, and it keeps the article a server component.
 */
export function Simulator() {
  const t = useTranslations("ArticlePage.simulator");

  const [nature, setNature] = useState<Nature>(defaults.nature);
  const [qualite, setQualite] = useState<Qualite>(defaults.qualite);
  const [montant, setMontant] = useState(String(defaults.montant));
  const [niveau, setNiveau] = useState<Niveau>(defaults.niveau);
  const [result, setResult] = useState<Analysis | null>(null);

  type Params = Parameters<typeof analyse>[0];
  const run = (next?: Partial<Params>) =>
    analyse({ nature, qualite, montant: Number(montant) || 0, niveau, ...next });

  /* Once the panel is open it tracks the form, so a changed field can never
     leave a stale verdict under it. */
  const sync = (next: Partial<Params>) =>
    setResult((shown) => (shown ? run(next) : null));

  /* Labels resolved per field so every message key stays a literal. */
  const options = {
    nature: natures.map((v) => ({ value: v, label: t(`fields.nature.options.${v}`) })),
    qualite: qualites.map((v) => ({
      value: v,
      label: t(`fields.qualite.options.${v}`),
    })),
    niveau: niveaux.map((v) => ({ value: v, label: t(`fields.niveau.options.${v}`) })),
  };

  const values = result && {
    ecrit: t(`results.ecrit.${result.ecrit}`),
    presomption: t(`results.presomption.${result.presomption}`),
    charge: t(`results.charge.${result.presomption}`),
    mention: t(`results.mention.${result.mention}`),
  };

  const select = (
    key: "nature" | "qualite" | "niveau",
    value: string,
    list: { value: string; label: string }[],
    onChange: (next: string) => void,
  ) => (
    <Select
      id={`sim-ad-${key}`}
      labelledBy={`sim-ad-${key}-label`}
      value={value}
      options={list}
      onChange={(next) => {
        onChange(next);
        sync({ [key]: next } as Partial<Params>);
      }}
      className={cn(fieldBox, "cursor-pointer text-left")}
    />
  );

  return (
    <div className="rounded-note-lg bg-lilas-2 p-5 sm:p-7">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-h3 text-encre font-poppins">{t("title")}</p>
          <span className="text-button font-poppins bg-encre/8 text-encre/62 rounded-full px-3 py-1">
            {t("pill")}
          </span>
        </div>
        <p className="text-body text-encre/62">{t("lead")}</p>
      </div>

      {/* 391px fields, two per row at the column's 881 — 14px row gap, 24 column. */}
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3.5">
        <div className="flex w-97.75 max-w-full flex-col gap-1.5">
          <span id="sim-ad-nature-label" className="text-small-strong text-encre/62">
            {t("fields.nature.label")}
          </span>
          {select("nature", nature, options.nature, (v) => setNature(v as Nature))}
        </div>

        <div className="flex w-97.75 max-w-full flex-col gap-1.5">
          <span id="sim-ad-qualite-label" className="text-small-strong text-encre/62">
            {t("fields.qualite.label")}
          </span>
          {select("qualite", qualite, options.qualite, (v) => setQualite(v as Qualite))}
        </div>

        <div className="flex w-97.75 max-w-full flex-col gap-1.5">
          <label htmlFor="sim-ad-montant" className="text-small-strong text-encre/62">
            {t("fields.montant.label")}
          </label>
          <input
            id="sim-ad-montant"
            type="number"
            inputMode="numeric"
            min={0}
            value={montant}
            onChange={(e) => {
              setMontant(e.target.value);
              sync({ montant: Number(e.target.value) || 0 });
            }}
            className={fieldBox}
          />
        </div>

        <div className="flex w-97.75 max-w-full flex-col gap-1.5">
          <span id="sim-ad-niveau-label" className="text-small-strong text-encre/62">
            {t("fields.niveau.label")}
          </span>
          {select("niveau", niveau, options.niveau, (v) => setNiveau(v as Niveau))}
        </div>
      </div>

      <div className="mt-4.5 flex flex-col gap-3.5">
        <button
          type="button"
          onClick={() => setResult(run())}
          className="text-button font-poppins bg-encre hover:bg-encre/90 focus-visible:outline-gold w-fit cursor-pointer rounded-full px-6.5 py-3.5 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t("cta")}
        </button>
        <p className="text-small text-encre/62">{t("note")}</p>
      </div>

      {result === null || values === null ? null : (
        <div
          aria-live="polite"
          className="rounded-note-lg border-encre/10 mt-5 border bg-white px-4 py-5 sm:px-6 sm:py-5.5"
        >
          <div className="flex flex-col gap-3">
            <dl>
              {rows.map((key, index) => (
                <div
                  key={key}
                  className={`flex flex-col gap-1 py-2.5 sm:flex-row sm:gap-4.5 ${
                    index < rows.length - 1
                      ? "border-encre/12 border-b border-dashed"
                      : ""
                  }`}
                >
                  {/* Fixed label column, value flexes: wrapping the row instead
                    dropped the longest value onto a second line. */}
                  <dt className="text-body text-encre sm:w-95 sm:shrink-0">
                    {t(`rows.${key}.label`)}
                  </dt>
                  <dd className="text-h4 font-poppins text-encre min-w-0 flex-1">
                    {values[key]}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Pale rose at 30% with red copy since the redesign; it was a
              brique tint before, the only one on the site. */}
            <p className="rounded-field text-body bg-pale-rose/30 text-red px-4.5 py-3.5">
              {t.rich(`results.verdict.${result.verdict}`, {
                b: (chunks) => <span className="text-h4 font-poppins">{chunks}</span>,
              })}
            </p>

            <p className="text-small text-encre/62">
              {/* Its emphasis is Poppins 16/1.2, not the body's 18/1.35 <b>. */}
              {t.rich("disclaimer", {
                s: (chunks) => (
                  <span className="text-button font-poppins">{chunks}</span>
                ),
              })}
            </p>

            {/* The innermost of three nested panels — outer 28 + result 24 + this 28
              was 80px of inset a side, leaving 118px of content at 320. */}
            <div className="rounded-note-lg bg-encre flex flex-col gap-3 p-4 sm:p-7">
              <p className="text-h4 font-poppins text-white">{t("microTitle")}</p>
              <p className="text-small text-white/70">{t("microBody")}</p>

              {/*
              The field and its button stack until there is room for both.
              `min-w-0 flex-1` alone let the placeholder shrink below its own
              content — it wrapped onto four lines while the button stayed
              beside it and painted over the text. Full width first, side by
              side from `md` — the pattern the Consult footnote uses, but one
              breakpoint later: at `sm` the row is only 414 wide and the
              placeholder still wrapped onto two lines.
            */}
              <div className="rounded-field flex flex-wrap items-center gap-1.5 bg-white p-1.25">
                <span className="text-body text-encre/62 w-full px-2 md:w-auto md:min-w-0 md:flex-1">
                  {t("microPlaceholder")}
                </span>
                <span className="text-button font-poppins bg-red w-full rounded-full px-4 py-2.5 text-center text-white md:w-auto">
                  {t("microCta")}
                </span>
              </div>

              <p className="text-small text-white/70">{t("microFootnote")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
