import AwardRosette from "@/assets/icons/award-rosette.svg";
import DeskLamp from "@/assets/icons/desk-lamp.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import OpenBook from "@/assets/icons/open-book.svg";
import PenNib from "@/assets/icons/pen-nib.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Decorative illustrations framing the Contrats hero. Same mechanism as the
 * Contentieux one: literal Figma coordinates on a 1920x720 stage, pinned to
 * 1920px and centred so the composition keeps its geometry and is simply
 * clipped from the edges.
 *
 * The tower reuses `eiffel-tower-colour` at the same 140x271 the Contentieux
 * hero uses, and both sparkles reuse `sparkle`. Hidden below lg and
 * aria-hidden throughout.
 */
export function HeroOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/* Offset by the 64px breadcrumb band the stage sits below. */}
      <div className="absolute top-16 left-1/2 h-180 w-[1920px] -translate-x-1/2">
        <OpenBook
          className="absolute top-[18px] left-[508px]"
          width={120}
          height={90}
        />
        <PenNib className="absolute top-[63px] left-[338px]" width={110} height={153} />
        <Sparkle
          className="absolute top-[300px] left-[447.5px]"
          width={46}
          height={46}
        />
        <DeskLamp
          className="absolute top-[560px] left-[317.5px]"
          width={190}
          height={190}
        />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1462.5px]"
          width={140}
          height={271}
        />
        <Sparkle
          className="absolute top-[161px] left-[1383px]"
          width={36}
          height={36}
        />
        <AwardRosette
          className="absolute top-[511px] left-[1458.5px]"
          width={140}
          height={171}
        />
      </div>
    </div>
  );
}
