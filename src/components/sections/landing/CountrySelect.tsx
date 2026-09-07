"use client";

import { useEffect, useId, useRef, useState } from "react";

import { CountryFlag, type CountryCode } from "./flags";

/**
 * The phone field's country control.
 *
 * **It is a listbox, not a `<select>`, and the flags are why.** A native select
 * can only render text in its options, so a flag there has to be an emoji — and
 * Chrome on Windows ships no regional-indicator glyphs, which is what made the
 * control read "FR +33" instead of showing a flag. A button plus a
 * `role="listbox"` panel can draw the SVG artwork in both the closed control and
 * the open list, and it looks the same on every platform.
 *
 * It keeps the native keyboard contract: Enter, Space or either arrow opens it,
 * the arrows and Home/End move the highlight, Enter or Space commits, Escape and
 * Tab close, and a click outside closes. **Focus stays on the button** with
 * `aria-activedescendant` pointing at the highlighted option — the combobox
 * pattern, not a roving tabindex, which is the shape `ui/Select.tsx` already
 * uses on the article's simulator.
 *
 * The list is **not exhaustive**: it covers the markets this page names in its
 * own trust strip — "UK, US, EU, Gulf, Asia" — plus Bulgaria from the firm's
 * languages line, and it deliberately omits countries whose flags cannot be
 * drawn faithfully at 21px rather than drawing them badly. It needs the firm's
 * own list before launch.
 */
/** The panel’s natural width; it shrinks if the form is narrower. */
const PANEL_W = 256;

export type Country = { code: CountryCode; name: string; dial: string };

export const COUNTRIES: Country[] = [
  { code: "FR", name: "France", dial: "+33" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "LU", name: "Luxembourg", dial: "+352" },
  { code: "BG", name: "Bulgaria", dial: "+359" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "IN", name: "India", dial: "+91" },
];

export function CountrySelect({ name }: { name: string }) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  /*
    Where the panel sits, measured rather than assumed. The trigger is a ~55px
    control that can sit in either column of a two-up row, so neither `left-0`
    nor `right-0` is safe: left-aligned it ran 52px past the drawer's edge (and
    `overflow-y-auto` makes `overflow-x` compute to `auto`, so the drawer became
    horizontally scrollable); right-aligned it would hang off the left on a
    phone. So it is placed against the form's own box on open.
  */
  const [panel, setPanel] = useState({ left: 0, width: PANEL_W });
  const chosen = COUNTRIES[index];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  /** Clamp the panel inside the form, and return the offset from the trigger. */
  const place = () => {
    const root = rootRef.current;
    if (!root) return;
    const bounds = root
      .closest("[data-lp-form]")
      ?.getBoundingClientRect();
    if (!bounds) return setPanel({ left: 0, width: PANEL_W });
    const width = Math.min(PANEL_W, bounds.width);
    const from = root.getBoundingClientRect().left;
    let target = from;
    if (target + width > bounds.right) target = bounds.right - width;
    if (target < bounds.left) target = bounds.left;
    setPanel({ left: target - from, width });
  };

  const commit = (i: number) => {
    setIndex(i);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        place();
        setActive(index);
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, COUNTRIES.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(COUNTRIES.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commit(active);
    }
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      {/* The dial code travels with the form even though the control is custom. */}
      <input type="hidden" name={name} value={chosen.dial} readOnly />
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-label={`Country dial code — ${chosen.name} ${chosen.dial}`}
        onClick={() => {
          place();
          setActive(index);
          setOpen((o) => !o);
        }}
        onKeyDown={onKeyDown}
        /*
          `leading-[26px]` is Figma's own flag line, and it is what keeps this
          field 58 tall where its neighbours are 56.
        */
        className="text-small text-encre font-inter flex cursor-pointer items-center gap-1 leading-[26px] focus:outline-none"
      >
        <CountryFlag code={chosen.code} className="shrink-0" />
        <span>{chosen.dial}</span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Country"
          style={{ left: panel.left, width: panel.width }}
          className="border-encre/12 absolute top-[calc(100%+8px)] z-20 max-h-64 overflow-y-auto rounded-[12px] border bg-white py-1 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)]"
        >
          {COUNTRIES.map((c, i) => (
            <li
              key={c.code}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === index}
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(i)}
              className={`text-small flex cursor-pointer items-center gap-3 px-3 py-2 ${
                i === active ? "bg-lilas" : ""
              }`}
            >
              <CountryFlag code={c.code} className="shrink-0" />
              <span className="text-encre min-w-0 flex-1 truncate">
                {c.name}
              </span>
              <span className="text-encre/62 shrink-0">{c.dial}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
