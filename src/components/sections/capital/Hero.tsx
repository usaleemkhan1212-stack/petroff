import { useTranslations } from "next-intl";
import { HeroOrnaments } from "@/components/sections/capital/HeroOrnaments";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { cn } from "@/lib/utils";
import { heroStats } from "@/lib/capital";

/**
 * Figma's `13973:934` - the Capital-risque & private equity hero.
 *
 * Two bands, like every sibling domain page: a 64px lilas breadcrumb, then a
 * 720px stage carrying eight ornaments and one centred column pinned at a
 * literal `top: 64` - hence `lg:pt-16`. **Its column is 951 wide**, the widest
 * of the family, which still puts the title on three lines.
 */
export function Hero() {
  const t = useTranslations("CapitalPage.hero");

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

        <div className="flex flex-col items-center gap-3 pt-16 pb-16 lg:min-h-180 lg:pt-16 lg:pb-0">
          <div className="mx-auto flex max-w-237.75 flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <span aria-hidden="true" className="h-3" />

            <h1 className="text-display text-encre">
              {t.rich("title", {
                /*
                  Sanctioned em exception, as on every sibling hero. Figma
                  draws this bar 396x22 centred on the stage at y=287 - on
                  line THREE of a three-line title, under `bonnes conditions.`
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
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="bg-pale-gold absolute bottom-[0.0624em] left-1/2 h-[0.3235em] w-[5.8235em] -translate-x-1/2 rounded-[4px]"
                    />
                    <span className="relative">{chunks}</span>
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
