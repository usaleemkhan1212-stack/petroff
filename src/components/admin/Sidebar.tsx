"use client";

import { useState } from "react";

import { NAV_GROUPS, PENDING, SECTION_TITLES, type SectionKey } from "@/lib/admin";
import { cn } from "@/lib/utils";

import { AdminLockup, Icon, type IconName } from "./icons";

/**
 * The admin's dark rail: lockup, grouped navigation, then the two footer links.
 *
 * The ground is flat `bg-encre` where the prototype ran a three-stop teal
 * gradient — the site never gradients a dark surface (the footer, Tools and
 * every encre panel are flat), so a gradient would read as foreign here.
 */
export function Sidebar({
  active,
  go,
}: {
  active: SectionKey;
  go: (key: SectionKey) => void;
}) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    pages: true,
  });

  return (
    <aside className="bg-encre flex h-dvh w-[266px] shrink-0 flex-col border-r border-white/5">
      <div className="flex flex-col items-start gap-2.5 border-b border-white/8 px-5 pt-5.5 pb-4.5">
        <AdminLockup />
        <span className="font-poppins text-[10.5px] font-semibold tracking-[0.6px] text-white/42">
          CONTENT MANAGER
        </span>
      </div>

      {/* The rail scrolls on its own; a slim thumb keeps it from reading as a
          rendering artefact against the dark ground. */}
      <nav className="admin-nav flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="font-poppins px-3 pb-2 text-[10.5px] font-semibold tracking-[0.6px] text-white/42 uppercase">
              {group.label}
            </div>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = active === item.key;
                const open = openGroups[item.key] ?? false;
                return (
                  <div key={item.key}>
                    <div
                      className={cn(
                        "flex items-center rounded-[10px]",
                        isActive &&
                          "bg-[linear-gradient(90deg,rgba(217,164,65,0.24),rgba(217,164,65,0.05))] shadow-[inset_2px_0_0_var(--color-gold)]",
                      )}
                    >
                      <button
                        type="button"
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => go(item.key)}
                        className={cn(
                          "flex flex-1 cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[13.5px] transition-colors",
                          isActive
                            ? "text-pale-gold font-semibold"
                            : "text-white/66 hover:text-white/92",
                        )}
                      >
                        <Icon name={item.icon as IconName} />
                        <span className="flex-1">
                          {SECTION_TITLES[item.key]}
                        </span>
                      </button>
                      {item.children ? (
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-label={`${SECTION_TITLES[item.key]} types`}
                          onClick={() =>
                            setOpenGroups((g) => ({
                              ...g,
                              [item.key]: !open,
                            }))
                          }
                          className="cursor-pointer px-3 py-2.5 text-white/50"
                        >
                          <Icon
                            name="chevDown"
                            size={14}
                            className={cn(
                              "transition-transform",
                              open && "rotate-180",
                            )}
                          />
                        </button>
                      ) : null}
                    </div>

                    {item.children && open ? (
                      <div className="mt-0.5 ml-6 flex flex-col gap-0.5 border-l border-white/10 pl-2">
                        {item.children.map((child) => (
                          <button
                            key={child}
                            type="button"
                            onClick={() => go(item.key)}
                            className="flex cursor-pointer items-center justify-between gap-2 rounded-[8px] px-3 py-2 text-left text-[13px] text-white/60 transition-colors hover:text-white/92"
                          >
                            <span>{child}</span>
                            <span className="text-white/30">{PENDING}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-0.5 border-t border-white/8 px-3 py-4">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13.5px] text-white/66 transition-colors hover:text-white/92"
        >
          <Icon name="globe" />
          <span>View live site</span>
        </a>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[13.5px] text-white/66 transition-colors hover:text-white/92"
        >
          <Icon name="logout" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
