import Image from "next/image";
import lawyerPortrait from "@/assets/images/lawyer-portrait-inline.jpg";

/**
 * Figma's `seam` (`13318:2715`, `13318:3562`): the strip that breaks up the
 * long runs of prose — **lilas-2**, a 54px top-left corner against 16 on the
 * other three, 36 of padding on the left against 64 on the right, and a
 * 140.657x164 portrait beside two lines and a **filled gold button**.
 *
 * The portrait is the stored `lawyer-portrait-inline.jpg`, which is already
 * 422x492 — exactly 3x this box.
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
    <div className="bg-lilas-2 flex items-center rounded-tl-[54px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] p-5 sm:py-7 sm:pr-9 sm:pl-9 lg:pr-16">
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
          <span className="text-button font-poppins bg-gold w-fit rounded-full px-7 py-4 text-white">
            {cta}
          </span>
        </div>
      </div>
    </div>
  );
}
