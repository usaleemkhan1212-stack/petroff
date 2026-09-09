"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ADMIN_LOGIN } from "@/lib/admin-auth";

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
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "guest") router.replace(ADMIN_LOGIN);
  }, [status, router]);

  if (status === "authenticated") return <>{children}</>;

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
