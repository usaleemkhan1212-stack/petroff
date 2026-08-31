import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useTranslations } from "next-intl";
import coffeePhoto from "@/assets/images/card-and-coffee-laptop.jpg";
import paymentPhoto from "@/assets/images/card-payment-laptop-wide.jpg";
import columnPhoto from "@/assets/images/laptop-by-column.jpg";
import { CardCarousel } from "@/components/ui/CardCarousel";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Pale gold for a guide, pale blue for a fiche — the Vitrine's data-driven
 * type pill, at its same 11/3 padding, so this is not an eighth variant.
 */
const typeTones = {
  guide: "bg-pale-gold",
  fiche: "bg-pale-blue",
} as const;

const cards = [
  { key: "cgv", photo: columnPhoto, type: "fiche" },
  { key: "retractation", photo: coffeePhoto, type: "guide" },
  { key: "pratiques", photo: paymentPhoto, type: "fiche" },
  /* A stand-in so the carousel has a fourth page to scroll to — remove it
     when a real fourth item exists. */
  { key: "demo", photo: columnPhoto, type: "guide" },
] as const satisfies readonly {
  key: string;
  photo: StaticImageData;
  type: keyof typeof typeTones;
}[];

/**
 * Figma's `13331:11178`: three library cards over the pagination dot row.
 *
 * **Bottom padding only** — Figma puts the overline at y=0, the shape this
 * page's Interlocuteurs and the home CTAFinal also have.
 *
 * Its head is written out rather than using `SectionHeading`: 10px under the
 * overline and 14px under the title, where that component uses one gap.
 */
export function ALireEnsuite() {
  const t = useTranslations("EcommercePage.alire");

  return (
    <section className="bg-lilas">
      <Container className="pb-16 lg:pb-24">
        <p className="text-overline font-poppins text-brique uppercase">
          {t("overline")}
        </p>
        <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>
        <p className="text-small text-encre/62 mt-3.5">{t("lead")}</p>

        {/* Equal height; a carousel below `lg`, the comp's 3-up grid at it. */}
        <CardCarousel
          label={t("carouselLabel")}
          count={cards.length}
          className="mt-11"
          trackClassName="gap-6"
          dotsClassName="mt-8.5"
        >
          {cards.map(({ key, photo, type }) => (
            <li
              key={key}
              className="flex min-w-0 shrink-0 basis-full snap-start sm:basis-[calc((100%-24px)/2)] lg:basis-[calc((100%-48px)/3)]"
            >
              <article className="rounded-note-lg border-encre/8 flex min-w-0 flex-1 flex-col overflow-hidden border bg-white transition-shadow hover:shadow-[0px_14px_34px_rgba(0,0,0,0.1)]">
                <div className="relative aspect-[399/224] w-full shrink-0">
                  <Image
                    src={photo}
                    alt={t(`items.${key}.photoAlt`)}
                    fill
                    sizes="(min-width: 1024px) 399px, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-2.5 px-7 pt-6 pb-7">
                  <ul className="flex flex-wrap gap-2">
                    <li className="text-small-strong bg-pale-periwinkle text-encre rounded-full px-2.75 py-0.75">
                      {t(`items.${key}.domain`)}
                    </li>
                    <li
                      className={cn(
                        "text-small-strong text-encre rounded-full px-2.75 py-0.75",
                        typeTones[type],
                      )}
                    >
                      {t(`items.${key}.type`)}
                    </li>
                  </ul>

                  <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                  <p className="text-small text-encre/62">
                    {t(`items.${key}.description`)}
                  </p>

                  <p className="flex flex-wrap items-center gap-1.5">
                    <span className="text-small-strong text-encre/62">
                      {t(`items.${key}.meta`)}
                    </span>
                    {/* Inert until the library routes exist. */}
                    <span className="text-button font-poppins text-periwinkle flex items-center gap-2">
                      {t("read")}
                      <span aria-hidden="true">→</span>
                    </span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </CardCarousel>
      </Container>
    </section>
  );
}
