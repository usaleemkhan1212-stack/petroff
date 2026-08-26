import { useTranslations } from "next-intl";
import { FaqIllustration } from "@/components/sections/ecommerce/FaqIllustration";
import { Container } from "@/components/ui/Container";

/** Figma marks the first one open. */
const items = [
  "entite",
  "traduire",
  "confidentiel",
  "unClic",
  "dgccrf",
  "honoraires",
  "lancement",
] as const;

const expandedKey = "entite";

/**
 * Figma's `13331:13351`: seven questions beside the arch illustration.
 *
 * Its questions are **Poppins SemiBold 20** (`text-h3`) where both domain
 * pages' are Inter 18 (`text-body-strong`) — check the style before copying
 * one FAQ onto another.
 *
 * **Only the first answer is Figma copy.** The other six were drafted strictly
 * from facts already stated elsewhere on this page; they are client-facing
 * legal copy and need the firm's sign-off before launch.
 */
export function Faq() {
  const t = useTranslations("EcommercePage.faq");

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
                    name="faq-ecommerce"
                    open={key === expandedKey}
                    className="border-encre/7 rounded-tile details-panel group border px-6 py-4"
                  >
                    <summary className="flex w-full cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
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
