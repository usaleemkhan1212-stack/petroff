import { cn } from "@/lib/utils";

/**
 * Overline + H2 + lead, the heading block every content section shares.
 */
export function SectionHeading({
  overline,
  title,
  lead,
  className,
  leadClassName,
}: {
  overline: string;
  title: string;
  lead?: string;
  className?: string;
  /** Override the lead's 640px measure when a section designs it wider. */
  leadClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="text-overline font-poppins text-brique">{overline}</p>
      <h2 className="text-h2 text-encre">{title}</h2>
      {lead ? (
        <p className={cn("text-body text-encre/62 max-w-160", leadClassName)}>{lead}</p>
      ) : null}
    </div>
  );
}
