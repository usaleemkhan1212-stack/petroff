import { useTranslations } from "next-intl";
import OpenBookLg from "@/assets/icons/open-book-lg.svg";
import PenNib from "@/assets/icons/pen-nib.svg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTAFinal() {
  /* Shared with the Expertises and Contentieux pages — all three frames
     specify character-identical copy, so they read one namespace. */
  const t = useTranslations("ContactCta");

  return (
    /* py-24: the FAQ above closes with its own 96px but Figma still specifies
       top padding on this one, exactly as on the Contentieux page. */
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="rounded-panel bg-lilas-2 relative overflow-hidden px-6 py-12 sm:px-12 lg:py-16">
          {/*
            Sanctioned ornament exception: literal Figma coordinates, both
            shapes bleeding past the panel so the rounded edge clips them —
            the book off the left and bottom, the nib off the right and top.
            The nib is pinned to the right edge rather than to
            `left: 1169.5px` so it holds its inset as the panel narrows.
            Hidden below lg, where they would sit under the copy.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            <OpenBookLg
              width={167}
              height={125}
              className="absolute top-[231px] left-[-20.5px]"
            />
            <PenNib
              width={103.125}
              height={150}
              className="absolute top-0 right-[-27.625px]"
            />
          </div>

          {/* gap-3, as on the Contentieux panel; the Expertises one is gap-4. */}
          <div className="relative flex flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins text-brique">{t("overline")}</p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            {/* Two lines, no gap between them — the 12px stack gap wraps the pair. */}
            <div className="text-body text-encre/62">
              <p>{t("lead")}</p>
              <p>{t("contact")}</p>
            </div>
            <span aria-hidden="true" className="h-3.5" />
            {/* Full width with wrapping labels below sm: the panel is
                overflow-hidden and these labels overrun its content box on a
                phone. Same treatment as the home and hub CTA panels. */}
            <div className="flex w-full flex-wrap justify-center gap-4">
              <Button size="lg" className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap">
                {t("ctaPrimary")}
              </Button>
              <Button
                size="lg"
                variant="gold"
                className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
              >
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
