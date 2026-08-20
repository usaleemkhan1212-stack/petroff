import { Link } from "@/i18n/navigation";
import { isLive } from "@/lib/routes";

/**
 * Renders a real link when `href` points at a page that exists, and a plain
 * span with the same styling when it does not. Keeps the design's link
 * treatment intact without ever shipping a 404.
 */
export function MaybeLink({
  href,
  className,
  children,
  ...props
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<"span">, "href">) {
  if (isLive(href)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}
