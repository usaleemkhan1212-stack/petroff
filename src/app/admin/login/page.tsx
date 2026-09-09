import type { Metadata } from "next";

import { LoginCard } from "@/components/admin/LoginCard";

/**
 * `/admin/login`. It inherits the admin root layout — Poppins + Inter, no
 * header, no footer — and overrides only the title, so the tab reads as the
 * sign-in step rather than as the manager itself.
 */
export const metadata: Metadata = {
  title: "Sign in — Petroff Avocats",
  description: "Sign in to the Petroff Avocats content manager.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <LoginCard />;
}
