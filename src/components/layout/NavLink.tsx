"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { cn } from "@/lib/utils";

/**
 * Is `href` the page being read, or a section of it?
 *
 * A prefix match is what lets `/expertises/droit-fiscal` light up the
 * `Expertises` parent, and `/bibliotheque/new-article-page` the Bibliothèque
 * one. The trailing slash matters: without it `/expertises-x` would match
 * `/expertises`. `/` is guarded because every path starts with it.
 *
 * `usePathname` comes from `@/i18n/navigation`, so it is already free of the
 * locale prefix.
 */
export function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * A nav entry that knows whether it is the page you are on.
 *
 * The active entry takes **brique**, the same colour every section overline
 * uses, and `aria-current="page"` so it is not colour alone that says so.
 *
 * It stays a `MaybeLink`: a parent may carry a submenu while its own page does
 * not exist yet — Le Cabinet is the first — and nothing on the site may
 * navigate to a 404.
 */
export function NavLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const current = isCurrent(pathname, href);

  return (
    <MaybeLink
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={cn(
        "hover:text-periwinkle transition-colors",
        current ? "text-brique" : "text-encre",
        className,
      )}
    >
      {children}
    </MaybeLink>
  );
}
