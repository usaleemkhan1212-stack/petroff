import { useTranslations } from "next-intl";
import { proseTags } from "@/components/sections/new-article/blocks/Prose";

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

/** Figma leaves the first one open. */
const expandedKey = "plateforme";

/**
 * Figma's `faq` (`13318:2985`): eleven questions on a 12px gap — white, a
 * 16px corner, a hairline `encre/8` border and 24 of side padding, the
 * question in Poppins SemiBold 18 against a **periwinkle** marker.
 *
 * Native `<details>` sharing a `name`, so the group is exclusive and it needs
 * no JavaScript — which keeps the article a server component.
 *
 * **The marker is Figma's own `–` / `+` pair, not a rotated glyph**: a plus
 * cannot be rotated into a minus, so the two swap on `group-open`.
 */
export function ArticleFaq() {
  const t = useTranslations("ArticlePage.faq");

  return (
    <ul className="flex flex-col gap-3">
      {items.map((key) => (
        <li key={key}>
          <details
            name="faq-new-article"
            open={key === expandedKey}
            className="border-encre/8 details-panel group rounded-[16px] border bg-white px-6"
          >
            <summary className="flex w-full cursor-pointer list-none items-center gap-5 py-5 [&::-webkit-details-marker]:hidden">
              <span className="text-h4 font-poppins text-encre min-w-0 flex-1">
                {t(`${key}.q`)}
              </span>
              <span
                aria-hidden="true"
                className="text-lead font-inter text-periwinkle shrink-0"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">–</span>
              </span>
            </summary>

            {/* No bottom padding: Figma closes the card on the answer's own
                line box, 12 below the summary and nothing after. */}
            <p className="text-body text-encre/62 mt-3">
              {t.rich(`${key}.a`, proseTags)}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}
