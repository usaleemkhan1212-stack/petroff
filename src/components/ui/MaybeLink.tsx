import { Link } from "@/i18n/navigation";
import { isLive } from "@/lib/routes";

/**
 * Renders a real link when `href` points at a page that exists, and a plain
 * span with the same styling when it does not. Keeps the design's link
 * treatment intact without ever shipping a 404.
 *
 * Extra props reach both branches, so an `onClick` that closes a menu fires
 * whether or not the target route is live.
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
  /* Common subset so the same handlers and aria work on either branch. */
} & Omit<React.HTMLAttributes<HTMLElement>, "children">) {
  if (isLive(href)) {
    return (
      <Link href={href} className={className} {...props}>
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
