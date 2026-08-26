import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles } from "@/lib/actus";

export function Actus() {
  const t = useTranslations("Actus");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Heading and the see-all link share a row; Figma top-aligns the
              link with the overline, and it drops below the heading once the
              two no longer fit. */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <SectionHeading overline={t("overline")} title={t("title")} />
            {/* Reads as a link but does not navigate — no route yet. */}
            <span className="text-button font-poppins text-brique inline-flex items-center gap-2">
              {t("all")}
              <span aria-hidden="true">&rarr;</span>
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {articles.map(({ key, photo }) => (
              <li key={key} className="flex">
                <Card className="flex flex-1 flex-col overflow-hidden">
                  <Image
                    src={photo}
                    alt=""
                    width={1205}
                    height={420}
                    sizes="(min-width: 1024px) 402px, 100vw"
                    className="h-35 w-full shrink-0 object-cover"
                  />
                  <div className="flex flex-col gap-2 px-6 pt-6 pb-7">
                    {/* Poppins SemiBold 16 at 0.18em — the overline style,
                        not Inter. Both frames specify the tracking. */}
                    <p className="text-overline font-poppins uppercase text-brique">
                      {t(`items.${key}.kicker`)}
                    </p>
                    <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                    <p className="text-small text-encre/62">{t(`items.${key}.meta`)}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>

          {/*
            Figma's pagination dots. Decorative for now: the frame supplies
            exactly three articles and all three are on screen at once, so
            there is nothing to page through. Kept because the comp draws it,
            and aria-hidden because it is not a control the reader can use.
            Make it real when there are more than three articles.
          */}
          <div aria-hidden="true" className="flex justify-center gap-3">
            <span className="bg-periwinkle h-2.25 w-7.5 rounded-full" />
            <span className="bg-encre/20 size-2.25 rounded-full" />
            <span className="bg-encre/20 size-2.25 rounded-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
