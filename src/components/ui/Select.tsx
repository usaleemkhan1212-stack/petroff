"use client";

import { useEffect, useRef, useState } from "react";
import CaretDown from "@/assets/icons/caret-down.svg";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string };

/**
 * A dropdown whose open list is **exactly as wide as its control**.
 *
 * A native `<select>` cannot do that: the browser draws its popup itself and
 * sizes it to the longest option, so it spills past the field — and no CSS
 * reaches it. This is a listbox instead, so the panel is `left-0 right-0` on
 * the control and a long label wraps inside it rather than widening it.
 *
 * It keeps the native keyboard contract: Enter, Space or either arrow opens
 * it, the arrows and Home/End move the highlight, Enter or Space commits,
 * Escape and Tab close, and a click outside closes. Focus stays on the button
 * and `aria-activedescendant` points at the highlighted option, which is the
 * combobox pattern rather than a roving tabindex.
 */
export function Select({
  id,
  value,
  options,
  onChange,
  className,
  labelledBy,
}: {
  id: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (next: string) => void;
  className?: string;
  labelledBy?: string;
}) {
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const [active, setActive] = useState(selectedIndex);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  /* Keep the highlighted option in view when the list scrolls. */
  useEffect(() => {
    if (!open) return;
    list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const commit = (index: number) => {
    onChange(options[index].value);
    setActive(index);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        setActive(selectedIndex);
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commit(active);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        e.key === "ArrowDown"
          ? Math.min(i + 1, options.length - 1)
          : Math.max(i - 1, 0),
      );
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    }
  };

  return (
    <div ref={root} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={labelledBy}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => {
          setActive(selectedIndex);
          setOpen((o) => !o);
        }}
        onKeyDown={onKeyDown}
        className={cn(className, "flex items-center justify-between gap-3")}
      >
        <span className="min-w-0 flex-1 truncate text-left">
          {options[selectedIndex]?.label}
        </span>
        <CaretDown
          aria-hidden="true"
          width={12}
          height={8}
          className={cn(
            "text-encre shrink-0 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={labelledBy}
          /* left-0 right-0 is the whole point: the panel takes the control's
             width, so a long label wraps instead of widening it. */
          className="rounded-field border-encre/12 absolute top-full right-0 left-0 z-20 mt-2 max-h-64 overflow-y-auto border bg-white py-1.5 shadow-[0px_14px_34px_0px_rgba(18,42,76,0.12)]"
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={option.value === value}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => commit(i)}
              className={cn(
                "text-body cursor-pointer px-4.5 py-2.5 leading-snug",
                i === active ? "bg-lilas-2 text-encre" : "text-encre/80",
                option.value === value && "text-body-strong text-encre",
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
