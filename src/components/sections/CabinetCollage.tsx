import { useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import CircleBackdrop from "@/assets/icons/circle-backdrop.svg";
import ColumnedBuilding from "@/assets/icons/columned-building.svg";
import Sparkle from "@/assets/icons/sparkle.svg";
import champsElysees from "@/assets/images/champs-elysees.jpg";
import teamMeeting from "@/assets/images/team-meeting.jpg";

/** Photo box in the comp; the sources are stored at 3x for high-DPR screens. */
const PHOTO_W = 190;
const PHOTO_H = 150;

/**
 * A tilted photo print. Figma pads the white card 12px on three sides and 20px
 * below the caption, which is what gives it the classic bottom-heavy border.
 */
function Polaroid({
  photo,
  caption,
  className,
}: {
  photo: StaticImageData;
  caption: string;
  className: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-2 rounded-[6px] bg-white px-3 pt-3 pb-5 shadow-[0px_16px_40px_0px_rgba(33,29,51,0.18)]">
        <Image
          src={photo}
          alt=""
          width={PHOTO_W}
          height={PHOTO_H}
          sizes="190px"
          className="h-[150px] w-[190px] rounded-[3px] object-cover"
        />
        <p className="text-small text-encre/62 whitespace-nowrap">{caption}</p>
      </div>
    </div>
  );
}

/**
 * The collage beside the Cabinet copy: a pale disc, a columned building, a
 * sparkle and two tilted photo prints.
 *
 * Like HeroOrnaments this is the sanctioned exception to the no-absolute-layout
 * rule — the offsets are the literal Figma coordinates on its 548x440 stage,
 * and the wrapper boxes are the rotated bounding boxes Figma reports, so each
 * print keeps its exact centre and tilt.
 *
 * Shown from xl only: below that the column is narrower than the 548px stage
 * and the second print would be cut. The captions repeat what the heading and
 * lead already say, so nothing is lost when it is hidden.
 */
export function CabinetCollage() {
  const t = useTranslations("Cabinet.collage");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative hidden h-110 w-full overflow-hidden xl:block"
    >
      <CircleBackdrop className="absolute top-[44px] left-[230px]" />
      <ColumnedBuilding className="absolute top-[328px] left-0" />
      <Sparkle className="absolute top-0 left-[60px]" width={46} height={46} />

      <Polaroid
        photo={champsElysees}
        caption={t("paris")}
        className="absolute top-[60px] left-[171.28px] flex size-[231.837px] rotate-5 items-center justify-center"
      />
      <Polaroid
        photo={teamMeeting}
        caption={t("international")}
        className="absolute top-[143.02px] left-[320px] flex size-[228.407px] -rotate-4 items-center justify-center"
      />
    </div>
  );
}
