import { useTranslations } from "next-intl";
import ChevronDown from "@/assets/icons/chevron-down.svg";
import { proseTags } from "@/components/sections/new-article/blocks/Prose";

const fields = ["nature", "qualite", "montant", "niveau"] as const;
/*
  Figma pins each result value to its own width, narrower than the row has to
  give, so all four wrap — sometimes mid-citation. Those are stale auto-layout
  widths rather than a designed measure, but reproducing them is what matches
  the comp's 811px result panel; letting the values flex costs 62 of it.
  The pair only sits side by side from `md`: at 640 the 380px label plus a
  24px gap leaves the value about 66px inside three levels of nested padding,
  and `min-w-0` lets it shrink below its own content — so the text paints past
  the viewport while every box stays inside it. Below `md` both stack and the
  value flexes.
*/
const rows = [
  { key: "ecrit", width: "md:w-[347px]" },
  { key: "presomption", width: "md:w-[337px]" },
  { key: "charge", width: "md:w-[246px]" },
  { key: "mention", width: "md:w-[363px]" },
] as const;

/** The three select-style fields carry a caret; the amount does not. */
const hasCaret = (key: (typeof fields)[number]) => key !== "montant";

/**
 * Figma's `outil-simulateur` (`13318:2543`): a filled-in form with its result
 * already shown — lilas-2, 18px corners, and **four bands on a uniform 36px
 * gap**, where the original page carried 20 / 18 / 20.
 *
 * Deliberately static. Figma gives each field one chosen value and no option
 * list, and labels the panel "Résultat (démo)", so this is a picture of a
 * completed run rather than a working tool, and the fields render as read-only
 * rows rather than pretending to be controls. That also keeps the article a
 * server component.
 *
 * **Three fills moved since the original page.** Its CTA is **gold** again
 * (it had gone encre); the verdict panel is **pale blue** with encre copy (it
 * was brique at 14%, then pale rose at 30% with red copy); and the submit
 * panel is **pale blue** too, with an **encre** button — it was a dark encre
 * panel with a red button.
 *
 * Its four result values carry Figma's own widths (347, 337, 246, 363), which
 * are narrower than the row can give and so wrap — the comp's panel is 811
 * tall, and letting them flex costs 62 of that.
 */
export function Simulator() {
  const t = useTranslations("ArticlePage.simulator");

  return (
    <div className="rounded-note-lg bg-lilas-2 flex flex-col gap-9 p-5 sm:p-7">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-h3 text-encre font-poppins">{t("title")}</p>
          <span className="text-button font-poppins bg-encre/8 text-encre/62 rounded-full px-3 py-1">
            {t("pill")}
          </span>
        </div>
        <p className="text-body text-encre/62">{t("lead")}</p>
      </div>

      {/* 391px fields, two per row at the column's 881 — 16px row gap, 24 column. */}
      <div className="flex flex-wrap gap-x-6 gap-y-4">
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

      <div className="flex flex-col gap-3.5">
        <span className="text-button font-poppins bg-gold w-fit rounded-full px-6.5 py-3.5 text-white">
          {t("cta")}
        </span>
        <p className="text-small text-encre/62">{t("note")}</p>
      </div>

      <div className="rounded-note-lg border-encre/10 flex flex-col gap-6 border p-3 sm:p-6">
        <dl className="flex flex-col gap-1">
          {rows.map(({ key, width }, index) => (
            <div
              key={key}
              className={`flex flex-col gap-1 py-2.5 md:flex-row md:gap-6 ${
                index < rows.length - 1 ? "border-encre/12 border-b border-dashed" : ""
              }`}
            >
              {/* Fixed 380 label column, value flexes. */}
              <dt className="text-body text-encre md:w-95 md:shrink-0">
                {t(`rows.${key}.label`)}
              </dt>
              <dd className={`text-h4 font-poppins text-encre min-w-0 ${width}`}>
                {t(`rows.${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>

        <p className="rounded-field text-body bg-pale-blue text-encre px-5 py-6">
          {t.rich("verdict", proseTags)}
        </p>

        <p className="text-small text-encre/62">
          {/* Its emphasis is Poppins 16/1.2, not the body's 18/1.35 <b>. */}
          {t.rich("disclaimer", {
            s: (chunks) => <span className="text-button font-poppins">{chunks}</span>,
          })}
        </p>

        {/* The innermost of three nested panels — 28 + 24 + 28 is 80px of inset
            a side at desktop, so each step scales down below `sm`. */}
        <div className="rounded-note-lg bg-pale-blue flex flex-col gap-3 p-3 sm:p-7">
          <p className="text-h4 font-poppins text-encre">{t("microTitle")}</p>
          <p className="text-small text-encre/62">{t("microBody")}</p>

          {/*
            The field and its button stack until there is room for both.
            `min-w-0 flex-1` alone lets the placeholder shrink below its own
            content — it wraps onto four lines while the button, which cannot
            shrink, stays beside it and paints over the text. Full width first,
            side by side from `md`.

            Its padding has to switch at `md` too, not `sm`: Figma's pill is
            `pl-16 pr-4` because the button sits flush inside it on the right,
            which is only true once they share a row. While they are stacked
            that leaves the placeholder touching the right edge, so it takes a
            symmetric 12 instead.
          */}
          <div className="rounded-field flex flex-wrap items-center gap-1.5 bg-white p-3 md:py-1.25 md:pr-1 md:pl-4">
            <span className="text-body text-encre/62 w-full md:w-auto md:min-w-0 md:flex-1">
              {t("microPlaceholder")}
            </span>
            <span className="text-button font-poppins bg-encre w-full rounded-full px-4 py-2.5 text-center text-white md:w-auto">
              {t("microCta")}
            </span>
          </div>

          <p className="text-small text-encre/62">{t("microFootnote")}</p>
        </div>
      </div>
    </div>
  );
}
