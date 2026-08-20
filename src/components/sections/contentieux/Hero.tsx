import { useTranslations } from "next-intl";
import { HeroOrnaments } from "@/components/sections/contentieux/HeroOrnaments";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { heroStats } from "@/lib/contentieux";

export function Hero() {
  const t = useTranslations("ContentieuxPage.hero");

  return (
    <section className="bg-lilas relative overflow-hidden">
      <HeroOrnaments />

      <Container className="relative">
        {/* Three crumbs here, against the hub page's two. */}
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
          Figma pins this column at y=130.5 inside the 720px stage that follows
          the 64px breadcrumb band, so lg:pt-32.5 puts the overline back on its
          designed line. Below lg the ornaments are gone and 130px of head room
          reads as a gap, so it drops to 64. min-h holds the 720px stage the
          ornament coordinates are measured against.
        */}
        <div className="flex flex-col items-center gap-3 pt-16 pb-16 lg:min-h-180 lg:pt-32.5 lg:pb-10">
          <div className="mx-auto flex max-w-215 flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins text-brique">{t("overline")}</p>
            <span aria-hidden="true" className="h-3" />

            <h1 className="text-display text-encre">
              {t.rich("title", {
                /*
                  Sanctioned em exception. Figma draws this bar at
                  (613, 278.5) 150x22 on the stage: 2.206em wide and
                  0.324em tall against the 68px display size, struck
                  through the middle of the glyphs rather than under
                  them, and centred 0.351em right of the word itself.
                */
                hl: (chunks) => (
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="bg-pale-gold absolute bottom-[0.455em] left-[calc(50%+0.351em)] h-[0.324em] w-[2.206em] -translate-x-1/2 rounded"
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
              <Button size="lg">{t("ctaPrimary")}</Button>
              <Button size="lg" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>

          <span aria-hidden="true" className="h-9.5" />

          {/*
            Same as the hub stage: the stats need more width than the copy
            column, and Figma clips the outer labels rather than reflowing.
            Sitting outside that column they fit against the 1245px container.
          */}
          <dl className="flex flex-wrap justify-center gap-9">
            {heroStats.map((key) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <dt className="text-stat font-poppins text-encre">
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
