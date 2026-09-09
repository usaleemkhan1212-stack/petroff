"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "@/assets/images/lawyer-portrait-modal.jpg";
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

/** The three reassurance marks, in Figma's order. */
const marks = ["reponse", "evaluation", "prix"] as const;

/** The four short fields — two rows of two on a 24px gap. */
const fields = [
  ["nom", "email"],
  ["telephone", "societe"],
] as const;

type FieldKey = (typeof fields)[number][number];

/**
 * Which contract field each one maps onto. `societe` has none — the API takes
 * seven fields and rejects the rest — so it is folded into the message.
 */
const API_FIELD: Record<FieldKey, string | null> = {
  nom: "name",
  email: "email",
  telephone: "phone",
  societe: null,
};

const EMPTY = { nom: "", email: "", telephone: "", societe: "", situation: "" };

/**
 * Shared by the textarea and the four inputs. Two explicit bits, both of which
 * the Lawcard's own note records: `leading-[1.5]` because a form control does
 * not inherit the token's line-height, and `block` because a textarea is
 * inline-block by default and its wrapper then picks up ~6px of line-box
 * descender — invisible until you measure the group.
 *
 * Its type is `text-small` (16) where the Lawcard section's is `text-body`
 * (18): this whole card is the Lawcard at a smaller scale.
 */
const field =
  "text-small leading-[1.5] text-encre placeholder:text-encre/62 border-encre/20 block w-full rounded-field border bg-white px-4.5 py-4 outline-none " +
  "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * The contact popup — Figma `13894:9964`, a 1000x670 card centred over the
 * page. **It replaces the sliding consultation drawer** as what every contact
 * button on the site opens: the side tab, both articles' sticky bars and the
 * hundred-odd `ConsultButton` / `ConsultTrigger` call sites all reach it
 * through `ConsultationProvider`.
 *
 * **It is the Lawcard section re-laid-out as a dialog**, and the copy proves
 * it: overline, title, lead, name, address, all three marks, all four field
 * labels, the CTA, the phone line and the footnote are character-identical, so
 * it reads the same top-level `Lawcard` namespace. Only the long textarea
 * placeholder is its own string. Its card radii (80 / 18 / 60 / 18), its photo
 * radii (80 / 4 / 20 / 20) and its `0px 14px 34px` shadow are that section's
 * too — the shadow permanent here, since a dialog floats over the page by
 * definition rather than on hover.
 *
 * What differs is the scale: 36 of padding and a 36 column gap against the
 * section's 64, a `text-price` title against its fluid `text-h2`, 16px type
 * through the lead, the fields and the phone line against 18, and a 221x160
 * landscape portrait against its 221x265.
 *
 * **It posts to `POST /api/contact-enquiries`** under the source
 * `contact-popup`, through the shared `useContactSubmit`. It is a real
 * `<form>` now that there is a submit handler, so Enter submits rather than
 * reloading the page.
 *
 * Kept mounted and faded out rather than unmounted, so the transition runs both
 * ways, and it carries `aria-hidden` + `inert` while closed so nothing
 * focusable hides behind the page.
 */
