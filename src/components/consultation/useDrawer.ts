"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The sliding drawer's own open/close state, owned per page by the
 * `Consultation` wrappers rather than by `ConsultationProvider`.
 *
 * **The site has two contact panels, and they are opened by different
 * things.** `ConsultationProvider` owns the centred `ContactModal`, which every
 * ordinary contact button on the site reaches through `useConsultation`; the
 * red side tab and the article sticky bar are the drawer's own persistent
 * controls and keep opening the drawer, which is what this hook is for.
 */
export function useDrawer() {
  const [open, setOpen] = useState(false);
  /*
    The element that opened it, so focus can go back there. Taken from the
    click rather than read off document.activeElement when the drawer mounts: a
    click does not always leave focus on the button it hit, and the drawer
    moves focus to its first field immediately either way.
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
      Restore focus here rather than in the drawer's own cleanup: the side tab
      is `inert` while the drawer is open, and only this render has already
      cleared that by the time the effect runs.
    */
    if (wasOpen.current && !open) trigger.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return { open, onOpen, onClose };
}
