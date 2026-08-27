import Image from "next/image";
import { useTranslations } from "next-intl";
import BulletMarkGold from "@/assets/icons/bullet-mark-gold.svg";
import photo from "@/assets/images/associes-grass-laptop.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** The six points, in Figma's order. */
const points = ["nullite", "minorites", "escalade", "revocation", "pacte", "prix"] as const;

/**
 * Figma `13445:23789` — "L'essentiel en six points".
 *
 * A 470 photo beside a 711 column on a **64px gap**. Its takeaways box carries
 * `p-28` and an 18px radius but **no fill**, so it reads as an inset column on
 * the section's own lilas rather than as a panel — unlike the article pages'
 * takeaways, which are tinted.
 */
export function Essentiel() {
  const t = useTranslations("ServicePage.essentiel");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-16">
          <div className="aspect-[470/548] w-full max-w-117.5 shrink-0 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px] xl:w-117.5">
            <Image
              src={photo}
              alt={t("imageAlt")}
              sizes="(min-width: 1280px) 470px, 100vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
            </div>

            {/* No background: Figma gives this box a radius and 28 of padding
                but no fill, so it is an inset column, not a panel. */}
            <div className="rounded-note-lg p-5 sm:p-7">
              <h3 className="text-h3 text-encre">{t("boxTitle")}</h3>
              <span aria-hidden="true" className="block h-4" />
              {/* No gap between rows: each carries its own 10px padding, so
                  consecutive points sit 20 apart. */}
              <ul className="flex flex-col">
                {points.map((key) => (
                  <li key={key} className="flex items-start gap-4.25 py-2.5">
                    <BulletMarkGold
                      aria-hidden="true"
                      width={9}
                      height={27}
                      className="shrink-0"
                    />
                    <p className="text-body text-encre min-w-0 flex-1">
                      {t.rich(`items.${key}`, {
                        b: (chunks) => (
                          <span className="text-body-strong">{chunks}</span>
                        ),
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" className="self-start">
              {t("cta")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
