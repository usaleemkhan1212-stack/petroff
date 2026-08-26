import { useTranslations } from "next-intl";
import BulletMark from "@/assets/icons/bullet-mark-gold.svg";
import { proseTags } from "@/components/sections/new-article/blocks/Prose";

/** The seven points, in Figma's order. */
const points = [
  "validite",
  "presomption",
  "equivalence",
  "denegation",
  "dossier",
  "forme",
  "contrat",
] as const;

/**
 * Figma's `takeaways` (`13318:3062`): the article's closing summary — a soft
 * pink card, 18px corners, 28px inset, a Poppins SemiBold 20 title, 16 of air,
 * then seven bulleted points on 10px of vertical padding each.
 *
 * **Its ground is a third hex under the library name "Petroff/Pink"** —
 * `#EFCFD9` at 40%, where `--color-pink` is `#FAC5EF` and `--color-pink-soft`
 * is `#F0D5DD`. Against `pink-soft` the difference resolves to under 3/255
 * once both are composited at 40% over white, so this reuses that token rather
 * than adding a fourth near-identical colour. The name is not a stable key in
 * this file; the hex has to be compared each time.
 *
 * **Its bullet is gold**, where the original page's is periwinkle. That file is
 * shared, so it is forked rather than recoloured — `bullet-mark-gold.svg`.
 */
export function Takeaways() {
  const t = useTranslations("ArticlePage");

  return (
    <div className="rounded-note-lg bg-pink-soft/40 overflow-hidden p-7">
      <p className="text-h3 font-poppins text-encre">{t("corps.takeawaysTitle")}</p>
      <span aria-hidden="true" className="block h-4" />
      <ul>
        {points.map((key) => (
          <li key={key} className="flex items-start gap-4.25 py-2.5">
            <BulletMark aria-hidden="true" width={9} height={27} className="shrink-0" />
            <p className="text-body text-encre/62 min-w-0 flex-1">
              {t.rich(`takeaways.${key}`, proseTags)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
