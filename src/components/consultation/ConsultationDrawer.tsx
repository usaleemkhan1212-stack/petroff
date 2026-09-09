"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import lawyerPortrait from "@/assets/images/lawyer-portrait-tall.jpg";
import {
  ContactError,
  ContactThanks,
  FieldError,
} from "@/components/contact/ContactStatus";
import {
  composeMessage,
  useContactSubmit,
} from "@/components/contact/useContactSubmit";
import { useDialogBehaviour } from "@/components/consultation/useDialogBehaviour";
import { Button } from "@/components/ui/Button";
import { CONTACT_SOURCES } from "@/lib/contact-api";

/**
 * `api` is the field this maps onto in the contact contract, and `societe` has
 * none — the API takes seven fields and rejects the rest, so the company name
 * is folded into the message rather than dropped.
 */
const fields = [
  { key: "nom", type: "text", api: "name" },
  { key: "email", type: "email", api: "email" },
  { key: "tel", type: "tel", api: "phone" },
  { key: "societe", type: "text", api: null },
] as const satisfies readonly {
  key: string;
  type: string;
  api: string | null;
}[];

type FieldKey = (typeof fields)[number]["key"];
const EMPTY = { nom: "", email: "", tel: "", societe: "", situation: "" };

const marks = ["reponse", "visio", "prix"] as const;

/*
  The redesign turns the field inside out: white on an `encre/20` hairline
  where it was lilas on `encre/10`, 18/16 padding where it was 18/13, and
  Inter 16/1.5 where it was the 18px body. Its labels are gone from the comp
  entirely — the placeholder carries the name now — so each label stays in the
  DOM as `sr-only` rather than being dropped, since an unlabelled input is not
  something to ship for a 22px saving.

  `border` is 1px in every state here, not the old `border-[1.5px]`: Figma
  draws 1 and browsers round border widths to whole device pixels anyway.
*/
const control =
  "text-small text-encre placeholder:text-encre/62 rounded-field border-encre/20 bg-white " +
  "w-full border px-4.5 py-4 transition-colors " +
  "focus-visible:border-periwinkle focus-visible:outline-hidden";

/**
 * The consultation panel, sliding in from the right edge over the page.
 *
 * **One component for both pages**, and now re-derived against `13816:221`,
 * which redesigns it rather than replacing it — same 510 panel, same header
 * band, same photograph, same three marks.
 *
 * What that node changed, against the `13323:4833` build:
 *
 * - the overline is **two runs**: `Consultation` in Poppins SemiBold and
 *   ` — 15 minutes gratuites` in **Inter SemiBold 16/1.45**, both still
 *   uppercase and both still tracked. **It keeps `--text-overline-tight`'s
 *   0.14em, not the 2.88px Figma states**: at 0.18em the string needs 430 of
 *   its 412px slot and wraps to two lines, taking the header from 202 to
 *   225.4. Even at 0.14em it measures **414.5** — 2.5px over — because the
 *   Inter SemiBold half is fractionally wider than the Poppins it replaced, so
 *   it also takes `sm:whitespace-nowrap` and spends those 2.5px of the ✕'s
 *   16px gap. Figma draws one line and the gap can afford it; below `sm` the
 *   panel is the viewport and it wraps, which is the behaviour already agreed
 *   for this string.
 * - the title drops from `text-h2-sm` to **`text-h3`** (Poppins SemiBold 20);
 * - the pale-blue `Objet :` pill under the header is **gone**;
 * - the fields lose their visible labels and turn white on an `encre/20`
 *   hairline at a 12px radius, with 18/16 padding and the name as placeholder;
 * - the textarea is a fixed **155** rather than four rows;
 * - the body pads **20** top and bottom where it was 24/30, the marks rule
 *   sits **8** above them where it was 18, and their lines run at 26.
 *
 * **It posts to `POST /api/contact-enquiries`** under the source
 * `consultation-drawer`, through the shared `useContactSubmit`. It is a real
 * `<form>` now that there is a submit handler — Enter submits rather than
 * reloading the page. Its `societe` field has no column in the contract, so it
 * is folded into the message body rather than being dropped.
 *
 * Kept mounted and translated out of view rather than unmounted, so the
 * transition runs both ways, and carries `aria-hidden` + `inert` while it is
 * out so nothing focusable hides off-screen.
 */
