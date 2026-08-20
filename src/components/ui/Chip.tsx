import { cn } from "@/lib/utils";

type Tone = "onDark" | "onLight";

const tones: Record<Tone, string> = {
  onDark: "border-white/35 text-white hover:bg-white/10",
  onLight: "border-encre/35 text-encre hover:bg-encre/5",
};

/** Small pill used for tags and quick-filter actions. */
export function Chip({
  tone = "onDark",
  className,
  children,
  ...props
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "text-small cursor-pointer rounded-full border px-4 py-2 transition-colors",
        "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
