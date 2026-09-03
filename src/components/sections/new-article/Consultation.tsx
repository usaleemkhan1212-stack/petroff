"use client";

import { ConsultationDrawer } from "@/components/consultation/ConsultationDrawer";
import { SideTab } from "@/components/consultation/SideTab";
import { useDrawer } from "@/components/consultation/useDrawer";
import { StickyBar } from "@/components/sections/new-article/StickyBar";

/**
 * The article's two fixed consultation controls — the red side tab
 * (`13318:3413`) and the sticky contact bar (`13318:3406`) — with the sliding
 * drawer they open.
 *
 * **Both keep the drawer**, which is the panel they were built alongside: the
 * tab hugs the edge it slides from, and the bar's "Consulter un avocat" has
 * been its second control since the ✕ stopped collapsing the bar into the tab.
 * Every other contact button on the page opens the centred `ContactModal`
 * instead, through `ConsultationProvider`.
 */
export function Consultation() {
  const { open, onOpen, onClose } = useDrawer();

  return (
    <>
      <StickyBar onConsult={onOpen} />
      <SideTab hidden={open} onOpen={onOpen} tone="red" />
      <ConsultationDrawer open={open} onClose={onClose} />
    </>
  );
}
