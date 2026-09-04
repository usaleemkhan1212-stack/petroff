import DialogueBubbles from "@/assets/icons/dialogue-bubbles.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import GlobePlane from "@/assets/icons/globe-plane.svg";
import Key from "@/assets/icons/key-lg.svg";
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import Sparkle from "@/assets/icons/sparkle.svg";
import ThreeFigures from "@/assets/icons/three-figures.svg";

/**
 * Decorative illustrations framing the Litiges entre associés hero — literal
 * Figma coordinates on a 1920x720 stage, as on every sibling domain page.
 *
 * Eight ornaments, seven reuses and **one new drawing**:
 *
 * - **`dialogue-bubbles.svg` is new** — two overlapping speech bubbles, apt for
 *   a disputes page. It has 8 paths where the nearest-sized stored file
 *   (`louvre-pyramid-lg`, the same 170 width) has 4, and nothing in the folder
 *   renders close to it.
 * - `globe-plane.svg` reuses at 255x227: its stroke 5 in a 244x216.889 box
 *   renders **5.23** against Figma's 5 (4.5%), inside the ~10% threshold. The
 *   90x80 `globe-paper-plane-sm` would have drawn 14.2 — the same glyph family,
 *   the wrong member.
 * - `key-lg.svg` is at its exact native 195x120 with stroke 10 in both, and
 *   `three-figures.svg` stretches to 198x151 exactly, carrying no strokes.
 */
export function HeroOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/* Offset by the 64px breadcrumb band the stage sits below. */}
      <div className="absolute top-16 left-1/2 h-180 w-[1920px] -translate-x-1/2">
        <Key className="absolute top-[26px] left-[259px]" width={195} height={120} />
        <DialogueBubbles
          className="absolute top-[157px] left-[158px]"
          width={170}
          height={122.778}
        />
        <Sparkle className="absolute top-[297px] left-[385px]" width={46} height={46} />
        <ThreeFigures
          className="absolute top-[574px] left-[283px]"
          width={198}
          height={151}
        />
        <Sparkle className="absolute top-[69px] left-[1436px]" width={36} height={36} />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1620px]"
          width={140}
          height={271}
        />
        <LaurelBranch
          className="absolute top-[258px] left-[1412px]"
          width={120}
          height={150}
        />
        <GlobePlane
          className="absolute top-[523px] left-[1412px]"
          width={255}
          height={227}
        />
      </div>
    </div>
  );
}
