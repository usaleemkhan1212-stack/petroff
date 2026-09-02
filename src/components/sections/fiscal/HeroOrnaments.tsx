import BandedColumn from "@/assets/icons/banded-column.svg";
import CalendarDotsLg from "@/assets/icons/calendar-dots-lg.svg";
import CoinStack from "@/assets/icons/coin-stack.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import GrowthChart from "@/assets/icons/growth-chart.svg";
import PercentColour from "@/assets/icons/percent-colour.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Decorative illustrations framing the Droit fiscal hero. Same mechanism as
 * the two sibling domain pages: literal Figma coordinates on a 1920x720 stage,
 * pinned to 1920px and centred, so the composition keeps its geometry and is
 * simply clipped from the edges.
 *
 * Four of the eight reuse — the tower is `eiffel-tower-colour` at the same
 * 140x271 both siblings use, and the two sparkles are `sparkle` at 36 and 46.
 * `calendar-dots-lg` is a third fork of the calendar: the glyph matches to
 * 0.0001 but Figma draws its band at a literal stroke-width 8 in this box.
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
        <CalendarDotsLg
          className="absolute top-[34px] left-[382px]"
          width={110}
          height={102}
        />
        <PercentColour
          className="absolute top-[184px] left-[212px]"
          width={140}
          height={140}
        />
        <Sparkle className="absolute top-[337px] left-[358px]" width={46} height={46} />
        <CoinStack
          className="absolute top-[571px] left-[276px]"
          width={200}
          height={186}
        />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1620px]"
          width={140}
          height={271}
        />
        <Sparkle
          className="absolute top-[118px] left-[1509px]"
          width={36}
          height={36}
        />
        <BandedColumn
          className="absolute top-[477px] left-[1629px]"
          width={62}
          height={185}
        />
        <GrowthChart
          className="absolute top-[592px] left-[1418.82px]"
          width={166.357}
          height={137}
        />
      </div>
    </div>
  );
}
