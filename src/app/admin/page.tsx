import { Suspense } from "react";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";

/**
 * The content manager, at `/admin`.
 *
 * Its section, and the enquiry inbox's filters, sort, page and open record, all
 * live in the query string — `/admin?section=enquiries&status=new&page=2` — so
 * a view is shareable and survives a refresh.
 *
 * **That is why the shell sits behind `Suspense`.** Reading the query string
 * with `useSearchParams` opts a component out of prerendering, and this page is
 * static; without a boundary the build refuses it. The fallback is never really
 * seen, since `AdminGuard` is already showing its own loader until the session
 * resolves.
 */
export default function AdminPage() {
  return (
    <AdminGuard>
      <Suspense fallback={<div className="bg-lilas h-dvh" />}>
        <AdminShell />
      </Suspense>
    </AdminGuard>
  );
}
