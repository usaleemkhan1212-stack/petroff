import CoinStackWide from "@/assets/icons/coin-stack-wide.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import GrowthChart from "@/assets/icons/growth-chart-lg.svg";
import HaussmannBuildings from "@/assets/icons/haussmann-buildings-lg.svg";
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import PenNib from "@/assets/icons/pen-nib.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Decorative illustrations framing the Capital-risque hero — literal Figma
 * coordinates on a 1920x720 stage, as on every sibling domain page.
 *
 * Eight ornaments, seven reuses and **one fork**:
 *
 * - **`haussmann-buildings-lg.svg` is new, and only the stroke says so.** Its
 *   19 paths match the stored 116x93 file at 0.0009 and every fill is
 *   identical, but Figma keeps `stroke-width` **4** at this 217x174 box, where
 *   rendering the small file here would draw it at 7.48 — 87% too thick. The
 *   same reason the three `-lg` forks exist.
 * - `growth-chart-lg` at 224x185 renders its stroke 6.59 against Figma's 7
 *   (5.9%) and `coin-stack-wide` at 183x147 renders 7.54 against 7 (7.6%) —
 *   both inside the ~10% threshold this build settled on, so both reuse.
 * - `pen-nib.svg` at 103.125x150 is its documented box and carries no strokes;
 *   `eiffel-tower-colour`, `laurel-branch-mint` and both sparkles are exact.
 *
 * The laurel is mirrored: Figma composes a 180° rotation with a vertical flip,
 * which is a horizontal flip.
 */
export function HeroOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/* Offset by the 64px breadcrumb band the stage sits below. */}
      <div className="absolute top-16 left-1/2 h-180 w-[1920px] -translate-x-1/2">
        <LaurelBranch
          className="absolute top-[10px] left-[352px] -scale-x-100"
          width={120}
          height={150}
        />
        <CoinStackWide
          className="absolute top-[172px] left-[207px]"
          width={183}
          height={147}
        />
        <Sparkle className="absolute top-[402px] left-[438px]" width={46} height={46} />
        <HaussmannBuildings
          className="absolute top-[558px] left-[239px]"
          width={217}
          height={174}
        />
        <Sparkle
          className="absolute top-[154px] left-[1505px]"
          width={36}
          height={36}
        />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1620px]"
          width={140}
          height={271}
        />
        <PenNib
          className="absolute top-[283px] left-[1495px]"
          width={103.125}
          height={150}
        />
        <GrowthChart
          className="absolute top-[564px] left-[1429px]"
          width={224}
          height={185}
        />
      </div>
    </div>
  );
}
