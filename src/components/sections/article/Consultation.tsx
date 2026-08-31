"use client";

import { useConsultation } from "@/components/consultation/ConsultationProvider";
import { SideTab } from "@/components/consultation/SideTab";
import { StickyBar } from "@/components/sections/article/StickyBar";

/**
 * The article's two fixed consultation controls — the red side tab
 * (`13318:3413`) and the sticky contact bar (`13318:3406`).
 *
 * The drawer they open is mounted once by `ConsultationProvider` in the
 * layout, so every other contact button on the page reaches the same panel.
 */
export function Consultation() {
  const { open, onOpen } = useConsultation();

  return (
    <>
      <StickyBar onConsult={onOpen} />
      <SideTab hidden={open} onOpen={onOpen} tone="red" />
    </>
  );
}
