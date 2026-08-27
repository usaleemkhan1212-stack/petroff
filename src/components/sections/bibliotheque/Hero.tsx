import { useTranslations } from "next-intl";
import { HeroIllustration } from "@/components/sections/bibliotheque/HeroIllustration";
import { HeroSearch } from "@/components/sections/bibliotheque/HeroSearch";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const t = useTranslations("BibliothequePage.hero");

  return (
    /* Figma draws an empty **40px** crumb band above the content and closes
       71 below — the band used to be 62 + a 16px gap, so the copy sits 38
       higher than it did. 40 + 549 + 71 is the section's 660 exactly. */
    <section className="bg-lilas">
      <Container className="pt-10 pb-17.75">
        <div className="flex flex-col gap-7.5">
          {/*
            No gap: Figma's own row is 692 + 511 inside the 1245 band, which
            justify-between spaces by 42. An explicit gap would push the pair
            to 1251 and overflow, the same trap the Contrats FAQ hit.
          */}
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-8.75">
              <div className="flex flex-col gap-4.25">
                <p className="text-overline font-poppins uppercase text-brique">
                  {t("overline")}
                </p>

                <h1 className="text-display text-encre">
                  {t.rich("title", {
                    // Designed line break; collapses below sm so it wraps.
                    br: () => <br className="hidden sm:inline" />,
                    // Pale-gold marker bar sitting behind the final word.
                    hl: (chunks) => (
                      <span className="relative inline-block">
                        <span
                          aria-hidden="true"
                          className="bg-pale-gold absolute bottom-[0.069em] left-0 h-[0.382em] w-[4.941em] rounded"
                        />
                        <span className="relative">{chunks}</span>
                      </span>
                    ),
                  })}
                </h1>

                <p className="text-body text-encre/62 max-w-157">{t("lead")}</p>
              </div>

              <HeroSearch />
            </div>

            <HeroIllustration />
          </div>

          {/* Counts are the point, so they carry the weight. */}
          <p className="text-small text-encre/62">
            {t.rich("stats", {
              n: (chunks) => (
                <span className="text-button font-poppins text-encre">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </Container>
    </section>
  );
}
