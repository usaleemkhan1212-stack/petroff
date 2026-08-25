import type { ReactNode } from "react";

/**
 * Figma's `reflist`: the texts this article rests on, one ruled row each.
 * Same ruled anatomy as `vigil`, but every row ends in its own link.
 *
 * **Since the redesign it shows only the first four**, closed by an outline
 * button offering the other nine — the block went from 1124px to 430. All
 * thirteen references stay in the data, which is what the "+9" counts.
 */
export function RefList({ children, more }: { children: ReactNode; more: string }) {
  return (
    <div className="border-encre/10 flex flex-col items-start gap-2 border-t">
      <ul className="w-full">{children}</ul>
      {/* Inert like every other control on this page. */}
      <span className="text-button font-poppins text-encre border-encre rounded-full border-[1.5px] px-12 py-2.75">
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
    <li className="border-encre/10 flex flex-wrap items-center gap-5 border-b py-4">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-h4 font-poppins text-encre">{reference}</p>
        <p className="text-body text-encre/62">{summary}</p>
      </div>
      <span className="text-button font-poppins text-periwinkle shrink-0">
        {cta}
      </span>
    </li>
  );
}
