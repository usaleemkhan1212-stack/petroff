"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { SECTION_TITLES, type SectionKey } from "@/lib/admin";

import { useAuth } from "./AuthProvider";
import { Sidebar } from "./Sidebar";
import { EnquiriesSection } from "./enquiries/EnquiriesSection";
import { Articles, Dashboard, Media, Pages, Redirects, Settings } from "./panels";

/**
 * Which section is showing — and it lives in the URL, not in state.
 *
 * `/admin?section=enquiries` is bookmarkable and survives a refresh, which
 * matters most for the enquiry inbox: its filters, sort, page and the open
 * enquiry all sit in the same query string, so a filtered view can be sent to
 * someone. Every section gets that for free by sharing the mechanism.
 *
 * Only the active panel is rendered; the prototype toggled `hidden` on seven
 * that were all in the document.
 */
const PANELS: Record<SectionKey, (go: (k: SectionKey) => void) => React.ReactNode> = {
  dashboard: (go) => <Dashboard go={go} />,
  enquiries: () => <EnquiriesSection />,
  pages: () => <Pages />,
  articles: () => <Articles />,
  media: () => <Media />,
  settings: () => <Settings />,
  redirects: () => <Redirects />,
};

function isSection(v: string | null): v is SectionKey {
  return v !== null && Object.prototype.hasOwnProperty.call(PANELS, v);
}

export function AdminShell() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();
  const initial = user?.name?.trim().charAt(0).toUpperCase() || "?";

  const raw = params.get("section");
  const section: SectionKey = isSection(raw) ? raw : "dashboard";

  /* Moving section drops the previous one's parameters — an enquiry filter has
     no meaning on the media library, and carrying it would put a stale
     `?status=new` in the URL of every screen. */
  const go = useCallback(
    (key: SectionKey) => router.push(`/admin?section=${key}`, { scroll: false }),
    [router],
  );

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar active={section} go={go} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-encre/8 flex shrink-0 items-center gap-4 border-b bg-white px-7 py-4">
          <h1 className="font-poppins text-encre flex-1 text-[19px] font-semibold tracking-[-0.3px]">
            {SECTION_TITLES[section]}
          </h1>
          {/*
            The signed-in account. `role` is shown rather than acted on: the
            API returns `admin` or `editor` and both see the whole panel today,
            so this keeps it visible and to hand for when gating lands.
          */}
          <div className="flex items-center gap-2.5">
            <span className="font-poppins flex size-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-gold),var(--color-encre))] text-[13px] font-semibold text-white">
              {initial}
            </span>
            <span className="leading-[1.2]">
              <b className="font-poppins text-encre block text-[13px] font-semibold">
                {user?.name ?? "—"}
              </b>
              <span className="text-encre/62 block text-[11.5px]">
                {user?.email ?? ""}
              </span>
            </span>
            {user ? (
              <span className="bg-gold/12 text-brique font-poppins rounded-[7px] px-2 py-1 text-[10.5px] font-semibold tracking-[0.4px] uppercase">
                {user.role}
              </span>
            ) : null}
          </div>
        </header>

        {/* The content column scrolls, not the page — the rail stays put. */}
        <main className="bg-lilas admin-content flex-1 overflow-y-auto px-7 py-6">
          <div className="mx-auto max-w-[1180px]">{PANELS[section](go)}</div>
        </main>
      </div>
    </div>
  );
}
