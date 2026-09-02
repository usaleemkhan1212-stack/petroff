import { useTranslations } from "next-intl";
import { sectionKeys, tocKeys } from "@/lib/mediateur";

/**
 * Figma `13833:863` — the 384 sidebar, of which 36 is left padding, so its
 * content is 348 wide and its right edge closes the container.
 *
 * The two other legal documents' table of contents to the pixel: a brique
 * overline over a 12px list, each row a 16px gap between a 30px numeral column
 * in `text-rose` and an Inter 16 label in encre/62.
 *
 * Two differences. It lists **six** of the seven sections — Figma stops at 06
 * — and its labels are the sections' own titles, so nothing is stored twice.
 * Entry 05 runs to two lines in the comp at the row's 302, and does here too.
 *
 * **Sticky, which Figma does not draw**, as on every long two-column section
 * on this build. Its entries are real anchors; the sections take `scroll-mt-6`.
 */
export function Toc() {
  const t = useTranslations("MediateurPage");

  return (
    <nav
      aria-labelledby="med-toc"
      className="flex flex-col gap-6 xl:sticky xl:top-6 xl:w-96 xl:shrink-0 xl:self-start xl:pl-9"
    >
      <p id="med-toc" className="text-overline font-poppins text-brique uppercase">
        {t("toc.title")}
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
              href={`#${key}`}
              className="text-small text-encre/62 hover:text-brique min-w-0 flex-1 transition-colors"
            >
              {t(`sections.${key}.title`)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
