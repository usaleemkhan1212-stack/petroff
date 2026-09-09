import { request, type ApiEnvelope } from "./api";

/**
 * The public contact endpoint — **no auth, no token, no cookie.**
 *
 * Every real contact form on the site posts here and identifies itself with
 * `source`, which is what the admin filters by. The API rejects anything
 * outside these seven fields, so information a form collects that the contract
 * has no column for (a company name, a deal size) is folded into `message`
 * rather than invented as a new key.
 */
export type ContactEnquiryInput = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source: string;
  page_url?: string;
};

/**
 * The server's own limits, mirrored so a form can say so before spending a
 * round trip. The server remains the authority — these only save a request.
 */
export const CONTACT_LIMITS = {
  name: 255,
  email: 255,
  phone: 100,
  subject: 500,
  message: 10_000,
  source: 100,
  page_url: 2048,
} as const;

/** Where each form lives, for the admin's `source` filter. */
export const CONTACT_SOURCES = {
  contactModal: "contact-popup",
  consultationDrawer: "consultation-drawer",
  lawcard: "lawcard-section",
  landingPage: "landing-page",
} as const;

export type ContactSource = (typeof CONTACT_SOURCES)[keyof typeof CONTACT_SOURCES];

/**
 * Validates what can be checked without the server: required fields, a
 * plausible email, and the length caps. Returns Laravel's own error shape so
 * a form renders a local failure and a 422 through exactly one path.
 */
export function validateContactInput(input: ContactEnquiryInput) {
  const errors: Record<string, string[]> = {};

  if (!input.name.trim()) errors.name = ["Please enter your name."];
  else if (input.name.length > CONTACT_LIMITS.name)
    errors.name = [`Please keep this under ${CONTACT_LIMITS.name} characters.`];

  if (!input.email.trim()) errors.email = ["Please enter your email address."];
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))
    errors.email = ["Please enter a valid email address."];
  else if (input.email.length > CONTACT_LIMITS.email)
    errors.email = [`Please keep this under ${CONTACT_LIMITS.email} characters.`];

  if (!input.message.trim()) errors.message = ["Please tell us about your situation."];
  else if (input.message.length > CONTACT_LIMITS.message)
    errors.message = [`Please keep this under ${CONTACT_LIMITS.message} characters.`];

  if (input.phone && input.phone.length > CONTACT_LIMITS.phone)
    errors.phone = [`Please keep this under ${CONTACT_LIMITS.phone} characters.`];

  if (input.subject && input.subject.length > CONTACT_LIMITS.subject)
    errors.subject = [`Please keep this under ${CONTACT_LIMITS.subject} characters.`];

  return errors;
}

/**
 * `page_url` must be an absolute URL and at most 2048 characters, so a very
 * long one is dropped rather than sent to be rejected.
 */
export function currentPageUrl(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const href = window.location.href;
  return href.length <= CONTACT_LIMITS.page_url ? href : undefined;
}

export function submitContactEnquiry(input: ContactEnquiryInput) {
  /* Optional fields are dropped when empty — the API takes their absence, not
     an empty string, as "not provided". */
  const body: Record<string, string> = {
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    source: input.source,
  };
  if (input.phone?.trim()) body.phone = input.phone.trim();
  if (input.subject?.trim()) body.subject = input.subject.trim();
  if (input.page_url) body.page_url = input.page_url;

  return request<ApiEnvelope<{ id: number }>>("/api/contact-enquiries", {
    method: "POST",
    body,
  });
}
