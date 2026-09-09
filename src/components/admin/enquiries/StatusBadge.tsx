"use client";

import { cn } from "@/lib/utils";
import { STATUS_LABELS, type EnquiryStatus } from "@/lib/enquiries";

/**
 * The four statuses, in the site's own tokens.
 *
 * New is gold because it is the one that wants attention; in progress is
 * periwinkle, closed a quiet encre, and spam red. Nothing here carries a hex.
 */
const TONES: Record<EnquiryStatus, string> = {
  new: "bg-gold/16 text-brique",
  in_progress: "bg-periwinkle/12 text-periwinkle",
  closed: "bg-encre/8 text-encre/62",
  spam: "bg-red/10 text-red",
};

export function StatusBadge({
  status,
  className,
}: {
  status: EnquiryStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-poppins inline-flex shrink-0 items-center rounded-[7px] px-2 py-1 text-[11.5px] font-semibold whitespace-nowrap",
        TONES[status],
        className,
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
