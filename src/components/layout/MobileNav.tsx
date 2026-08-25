"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MaybeLink } from "@/components/ui/MaybeLink";
import type { NavItem } from "@/lib/nav";

/** Hamburger toggle plus the panel it opens. Shown below lg only. */
export function MobileNav({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");
  /* No namespace: nav children carry full message paths. */
  const tRoot = useTranslations();

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="border-encre/10 text-encre flex size-9.5 items-center justify-center rounded-full border bg-white"
      >
        <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          /* Cap and scroll rather than run off the bottom of a short
             viewport as the domain list grows. */
          className="border-encre/8 bg-lilas absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto border-b"
        >
          <nav aria-label={t("mainLabel")} className="px-5 py-4 sm:px-8">
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.key}>
                  <MaybeLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-small text-encre hover:text-periwinkle block py-3"
                  >
                    {t(item.key)}
                  </MaybeLink>

                  {/* Domains sit indented under their parent rather than in a
                      second panel — one scroll, no nesting to get lost in. */}
                  {item.children?.length ? (
                    <ul className="border-encre/8 mb-2 flex flex-col border-l pl-4">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <MaybeLink
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="text-small text-encre hover:text-periwinkle block py-2"
                          >
                            {tRoot(child.labelKey)}
                          </MaybeLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <LanguageSwitcher />
              <Button>{t("appointment")}</Button>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
