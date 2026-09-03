import { useTranslations } from "next-intl";
import { sectionKeys, tocKeys } from "@/lib/mentions";

/**
 * Figma `13852:1347` — the 384 sidebar, of which 36 is left padding, so its
 * content is 348 wide and its right edge closes the container.
 *
 * The three other legal documents' table of contents to the pixel: a brique
 * overline over a 12px list, each row a 16px gap between a 30px numeral column
 * in `text-rose` and an Inter 16 label in encre/62.
 *
 * It is the only one that lists **every** section — the privacy policy's skips
 * two and the mediation notice's stops one short. Figma renders all fourteen
 * on one line, and four of the labels are shortened to make that fit.
 *
 * **Sticky, which Figma does not draw** — with a 5356px column beside it, a
 * static table of contents stops being one after the first screenful.
 */
export function Toc() {
  const t = useTranslations("MentionsPage.toc");

  return (
    <nav
      aria-labelledby="ml-toc"
      className="flex flex-col gap-6 xl:sticky xl:top-6 xl:w-96 xl:shrink-0 xl:self-start xl:pl-9"
    >
      <p id="ml-toc" className="text-overline font-poppins text-brique uppercase">
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
