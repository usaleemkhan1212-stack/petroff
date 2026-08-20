import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "gold";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  solid: "bg-encre text-white hover:bg-encre/90",
  outline: "border-[1.5px] border-encre text-encre hover:bg-encre/5",
  gold: "bg-gold text-white hover:bg-brique",
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
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
