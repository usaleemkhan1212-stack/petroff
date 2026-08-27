import { useTranslations } from "next-intl";
import { StageOrnaments } from "@/components/sections/expertises/StageOrnaments";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { stageStats } from "@/lib/expertises-hub";

export function Stage() {
  const t = useTranslations("ExpertisesPage.stage");

  return (
    <section className="bg-lilas relative overflow-hidden">
      <StageOrnaments />

      <Container className="relative">
        <nav aria-label={t("breadcrumbLabel")} className="flex gap-2 py-5">
          <MaybeLink
            href="/"
            className="text-small text-encre/62 hover:text-encre transition-colors"
          >
            {t("crumbHome")}
          </MaybeLink>
          <span aria-hidden="true" className="text-small text-encre/62">
            ·
          </span>
          <span className="text-small-strong text-encre">{t("crumbCurrent")}</span>
        </nav>

        {/*
          The copy starts 90px into the section, which is where the home
          hero's overline sits — so the two centred heroes land in exactly the
          same place and the block does not jump between pages. The breadcrumb
          band above is 64, hence 26 of padding here.

          **This is a deliberate departure from the comp**, asked for: this
          frame puts its `inner` column at y=110, 20px lower. Cross-page
          consistency wins over the per-frame number, the same way the
          uppercase eyebrows do.

          min-h holds the 784px stage height the ornament coordinates are
          measured against.
        */}
        <div className="flex flex-col items-center pt-6.5 pb-16 lg:min-h-180">
          <div className="mx-auto flex max-w-200 flex-col items-center text-center">
            {/* No spacer under the overline, so the title lands on the same
                y as the home hero's. This frame draws a 10px one; dropping it
                is part of the same cross-page alignment as the 26 above. */}
            <p className="text-overline font-poppins uppercase text-brique">{t("overline")}</p>

            <h1 className="text-display text-encre">
              {t.rich("title", {
                // Pale-gold marker bar sitting behind the closing words.
                hl: (chunks) => (
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="bg-pale-gold absolute bottom-[0.045em] left-1/2 h-[0.353em] w-[5.426em] -translate-x-1/2 rounded"
                    />
                    <span className="relative">{chunks}</span>
                  </span>
                ),
              })}
            </h1>
            <span aria-hidden="true" className="h-5" />

            <p className="text-body text-encre/62 max-w-155">{t("lead")}</p>
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
            The four stats need 816px, more than the 800px copy column — Figma
            lets them overflow it and clips the outer labels. Sitting outside
            that column they fit on one row against the 1245px container and
            wrap cleanly instead of being cut.
          */}
          <dl className="flex flex-wrap justify-center gap-9">
            {stageStats.map((key) => (
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
