import type { ReactNode } from "react";

/**
 * Figma's `tl` (`13318:2754`): four steps on a 26px gap, each a 14px
 * periwinkle dot with a 4px white ring beside a step label, a title and a body.
 *
 * **The rail is drawn per item, not once.** Figma pins a single 2px
 * pale-periwinkle bar at a fixed 435px height, which only holds at the width
 * it was measured on — any reflow leaves it short or running past the last
 * dot. Each item draws its own connector instead and the last one drops it, so
 * the line always starts and stops on a dot.
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
      <span
        aria-hidden="true"
        className="bg-pale-periwinkle absolute top-3.5 -bottom-6.5 left-1.5 w-0.5 group-last:hidden"
      />
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
