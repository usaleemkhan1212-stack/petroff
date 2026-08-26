import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const options = ["processus", "unilateral", "denie", "officier"] as const;
const rows = ["diligence", "delai", "honoraires"] as const;

/** Figma marks the third option chosen. */
const chosen = "denie";

/**
 * Figma's `outil-triage` (`13318:2948`): lilas-2, 18px corners, four options
 * and a result panel.
 *
 * Static, like the simulator: Figma marks one option and gives the others no
 * target, so they are list rows with `aria-current` on the chosen one rather
 * than controls that do nothing. The chosen row is white with a 2px periwinkle
 * border and its label in Inter SemiBold; the rest are white at 90% with a
 * hairline `encre/12`.
 *
 * **Its result panel is pale blue** — it was a white bordered box. Its CTA is
 * now an encre button with a separate periwinkle "15 minutes gratuites" beside
 * it, where the old copy carried both in one string.
 *
 * The block uses spacer frames rather than a column gap — 18 above the
 * options, 20 below — so those are margins here.
 */
export function Triage() {
  const t = useTranslations("ArticlePage.triage");
  const page = useTranslations("NewArticlePage.triage");

  return (
    <div className="rounded-note-lg bg-lilas-2 flex flex-col p-5 sm:p-7">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-h3 text-encre font-poppins">{t("title")}</p>
          <span className="text-button font-poppins bg-encre/8 text-encre/62 rounded-full px-3 py-1">
            {t("pill")}
          </span>
        </div>
        <p className="text-body text-encre/62">{t("lead")}</p>
      </div>

      <ul className="mt-4.5 flex flex-col gap-2.5">
        {options.map((key) => (
          <li
            key={key}
            aria-current={key === chosen ? "true" : undefined}
            className={cn(
              "rounded-field px-5 py-4",
              key === chosen
                ? "border-periwinkle text-body-strong text-encre border-2 bg-white"
                : "border-encre/12 text-body text-encre border bg-white/90",
            )}
          >
            {t(`options.${key}`)}
          </li>
        ))}
      </ul>

      <div className="rounded-note-lg border-encre/10 bg-pale-blue mt-5 flex flex-col gap-3 border px-3 py-4 sm:px-6 sm:py-5.5">
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
                {t(`rows.${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-4">
          <p className="text-small text-encre/62">{t("note")}</p>
          <div className="flex flex-wrap items-center gap-4">
            {/* Inert, like every control on this page. */}
            <span className="text-button font-poppins bg-encre rounded-full px-6.5 py-3.5 text-white">
              {page("cta")}
            </span>
            <span className="text-button font-poppins text-periwinkle">
              {page("ctaNote")}
            </span>
          </div>
          <p className="text-small text-encre/62">
            {page.rich("disclaimer", {
              s: (chunks) => <span className="text-button font-poppins">{chunks}</span>,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
