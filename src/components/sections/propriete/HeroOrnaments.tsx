import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import IdeaBulb from "@/assets/icons/idea-bulb.svg";
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import LouvrePyramidXl from "@/assets/icons/louvre-pyramid-xl.svg";
import MorrisColumnLg from "@/assets/icons/morris-column-lg.svg";
import ShieldBadge from "@/assets/icons/shield-badge.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Decorative illustrations framing the Propriété intellectuelle hero — literal
 * Figma coordinates on a 1920x720 stage, as on all six sibling domain pages.
 *
 * **`shield-badge.svg` reuses at 138x149**, its stroke 3.57 rendering 9.85
 * against Figma's 10 — 1.5%, the tightest reuse on the build. The pyramid and
 * the Morris column both needed forks for the opposite reason: Figma keeps
 * their stroke-widths constant across boxes, so the stored files would draw
 * 35-63% too thick here.
 *
 * The laurel is mirrored, as on the Immobilier hero: Figma's `rotate(180)` plus
 * a vertical flip compose to `-scale-x-100`.
 */
export function HeroOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/* Offset by the 44px breadcrumb band the stage sits below. */}
      <div className="absolute top-11 left-1/2 h-180 w-[1920px] -translate-x-1/2">
        <IdeaBulb
          className="absolute top-[-41px] left-[163.5px]"
          width={150}
          height={150}
        />
        <MorrisColumnLg
          className="absolute top-[30px] left-[344.5px]"
          width={127}
          height={198}
        />
        <Sparkle className="absolute top-[300px] left-[290px]" width={46} height={46} />
        <LaurelBranch
          className="absolute top-[327px] left-[395px] -scale-x-100"
          width={120}
          height={150}
        />
        <LouvrePyramidXl
          className="absolute top-[568px] left-[165.5px]"
          width={230}
          height={177}
        />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1620px]"
          width={140}
          height={271}
        />
        <Sparkle
          className="absolute top-[328px] left-[1472px]"
          width={36}
          height={36}
        />
        <ShieldBadge
          className="absolute top-[499px] left-[1463.5px]"
          width={138}
          height={149}
        />
      </div>
    </div>
  );
}
