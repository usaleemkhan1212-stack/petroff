import type { ReactNode } from "react";

/**
 * Figma's `reflist`: the texts this article rests on, one ruled row each.
 * Same ruled anatomy as `vigil`, but every row ends in its own link.
 */
export function RefList({ children }: { children: ReactNode }) {
  return <ul className="border-encre/10 border-t">{children}</ul>;
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
