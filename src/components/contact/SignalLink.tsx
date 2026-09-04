import { ConsultTrigger } from "@/components/consultation/ConsultButton";
import { cn } from "@/lib/utils";

/**
 * `Signalez-la-nous.` — the closing run of the shared `Transparence` block, on
 * all five pages that draw it.
 *
 * It is a **button that opens the contact form**, not a span: reporting an
 * inaccuracy is an ask for the firm, which is what that dialog is for. Asked
 * for.
 *
 * Figma's redesigned node (`13318:3325`) styles it **Inter Regular 16/1.5 in
 * `#2e5bb8`** — `text-small` plus Petroff/Periwinkle. Note the service page's
 * older node (`13445:17942`) still draws it Inter **SemiBold** in rose; the
 * newer treatment is the one applied everywhere, on the same footing as the
 * uppercase eyebrows and the gold bullet.
 *
 * `tone="inherit"` is for the Bibliotheque hub, whose block is the only dark
 * one: periwinkle on encre is 2.2:1, and that frame draws its whole closing
 * line rose anyway. See the note in CLAUDE.md.
 */
export function SignalLink({
  children,
  tone = "periwinkle",
}: {
  children: React.ReactNode;
  tone?: "periwinkle" | "inherit";
}) {
  return (
    <ConsultTrigger
      className={cn(
        "text-small align-baseline hover:underline",
        tone === "periwinkle" && "text-periwinkle",
      )}
    >
      {children}
    </ConsultTrigger>
  );
}
