import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "gold" | "red";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  solid: "bg-encre text-white hover:bg-encre/90",
  outline: "border-[1.5px] border-encre text-encre hover:bg-encre/5",
  gold: "bg-gold text-white hover:bg-brique",
  /* Petroff/Red — the home page consultation drawer's submit. */
  red: "bg-red text-white hover:bg-red/90",
};

/** sm = header (20/12), md = search band (28/12), lg = hero (28/16). */
const sizes: Record<Size, string> = {
  sm: "px-5 py-3",
  md: "px-7 py-3",
  lg: "px-7 py-4",
};

const base =
  "inline-flex cursor-pointer items-center justify-center gap-3 rounded-full " +
  "text-button font-poppins whitespace-nowrap transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * The pill's classes on their own, for the rare CTA that has to be an `<a>`
 * rather than a `<button>` — a `tel:` link is the case that forced this, since
 * dialling is a real href and nothing else on the site can express it.
 *
 * Reach for `Button` everywhere else; this exists so an anchor can wear the
 * same pill without the class string being copied out of this file.
 */
export function buttonClasses({
  variant = "solid",
  size = "sm",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, sizes[size], variants[variant], className);
}

/**
 * Pill button. Always a real <button> — nothing on the home page navigates
 * yet, so buttons deliberately carry no href. When the routes exist, wrap the
 * call site in a Link from "@/i18n/navigation" rather than reviving an href
 * prop here.
 */
export function Button({
  variant = "solid",
  size = "sm",
  className,
  children,
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}
