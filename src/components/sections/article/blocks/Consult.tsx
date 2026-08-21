import { useTranslations } from "next-intl";
import LawyerFigureDark from "@/assets/icons/lawyer-figure-dark.svg";

const fields = ["nom", "email", "tel", "societe"] as const;
const marks = ["reponse", "visio", "prix"] as const;

const control =
  "text-body text-encre placeholder:text-encre/62 rounded-field w-full bg-white px-4 py-3.5 " +
  "outline-none focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * Figma's `consult`: the article's contact block, on an encre ground.
 *
 * Real, labelled inputs but **not wrapped in a `<form>`** — there is no submit
 * handler, and a bare form would reload the page on Enter. Same call as the
 * Tools section and the OpenData lookup, and it keeps the article a server
 * component. Its figure is a second composed asset: Figma's `AvocateDark`,
 * the same 29-piece construction as the seam's, recoloured for a dark ground.
 */
export function Consult() {
  const t = useTranslations("ArticlePage.consult");

  return (
    <div className="rounded-note-lg bg-encre flex flex-col gap-5.5 p-7">
      <div className="flex items-start gap-6.5">
        <LawyerFigureDark
          aria-hidden="true"
          width={88}
          height={148}
          className="hidden shrink-0 sm:block"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-overline font-poppins text-gold">{t("overline")}</p>
          <p className="text-h3 font-poppins text-white">{t("title")}</p>
          <p className="text-body text-white/70">{t("lead")}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {fields.map((key) => (
          /* basis, not flex-1: flex-1 sets flex-basis:0 and collapsed the
             388px fields onto a single row instead of Figma's two. */
          <div key={key} className="max-w-full grow basis-97">
            <label htmlFor={`consult-${key}`} className="sr-only">
              {t(`fields.${key}`)}
            </label>
            <input
              id={`consult-${key}`}
              type="text"
              placeholder={t(`fields.${key}`)}
              className={control}
            />
          </div>
        ))}

        <div className="w-full">
          <label htmlFor="consult-situation" className="sr-only">
            {t("situation")}
          </label>
          <textarea
            id="consult-situation"
            rows={4}
            placeholder={t("situation")}
            className={`${control} resize-y`}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4.5">
        <button
          type="button"
          className="text-button font-poppins bg-gold hover:bg-brique cursor-pointer rounded-full px-6.5 py-3.5 text-white transition-colors focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t("cta")}
        </button>
        {/*
          Full width until it fits beside the button. `min-w-0 flex-1` let it
          shrink to 2px next to a 259px button in a 279px row, and the text
          then painted past the viewport — 53px of horizontal page scroll at
          375, from an element whose own box never left the page.
        */}
        <p className="text-small w-full text-white/70 sm:w-auto sm:min-w-0 sm:flex-1">
          {t("footnote")}
        </p>
      </div>

      <ul className="flex flex-wrap gap-x-5.5 gap-y-2 border-t border-white/14 pt-4.5">
        {marks.map((key) => (
          <li key={key} className="text-small text-white/70">
            {t.rich(`marks.${key}`, {
              b: (chunks) => (
                <span className="text-button font-poppins text-white">{chunks}</span>
              ),
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}
