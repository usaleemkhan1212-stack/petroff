import { useTranslations } from "next-intl";
import MagnifierCheck from "@/assets/icons/magnifier-check.svg";
import PenNib from "@/assets/icons/pen-nib.svg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Figma's `CTAFinal` (`13318:3326`): the page's closing panel — lilas-2, a
 * 28px corner, 48/64 of inset, its five copy bands centred on a 12px stack,
 * and two ornaments bleeding past the rounded edge.
 *
 * Only its **title** is this page's own. The overline, lead and phone line
 * come from the shared `ContactCta` block, and the two button labels from that
 * block's `ask` pair.
 *
 * **Both ornaments reuse existing files.** The magnifier at 150 is an exact
 * uniform 150/140 scale of `magnifier-check.svg` — all 66 path numbers match
 * to 0.0000, with `stroke-width` left at 10 rather than scaling to 10.71,
 * which is 0.7px on a 150px ornament and not worth a second file. The nib at
 * 103.125x150 is a non-uniform stretch of `pen-nib.svg`'s 110x153, exact
 * because that glyph carries no strokes at all.
 */
export function CTAFinal() {
  const t = useTranslations("ArticlePage.ctaFinal");
  const shared = useTranslations("ContactCta");

  return (
    <section className="bg-lilas">
      <Container className="py-12 sm:py-16 lg:py-24">
        <div className="rounded-panel bg-lilas-2 relative overflow-hidden px-6 py-12 sm:px-12 lg:py-16">
          {/*
            Sanctioned ornament exception: literal Figma coordinates. Both
            bleed past the panel so its rounded edge clips them — the magnifier
            off the bottom left, the nib off the top right. The nib is pinned
            to the right edge rather than to Figma's `left: 1169.5px`, so it
            holds its 27.625 overhang as the panel narrows. Hidden below `lg`,
            where they would sit under the copy.
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
            <p className="text-overline font-poppins text-brique uppercase">
              {shared("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            {/* Two lines with no gap between them — the 12px stack gap wraps
                the pair, which is why they share one block. */}
            <div className="text-body text-encre/62">
              <p>{shared("lead")}</p>
              <p>{shared("contact")}</p>
            </div>
            <span aria-hidden="true" className="h-3.5" />
            <div className="flex w-full flex-wrap justify-center gap-4 sm:w-auto">
              <Button
                size="lg"
                className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
              >
                {shared("ask.ctaPrimary")}
              </Button>
              <Button
                size="lg"
                variant="gold"
                className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
              >
                {shared("ask.ctaSecondary")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
