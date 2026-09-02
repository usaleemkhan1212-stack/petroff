import { useTranslations } from "next-intl";
import { HeroOrnaments } from "@/components/sections/immobilier/HeroOrnaments";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { cn } from "@/lib/utils";
import { heroStats } from "@/lib/immobilier";

/**
 * Figma's `12873:1009` — the Immobilier d'entreprise hero.
 *
 * Two bands, like all three sibling domain pages: a 64px lilas breadcrumb, then
 * a 720px stage carrying eight ornaments and one centred 860px column. This
 * frame pins that column at a literal `top: 64` rather than centring it, which
 * is the same number the Droit fiscal centring works out to — hence `lg:pt-16`.
 */
export function Hero() {
  const t = useTranslations("ImmobilierPage.hero");

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

        <div className="flex flex-col items-center gap-3 pt-16 pb-16 lg:min-h-180 lg:pt-16 lg:pb-0">
          <div className="mx-auto flex max-w-215 flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <span aria-hidden="true" className="h-3" />

            <h1 className="text-display text-encre relative z-0">
              {t.rich("title", {
                /*
                  Sanctioned em exception, as on every sibling hero. Figma
                  draws this bar at 678x22 at stage (545, 138) — on LINE ONE,
                  under `Vos murs, vos baux,` — which against the 68px display
                  size is 9.971em wide and 0.3235em tall, its underside 0.4865em
                  above the chunk's own box.

                  **This hero needs the z-index dance**, unlike the other three
                  built in this run: its chunk is followed by `vos` on the same
                  line, and a positioned marker paints above the non-positioned
                  inline text that follows it. The `h1` takes `relative z-0` so
                  the bar can sit at `-z-10`, behind every glyph, which is what
                  Figma draws.

                  **The em was corrected against the rendered comp, not the
                  frame's box arithmetic.** Deriving it from the line box put
                  the bar 23px high on the glyphs: Figma's own render places the
                  text higher inside an identically positioned box than the
                  browser does. Measured by scanning both renders for the gold
                  band and the marked line's ink — band bottom minus ink bottom
                  now agrees within a pixel.
                */
                hl: (chunks) => (
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="bg-pale-gold absolute bottom-[0.1483em] left-1/2 -z-10 h-[0.3235em] w-[9.971em] max-w-full -translate-x-1/2 rounded-[4px]"
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

          {/*
            Three stats — and the first row on the site whose values are not
            all one size: Figma sets `ILC / ILAT` at `text-stat` (28) where the
            other two are `text-h2` (40), because that string is far longer
            than a figure. Carried per stat in `immobilier.ts`.
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
