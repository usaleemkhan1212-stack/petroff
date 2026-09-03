import ColumnedBuilding from "@/assets/icons/columned-building.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import MorrisColumn from "@/assets/icons/morris-column-lg.svg";
import OpenBook from "@/assets/icons/open-book.svg";
import Sparkle from "@/assets/icons/sparkle.svg";
import ThreeFigures from "@/assets/icons/three-figures.svg";

/**
 * Decorative illustrations framing the Droit des sociétés hero — literal Figma
 * coordinates on a 1920x720 stage, as on all sibling domain pages.
 *
 * **Eight ornaments, eight reuses — no new asset in this hero**, which is a
 * first for a domain page. Two are worth recording:
 *
 * - **`morris-column-lg.svg` reuses at 119x206 where the small file could
 *   not.** Figma keeps `stroke-width` 4 at this box; the 86.842x150 file would
 *   render it 5.49 (37% too thick), while the 127x198 fork renders 3.95 —
 *   1.3%. The same pair being a reuse at one box and a fork at another is the
 *   third time on this build, after `calendar-dots` and `key`.
 * - **`columned-building.svg` is the pale-periwinkle original**, not the
 *   `-pale-blue` fork — confirmed from the export's own `#C7D6EF` fills, not
 *   inferred. It carries no strokes, so its non-uniform stretch to 223x161 is
 *   exact.
 *
 * `open-book.svg` is the mint version (this frame names Petroff/Mint and the
 * export fills `#44CBA1`), and the three figures are mirrored — Figma composes
 * a 180° rotation with a vertical flip, which is a horizontal flip.
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
          className="absolute top-[10px] left-[335px]"
          width={120}
          height={90}
        />
        <ThreeFigures
          className="absolute top-[137px] left-[197px] -scale-x-100"
          width={176}
          height={135}
        />
        <Sparkle className="absolute top-[297px] left-[385px]" width={46} height={46} />
        <ColumnedBuilding
          className="absolute top-[582px] left-[273px]"
          width={223}
          height={161}
        />
        <Sparkle className="absolute top-[91px] left-[1549px]" width={36} height={36} />
        <EiffelTowerColour
          className="absolute top-[30px] left-[1620px]"
          width={140}
          height={271}
        />
        <LaurelBranch
          className="absolute top-[343px] left-[1456px]"
          width={120}
          height={150}
        />
        <MorrisColumn
          className="absolute top-[527px] left-[1547px]"
          width={119}
          height={206}
        />
      </div>
    </div>
  );
}
