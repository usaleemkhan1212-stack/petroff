import ArcDeTriompheColourXl from "@/assets/icons/arc-de-triomphe-colour-xl.svg";
import Courthouse from "@/assets/icons/courthouse.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
// Mint since the redesign — this frame now names Petroff/Mint.
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import LawyerRobeColour from "@/assets/icons/lawyer-robe-colour.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Decorative illustrations framing the Contentieux hero.
 *
 * Same mechanism as the Expertises StageOrnaments: the offsets are the literal
 * Figma coordinates on its 1920x720 stage, and the inner layer is pinned to
 * 1920px and centred so the composition keeps its exact geometry and is simply
 * clipped from the edges on narrower screens.
 *
 * Six of the seven shapes reuse existing assets. None of them carry strokes,
 * so rendering them at these boxes reproduces the export exactly even where
 * the scale is non-uniform — the exports set preserveAspectRatio="none".
 *   tower      56x96   -> 140x271  (2.5, 2.8229)   as StageOrnaments already does
 *   courthouse 250x185 -> 240x178  (0.96, 0.9622)
 *   laurel     120x150 -> 120x150  identical box, mirrored
 *   robe       130x140 -> 160x170  (1.2308, 1.2143)
 *   sparkle    40x40   -> 36 and 46, both uniform
 *
 * The arc is the exception: it has a 6px stroke Figma leaves unscaled, so it
 * needs its own file — see arc-de-triomphe-colour-xl.svg.
 *
 * Hidden below lg, where the artwork would collide with the copy, and
 * aria-hidden throughout since none of it carries meaning.
 */
export function HeroOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/* Offset by the 64px breadcrumb band the stage sits below. */}
      <div className="absolute top-16 left-1/2 h-180 w-[1920px] -translate-x-1/2">
        <ArcDeTriompheColourXl
          className="absolute top-[-5px] left-[321px]"
          width={182}
          height={150}
        />
        <Sparkle
          className="absolute top-[300px] left-[447.5px]"
          width={46}
          height={46}
        />
        {/* Moved and mirrored in the redesign: Figma's inset resolves to
            (211, 119) and wraps it in a `-scale-x-100`. It used to sit at
            (207.9, 362) the right way round. Prefer the export's inset here —
            `get_metadata` reports x=331, which is the box's right edge. */}
        <LaurelBranch
          className="absolute top-[119px] left-[211px] -scale-x-100"
          width={120}
          height={150}
        />
        <Courthouse
          className="absolute top-[587px] left-[246px]"
          width={240}
          height={178}
        />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1462.5px]"
          width={140}
          height={271}
        />
        <Sparkle
          className="absolute top-[176px] left-[1408px]"
          width={36}
          height={36}
        />
        <LawyerRobeColour
          className="absolute top-[575px] left-[1437.5px]"
          width={160}
          height={170}
        />
      </div>
    </div>
  );
}
