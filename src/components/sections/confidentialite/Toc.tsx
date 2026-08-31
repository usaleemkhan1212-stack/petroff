import { useTranslations } from "next-intl";
import { sectionKeys, tocKeys } from "@/lib/confidentialite";

/**
 * Figma `13550:1044` — the 384 sidebar, of which 36 is left padding, so its
 * content is 348 wide and its right edge closes the container.
 *
 * A brique overline over a 12px list; each row is a 16px gap between the
 * number in `text-rose` and an Inter 16 label in encre/62. Its labels are
 * shorter than the sections' own titles, so they are their own strings.
 *
 * **Sticky, which Figma does not draw** — the comp puts a 609px table of
 * contents beside a 10,837px column, where a static one stops being a table of
 * contents after the first screenful. It is `xl:sticky xl:top-6 xl:self-start`,
 * the same treatment the four other long two-column sections on this build
 * carry. Its entries are real anchors; the sections take `scroll-mt-6`.
 */
export function Toc() {
  const t = useTranslations("ConfidentialitePage.toc");

  return (
    <nav
      aria-labelledby="priv-toc"
      className="flex flex-col gap-6 xl:sticky xl:top-6 xl:w-96 xl:shrink-0 xl:self-start xl:pl-9"
    >
      <p id="priv-toc" className="text-overline font-poppins text-brique uppercase">
        {t("title")}
      </p>

      <ul className="flex flex-col gap-3">
        {tocKeys.map((key) => (
          <li key={key} className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="text-h4 font-poppins text-rose shrink-0"
            >
              {String(sectionKeys.indexOf(key) + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${key}`}
              className="text-small text-encre/62 hover:text-brique min-w-0 flex-1 transition-colors"
            >
              {t(`items.${key}`)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
