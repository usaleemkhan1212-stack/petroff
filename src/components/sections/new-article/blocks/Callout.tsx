import type { FC, SVGProps } from "react";

/**
 * The article's two callouts. They share an anatomy — a 24px glyph beside a
 * pill, a 20px title, a body — and agree on 18px corners, 28px padding and an
 * 8px stack, but nothing else:
 *
 * - `rule` is Figma's `rulebox`: white, a periwinkle hairline all round with
 *   the left edge thickened to 5px, and a pale-periwinkle pill in plain
 *   `text-button` encre.
 * - `trap` is Figma's `trap`: **lilas**, no border, and a **stone** pill in
 *   brique carrying the overline's 0.18em tracking. It has been pale gold,
 *   then pale rose at 30% with a red tag, and is now this.
 */
const variants = {
  rule: {
    box: "border-periwinkle border border-l-5 bg-white",
    tag: "text-button bg-pale-periwinkle text-encre",
    icon: "text-encre",
  },
  trap: {
    box: "bg-lilas",
    tag: "text-overline uppercase bg-stone text-brique",
    /* `13318:2729` strokes the glyph #A67C1B, matching its tag — it was encre. */
    icon: "text-brique",
  },
} as const;

export function Callout({
  variant = "rule",
  tag,
  title,
  Icon,
  children,
}: {
  variant?: keyof typeof variants;
  tag: string;
  title: string;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-note-lg flex flex-col gap-2 p-5 sm:p-7 ${variants[variant].box}`}
    >
      <div className="flex items-center gap-3 pb-1">
        {Icon ? (
          <Icon
            aria-hidden="true"
            width={24}
            height={24}
            className={`shrink-0 ${variants[variant].icon}`}
          />
        ) : null}
        <span
          className={`font-poppins rounded-full px-3.5 py-1 ${variants[variant].tag}`}
        >
          {tag}
        </span>
      </div>
      <p className="text-h3 text-encre font-poppins">{title}</p>
      <div className="text-body text-encre">{children}</div>
    </div>
  );
}
