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
      <figure className="absolute top-[131.46px] left-[13.36px] w-[150px] -rotate-8 rounded-lg bg-white px-3 pt-3 pb-5.5 drop-shadow-[0px_16px_18px_rgba(18,42,76,0.16)]">
        <div className="relative h-30 w-31.5 overflow-hidden rounded">
          <Image
            src={lawyerPortrait}
            alt=""
            width={378}
            height={360}
            sizes="126px"
            className="h-full w-full object-cover opacity-90"
          />
          {/*
            Figma tints the print with pale blue on a `color` blend, which
            keeps the photo's luminosity and takes the tint's hue — a duotone,
            not an overlay.
          */}
          <span
            aria-hidden="true"
            className="bg-pale-blue absolute inset-0 mix-blend-color"
          />
        </div>
        <figcaption className="text-button font-poppins text-encre mt-2.5 text-center">
          {/* Designed line break — it wraps after "des" without it. */}
          {t.rich("polaroid", { br: () => <br /> })}
        </figcaption>
      </figure>
    </div>
  );
}
