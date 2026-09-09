"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { fetchMe, login, logout } from "@/lib/admin-api";
import { ApiError, setAuthFailureHandler } from "@/lib/api";
import {
  ADMIN_LOGIN,
  clearToken,
  readToken,
  setLoginNotice,
  writeToken,
  type AdminUser,
} from "@/lib/admin-auth";

/**
 * The admin's session, hydrated once per page load.
 *
 * `status` is three-valued on purpose. "loading" is not the same as "guest":
 * treating an unresolved session as signed-out would bounce a signed-in reader
 * to the login page on every refresh, and treating it as signed-in would flash
 * protected content. Everything that guards a page waits for it to settle.
 *
 * `useRouter` is `next/navigation`, not `@/i18n/navigation` — the admin sits
 * outside next-intl, so the localised router would rewrite these to `/fr/…`.
 */
export type AuthStatus =
  | "loading"
  | "authenticated"
  | "guest"
  /** A token is held but `/me` could not be reached — see the note below. */
  | "unreachable";

type AuthValue = {
  status: AuthStatus;
  user: AdminUser | null;
  /** Why the session could not be verified, when `status` is "unreachable". */
  error: string | null;
  /** Throws `ApiError` so the form can render field errors and 429s itself. */
  signIn: (email: string, password: string, remember: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  /** Try `/me` again after an unreachable API. */
  retry: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  /* Bumped by `retry`, which is the hydration effect's only other trigger. */
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setStatus("loading");
    setError(null);
    setAttempt((a) => a + 1);
  }, []);

  /* The redirect has to see the current path, and re-registering the handler on
     every navigation would tear down a listener mid-request. Writing the ref in
     an effect rather than during render is what keeps render pure — a ref
     mutated on the way through is a read of state React has not committed. */
  const pathRef = useRef(pathname);
  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  /* Any protected call that comes back 401 or 403 ends the session here. */
  useEffect(() => {
    setAuthFailureHandler((_status, message) => {
      setUser(null);
      setError(null);
      setStatus("guest");
      if (pathRef.current !== ADMIN_LOGIN) {
        setLoginNotice(message);
        router.replace(ADMIN_LOGIN);
      }
    });
    return () => setAuthFailureHandler(null);
  }, [router]);

  /* Hydration: a stored token is a claim, not a session, so it is checked. */
  useEffect(() => {
    let cancelled = false;
    if (!readToken()) {
      /* Cookies are only readable after mount, so resolving the session is
         necessarily a post-render state change — which is what this rule warns
         about in general and what an effect is for in this case. */
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("guest");
      return;
    }
    fetchMe()
      .then((res) => {
        if (cancelled) return;
        setUser(res.data);
        setError(null);
        setStatus("authenticated");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setUser(null);

        /*
          **"Could not verify" is not "not signed in", and conflating them
          deadlocked the admin.** A 401 or 403 has already cleared the token
          through the failure handler, so falling through to "guest" sends the
          reader to the login page and the proxy lets them stay there.

          Anything else — the API down, DNS, a CORS rejection — leaves the
          token in place. Calling that "guest" made the guard redirect to
          /admin/login while proxy.ts still saw the cookie and redirected
          straight back to /admin, so the screen sat on "Redirecting…" for
          ever. It is its own state now, with a way out that does not depend
          on the API answering.
        */
        const rejected =
          err instanceof ApiError && (err.status === 401 || err.status === 403);
        if (rejected) {
          setError(null);
          setStatus("guest");
        } else {
          setError(
            err instanceof ApiError
              ? err.message
              : "Could not reach the server.",
          );
          setStatus("unreachable");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const signIn = useCallback(
    async (email: string, password: string, remember: boolean) => {
      const res = await login(email, password);
      const { token, user: signedIn } = res.data;
      /* The token is written before the state so a redirect that lands the
         next page immediately already has it to send. */
      writeToken(token, remember);
      setUser(signedIn);
      setError(null);
      setStatus("authenticated");
    },
    [],
  );

  const signOut = useCallback(async () => {
    /*
      The endpoint first, then the local state **regardless of what it said**.
      A logout that failed on the network must not leave the reader trapped in
      a session they have asked to end.
    */
    try {
      await logout();
    } catch (e) {
      if (!(e instanceof ApiError)) throw e;
    } finally {
      clearToken();
      setUser(null);
      setError(null);
      setStatus("guest");
      router.replace(ADMIN_LOGIN);
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ status, user, error, signIn, signOut, retry }}
    >
      {children}
    </AuthContext.Provider>
  );
}
