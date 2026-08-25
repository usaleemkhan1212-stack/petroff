import { useTranslations } from "next-intl";
import MagnifierCheck from "@/assets/icons/magnifier-check.svg";
import PenNib from "@/assets/icons/pen-nib.svg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * The article's closing panel — the site's fifth, and the second to ask a
 * question rather than book a slot.
 *
 * Only its title is this page's own. The overline, lead and phone line come
 * from the shared `ContactCta` block, and the two button labels from that
 * block's `ask` pair, which the Bibliotheque hub's panel reads too.
 *
 * It is the same anatomy as the hub's panel with the **ornaments swapped**:
 * the magnifier moves to the bottom left at 150 and the nib to the top right
 * at 103.125x150.
 */
export function CTAFinal() {
  const t = useTranslations("ArticlePage.ctaFinal");
  const shared = useTranslations("ContactCta");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="rounded-panel bg-lilas-2 relative overflow-hidden px-12 py-16">
          {/*
            Sanctioned ornament exception: literal Figma coordinates. Both
            bleed past the panel so its rounded edge clips them — the
            magnifier off the bottom, the nib off the right. The nib is pinned
            to the right edge rather than to `left: 1169.5px` so it holds its
            inset as the panel narrows. Hidden below lg, where they would sit
            under the copy.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            <MagnifierCheck
              width={150}
              height={150}
              className="absolute top-[231.03px] left-[0.5px]"
            />
            <PenNib
              width={103.125}
              height={150}
              className="absolute top-0 right-[-27.625px]"
            />
          </div>

          <div className="relative flex flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins text-brique">
              {shared("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            {/* Two lines, no gap between them — the 12px stack gap wraps the pair. */}
            <div className="text-body text-encre/62">
              <p>{shared("lead")}</p>
              <p>{shared("contact")}</p>
            </div>
            <span aria-hidden="true" className="h-3.5" />
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">{shared("ask.ctaPrimary")}</Button>
              <Button size="lg" variant="gold">
                {shared("ask.ctaSecondary")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
