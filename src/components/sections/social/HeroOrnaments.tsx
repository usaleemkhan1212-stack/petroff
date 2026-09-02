import ArcDeTriompheColourXl from "@/assets/icons/arc-de-triomphe-colour-xl.svg";
import CalendarDots from "@/assets/icons/calendar-dots.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import PeopleDuo from "@/assets/icons/people-duo.svg";
import PeopleTrio from "@/assets/icons/people-trio.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Decorative illustrations framing the Droit social hero — literal Figma
 * coordinates on a 1920x720 stage, pinned to 1920px and centred, as on all
 * three sibling domain pages.
 *
 * **Six of the eight reuse.** The arc is `arc-de-triomphe-colour-xl` at its
 * exact native 182x150 with the same stroke-width 6, the tower is
 * `eiffel-tower-colour` at 140x271, the laurel is the mint fork at its native
 * 120x150, and both sparkles are `sparkle`.
 *
 * `calendar-dots.svg` reuses at **150x139** rather than needing the fourth
 * fork: its stroke-width 2.45 in a 46px box renders ~7.4 here against Figma's
 * 8, which is the magnifier's 0.7px case, not the `calendar-dots-lg` case —
 * that file exists because the same glyph at 110x102 would have rendered 5.4.
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
        <ArcDeTriompheColourXl
          className="absolute top-[14px] left-[326px]"
          width={182}
          height={150}
        />
        <Sparkle className="absolute top-[360px] left-[381px]" width={46} height={46} />
        <PeopleTrio
          className="absolute top-[572px] left-[164px]"
          width={230}
          height={172}
        />
        <CalendarDots
          className="absolute top-[605px] left-[470px]"
          width={150}
          height={139}
        />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1620px]"
          width={140}
          height={271}
        />
        <Sparkle
          className="absolute top-[187px] left-[1463px]"
          width={36}
          height={36}
        />
        <LaurelBranch
          className="absolute top-[402px] left-[1481px]"
          width={120}
          height={150}
        />
        <PeopleDuo
          className="absolute top-[584px] left-[1574px]"
          width={170}
          height={127.5}
        />
      </div>
    </div>
  );
}
