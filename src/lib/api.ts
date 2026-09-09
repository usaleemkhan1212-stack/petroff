import { clearToken, readToken } from "./admin-auth";

/**
 * The client for the Petroff Laravel API — one `request` for the whole site.
 *
 * **Bearer tokens, not cookie/CSRF Sanctum.** The backend runs CORS with
 * `supports_credentials = false`, so every request here is `credentials:
 * "omit"` — sending them would make the browser refuse the response outright —
 * and there is no `/sanctum/csrf-cookie` step. Authentication is the
 * `Authorization: Bearer <token>` header on the calls that ask for it; the
 * public contact endpoint asks for nothing.
 *
 * The base URL comes from `NEXT_PUBLIC_API_BASE_URL` and is never hard-coded.
 * The token goes to that origin and nowhere else, and is never logged.
 */
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ApiEnvelope<T> = { success: boolean; message?: string; data: T };

/** Laravel's paginator, as the enquiry list returns it. */
export type Paginated<T> = {
  success: boolean;
  data: T[];
  links: { first: string; last: string; prev: string | null; next: string | null };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
  };
};

/**
 * One error type for every failure, so a caller can branch on `status` rather
 * than on the shape of what came back.
 *
 * `network` covers the cases with no HTTP status at all — the API being down,
 * DNS, and **a CORS rejection, which reaches JavaScript as an indistinguishable
 * network failure**. If a call fails this way against a running API, the origin
 * is the first thing to check.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly errors: Record<string, string[]>;
  readonly retryAfter: number | null;
  readonly network: boolean;

  constructor(opts: {
    status: number;
    message: string;
    errors?: Record<string, string[]>;
    retryAfter?: number | null;
    network?: boolean;
  }) {
    super(opts.message);
    this.name = "ApiError";
    this.status = opts.status;
    this.errors = opts.errors ?? {};
    this.retryAfter = opts.retryAfter ?? null;
    this.network = opts.network ?? false;
  }
}

/**
 * What the provider wants to do when a protected call comes back 401 or 403 —
 * clear the session and get the reader to the login page.
 *
 * It is a registered callback rather than a direct import so this module stays
 * free of React and the router, and so a call made outside a component tree
 * still tears the session down. Every protected call routes through here, so
 * this is not per-call error handling.
 */
type AuthFailure = (status: 401 | 403, message: string) => void;
let onAuthFailure: AuthFailure | null = null;

export function setAuthFailureHandler(fn: AuthFailure | null) {
  onAuthFailure = fn;
}

function parseRetryAfter(res: Response): number | null {
  /*
    Readable only if the API sends `Access-Control-Expose-Headers: Retry-After`.
    CORS hides every other response header from script, so a cross-origin 429
    usually arrives with this null — hence each caller's own fallback.
  */
  const raw = res.headers.get("Retry-After");
  if (!raw) return null;
  const seconds = Number(raw);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : null;
}

export type QueryValue = string | number | boolean | null | undefined;

/** Drops empty values, so an unset filter never reaches the API as `?status=`. */
export function toQueryString(query: Record<string, QueryValue>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    params.set(key, String(value));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

export async function request<T>(
  path: string,
  opts: {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: unknown;
    auth?: boolean;
    query?: Record<string, QueryValue>;
  } = {},
): Promise<T> {
  if (!BASE) {
    throw new ApiError({
      status: 0,
      message:
        "The API base URL is not configured. Set NEXT_PUBLIC_API_BASE_URL and restart the server.",
    });
  }

  const { method = "GET", body, auth = false, query } = opts;
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = readToken();
    if (!token) {
      /* No token at all is the same outcome as a rejected one. */
      clearToken();
      onAuthFailure?.(401, "Your session has ended. Please sign in again.");
      throw new ApiError({ status: 401, message: "Unauthenticated." });
    }
    headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${BASE}${path}${query ? toQueryString(query) : ""}`, {
      method,
      headers,
      credentials: "omit",
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    throw new ApiError({
      status: 0,
      network: true,
      message: "Could not reach the server. Check your connection and retry.",
    });
  }

  /* A 204 or an HTML error page must not blow up on .json(). */
  const payload = await res
    .json()
    .catch(
      () => null as { message?: string; errors?: Record<string, string[]> } | null,
    );

  if (res.ok) return payload as T;

  const message =
    (typeof payload?.message === "string" && payload.message) ||
    "Something went wrong. Please try again.";

  if (auth && (res.status === 401 || res.status === 403)) {
    clearToken();
    onAuthFailure?.(
      res.status,
      res.status === 401
        ? "Your session has ended. Please sign in again."
        : "Your account no longer has access to the admin.",
    );
  }

  throw new ApiError({
    status: res.status,
    message,
    errors: payload?.errors ?? {},
    retryAfter: parseRetryAfter(res),
  });
}
