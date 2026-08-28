import Image from "next/image";
import { useTranslations } from "next-intl";
import Courthouse from "@/assets/icons/courthouse.svg";
import SealRibbon from "@/assets/icons/seal-ribbon.svg";
import photo from "@/assets/images/mariela-portrait-hero.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** The three stat columns, in Figma's order. */
const stats = ["experience", "barreau", "langues"] as const;

/**
 * Figma `13495:30072` — the personal page's hero.
 *
 * Two bands: a 62px lilas crumb, then the `HeroFiche`. Inside it Figma centres
 * a 1245 grid at **y=56** holding two rows on a 30px gap — the 414 hero row and
 * a 123 stat band — and closes the fiche 55 below.
 *
 * **The row takes no gap.** 692 of copy plus the 511 stage is 1203 inside the
 * 1245 container, which `justify-between` spaces by exactly 42 — the same
 * arithmetic the Bibliotheque hero uses.
 */
export function Hero() {
  const t = useTranslations("PersonalPage.hero");

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

      <Container className="pt-14 pb-13.75">
        <div className="flex flex-col gap-7.5">
          <div className="flex flex-col gap-9 xl:flex-row xl:items-center xl:justify-between xl:gap-0">
            <div className="flex min-w-0 flex-col gap-8.75 xl:w-173">
              <div className="flex flex-col gap-4.25">
                <p className="text-overline font-poppins text-brique uppercase">
                  {t("overline")}
                </p>
                {/* Poppins Bold 68 on a 1.06 line box at -0.01em — Figma's own
                    Display H1, so `text-display` matches exactly. */}
                <h1 className="text-display text-encre font-poppins">
                  {t("name")}
                </h1>
                <p className="text-h3 font-poppins text-periwinkle">
                  {t("role")}
                </p>
                <p className="text-body text-encre/62">{t("lead")}</p>
              </div>

              <div className="flex flex-col gap-7.5 xl:w-160">
                {/* 9px, not the usual 16 — Figma wraps the pair in its own row,
                    as the service page hero does. */}
                <div className="flex flex-wrap items-center gap-2.25">
                  <Button
                    size="lg"
                    variant="gold"
                    className="whitespace-normal sm:whitespace-nowrap"
                  >
                    {t("ctaPrimary")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="whitespace-normal sm:whitespace-nowrap"
                  >
                    {t("phone")}
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <SealRibbon
                    aria-hidden="true"
                    width={22.957}
                    height={36}
                    className="shrink-0"
                  />
                  <p className="text-small text-encre/62 max-w-137.5">
                    <span className="text-small-strong text-encre">
                      {t("firm")}
                    </span>
                    {t("firmDetails")}
                  </p>
                </div>
              </div>
            </div>

            {/*
              The 511 stage. Figma stacks the photo and the card in one grid
              cell, each with its own offset from the stage's top left: the
              photo 61 in, the card flush left at 309 down.
            */}
            <div className="relative hidden h-103.5 w-[511px] shrink-0 xl:block">
              <div className="absolute top-0 left-[61px] h-103.5 w-112.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
                <Image
                  src={photo}
                  alt={t("imageAlt")}
                  sizes="450px"
                  className="h-full w-full object-cover"
                />
              </div>

              <figure className="absolute top-[309px] left-0 flex w-[213.333px] items-center gap-2 rounded-[16px] bg-white p-3 shadow-[0px_14.667px_36.667px_0px_rgba(18,42,76,0.12)]">
                {/* courthouse.svg at a fourth box — 55x40 against its 250x185
                    native. Exact because the glyph carries no strokes. */}
                <Courthouse
                  aria-hidden="true"
                  width={55}
                  height={40}
                  className="shrink-0"
                />
                <figcaption className="min-w-0 flex-1">
                  <span className="text-small text-encre block">
                    {t("card.line1")}
                  </span>
                  <span className="text-small-strong text-periwinkle block">
                    {t("card.line2")}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/*
            A fixed 123 band on a stone rule. Figma pads it 16 at the top and
            centres the three 82px columns in what remains, which puts them at
            y=29. Each label reserves two lines — the comp types a zero-width
            space on the second and third to hold that height.
          */}
          <div className="border-stone flex flex-col gap-8 border-t pt-4 lg:h-[123px] lg:flex-row lg:items-center lg:gap-5">
            {stats.map((key) => (
              <div key={key} className="flex flex-col lg:w-70">
                <p className="text-price font-poppins text-encre">
                  {t(`stats.${key}.value`)}
                </p>
                <p className="text-small text-encre/62 lg:min-h-12 lg:w-65">
                  {t(`stats.${key}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
