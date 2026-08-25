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
          <div className="flex min-w-0 flex-col gap-3">
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
                    <summary className="flex w-full cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
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
                        className="text-small text-encre/50 inline-block transition-transform duration-240 group-open:rotate-90 motion-reduce:transition-none"
                      >
                        ▸
                      </span>
                    </summary>

                    <p className="text-body text-encre/62 mt-2">
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
