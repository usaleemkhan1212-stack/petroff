import { cn } from "@/lib/utils";

/**
 * White surface used across the card grids: 20px radius, hairline encre
 * border, and the designed shadow raised on hover.
 */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-encre/7 rounded-card border bg-white transition-shadow",
        "hover:shadow-[0px_14px_17px_rgba(0,0,0,0.1)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
