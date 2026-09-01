import Image from "next/image";
import { useTranslations } from "next-intl";
import heroPhoto from "@/assets/images/reading-outdoors-tall.jpg";
import { Container } from "@/components/ui/Container";
import { heroArticles } from "@/lib/article";
import { ArticleActions } from "@/components/sections/article/ArticleActions";

const pill = "text-small-strong text-encre rounded-full px-3 py-1.25";

export function Hero() {
  const t = useTranslations("ArticlePage.hero");

  return (
    <section className="bg-lilas">
      {/* The 62px crumb band Figma draws above the hero proper. */}
      <Container className="pt-5.5 pb-4">
        <p className="text-small text-encre/62">
          {t("crumb")}
          <span className="text-button font-poppins text-encre">
            {t("crumbCurrent")}
          </span>
        </p>
      </Container>

      <Container className="py-8 lg:py-14">
        {/*
          Figma's row: the copy column flexing against a 553px image stage
          inside the 1245 band with a 36px gap, which leaves the copy 656 wide.
          Centred, not top-aligned.
        */}
        <div className="flex items-center gap-9">
          <div className="flex min-w-0 flex-1 flex-col gap-5.5">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>

            {/*
              46/52 rather than the fluid text-display: this is an article
              title inside a 656px measure, not a page hero. The pale-gold
              marker is a fixed 12.17em bar rather than a highlighted chunk, so
              it needs max-w-full: below ~500px it would otherwise be wider
              than the column and push the whole page sideways.
            */}
            <h1 className="text-article-title text-encre font-poppins relative">
              <span
                aria-hidden="true"
                className="bg-pale-gold absolute top-[0.591em] left-0 h-[0.326em] w-[12.174em] max-w-full rounded"
              />
              <span className="relative">{t("title")}</span>
            </h1>

            <p className="text-lead font-inter text-encre/62">{t("lead")}</p>

            <div className="flex flex-wrap items-center gap-2.25">
              <span className={`${pill} bg-pale-periwinkle`}>{t("domain")}</span>
              <span className={`${pill} bg-pale-blue`}>{t("type")}</span>
              <span className="text-small text-encre/62">{t("readingTime")}</span>
            </div>

            <ArticleActions copyLabel={t("copyLink")} printLabel={t("print")} />
          </div>

          {/*
            The photo stage. Figma sizes this group by its outermost children
            rather than by the photo: the card overhangs to the left and the
            badge to the right, so the 470px photo sits 42.5px in. Its radii
            are the same asymmetric set the Bibliotheque hero and the home
            Cabinet photo use, and it carries no border since the colour pass.

            Shown from xl only — 656 of copy plus 553 of stage needs 1245,
            which the container cannot give below that.
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

            {/*
              `13680:21182` — the designer replaced the old two-thirds-scaled
              instance with a real one: 260 wide with Figma's own
              "Petroff/Body 18 strong" title over Inter 14/18, where it had 213.3
              and 14.667/9.333px type well under the design system's 16px floor.
              Only its 16.667 padding, 5.333 gap and shadow still carry the old
              scale, and it sits at 401, not 428. It takes no height of its own:
              16.667 + 27 + 5.333 + 54 + 16.667 is Figma's 119.667 exactly.
            */}
            <figure className="absolute top-[401px] left-0 flex w-[260px] flex-col gap-[5.333px] rounded-[16px] bg-white p-[16.667px] shadow-[0px_14.667px_36.667px_0px_rgba(18,42,76,0.12)]">
              <figcaption className="text-body-strong text-encre">
                {t("card.title")}
              </figcaption>
              <p className="text-encre/62 font-inter text-[14px] leading-[18px]">
                {t("card.body")}
              </p>
            </figure>

            {/*
              The seal. Figma's 108.47 box is the rotated bounding box of a
              97.333 circle, and CSS rotates about the centre, so the
              untransformed box sits at 450.1/64.57 — the same correction the
              Bibliotheque polaroid and the old verification chip needed.
            */}
            <div
              aria-hidden="true"
              className="border-lilas bg-encre absolute top-[64.57px] left-[450.1px] flex size-[97.333px] rotate-7 flex-col items-center justify-center rounded-full border-2 text-center"
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

        {/* Three code articles, on a stone rule. */}
        <ul className="border-stone mt-5.5 flex flex-wrap gap-5 border-t pt-4">
          {heroArticles.map((key) => (
            <li key={key} className="w-70">
              <p className="text-encre font-poppins">
                {/* Periwinkle since the colour pass; it was gold before. */}
                <span className="text-h3 text-periwinkle">{t("articlePrefix")}</span>
                <span className="text-price">{t(`articles.${key}.number`)}</span>
              </p>
              <p className="text-small text-encre/62 max-w-65">
                {t(`articles.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>

        {/* Figma closes the hero with a second, fainter rule. */}
        <div aria-hidden="true" className="bg-encre/12 mt-5.5 h-px w-full" />
      </Container>
    </section>
  );
}
