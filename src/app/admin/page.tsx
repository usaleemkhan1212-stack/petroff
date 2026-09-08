import { AdminShell } from "@/components/admin/AdminShell";

/**
 * The content manager, at `/admin`.
 *
 * Converted from the single-file prototype that was in `public/index.html`:
 * same chrome and the same empty states, rebuilt on this project's stack —
 * Tailwind tokens instead of its own palette variables, components instead of
 * one document, and React state instead of the script that toggled `hidden`.
 */
export default function AdminPage() {
  return <AdminShell />;
}
