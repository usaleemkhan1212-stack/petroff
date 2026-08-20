import type messages from "../messages/fr.json";
import type { routing } from "@/i18n/routing";

/**
 * Makes next-intl typed against the French catalogue: an unknown key like
 * t("Nav.contactt") becomes a compile error instead of a runtime blank.
 * French is the source locale, so fr.json defines the shape every other
 * catalogue must match.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
