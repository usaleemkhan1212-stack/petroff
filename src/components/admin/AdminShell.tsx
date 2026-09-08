"use client";

import { useState } from "react";

import { SECTION_TITLES, type SectionKey } from "@/lib/admin";

import { Icon } from "./icons";
import { Sidebar } from "./Sidebar";
import {
  Articles,
  Dashboard,
  Enquiries,
  Media,
  Pages,
  Redirects,
  Settings,
} from "./panels";

/**
 * The admin's one piece of state: which section is showing.
 *
 * The prototype toggled `hidden` on seven sections that were all in the
 * document; here only the active one is rendered, which is the same behaviour
 * without shipping six panels of markup the reader cannot see. This is the only
 * client component boundary — the panels below it are ordinary components.
 */
const PANELS: Record<
  SectionKey,
  (go: (k: SectionKey) => void) => React.ReactNode
> = {
  dashboard: (go) => <Dashboard go={go} />,
  enquiries: () => <Enquiries />,
  pages: () => <Pages />,
  articles: () => <Articles />,
  media: () => <Media />,
  settings: () => <Settings />,
  redirects: () => <Redirects />,
};

export function AdminShell() {
  const [section, setSection] = useState<SectionKey>("dashboard");

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar active={section} go={setSection} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-encre/8 flex shrink-0 items-center gap-4 border-b bg-white px-7 py-4">
          <h1 className="font-poppins text-encre flex-1 text-[19px] font-semibold tracking-[-0.3px]">
            {SECTION_TITLES[section]}
          </h1>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2.5 text-left"
          >
            <span className="font-poppins flex size-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-gold),var(--color-encre))] text-[13px] font-semibold text-white">
              A
            </span>
            <span className="leading-[1.2]">
              <b className="font-poppins text-encre block text-[13px] font-semibold">
                Admin
              </b>
              <span className="text-encre/62 block text-[11.5px]">
                contact@petroff.law
              </span>
            </span>
            <Icon name="chevDown" size={15} className="text-encre/42" />
          </button>
        </header>

        {/* The content column scrolls, not the page — the rail stays put. */}
        <main className="bg-lilas admin-content flex-1 overflow-y-auto px-7 py-6">
          <div className="mx-auto max-w-[1180px]">{PANELS[section](setSection)}</div>
        </main>
      </div>
    </div>
  );
}