export function ConsultationDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("Consultation");
  const tc = useTranslations("ContactForm");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState(EMPTY);
  const form = useContactSubmit();

  useDialogBehaviour({ open, onClose, panelRef, firstFieldRef });

  const set = (key: FieldKey | "situation", value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const resetAll = () => {
    setValues(EMPTY);
    form.reset();
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await form.submit({
      name: values.nom,
      email: values.email,
      phone: values.tel,
      subject: t("title"),
      message: composeMessage({ Société: values.societe }, values.situation),
      source: CONTACT_SOURCES.consultationDrawer,
    });
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`bg-encre/30 fixed inset-0 z-40 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("label")}
        aria-hidden={!open}
        inert={!open}
        /*
          The shadow is carried by the open state, not the base class. Figma's
          is `-26px 0px 32px` — a NEGATIVE x offset with a 32px blur, so it
          paints to the LEFT of the panel and would stay on screen while the
          panel itself is translated off it, reading as a grey band down the
          right edge behind the tab.
        */
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-127.5 flex-col overflow-y-auto bg-white transition-[translate,box-shadow] duration-300 motion-reduce:transition-none ${
          open
            ? "translate-x-0 shadow-[-26px_0px_32px_0px_rgba(18,42,76,0.22)]"
            : "translate-x-full shadow-none"
        }`}
      >
        <div className="bg-lilas border-encre/8 flex flex-col gap-2 border-b px-7.5 pt-6.5 pb-4.5">
          <div className="flex items-center gap-4">
            <p className="text-overline-tight font-poppins text-brique min-w-0 flex-1 uppercase sm:whitespace-nowrap">
              {t.rich("overline", {
                /* The second half is Inter SemiBold 16/1.45 and inherits the
                   overline's tracking and uppercase — `text-small-strong`
                   cannot be used, since it would reset letter-spacing to 0. */
                i: (chunks) => (
                  <span className="font-inter leading-[1.45] font-semibold">
                    {chunks}
                  </span>
                ),
              })}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("close")}
              /* h-6 because Figma's close box is 24 tall and sets the row's
                 height; text-lead with leading-none draws a 20px box. */
              className="text-lead font-inter text-encre/62 hover:text-encre h-6 w-5.5 shrink-0 cursor-pointer text-center leading-none transition-colors"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          {/*
            Figma's `who` row: a 126px photo that stretches to the height of
            the copy beside it (`self-stretch`), not a fixed box.
          */}
          <div className="flex items-start gap-4">
            <div className="relative w-31.5 shrink-0 self-stretch overflow-hidden rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px]">
              <Image
                src={lawyerPortrait}
                alt=""
                fill
                sizes="126px"
                className="object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
              <h2 className="text-h3 font-poppins text-encre">{t("title")}</h2>
              <p className="text-small text-encre/62">{t("lead")}</p>
            </div>
          </div>
        </div>

        <form className="flex flex-col gap-3 px-7.5 py-5" onSubmit={onSubmit}>
          {form.done ? (
            <ContactThanks onReset={resetAll} className="py-4" />
          ) : (
            <>
              {form.error ? (
                <ContactError text={form.error} cooldown={form.cooldown} />
              ) : null}

              {fields.map(({ key, type, api }) => (
                <div key={key} className="flex flex-col gap-1">
                  <label htmlFor={`consult-drawer-${key}`} className="sr-only">
                    {t(`fields.${key}`)}
                  </label>
                  <input
                    id={`consult-drawer-${key}`}
                    ref={key === "nom" ? firstFieldRef : undefined}
                    type={type}
                    value={values[key]}
                    onChange={(e) => set(key, e.target.value)}
                    aria-invalid={Boolean(api && form.fieldErrors[api]?.[0])}
                    aria-describedby={
                      api && form.fieldErrors[api]?.[0]
                        ? `consult-drawer-${key}-error`
                        : undefined
                    }
                    placeholder={t(`fields.${key}`)}
                    className={control}
                  />
                  <FieldError
                    id={`consult-drawer-${key}-error`}
                    text={api ? form.fieldErrors[api]?.[0] : undefined}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1">
                <label htmlFor="consult-drawer-situation" className="sr-only">
                  {t("situation")}
                </label>
                {/* Figma fixes this control at 155, where it used to be four rows. */}
                <textarea
                  id="consult-drawer-situation"
                  value={values.situation}
                  onChange={(e) => set("situation", e.target.value)}
                  aria-invalid={Boolean(form.fieldErrors.message?.[0])}
                  placeholder={t("situationPlaceholder")}
                  className={`${control} h-38.75 resize-y`}
                />
                <FieldError
                  id="consult-drawer-situation-error"
                  text={form.fieldErrors.message?.[0]}
                />
              </div>

              <Button
                type="submit"
                variant="red"
                disabled={form.busy || form.cooldown > 0}
                className="w-full px-0 py-3.5 disabled:opacity-60"
              >
                {form.busy ? tc("sending") : t("cta")}
              </Button>
            </>
          )}

          <p className="text-small text-encre/62 leading-6">{t("footnote")}</p>

          <ul className="border-encre/10 border-t pt-2">
            {marks.map((key) => (
              <li
                key={key}
                className="text-small text-encre/62 flex items-start gap-2.5 py-1.75 leading-[26px]"
              >
                <span
                  aria-hidden="true"
                  className="text-periwinkle w-3.75 shrink-0 font-bold"
                >
                  ✓
                </span>
                <span className="min-w-0 flex-1">
                  {t.rich(`marks.${key}`, {
                    b: (chunks) => (
                      <span className="text-button font-poppins text-periwinkle">
                        {chunks}
                      </span>
                    ),
                  })}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-small text-encre/62">
            {t.rich("phone", {
              q: (chunks) => (
                <span className="text-small-strong text-encre">{chunks}</span>
              ),
              tel: (chunks) => (
                <span className="text-small-strong text-red">{chunks}</span>
              ),
            })}
          </p>
        </form>
      </div>
    </>
  );
}
