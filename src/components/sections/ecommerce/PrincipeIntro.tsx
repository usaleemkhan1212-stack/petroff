import Image from "next/image";
import { useTranslations } from "next-intl";
import ParisSkyline from "@/assets/icons/paris-skyline-ecommerce.svg";
import polaroidPhoto from "@/assets/images/smiling-lawyer-square.jpg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** The three paragraphs of the intro column, in Figma's order. */
const paragraphs = ["p1", "p2", "p3"] as const;

/**
 * Figma's `13331:11415`: a **679** intro column beside the **470** dark
 * "Notre principe" card, on white.
 *
 * **That 679 + 470 pair is the site's standard two-column row**, and it always
 * takes no gap: 679 + 470 is 1149 inside the container's 1245, which
 * `justify-between` spaces by exactly 96. Six other sections are built this way
 * — Le Cabinet's Domaines and Secteurs, the personal page's En bref, and three
 * on the service page. This one had been built 610 + 24 + 611, which is the
 * only place on the site that pair was wrong.
 *
 * It holds together at `xl` only; below that it stacks in DOM order —
 * illustration, headline, paragraphs, CTA, then the card.
 *
 * The illustration is a **second Paris skyline**, not the Bibliotheque hero's:
 * same 450x414 panel and the same two stars, but a narrower Eiffel tower, five
 * Haussmann blocks against that one's three, and three tower groups. It is
 * composed into one `paris-skyline-ecommerce.svg` at each piece's own
 * mask-position, exactly as `paris-skyline.svg` is.
 */
export function PrincipeIntro() {
  const t = useTranslations("EcommercePage.principe");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between xl:gap-0">
          {/* Figma's `intro`: right-aligned at xl so the panel's right edge
              closes the column; left-aligned once the row stacks. */}
          <div className="flex flex-col items-start gap-9 xl:w-169.75 xl:shrink-0 xl:items-end">
            {/*
              537.5 wide — the 450 panel plus the polaroid overhanging its left
              edge. It needs a 601px viewport to fit, so it appears from `sm`.
              Ornament coordinates below are the sanctioned literal-px case.
            */}
            <div className="relative hidden h-103.5 w-[537.5px] shrink-0 sm:block">
              <div className="bg-lilas-2 absolute top-0 right-0 h-103.5 w-112.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
                <ParisSkyline width={450} height={414} aria-hidden="true" />
              </div>

              {/*
                Rotated -8deg. Figma's 0/121 is the *bounding box* of the
                rotated frame; CSS rotates about the centre, so the
                untransformed 150x202 card sits at 13.33/130.46 for its
                bounding box to land there.
              */}
              <figure className="absolute top-[130.46px] left-[13.33px] h-[202px] w-[150px] -rotate-8 rounded-tl-[60px] rounded-tr-[8px] rounded-br-[30px] rounded-bl-[30px] bg-white drop-shadow-[0px_16px_18px_rgba(18,42,76,0.16)]">
                <div className="absolute top-[12.31px] left-[13.42px] size-30 overflow-hidden rounded-tl-[59.85px] rounded-tr-[3px] rounded-br-[29.93px] rounded-bl-[17.96px]">
                  <Image
                    src={polaroidPhoto}
                    alt=""
                    sizes="120px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="text-button font-poppins text-encre absolute top-[142px] left-1/2 w-[126px] -translate-x-1/2 text-center">
                  {/* Designed line break — it wraps after "des" without it. */}
                  {t.rich("polaroid", { br: () => <br /> })}
                </figcaption>
              </figure>
            </div>

            <div className="flex w-full flex-col items-start gap-9">
              <div className="flex flex-col gap-4">
                <p className="text-overline font-poppins text-brique uppercase">
                  {t("overline")}
                </p>
                <h2 className="text-h2 text-encre">{t("title")}</h2>
              </div>

              <div className="flex flex-col gap-4">
                {paragraphs.map((key) => (
                  <p key={key} className="text-body text-encre/62">
                    {t(key)}
                  </p>
                ))}
              </div>

              {/* Inert, like every CTA on the site until its route exists. */}
              <ConsultButton size="lg">{t("cta")}</ConsultButton>
            </div>
          </div>

          {/*
            Figma's `principe`: a flat 414 tall beside the intro column.

            **Sticky at `xl`.** The intro column is 1005 tall against this
            card's 414, so it pins at 24px and rides the rest of that column
            past. `self-start` is what makes that possible — the row is
            `items-start`, so the card keeps its own height rather than
            stretching to the row and leaving nothing to stick. Below `xl` the
            two stack, so it goes back to static.
          */}
          <div className="bg-encre flex flex-col items-start gap-6 rounded-[22px] p-6 sm:p-8 lg:p-12 xl:sticky xl:top-6 xl:h-103.5 xl:w-117.5 xl:shrink-0 xl:self-start">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <p className="text-overline font-poppins text-gold uppercase">
                  {t("card.overline")}
                </p>
                <h3 className="text-price text-white">{t("card.title")}</h3>
              </div>
              <p className="text-body text-white/70">{t("card.body")}</p>
            </div>

            <Button variant="gold" size="lg">
              {t("card.cta")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
