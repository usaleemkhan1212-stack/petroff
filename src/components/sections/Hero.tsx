import { useTranslations } from "next-intl";
import { HeroOrnaments } from "@/components/sections/HeroOrnaments";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="bg-lilas relative overflow-hidden">
      <HeroOrnaments />

      <Container className="relative">
        <div className="mx-auto flex max-w-225 flex-col items-center pt-22.5 pb-24 text-center lg:min-h-165">
          <p className="text-overline font-poppins text-brique">{t("overline")}</p>

          <h1 className="text-display text-encre">
            {t.rich("title", {
              // Designed line break; collapses below sm so the headline wraps.
              br: () => <br className="hidden sm:inline" />,
              // Pale-gold marker bar sitting behind the final word.
              hl: (chunks) => (
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="bg-pale-gold absolute -bottom-[0.104em] left-1/2 h-[0.382em] w-[6.176em] -translate-x-1/2 rounded"
                  />
                  <span className="relative">{chunks}</span>
                </span>
              ),
            })}
          </h1>

          <p className="text-body text-encre/62 mt-5.5 max-w-140">{t("lead")}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg">{t("ctaPrimary")}</Button>
            <Button size="lg" variant="outline">
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
