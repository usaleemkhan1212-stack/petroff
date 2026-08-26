import { useTranslations } from "next-intl";
import ColumnedBuilding from "@/assets/icons/columned-building.svg";
import ScalesOfJusticeSm from "@/assets/icons/scales-of-justice-sm.svg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTAFinal() {
  const t = useTranslations("ContactCta");

  return (
    /* py-24 here, unlike the Expertises CTAFinal: the FAQ above closes with its
       own 96px but Figma still specifies top padding on this one. */
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="rounded-panel bg-lilas-2 relative overflow-hidden px-6 py-12 sm:px-12 lg:py-16">
          {/*
            Sanctioned ornament exception: literal Figma coordinates, both
            shapes bleeding past the panel so the rounded edge clips them —
            the building off the left and bottom, the scales off the right and
            top. The scales are pinned to the right edge rather than to
            `left: 1111.5px` so they hold their inset as the panel narrows.
            Hidden below lg, where they would sit under the copy.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            {/* 90% like the home panel's: Figma paints #cad8f0 here, which is
                pale-periwinkle composited at 0.9 over the lilas-2 panel. */}
            <ColumnedBuilding
              width={180}
              height={135}
              className="absolute top-[243px] left-[-31.5px] opacity-90"
            />
            <ScalesOfJusticeSm
              width={150}
              height={150}
              className="absolute top-[-7px] right-[-16.5px]"
            />
          </div>

          {/* gap-3 here, not the Expertises CTAFinal's gap-4: Figma specifies 12px
              on this panel and 16px on that one. */}
          <div className="relative flex flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins uppercase text-brique">{t("overline")}</p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            {/* Two lines, no gap between them — the 16px stack gap wraps the pair. */}
            <div className="text-body text-encre/62">
              <p>{t("lead")}</p>
              <p>{t("contact")}</p>
            </div>
            <span aria-hidden="true" className="h-3.5" />
            {/* Full width with wrapping labels below sm: the panel is
                overflow-hidden and these labels overrun its content box on a
                phone. Same treatment as the other CTA panels. */}
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
