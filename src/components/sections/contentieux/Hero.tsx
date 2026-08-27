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
          Figma centres this column in the 720px stage — `top: calc(50% -
          33.5px)` over 561 of content, which puts its first line at stage
          y=46, i.e. 110 into the section. It used to sit at 130.5; the frame
          moved it up 84. Below lg the ornaments are gone and that head room
          reads as a gap, so it drops to 64. min-h holds the 720px stage the
          ornament coordinates are measured against.
        */}
        <div className="flex flex-col items-center gap-3 pt-16 pb-16 lg:min-h-180 lg:pt-11.5 lg:pb-10">
          <div className="mx-auto flex max-w-215 flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins uppercase text-brique">{t("overline")}</p>
            <span aria-hidden="true" className="h-3" />

            {/* `relative z-0` makes the h1 its own stacking context so the
                marker below can sit at `-z-10` — behind every glyph, which is
                what Figma draws (the rect is the stage's first child). Without
                it the bar is a positioned element painting over the plain text
                that follows the highlighted word. */}
            <h1 className="text-display text-encre relative z-0">
              {t.rich("title", {
                /*
                  Sanctioned em exception. Figma now draws this bar at
                  (615, 217) 204x22 on the stage — wider than the word and
                  struck low through line two, where it used to be 150x22 at
                  (613, 278.5). 204/68 = 3em wide, 22/68 = 0.3235em tall.
                */
                hl: (chunks) => (
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="bg-pale-gold absolute -z-10 bottom-[0.117em] left-[calc(50%+0.778em)] h-[0.3235em] w-[3em] -translate-x-1/2 rounded-[4px]"
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
