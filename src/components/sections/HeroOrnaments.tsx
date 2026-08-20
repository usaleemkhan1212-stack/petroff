import ArcDeTriomphe from "@/assets/icons/arc-de-triomphe.svg";
import Courthouse from "@/assets/icons/courthouse.svg";
import EiffelTower from "@/assets/icons/eiffel-tower.svg";
import LaurelBranch from "@/assets/icons/laurel-branch.svg";
import LawyerRobe from "@/assets/icons/lawyer-robe.svg";
import ScalesOfJustice from "@/assets/icons/scales-of-justice.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Purely decorative illustrations that frame the hero copy.
 *
 * These are the one place absolute positioning is used: the offsets are the
 * literal Figma coordinates on its 1920x660 stage. The inner layer is pinned
 * to 1920px and centred, so the composition keeps its exact geometry and is
 * simply clipped from the edges on narrower screens — the same thing Figma's
 * `overflow-clip` stage does.
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
      <div className="absolute left-1/2 h-full w-[1920px] -translate-x-1/2">
        <ScalesOfJustice className="absolute top-[164px] left-[173px]" />
        <LaurelBranch className="absolute top-[61px] left-[454px]" />
        <Courthouse className="absolute top-[515px] left-[365px]" />
        <Sparkle className="absolute top-[548px] left-[235px]" width={52} height={52} />
        <EiffelTower className="absolute top-[40px] left-[1592px]" />
        <ArcDeTriomphe className="absolute top-[380px] left-[1525px]" />
        <LawyerRobe className="absolute top-[518px] left-[1325px]" />
        <Sparkle className="absolute top-[158px] left-[1397px]" />
      </div>
    </div>
  );
}
