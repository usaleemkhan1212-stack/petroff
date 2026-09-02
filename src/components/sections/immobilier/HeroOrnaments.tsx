import DomedBuilding from "@/assets/icons/domed-building.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import Key from "@/assets/icons/key.svg";
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import MorrisColumn from "@/assets/icons/morris-column.svg";
import ParisBridge from "@/assets/icons/paris-bridge.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Decorative illustrations framing the Immobilier hero — literal Figma
 * coordinates on a 1920x720 stage, as on all five sibling domain pages.
 *
 * **Seven of the eight reuse, and two of those are worth noting.**
 * `domed-building.svg` is the file the M&A hero introduced one page earlier, at
 * its exact native 198x222.75. And `key.svg` — the small 52x31.778 file —
 * reuses here at 160x98, where its stroke renders 9.4 against Figma's 10 (6%);
 * the M&A hero needed `key-lg.svg` because at 195x120 the same file draws 11.5
 * against 10. **The same pair can be a reuse at one box and a fork at another.**
 *
 * The laurel is mirrored: Figma applies `rotate(180)` and a vertical flip,
 * which together are a horizontal flip — `-scale-x-100`. Tailwind v4 flips via
 * the standalone `scale` property, so check `scale`, not `transform`.
 */
export function HeroOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/* Offset by the 64px breadcrumb band the stage sits below. */}
      <div className="absolute top-16 left-1/2 h-180 w-[1920px] -translate-x-1/2">
        <ParisBridge
          className="absolute top-[-7px] left-[213px]"
          width={233}
          height={159}
        />
        <Sparkle className="absolute top-[300px] left-[290px]" width={46} height={46} />
        <LaurelBranch
          className="absolute top-[426px] left-[386px] -scale-x-100"
          width={120}
          height={150}
        />
        <DomedBuilding
          className="absolute top-[546px] left-[164px]"
          width={198}
          height={222.75}
        />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1620px]"
          width={140}
          height={271}
        />
        <Sparkle
          className="absolute top-[280px] left-[1522px]"
          width={36}
          height={36}
        />
        <MorrisColumn
          className="absolute top-[396px] left-[1463px]"
          width={86.842}
          height={150}
        />
        <Key className="absolute top-[598px] left-[1610px]" width={160} height={98} />
      </div>
    </div>
  );
}
