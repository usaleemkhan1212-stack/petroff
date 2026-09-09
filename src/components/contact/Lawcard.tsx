"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "@/assets/images/lawyer-portrait-card.jpg";
import {
  ContactError,
  ContactThanks,
  FieldError,
} from "@/components/contact/ContactStatus";
import {
  composeMessage,
  useContactSubmit,
} from "@/components/contact/useContactSubmit";
import { Button } from "@/components/ui/Button";
import { CONTACT_SOURCES } from "@/lib/contact-api";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/** The three reassurance marks, in Figma's order. */
const marks = ["reponse", "evaluation", "prix"] as const;

/** The four short fields, in Figma's order — two rows of two on a 24px gap. */
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

/** Shared by the textarea and the four inputs. */
const field =
  /*
    Two explicit bits. `leading-[1.4]` because a form control does not inherit
    the token's line-height, and `block` because a textarea is inline-block by
    default — its wrapper then picks up ~6px of line-box descender, which is
    invisible until you measure the group.
  */
  "text-body leading-[1.4] text-encre placeholder:text-encre/62 border-encre/20 block w-full rounded-field border bg-white px-4.5 py-4 outline-none " +
  "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * The contact lawcard — Figma `13544:34906` on the personal page and
 * `13544:34907` on both article pages, where it is a verbatim duplicate: same
 * node names, same offsets, same copy. So one component, and its strings live
 * in the shared top-level `Lawcard` namespace beside `ContactCta`,
 * `Transparence`, `Consultation` and `Interlocuteurs`.
 *
 * A 1245 white card on a full-width band, inset **120 above and 99 below**.
 * **The band's colour is the two frames' one real difference** — lilas
 * (`13495:31490`) on the personal page, lilas-2 (`13544:34908`) on the
 * articles — so it is a `tone`, the same shape `SideTab` uses.
 *
 * Its four corner radii and its `0px 14px 34px` shadow are the Interlocuteurs
 * lawcard's, and like that one the shadow is **hover only** — the comp draws it
 * lifted, but every Figma-drawn shadow on this build has turned out to be the
 * hover state, and it is one card with no sibling to settle it either way.
 * Asked for.
 *
 * **It posts to `POST /api/contact-enquiries`** under the source
 * `lawcard-section`, through the shared `useContactSubmit`.
 *
 * Its CTA used to be a `ConsultButton`, which opened the contact popup over a
 * form the reader had just filled in and discarded what they had typed. Now
 * that the fields actually submit, it is this form's own submit — a deliberate
 * change to what CLAUDE.md records for this button. Every other contact CTA on
 * the site still opens the popup.
 */
export function Lawcard({ tone = "lilas" }: { tone?: "lilas" | "lilas-2" }) {
  const t = useTranslations("Lawcard");
  const tc = useTranslations("ContactForm");
  const [values, setValues] = useState(EMPTY);
  const form = useContactSubmit();

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
      source: CONTACT_SOURCES.lawcard,
    });
  }

  return (
    <section className={cn(tone === "lilas" ? "bg-lilas" : "bg-lilas-2")}>
      <Container className="pt-16 pb-12 lg:pt-30 lg:pb-24.75">
        <div className="border-encre/8 flex flex-col gap-10 rounded-tl-[80px] rounded-tr-[18px] rounded-br-[60px] rounded-bl-[18px] border bg-white p-6 transition-shadow hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)] sm:p-10 lg:flex-row lg:gap-16 lg:p-16">
          <div className="flex flex-col gap-7 lg:w-55.25 lg:shrink-0">
            <Image
              src={portrait}
              alt={t("photoAlt")}
              sizes="221px"
              className="h-66.25 w-full rounded-tl-[80px] rounded-tr-[4px] rounded-br-[20px] rounded-bl-[20px] object-cover lg:w-55.25"
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
                  {/* Inter Bold on a 26px line box, periwinkle — a heavier
                      tick than the green ones elsewhere on the site. */}
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

          <div className="flex min-w-0 flex-1 flex-col gap-9">
            <div className="flex flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
              <p className="text-body text-encre/62">{t("lead")}</p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-9">
              {form.done ? (
                <ContactThanks onReset={resetAll} />
              ) : (
                <>
                  <div className="flex flex-col gap-7">
                    {form.error ? (
                      <ContactError text={form.error} cooldown={form.cooldown} />
                    ) : null}

                    <div>
                      <label htmlFor="lawcard-situation" className="sr-only">
                        {t("fields.situation")}
                      </label>
                      <textarea
                        id="lawcard-situation"
                        rows={4}
                        value={values.situation}
                        onChange={(e) => set("situation", e.target.value)}
                        aria-invalid={Boolean(form.fieldErrors.message?.[0])}
                        placeholder={t("fields.situation")}
                        className={`${field} h-38.75 resize-none`}
                      />
                      <FieldError
                        id="lawcard-situation-error"
                        text={form.fieldErrors.message?.[0]}
                      />
                    </div>

                    {fields.map((row, i) => (
                      <div key={i} className="flex flex-col gap-6 sm:flex-row">
                        {row.map((key) => (
                          <div key={key} className="min-w-0 flex-1">
                            <label htmlFor={`lawcard-${key}`} className="sr-only">
                              {t(`fields.${key}`)}
                            </label>
                            <input
                              id={`lawcard-${key}`}
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
                              id={`lawcard-${key}-error`}
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
                      <Button
                        type="submit"
                        variant="red"
                        disabled={form.busy || form.cooldown > 0}
                        className="px-9 py-3.5 leading-[22px] whitespace-normal disabled:opacity-60 sm:whitespace-nowrap"
                      >
                        {form.busy ? tc("sending") : t("cta")}
                      </Button>
                      <p className="text-body text-encre/62">
                        {t.rich("phone", {
                          s: (chunks) => (
                            <span className="text-body-strong text-encre">
                              {chunks}
                            </span>
                          ),
                          n: (chunks) => (
                            <span className="text-body-strong text-red">{chunks}</span>
                          ),
                        })}
                      </p>
                    </div>
                    <p className="text-small text-encre/62 leading-6">{t("secret")}</p>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
