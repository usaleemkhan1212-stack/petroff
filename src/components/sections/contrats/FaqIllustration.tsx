import LaDefenseScene from "@/assets/icons/la-defense-scene.svg";
import LaurelBranch from "@/assets/icons/laurel-branch.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * The arch composition beside the FAQ — La Défense here, where the
 * Contentieux page draws Paris at the water's edge. Every coordinate is
 * identical to that one's, so the two components differ by a single import;
 * they are the obvious first pair for the consolidation pass.
 *
 * Offsets are the literal Figma coordinates on its 383x440 box — ornament
 * geometry, the same sanctioned exception the hero ornaments use. The scene
 * is a rectangular 312.5x400 illustration clipped by its container:
 * rounded-t-full resolves to exactly the 156.25px Figma specifies for a
 * 312.5-wide box. The laurel deliberately sits outside the box to the lower
 * right, as in the comp, so the section clips it.
 *
 * Decorative throughout, and hidden below lg where it would crowd the
 * accordion.
 */
export function FaqIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-110 w-[383px] shrink-0 lg:block"
    >
      <div className="absolute top-[8px] left-[70.5px] h-100 w-[312.5px] overflow-hidden rounded-t-full rounded-b-[25px] drop-shadow-[0px_15px_13.75px_rgba(33,29,51,0.13)]">
        <LaDefenseScene width={312.5} height={400} />
      </div>
      <Sparkle className="absolute top-[-4px] left-[49px]" width={46} height={46} />
      <LaurelBranch
        className="absolute top-[335.5px] left-[421.5px]"
        width={120}
        height={150}
      />
    </div>
  );
}
