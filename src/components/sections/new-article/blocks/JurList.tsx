import type { ReactNode } from "react";

/**
 * Figma's `jur-list` (`13318:2926`): five decision cards on a 24px gap —
 * white, an 18px corner, a hairline `encre/8` border and 28 of padding.
 *
 * Citation first, in **brique** at Inter SemiBold 16/1.45, then the holding as
 * a 20px title and the facts beneath, the three on the card's own **12px gap**
 * (`13424:15804`). They were built flush, which read as one run of text
 * rather than three fields.
 */
export function JurList({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col gap-6">{children}</ul>;
}

export function JurCard({
  citation,
  title,
  children,
}: {
  citation: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="rounded-note-lg border-encre/8 flex flex-col gap-3 border bg-white p-5 sm:p-7">
      <p className="text-small-strong text-brique">{citation}</p>
      <h3 className="text-h3 text-encre">{title}</h3>
      <p className="text-body text-encre/62">{children}</p>
    </li>
  );
}
