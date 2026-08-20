import { cn } from "@/lib/utils";

/**
 * Standard page width. --container-page (1245px) is the CONTENT width, matching
 * Figma, so the gutters sit outside it rather than eating into it. Putting the
 * padding and the max-width on one element would shrink the content to 1181px
 * under border-box, which silently narrows every section.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("px-5 sm:px-8", className)}>
      <div className="max-w-page mx-auto w-full">{children}</div>
    </div>
  );
}
