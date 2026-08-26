import { useTranslations } from "next-intl";
import ColumnedBuildingPaleBlue from "@/assets/icons/columned-building-pale-blue.svg";
import LawyerRobeColour from "@/assets/icons/lawyer-robe-colour.svg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTAFinal() {
  const t = useTranslations("CTAFinal");

  return (
    <section className="bg-lilas">
      {/* Bottom padding only: both frames give this section pb-96 and no top
          padding, because Actus above it already closes with its own 96. */}
      <Container className="pb-16 lg:pb-24">
        <div className="rounded-panel bg-lilas-2 relative overflow-hidden px-6 py-12 sm:px-12 lg:py-16">
          {/*
            Sanctioned ornament exception: the offsets are the literal Figma
            coordinates, and both shapes deliberately bleed past the panel so
            the rounded edge clips them. The robe is pinned to the right edge
            rather than to `left: 1026px` so it holds its inset as the panel
            narrows. Hidden below lg, where they would sit under the copy.

            The building is the same glyph as the Cabinet collage, exported
            there at 150x112 and here at 180x135 — an exact 1.2x scale, so one
            asset serves both.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            <ColumnedBuildingPaleBlue
              width={180}
              height={135}
              className="absolute top-[244px] left-[-30px] opacity-90"
            />
            <LawyerRobeColour
              width={130}
              height={140}
              className="absolute top-[-30px] right-[89px]"
            />
          </div>

          <div className="relative flex flex-col items-center gap-4 text-center">
            <p className="text-overline font-poppins uppercase text-brique">{t("overline")}</p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62">{t("lead")}</p>
            <span aria-hidden="true" className="h-3.5" />
            {/*
              Below sm the buttons go full width and their labels are allowed
              to wrap: "Faire évaluer mon dossier" is 266px against a 232px
              content box at 320, and the panel is overflow-hidden, so
              whitespace-nowrap clipped it. Figma specifies desktop only.
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
