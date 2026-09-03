import { useTranslations } from "next-intl";
import { sectionKeys, tocKeys } from "@/lib/cookies";

/**
 * Figma `13872:1113` — the 384 sidebar, of which 36 is left padding, so its
 * content is 348 wide and its right edge closes the container.
 *
 * The privacy page's table of contents to the pixel — a brique overline over a
 * 12px list, each row a 16px gap between a 30px numeral column in `text-rose`
 * and an Inter 16 label in encre/62 — with two differences: it lists **all
 * eight** sections rather than skipping two, and its labels are short enough
 * that none of them is anywhere near the row's 302px, so it needs none of that
 * page's `xl:whitespace-nowrap`.
 *
 * **Sticky, which Figma does not draw**, as on every long two-column section
 * on this build. Its entries are real anchors; the sections take `scroll-mt-6`.
 */
export function Toc() {
  const t = useTranslations("CookiesPage.toc");

  return (
    <nav
      aria-labelledby="ck-toc"
      className="flex flex-col gap-6 xl:sticky xl:top-6 xl:w-96 xl:shrink-0 xl:self-start xl:pl-9"
    >
      <p id="ck-toc" className="text-overline font-poppins text-brique uppercase">
        {t("title")}
      </p>

      <ul className="flex flex-col gap-3">
        {tocKeys.map((key) => (
          <li key={key} className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="text-h4 font-poppins text-rose w-7.5 shrink-0"
            >
              {String(sectionKeys.indexOf(key) + 1).padStart(2, "0")}
            </span>
            <a
              href={`#ck-${key}`}
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
