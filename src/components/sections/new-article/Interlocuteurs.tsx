import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useTranslations } from "next-intl";
import mariela from "@/assets/images/lawyer-portrait-card.jpg";
import tony from "@/assets/images/tony-portrait-card.jpg";
import { Container } from "@/components/ui/Container";

/* Literal keys, so `t(`items.${key}.name`)` stays typed. */
const lawyers = [
  { key: "petrova", photo: mariela },
  { key: "bazin", photo: tony },
] as const satisfies readonly { key: string; photo: StaticImageData }[];

const tags = ["tag1", "tag2", "tag3"] as const;

/**
 * Figma's `13318:3188` and its `lawgrid` (`13323:4272`): two full-width
 * stacked cards, 36 apart, each a 200x240 portrait beside the lawyer's name,
 * specialities, languages and the angle they take on this article.
 *
 * **It takes bottom padding only** — Figma puts this overline at y=0, so the
 * Cabinet band above closes the gap. Building it symmetric puts every band a
 * constant 96 out while the section still measures close, which is how a wrong
 * pad hides.
 *
 * Card and portrait share the 80px top-left corner; the card closes on a 60px
 * bottom right, the portrait on 20/20. The angle note sits behind a 3px **red**
 * rule and the languages line is **periwinkle**.
 *
 * **Figma draws its `0px 14px 34px` shadow on the first card only**, which is
 * the hover state rather than a permanent one — the same call the home Domaines
 * and Actus grids, the Contrats Domaines and the e-commerce twin all make. It
 * is carried on `hover:` here, not statically.
 *
 * Both portrait exports diff against the stored crops at 1.09 and 1.81 of 255,
 * so no new assets. All its copy but the angle note comes from the shared
 * top-level `Interlocuteurs` namespace.
 */
export function Interlocuteurs() {
  const t = useTranslations("Interlocuteurs");
  const page = useTranslations("ArticlePage.interlocuteurs");

  return (
    <section className="bg-lilas">
      <Container className="pb-12 sm:pb-16 lg:pb-24">
        <p className="text-overline font-poppins text-brique uppercase">
          {t("overline")}
        </p>
        <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>
        <p className="text-small text-encre/62 mt-3.5">{t("lead")}</p>

        <ul className="mt-8 flex flex-col gap-6 lg:mt-11 lg:gap-9">
          {lawyers.map(({ key, photo }) => (
            <li
              key={key}
              className="border-encre/8 flex flex-col gap-7 rounded-tl-[80px] rounded-tr-[18px] rounded-br-[60px] rounded-bl-[18px] border bg-white p-5 transition-shadow hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)] sm:flex-row sm:items-start sm:p-7"
            >
              <div className="relative h-60 w-50 shrink-0 self-start overflow-hidden rounded-tl-[80px] rounded-tr-[4px] rounded-br-[20px] rounded-bl-[20px]">
                <Image
                  src={photo}
                  alt={t(`photoAlt.${key}`)}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-h3 font-poppins text-encre">
                    {t(`items.${key}.name`)}
                  </p>
                  <p className="text-small text-encre/62">{t(`items.${key}.role`)}</p>
                </div>

                {/* Lilas ground, encre/62 label — the site's sixth pill. */}
                <ul className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-small-strong bg-lilas text-encre/62 rounded-full px-3 py-1"
                    >
                      {t(`items.${key}.${tag}`)}
                    </li>
                  ))}
                </ul>

                <div className="flex w-full flex-col items-start gap-2">
                  <p className="text-small-strong text-periwinkle">
                    {t(`items.${key}.languages`)}
                  </p>

                  <p className="text-small text-encre/62 border-red w-full border-l-3 py-0.5 pl-3.5">
                    {page.rich(`angle.${key}`, {
                      b: (chunks) => (
                        <span className="text-button font-poppins text-encre">
                          {chunks}
                        </span>
                      ),
                    })}
                  </p>
                </div>

                {/* Both inert — neither lawyer has a page yet. */}
                <div className="flex flex-wrap gap-4">
                  <span className="text-button font-poppins bg-encre rounded-full px-5 py-2.75 text-white">
                    {t(`items.${key}.cta`)}
                  </span>
                  <span className="text-button font-poppins text-encre border-encre rounded-full border-[1.5px] px-5 py-2.75">
                    {t(`items.${key}.cta2`)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
