"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ADMIN_LOGIN, clearToken } from "@/lib/admin-auth";

import { useAuth } from "./AuthProvider";
import { AdminLockup } from "./icons";

/**
 * Wraps everything behind the admin that is not the login page.
 *
 * `src/proxy.ts` already turns a visitor with no token away before this
 * renders, which is what stops protected markup ever reaching the browser. This
 * is the second half of the pair, and the authoritative one: the proxy can only
 * see that *a* token exists, where this waits for `/me` to say the token is
 * still good — a revoked or deactivated account gets past the proxy and is
 * stopped here.
 *
 * It renders the panel only once the session has resolved, so nothing protected
 * is ever painted and then taken away.
 *
 * **The two halves can deadlock, and that is what `clearToken` below prevents.**
 * The proxy sends anyone holding a cookie to `/admin`; this sends anyone without
 * a session to `/admin/login`. If a token is still in the jar when this
 * redirects, the two send the reader back and forth and the screen sits on
 * "Redirecting…" for ever. So the cookie goes first, and only then the redirect
 * — and an API that merely could not be reached is not treated as signed-out at
 * all, but gets the panel below.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { status, error, retry, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status !== "guest") return;
    clearToken();
    router.replace(ADMIN_LOGIN);
  }, [status, router]);

  if (status === "authenticated") return <>{children}</>;

  if (status === "unreachable") {
    return (
      <div className="bg-encre flex h-dvh flex-col items-center justify-center gap-6 px-6">
        <AdminLockup />
        <div className="flex max-w-[46ch] flex-col items-center gap-3 text-center">
          <b className="font-poppins text-[17px] font-semibold text-white">
            Can’t reach the server
          </b>
          <p role="status" className="text-[13px] leading-[1.55] text-white/62">
            {error ?? "Could not reach the server."} Your session is still
            here — this is the API, not your sign-in.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={retry}
              className="bg-gold text-encre hover:bg-brique font-poppins cursor-pointer rounded-[11px] px-4 py-2.5 text-[13px] font-semibold transition-colors hover:text-white"
            >
              Try again
            </button>
            {/* Works with the API down: signOut clears local state whatever
                the logout call returns. */}
            <button
              type="button"
              onClick={() => void signOut()}
              className="font-poppins cursor-pointer rounded-[10px] border border-white/20 px-4 py-2.5 text-[13px] font-semibold text-white/66 transition-colors hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-encre flex h-dvh flex-col items-center justify-center gap-6">
      <AdminLockup />
      <div className="flex items-center gap-3 text-[13px] text-white/62">
        <span
          aria-hidden="true"
          className="border-gold/30 border-t-gold size-4 animate-spin rounded-full border-2"
        />
        <span role="status">
          {status === "loading" ? "Checking your session…" : "Redirecting…"}
        </span>
      </div>
    </div>
  );
}
