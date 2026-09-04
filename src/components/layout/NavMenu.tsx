"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { NavLink } from "@/components/layout/NavLink";
import type { NavChild } from "@/lib/nav";

/**
 * A primary nav entry plus its dropdown, for the desktop header. Serves the
 * Expertises domains and the Bibliotheque's extra pages, which is why child
 * labels arrive as full message paths rather than keys in one namespace.
 *
 * The parent links to its own page when that page exists — Le Cabinet's does
 * not yet, so it renders as a span — and the caret beside it opens the list.
 * Pointer users get it on hover, everyone else on click, and it closes on
 * Escape or a click outside. Every entry is a page that exists — `nav.ts`
 * builds the list from `routes.ts` — so these are plain links.
 */
export function NavMenu({
  id,
  label,
  menuLabel,
  href,
  items,
}: {
  /** Unique per menu: two dropdowns cannot share one aria-controls target. */
  id: string;
  label: string;
  menuLabel: string;
  href: string;
  items: readonly NavChild[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  /* No namespace: children carry full message paths. */
  const t = useTranslations();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative flex items-center gap-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* NavLink wraps MaybeLink, so a parent can carry a submenu while its
          own page does not exist yet — Le Cabinet is the first — and nothing
          on the site may navigate to a 404. It also marks itself brique when
          the page being read is this section or one below it. */}
      <NavLink href={href} className="text-small whitespace-nowrap">
        {label}
      </NavLink>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-submenu`}
        className="text-encre hover:text-periwinkle flex size-5 items-center justify-center transition-colors"
      >
        <span className="sr-only">{menuLabel}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open ? (
        /*
          The wrapper carries the offset as PADDING, not margin, so the gap
          between the caret and the panel is still inside this subtree. With a
          margin the pointer crossed dead space on its way down, onMouseLeave
          fired, and the menu closed before it could be reached. pt-8 clears
          the 72px header row — this div is centred in it, so top-full alone
          would open over the bottom border — and leaves 8px under it.
        */
        <div className="absolute top-full right-0 z-20 pt-8">
          <ul
            id={`${id}-submenu`}
            className="border-encre/8 rounded-card w-max max-w-80 border bg-white py-2 shadow-[0px_14px_17px_rgba(0,0,0,0.1)]"
          >
            {items.map((item) => (
              <li key={item.key}>
                <NavLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-small block px-4 py-2.5"
                >
                  {t(item.labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
