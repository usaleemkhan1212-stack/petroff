/**
 * The cookie-consent choice, stored exactly as `/cookies` says it is.
 *
 * That policy's own table names the cookie **`petroff_consent`**, describes it
 * as "Mémorise vos choix en matière de cookies" and gives it **6 mois** — so
 * this is a real cookie under that name with that lifetime, not a
 * localStorage entry. The page and the storage have to agree; the page is the
 * one making the promise.
 */
export const CONSENT_COOKIE = "petroff_consent";

/** Six months, which is the maximum the policy (and the CNIL) states. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 183;

/**
 * What the reader chose. `necessary` is not represented: those cookies are
 * always on and cannot be refused, which is what the panel's "Toujours actifs"
 * row says.
 */
export type Consent = { analytics: boolean };

/** `v1:1` / `v1:0` — versioned so a later category can invalidate old choices. */
const PREFIX = "v1:";

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;

  const row = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!row) return null;

  const value = decodeURIComponent(row.slice(CONSENT_COOKIE.length + 1));
  if (!value.startsWith(PREFIX)) return null;

  return { analytics: value.slice(PREFIX.length) === "1" };
}

export function writeConsent(consent: Consent) {
  if (typeof document === "undefined") return;

  const value = `${PREFIX}${consent.analytics ? "1" : "0"}`;
  /* `SameSite=Lax` and no `Secure` flag so it also works over http in dev. */
  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax` +
    (location.protocol === "https:" ? "; Secure" : "");
}
