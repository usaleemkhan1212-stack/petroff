import { defineRouting } from "next-intl/routing";

/**
 * Locale configuration — the single place that decides which languages exist.
 *
 * French is the source locale: content is authored in French and translated
 * outward. `localePrefix: "as-needed"` keeps French at the root (/expertises)
 * and gives every added locale a prefix (/en/expertises). That means the
 * French URLs never change when a language is added, so nothing already
 * indexed or linked breaks.
 *
 * To add a locale: add its code below, create messages/<code>.json, and add
 * the matching entry to `localeLabels`. Nothing else needs to change.
 * Planned, per the design: "en", "zh", "es".
 */
export const routing = defineRouting({
  locales: ["fr"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** How each locale is labelled in the language switcher. */
export const localeLabels: Record<string, string> = {
  fr: "FR",
  en: "EN",
  zh: "中文",
  es: "ES",
};

/** `lang` and `hreflang` attribute values. */
export const localeHtmlLang: Record<string, string> = {
  fr: "fr-FR",
  en: "en",
  zh: "zh-Hans",
  es: "es",
};
