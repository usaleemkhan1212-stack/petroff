import CoinStackWide from "@/assets/icons/coin-stack-wide.svg";
import Courthouse from "@/assets/icons/courthouse.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import Hourglass from "@/assets/icons/hourglass.svg";
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import MagnifierCheckMint from "@/assets/icons/magnifier-check-mint.svg";
import PeopleDuo from "@/assets/icons/people-duo.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Decorative illustrations framing the Recouvrement hero — literal Figma
 * coordinates on a 1920x720 stage, as on all seven sibling domain pages.
 *
 * **`courthouse.svg` reuses at a FIFTH box** — 198.621x144, and the
 * pale-periwinkle original rather than the `-pale-blue` fork. It carries no
 * strokes, so every stretch of it is exact. `people-duo.svg`, made for the
 * Droit social hero, reuses at 160x120 for the same reason.
 *
 * Two of the three new files here are forks of glyphs this build already had:
 * the coin stack at a different aspect, and the magnifier recoloured mint.
 *
 * The laurel is mirrored (`rotate(180)` plus a vertical flip = `-scale-x-100`)
 * and the hourglass is rotated 180, both as Figma draws them.
 */
export function HeroOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/* Offset by the 44px breadcrumb band the stage sits below. */}
      <div className="absolute top-11 left-1/2 h-180 w-[1920px] -translate-x-1/2">
        <Courthouse
          className="absolute top-[23px] left-[265.5px]"
          width={198.621}
          height={144}
        />
        <Sparkle
          className="absolute top-[240px] left-[273.5px]"
          width={46}
          height={46}
        />
        <LaurelBranch
          className="absolute top-[314px] left-[396.5px] -scale-x-100"
          width={120}
          height={150}
        />
        <Hourglass
          className="absolute top-[557px] left-[241.25px] rotate-180"
          width={143.875}
          height={191.833}
        />
        <PeopleDuo
          className="absolute top-[629px] left-[422.5px]"
          width={160}
          height={120}
        />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1620px]"
          width={140}
          height={271}
        />
        <Sparkle
          className="absolute top-[174px] left-[1478.5px]"
          width={36}
          height={36}
        />
        <CoinStackWide
          className="absolute top-[358px] left-[1429.5px]"
          width={170}
          height={136}
        />
        <MagnifierCheckMint
          className="absolute top-[574px] left-[1580.5px]"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
