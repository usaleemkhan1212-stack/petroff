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
          Figma pins this column at y=17 so it overlaps the 64px breadcrumb
          band. In flow the column follows the breadcrumb instead, so its top
          padding drops from 64 to 16 and the overline still lands at the
          designed y. min-h holds the 784px stage height the ornament
          coordinates are measured against.
        */}
        <div className="flex flex-col items-center pt-4 pb-16 lg:min-h-180">
          <div className="mx-auto flex max-w-200 flex-col items-center text-center">
            <p className="text-overline font-poppins text-brique">{t("overline")}</p>
            <span aria-hidden="true" className="h-2.5" />

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
