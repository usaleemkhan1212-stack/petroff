import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import balcony from "@/assets/images/balcony-call-laptop-wide.jpg";
import portrait from "@/assets/images/lawyer-portrait-card.jpg";
import street from "@/assets/images/folder-street-call.jpg";
import walking from "@/assets/images/walking-with-coffee.jpg";
import { CardCarousel } from "@/components/ui/CardCarousel";
import { caseStudies } from "@/lib/le-cabinet";

const photos: Record<(typeof caseStudies)[number], StaticImageData> = {
  blocage: walking,
  levee: street,
  marque: balcony,
};

/**
 * Figma `13701:24725` — "Études de cas", three case cards in a **1341-wide
 * lilas block**, which is the 1245 container plus its own 48 of padding, so it
 * is `max-w-[1341px]` centred rather than a full-width band. At 1920 that puts
 * it at x=289.5, the comp's own number.
 *
 * **It is a real carousel**: Figma draws prev/next arrows *and* three dots, and
 * a pagination row only means anything if it can page. The shared
 * `CardCarousel` gained a `header` slot for exactly this — the arrows belong in
 * the section's head row, not beside the track — and one `chevron-right.svg`
 * mirrored serves both, the call the Vitrine already makes.
 *
 * With three 399 cards in a 1245 box they all fit from `lg`, so there the
 * arrows and dots correctly show a single page; below it the track pages.
 *
 * Three new photographs; everything else reuses, including the 42x50 author
 * portrait, which diffs at **2.50** against the stored card crop.
 */
export function Cas() {
  const t = useTranslations("CabinetPage.cas");

  return (
    <section className="bg-white">
      <div className="px-5 sm:px-8 xl:px-15">
        <div className="bg-lilas mx-auto max-w-[1341px] rounded-[24px] p-6 sm:p-9 lg:p-12">
          <CardCarousel
            label={t("carouselLabel")}
            count={caseStudies.length}
            navLabels={{ prev: t("prev"), next: t("next") }}
            trackClassName="items-start gap-6"
            dotsClassName="mt-6"
            header={
              <div className="flex max-w-190 min-w-0 flex-col gap-3">
                <p className="text-overline font-poppins text-brique uppercase">
                  {t("overline")}
                </p>
                <h2 className="text-h2 text-encre">{t("title")}</h2>
                <p className="text-lead text-encre/62">{t("lead")}</p>
              </div>
            }
          >
            {caseStudies.map((key) => (
              <li
                key={key}
                className="w-full shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                {/* Figma marks the row `items-start` and stretches none of the three,
                    so they end at 937 / 889 / 865 — their own heights, not one
                    levelled row. Hence no `h-full` here and no `mt-auto` on the
                    author row below. */}
                <article className="border-stone flex flex-col overflow-hidden rounded-[22px] border bg-white">
                  <Image
                    src={photos[key]}
                    alt={t(`cards.${key}.alt`)}
                    sizes="(min-width: 1024px) 399px, 100vw"
                    className="h-57.5 w-full object-cover"
                  />

                  <div className="flex flex-col gap-6 p-6">
                    <div>
                      {/* `inline-flex`, not a bare inline span: an inline box takes its
                          font's content area rather than its line-height, which drew
                          the pill 28 tall against the comp's 31.2. */}
                      <span className="text-small-strong text-brique bg-pale-gold inline-flex items-center rounded-full px-3 py-1">
                        {t(`cards.${key}.chip`)}
                      </span>
                    </div>

                    <h3 className="text-h3 font-poppins text-encre">
                      {t(`cards.${key}.title`)}
                    </h3>

                    {(["context", "action"] as const).map((block) => (
                      <div key={block} className="flex flex-col gap-1">
                        <p className="text-overline font-poppins text-brique uppercase">
                          {t(block === "context" ? "contextLabel" : "actionLabel")}
                        </p>
                        <p className="text-small text-encre/62">
                          {t(`cards.${key}.${block}`)}
                        </p>
                      </div>
                    ))}

                    {/* The result is set off by a 2px result-green edge, and its
                        body is full encre where the two blocks above are 62%. */}
                    <div className="border-result-green flex flex-col gap-1 border-l-2 pl-3">
                      <p className="text-body-strong text-result-green">
                        {t("resultLabel")}
                      </p>
                      <p className="text-small text-encre">
                        {t(`cards.${key}.result`)}
                      </p>
                    </div>

                    <div className="border-encre/10 flex gap-3 border-t pt-3">
                      <Image
                        src={portrait}
                        alt={t("authorAlt")}
                        sizes="42px"
                        className="h-12.5 w-10.5 shrink-0 rounded-tl-[17.556px] rounded-tr-[0.878px] rounded-br-[4.389px] rounded-bl-[4.389px] object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="text-h3 font-poppins text-encre">{t("author")}</p>
                        <p className="text-small text-encre/62">{t("authorRole")}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </CardCarousel>
        </div>
      </div>
    </section>
  );
}
