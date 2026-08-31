"use client";

import { useConsultation } from "@/components/consultation/ConsultationProvider";
import { SideTab } from "@/components/consultation/SideTab";

/**
 * The red side tab, for the frames that draw one — the home page
 * (`13323:4812`), the e-commerce page (`13331:11356`), the Bibliotheque, the
 * Expertises hub, both domain pages, the service page and the personal page.
 *
 * The drawer it opens is mounted once by `ConsultationProvider` in the layout,
 * so this is now only the tab plus the shared state it reads.
 */
export function Consultation() {
  const { open, onOpen } = useConsultation();
  return <SideTab hidden={open} onOpen={onOpen} tone="red" />;
}
