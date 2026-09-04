import PontScene from "@/assets/icons/pont-scene.svg";
// Mint since the redesign — this frame names Petroff/Mint, as the
// Contentieux twin's now does. That leaves `laurel-branch.svg` (brique) an
// orphan: every laurel on the site is now the mint fork.
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * The arch composition beside the FAQ - a bridge over the Seine here.
 *
 * **`pont-scene.svg` is new**, the eleventh scene of this family. Exporting the
 * arch and diffing it against every stored scene gave no winner (33.8 against a
 * runner-up of 34.6, where a real match lands near 0-7), which is what proved
 * it new. Unlike the passage scene, `download_assets` returned it already
 * flattened and free of painted ancestor rects - its only `rect` sits inside a
 * clipPath and is inert.
 *
 * Its seven black fills are illustration shading and `#B8C4DC` has no token, so
 * both stay raw hex - the call `paris-scene.svg` already makes.
 *
 * Offsets are the literal Figma coordinates on its 383x440 box - ornament
 * geometry, the same sanctioned exception the hero ornaments use. The laurel
 * deliberately sits outside the box to the lower right, so the section clips it.
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
      <div className="absolute top-[8px] left-[70.5px] h-100 w-[313px] overflow-hidden rounded-t-full rounded-b-[25px] drop-shadow-[0px_15px_13.75px_rgba(33,29,51,0.13)]">
        <PontScene width={313} height={400.64} />
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
