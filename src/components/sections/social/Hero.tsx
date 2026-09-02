import { useTranslations } from "next-intl";
import { HeroOrnaments } from "@/components/sections/social/HeroOrnaments";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { heroStats } from "@/lib/social";

/**
 * Figma's `12872:1008` — the Droit social hero.
 *
 * Two bands, like all three sibling domain pages: a 64px lilas breadcrumb, then
 * a 720px stage carrying eight ornaments and one centred 860px column. This
 * frame pins that column at a literal `top: 64` rather than centring it, which
 * is the same number the Droit fiscal centring works out to — hence `lg:pt-16`.
 */
export function Hero() {
  const t = useTranslations("SocialPage.hero");

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

            <h1 className="text-display text-encre">
              {t.rich("title", {
                /*
                  Sanctioned em exception, as on every sibling hero. Figma
                  draws this bar at 317x22 on the stage, centred on it, with
                  its top at 290 — and this title runs to THREE lines, so the
                  bar sits on line three rather than line two. Against the 68px
                  display size that is 4.662em wide and 0.3235em tall, its
                  underside 0.371em above the chunk's own box.

                  The chunk closes the title, so nothing plain follows it and
                  the marker cannot paint over anything — the text span's own
                  `relative` keeps the glyphs on top, and the z-index dance the
                  Contentieux and Contrats heroes need is not required here.

                  **The em was corrected against the rendered comp, not the
                  frame's box arithmetic.** Deriving it from the line box put
                  the bar 23px high on the glyphs: Figma's own render places the
                  text higher inside an identically positioned box than the
                  browser does. Measured by scanning both renders for the gold
                  band and the marked line's ink — band bottom minus ink bottom
                  now agrees within a pixel.

                  It carries no `max-w-full`, unlike the Contentieux and
                  Contrats markers: Figma draws this bar WIDER than its own
                  chunk, so the cap clipped it back to the word. Verified for
                  overflow at nine widths instead.
                */
                hl: (chunks) => (
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="bg-pale-gold absolute bottom-[0.0328em] left-1/2 h-[0.3235em] w-[4.662em] -translate-x-1/2 rounded-[4px]"
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

          {/* Three stats, like the Droit fiscal hero. */}
          <dl className="flex flex-wrap justify-center gap-9">
            {heroStats.map((key) => (
              <div key={key} className="flex flex-col items-center gap-1">
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
