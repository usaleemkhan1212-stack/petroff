import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import ParisRooftops from "@/assets/icons/paris-rooftops-scene.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Figma's `team-compo` (`13445:17487`): a 313x400 arch of Paris rooftops with
 * a sparkle over its top left and a laurel bleeding off its lower right.
 *
 * **Coordinate-for-coordinate identical to the e-commerce FaqIllustration** —
 * arch at (70.5, 8), sparkle at (49, -4), laurel at (421.5, 335.5), which is
 * what Figma's `inset-[76.25% -41.38% -10.34% 110.05%]` resolves to on this
 * 383x440 box. All three assets reuse: the laurel matches
 * `laurel-branch-mint.svg` to 0.0023, the arch matches
 * `paris-rooftops-scene.svg` to 0.004 at its native 313x400.64, and the
 * sparkle is an exact 1.15x of `sparkle.svg`, which carries no strokes.
 *
 * That makes **four near-identical FaqIllustrations on the site** — the two
 * domain pages' (differing only by which laurel they import), e-commerce's and
 * this one. Kept per-page to match the existing precedent, but the
 * consolidation is overdue.
 *
 * Appears from `xl`: Figma's own band is 820 + 48 + 383 = 1251 inside a 1245
 * container, so the list flexes and this sits ~6px left of the comp.
 *
 * Ornament coordinates, so literal px: the sanctioned exception.
 */
export function FaqIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-110 w-[383px] shrink-0 xl:block"
    >
      {/* rounded-t-full resolves to exactly Figma's 156.5 for a 313 box. */}
      <div className="absolute top-[8px] left-[70.5px] h-100 w-[313px] overflow-hidden rounded-t-full rounded-br-[25px] rounded-bl-[25px] drop-shadow-[0px_15px_14px_rgba(33,29,51,0.13)]">
        <ParisRooftops width={313} height={400.64} />
      </div>

      <Sparkle width={46} height={46} className="absolute top-[-4px] left-[49px]" />

      {/* Bleeds past the 383 box, which is why the section is overflow-hidden. */}
      <LaurelBranch
        width={120}
        height={150}
        className="absolute top-[335.5px] left-[421.5px]"
      />
    </div>
  );
}
