import type { ReactNode } from "react";

/**
 * Figma's `reflist` (`13318:2847`): the source texts as ruled rows on a 24px
 * gap, closing with an outline button that counts the ones not shown.
 *
 * The frame lists **four** rows and puts the rest behind that button; all
 * thirteen references stay in the data, which is what the "+9" counts.
 */
export function RefList({ more, children }: { more: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-6">{children}</ul>
      {/* Inert until the library routes exist. */}
      <span className="text-button font-poppins text-encre border-encre w-fit rounded-full border-[1.5px] px-12 py-2.75 text-center">
        {more}
      </span>
    </div>
  );
}

export function RefRow({
  reference,
  summary,
  cta,
}: {
  reference: string;
  summary: string;
  cta: string;
}) {
  return (
    <li className="border-encre/10 flex flex-wrap items-center gap-5 border-b pb-4">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-h4 font-poppins text-encre">{reference}</p>
        <p className="text-body text-encre/62">{summary}</p>
      </div>
      <span className="text-button font-poppins text-periwinkle shrink-0">{cta}</span>
    </li>
  );
}
