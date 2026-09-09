"use client";

import { useCallback, useEffect, useState } from "react";

import { ApiError } from "@/lib/api";
import {
  currentPageUrl,
  submitContactEnquiry,
  validateContactInput,
  type ContactEnquiryInput,
} from "@/lib/contact-api";

/**
 * What every public contact form on the site does when it is submitted.
 *
 * The site has four of them — the contact popup, the consultation drawer, the
 * Lawcard section and the landing page's form — with different fields and
 * different designs but exactly one behaviour: validate what can be validated
 * locally, POST, and then show either a thank-you or the server's own errors.
 * Keeping that here is what stops four subtly different implementations of a
 * 429 cool-down.
 *
 * **A submission can take several seconds**: the API sends a notification email
 * synchronously before it answers. So `busy` gates the button for the whole
 * round trip and a second submit while one is in flight is ignored outright —
 * a double-post is two enquiries in the firm's inbox, not a cosmetic problem.
 */
export type ContactFormState = {
  busy: boolean;
  /** True once the API has accepted it — the form swaps to a thank-you. */
  done: boolean;
  /** A banner: the API's `message`, a 429 notice, or a network failure. */
  error: string | null;
  /** Laravel's `errors`, keyed by API field name. */
  fieldErrors: Record<string, string[]>;
  /** Seconds left of a 429 cool-down; 0 when there is none. */
  cooldown: number;
  submit: (input: Omit<ContactEnquiryInput, "page_url">) => Promise<boolean>;
  reset: () => void;
};

/**
 * What to wait after a 429 when the API's own `Retry-After` cannot be read.
 * CORS hides it unless the server lists it in `Access-Control-Expose-Headers`,
 * and the limit is 5 a minute, so a minute clears it.
 */
const RETRY_FALLBACK_SECONDS = 60;

export function useContactSubmit(): ContactFormState {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const reset = useCallback(() => {
    setDone(false);
    setError(null);
    setFieldErrors({});
  }, []);

  const submit = useCallback(
    async (input: Omit<ContactEnquiryInput, "page_url">) => {
      if (busy || cooldown > 0) return false;

      const payload: ContactEnquiryInput = {
        ...input,
        page_url: currentPageUrl(),
      };

      const local = validateContactInput(payload);
      if (Object.keys(local).length) {
        setFieldErrors(local);
        setError(null);
        return false;
      }

      setBusy(true);
      setError(null);
      setFieldErrors({});

      try {
        await submitContactEnquiry(payload);
        setDone(true);
        return true;
      } catch (err) {
        if (!(err instanceof ApiError)) throw err;

        if (err.status === 429) {
          setCooldown(err.retryAfter ?? RETRY_FALLBACK_SECONDS);
          setError("Too many submissions, please try again in a minute.");
        } else if (err.status === 422) {
          setFieldErrors(err.errors);
          /* The banner is the fallback: with per-field errors on screen the
             top-level message usually repeats one of them. */
          if (!Object.keys(err.errors).length) setError(err.message);
        } else {
          setError(err.message);
        }
        return false;
      } finally {
        setBusy(false);
      }
    },
    [busy, cooldown],
  );

  return { busy, done, error, fieldErrors, cooldown, submit, reset };
}

/**
 * Folds the fields the API has no column for into the message body.
 *
 * The contract is seven fields and rejects the rest, so a company name or a
 * deal size collected by a form would otherwise simply be lost. Labelling them
 * above the visitor's own words keeps them in front of whoever reads the
 * enquiry without inventing a key the API would refuse.
 */
export function composeMessage(
  extras: Record<string, string | undefined>,
  message: string,
) {
  const lines = Object.entries(extras)
    .filter(([, v]) => v && v.trim())
    .map(([label, v]) => `${label}: ${v!.trim()}`);
  return lines.length ? `${lines.join("\n")}\n\n${message.trim()}` : message.trim();
}
