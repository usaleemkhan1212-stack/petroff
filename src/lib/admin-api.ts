import { request, type ApiEnvelope, type Paginated } from "./api";
import type { AdminUser } from "./admin-auth";
import type { Enquiry, EnquiryFilters, EnquiryRow, EnquiryStatus } from "./enquiries";

/**
 * The admin's endpoints. Everything here is `auth: true`, so a 401 or 403 tears
 * the session down through the handler `api.ts` calls — see `AuthProvider`.
 */

export type LoginData = { user: AdminUser; token: string };

export function login(email: string, password: string) {
  return request<ApiEnvelope<LoginData>>("/api/admin/login", {
    method: "POST",
    body: { email, password },
  });
}

export function fetchMe() {
  return request<ApiEnvelope<AdminUser>>("/api/admin/me", { auth: true });
}

export function logout() {
  return request<ApiEnvelope<null>>("/api/admin/logout", {
    method: "POST",
    auth: true,
  });
}

/* ---------------------------------------------------------------- enquiries */

export function listEnquiries(filters: EnquiryFilters) {
  return request<Paginated<EnquiryRow>>("/api/admin/contact-enquiries", {
    auth: true,
    query: { ...filters },
  });
}

/**
 * **Opening the detail marks the enquiry read server-side**, the first time
 * only — there is no separate call, and `read_at` never changes afterwards. So
 * the list has to be refetched on the way back, or the row keeps its unread
 * styling until something else reloads it.
 */
export function getEnquiry(id: number) {
  return request<ApiEnvelope<Enquiry>>(`/api/admin/contact-enquiries/${id}`, {
    auth: true,
  });
}

/**
 * A PATCH of any subset of the three mutable fields. The visitor's own fields
 * are immutable and are not sent.
 *
 * **`closed_at` is the server's**: it is set when the status becomes closed and
 * cleared when it is reopened (spam does not set it), so the returned object is
 * what local state should be replaced with rather than patched by hand.
 */
export function updateEnquiry(
  id: number,
  patch: {
    status?: EnquiryStatus;
    assigned_to?: number | null;
    notes?: string | null;
  },
) {
  return request<ApiEnvelope<Enquiry>>(`/api/admin/contact-enquiries/${id}`, {
    method: "PATCH",
    auth: true,
    body: patch,
  });
}

export function deleteEnquiry(id: number) {
  return request<ApiEnvelope<null>>(`/api/admin/contact-enquiries/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
