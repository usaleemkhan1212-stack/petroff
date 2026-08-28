import { useTranslations } from "next-intl";
import { FaqIllustration } from "@/components/sections/personal/FaqIllustration";
import { Container } from "@/components/ui/Container";

/** Figma marks the first one open. */
const items = [
  "minoritaire",
  "abus",
  "rachat",
  "blocage",
  "prix",
  "dirigeant",
  "delais",
] as const;

const expandedKey = "minoritaire";

/**
 * Figma `13544:33769` — seven questions beside the arch illustration.
 *
 * **The illustration is on the left here**, where every other FAQ on the site
 * puts it on the right; the accordion follows it on a 48px gap.
 *
 * Its row anatomy is the service page's exactly: white on `encre/7` at a 14px
 * corner, 24/16 padding, an 8px gap, a `text-h3` question with **no gap** to
 * the marker, and a **full-strength encre** answer.
 *
 * **Its copy is the service page's verbatim**, title included ("Litiges entre
 * associés : questions & réponses") — a leftover from the duplicated frame,
 * exactly like the e-commerce Interlocuteurs angle note. It is stored per page
 * so the designer can rewrite one without touching the other. **Flag it.**
 */
export function Faq() {
  const t = useTranslations("PersonalPage.faq");

  return (
    /* overflow-hidden: the laurel bleeds past the container by design. */
    <section className="overflow-hidden bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex items-start gap-12">
          <FaqIllustration />

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex max-w-170 flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
            </div>

            {/*
              Native <details>, so it works with no JavaScript and keeps this a
              server component. The shared `name` makes the group exclusive.
            */}
            <ul className="flex w-full flex-col gap-3">
              {items.map((key) => (
                <li key={key}>
                  <details
                    name="faq-personal"
                    open={key === expandedKey}
                    className="border-encre/7 rounded-tile details-panel group border px-6 py-4"
                  >
                    {/* No gap: the question box runs up to the marker. */}
                    <summary className="flex w-full cursor-pointer list-none items-start [&::-webkit-details-marker]:hidden">
                      <span className="text-h3 font-poppins text-encre min-w-0 flex-1">
                        {t(`items.${key}.question`)}
                      </span>
                      {/* One glyph rotated rather than Figma's two, so the
                          marker turns with the panel instead of snapping. */}
                      <span
                        aria-hidden="true"
                        className="text-small text-encre/62 inline-block transition-transform duration-240 group-open:rotate-90 motion-reduce:transition-none"
                      >
                        ▸
                      </span>
                    </summary>

                    {/* Capped at a reading measure, as the other standalone
                        FAQs are — Figma runs it the full 772 of the row. */}
                    <p className="text-body text-encre mt-2 max-w-160">
                      {t(`items.${key}.answer`)}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
