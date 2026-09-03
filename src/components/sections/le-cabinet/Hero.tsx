import Image from "next/image";
import { useTranslations } from "next-intl";
import PenNib from "@/assets/icons/pen-nib.svg";
import SealRibbon from "@/assets/icons/seal-ribbon.svg";
import photo from "@/assets/images/place-concorde.jpg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { heroStats } from "@/lib/le-cabinet";

/**
 * Figma `13689:21389` — a 62px lilas crumb over a 754 `HeroFiche`, which is the
 * article hero's construction: a 1245 grid at y=56 whose two rows sit on a 22px
 * gap — a 679 copy column beside a 470x548 photo stage, then a ruled stat band.
 *
 * Its stage is **553** wide because Figma sizes that group by its overhanging
 * children (the badge's 108.47 box at 430.53) rather than by the photo, so the
 * photo sits 28.53px in. Same arithmetic as both article heroes.
 *
 * **Two of this frame's own boxes are oversized, so judge it by band positions
 * rather than by height.** The `HeroFiche` is a fixed 754 with the grid
 * *absolutely* placed at top 56, and that grid's content needs only 724.5; and
 * the whole section declares 853 where its two children sum to 816. The build
 * reproduces the offsets and takes a real bottom padding, which lands it
 * within 3 of the comp's own content.
 *
 * **Both its glyphs reuse.** The verification seal is `seal-ribbon.svg` at an
 * exact 1.2x — its stroke stays 1.52174 in both, the documented 0.3px
 * over-thickening — and the hero card's is `pen-nib.svg` at a **fifth** box,
 * 27x40, a non-uniform stretch that is exact because that glyph carries no
 * strokes at all.
 */
export function Hero() {
  const t = useTranslations("CabinetPage.hero");

  return (
    <>
      <section className="bg-lilas">
        <Container className="pt-5.5 pb-4">
          <p className="text-small text-encre/62">
            {t("crumb")}
            <span className="text-button font-poppins text-encre">
              {t("crumbCurrent")}
            </span>
          </p>
        </Container>
      </section>

      <section className="bg-lilas overflow-hidden">
        <Container className="pt-14 pb-12 lg:pb-8">
          <div className="flex flex-col gap-5.5">
            <div className="flex flex-col gap-9 xl:flex-row xl:items-start">
              <div className="flex min-w-0 flex-col gap-6 xl:w-169.75 xl:shrink-0">
                <div className="flex flex-col gap-4">
                  <p className="text-overline font-poppins text-brique uppercase">
                    {t("overline")}
                  </p>
                  {/*
                    The marker runs under "Le droit" and the title continues on
                    the same line, so a positioned bar would paint over the
                    words that follow. The `h1` takes its own stacking context
                    and the bar goes behind every glyph — the same pair the
                    Contentieux, Contrats and Immobilier heroes need.
                  */}
                  <h1 className="text-article-title text-encre relative z-0">
                    {t.rich("title", {
                      hl: (chunks) => (
                        <span className="relative">
                          <span
                            aria-hidden="true"
                            className="bg-pale-gold absolute bottom-[0.213em] left-0 -z-10 h-[0.3261em] w-[3.739em] rounded-[4px]"
                          />
                          {chunks}
                        </span>
                      ),
                    })}
                  </h1>
                </div>

                <p className="text-lead text-encre/62">{t("lead")}</p>

                <div className="flex flex-wrap items-center gap-2.25">
                  <ConsultButton variant="gold" size="lg">
                    {t("ctaPrimary")}
                  </ConsultButton>
                  {/* An anchor rather than a Button inside one — `buttonClasses`
                      exists so a link can wear the same pill. */}
                  <MaybeLink
                    href="/expertises"
                    className={buttonClasses({ variant: "outline", size: "lg" })}
                  >
                    {t("ctaSecondary")}
                  </MaybeLink>
                </div>

                <div className="flex items-center gap-4">
                  <SealRibbon
                    aria-hidden="true"
                    width={22.957}
                    height={36}
                    className="shrink-0"
                  />
                  {/* Figma fixes this line at 550, which is what breaks it after
                      "814433470 ·" rather than a word later. */}
                  <p className="text-small text-encre/62 max-w-137.5 min-w-0">
                    {t.rich("verif", {
                      s: (chunks) => (
                        <span className="text-small-strong text-encre">{chunks}</span>
                      ),
                    })}
                  </p>
                </div>
              </div>

              {/* 553, not 470: Figma sizes the stage by the badge's overhang. */}
              <div className="relative hidden w-138.25 shrink-0 xl:block">
                <Image
                  src={photo}
                  alt={t("imageAlt")}
                  sizes="470px"
                  className="ml-[28.53px] h-137 w-117.5 rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px] object-cover"
                />

                <figure className="absolute top-[443px] left-0 flex items-center gap-2 rounded-[16px] bg-white p-3 shadow-[0px_14.667px_36.667px_0px_rgba(18,42,76,0.12)]">
                  <PenNib
                    aria-hidden="true"
                    width={27}
                    height={40}
                    className="shrink-0"
                  />
                  <figcaption className="text-small whitespace-nowrap">
                    <span className="text-encre block">{t("card.line1")}</span>
                    <span className="text-small-strong text-periwinkle block">
                      {t("card.line2")}
                    </span>
                  </figcaption>
                </figure>

                {/*
                  Figma's 108.47 box is the *rotated* bounding box of a 97.333
                  disc; placing that box and centring the disc inside it avoids
                  the centre-of-rotation arithmetic by hand.
                */}
                <div className="absolute top-[59px] left-[430.53px] flex size-[108.47px] items-center justify-center">
                  <p className="border-lilas bg-encre flex size-[97.333px] rotate-7 flex-col items-center justify-center rounded-full border-2 text-center">
                    <span className="text-h4 font-poppins text-gold block leading-[1.35]">
                      {t("badge.years")}
                    </span>
                    <span className="block text-[14px] leading-[1.2] font-semibold text-white">
                      {t("badge.line1")}
                    </span>
                    <span className="block text-[14px] leading-[1.2] font-semibold text-white">
                      {t("badge.line2")}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Figma's second grid row: a `stone` rule, 16 above three 280
                columns on a 20px gap. */}
            <dl className="border-stone flex flex-col gap-6 border-t pt-4 sm:flex-row sm:gap-5">
              {heroStats.map((key) => (
                <div key={key} className="min-w-0 sm:w-70">
                  <dt className="text-price font-poppins text-encre">
                    {t(`stats.${key}.value`)}
                  </dt>
                  <dd className="text-small text-encre/62 sm:max-w-65">
                    {t(`stats.${key}.note`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
    </>
  );
}
