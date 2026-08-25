import { useTranslations } from "next-intl";
import ArcDeTriompheColourLg from "@/assets/icons/arc-de-triomphe-colour-lg.svg";
import ThreeFigures from "@/assets/icons/three-figures.svg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTAFinal() {
  const t = useTranslations("ContactCta");

  return (
    /* No top padding here: Facons above already closes with its own 96px. */
    <section className="bg-lilas">
      <Container className="pb-16 lg:pb-24">
        <div className="rounded-panel bg-lilas-2 relative overflow-hidden px-6 py-12 sm:px-12 lg:py-16">
          {/*
            Sanctioned ornament exception: the offsets are the literal Figma
            coordinates, and both shapes deliberately bleed past the panel so
            the rounded edge clips them — figures off the left and bottom, arc
            off the right and top, exactly as the comp shows. The arc is pinned
            to the right edge rather than to `left: 1120.5px` so it holds its
            inset as the panel narrows. Hidden below lg, where they would sit
            under the copy.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            <ThreeFigures
              width={180}
              height={138}
              className="absolute top-[259px] left-[-20.5px]"
            />
            <ArcDeTriompheColourLg
              width={149.595}
              height={123}
              className="absolute top-[-9px] right-[-25.1px]"
            />
          </div>

          <div className="relative flex flex-col items-center gap-4 text-center">
            <p className="text-overline font-poppins text-brique">{t("overline")}</p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            {/* Two lines, no gap between them — the 16px stack gap wraps the pair. */}
            <div className="text-body text-encre/62">
              <p>{t("lead")}</p>
              <p>{t("contact")}</p>
            </div>
            <span aria-hidden="true" className="h-3.5" />
            {/*
              Below sm the buttons go full width and their labels may wrap:
              these two are 265 and 258px against a 239px content box at 375,
              and the panel is overflow-hidden. Same treatment as the home
              CTAFinal. Figma specifies desktop only.
            */}
            <div className="flex w-full flex-wrap justify-center gap-4">
              <Button size="lg" className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap">
                {t("ctaPrimary")}
              </Button>
              <Button size="lg" variant="gold" className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
