import { useTranslations } from "next-intl";
import BulletMark from "@/assets/icons/bullet-mark.svg";
import { proseTags } from "@/components/sections/article/blocks/Prose";

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
 * Figma's `takeaways` (`13318:3062`): the article's closing summary.
 *
 * **A light block since the redesign**, and its ground has moved again — it is
 * now `#EFCFD9` at 40%, the third hex under the library name "Petroff/Pink",
 * where this build had lilas-2. Composited it lands under 3/255 from
 * `--color-pink-soft`, so that token is reused rather than a fourth pink
 * added; the name is not a stable key in this file, the hex has to be
 * compared each time. Encre title at H3, encre/62 body with full-encre
 * lead-ins. It used to be a dark encre panel.
 *
 * Its bullet is the site's shared gold dot in Figma's own **9x20** box, which
 * puts the circle's centre at 12.5 — level with the 25.2px first line, where
 * the old 9x27 box sat it 3px low.
 */
export function Takeaways({ title }: { title: string }) {
  const t = useTranslations("ArticlePage.takeaways");

  return (
    <div className="rounded-note-lg bg-pink-soft/40 p-5 sm:p-7">
      <h2 className="text-h3 text-encre">{title}</h2>
      <ul className="mt-4">
        {points.map((key) => (
          <li key={key} className="flex items-start gap-4.25 py-2.5">
            <BulletMark aria-hidden="true" width={9} height={20} className="shrink-0" />
            {/* Figma weights the lead-in at full encre inside an encre/62 line, which
                the shared proseTags cannot express — it leaves <b> to inherit. */}
            <p className="text-body text-encre/62 min-w-0 flex-1">
              {t.rich(key, {
                ...proseTags,
                b: (chunks) => (
                  <span className="text-h4 font-poppins text-encre">{chunks}</span>
                ),
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
