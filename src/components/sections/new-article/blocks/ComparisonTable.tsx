import { useTranslations } from "next-intl";

/** Five levels compared across three named columns, in Figma's order. */
const rows = ["simple", "avancee", "qualifiee", "contreseing", "authentique"] as const;

/**
 * Figma's `cmp` (`13318:2671`): white, an 18px corner and a hairline
 * `encre/8` border, with an **encre** header band and five rows separated by
 * `encre/6` rules.
 *
 * A real `<table>` — three named columns compared across five rows — so the
 * markup says so, with `<th scope>` on both axes. Its 230/325/325 columns are
 * the comp's; below 680px it scrolls inside its own container rather than
 * crushing three columns of legal text, which is why the wrapper carries
 * `overflow-x-auto`.
 *
 * Note the two right-hand body columns are Inter 16 at 1.5, not the body's
 * 18 — only the level itself is Poppins SemiBold 18.
 */
export function ComparisonTable() {
  const t = useTranslations("ArticlePage.cmp");

  return (
    <div className="rounded-note-lg border-encre/8 overflow-x-auto border bg-white">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-encre">
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
                className="text-h4 font-poppins text-encre w-57.5 px-5 py-4 text-left align-top"
              >
                {t(`rows.${key}.level`)}
              </th>
              <td className="text-small text-encre w-81.25 px-5 py-4 align-top">
                {t(`rows.${key}.gives`)}
              </td>
              <td className="text-small text-encre w-81.25 px-5 py-4 align-top">
                {t(`rows.${key}.shows`)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
