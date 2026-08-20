"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Order shown in the design: FR · EN · 中文 · ES. */
const DISPLAY_ORDER = ["fr", "en", "zh", "es"] as const;

const pill =
  "shrink-0 rounded-full px-3 py-1 text-small-strong whitespace-nowrap transition-colors";

/**
 * Locale pills. Only locales registered in `routing` are real links; the rest
 * render as disabled buttons in the same muted style the design gives them,
 * so the control matches the comp today and lights up as locales are added.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const active = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Nav");

  return (
    <div
      className={cn(
        "border-encre/10 flex shrink-0 items-center gap-1 rounded-full border bg-white p-1",
        className,
      )}
      role="group"
      aria-label={t("languageLabel")}
    >
      {DISPLAY_ORDER.map((locale) => {
        const label = localeLabels[locale];
        const isActive = locale === active;
        const available = routing.locales.includes(
          locale as (typeof routing.locales)[number],
        );

        if (isActive) {
          return (
            <span
              key={locale}
              aria-current="true"
              className={cn(pill, "bg-encre text-white")}
            >
              {label}
            </span>
          );
        }

        if (!available) {
          return (
            <button
              key={locale}
              type="button"
              disabled
              aria-disabled="true"
              className={cn(pill, "text-encre/62 cursor-not-allowed")}
            >
              {label}
            </button>
          );
        }

        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale as (typeof routing.locales)[number]}
            className={cn(pill, "text-encre/62 hover:text-encre")}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
