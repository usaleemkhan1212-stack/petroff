import { useTranslations } from "next-intl";
import { FaqIllustration } from "@/components/sections/service/FaqIllustration";
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
 * Figma `13445:17452` — seven questions beside the arch illustration.
 *
 * Its questions are **Poppins SemiBold 20** (`text-h3`), like the e-commerce
 * FAQ and unlike both domain pages' Inter 18. Two differences from e-commerce:
 * its summary takes **no gap** between the question and the marker (the
 * question box runs right up to it, as on the Contrats FAQ), and its answer is
 * **full-strength encre**, not `encre/62`.
 *
 * **Only the first answer is Figma copy.** The other six were drafted strictly
 * from facts already stated elsewhere on this page — the six levers, the
 * takeaways and the "Le temps joue" note. They are client-facing legal copy
 * and need the firm's sign-off before launch.
 */
export function Faq() {
  const t = useTranslations("ServicePage.faq");

  return (
    /* overflow-hidden: the laurel bleeds past the container by design. */
    <section className="overflow-hidden bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex items-start gap-12">
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
                    name="faq-service"
                    open={key === expandedKey}
                    className="border-encre/7 rounded-tile details-panel group border px-6 py-4"
                  >
                    {/* No gap: Figma lets the question box run up to the
                        marker, as the Contrats FAQ does. */}
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
                        FAQs are — Figma runs it the full 814 of the row. */}
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
