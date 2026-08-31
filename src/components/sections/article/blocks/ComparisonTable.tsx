import { useTranslations } from "next-intl";

const rows = ["simple", "avancee", "qualifiee", "contreseing", "authentique"] as const;

/**
 * Figma's `cmp`. A real <table>: it is a comparison across three named
 * columns, so the markup should say so. Its 230/325/325 columns are the
 * comp's; below sm it scrolls inside its own container rather than crushing
 * three columns of legal text.
 */
export function ComparisonTable() {
  const t = useTranslations("ArticlePage.cmp");

  return (
    <div className="rounded-note-lg border-encre/8 overflow-x-auto border bg-white">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead className="bg-encre">
          <tr>
            <th
              scope="col"
              className="text-h4 font-poppins w-57.5 px-5 py-4 text-white"
            >
              {t("head.level")}
            </th>
            <th
              scope="col"
              className="text-h4 font-poppins w-81.25 px-5 py-4 text-white"
            >
              {t("head.gives")}
            </th>
            <th
              scope="col"
              className="text-h4 font-poppins w-81.25 px-5 py-4 text-white"
            >
              {t("head.shows")}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((key, index) => (
            <tr key={key} className={index > 0 ? "border-encre/6 border-t" : ""}>
              <th
                scope="row"
                className="text-h4 font-poppins text-encre px-5 py-4 align-top font-semibold"
              >
                {t(`rows.${key}.level`)}
              </th>
              <td className="text-small text-encre px-5 py-4 align-top">
                {t(`rows.${key}.gives`)}
              </td>
              <td className="text-small text-encre px-5 py-4 align-top">
                {t(`rows.${key}.shows`)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
