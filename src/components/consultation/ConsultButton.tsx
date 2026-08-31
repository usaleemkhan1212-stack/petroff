"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useConsultation } from "@/components/consultation/ConsultationProvider";

/**
 * A `Button` that opens the consultation drawer.
 *
 * Server sections can render it directly — its children come across as
 * ordinary React nodes, and only the click handler lives on the client. Use it
 * for anything whose action is *contact the firm*; navigation CTAs stay
 * `MaybeLink` spans until their route exists.
 */
export function ConsultButton({
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick">) {
  const { onOpen } = useConsultation();
  return (
    <Button {...props} onClick={onOpen}>
      {children}
    </Button>
  );
}

/**
 * The same trigger for the CTAs that are written out rather than using
 * `Button` — the pill spans inside the article tools, the e-commerce cards and
 * the service page's panels, which each carry their own styling.
 */
export function ConsultTrigger({
  className,
  children,
  "aria-label": ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const { onOpen } = useConsultation();
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onOpen}
      className={cn(
        "focus-visible:outline-gold cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
    >
      {children}
    </button>
  );
}
