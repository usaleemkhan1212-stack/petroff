"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ConsultationDrawer } from "@/components/consultation/ConsultationDrawer";
import { SideTab } from "@/components/consultation/SideTab";
import { StickyBar } from "@/components/sections/new-article/StickyBar";

/**
 * This page's three consultation controls and the one piece of state they
 * share: the red side tab (`13318:3413`), the sticky contact bar
 * (`13318:3406`), and the drawer both of them open.
 *
 * The side tab is the shared component at `tone="red"` — Figma's node is
 * `#F01A5D` with the same 18px speech bubble (path-identical to
 * `speech-bubble.svg`) and the same label, so nothing here is page-specific.
 * The drawer is the shared one too; this frame draws no drawer of its own.
 *
 * The article column's own `consult` block deliberately stays out of this —
 * it is the same form already inline on the page, so wiring its button to the
 * drawer would discard whatever the reader had typed, and it would cost
 * `Corps` its server component.
 */
export function Consultation() {
  const [open, setOpen] = useState(false);
  /*
    The element that opened the drawer, so focus can go back to it. Taken from
    the click rather than read off `document.activeElement` when the drawer
    mounts: a click does not always leave focus on the button it hit, and the
    drawer moves focus to its first field immediately either way.
  */
  const trigger = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    trigger.current = event.currentTarget;
    setOpen(true);
  }, []);

  const onClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    /*
      Restore focus here rather than in the drawer's own cleanup: the tab is
      `inert` while the drawer is open, and only this render has already
      cleared that by the time the effect runs.
    */
    if (wasOpen.current && !open) trigger.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <StickyBar onConsult={onOpen} />
      <SideTab hidden={open} onOpen={onOpen} tone="red" />
      <ConsultationDrawer open={open} onClose={onClose} />
    </>
  );
}
