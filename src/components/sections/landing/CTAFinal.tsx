import CoinStack from "@/assets/icons/coin-stack-wide.svg";
import GlobePaperPlane from "@/assets/icons/globe-paper-plane.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import { Container } from "@/components/ui/Container";

/**
 * Figma `14221:10746` — the closing panel: lilas-2 at a 28px corner, 48 sides
 * and 64 top and bottom, inside a section padded 96.
 *
 * **Both ornaments reuse at their exact native box** — `coin-stack-wide.svg`
 * (170x136) and `globe-paper-plane.svg` (153x136) match the exports to 0.0016
 * and 0.0020 across all their path numbers, at the same stroke widths. No new
 * assets.
 *
 * Figma places a third ornament at `left: -336.5, top: 766.33` — far outside a
 * panel that is ~333 tall and `overflow-clip`, so it never renders. It is not
 * reproduced; a hidden element is not a design.
 */
export function LandingCTAFinal() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="bg-lilas-2 relative flex flex-col items-center gap-3 overflow-hidden rounded-[28px] px-6 py-12 sm:px-12 lg:py-16">
          <p className="text-overline font-poppins text-brique relative uppercase">
            Contact
          </p>
          <h2 className="text-h2 font-poppins text-encre relative text-center">
            Is the money still in France? Then there is still time.
          </h2>
          <p className="text-body text-encre/62 relative text-center">
            15 minutes free by video · firm fee within 24 h · +33 (0)1 78 90 46
            46 · Paris
          </p>

          {/* Figma's own 14px spacer between the lead and the CTA row. */}
          <div aria-hidden="true" className="h-3.5" />

          <div className="relative flex flex-wrap items-center justify-center gap-4">
            <a
              href="#assess"
              className="text-button font-poppins bg-encre rounded-full px-7 py-4 text-white transition-opacity hover:opacity-90"
            >
              Assess my case
            </a>
            <a
              href="tel:+33178904646"
              className="text-small-strong text-encre hover:border-encre/30 flex items-center gap-3 rounded-full border border-black/10 px-5 py-3 transition-colors"
            >
              <PhoneIcon aria-hidden="true" className="size-[17px] shrink-0" />
              <span className="whitespace-nowrap">+33 (0)1 78 90 46 46</span>
            </a>
          </div>

          {/*
            Both ornaments hang off the panel's edges and are clipped by it.
            They are pinned to the panel's own left and right rather than to a
            literal x, so they hold their inset as it narrows — the treatment
            the article's CTA panel uses. Hidden below `lg`, where they would
            crowd the copy.
          */}
          <CoinStack
            aria-hidden="true"
            className="absolute top-48 -left-8 hidden h-[136px] w-[170px] lg:block"
          />
          <GlobePaperPlane
            aria-hidden="true"
            className="absolute -top-10 -right-8 hidden h-[136px] w-[153px] lg:block"
          />
        </div>
      </Container>
    </section>
  );
}