export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("Lawcard");
  const tc = useTranslations("ContactForm");
  const dialog = useTranslations("Consultation");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLTextAreaElement>(null);
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
      phone: values.telephone,
      subject: t("title"),
      message: composeMessage({ Société: values.societe }, values.situation),
      source: CONTACT_SOURCES.contactModal,
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

      {/*
        A centring layer rather than a click target: it is `pointer-events-none`
        so the backdrop underneath keeps taking the click that closes, and only
        the card itself takes events back.
      */}
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div
          ref={panelRef}
          /* The site's contact anchor: any `<a href="#contact">` opens this
             panel — see the delegated handler in `ConsultationProvider`. */
          id="contact"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          aria-hidden={!open}
          inert={!open}
          className={`border-encre/8 pointer-events-auto relative max-h-full w-full max-w-250 overflow-y-auto border bg-white p-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)] transition-[opacity,scale] duration-300 motion-reduce:transition-none sm:p-9 ${
            /* Figma's four radii, softened below `sm`: an 80px top-left corner
               eats a quarter of a 320px card. */
            "rounded-tl-[48px] rounded-tr-[18px] rounded-br-[36px] rounded-bl-[18px] sm:rounded-tl-[80px] sm:rounded-br-[60px]"
          } ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
        >
          {/* Figma draws no close control. A dialog needs a visible one, so
              this is a deliberate addition — Escape and the backdrop work too.
              It sits above the 18px top-right corner, clear of the overline. */}
          <button
            type="button"
            onClick={onClose}
            aria-label={dialog("close")}
            className="text-encre/62 hover:text-encre focus-visible:outline-gold absolute top-3 right-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 sm:top-4 sm:right-4"
          >
            <span aria-hidden="true" className="text-lead leading-none">
              ✕
            </span>
          </button>

          {/*
            Figma's two columns — a 221 rail beside the flexed form on a 36px
            gap. **The DOM order is head, form, rail**, which is the reading
            order once they stack: the rail is a photograph, a name and three
            reassurance marks, and putting ~490px of it above the title would
            bury the form on a phone. The grid puts the rail back on the left,
            spanning both rows, from `lg`.
          */}
          <div className="grid gap-6 lg:grid-cols-[13.8125rem_1fr] lg:gap-x-9">
            <div className="flex flex-col gap-3 lg:col-start-2 lg:row-start-1">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2
                id="contact-modal-title"
                className="text-price font-poppins text-encre"
              >
                {t("title")}
              </h2>
              <p className="text-small text-encre/62">{t("lead")}</p>
            </div>

            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-6 lg:col-start-2 lg:row-start-2"
            >
              {form.done ? (
                <ContactThanks onReset={resetAll} />
              ) : (
                <>
                  <div className="flex flex-col gap-4">
                    {form.error ? (
                      <ContactError text={form.error} cooldown={form.cooldown} />
                    ) : null}

                    <div>
                      <label htmlFor="contact-modal-situation" className="sr-only">
                        {t("fields.situation")}
                      </label>
                      <textarea
                        ref={firstFieldRef}
                        id="contact-modal-situation"
                        rows={4}
                        value={values.situation}
                        onChange={(e) => set("situation", e.target.value)}
                        aria-invalid={Boolean(form.fieldErrors.message?.[0])}
                        placeholder={t("fields.situationPlaceholder")}
                        className={`${field} h-38.75 resize-none`}
                      />
                      <FieldError
                        id="contact-modal-situation-error"
                        text={form.fieldErrors.message?.[0]}
                      />
                    </div>

                    {fields.map((row, i) => (
                      <div key={i} className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        {row.map((key) => (
                          <div key={key} className="min-w-0 flex-1">
                            <label htmlFor={`contact-modal-${key}`} className="sr-only">
                              {t(`fields.${key}`)}
                            </label>
                            <input
                              id={`contact-modal-${key}`}
                              type={key === "email" ? "email" : "text"}
                              value={values[key]}
                              onChange={(e) => set(key, e.target.value)}
                              aria-invalid={Boolean(
                                API_FIELD[key] &&
                                form.fieldErrors[API_FIELD[key]!]?.[0],
                              )}
                              placeholder={t(`fields.${key}`)}
                              className={`${field} text-ellipsis`}
                            />
                            <FieldError
                              id={`contact-modal-${key}-error`}
                              text={
                                API_FIELD[key]
                                  ? form.fieldErrors[API_FIELD[key]!]?.[0]
                                  : undefined
                              }
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      {/* Figma pads it 36/14, which none of `Button`'s sizes gives. */}
                      <Button
                        type="submit"
                        variant="red"
                        disabled={form.busy || form.cooldown > 0}
                        className="px-9 py-3.5 leading-[22px] whitespace-normal disabled:opacity-60 sm:whitespace-nowrap"
                      >
                        {form.busy ? tc("sending") : t("cta")}
                      </Button>
                      <p className="text-small text-encre/62">
                        {t.rich("phone", {
                          s: (chunks) => (
                            <span className="text-small-strong text-encre">
                              {chunks}
                            </span>
                          ),
                          n: (chunks) => (
                            <span className="text-small-strong text-red">{chunks}</span>
                          ),
                        })}
                      </p>
                    </div>
                    {/* Inter 14/24 — the one value on this card with no token, and
                    the same string the Lawcard section sets at 16. It is the
                    scaled-down card again; flagged to the designer. */}
                    <p className="text-encre/62 font-inter text-[14px] leading-6">
                      {t("secret")}
                    </p>
                  </div>
                </>
              )}
            </form>

            <div className="flex flex-col gap-4 lg:col-start-1 lg:row-span-2 lg:row-start-1">
              <Image
                src={portrait}
                alt={t("photoAlt")}
                sizes="(min-width: 1024px) 221px, 100vw"
                className="h-40 w-full rounded-tl-[48px] rounded-tr-[4px] rounded-br-[20px] rounded-bl-[20px] object-cover sm:rounded-tl-[80px]"
              />

              <div className="flex flex-col gap-1">
                <p className="text-h3 font-poppins text-encre">{t("name")}</p>
                <p className="text-small text-encre/62">
                  {t.rich("address", { br: () => <br /> })}
                </p>
              </div>

              {/* A rule above, then the first mark's own 16px of clearance. */}
              <ul className="border-encre/10 flex flex-col gap-4 border-t pt-4">
                {marks.map((key) => (
                  <li key={key} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="text-small text-periwinkle shrink-0 leading-[26px] font-bold"
                    >
                      ✓
                    </span>
                    <p className="text-small text-encre/62 min-w-0 flex-1 leading-[26px]">
                      {t.rich(`marks.${key}`, {
                        s: (chunks) => (
                          <span className="text-button font-poppins text-periwinkle leading-[26px]">
                            {chunks}
                          </span>
                        ),
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
