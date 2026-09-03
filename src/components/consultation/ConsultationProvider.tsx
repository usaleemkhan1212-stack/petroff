"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ContactModal } from "@/components/consultation/ContactModal";

type Open = (event: React.MouseEvent<HTMLElement>) => void;

const ConsultationContext = createContext<{ open: boolean; onOpen: Open } | null>(null);

/**
 * The contact popup's one piece of state, lifted to the layout so that
 * **any contact button anywhere on the site can open it**.
 *
 * Before it existed, contact state lived in each page's own `Consultation`
 * wrapper, which meant only the side tab and the article's sticky bar could
 * reach a panel at all: every other "Prendre rendez-vous", "Parler à un
 * avocat" or "Obtenir un devis" on the site was an inert button. They all call
 * `useConsultation().onOpen` now.
 *
 * **The site has two contact panels.** This context owns the centred
 * `ContactModal` (`13894:9964`), which is what every ordinary contact button
 * opens. The sliding `ConsultationDrawer` is still there and unchanged; it
 * belongs to the red side tab and the article sticky bar, which own their own
 * state through `useDrawer` — see the `Consultation` wrappers.
 *
 * The modal is rendered here, once, for the whole site: it is `fixed`, faded
 * out and `inert` while closed, so mounting it on every page costs nothing and
 * means a trigger does not have to care what else its page draws.
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

  /*
    **`#contact` opens the popup.** The panel carries `id="contact"`, and any
    anchor pointing at it — `<a href="#contact">`, or `/expertises#contact`
    from another page — opens the dialog instead of jumping to it. So wiring a
    new control needs no React at all and no import: give it that href, or
    `data-contact` if it is a button rather than a link.

    Delegated on the document so it covers markup that does not exist yet,
    including anchors inside server components and inside rich-text copy.
    Modified clicks are left alone, and without JavaScript the href is a
    harmless jump to a panel that is `inert` until it opens.
  */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const el = (event.target as Element | null)?.closest<HTMLElement>(
        'a[href$="#contact"], [data-contact]',
      );
      if (!el) return;

      event.preventDefault();
      trigger.current = el;
      setOpen(true);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    /*
      Restore focus here rather than in the dialog's own cleanup: a side tab is
      `inert` while it is open, and only this render has already cleared that
      by the time the effect runs.
    */
    if (wasOpen.current && !open) trigger.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <ConsultationContext.Provider value={{ open, onOpen }}>
      {children}
      <ContactModal open={open} onClose={onClose} />
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
