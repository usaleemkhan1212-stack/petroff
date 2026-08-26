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
 * Figma's `13331:11124` — the article's Interlocuteurs, duplicated.
 *
 * The two nodes are identical in every value: the same 80px top-left corner on
 * both card and portrait, the same red angle rule, periwinkle languages line,
 * lilas chips and pair of CTAs, and the same `0px 14px 34px` shadow on the
 * **first card only**, which is the hover state (verified by sampling below
 * both cards' edges here too). The portrait export diffs against the stored
 * `lawyer-portrait-card.jpg` at 1.09/255, so no new assets.
 *
 * **One real difference: this section takes top padding as well as bottom.**
 * Figma puts its overline at y=96, where the article's sits at y=0.
 *
 * All its copy but the angle note comes from the shared top-level
 * `Interlocuteurs` namespace. **Its own angle notes are, today, the article's
 * verbatim** — "Sur cette fiche : le choix du niveau de signature…", which is
 * the signature électronique article's subject, not e-commerce. That is the
 * duplicated-frame leftover this page's heading note already warns about, and
 * it is kept per page precisely so the designer can rewrite one without
 * touching the other.
 */
export function Interlocuteurs() {
  /* Everything but the angle note comes from the shared namespace. */
  const t = useTranslations("Interlocuteurs");
  const page = useTranslations("EcommercePage.interlocuteurs");

  return (
    <section className="bg-lilas">
      {/* Top and bottom padding here — Figma puts this overline at y=96,
          where the article's sits at y=0. */}
      <Container className="py-16 lg:py-24">
        <p className="text-overline font-poppins uppercase text-brique">{t("overline")}</p>
        <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>
        <p className="text-small text-encre/62 mt-3.5">{t("lead")}</p>

        <ul className="mt-11 flex flex-col gap-9">
          {lawyers.map(({ key, photo }) => (
            <li
              key={key}
              className="border-encre/8 flex flex-col gap-7 rounded-tl-[80px] rounded-tr-[18px] rounded-br-[60px] rounded-bl-[18px] border bg-white p-5 sm:p-7 transition-shadow hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)] sm:flex-row sm:items-start"
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
                  <p className="text-small text-encre/62">
                    {t(`items.${key}.role`)}
                  </p>
                </div>

                {/* Sixth pill on the site: lilas ground, encre/62 label. */}
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

                  {/* The angle this lawyer takes on this article. */}
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

                {/* Both inert, like every control on this page. */}
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
