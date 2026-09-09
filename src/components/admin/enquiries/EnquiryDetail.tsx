"use client";

import { useCallback, useEffect, useState } from "react";

import { deleteEnquiry, getEnquiry, updateEnquiry } from "@/lib/admin-api";
import { ApiError } from "@/lib/api";
import {
  ENQUIRY_STATUSES,
  STATUS_LABELS,
  formatDateTime,
  type Enquiry,
  type EnquiryStatus,
} from "@/lib/enquiries";

import { useAuth } from "../AuthProvider";
import { Icon } from "../icons";
import { Btn, Card, CardTitle, fieldInput } from "../ui";
import { StatusBadge } from "./StatusBadge";

/**
 * One enquiry: the visitor's submission read-only, and the three things an
 * admin may change — status, assignee and internal notes.
 *
 * **Opening this marks the enquiry read**, server-side and the first time only.
 * There is no separate call; the GET does it. That is why `onDirty` is fired on
 * mount — the list behind this has to refetch or the row keeps its unread
 * styling.
 *
 * The visitor's own fields are immutable in the API, so there is no editing UI
 * for them; the email is a `mailto:` link because replying is the point.
 */
export function EnquiryDetail({
  id,
  onBack,
  onDirty,
  onDeleted,
}: {
  id: number;
  onBack: () => void;
  /** The list is stale — the read flag or a field changed. */
  onDirty: () => void;
  onDeleted: () => void;
}) {
  const { user } = useAuth();
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [busyField, setBusyField] = useState<"status" | "assignee" | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* One place to absorb an update's response: the server owns `closed_at`, so
     the returned object replaces local state rather than being merged into it. */
  const apply = useCallback(
    (next: Enquiry) => {
      setEnquiry(next);
      setNotes(next.notes ?? "");
      onDirty();
    },
    [onDirty],
  );

  useEffect(() => {
    let cancelled = false;
    /* Entering the loading state is the point of the effect: the fetch it
       guards cannot run during render. */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setNotFound(false);
    setError(null);

    getEnquiry(id)
      .then((res) => {
        if (cancelled) return;
        setEnquiry(res.data);
        setNotes(res.data.notes ?? "");
        /* The GET just marked it read, so the list's unread styling is stale. */
        onDirty();
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) setNotFound(true);
        else if (err instanceof ApiError && err.status !== 401 && err.status !== 403)
          setError(err.message);
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
    /* `onDirty` is stable from the parent; re-running on it would refetch and
       re-mark on every render of the list. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function patch(
    field: "status" | "assignee",
    body: { status?: EnquiryStatus; assigned_to?: number | null },
  ) {
    setBusyField(field);
    setError(null);
    try {
      const res = await updateEnquiry(id, body);
      apply(res.data);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 404) setNotFound(true);
        else setError(err.errors.assigned_to?.[0] ?? err.message);
      } else throw err;
    } finally {
      setBusyField(null);
    }
  }

  async function saveNotes() {
    setSavingNotes(true);
    setError(null);
    setNotesSaved(false);
    try {
      /* An emptied box clears the field rather than storing "". */
      const res = await updateEnquiry(id, { notes: notes.trim() ? notes : null });
      apply(res.data);
      setNotesSaved(true);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 404) setNotFound(true);
        else setError(err.errors.notes?.[0] ?? err.message);
      } else throw err;
    } finally {
      setSavingNotes(false);
    }
  }

  async function remove() {
    if (!window.confirm("Delete this enquiry?")) return;
    setDeleting(true);
    try {
      await deleteEnquiry(id);
      onDeleted();
    } catch (err) {
      if (err instanceof ApiError) {
        /* Already gone is the outcome the caller wanted. */
        if (err.status === 404) onDeleted();
        else setError(err.message);
      } else throw err;
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <Card className="flex items-center justify-center gap-3 px-5 py-16">
        <span
          aria-hidden="true"
          className="border-gold/30 border-t-gold size-4 animate-spin rounded-full border-2"
        />
        <span role="status" className="text-encre/62 text-[13px]">
          Loading enquiry…
        </span>
      </Card>
    );
  }

  if (notFound || !enquiry) {
    return (
      <Card className="flex flex-col items-center gap-4 px-6 py-16 text-center">
        <b className="font-poppins text-encre text-[17px] font-semibold">
          This enquiry no longer exists
        </b>
        <p className="text-encre/62 max-w-[52ch] text-[13.5px]">
          It has been deleted, or the link points at an id that was never here.
        </p>
        <Btn onClick={onBack} icon="arrowLeft">
          Back to enquiries
        </Btn>
      </Card>
    );
  }

  const assignedToMe = user != null && enquiry.assigned_to === user.id;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Btn onClick={onBack} icon="arrowLeft">
          Back to enquiries
        </Btn>
        <span className="flex-1" />
        <StatusBadge status={enquiry.status} />
        <Btn onClick={remove} icon="trash">
          {deleting ? "Deleting…" : "Delete"}
        </Btn>
      </div>

      {error ? (
        <p
          role="alert"
          className="border-red/30 bg-pale-rose/25 text-encre rounded-[11px] border px-4 py-3 text-[13px]"
        >
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          <Card className="px-5 py-5">
            <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-poppins text-encre text-[18px] font-semibold">
                {enquiry.subject || "(no subject)"}
              </h2>
              <span className="text-encre/62 text-[12.5px]">#{enquiry.id}</span>
            </div>

            <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              <Detail label="Name">{enquiry.name}</Detail>
              <Detail label="Email">
                <a
                  href={`mailto:${enquiry.email}`}
                  className="text-periwinkle hover:underline"
                >
                  {enquiry.email}
                </a>
              </Detail>
              <Detail label="Phone">
                {enquiry.phone ? (
                  <a
                    href={`tel:${enquiry.phone.replace(/[^+\d]/g, "")}`}
                    className="text-periwinkle hover:underline"
                  >
                    {enquiry.phone}
                  </a>
                ) : (
                  "—"
                )}
              </Detail>
              <Detail label="Source">{enquiry.source || "—"}</Detail>
              <Detail label="Received">{formatDateTime(enquiry.received_at)}</Detail>
              <Detail label="First opened">{formatDateTime(enquiry.read_at)}</Detail>
              {enquiry.closed_at ? (
                <Detail label="Closed">{formatDateTime(enquiry.closed_at)}</Detail>
              ) : null}
              {enquiry.page_url ? (
                <Detail label="Page">
                  <a
                    href={enquiry.page_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-periwinkle inline-flex items-center gap-1 break-all hover:underline"
                  >
                    {enquiry.page_url}
                    <Icon name="external" size={13} />
                  </a>
                </Detail>
              ) : null}
            </dl>
          </Card>

          <Card className="px-5 py-5">
            <div className="mb-3">
              <CardTitle>Message</CardTitle>
            </div>
            {/* The visitor's own words, kept as they were typed. */}
            <p className="text-encre text-[14px] leading-[1.6] whitespace-pre-wrap">
              {enquiry.message}
            </p>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="px-5 py-5">
            <div className="mb-3">
              <CardTitle>Status</CardTitle>
            </div>
            <select
              aria-label="Status"
              value={enquiry.status}
              disabled={busyField === "status"}
              onChange={(e) =>
                patch("status", { status: e.target.value as EnquiryStatus })
              }
              className={fieldInput}
            >
              {ENQUIRY_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <p className="text-encre/62 mt-2 text-[12px]">
              Closing an enquiry records the date; reopening it clears it.
            </p>
          </Card>

          <Card className="px-5 py-5">
            <div className="mb-3">
              <CardTitle>Assignee</CardTitle>
            </div>
            <p className="text-encre mb-3 text-[13.5px]">
              {enquiry.assignee ? enquiry.assignee.name : "Unassigned"}
            </p>
            <div className="flex flex-wrap gap-2">
              {/*
                **There is no users endpoint yet**, so the only person this can
                offer is whoever is signed in. The selector is built so a real
                list drops in here — flagged to the backend dev.
              */}
              <Btn
                onClick={() => patch("assignee", { assigned_to: user?.id ?? null })}
                icon="user"
              >
                {busyField === "assignee" ? "Saving…" : "Assign to me"}
              </Btn>
              {enquiry.assigned_to !== null ? (
                <Btn onClick={() => patch("assignee", { assigned_to: null })}>
                  Unassign
                </Btn>
              ) : null}
            </div>
            {assignedToMe ? (
              <p className="text-encre/62 mt-2 text-[12px]">Assigned to you.</p>
            ) : null}
          </Card>

          <Card className="px-5 py-5">
            <div className="mb-3">
              <CardTitle>Internal notes</CardTitle>
            </div>
            <textarea
              aria-label="Internal notes"
              rows={5}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setNotesSaved(false);
              }}
              placeholder="Only the team sees this."
              className={`${fieldInput} block resize-y leading-[1.5]`}
            />
            <div className="mt-3 flex items-center gap-3">
              <Btn variant="primary" onClick={saveNotes}>
                {savingNotes ? "Saving…" : "Save notes"}
              </Btn>
              {notesSaved ? (
                <span role="status" className="text-result-green text-[12.5px]">
                  Saved
                </span>
              ) : null}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-encre/62 text-[12px]">{label}</dt>
      <dd className="text-encre mt-0.5 text-[13.5px] break-words">{children}</dd>
    </div>
  );
}
