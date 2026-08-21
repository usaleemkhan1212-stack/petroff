import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const options = ["processus", "unilateral", "denie", "officier"] as const;
const rows = ["diligence", "delai", "honoraires"] as const;

/** Figma marks the third option chosen — the result panel below is its answer. */
const SELECTED = "denie";

/**
 * Figma's `outil-triage`, the article's second tool. Static for the same
 * reason as the simulator: the comp shows one option already chosen and the
 * matching result, with no other branch specified. The chosen row is marked
 * with `aria-current` rather than being a control that does nothing.
 */
export function Triage() {
  const t = useTranslations("ArticlePage.triage");

  return (
    <div className="rounded-note-lg bg-lilas-2 p-7">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-h3 text-encre font-poppins">{t("title")}</p>
        <span className="text-button font-poppins bg-encre/80 text-rose rounded-full px-3 py-1">
          {t("pill")}
        </span>
      </div>
      <p className="text-body text-encre/62 mt-3">{t("lead")}</p>

      <ul className="mt-4.5 flex flex-col gap-2.5">
        {options.map((key) => {
          const selected = key === SELECTED;
          return (
            <li
              key={key}
              aria-current={selected ? "true" : undefined}
              className={cn(
                "rounded-field text-body text-encre bg-white px-5 py-4",
                selected
                  ? "border-periwinkle border-2"
                  : "border-encre/12 border",
              )}
            >
              <span className="sr-only">
                {selected ? `${t("selectedLabel")} : ` : ""}
              </span>
              {t(`options.${key}`)}
            </li>
          );
        })}
      </ul>

      <div className="rounded-note-lg border-encre/10 mt-5 flex flex-col gap-3 border bg-white px-6 py-5.5">
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
                {t(`rows.${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>

        <p className="text-body text-encre/62">{t("note")}</p>

        <span className="text-button font-poppins bg-gold w-fit rounded-full px-6.5 py-3.5 text-white">
          {t("cta")}
        </span>
      </div>
    </div>
  );
}
