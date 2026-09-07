"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import SpeechBubble from "@/assets/icons/speech-bubble.svg";
import { useDialogBehaviour } from "@/components/consultation/useDialogBehaviour";

import { LandingContactForm } from "./ContactForm";

/**
 * Figma `14221:9338` (the tab) and `14221:9786` (the drawer) — this page's own
 * consultation pair, asked for as a design of its own rather than the site's.
 *
 * Two things differ from `components/consultation/SideTab.tsx`: the tab is
 * **45x210**, not 45x236, and its label is English. The drawer is the hero's
 * contact form re-cornered for a panel flush against the right edge — top-left
 * 80, bottom-left 18, and no radius on the right at all — so both render the
 * shared `LandingContactForm`.
 *
 * `useDialogBehaviour` is reused rather than reimplemented: focus move, Tab
 * trap, Escape and the scroll lock are not about sliding, and a subtly wrong
 * focus trap in a second copy is exactly what duplication produces.
 */
export function LandingConsultation() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLTextAreaElement | null>(null);
  /*
    The trigger is taken from the click rather than read off
    `document.activeElement`: the tab is `inert` while the drawer is open, so
    only the render that clears it can focus it again, and a click does not
    always leave focus on the button it hit.
  */
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useDialogBehaviour({ open, onClose: close, panelRef, firstFieldRef });

  /*
    Focus returns here rather than inside `close`, and that is load-bearing: the
    tab is still `inert` in the render that closes the drawer, so focusing it
    synchronously does nothing and focus falls to <body>. Only the render that
    has cleared `inert` can take it back.
  */
  useEffect(() => {
    if (open) return;
    const trigger = triggerRef.current;
    if (!trigger) return;
    triggerRef.current = null;
    trigger.focus();
  }, [open]);

  return (
    <>
      {/*
        Shown at every width, unlike the site's tabs, which are `lg:flex` and
        therefore leave no way to open the drawer on a phone — a gap this
        file already records. On a lead page the drawer is the conversion
        path, so the tab stays reachable; at 45 wide it costs a phone 12%
        of the viewport, which is what a side tab is.

        `writing-mode: vertical-rl` rather than a rotation — no transform
        arithmetic to hug the edge, and it reflows. The 45x210 box is set
        explicitly because intrinsic sizing under vertical-rl resolves the icon
        and gap onto the wrong axes.
      */}
      <button
        type="button"
        inert={open}
        onClick={(event) => {
          triggerRef.current = event.currentTarget;
          setOpen(true);
        }}
        className="bg-red text-button font-poppins fixed top-1/2 right-0 z-40 flex h-[210px] w-[45px] -translate-y-1/2 items-center justify-center gap-3 rounded-l-[14px] text-white shadow-[0px_10px_30px_0px_rgba(18,42,76,0.2)] transition-[translate,width] duration-300 [writing-mode:vertical-rl] hover:w-[51px]"
      >
        <SpeechBubble aria-hidden="true" className="size-[18px] shrink-0" />
        <span className="whitespace-nowrap">Consult a Lawyer</span>
      </button>

      {/* Always mounted, `pointer-events-none` when closed — an always-live
          `fixed inset-0` would otherwise eat every click on the page. */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-40 bg-encre/30 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Assess my case"
        aria-hidden={!open}
        inert={!open}
        /*
          Kept mounted and translated out rather than unmounted, so the
          transition runs both ways. Its shadow offset is (0, 14) — downward —
          so unlike the site's drawer it does not paint back onto the page while
          the panel is off screen.
        */
        className={`border-encre/8 fixed inset-y-0 right-0 z-50 w-full max-w-[470px] overflow-y-auto border bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)] transition-transform duration-300 motion-reduce:transition-none sm:p-9 ${
          open ? "translate-x-0" : "translate-x-full"
        } rounded-tl-[48px] rounded-bl-[18px] sm:rounded-tl-[80px]`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="text-encre/62 hover:text-encre ml-auto block h-6 cursor-pointer text-lead leading-none"
        >
          ✕
        </button>
        <LandingContactForm idPrefix="lp-drawer" firstFieldRef={firstFieldRef} />
      </div>
    </>
  );
}
