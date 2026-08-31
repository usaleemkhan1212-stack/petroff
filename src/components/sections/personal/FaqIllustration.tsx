import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import ParisRooftops from "@/assets/icons/paris-rooftops-scene.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Figma's `team-compo` (`13544:33804`) — the arch of Paris rooftops again, but
 * **mirrored**: this page puts the illustration to the LEFT of the accordion,
 * so the arch sits at x=17.5 rather than 70.5, the sparkle moves to the top
 * right, and the laurel bleeds off the **lower left** under a `-scale-x-100`.
 *
 * Its laurel inset — `inset-[76.25% 95.43% -10.34% -26.76%]` on the 383x440
 * box — resolves to 120x150 at (-102.5, 335.5).
 *
 * All three assets reuse: the laurel matches `laurel-branch-mint.svg` to
 * 0.0023, the arch matches `paris-rooftops-scene.svg` to 0.004 at its native
 * 313x400.64, and the sparkle is an exact 1.15x of `sparkle.svg`.
 *
 * That makes **five near-identical FaqIllustrations on the site** — this is the
 * first to mirror. Ornament coordinates, so literal px.
 */
export function FaqIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-110 w-[383px] shrink-0 xl:block"
    >
      {/* rounded-t-full resolves to exactly Figma's 156.5 for a 313 box. */}
      <div className="absolute top-[8px] left-[17.5px] h-100 w-[313px] overflow-hidden rounded-t-full rounded-br-[25px] rounded-bl-[25px] drop-shadow-[0px_15px_14px_rgba(33,29,51,0.13)]">
        <ParisRooftops width={313} height={400.64} />
      </div>

      <Sparkle width={46} height={46} className="absolute top-[17px] left-[331.5px]" />

      {/* Bleeds off the left and below, which is why the section is
          overflow-hidden. Mirrored — Tailwind v4 flips via the standalone
          `scale` property, so check `scale`, not `transform`. */}
      <LaurelBranch
        width={120}
        height={150}
        className="absolute top-[335.5px] left-[-102.5px] -scale-x-100"
      />
    </div>
  );
}
