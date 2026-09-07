import PhoneIcon from "@/assets/icons/phone.svg";
import { Container } from "@/components/ui/Container";
import { LandingBullet } from "./Bullet";
import { HeroMarker } from "@/components/ui/HeroMarker";
import { LandingContactForm } from "./ContactForm";

/**
 * Figma `14221:10002` — the landing hero: a 692 copy column beside a 470
 * lead-capture card, `justify-between` inside the 1245 container giving the
 * comp's own 83px gap. Note that is NOT the site's standard 679 + 96 + 470
 * row; this frame draws its own pair, so its numbers are taken as they are.
 *
 * The frame declares 1019 but TrustStrip below it starts at page y=950, so the
 * hero's real height in flow is 878 — its band is 36 + 771 + 36 = 843, plus
 * the 35 the frame leaves under it. Judge it by the band.
 */

/** The three claims under the lead. Lead-in full encre, the rest at 62%. */
const CLAIMS = [
  {
    lead: "No judgment needed",
    /* The lead-in owns the full stop on claims 1 and 2 and not on 3 — Figma
       splits the runs that way, so the punctuation travels with the copy
       rather than being added between the spans. */
    tail:
      ". A claim that appears well-founded and a risk to recovery are enough " +
      "(Art. L. 511-1, Code des procédures civiles d’exécution).",
  },
  {
    lead: "No prior notice.",
    tail:
      " The application is made ex parte; the debtor learns of the freeze " +
      "after the bailiff has acted.",
  },
  {
    lead: "Foreign judgments and awards",
    tail:
      " — including UK judgments after Brexit — can be enforced " +
      "without a fresh application for authorisation.",
  },
];

/*
  Figma’s band is 36 + 771 + 36 = 843, but TrustStrip below it starts at page
  y=950 — 35 further down. The sections are absolutely placed in the page frame
  (Hero’s own declared 1019 overlaps TrustStrip by 141), so that 35 belongs to
  the hero, and on the same white it simply reads as more of its band.
*/
export function LandingHero() {
  return (
    <section className="bg-white pt-9 pb-9 lg:pb-[71px]">
      <Container>
        <div className="flex flex-col items-center gap-12 xl:flex-row xl:justify-between xl:gap-0">
          {/* Copy column — 692 at xl, its three blocks on Figma's 35px gap. */}
          <div className="flex w-full flex-col gap-[35px] xl:w-173">
            <div className="flex flex-col gap-[17px]">
              <p className="text-overline font-poppins text-brique uppercase">
                Enforcement · Saisie conservatoire · Paris Bar
              </p>

              {/*
                The title is capped at Figma's own 665 rather than running the
                column's 692, because that measure is what produces the comp's
                three lines — "Freeze a debtor's" / "assets in France" /
                "before they disappear." — and the marker belongs under the
                third of them.

                Figma draws the bar as a bare 664x26 rect at mt-160 behind a
                three-line title. Line 3's box runs 122.96..184.4 at 58px, so
                the bar sits 37.04 below that line's top and is 26 tall — hence
                0.6386em and 0.4483em. As a HeroMarker it is a background on
                the marked run, so it is the width of those words in any
                language.
              */}
              <h1 className="text-display-sm font-poppins text-encre max-w-166.25">
                Freeze a debtor&rsquo;s assets in France{" "}
                <HeroMarker
                  top={0.6386}
                  height={0.4483}
                  /* Below lg the run wraps: as an inline-block that paints one
                     band across both lines, as an inline it paints one per
                     line. At lg+ it fits and stays inline-block. */
                  className="inline lg:inline-block"
                >
                  before they disappear.
                </HeroMarker>
              </h1>

              <p className="text-body text-encre">
                Your French counterparty owes you money and is moving funds,
                selling stock or winding down. French law lets a creditor freeze
                bank accounts, shares and property{" "}
                <b className="text-body-strong">
                  ahead of any judgment, and without warning the debtor
                </b>
                . We obtain the order and have it executed — usually within
                days.
              </p>
            </div>

            <div className="flex w-full flex-col gap-[30px] xl:w-160">
              <ul className="flex flex-col gap-3">
                {CLAIMS.map((claim) => (
                  <li key={claim.lead} className="flex items-start gap-[17px]">
                    <LandingBullet />
                    <p className="text-body text-encre min-w-0 flex-1">
                      <b className="text-body-strong">{claim.lead}</b>
                      <span className="text-encre/62">{claim.tail}</span>
                    </p>
                  </li>
                ))}
              </ul>

              {/* Both CTAs point at the card beside them; there is no
                  consultation provider on this page by design. */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="#assess"
                  className="text-button font-poppins bg-gold rounded-full px-5 py-3 text-white transition-opacity hover:opacity-90"
                >
                  Assess my case — reply within 24 h
                </a>
                <a
                  href="tel:+33178904646"
                  className="text-small-strong text-encre hover:border-encre/30 flex items-center gap-3 rounded-full border border-black/10 px-5 py-3 transition-colors"
                >
                  <PhoneIcon
                    aria-hidden="true"
                    className="size-[17px] shrink-0"
                  />
                  <span className="whitespace-nowrap">
                    +33 (0)1 78 90 46 46
                  </span>
                </a>
              </div>
            </div>

            {/* Figma types runs of spaces around the separators. */}
            <p className="text-small text-encre/62 whitespace-pre-wrap">
              <span className="text-button font-poppins text-encre">
                Petroff Avocats{" "}
              </span>
              {
                " · 182 rue de Rivoli, 75001 Paris · Paris Bar, Toque C2396 · FR · EN · BG"
              }
            </p>
          </div>

          {/*
            The card and the seal are siblings: Figma places the badge on the
            hero frame, not inside the card, which is `overflow-clip` and would
            crop it. Anchoring the seal to the card's right edge keeps its 52px
            overhang as the card moves.
          */}
          <div
            id="assess"
            className="relative w-full max-w-117.5 shrink-0 scroll-mt-6"
          >
            <div className="border-encre/8 rounded-tl-[48px] rounded-tr-[18px] rounded-br-[36px] rounded-bl-[18px] border bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)] sm:rounded-tl-[80px] sm:rounded-br-[60px] sm:p-9">
              <LandingContactForm idPrefix="lp-hero" />
            </div>

            {/*
              The "15 ANS" seal. Figma's 108.47 box is the ROTATED bounding box
              of a 97.333 disc at 7deg, so letting that box centre the disc
              avoids the rotate-about-the-centre arithmetic entirely — the same
              construction the article and service heroes use.

              From xl only: it overhangs the card's right edge by 52, which has
              nowhere to go once the card is the full width. That 52 also has to
              fit in the container's gutter, and between 1280 and ~1309 the
              gutter is only 32 — so the overhang is 32 there and Figma's 52
              from `2xl`, where there is always room. Clipping or hiding it were
              the alternatives; tucking it 20px closer is invisible without the
              comp beside it.
            */}
            <div
              aria-hidden="true"
              className="absolute top-5 -right-8 hidden size-[108.47px] items-center justify-center xl:flex 2xl:-right-13"
            >
              <div className="border-lilas bg-encre flex size-[97.333px] rotate-7 flex-col items-center justify-center rounded-full border-2 text-center">
                <span className="text-gold font-poppins text-[18px] leading-[1.35] font-bold">
                  15 ANS
                </span>
                <span className="font-inter text-[14px] leading-[1.2] font-semibold text-white">
                  de pratique
                </span>
                <span className="font-inter text-[14px] leading-[1.2] font-semibold text-white">
                  à Paris
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

