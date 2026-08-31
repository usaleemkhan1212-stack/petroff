import type { ReactNode } from "react";

/**
 * Figma's `tl`: numbered steps on a vertical rail.
 *
 * The rail is drawn per item — from under one dot to the next — rather than
 * as one line down the list. A single line has to know where the last dot is,
 * and a `bottom-` guess left it running past the end whenever the last step's
 * body was tall. `group-last:hidden` drops the connector on the final item.
 */
export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="flex flex-col gap-6.5">{children}</ol>;
}

export function TimelineItem({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="group relative flex items-start gap-6.5">
      {/* Dot bottom (25) to the next dot's centre (44 past this item). */}
      <span
        aria-hidden="true"
        className="bg-pale-periwinkle absolute top-6.25 -bottom-11 left-1.5 w-0.5 group-last:hidden"
      />
      {/* The white ring is what lifts the dot off the rail behind it. */}
      <span
        aria-hidden="true"
        className="bg-periwinkle relative mt-2.75 size-3.5 shrink-0 rounded-full border-4 border-white"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-overline font-poppins text-brique uppercase">{step}</p>
        <h3 className="text-h3 text-encre">{title}</h3>
        <p className="text-body text-encre/62">{children}</p>
      </div>
    </li>
  );
}
