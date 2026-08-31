"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ConsultationDrawer } from "@/components/consultation/ConsultationDrawer";

type Open = (event: React.MouseEvent<HTMLElement>) => void;

const ConsultationContext = createContext<{ open: boolean; onOpen: Open } | null>(null);

/**
 * The consultation drawer's one piece of state, lifted to the layout so that
 * **any contact button anywhere on the site can open it**.
 *
 * It used to live in each page's own `Consultation` wrapper, which meant only
 * the side tab and the article's sticky bar could reach it. Every other
 * "Prendre rendez-vous", "Parler à un avocat" or "Obtenir un devis" on the
 * site was an inert button. They all call `useConsultation().onOpen` now.
 *
 * The drawer itself is rendered here, once, for the whole site: it is a
 * `fixed` panel that is translated off screen and `inert` while closed, so
 * mounting it on every page costs nothing and means the trigger does not have
 * to care whether its page draws a side tab.
 */
export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  /*
    The element that opened the drawer, so focus can go back to it. Taken from
    the click rather than read off document.activeElement when the drawer
    mounts: a click does not always leave focus on the button it hit, and the
    drawer moves focus to its first field immediately either way.
  */
  const trigger = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  const onOpen = useCallback<Open>((event) => {
    trigger.current = event.currentTarget;
    setOpen(true);
  }, []);

  const onClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    /*
      Restore focus here rather than in the drawer's own cleanup: a side tab is
      `inert` while the drawer is open, and only this render has already
      cleared that by the time the effect runs.
    */
    if (wasOpen.current && !open) trigger.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <ConsultationContext.Provider value={{ open, onOpen }}>
      {children}
      <ConsultationDrawer open={open} onClose={onClose} />
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    throw new Error("useConsultation must be used inside ConsultationProvider");
  }
  return ctx;
}
