import { ConsultTrigger } from "@/components/consultation/ConsultButton";
import Image from "next/image";
import { useTranslations } from "next-intl";
import heroPhoto from "@/assets/images/ecommerce-lawyer.jpg";
import { Container } from "@/components/ui/Container";

/** The trust strip's four claims and the five stat columns, in Figma's order. */
const trustItems = ["t1", "t2", "t3", "t4"] as const;
const stats = ["retractation", "langues", "analyse", "clic", "secret"] as const;

/**
 * Figma's `13331:10417`: the e-commerce page's opening — a breadcrumb, the
 * headline row, a full-bleed trust strip and a five-column stat band.
 *
 * All four live in one Figma frame and one `<section>` here, so the section
 * measures against the frame's 1104 directly. The trust strip is lilas-2 and
 * bleeds the full width, so it sits outside `Container` with its own inside.
 *
 * The photo stage repeats the article hero's construction: Figma sizes the
 * group by its overhanging children rather than by the photo, so the 470px
 * photo sits 42.53px in, with the card overhanging left and the seal right.
 */
export function Hero() {
  const t = useTranslations("EcommercePage.hero");

  return (
    <section className="bg-lilas">
      {/* The 62px crumb band. */}
      <Container className="pt-5.5 pb-4">
        <p className="text-small text-encre/62">
          {t("crumb")}
          <span className="text-button font-poppins text-encre">
            {t("crumbCurrent")}
          </span>
        </p>
      </Container>

      <Container className="pt-8 pb-8 lg:pt-14 lg:pb-12">
        <div className="flex items-center gap-9">
          <div className="flex min-w-0 flex-1 flex-col gap-5.5">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>

            {/*
              46/52, the article title size. The pale-gold marker underlines
              "e-commerce" on the first line, so it is pinned 6.098em in.
              **Shown from `sm` only**: an offset bar cannot be held inside the
              column by `max-w-full` — that caps the width, not the left edge,
              so at 375 it ran to 431 and pushed the page sideways. Below `sm`
              the title wraps after "Avocats du" anyway, which would leave the
              bar under the wrong word.
            */}
            <h1 className="text-article-title text-encre font-poppins relative">
              <span
                aria-hidden="true"
                className="bg-pale-gold absolute top-[0.754em] left-[6.098em] hidden h-[0.326em] w-[6.739em] rounded sm:block"
              />
              <span className="relative">{t("title")}</span>
            </h1>

            <p className="text-lead font-inter text-encre/62">{t("lead")}</p>

            <div className="flex flex-wrap items-center gap-2.25">
              {/* Inert, like every CTA on the site until a route exists. */}
              <ConsultTrigger className="text-button font-poppins bg-gold rounded-full px-7 py-4 text-white">
                {t("cta")}
              </ConsultTrigger>
              <p className="text-small text-encre/62">{t("ctaNote")}</p>
            </div>
          </div>

          {/* Shown from xl: 658 of copy plus 551 of stage needs the full 1245. */}
          <div className="relative hidden h-137 w-[551px] shrink-0 xl:block">
            <div className="absolute top-0 left-[40.53px] h-137 w-117.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
              <Image
                src={heroPhoto}
                alt={t("imageAlt")}
                sizes="470px"
                className="h-full w-full object-cover"
              />
            </div>

            {/*
              **Its type is full size now.** It used to be two thirds of a 320px
              component — 213.3 wide, with 14.667 and 9.333px type — and the
              frame has grown it to 260 with a real `text-body-strong` title
              (Inter SemiBold 18/1.5) over Inter 14/18. Only its 16.667px
              padding, 5.333 gap and 36.667 shadow still carry the old scale.
            */}
            <figure className="absolute top-[399px] left-0 flex w-[260px] flex-col gap-[5.333px] rounded-[16px] bg-white p-[16.667px] shadow-[0px_14.667px_36.667px_0px_rgba(18,42,76,0.12)]">
              <figcaption className="text-body-strong text-encre">
                {t("card.title")}
              </figcaption>
              <p className="text-encre/62 font-inter text-[14px] leading-[18px]">
                {t("card.body")}
              </p>
            </figure>

            {/* Figma's 108.47 box is the rotated bounding box of a 97.333
                circle; CSS rotates about the centre, so the untransformed box
                sits at 448.1/64.57 — the box itself is at 442.53. */}
            <div
              aria-hidden="true"
              className="border-lilas bg-encre absolute top-[64.57px] left-[448.1px] flex size-[97.333px] rotate-7 flex-col items-center justify-center rounded-full border-2 text-center"
            >
              <span className="text-gold font-poppins text-[18px] leading-[1.35] font-bold">
                {t("badge.years")}
              </span>
              <span className="font-inter text-[14px] leading-[1.2] font-semibold text-white">
                {t("badge.line1")}
              </span>
              <span className="font-inter text-[14px] leading-[1.2] font-semibold text-white">
                {t("badge.line2")}
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/*
        Full-bleed trust strip. **Not inside `Container`**: Figma's four claims
        need 1430px and its own frame is padded to 1245, so the row overflows
        that padding and centres across the full 1920. Capping it at the
        container width wrapped it to two lines and made the strip 136 tall
        against the comp's 100.
      */}
      <div className="bg-lilas-2 px-5 py-6 sm:px-8 lg:py-9.5">
        <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
          {trustItems.map((key) => (
            <li key={key} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="bg-gold size-2.5 shrink-0 rounded-full"
              />
              <span className="text-small text-encre">{t(`trust.${key}`)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Five figures, each with its legal reference. 5 -> 2 -> 1. */}
      <Container className="py-10 lg:py-16">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((key) => (
            <div key={key} className="flex flex-col gap-2">
              <dt className="text-stat font-poppins text-encre">
                {t(`stats.${key}.value`)}
              </dt>
              <dd className="text-small text-encre/62">{t(`stats.${key}.label`)}</dd>
              {/* Inter SemiBold 16/1.45 in periwinkle — it was the tracked
                  Poppins overline, which wrapped the longest citation onto a
                  second line and made the band 19px tall. */}
              <dd className="text-small-strong text-periwinkle">
                {t(`stats.${key}.ref`)}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
