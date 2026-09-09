"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import {
  filtersFromParams,
  filtersToParams,
  type EnquiryFilters,
} from "@/lib/enquiries";

import { EnquiriesPanel } from "./EnquiriesPanel";
import { EnquiryDetail } from "./EnquiryDetail";

/**
 * Owns the enquiry screens' place in the URL.
 *
 * The admin is one route with its section in the query string, so a filtered
 * inbox is `/admin?section=enquiries&status=new&page=2` and an open enquiry is
 * `?section=enquiries&enquiry=12`. **That is what makes a view shareable and
 * survive a refresh**, which a `useState` filter bar cannot do — and it gets
 * the browser's back button for free, since each change is a real history
 * entry.
 *
 * Only what differs from the default is written, so the URL stays readable, and
 * everything read back out is clamped to a value the API accepts.
 */
export function EnquiriesSection() {
  const router = useRouter();
  const params = useSearchParams();

  const filters = filtersFromParams(params);
  const openId = Number(params.get("enquiry"));
  const hasOpen = Number.isInteger(openId) && openId > 0;

  /*
    Bumped whenever the detail changes something the list shows — a status, an
    assignee, or the read flag the GET sets on the way in. The list refetches on
    it rather than the parent trying to patch a row it does not own.
  */
  const [reloadKey, setReloadKey] = useState(0);
  const invalidate = useCallback(() => setReloadKey((k) => k + 1), []);

  const push = useCallback(
    (next: URLSearchParams) => {
      next.set("section", "enquiries");
      router.push(`/admin?${next.toString()}`, { scroll: false });
    },
    [router],
  );

  const onFilters = useCallback(
    (patch: Partial<EnquiryFilters>) => {
      const next = filtersToParams({ ...filters, ...patch });
      push(next);
    },
    /* `filters` is derived from the params this pushes, so it is recreated on
       every navigation — which is what keeps the closure current. */
    [filters, push],
  );

  const onOpen = useCallback(
    (id: number) => {
      const next = filtersToParams(filters);
      next.set("enquiry", String(id));
      push(next);
    },
    [filters, push],
  );

  const onBack = useCallback(() => {
    const next = filtersToParams(filters);
    next.delete("enquiry");
    push(next);
  }, [filters, push]);

  if (hasOpen) {
    return (
      <EnquiryDetail
        id={openId}
        onBack={onBack}
        onDirty={invalidate}
        onDeleted={() => {
          invalidate();
          onBack();
        }}
      />
    );
  }

  return (
    <EnquiriesPanel
      filters={filters}
      onFilters={onFilters}
      onOpen={onOpen}
      reloadKey={reloadKey}
    />
  );
}
