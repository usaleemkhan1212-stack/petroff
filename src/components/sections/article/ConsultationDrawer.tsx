"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import LawyerFigure from "@/assets/icons/lawyer-figure.svg";
import { Button } from "@/components/ui/Button";

const fields = [
  { key: "nom", type: "text" },
  { key: "email", type: "email" },
  { key: "tel", type: "tel" },
  { key: "societe", type: "text" },
] as const satisfies readonly { key: string; type: string }[];

const marks = ["reponse", "visio", "prix"] as const;

const labelClass = "text-small-strong text-encre/62";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
 * Figma's `drawer` (13116:1880): the article's consultation panel, sliding in
 * from the right edge over the page.
 *
 * Real, labelled inputs but **not wrapped in a `<form>`** — there is no submit
 * handler, and a bare form would reload the page on Enter. Same call as the
 * Consult block it mirrors, the Tools section and the OpenData lookup.
 *
 * It is kept mounted and translated out of view rather than unmounted, so the
 * transition runs both ways, and carries `aria-hidden` + `inert` while it is
 * out so nothing focusable hides off-screen.
 *
 * Its figure is the seams' composed `lawyer-figure.svg` at 60.125x101 — a
 * uniform 1.1995x of that file's own 50.125x84.202. The file carries a
 * viewBox, so its strokes scale with the geometry and it reuses exactly.
 */
export function ConsultationDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("ArticlePage.drawer");
  /*
    The four field labels and the secret-professionnel note are character-
    identical to the Consult block's, so they are read from its namespace
    rather than duplicated — the pattern ContactCta established.
  */
  const tc = useTranslations("ArticlePage.consult");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    /* Figma draws the Nom field focused, which is also where a reader starts. */
    firstFieldRef.current?.focus();

    const focusable = () =>
      [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) =>
        el.checkVisibility(),
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      /* Trap: wrap at both ends rather than letting focus reach the page. */
      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    /*
      Lock the background. The scrollbar's width is handed back as padding, so
      removing it does not shift the whole page right by ~15px.
    */
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open, onClose]);

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
          paints to the LEFT of the panel and stayed on screen while the panel
          itself was translated off it, reading as a grey band down the right
          edge behind the gold tab. Transitioned with the slide so it fades out
          as the panel leaves rather than snapping.
        */
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-127.5 flex-col overflow-y-auto bg-white transition-[translate,box-shadow] duration-300 motion-reduce:transition-none ${
          open
            ? "translate-x-0 shadow-[-26px_0px_32px_0px_rgba(18,42,76,0.22)]"
            : "translate-x-full shadow-none"
        }`}
      >
        <div className="bg-lilas border-encre/8 flex flex-col gap-2 border-b px-7.5 pt-6.5 pb-4.5">
          <div className="flex items-center gap-4">
            {/*
              +14% tracking, not the +18% every other overline on the site
              carries: at 0.18em this string measures 426px inside its 412px
              slot and wraps, where Figma draws one 21px line.
            */}
            <p className="text-overline-tight font-poppins text-brique min-w-0 flex-1">
              {t("overline")}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("close")}
              /* h-6 because Figma's ✕ box is 24 tall and sets the row's
                 height; text-lead with leading-none draws a 20px box, which
                 pulled the whole header band 3px short. */
              className="text-lead font-inter text-encre/62 hover:text-encre h-6 w-5.5 shrink-0 cursor-pointer text-center leading-none transition-colors"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <LawyerFigure
              aria-hidden="true"
              width={60.125}
              height={101}
              className="shrink-0"
            />
            <h2 className="text-h2-sm text-encre min-w-0 flex-1">
              {t("title")}
            </h2>
          </div>

          <p className="text-small text-encre/62">{t("lead")}</p>

          <p className="bg-pale-blue text-small-strong text-encre self-start rounded-full px-3.5 py-1.25">
            {t("objet")}
          </p>
        </div>

        <div className="flex flex-col gap-3 px-7.5 pt-6 pb-7.5">
          {fields.map(({ key, type }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label htmlFor={`drawer-${key}`} className={labelClass}>
                {tc(`fields.${key}`)}
              </label>
              <input
                id={`drawer-${key}`}
                ref={key === "nom" ? firstFieldRef : undefined}
                type={type}
                className={control}
              />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="drawer-situation" className={labelClass}>
              {t("situation")}
            </label>
            {/*
              4 rows at text-body's 25.2px line box lands the control on
              Figma's 132px, which it draws as 14px of copy over 70px of
              empty space.
            */}
            <textarea
              id="drawer-situation"
              rows={4}
              placeholder={t("situationPlaceholder")}
              className={`${control} resize-y`}
            />
          </div>

          <Button variant="gold" className="w-full px-0 py-3.75">
            {t("cta")}
          </Button>

          <p className="text-small text-encre/62">{tc("footnote")}</p>

          <ul className="border-encre/10 border-t pt-4.5">
            {marks.map((key) => (
              <li
                key={key}
                className="text-small text-encre/62 flex items-start gap-2.5 py-1.75"
              >
                <span
                  aria-hidden="true"
                  className="text-result-green w-3.75 shrink-0 font-bold"
                >
                  ✓
                </span>
                <span className="min-w-0 flex-1">
                  {t.rich(`marks.${key}`, {
                    b: (chunks) => (
                      <span className="text-button font-poppins text-encre">
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
              tel: (chunks) => (
                <span className="text-small-strong text-periwinkle">
                  {chunks}
                </span>
              ),
            })}
          </p>
        </div>
      </div>
    </>
  );
}
