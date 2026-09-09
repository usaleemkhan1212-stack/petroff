"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { listEnquiries } from "@/lib/admin-api";
import { ApiError, type Paginated } from "@/lib/api";
import {
  DEFAULT_FILTERS,
  ENQUIRY_STATUSES,
  PER_PAGE_OPTIONS,
  STATUS_LABELS,
  formatDateTime,
  isFiltered,
  type EnquiryFilters,
  type EnquiryRow,
  type SortField,
} from "@/lib/enquiries";
import { cn } from "@/lib/utils";

import { useAuth } from "../AuthProvider";
import { Icon } from "../icons";
import { Btn, Card, EmptyState, fieldInput } from "../ui";
import { StatusBadge } from "./StatusBadge";

/**
 * The enquiry inbox.
 *
 * **Every filter, the sort and the page live in the URL**, so a view is
 * shareable and survives a refresh — the parent owns the query string and hands
 * the parsed, clamped filters down. Clamping is what stops a hand-edited URL
 * (`per_page=500`, a bogus status) from 422-ing the list rather than loading
 * it; see `filtersFromParams`.
 *
 * `read_at === null` is the unread flag, and unread rows are bold like an
 * inbox. Opening one marks it read server-side, so the list refetches when the
 * detail hands control back.
 */
