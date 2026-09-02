import DomedBuilding from "@/assets/icons/domed-building.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import GrowthChartLg from "@/assets/icons/growth-chart-lg.svg";
import KeyLg from "@/assets/icons/key-lg.svg";
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import LouvrePyramidLg from "@/assets/icons/louvre-pyramid-lg.svg";
import Sparkle from "@/assets/icons/sparkle.svg";
import ThreeFigures from "@/assets/icons/three-figures.svg";

/**
 * Decorative illustrations framing the M&A hero — literal Figma coordinates on
 * a 1920x720 stage, pinned to 1920px and centred, as on all four sibling
 * domain pages. Nine ornaments, the most of any hero on the site.
 *
 * **Five reuse and three are `-lg` forks.** The tower, the laurel at its native
 * 120x150, `three-figures` scaled down to 136x104 (no strokes, so exact) and
 * both sparkles reuse outright. `growth-chart`, `key` and `louvre-pyramid` all
 * appear at a second box where Figma keeps the SAME stroke-width it uses at the
 * small one — so scaling the stored file would draw the stroke 21-43% too
 * thick, and each needed its own file.
 *
 * Hidden below lg and aria-hidden throughout.
 */
export function HeroOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/* Offset by the 64px breadcrumb band the stage sits below. */}
      <div className="absolute top-16 left-1/2 h-180 w-[1920px] -translate-x-1/2">
        <KeyLg className="absolute top-[26px] left-[259px]" width={195} height={120} />
        <LouvrePyramidLg
          className="absolute top-[100px] left-[125px]"
          width={170}
          height={132.222}
        />
        <Sparkle className="absolute top-[297px] left-[385px]" width={46} height={46} />
        <GrowthChartLg
          className="absolute top-[552px] left-[166px]"
          width={238}
          height={196}
        />
        <LaurelBranch
          className="absolute top-[33px] left-[1472px]"
          width={120}
          height={150}
        />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1620px]"
          width={140}
          height={271}
        />
        <Sparkle
          className="absolute top-[383px] left-[1560px]"
          width={36}
          height={36}
        />
        <DomedBuilding
          className="absolute top-[552px] left-[1365px]"
          width={198}
          height={222.75}
        />
        <ThreeFigures
          className="absolute top-[559px] left-[1575px]"
          width={136}
          height={104}
        />
      </div>
    </div>
  );
}
