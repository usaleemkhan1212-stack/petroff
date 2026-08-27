import Image from "next/image";
import { useTranslations } from "next-intl";
import ParisSkyline from "@/assets/icons/paris-skyline.svg";
import lawyerPortrait from "@/assets/images/lawyer-portrait.jpg";

/**
 * The 450x414 skyline panel with a polaroid leaning over its left edge.
 *
 * Figma builds the skyline as eight separately-masked pieces sharing one mask
 * the shape of the panel. That is a single scene, so it ships as a single
 * `paris-skyline.svg` composed at the exact mask-position offsets, and the
 * panel's own `overflow-hidden` does the clipping — which avoids five new
 * sized copies of the arc, Eiffel tower, Haussmann block and stars.
 *
 * The whole composition is decorative except the polaroid caption, which is
 * real copy. It appears from xl only: its 511px stage plus the 692px copy
 * column needs 1203, which does not fit the container at lg — the same reason
 * the Cabinet collage waits for xl.
 */
export function HeroIllustration() {
  const t = useTranslations("BibliothequePage.hero");

  return (
    <div className="relative hidden h-103.5 w-127.75 shrink-0 xl:block">
      {/* Sanctioned ornament exception: the literal Figma corner radii. */}
      <div className="bg-lilas-2 absolute top-0 right-0 h-103.5 w-112.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
        <ParisSkyline width={450} height={414} aria-hidden="true" />
      </div>

      {/*
        Leans off the panel's left edge, rotated -8deg as the comp draws it.
        Figma's 0/122 is the *bounding box* of the rotated frame, but CSS
        rotates about the centre, so the untransformed box has to sit at
        13.36/131.46 for its bounding box to land there. Ornament
        coordinates, so literal px — the sanctioned exception.
      */}
      <figure className="absolute top-[131.46px] left-[13.36px] h-[202px] w-[150px] -rotate-8 rounded-tl-[60px] rounded-tr-[8px] rounded-br-[30px] rounded-bl-[30px] bg-white drop-shadow-[0px_16px_18px_rgba(18,42,76,0.16)]">
        {/* Figma places the print at (13.42, 12.31) at a flat 120 square, with
            the same asymmetric radii every other portrait on the site carries.
            It is a plain crop now — the pale-blue `mix-blend-color` duotone and
            the 90% opacity the frame used to draw are both gone. */}
        <div className="absolute top-[12.31px] left-[13.42px] size-[120px] overflow-hidden rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px]">
          <Image
            src={lawyerPortrait}
            alt=""
            width={378}
            height={360}
            sizes="120px"
            className="h-full w-full object-cover"
          />
        </div>
        <figcaption className="text-button font-poppins text-encre absolute top-[142px] left-1/2 w-[126px] -translate-x-1/2 text-center">
          {/* Designed line break — it wraps after "des" without it. */}
          {t.rich("polaroid", { br: () => <br /> })}
        </figcaption>
      </figure>
    </div>
  );
}
