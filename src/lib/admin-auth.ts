/**
 * Admin session storage, and the shape of an admin user.
 *
 * **The token lives in a client-set cookie, not localStorage**, and the reason
 * is route protection: `src/proxy.ts` can read a cookie on the way in and
 * redirect `/admin` to `/admin/login` before a byte of protected markup is
 * rendered, where localStorage is invisible to it and every guard would have to
 * run after paint.
 *
 * The tradeoff, stated plainly: this cookie **cannot be `httpOnly`**, because
 * the client has to read it to put the token in an `Authorization` header — so
 * against XSS it is exactly as exposed as localStorage would be, and no more.
 * What it buys is the redirect, not secrecy. `SameSite=Lax` and a `/admin`
 * path keep it off every other page of the site and off cross-site requests;
 * `Secure` is added automatically on https.
 *
 * The backend issues tokens with no expiry — one dies only when it is revoked —
 * so the cookie's own lifetime is the only thing deciding how long a machine
 * stays signed in. That is what the login form's "Keep me signed in" sets: on,
 * a 30-day cookie; off, a session cookie that goes when the browser closes.
 */

/** Roles the API lets into the admin. Permissions gating comes later. */
export const ADMIN_ROLES = ["admin", "editor"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

/**
 * `role` is deliberately a plain string rather than `AdminRole`. The API is the
 * authority on who may sign in; typing it as the union here would let a role
 * this build has not heard of be silently read as one it has. Compare against
 * `ADMIN_ROLES` when gating actually lands.
 */
export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
};

export const TOKEN_COOKIE = "petroff_admin_token";

const COOKIE_PATH = "/admin";
const REMEMBER_SECONDS = 60 * 60 * 24 * 30;

/** Where the admin lives on this site. The spec's "/login" is this project's. */
export const ADMIN_HOME = "/admin";
export const ADMIN_LOGIN = "/admin/login";

export function readToken(): string | null {
  if (typeof document === "undefined") return null;
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${TOKEN_COOKIE}=`));
  if (!hit) return null;
  const raw = hit.slice(TOKEN_COOKIE.length + 1);
  return raw ? decodeURIComponent(raw) : null;
}

export function writeToken(token: string, remember: boolean) {
  if (typeof document === "undefined") return;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  const age = remember ? `; Max-Age=${REMEMBER_SECONDS}` : "";
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=${COOKIE_PATH}; SameSite=Lax${age}${secure}`;
}

export function clearToken() {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_COOKIE}=; Path=${COOKIE_PATH}; SameSite=Lax; Max-Age=0`;
}

/**
 * A one-shot message handed from wherever the session ended to the login page.
 *
 * It goes through `sessionStorage` rather than a `?reason=` query parameter for
 * two reasons: a query parameter survives a refresh, so the explanation would
 * still be on screen long after it stopped being true; and reading one needs
 * `useSearchParams`, which would force this statically prerendered page into a
 * Suspense boundary to keep building. Reading it clears it.
 */
const NOTICE_KEY = "petroff_admin_notice";

export function setLoginNotice(message: string) {
  try {
    sessionStorage.setItem(NOTICE_KEY, message);
  } catch {
    /* private mode, or storage blocked — the redirect still happens. */
  }
}

export function takeLoginNotice(): string | null {
  try {
    const v = sessionStorage.getItem(NOTICE_KEY);
    if (v) sessionStorage.removeItem(NOTICE_KEY);
    return v;
  } catch {
    return null;
  }
}
