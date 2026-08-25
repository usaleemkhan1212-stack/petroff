import { useTranslations } from "next-intl";
import ChevronDown from "@/assets/icons/chevron-down.svg";

const fields = ["nature", "qualite", "montant", "niveau"] as const;
const rows = ["ecrit", "presomption", "charge", "mention"] as const;

/** The three select-style fields carry a caret; the amount does not. */
const hasCaret = (key: (typeof fields)[number]) => key !== "montant";

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
        {fields.map((key) => (
          <div key={key} className="flex w-97.75 max-w-full flex-col gap-1.5">
            <p className="text-small-strong text-encre/62">
              {t(`fields.${key}.label`)}
            </p>
            <div className="rounded-field border-encre/12 flex items-center justify-between gap-4 border bg-white px-4 py-3.25">
              <span className="text-body text-encre min-w-0 flex-1 truncate">
                {t(`fields.${key}.value`)}
              </span>
              {hasCaret(key) ? (
                <ChevronDown
                  aria-hidden="true"
                  width={14}
                  height={14}
                  className="text-encre/55 shrink-0"
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4.5 flex flex-col gap-3.5">
        <span className="text-button font-poppins bg-encre w-fit rounded-full px-6.5 py-3.5 text-white">
          {t("cta")}
        </span>
        <p className="text-small text-encre/62">{t("note")}</p>
      </div>

      <div className="rounded-note-lg border-encre/10 mt-5 border bg-white px-4 py-5 sm:px-6 sm:py-5.5">
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
                  {t(`rows.${key}.value`)}
                </dd>
              </div>
            ))}
          </dl>

          {/* Pale rose at 30% with red copy since the redesign; it was a
              brique tint before, the only one on the site. */}
          <p className="rounded-field text-body bg-pale-rose/30 text-red px-4.5 py-3.5">
            {t.rich("verdict", {
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
    </div>
  );
}
