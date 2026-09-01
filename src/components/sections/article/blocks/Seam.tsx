import Image from "next/image";
import lawyerPortrait from "@/assets/images/lawyer-portrait-inline.jpg";
import { ConsultTrigger } from "@/components/consultation/ConsultButton";

/**
 * Figma's `seam` (`13318:2715`, `13318:3562`): the strip that breaks up the
 * long runs of prose, carrying a portrait, two lines and a link.
 *
 * **Pale mint since the redesign**, where it was lilas with a gold left edge,
 * and a **photograph** where it was the composed `lawyer-figure.svg`. Its
 * corners are 54px at the top left and 16 elsewhere, and the link now sits
 * under the copy rather than off to the right — which is most of why the block
 * grew from 124 to 220.
 */
export function Seam({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="bg-pale-mint flex items-center rounded-tl-[54px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] p-5 sm:py-7 sm:pr-9 sm:pl-9 lg:pr-16">
      <div className="flex min-w-0 flex-1 items-center gap-7">
        <div className="relative hidden h-41 w-35.25 shrink-0 overflow-hidden rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px] sm:block">
          <Image
            src={lawyerPortrait}
            alt=""
            fill
            sizes="141px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-5">
          <p className="text-encre min-w-0">
            <span className="text-body-strong">{title}</span>{" "}
            <span className="text-body">{body}</span>
          </p>
          <ConsultTrigger className="text-button font-poppins text-periwinkle w-fit">
            {cta}
          </ConsultTrigger>
        </div>
      </div>
    </div>
  );
}
