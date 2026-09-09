import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "@/i18n/routing";
import { ADMIN_LOGIN, TOKEN_COOKIE } from "@/lib/admin-auth";

/**
 * Two jobs, on two disjoint sets of paths: locale negotiation for the site, and
 * the admin's first line of route protection.
 *
 * Next 16 renamed this file convention from `middleware` to `proxy`; next-intl
 * still exports it as createMiddleware.
 */
const negotiateLocale = createMiddleware(routing);

/**
 * The admin gate.
 *
 * It only asks whether a token cookie is present — it cannot ask whether the
 * token is still valid, since that needs a call to the API. That is what makes
 * it the *first* line and not the only one: `AdminGuard` verifies the token
 * against `/me` once the page is running, and a revoked one is turned around
 * there. The cost of the split is a single bounce (proxy lets a stale token in,
 * the guard sends it back), which is the right trade for never painting
 * protected markup for someone with no token at all.
 */
function gateAdmin(request: NextRequest) {
  const signedIn = Boolean(request.cookies.get(TOKEN_COOKIE)?.value);
  const onLogin = request.nextUrl.pathname === ADMIN_LOGIN;

  if (!signedIn && !onLogin) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url));
  }
  if (signedIn && onLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return gateAdmin(request);
  }
  return negotiateLocale(request);
}

export const config = {
  /*
    Run on every path except API routes, Next internals and static files.

    The backslash before the dot must be doubled. In a JS string "\." is just
    ".", so the exclusion collapses to `.*..*`, which matches every non-empty
    path — that silently switches this proxy off for everything except "/",
    and `localePrefix: "as-needed"` then 404s on unprefixed routes like
    /expertises while "/" keeps working.
  */
  matcher: [
    // `landing-page` and `admin` are excluded from the locale pattern
    // deliberately: each is a root layout of its own outside `[locale]`, so
    // next-intl would rewrite them to /fr/... , which has no route, and they
    // would 404. The admin comes back in through its own entries below, where
    // `proxy` branches to the gate instead of the locale handler.
    "/((?!api|_next|_vercel|landing-page|admin|.*\\..*).*)",
    "/admin",
    "/admin/:path*",
  ],
};
