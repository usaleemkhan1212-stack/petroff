"use client";

import { useTranslations } from "next-intl";

/**
 * The two states every French-language contact form on the site shares: the
 * banner it shows when a submission fails, and the thank-you that replaces the
 * fields when one succeeds.
 *
 * The landing page carries its own English copies of both — that page has its
 * own root layout and no next-intl, so it cannot read this catalogue.
 */

export function ContactError({
  text,
  cooldown,
}: {
  text: string;
  /** Seconds left of a 429 cool-down, appended when there are any. */
  cooldown?: number;
}) {
  const t = useTranslations("ContactForm");
  return (
    <p
      role="alert"
      className="border-red/30 bg-pale-rose/25 text-small text-encre rounded-field border px-4 py-3 leading-[1.5]"
    >
      {text}
      {cooldown && cooldown > 0 ? (
        <span className="text-encre/62"> {t("retryIn", { seconds: cooldown })}</span>
      ) : null}
    </p>
  );
}

export function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <span id={id} className="text-red text-[12px] leading-[1.4]">
      {text}
    </span>
  );
}

/**
 * Replaces the form once the API has accepted the enquiry.
 *
 * It offers a way back to a blank form rather than being a dead end: a visitor
 * who realises they left something out should not have to reload the page.
 */
export function ContactThanks({
  onReset,
  className = "",
}: {
  onReset: () => void;
  className?: string;
}) {
  const t = useTranslations("ContactForm");
  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="bg-pale-mint text-result-green flex size-11 items-center justify-center rounded-full text-[20px]"
      >
        ✓
      </span>
      <h3 className="text-h3 font-poppins text-encre" role="status">
        {t("thanksTitle")}
      </h3>
      <p className="text-small text-encre/62">{t("thanksBody")}</p>
      <button
        type="button"
        onClick={onReset}
        className="text-small-strong text-periwinkle cursor-pointer hover:underline"
      >
        {t("thanksAgain")}
      </button>
    </div>
  );
}
