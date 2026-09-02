import { useTranslations } from "next-intl";
import { HeroOrnaments } from "@/components/sections/fiscal/HeroOrnaments";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { heroStats } from "@/lib/fiscal";

/**
 * Figma's `12872:884` — the Droit fiscal hero.
 *
 * Two bands, like both sibling domain pages: a 64px lilas breadcrumb, then a
 * 720px stage carrying eight ornaments and one centred 860px column. Figma
 * centres that column with `top: calc(50% - 28px)` over ~537 of content, which
 * puts its overline at stage y=63.6 — hence `lg:pt-16`.
 */
export function Hero() {
  const t = useTranslations("FiscalPage.hero");

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
                  Sanctioned em exception, as on both sibling heroes. Figma
                  draws this bar at (777, 242) 349x22 on the stage: against the
                  68px display size that is 5.132em wide and 0.3235em tall,
                  its underside 0.011em above the title box, and its centre
                  0.125em left of the chunk's own.

                  The chunk closes the title, so nothing plain follows it and
                  the marker cannot paint over anything — the text span's own
                  `relative` is enough to keep the glyphs on top, and the
                  z-index dance the Contentieux and Contrats heroes need is
                  not required here.

                  It carries no `max-w-full`, unlike the Contentieux and
                  Contrats markers: Figma draws this bar WIDER than its own
                  chunk, so the cap clipped it back to the word. Verified for
                  overflow at nine widths instead.
                */
                hl: (chunks) => (
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="bg-pale-gold absolute bottom-[0.011em] left-[calc(50%-0.125em)] h-[0.3235em] w-[5.132em] -translate-x-1/2 rounded-[4px]"
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

          {/* Three stats here, not the siblings' four. */}
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
