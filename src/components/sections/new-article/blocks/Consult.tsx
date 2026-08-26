import Image from "next/image";
import { useTranslations } from "next-intl";
import lawyerPortrait from "@/assets/images/lawyer-portrait-inline.jpg";

const columns = [
  ["nom", "tel"],
  ["email", "societe"],
] as const;

/*
  The first mark is brique throughout — it is one bold run and Figma colours it
  brique; the other two pair an encre lead-in with an encre/62 tail.
*/
const marks = [
  { key: "reponse", tone: "text-brique" },
  { key: "visio", tone: "text-encre" },
  { key: "prix", tone: "text-encre" },
] as const;

const input = "rounded-field text-body text-encre/62 w-full bg-white px-4 py-3.5";

/**
 * Figma's `consult` (`13318:3033`) and the `marks` strip beneath it
 * (`13318:3601`) — one continuous lilas-2 card: the form rounds its top left
 * to 54 and top right to 18, the strip rounds the two bottom corners, and an
 * `encre/20` rule separates them.
 *
 * Its inputs are real and labelled but **not wrapped in a `<form>`**, like
 * every other form on the site: with no submit handler a bare form would
 * reload the page on Enter, and leaving it out keeps the article a server
 * component.
 *
 * The portrait is the seam's `lawyer-portrait-inline.jpg` at the same
 * 140.657x164 box.
 */
export function Consult() {
  const t = useTranslations("ArticlePage.consult");
  const shared = useTranslations("Consultation");

  return (
    <div className="flex flex-col">
      <div className="bg-lilas-2 flex flex-col gap-5.5 rounded-tl-[54px] rounded-tr-[18px] px-5 py-5 sm:px-9 sm:py-7">
        <div className="flex items-start gap-6.5">
          <div className="relative hidden h-41 w-35.25 shrink-0 overflow-hidden rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px] sm:block">
            <Image
              src={lawyerPortrait}
              alt=""
              fill
              sizes="141px"
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <p className="text-h3 font-poppins text-encre">{t("title")}</p>
            <p className="text-body text-encre/62">{t("lead")}</p>
          </div>
        </div>

        {/* Two columns of two, not a wrapping four — Figma pairs nom/tel and
            email/societe. */}
        <div className="flex flex-wrap gap-x-5 gap-y-4">
          {columns.map((column) => (
            <div key={column[0]} className="flex min-w-60 flex-1 flex-col gap-4">
              {column.map((key) => (
                <div key={key}>
                  <label htmlFor={`consult-${key}`} className="sr-only">
                    {shared(`fields.${key}`)}
                  </label>
                  <input
                    id={`consult-${key}`}
                    type="text"
                    placeholder={shared(`fields.${key}`)}
                    className={input}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="consult-situation" className="sr-only">
            {shared("situation")}
          </label>
          <textarea
            id="consult-situation"
            placeholder={t("situation")}
            className={`${input} resize-y pb-15`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4.5">
          {/* Inert, like every form on the site. */}
          <span className="text-button font-poppins bg-gold shrink-0 rounded-full px-6.5 py-3.5 text-white">
            {t("cta")}
          </span>
          <p className="text-small text-encre/62 min-w-60 flex-1">
            {shared("footnote")}
          </p>
        </div>
      </div>

      <ul className="bg-lilas-2 border-encre/20 flex flex-wrap items-center justify-between gap-y-2 rounded-br-[18px] rounded-bl-[18px] border-t px-5 py-5 sm:px-9">
        {marks.map(({ key, tone }) => (
          <li key={key} className="text-small text-encre/62 sm:whitespace-nowrap">
            {t.rich(`marks.${key}`, {
              b: (chunks) => (
                <span className={`text-button font-poppins ${tone}`}>{chunks}</span>
              ),
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}
