import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useTranslations } from "next-intl";
import mariela from "@/assets/images/lawyer-portrait-square.jpg";
import tony from "@/assets/images/tony-portrait-square.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/* Literal keys, so `t(`items.${key}.name`)` stays typed. */
const lawyers = [
  { key: "petrova", photo: mariela },
  { key: "bazin", photo: tony },
] as const satisfies readonly { key: string; photo: StaticImageData }[];

const tags = ["tag1", "tag2", "tag3"] as const;

/**
 * The two lawyers who handle this subject, each with their angle on it.
 *
 * Same head shape as the Cabinet band above — 10px under the overline, 14px
 * under the title, a full-width `text-small` lead — so it is written out
 * rather than reaching for `SectionHeading`.
 */
export function Interlocuteurs() {
  const t = useTranslations("ArticlePage.interlocuteurs");

  return (
    <section className="bg-white">
      <Container className="py-24">
        <p className="text-overline font-poppins text-brique">{t("overline")}</p>
        <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>
        <p className="text-small text-encre/62 mt-3.5">{t("lead")}</p>

        {/* 2 -> 1. Figma leaves the cards at content height, not levelled. */}
        <ul className="mt-11 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {lawyers.map(({ key, photo }) => (
            <li
              key={key}
              className="rounded-note-lg border-encre/8 flex flex-col gap-5.5 border bg-white p-7 sm:flex-row sm:items-start"
            >
              <Image
                src={photo}
                alt={t(`photoAlt.${key}`)}
                sizes="104px"
                className="size-26 shrink-0 rounded-full object-cover opacity-90"
              />

              <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
                <p className="text-h3 font-poppins text-encre">
                  {t(`items.${key}.name`)}
                </p>
                <p className="text-small text-encre/62">
                  {t(`items.${key}.role`)}
                </p>

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

                <p className="text-small text-encre/62">
                  {t(`items.${key}.languages`)}
                </p>

                {/* The angle this lawyer takes on this article. */}
                <p className="text-small text-encre/62 border-pale-gold w-full border-l-3 py-0.5 pl-3.5">
                  {t.rich(`items.${key}.angle`, {
                    b: (chunks) => (
                      <span className="text-button font-poppins text-encre">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>

                <Button variant="outline" className="py-2.75">
                  {t(`items.${key}.cta`)}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
