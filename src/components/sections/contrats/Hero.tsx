import { useTranslations } from "next-intl";
import { HeroOrnaments } from "@/components/sections/contrats/HeroOrnaments";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { heroStats } from "@/lib/contrats";

export function Hero() {
  const t = useTranslations("ContratsPage.hero");

  return (
    <section className="bg-lilas relative overflow-hidden">
      <HeroOrnaments />

      <Container className="relative">
        <nav aria-label={t("breadcrumbLabel")} className="flex flex-wrap gap-2 py-5">
          <MaybeLink
            href="/"
            className="text-small text-encre/62 hover:text-encre transition-colors"
          >
            {t("crumbHome")}
          </MaybeLink>
          <span aria-hidden="true" className="text-small text-encre/62">
            ·
          </span>
          <MaybeLink
            href="/expertises"
            className="text-small text-encre/62 hover:text-encre transition-colors"
          >
            {t("crumbExpertises")}
          </MaybeLink>
          <span aria-hidden="true" className="text-small text-encre/62">
            ·
          </span>
          <span className="text-small-strong text-encre">{t("crumbCurrent")}</span>
        </nav>

        {/*
          Figma pins this column at y=109 inside the 720px stage that follows
          the 64px breadcrumb band — 21.5px higher than the Contentieux hero,
          because this title runs to three lines. Below lg the ornaments are
          gone and that head room just reads as a gap, so it drops to 64.
          No bottom padding at lg: Figma's stage is simply 720px tall with the
          content ending inside it, so min-h-180 supplies the height.
        */}
        <div className="flex flex-col items-center gap-3 pt-16 pb-16 lg:min-h-180 lg:pt-11.5 lg:pb-0">
          <div className="mx-auto flex max-w-215 flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <span aria-hidden="true" className="h-3" />

            {/* `relative z-0` makes the h1 its own stacking context so the
                marker below can sit at `-z-10` — behind every glyph, which is
                what Figma draws. Its bar is wider than the highlighted chunk,
                so without this it paints over the plain text that follows. */}
            <h1 className="text-display text-encre relative z-0">
              {t.rich("title", {
                /*
                  Sanctioned em exception, as on the Contentieux hero. Figma
                  draws this bar at (597, 257) 304x22 on the stage: 4.471em
                  wide and 0.324em tall against the 68px display size, struck
                  through the middle of the glyphs on the second line and set
                  0.563em left of the chunk's own centre.
                */
                hl: (chunks) => (
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="bg-pale-gold absolute bottom-[0.014em] left-[calc(50%-0.563em)] -z-10 h-[0.3235em] w-[4.471em] -translate-x-1/2 rounded-[4px]"
                    />
                    <span>{chunks}</span>
                  </span>
                ),
              })}
            </h1>
            <span aria-hidden="true" className="h-5" />

            <p className="text-body text-encre/62 max-w-160">{t("lead")}</p>
            <span aria-hidden="true" className="h-7.5" />

            <div className="flex flex-wrap justify-center gap-4">
              <ConsultButton size="lg">{t("ctaPrimary")}</ConsultButton>
              <Button size="lg" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>

          <span aria-hidden="true" className="h-9.5" />

          {/* Stats sit outside the copy column so all four fit, as on the
              Contentieux hero where Figma clips the outer labels. */}
          <dl className="flex flex-wrap justify-center gap-9">
            {heroStats.map((key) => (
              <div key={key} className="flex flex-col items-center gap-1">
                {/* Poppins Bold 40 — Petroff/H2 Section, not `text-stat`'s 28. */}
                <dt className="text-h2 font-poppins text-encre">
                  {t(`stats.${key}.value`)}
                </dt>
                <dd className="text-small text-encre/62">{t(`stats.${key}.label`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
