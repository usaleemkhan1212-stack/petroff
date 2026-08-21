import type { FC, SVGProps } from "react";

/**
 * The article's two callouts, which share an anatomy but not a look:
 *
 * - `rule` is Figma's `rulebox` — white, with its periwinkle border thickened
 *   to 5px on the left, and a plain `text-button` tag.
 * - `trap` is Figma's `trap` — pale gold, no border, and a brique tag that
 *   carries the **overline's 0.18em tracking** where the rule's does not.
 */
const variants = {
  rule: {
    box: "border-periwinkle border border-l-5 bg-white",
    tag: "text-button bg-pale-periwinkle text-encre",
  },
  trap: {
    box: "bg-pale-gold",
    tag: "text-overline bg-brique/16 text-brique",
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
      className={`rounded-note-lg flex flex-col gap-2 p-7 ${variants[variant].box}`}
    >
      <div className="flex items-center gap-3 pb-1">
        {Icon ? (
          <Icon
            aria-hidden="true"
            width={24}
            height={24}
            className="text-encre shrink-0"
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
