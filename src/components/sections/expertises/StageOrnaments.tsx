import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import LaurelBranchMint from "@/assets/icons/laurel-branch-mint.svg";
import GlobePlane from "@/assets/icons/globe-plane.svg";
import LouvrePyramid from "@/assets/icons/louvre-pyramid.svg";
import ParisBridge from "@/assets/icons/paris-bridge.svg";
import ScalesOfJusticeWide from "@/assets/icons/scales-of-justice-wide.svg";
import Sparkle from "@/assets/icons/sparkle.svg";

/**
 * Decorative illustrations framing the Expertises hero.
 *
 * Same mechanism as HeroOrnaments on the home page: the offsets are the
 * literal Figma coordinates on its 1920x784 stage, and the inner layer is
 * pinned to 1920px and centred so the composition keeps its exact geometry
 * and is simply clipped from the edges on narrower screens.
 *
 * The tower reuses the Actus asset — Figma exports it here at 140x271, an
 * exact (2.5, 2.8229) scale of that file's 56x96 box, which is what rendering
 * it at these dimensions produces since the export sets
 * preserveAspectRatio="none".
 *
 * Hidden below lg, where the artwork would collide with the copy, and
 * aria-hidden throughout since none of it carries meaning.
 */
export function StageOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      <div className="absolute left-1/2 h-full w-[1920px] -translate-x-1/2">
        <ScalesOfJusticeWide className="absolute top-[60px] left-[285px]" />
        <Sparkle className="absolute top-[300px] left-[290px]" width={46} height={46} />
        {/* New in the redesign: the mint laurel, path-identical to the fork
            the home hero introduced, now on its third page. */}
        <LaurelBranchMint className="absolute top-[267px] left-[417px]" />
        <ParisBridge className="absolute top-[652px] left-[166px]" />
        <LouvrePyramid className="absolute top-[693px] left-[460px]" />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1620px]"
          width={140}
          height={271}
        />
        <Sparkle
          className="absolute top-[250px] left-[1514px]"
          width={36}
          height={36}
        />
        <GlobePlane className="absolute top-[609.56px] left-[1392px]" />
      </div>
    </div>
  );
}
