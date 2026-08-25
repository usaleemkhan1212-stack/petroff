"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import lawyerPortrait from "@/assets/images/lawyer-portrait-tall.jpg";
import { useDrawerBehaviour } from "./useDrawerBehaviour";
import { Button } from "@/components/ui/Button";

const fields = [
  { key: "nom", type: "text" },
  { key: "email", type: "email" },
  { key: "tel", type: "tel" },
  { key: "societe", type: "text" },
] as const satisfies readonly { key: string; type: string }[];

const marks = ["reponse", "visio", "prix"] as const;

const labelClass = "text-small-strong text-encre/62";

/*
  border-[1.5px] in every state rather than 1px growing to Figma's focused
  1.5px: browsers round border widths to whole device pixels, so at dpr 1 both
  render 1px, and swapping the width on focus would shift the field's content
  by half a pixel. Only the colour and the ground change, which is the whole of
  what Figma draws for the focused Nom field.
*/
const control =
  "text-body text-encre placeholder:text-encre/45 rounded-field border-encre/10 bg-lilas " +
  "w-full border-[1.5px] px-4.5 py-3.25 transition-colors " +
  "focus-visible:border-periwinkle focus-visible:bg-white focus-visible:outline-hidden";

/**
 * The consultation panel, sliding in from the right edge over the page.
 *
 * **One component for both pages.** The article had its own drawer — an
 * illustrated figure, a gold submit, result-green ticks, a caps overline —
 * until the redesign replaced it with `13318:3628`, which is identical to the
 * home page's `13323:4833` right down to the photograph: the two exports diff
 * at **0.00**. So the two were merged. If they diverge again, split the
 * presentation and keep sharing `useDrawerBehaviour`.
 *
 * Real, labelled inputs but **not wrapped in a `<form>`** — there is no submit
 * handler, and a bare form would reload the page on Enter. Same call as Tools
 * and the OpenData lookup.
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
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useDrawerBehaviour({ open, onClose, panelRef, firstFieldRef });

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
        <div className="bg-lilas border-encre/8 flex flex-col gap-4 border-b px-7.5 pt-6.5 pb-4.5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              {/*
                +14% tracking, not the +18% every other overline on the site
                carries: Figma leaves this string exactly 412px of a 450px row
                once the 22px close control and its 16px gap are taken out.
              */}
              <p className="text-overline-tight font-poppins text-brique min-w-0 flex-1">
                {t("overline")}
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
                <h2 className="text-h2-sm text-encre">{t("title")}</h2>
                <p className="text-small text-encre/62">{t("lead")}</p>
              </div>
            </div>
          </div>

          <p className="bg-pale-blue text-small-strong text-encre self-start rounded-full px-3.5 py-1.25">
            {t("objet")}
          </p>
        </div>

        <div className="flex flex-col gap-3 px-7.5 pt-6 pb-7.5">
          {fields.map(({ key, type }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label htmlFor={`consult-drawer-${key}`} className={labelClass}>
                {t(`fields.${key}`)}
              </label>
              <input
                id={`consult-drawer-${key}`}
                ref={key === "nom" ? firstFieldRef : undefined}
                type={type}
                className={control}
              />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="consult-drawer-situation" className={labelClass}>
              {t("situation")}
            </label>
            {/*
              4 rows at text-body's 25.2px line box lands the control on
              Figma's 132px, which it draws as 14px of copy over 70px of
              empty space.
            */}
            <textarea
              id="consult-drawer-situation"
              rows={4}
              placeholder={t("situationPlaceholder")}
              className={`${control} resize-y`}
            />
          </div>

          <Button variant="red" className="w-full px-0 py-3.75">
            {t("cta")}
          </Button>

          <p className="text-small text-encre/62">{t("footnote")}</p>

          <ul className="border-encre/10 border-t pt-4.5">
            {marks.map((key) => (
              <li
                key={key}
                className="text-small text-encre/62 flex items-start gap-2.5 py-1.75"
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
        </div>
      </div>
    </>
  );
}
