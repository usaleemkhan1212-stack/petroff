import Image from "next/image";
import { useTranslations } from "next-intl";
import SealRibbon from "@/assets/icons/seal-ribbon.svg";
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

      <Container className="pt-14 pb-3.5">
        {/*
          No gap: Figma's row is the copy column flexing against a 504px image
          stage inside the 1245 band, which leaves the copy 741 wide. A gap-12
          takes it to 693 and pushes the title onto a third line — the same
          trap the Bibliotheque hero hit.
        */}
        <div className="flex items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-5.5">
            <p className="text-overline font-poppins text-brique">{t("overline")}</p>

            {/*
              46/52 rather than the fluid text-display: this is an article
              title inside a 715px measure, not a page hero. The pale-gold
              marker sits behind the first line, as in the other heroes — but
              it is a fixed 12.17em bar rather than a highlighted chunk, so it
              needs max-w-full: below ~500px it is wider than the column and
              pushed the whole page to 410.
            */}
            <h1 className="text-article-title text-encre font-poppins relative">
              <span
                aria-hidden="true"
                className="bg-pale-gold absolute top-[0.591em] left-0 h-[0.326em] w-[12.174em] max-w-full rounded"
              />
              <span className="relative">{t("title")}</span>
            </h1>

            <p className="text-lead font-inter text-encre/62 max-w-179">
              {t("lead")}
            </p>

            <div className="flex flex-wrap items-center gap-2.25">
              <span className={`${pill} bg-pale-periwinkle`}>{t("domain")}</span>
              <span className={`${pill} bg-pale-blue`}>{t("type")}</span>
              <span className="text-small text-encre/62">{t("readingTime")}</span>
            </div>

            <ArticleActions copyLabel={t("copyLink")} printLabel={t("print")} />
          </div>

          {/* The photo panel takes the same asymmetric radii as the
              Bibliotheque hero's skyline, here with a 2px gold border. */}
          <div className="relative hidden h-103.5 w-126 shrink-0 xl:block">
            <div className="border-gold absolute top-0 right-0 h-103.5 w-112.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px] border-2">
              <Image
                src={heroPhoto}
                alt={t("imageAlt")}
                sizes="450px"
                className="h-full w-full object-cover"
              />
            </div>

            {/*
              Verification chip, leaning off the panel's lower left. Figma's
              0/306 is the rotated frame's bounding box; CSS rotates about the
              centre, so the untransformed box sits at 2.6/313 — the same
              correction the Bibliotheque hero's polaroid needed.
            */}
            <figure className="absolute top-[313px] left-[2.6px] flex -rotate-5 items-center gap-3 rounded-field bg-white px-4 py-3 shadow-[0px_16px_36px_0px_rgba(18,42,76,0.16)]">
              <SealRibbon aria-hidden="true" width={19.13} height={30} />
              <figcaption className="flex flex-col">
                <span className="text-small text-encre/62">
                  {t("verifiedLabel")}
                </span>
                <span className="text-button font-poppins text-encre">
                  {t("verifiedDate")}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Three code articles, on a stone rule. */}
        <ul className="border-stone mt-5.5 flex flex-wrap gap-5 border-t pt-4">
          {heroArticles.map((key) => (
            <li key={key} className="w-70">
              <p className="text-encre font-poppins">
                <span className="text-h3 text-gold">{t("articlePrefix")}</span>
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
