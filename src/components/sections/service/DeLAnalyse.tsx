import Image from "next/image";
import { useTranslations } from "next-intl";
import ParisSkyline from "@/assets/icons/paris-skyline.svg";
import PenNib from "@/assets/icons/pen-nib.svg";
import portrait from "@/assets/images/lawyer-portrait-polaroid.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Figma `13495:28614` — "De l'analyse à la résolution".
 *
 * **Its layer name is `FAQ` and it is not one**: a text block beside the Paris
 * skyline. Its node id is in the `13495:` range against the frame's `13445:`,
 * so it was added after the rest of the page.
 *
 * The stage is the Bibliotheque hero's illustration reused wholesale — the
 * same 511 box, the same 450x414 panel, the same composed `paris-skyline.svg`,
 * and the polaroid at the same 13.36/131.46. It differs in exactly two things:
 * the panel is **pale blue** here where that one is lilas-2, and the print is
 * the square `lawyer-portrait-polaroid.jpg` crop. Kept as its own markup for
 * now, matching the per-page `HeroOrnaments` and `FaqIllustration` precedent.
 */
export function DeLAnalyse() {
  const t = useTranslations("ServicePage.analyse");

  return (
    <section className="bg-lilas-2">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-12">
          <div className="flex min-w-0 flex-col gap-6 xl:w-169.75">
            <div className="flex flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
            </div>

            {/* Full-strength encre and 20/1.55, not the usual encre/62 body. */}
            <p className="text-lead font-inter text-encre">{t("lead")}</p>

            <div className="flex items-center gap-4">
              {/* pen-nib at its fourth box on the site — 24x36 here against
                  110x153 native. Exact because the glyph carries no strokes. */}
              <PenNib
                aria-hidden="true"
                width={24}
                height={36}
                className="shrink-0"
              />
              <p className="max-w-137.5">
                <span className="text-small-strong text-encre">
                  {t("quote")}
                </span>
                <br />
                <span className="text-small text-encre/62">
                  {t("attribution")}
                </span>
              </p>
            </div>

            <Button size="lg" className="self-start">
              {t("cta")}
            </Button>
          </div>

          <div
            aria-hidden="true"
            className="relative hidden h-103.5 w-127.75 shrink-0 xl:block"
          >
            <div className="bg-pale-blue absolute top-0 right-0 h-103.5 w-112.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
              <ParisSkyline width={450} height={414} />
            </div>

            {/* Figma's 0/122 is the rotated frame's bounding box; CSS rotates
                about the centre, so the untransformed card sits at
                13.36/131.46 — the identical correction the Bibliotheque hero
                polaroid carries, at the identical offsets. */}
            <figure className="absolute top-[131.46px] left-[13.36px] h-[202px] w-[150px] -rotate-8 rounded-tl-[60px] rounded-tr-[8px] rounded-br-[30px] rounded-bl-[30px] bg-white drop-shadow-[0px_16px_18px_rgba(18,42,76,0.16)]">
              <div className="absolute top-[12.31px] left-[13.42px] size-30 overflow-hidden rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px]">
                <Image
                  src={portrait}
                  alt=""
                  sizes="120px"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="text-button font-poppins text-encre absolute top-[142px] left-1/2 w-31.5 -translate-x-1/2 text-center">
                {t.rich("polaroid", { br: () => <br /> })}
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
