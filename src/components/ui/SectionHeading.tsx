import { cn } from "@/lib/utils";

/** Mirrors Logo's tone prop: the same block re-coloured for a dark ground. */
const tones = {
  onLight: {
    overline: "text-brique",
    title: "text-encre",
    lead: "text-encre/62",
  },
  onDark: {
    overline: "text-gold",
    title: "text-white",
    lead: "text-white/70",
  },
} as const;

/**
 * Overline + H2 + lead, the heading block every content section shares.
 */
export function SectionHeading({
  overline,
  title,
  lead,
  tone = "onLight",
  className,
  leadClassName,
}: {
  overline: string;
  title: string;
  lead?: string;
  tone?: keyof typeof tones;
  className?: string;
  /** Override the lead's 640px measure when a section designs it wider. */
  leadClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className={cn("text-overline font-poppins uppercase", tones[tone].overline)}>
        {overline}
      </p>
      <h2 className={cn("text-h2", tones[tone].title)}>{title}</h2>
      {lead ? (
        <p className={cn("text-body max-w-160", tones[tone].lead, leadClassName)}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
