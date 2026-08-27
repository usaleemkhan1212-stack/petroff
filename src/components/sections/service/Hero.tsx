import Image from "next/image";
import { useTranslations } from "next-intl";
import CalendarDotsBold from "@/assets/icons/calendar-dots-bold.svg";
import RosetteRibbon from "@/assets/icons/seal-ribbon.svg";
import heroPhoto from "@/assets/images/litige-associes-hero.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** The three reassurance lines under the lead, in Figma's order. */
const checks = ["pouvoir", "strategie", "rachat"] as const;

/**
 * Figma `13445:16587` — the service page's hero.
 *
 * Two bands, the same construction the new article hero uses: a 62px lilas
 * crumb, then a 754px `HeroFiche`. Inside it Figma centres a 1245 grid at
 * y=56 holding one row — a 679 copy column beside a 539 photo stage on a 36px
 * gap — and the column measures 642, so the band closes a symmetric 56 below.
 *
 * The row is 679 + 36 + 539 = **1254** inside a 1245 grid, i.e. it overhangs
 * by 9. That is Figma sizing the stage by its badge rather than its photo; the
 * copy column flexes here so nothing overflows the container.
 */
export function Hero() {
  const t = useTranslations("ServicePage.hero");

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

      <Container className="overflow-hidden py-12 lg:py-14">
        <div className="flex flex-col items-start gap-9 xl:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <div className="flex flex-col gap-4">
              {/* Figma nowraps this one and lets it overflow its own column:
                  uppercase at 0.18em the string needs ~693 against a 679
                  measure. Kept on one line from xl, where it runs into the
                  36px gap beside the photo and clips at the container, and
                  allowed to wrap below — where wrapping is the only option. */}
              <p className="text-overline font-poppins text-brique uppercase xl:whitespace-nowrap">
                {t("overline")}
              </p>

              {/*
                Poppins Bold 46 on a fixed 52 line box. Figma pins the pale-gold
                marker at HeroFiche (605, 135) — 42.2px below the title box and
                267.5 in from the column — so it underlines the foot of line
                one. Carried in em against the title, and capped at the column:
                a 5.9em bar is wider than its measure on a phone and would push
                the page sideways, which is how the e-commerce hero broke.
              */}
              <h1 className="text-article-title text-encre font-poppins relative">
                <span
                  aria-hidden="true"
                  className="bg-pale-gold absolute top-[0.917em] left-[5.815em] h-[0.326em] w-[5.891em] max-w-full rounded-[4px]"
                />
                <span className="relative">{t("title")}</span>
              </h1>
            </div>

            <p className="text-lead font-inter text-encre/62">{t("lead")}</p>

            {/* Figma reserves 64px at the right of each check row, so the text
                wraps before the column's edge rather than at it. */}
            <ul className="flex flex-col gap-4">
              {checks.map((key) => (
                <li key={key} className="flex items-start gap-4 pr-16">
                  <span
                    aria-hidden="true"
                    className="text-result-green mt-0.5 shrink-0 text-[14px] leading-none font-bold"
                  >
                    ✓
                  </span>
                  <span className="text-body text-encre min-w-0 flex-1">
                    {t(`checks.${key}`)}
                  </span>
                </li>
              ))}
            </ul>

            {/* 9px, not the usual 16 — Figma wraps this pair in its own row. */}
            <div className="flex flex-wrap items-center gap-2.25">
              <Button size="lg" variant="gold">
                {t("ctaPrimary")}
              </Button>
              <Button size="lg" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <RosetteRibbon
                aria-hidden="true"
                width={22.957}
                height={36}
                className="shrink-0"
              />
              <p className="text-small text-encre/62 max-w-137.5">
                <span className="text-small-strong text-encre">{t("firm")}</span>
                {t("firmDetails")}
              </p>
            </div>
          </div>

          {/*
            The 539 stage. Figma stacks its three children in one grid cell, so
            each carries its own offset from the stage's top left: the photo
            28.53 in, the card flush left at 443 down, and the badge's 108.47
            box at 430.53/59 with the rotated 97.333 disc centred inside it.
            Letting that box do the centring avoids the rotate-about-the-centre
            arithmetic the Bibliotheque polaroid needed.
          */}
          <div className="relative hidden h-137 w-[539px] shrink-0 xl:block">
            <div className="absolute top-0 left-[28.53px] h-137 w-117.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
              <Image
                src={heroPhoto}
                alt={t("imageAlt")}
                sizes="470px"
                className="h-full w-full object-cover"
              />
            </div>

            <figure className="absolute top-[443px] left-0 flex w-[213.333px] items-center gap-2 rounded-[16px] bg-white p-3 shadow-[0px_14.667px_36.667px_0px_rgba(18,42,76,0.12)]">
              <CalendarDotsBold
                aria-hidden="true"
                width={40}
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

            <div
              aria-hidden="true"
              className="absolute top-[59px] left-[430.53px] flex size-[108.47px] items-center justify-center"
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
      </Container>
    </section>
  );
}
