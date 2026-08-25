"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Everything a sliding consultation drawer has to do while it is open, shared
 * by the article's panel and the home page's: move focus to the first field,
 * trap Tab inside the panel, close on Escape, and lock the page behind it.
 *
 * The two drawers differ only in what they draw — this behaviour is identical
 * in both, and getting a focus trap subtly wrong in one copy is exactly the
 * kind of bug duplication causes.
 */
export function useDrawerBehaviour({
  open,
  onClose,
  panelRef,
  firstFieldRef,
}: {
  open: boolean;
  onClose: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
  firstFieldRef: RefObject<HTMLInputElement | null>;
}) {
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
  }, [open, onClose, panelRef, firstFieldRef]);
}
