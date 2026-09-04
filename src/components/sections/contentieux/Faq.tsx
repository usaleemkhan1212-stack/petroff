import { useTranslations } from "next-intl";
import { FaqIllustration } from "@/components/sections/contentieux/FaqIllustration";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqExpandedKey, faqItems } from "@/lib/contentieux";

export function Faq() {
  const t = useTranslations("ContentieuxPage.faq");

  return (
    /* overflow-hidden: the laurel bleeds past the container by design. */
    <section className="overflow-hidden bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex items-center justify-between gap-12">
          {/* `flex-1` so the column keeps its 820 measure: with the answer
              capped, nothing inside forces the width any more. */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <SectionHeading
              overline={t("overline")}
              title={t("title")}
              className="max-w-170 gap-3"
            />

            {/*
              Native <details>, so it works with no JavaScript and keeps this a
              server component. The shared `name` makes the group exclusive —
              opening one closes the others, which is what the comp shows.
              Browsers without exclusive-details support simply allow more than
              one open, which still works.
            */}
            <ul className="flex w-full max-w-205 flex-col gap-3">
              {faqItems.map((key) => (
                <li key={key}>
                  <details
                    name="faq-contentieux"
                    open={key === faqExpandedKey}
                    className="border-encre/7 rounded-tile details-panel group border px-6 py-4"
                  >
                    {/* No gap: Figma lets the question box run right up to the
                        marker, which is what the Contrats twin already does. */}
                    <summary className="flex w-full cursor-pointer list-none items-start [&::-webkit-details-marker]:hidden">
                      <span className="text-body-strong text-encre min-w-0 flex-1">
                        {t(`items.${key}.question`)}
                      </span>
                      {/*
                        One glyph rotated rather than Figma's two, so the
                        marker turns with the panel instead of snapping. A
                        filled ▸ turned 90° is ▾, so the open and closed states
                        still read exactly as drawn.
                      */}
                      <span
                        aria-hidden="true"
                        className="text-small text-encre/62 inline-block transition-transform duration-240 group-open:rotate-90 motion-reduce:transition-none"
                      >
                        ▸
                      </span>
                    </summary>

                    {/*
                      Capped at a reading measure. Figma runs the answer the
                      full 814 of the row — about 100 characters a line, well
                      past comfortable — so it wraps at 640 (the same measure
                      `SectionHeading`'s lead uses) while the question row
                      stays full width. A deliberate departure, asked for.
                    */}
                    <p className="text-body text-encre mt-2 max-w-160">
                      {t(`items.${key}.answer`)}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>

          <FaqIllustration />
        </div>
      </Container>
    </section>
  );
}
