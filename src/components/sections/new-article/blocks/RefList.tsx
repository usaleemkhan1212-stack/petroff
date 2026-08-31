"use client";

import { Children, useState, type ReactNode } from "react";

/** Figma lists four rows and puts the rest behind the button. */
const COLLAPSED = 4;

/**
 * Figma's `reflist` (`13318:2847`): the source texts as ruled rows, closing
 * with an outline button that counts the ones not shown.
 *
 * **The button works.** It takes every reference as a child and shows the
 * first four until it is pressed — all thirteen are in the data, which is what
 * the "+9" counts, and the template shows all thirteen with no button at all.
 * So the collapse is Figma's idea and the expansion is the only reading of it
 * that is not a dead control.
 */
export function RefList({
  id,
  more,
  less,
  children,
}: {
  id: string;
  more: string;
  less: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rows = Children.toArray(children);

  return (
    <div className="flex flex-col gap-6">
      <ul id={id} className="flex flex-col gap-6">
        {open ? rows : rows.slice(0, COLLAPSED)}
      </ul>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={
          "text-button font-poppins text-encre border-encre hover:bg-encre/5 focus-visible:outline-gold w-fit cursor-pointer rounded-full border-[1.5px] px-12 py-2.75 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        }
      >
        {open ? less : more}
      </button>
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
