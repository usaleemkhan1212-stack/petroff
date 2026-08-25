import Image from "next/image";
import { useTranslations } from "next-intl";
import lawyerPortrait from "@/assets/images/lawyer-portrait-inline.jpg";

const fields = ["nom", "email", "tel", "societe"] as const;

const control =
  "text-body text-encre placeholder:text-encre/62 rounded-field w-full bg-white px-4 py-3.5 " +
  "outline-none focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * Figma's `consult` (`13318:3033`): the article's contact block.
 *
 * **A pale-mint block since the redesign**, where it was a dark encre panel:
 * a photograph replaces the composed `lawyer-figure-dark.svg`, the overline
 * is red rather than gold, the submit is encre rather than gold, and the three
 * reassurance marks are gone. Its corners are rounded at the **top only**.
 *
 * Real, labelled inputs but **not wrapped in a `<form>`** — there is no submit
 * handler, and a bare form would reload the page on Enter. Same call as the
 * Tools section and the OpenData lookup, and it keeps the article a server
 * component. Its figure is a second composed asset: Figma's `AvocateDark`,
 * the same 29-piece construction as the seam's, recoloured for a dark ground.
 */
export function Consult() {
  const t = useTranslations("ArticlePage.consult");
  /* Field labels and the secret-professionnel note are shared with both
     consultation drawers, so they live in the top-level namespace. */
  const ts = useTranslations("Consultation");

  return (
    <div className="rounded-t-note-lg bg-pale-mint flex flex-col gap-5.5 p-5 sm:p-7">
      <div className="flex items-start gap-6.5">
        <div className="relative hidden h-41 w-35.25 shrink-0 overflow-hidden rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px] sm:block">
          <Image src={lawyerPortrait} alt="" fill sizes="141px" className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-overline font-poppins text-red">{t("overline")}</p>
          <p className="text-h3 font-poppins text-encre">{t("title")}</p>
          <p className="text-body text-encre/62">{t("lead")}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {fields.map((key) => (
          /* basis, not flex-1: flex-1 sets flex-basis:0 and collapsed the
             388px fields onto a single row instead of Figma's two. */
          <div key={key} className="max-w-full grow basis-97">
            <label htmlFor={`consult-${key}`} className="sr-only">
              {ts(`fields.${key}`)}
            </label>
            <input
              id={`consult-${key}`}
              type="text"
              placeholder={ts(`fields.${key}`)}
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
          className="text-button font-poppins bg-encre hover:bg-encre/90 cursor-pointer rounded-full px-6.5 py-3.5 text-white transition-colors focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t("cta")}
        </button>
        {/*
          Full width until it fits beside the button. `min-w-0 flex-1` let it
          shrink to 2px next to a 259px button in a 279px row, and the text
          then painted past the viewport — 53px of horizontal page scroll at
          375, from an element whose own box never left the page.
        */}
        <p className="text-small text-encre/62 w-full sm:w-auto sm:min-w-0 sm:flex-1">
          {ts("footnote")}
        </p>
      </div>

    </div>
  );
}
