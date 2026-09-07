import { useTranslations } from "next-intl";
import { HeroMarker } from "@/components/ui/HeroMarker";
import { HeroOrnaments } from "@/components/sections/societes/HeroOrnaments";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { cn } from "@/lib/utils";
import { heroStats } from "@/lib/societes";

/**
 * Figma's `13979:934` - the Droit des societes & gouvernance hero.
 *
 * Two bands, like every sibling domain page: a 64px lilas breadcrumb, then a
 * 720px stage carrying eight ornaments and one centred column pinned at a
 * literal `top: 64` - hence `lg:pt-16`.
 *
 * **Its column is 903 wide, not the siblings' 860**, which is what puts the
 * title on three lines and the marker on line three.
 */
export function Hero() {
  const t = useTranslations("SocietesPage.hero");

  return (
    <section className="bg-lilas relative overflow-hidden">
      <HeroOrnaments />

      <Container className="relative">
        {/* The standard 64 band - 20 above and below a 24px line. */}
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
            **`lg:pb-12` is room for the scroll overlap to eat, not styling.**
            The stage is a fixed 720 (`min-h-180`) and the bottom clearance is
            just whatever slack the copy leaves inside it — on this page the
            headline and stat band nearly fill it, leaving **20.2px**, so the
            next section climbing its 30 covered the last stat label. The 48
            here puts the clearance at 48 and leaves ~18 showing at full
            overlap, which is the room the heroes that never clipped already
            have. See CLAUDE.md, "the hero needs room for the overlap to eat".
          */}
        <div className="flex flex-col items-center gap-3 pt-16 pb-16 lg:min-h-180 lg:pt-16 lg:pb-12">
          <div className="mx-auto flex max-w-225.75 flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <span aria-hidden="true" className="h-3" />

            <h1 className="text-display text-encre">
              {t.rich("title", {
                /*
                  Sanctioned em exception, as on every sibling hero. Figma
                  draws this bar 396x22 centred on the stage at y=287 - on
                  line THREE of a three-line title, under `bases solides.`
                  Against the 68px display size that is 5.8235em wide and
                  0.3235em tall.

                  **Its `bottom` is the render-matched value, not the box
                  arithmetic**: Figma draws the glyphs higher inside an
                  identically positioned box than the browser does, so the bar
                  is derived by scanning both renders for the gold band and the
                  marked line's ink and matching band minus ink.

                  The chunk closes the title, so nothing plain follows it and
                  the text span's own stacking keeps the glyphs on top - no
                  negative z-index dance, unlike the Contentieux, Contrats,
                  Immobilier and Recouvrement heroes.
                */
                hl: (chunks) => (
                  <HeroMarker top={0.8509} height={0.3233}>
                    {chunks}
                  </HeroMarker>
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

          {/*
            Three stats, all `text-h2` here.
          */}
          <dl className="flex flex-wrap justify-center gap-9">
            {heroStats.map(({ key, small }) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <dt
                  className={cn(
                    "font-poppins text-encre",
                    small ? "text-stat" : "text-h2",
                  )}
                >
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
