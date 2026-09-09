import type { AdminUser } from "./admin-auth";

/**
 * Contact enquiries — the shapes the API returns and the vocabulary the admin
 * uses to talk about them.
 *
 * The API validates status **values**, not transitions, so the selector offers
 * all four. The natural workflow is new → in progress → closed, with spam
 * markable from either open state and closed reopenable; that is guidance for
 * the reader, not a rule the UI enforces.
 */
export const ENQUIRY_STATUSES = ["new", "in_progress", "closed", "spam"] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export const STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: "New",
  in_progress: "In Progress",
  closed: "Closed",
  spam: "Spam",
};

/**
 * The list row. **`message_preview` is truncated to ~150 characters by the
 * API** — the full body exists only on the detail endpoint, so a row can never
 * show it.
 */
export type EnquiryRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message_preview: string;
  status: EnquiryStatus;
  source: string | null;
  page_url: string | null;
  assigned_to: number | null;
  assignee: AdminUser | null;
  /** Null until an admin has opened it — the inbox's unread flag. */
  read_at: string | null;
  received_at: string;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
};

/** The detail record: the row plus the full message and the internal notes. */
export type Enquiry = Omit<EnquiryRow, "message_preview"> & {
  message: string;
  notes: string | null;
};

export const SORT_FIELDS = ["received_at", "status", "name"] as const;
export type SortField = (typeof SORT_FIELDS)[number];

export type EnquiryFilters = {
  status?: EnquiryStatus | "";
  assigned_to?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
  source?: string;
  sort: SortField;
  direction: "asc" | "desc";
  per_page: number;
  page: number;
};

/**
 * The list's resting state. Newest received first is the API's own default;
 * it is written out here so the URL and the request always agree.
 */
export const DEFAULT_FILTERS: EnquiryFilters = {
  status: "",
  assigned_to: "",
  date_from: "",
  date_to: "",
  search: "",
  source: "",
  sort: "received_at",
  direction: "desc",
  per_page: 20,
  page: 1,
};

export const PER_PAGE_OPTIONS = [10, 20, 50, 100] as const;

function isStatus(v: string): v is EnquiryStatus {
  return (ENQUIRY_STATUSES as readonly string[]).includes(v);
}

function isSort(v: string): v is SortField {
  return (SORT_FIELDS as readonly string[]).includes(v);
}

/**
 * Reads filters back out of the URL, clamping every value to something the API
 * accepts.
 *
 * **This is what keeps a bookmarked or hand-edited URL from 422-ing the list.**
 * A bad status, a per_page of 500 or a page of −3 all fall back to the default
 * rather than being sent on and rejected.
 */
export function filtersFromParams(params: URLSearchParams): EnquiryFilters {
  const status = params.get("status") ?? "";
  const sort = params.get("sort") ?? "";
  const direction = params.get("direction");
  const perPage = Number(params.get("per_page"));
  const page = Number(params.get("page"));

  return {
    status: isStatus(status) ? status : "",
    assigned_to: params.get("assigned_to") ?? "",
    date_from: params.get("date_from") ?? "",
    date_to: params.get("date_to") ?? "",
    search: params.get("search") ?? "",
    source: params.get("source") ?? "",
    sort: isSort(sort) ? sort : DEFAULT_FILTERS.sort,
    direction: direction === "asc" ? "asc" : "desc",
    per_page:
      Number.isInteger(perPage) && perPage >= 1 && perPage <= 100
        ? perPage
        : DEFAULT_FILTERS.per_page,
    page: Number.isInteger(page) && page >= 1 ? page : 1,
  };
}

/** Only what differs from the default reaches the URL, so it stays readable. */
export function filtersToParams(filters: EnquiryFilters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    const fallback = DEFAULT_FILTERS[key as keyof EnquiryFilters];
    if (value === "" || value === undefined || value === fallback) continue;
    params.set(key, String(value));
  }
  return params;
}

export function isFiltered(filters: EnquiryFilters) {
  return Boolean(
    filters.status ||
    filters.assigned_to ||
    filters.date_from ||
    filters.date_to ||
    filters.search ||
    filters.source,
  );
}

/** `2026-09-09T09:58:17.000000Z` → `9 Sep 2026, 09:58`. */
export function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
