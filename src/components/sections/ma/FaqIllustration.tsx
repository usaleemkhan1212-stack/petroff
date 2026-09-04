import PassageScene from "@/assets/icons/passage-scene.svg";
// Mint since the redesign — this frame names Petroff/Mint, as the
// Contentieux twin's now does. That leaves `laurel-branch.svg` (brique) an
// orphan: every laurel on the site is now the mint fork.
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * The arch composition beside the FAQ - a Paris street crossing here.
 *
 * **`passage-scene.svg` is the one new asset on this page**, and the tenth
 * arch scene: two shopfronts either side of a zebra crossing, with a traffic
 * light, a pedestrian and a car. Rendering the arch node and diffing it
 * against every stored scene gave no winner (44.9 against a runner-up of
 * 45.8, where a real match lands near 7), which is what proved it new.
 *
 * Exported with `download_assets` and stripped of the three painted ancestor
 * rects that tool bakes in - the canvas, the 1920x8669 page frame and the
 * 1926x663 section. Its two slate tones have no token and stay raw hex, the
 * call `paris-scene.svg` already makes.
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
        <PassageScene width={313} height={400.64} />
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
