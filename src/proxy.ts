import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Locale negotiation. Next 16 renamed this file convention from
 * `middleware` to `proxy`; next-intl still exports it as createMiddleware.
 */
export default createMiddleware(routing);

export const config = {
  /*
    Run on every path except API routes, Next internals and static files.

    The backslash before the dot must be doubled. In a JS string "\." is just
    ".", so the exclusion collapses to `.*..*`, which matches every non-empty
    path — that silently switches this proxy off for everything except "/",
    and `localePrefix: "as-needed"` then 404s on unprefixed routes like
    /expertises while "/" keeps working.
  */
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
