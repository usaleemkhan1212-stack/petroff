import { useTranslations } from "next-intl";
import { proseTags } from "@/components/sections/article/blocks/Prose";

const items = [
  "plateforme",
  "qualifiee",
  "etatMembre",
  "denie",
  "courriel",
  "originaux",
  "copie",
  "convention",
  "scannee",
  "societe",
  "international",
] as const;

/** Figma draws the first one open. */
const EXPANDED = "plateforme";

/**
 * Figma's `faq`. Native <details> sharing a `name`, so the group is exclusive
 * and it needs no JavaScript — the same idiom as the domain pages' FAQ, and
 * the reason this article stays a server component.
 *
 * Its marker is Figma's own – / + pair rather than the domain pages' rotated
 * triangle: a plus cannot be rotated into a minus, so the two glyphs swap on
 * `group-open` instead.
 */
export function ArticleFaq() {
  const t = useTranslations("ArticlePage.faq");

  return (
    <ul className="flex flex-col gap-3">
      {items.map((key) => (
        <li key={key}>
          <details
            name="faq-article"
            open={key === EXPANDED}
            className="border-encre/8 rounded-note-lg details-panel group border bg-white px-6"
          >
            <summary className="flex w-full cursor-pointer list-none items-center gap-5 py-5 [&::-webkit-details-marker]:hidden">
              <span className="text-h4 font-poppins text-encre min-w-0 flex-1">
                {t(`${key}.q`)}
              </span>
              <span
                aria-hidden="true"
                className="text-lead font-inter text-encre/62 shrink-0 leading-none"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">–</span>
              </span>
            </summary>

            <p className="text-body text-encre/62 pb-6">
              {t.rich(`${key}.a`, proseTags)}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}
