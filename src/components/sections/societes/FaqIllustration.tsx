import PlaceScene from "@/assets/icons/place-scene.svg";
// Mint since the redesign — this frame names Petroff/Mint, as the
// Contentieux twin's now does. That leaves `laurel-branch.svg` (brique) an
// orphan: every laurel on the site is now the mint fork.
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * The arch composition beside the FAQ - a Paris square here.
 *
 * **The scene is `place-scene.svg`, the Immobilier page's**, and this frame
 * draws it unflattened: ~30 separate vectors rather than one file, which no
 * path compare can match. Identified by rendering the arch node and diffing it
 * against every stored scene - 6.79 against a runner-up of 31.53.
 *
 * Offsets are the literal Figma coordinates on its 383x440 box - ornament
 * geometry, the same sanctioned exception the hero ornaments use.
 * `rounded-t-full` resolves to exactly the half-width Figma specifies. The
 * laurel deliberately sits outside the box to the lower right, as in the comp,
 * so the section clips it.
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
      <div className="absolute top-[8px] left-[70.5px] h-100 w-[313px] overflow-hidden rounded-t-full rounded-b-[25.125px] drop-shadow-[0px_15.075px_13.819px_rgba(33,29,51,0.13)]">
        <PlaceScene width={313} height={400} />
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
