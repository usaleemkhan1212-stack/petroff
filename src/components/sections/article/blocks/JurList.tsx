import type { ReactNode } from "react";

/** Figma's `jur-list`: one white card per decision, citation first. */
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
    <li className="rounded-note-lg border-encre/8 flex flex-col border bg-white p-7">
      <p className="text-small-strong text-brique">{citation}</p>
      <h3 className="text-h3 text-encre mt-1">{title}</h3>
      <p className="text-body text-encre/62 mt-2">{children}</p>
    </li>
  );
}
