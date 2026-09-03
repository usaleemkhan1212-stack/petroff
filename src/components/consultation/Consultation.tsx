"use client";

import { ConsultationDrawer } from "@/components/consultation/ConsultationDrawer";
import { SideTab } from "@/components/consultation/SideTab";
import { useDrawer } from "@/components/consultation/useDrawer";

/**
 * The red side tab and the drawer it opens, for the frames that draw one — the
 * home page (`13323:4812`), the e-commerce page (`13331:11356`), the
 * Bibliotheque, the Expertises hub, the domain pages, the service page and the
 * personal page.
 *
 * **The tab keeps the sliding drawer.** It is that panel's own affordance —
 * both hug the same edge — so it owns its state here. The centred
 * `ContactModal` that `ConsultationProvider` mounts is what every *other*
 * contact button on the site opens.
 */
export function Consultation() {
  const { open, onOpen, onClose } = useDrawer();

  return (
    <>
      <SideTab hidden={open} onOpen={onOpen} tone="red" />
      <ConsultationDrawer open={open} onClose={onClose} />
    </>
  );
}
