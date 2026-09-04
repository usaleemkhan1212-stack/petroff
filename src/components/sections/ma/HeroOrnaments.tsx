import DomedBuilding from "@/assets/icons/domed-building.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import GrowthChart from "@/assets/icons/growth-chart-lg.svg";
import Key from "@/assets/icons/key-lg.svg";
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import LouvrePyramid from "@/assets/icons/louvre-pyramid-lg.svg";
import Sparkle from "@/assets/icons/sparkle.svg";
import ThreeFigures from "@/assets/icons/three-figures.svg";

/**
 * Decorative illustrations framing the Fusions-acquisitions hero — literal
 * Figma coordinates on a 1920x720 stage, as on every sibling domain page.
 *
 * **Nine ornaments, nine reuses — no new asset here**, and eight of them sit at
 * their exact native box (deviation 0.0000). Three are files the earlier M&A
 * page's deletion had orphaned and which this frame puts back to work:
 * `growth-chart-lg` at 238x196, `key-lg` at 195x120 and `louvre-pyramid-lg` at
 * 170x132.222 — each the `-lg` fork that exists precisely because Figma keeps
 * the same stroke-width at these boxes.
 *
 * `domed-building.svg` is at its native 198x222.75, the box the Immobilier hero
 * also uses; `three-figures.svg` is the only non-native one, stretched to
 * 136x104 and exact because it carries no strokes.
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
        <LouvrePyramid
          className="absolute top-[100px] left-[125px]"
          width={170}
          height={132.222}
        />
        <Sparkle className="absolute top-[297px] left-[385px]" width={46} height={46} />
        <GrowthChart
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
