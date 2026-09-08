"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { PENDING } from "@/lib/admin";

import { Icon, type IconName } from "./icons";

/**
 * The admin's shared pieces, in the site's tokens.
 *
 * Nothing here carries a hex: grounds are `bg-white` / `bg-lilas`, the accent
 * is gold with brique for accent-as-text, hairlines are encre at the same 7 /
 * 8 / 13% the prototype used, and secondary copy is encre/62. The two
 * literals that remain are the card's 14px radius and its `0 1px 2px` shadow,
 * neither of which has a token — `--radius-card` is 20 and `Card`'s shadow is
 * the hover lift, so borrowing either would misstate the design.
 */

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-encre/7 rounded-[14px] border bg-white shadow-[0_1px_2px_rgba(18,42,76,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-poppins text-encre text-[14px] font-semibold">
      {children}
    </h2>
  );
}

export function Btn({
  variant = "default",
  icon,
  title,
  onClick,
  children,
}: {
  variant?: "default" | "primary" | "icon";
  icon?: IconName;
  title?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={variant === "icon" ? title : undefined}
      onClick={onClick}
      className={cn(
        "font-poppins inline-flex shrink-0 cursor-pointer items-center justify-center gap-[7px] text-[13px] font-semibold transition-colors",
        variant === "primary"
          ? // gold ground with encre copy: the accessible pairing, and what the
            // comp draws. The site's own gold buttons put white on gold, which
            // is fine at display sizes but thin at 13px.
            "bg-gold text-encre hover:bg-brique rounded-[11px] px-4 py-2.5 hover:text-white"
          : "border-encre/13 text-encre hover:border-gold/50 hover:text-brique rounded-[10px] border bg-white",
        variant === "icon" ? "size-[38px] p-0" : "",
        variant === "default" ? "px-3.5 py-2.5" : "",
      )}
    >
      {icon ? <Icon name={icon} size={15} /> : null}
      {children}
    </button>
  );
}

export function Chip({
  active,
  tone = "default",
  count,
  onClick,
  children,
}: {
  active?: boolean;
  /** `alert` is the red Uncategorised filter. */
  tone?: "default" | "alert";
  count?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "font-poppins flex cursor-pointer items-center gap-[7px] rounded-[10px] border px-3 py-2 text-[12.5px] font-semibold transition-colors",
        tone === "alert"
          ? "border-red/35 text-red hover:border-red/50 bg-white"
          : active
            ? "bg-gold/10 border-gold/50 text-brique"
            : "border-encre/13 text-encre hover:border-gold/50 bg-white",
      )}
    >
      {children}
      {count ? <span className="text-[11px] opacity-75">{PENDING}</span> : null}
    </button>
  );
}

export function Chips({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

/** The white toolbar that carries a search field and its actions. */
export function Bar({ children }: { children: React.ReactNode }) {
  return (
    <Card className="flex flex-wrap items-center gap-2.5 px-4 py-3.5">
      {children}
    </Card>
  );
}

export function SearchBox({ placeholder }: { placeholder: string }) {
  return (
    <label className="relative min-w-[220px] flex-1">
      <Icon
        name="search"
        size={15}
        className="text-encre/62 absolute top-1/2 left-3 -translate-y-1/2"
      />
      {/*
        `type="text"`, never `type="search"`: Chrome's search decoration
        reserves ~15px inside the field and adds a cancel button once there is
        a value, which clips the placeholder — the call this project's own
        SearchBand and OpenData lookup already make.
      */}
      <input
        type="text"
        placeholder={placeholder}
        className="bg-lilas text-encre placeholder:text-encre/62 focus:border-gold/50 w-full rounded-[10px] border border-transparent py-2.5 pr-3 pl-9 text-[13px] text-ellipsis outline-none"
      />
    </label>
  );
}

export function Select({
  id,
  defaultValue,
  options,
}: {
  id?: string;
  defaultValue?: string;
  options: string[];
}) {
  return (
    <select
      id={id}
      defaultValue={defaultValue}
      className="border-encre/13 text-encre focus:border-gold/50 rounded-[10px] border bg-white px-3 py-2.5 text-[13px] outline-none"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

export function EmptyState({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-encre/13 flex flex-col items-center rounded-[14px] border border-dashed bg-white px-6 py-16 text-center">
      <span className="bg-pale-gold text-brique mb-4 flex size-11 items-center justify-center rounded-[12px]">
        <Icon name={icon} size={20} />
      </span>
      <b className="font-poppins text-encre text-[17px] font-semibold">
        {title}
      </b>
      <p className="text-encre/62 mt-2 max-w-[62ch] text-[13.5px]">
        {children}
      </p>
    </div>
  );
}

/** A big number over its label. Renders the pending dot until data arrives. */
export function BigStat({ label }: { label: string }) {
  return (
    <div>
      <b className="font-poppins text-encre block text-[24px] leading-[1.1] font-bold tracking-[-0.5px]">
        {PENDING}
      </b>
      <span className="text-encre/62 mt-[3px] block text-[12px]">{label}</span>
    </div>
  );
}

export function StatRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3">
      {children}
    </div>
  );
}

/** A clickable counter tile — the enquiry filters along the top. */
export function StatTile({
  icon,
  label,
  active,
}: {
  icon: IconName;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className="border-encre/8 hover:border-gold/50 flex w-full cursor-pointer items-center gap-3 rounded-[14px] border bg-white px-4 py-3.5 text-left shadow-[0_1px_2px_rgba(18,42,76,0.04)] transition-colors"
    >
      <span
        className={cn(
          "flex size-[34px] shrink-0 items-center justify-center rounded-[10px]",
          active ? "bg-gold text-white" : "bg-encre/5 text-brique",
        )}
      >
        <Icon name={icon} size={16} />
      </span>
      <span>
        <b className="font-poppins text-encre block text-[20px] leading-[1.15] font-bold tracking-[-0.4px]">
          {PENDING}
        </b>
        <span className="text-encre/62 block text-[12px]">{label}</span>
      </span>
    </button>
  );
}

export function Field({
  id,
  label,
  hint,
  full,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", full && "sm:col-span-2")}>
      <label htmlFor={id} className="text-encre text-[12.5px] font-semibold">
        {label}
      </label>
      {children}
      {hint ? (
        <span className="text-encre/62 text-[12px]">{hint}</span>
      ) : null}
    </div>
  );
}

export const fieldInput =
  "border-encre/13 text-encre placeholder:text-encre/62 focus:border-gold/50 w-full rounded-[10px] border bg-white px-3 py-2.5 text-[13px] outline-none";

export function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

/** A real `role="switch"`, so it announces its state and works from the keyboard. */
export function SwitchRow({
  title,
  note,
  defaultOn = false,
}: {
  title: string;
  note: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="border-encre/7 flex items-center gap-4 border-t py-3.5 first:border-t-0">
      <span className="min-w-0 flex-1">
        <b className="font-poppins text-encre block text-[13.5px] font-semibold">
          {title}
        </b>
        <span className="text-encre/62 block text-[12px]">{note}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={title}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative h-[23px] w-10 shrink-0 cursor-pointer rounded-full transition-colors",
          on ? "bg-gold" : "bg-encre/18",
        )}
      >
        <span
          className={cn(
            "absolute top-[3px] size-[17px] rounded-full bg-white transition-[left]",
            on ? "left-5" : "left-[3px]",
          )}
        />
      </button>
    </div>
  );
}