export function EnquiriesPanel({
  filters,
  onFilters,
  onOpen,
  reloadKey,
}: {
  filters: EnquiryFilters;
  onFilters: (next: Partial<EnquiryFilters>) => void;
  onOpen: (id: number) => void;
  /** Bumped by the parent when the list is known to be stale. */
  reloadKey: number;
}) {
  const { user } = useAuth();
  const [page, setPage] = useState<Paginated<EnquiryRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* The box types faster than the API should be asked. Its own value is local
     so the field never lags a keystroke behind; the URL follows 300ms later. */
  const [searchDraft, setSearchDraft] = useState(filters.search ?? "");
  const searchRef = useRef(filters.search ?? "");

  useEffect(() => {
    /* A filter reset, or a back button, has to reach the input too. */
    if (filters.search !== searchRef.current) {
      searchRef.current = filters.search ?? "";
      setSearchDraft(filters.search ?? "");
    }
  }, [filters.search]);

  useEffect(() => {
    if (searchDraft === (filters.search ?? "")) return;
    const id = setTimeout(() => {
      searchRef.current = searchDraft;
      onFilters({ search: searchDraft, page: 1 });
    }, 300);
    return () => clearTimeout(id);
  }, [searchDraft, filters.search, onFilters]);

  /* One key for every value the request depends on, so the effect re-runs when
     any of them moves and not when the component merely re-renders. */
  const key = useMemo(
    () => JSON.stringify({ ...filters, reloadKey }),
    [filters, reloadKey],
  );

  useEffect(() => {
    let cancelled = false;
    /* Entering the loading state is the point of the effect: the fetch it
       guards cannot run during render. */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    listEnquiries(filters)
      .then((res) => !cancelled && setPage(res))
      .catch((err: unknown) => {
        if (cancelled) return;
        /* 401 and 403 have already redirected; anything else is shown here. */
        if (err instanceof ApiError && err.status !== 401 && err.status !== 403)
          setError(err.message);
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const sortBy = useCallback(
    (field: SortField) =>
      onFilters(
        filters.sort === field
          ? { direction: filters.direction === "asc" ? "desc" : "asc", page: 1 }
          : { sort: field, direction: "desc", page: 1 },
      ),
    [filters.sort, filters.direction, onFilters],
  );

  const rows = page?.data ?? [];
  const meta = page?.meta;
  const filtered = isFiltered(filters);

  return (
    <div className="flex flex-col gap-4">
      {/* Status as tabs — the one filter worth a click rather than a menu. */}
      <div className="flex flex-wrap items-center gap-2">
        <StatusTab
          active={!filters.status}
          onClick={() => onFilters({ status: "", page: 1 })}
        >
          All
        </StatusTab>
        {ENQUIRY_STATUSES.map((s) => (
          <StatusTab
            key={s}
            active={filters.status === s}
            onClick={() => onFilters({ status: s, page: 1 })}
          >
            {STATUS_LABELS[s]}
          </StatusTab>
        ))}
      </div>

      <Card className="flex flex-wrap items-end gap-2.5 px-4 py-3.5">
        <label className="relative min-w-[220px] flex-1">
          <span className="sr-only">Search enquiries</span>
          <Icon
            name="search"
            size={15}
            className="text-encre/62 absolute top-1/2 left-3 -translate-y-1/2"
          />
          {/* `type="text"`, never `type="search"`: Chrome's search decoration
              reserves ~15px inside the field and clips the placeholder. */}
          <input
            type="text"
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            placeholder="Search name, email, phone, subject or message…"
            className="bg-lilas text-encre placeholder:text-encre/62 focus:border-gold/50 w-full rounded-[10px] border border-transparent py-2.5 pr-3 pl-9 text-[13px] text-ellipsis outline-none"
          />
        </label>

        <FilterField label="Assignee">
          <select
            aria-label="Assignee"
            value={filters.assigned_to ?? ""}
            onChange={(e) => onFilters({ assigned_to: e.target.value, page: 1 })}
            className={fieldInput}
          >
            <option value="">Anyone</option>
            {/* No users endpoint yet — see the note in EnquiryDetail. */}
            {user ? <option value={String(user.id)}>{user.name} (me)</option> : null}
          </select>
        </FilterField>

        <FilterField label="Source">
          <input
            type="text"
            aria-label="Source"
            value={filters.source ?? ""}
            onChange={(e) => onFilters({ source: e.target.value, page: 1 })}
            placeholder="Any"
            className={`${fieldInput} w-[150px]`}
          />
        </FilterField>

        <FilterField label="From">
          <input
            type="date"
            aria-label="Received from"
            value={filters.date_from ?? ""}
            onChange={(e) => onFilters({ date_from: e.target.value, page: 1 })}
            className={fieldInput}
          />
        </FilterField>

        <FilterField label="To">
          <input
            type="date"
            aria-label="Received to"
            value={filters.date_to ?? ""}
            onChange={(e) => onFilters({ date_to: e.target.value, page: 1 })}
            className={fieldInput}
          />
        </FilterField>

        <Btn
          variant="icon"
          icon="refresh"
          title="Refresh"
          onClick={() => onFilters({})}
        />
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <p aria-live="polite" className="text-encre/62 flex-1 text-[13px]">
          {loading
            ? "Loading…"
            : meta
              ? `${meta.total} ${meta.total === 1 ? "enquiry" : "enquiries"}`
              : ""}
        </p>
        {filtered ? (
          <button
            type="button"
            onClick={() => onFilters(DEFAULT_FILTERS)}
            className="text-periwinkle cursor-pointer text-[13px] font-semibold hover:underline"
          >
            Reset filters
          </button>
        ) : null}
        <label className="text-encre/62 flex items-center gap-2 text-[12.5px]">
          Per page
          <select
            aria-label="Results per page"
            value={filters.per_page}
            onChange={(e) => onFilters({ per_page: Number(e.target.value), page: 1 })}
            className="border-encre/13 text-encre rounded-[9px] border bg-white px-2 py-1.5 text-[12.5px] outline-none"
          >
            {PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          className="border-red/30 bg-pale-rose/25 text-encre rounded-[11px] border px-4 py-3 text-[13px]"
        >
          {error}
        </p>
      ) : null}

      {!loading && !error && rows.length === 0 ? (
        <EmptyState icon="inbox" title="No enquiries to show">
          {filtered
            ? "Nothing matches the current filters. Reset them to see everything."
            : "Submissions from the contact popup and the page forms land here."}
        </EmptyState>
      ) : (
        <Card className="overflow-hidden p-0">
          {/* A wide table scrolls in its own container rather than crushing
              five columns of names and addresses. */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-encre/8 border-b">
                  <SortHeader field="name" filters={filters} onSort={sortBy}>
                    From
                  </SortHeader>
                  <Th>Subject</Th>
                  <SortHeader field="status" filters={filters} onSort={sortBy}>
                    Status
                  </SortHeader>
                  <Th>Assignee</Th>
                  <SortHeader field="received_at" filters={filters} onSort={sortBy}>
                    Received
                  </SortHeader>
                </tr>
              </thead>
              <tbody className={loading ? "opacity-50" : ""}>
                {rows.map((row) => {
                  const unread = row.read_at === null;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => onOpen(row.id)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onOpen(row.id);
                        }
                      }}
                      className="border-encre/7 hover:bg-lilas focus-visible:bg-lilas cursor-pointer border-b transition-colors last:border-b-0 focus-visible:outline-none"
                    >
                      <td className="px-4 py-3.5 align-top">
                        <span className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className={cn(
                              "mt-1.5 size-2 shrink-0 rounded-full",
                              unread ? "bg-gold" : "bg-transparent",
                            )}
                          />
                          <span className="min-w-0">
                            <b
                              className={cn(
                                "text-encre block text-[13.5px]",
                                unread ? "font-semibold" : "font-normal",
                              )}
                            >
                              {row.name}
                              {unread ? (
                                <span className="sr-only"> (unread)</span>
                              ) : null}
                            </b>
                            <span className="text-encre/62 block text-[12px]">
                              {row.email}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3.5 align-top">
                        <span
                          className={cn(
                            "text-encre block max-w-[320px] truncate text-[13.5px]",
                            unread && "font-semibold",
                          )}
                        >
                          {row.subject || "(no subject)"}
                        </span>
                        {/* The API truncates this to ~150 characters; the full
                            body exists only on the detail endpoint. */}
                        <span className="text-encre/62 block max-w-[320px] truncate text-[12px]">
                          {row.message_preview}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 align-top">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="text-encre/62 px-4 py-3.5 align-top text-[13px]">
                        {row.assignee?.name ?? "—"}
                      </td>
                      <td className="text-encre/62 px-4 py-3.5 align-top text-[13px] whitespace-nowrap">
                        {formatDateTime(row.received_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {meta && meta.last_page > 1 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-encre/62 text-[12.5px]">
            Page {meta.current_page} of {meta.last_page}
          </p>
          <div className="flex items-center gap-2">
            <Btn
              variant="icon"
              icon="chevLeft"
              title="Previous page"
              onClick={() => onFilters({ page: Math.max(1, meta.current_page - 1) })}
            />
            <Btn
              variant="icon"
              icon="chevRight"
              title="Next page"
              onClick={() =>
                onFilters({
                  page: Math.min(meta.last_page, meta.current_page + 1),
                })
              }
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span className="flex flex-col gap-1">
      <span className="text-encre/62 text-[11.5px]">{label}</span>
      {children}
    </span>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th scope="col" className="text-encre/62 px-4 py-2.5 text-[11.5px] font-semibold">
      {children}
    </th>
  );
}

function SortHeader({
  field,
  filters,
  onSort,
  children,
}: {
  field: SortField;
  filters: EnquiryFilters;
  onSort: (f: SortField) => void;
  children: React.ReactNode;
}) {
  const active = filters.sort === field;
  return (
    <th
      scope="col"
      aria-sort={
        active ? (filters.direction === "asc" ? "ascending" : "descending") : "none"
      }
      className="px-4 py-2.5"
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className={cn(
          "flex cursor-pointer items-center gap-1 text-[11.5px] font-semibold transition-colors",
          active ? "text-brique" : "text-encre/62 hover:text-encre",
        )}
      >
        {children}
        <Icon
          name="chevDown"
          size={12}
          className={cn(
            "transition-transform",
            active && filters.direction === "asc" && "rotate-180",
            !active && "opacity-0",
          )}
        />
      </button>
    </th>
  );
}

/* The four statuses plus All, as a tab row. */
function StatusTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "font-poppins cursor-pointer rounded-[10px] border px-3 py-2 text-[12.5px] font-semibold transition-colors",
        active
          ? "bg-gold/10 border-gold/50 text-brique"
          : "border-encre/13 text-encre hover:border-gold/50 bg-white",
      )}
    >
      {children}
    </button>
  );
}
