import Image from "next/image";
import { useTranslations } from "next-intl";
import heroPhoto from "@/assets/images/bench-laptop-portrait.jpg";
import { HeroActions } from "@/components/sections/new-article/HeroActions";
import { Container } from "@/components/ui/Container";

/** The three Code civil articles the hero closes on, in Figma's order. */
const articles = ["a1366", "a1367", "a1373"] as const;

/** Both pills are 12/5 on a 16px SemiBold label; only the ground differs. */
const pill = "text-small-strong text-encre rounded-full px-3 py-1.25";

/**
 * Figma's `13318:2451`, derived from the node rather than ported.
 *
 * Two bands: a 62px lilas crumb, then the 828px `HeroFiche`. Inside that,
 * Figma centres a 1245 grid at y=40 whose three rows — the 548 hero row, the
 * code-articles band and a 1px rule — sit on a **22px** row gap, and closes the
 * band 72 below. That asymmetric 40/72 is easy to miss: with a symmetric pad
 * every element in the body sits 16px low while the section still measures 890.
 *
 * The copy column and the 553 photo stage are `items-center` on a 36px gap.
 */
export function Hero() {
  const t = useTranslations("ArticlePage.hero");

  return (
    <section className="bg-lilas">
      <Container className="pt-5.5 pb-4">
        <p className="text-small text-encre/62">
          {t("crumb")}
          <span className="text-button font-poppins text-encre">
            {t("crumbCurrent")}
          </span>
        </p>
      </Container>

      <Container className="overflow-hidden py-8 lg:pt-10 lg:pb-18">
        <div className="flex flex-col gap-5.5">
          <div className="flex flex-col items-center gap-9 xl:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-5.5">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>

              {/*
                Poppins Bold 46 on a fixed 52 line box. The pale-gold marker is
                a 560x15 bar Figma pins at HeroFiche y=148 — 37px below the
                title box, so it underlines the foot of line one. Carried in em
                against the title rather than as a second absolute element, and
                capped at the column: below ~500px a 12.17em bar is wider than
                its measure and would push the page sideways.
              */}
              <h1 className="text-article-title text-encre font-poppins relative">
                <span
                  aria-hidden="true"
                  className="bg-pale-gold absolute top-[0.804em] left-0 h-[0.326em] w-[12.174em] max-w-full rounded"
                />
                <span className="relative">{t("title")}</span>
              </h1>

              <p className="text-lead font-inter text-encre/62">{t("lead")}</p>

              <div className="flex flex-wrap items-center gap-2.25">
                <span className={`${pill} bg-pale-periwinkle`}>{t("domain")}</span>
                <span className={`${pill} bg-pale-blue`}>{t("type")}</span>
                <span className="text-small text-encre/62">{t("readingTime")}</span>
              </div>

              <HeroActions copyLabel={t("copyLink")} printLabel={t("print")} />
            </div>

            {/*
              The 553 stage. Figma stacks its three children in one grid cell,
              so each carries its own offset from the stage's top left: the
              photo 42.53 in, the card flush left at 428 down, and the badge's
              108.47 box at 444.53/59 with the rotated 97.333 disc centred in
              it. Letting that box do the centring is what avoids the
              rotate-about-the-centre arithmetic entirely.

              From xl: 656 of copy plus 553 of stage needs the full 1245.
            */}
            <div className="relative hidden h-137 w-[553px] shrink-0 xl:block">
              <div className="absolute top-0 left-[42.53px] h-137 w-117.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
                <Image
                  src={heroPhoto}
                  alt={t("imageAlt")}
                  sizes="470px"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Two thirds of a 320px component, hence the 14.667/9.333px
                  type and 16.667 padding — none of them on the spacing scale. */}
              <figure className="absolute top-[428px] left-0 flex h-[98px] w-[213.333px] flex-col gap-[5.333px] rounded-[16px] bg-white p-[16.667px] shadow-[0px_14.667px_36.667px_0px_rgba(18,42,76,0.12)]">
                <figcaption className="text-encre font-poppins text-[14.667px] leading-[17.333px] font-semibold">
                  {t("card.title")}
                </figcaption>
                <p className="text-encre/62 font-inter text-[9.333px] leading-[14px]">
                  {t("card.body")}
                </p>
              </figure>

              <div
                aria-hidden="true"
                className="absolute top-[59px] left-[444.53px] flex size-[108.47px] items-center justify-center"
              >
                <div className="border-lilas bg-encre flex size-[97.333px] rotate-7 flex-col items-center justify-center rounded-full border-2 text-center">
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
          </div>

          {/* Three Code civil articles on a stone rule, 20px apart. */}
          <ul className="border-stone flex flex-wrap items-center gap-5 border-t pt-4">
            {articles.map((key) => (
              <li key={key} className="w-70">
                <p className="text-encre font-poppins">
                  <span className="text-h3 text-periwinkle">{t("articlePrefix")} </span>
                  <span className="text-price">{t(`articles.${key}.number`)}</span>
                </p>
                <p className="text-small text-encre/62 max-w-65">
                  {t(`articles.${key}.description`)}
                </p>
              </li>
            ))}
          </ul>

          {/* Figma closes the band with a fainter rule of its own. */}
          <div aria-hidden="true" className="bg-encre/12 h-px w-full" />
        </div>
      </Container>
    </section>
  );
}
