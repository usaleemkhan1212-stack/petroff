"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SideTab } from "@/components/consultation/SideTab";
import { ConsultationDrawer } from "@/components/consultation/ConsultationDrawer";

/**
 * The home page's consultation controls and the one piece of state they share:
 * the red side tab (`13323:4812`) and the drawer it opens (`13323:4833`).
 *
 * Unlike the article's wrapper there is no sticky bar — the home frame draws
 * only the tab.
 */
export function Consultation() {
  const [open, setOpen] = useState(false);
  /*
    The element that opened the drawer, so focus can go back to it. Taken from
    the click rather than read off document.activeElement when the drawer
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
      <SideTab hidden={open} onOpen={onOpen} tone="red" />
      <ConsultationDrawer open={open} onClose={onClose} />
    </>
  );
}
