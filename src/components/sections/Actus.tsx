import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { CardCarousel } from "@/components/ui/CardCarousel";
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

          {/* The row's own 32/48 column gap moves onto the dots, since the
              track and the dot row are one child now. */}
          <CardCarousel
            label={t("carouselLabel")}
            count={articles.length}
            trackClassName="gap-5"
            dotsClassName="mt-8 lg:mt-12"
          >
            {articles.map(({ key, photo }) => (
              <li
                key={key}
                className="flex min-w-0 shrink-0 basis-full snap-start sm:basis-[calc((100%-20px)/2)] lg:basis-[calc((100%-40px)/3)]"
              >
                <Card className="flex flex-1 flex-col overflow-hidden hover:shadow-[0px_14px_34px_rgba(0,0,0,0.1)]">
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
                    <p className="text-overline font-poppins text-brique uppercase">
                      {t(`items.${key}.kicker`)}
                    </p>
                    <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                    <p className="text-small text-encre/62">{t(`items.${key}.meta`)}</p>
                  </div>
                </Card>
              </li>
            ))}
          </CardCarousel>
        </div>
      </Container>
    </section>
  );
}
