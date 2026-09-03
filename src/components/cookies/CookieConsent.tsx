"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { CookiePreferences } from "@/components/cookies/CookiePreferences";
import { readConsent, writeConsent } from "@/lib/consent";

/**
 * The cookie consent the whole site shares — Figma's banner (`13853:9064`)
 * and preferences panel (`13894:9223`), mounted once in the layout.
 *
 * The banner shows until a choice is stored, in the `petroff_consent` cookie
 * the cookie policy's own table names and gives six months. The panel opens
 * from the banner's "Personnaliser" **and** from the footer's « Gérer les
 * cookies » at any time afterwards, which is what that policy promises when it
 * says the link is "présent en bas de chaque page".
 *
 * **The footer trigger is delegated on `[data-cookie-preferences]`**, the same
 * shape `#contact` uses for the contact popup: the footer stays a server
 * component and a new control needs no import.
 *
 * **The analytics toggle starts OFF, where Figma draws it on.** A deliberate
 * departure: the cookie policy this banner links to states that "aucun cookie
 * non essentiel n'est déposé avant que vous n'ayez donné votre consentement",
 * and pre-ticking a non-essential category would contradict the page it points
 * at. Figma's on state is still what the toggle looks like once switched.
 */
export function CookieConsent() {
  /* `null` until the cookie has been read, so the server renders nothing and
     there is no hydration mismatch — and no flash for a returning reader. */
  const [decided, setDecided] = useState<boolean | null>(null);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const trigger = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored) setAnalytics(stored.analytics);
    setDecided(stored !== null);
  }, []);

  const decide = useCallback((next: boolean) => {
    writeConsent({ analytics: next });
    setAnalytics(next);
    setDecided(true);
    setPrefsOpen(false);
  }, []);

  const onAcceptAll = useCallback(() => decide(true), [decide]);
  const onRejectAll = useCallback(() => decide(false), [decide]);
  /* "Enregistrer mes choix" keeps whatever the toggle is showing. */
  const onSave = useCallback(() => decide(analytics), [decide, analytics]);

  const openPrefs = useCallback((event: React.MouseEvent<HTMLElement>) => {
    trigger.current = event.currentTarget;
    setPrefsOpen(true);
  }, []);

  const closePrefs = useCallback(() => setPrefsOpen(false), []);

  /* The footer's « Gérer les cookies », and anything else that opts in. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const el = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-cookie-preferences]",
      );
      if (!el) return;

      event.preventDefault();
      trigger.current = el;
      /* Reopening from the footer starts from what is stored, not from
         whatever the panel was left showing. */
      const stored = readConsent();
      setAnalytics(stored?.analytics ?? false);
      setPrefsOpen(true);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (wasOpen.current && !prefsOpen) trigger.current?.focus();
    wasOpen.current = prefsOpen;
  }, [prefsOpen]);

  return (
    <>
      {/* Hidden while the panel is open, so the two never stack. It comes back
          if the panel is dismissed without a choice. */}
      {decided === false && !prefsOpen ? (
        <CookieBanner
          onCustomise={openPrefs}
          onAcceptAll={onAcceptAll}
          onRejectAll={onRejectAll}
        />
      ) : null}

      <CookiePreferences
        open={prefsOpen}
        analytics={analytics}
        onAnalyticsChange={setAnalytics}
        onSave={onSave}
        onAcceptAll={onAcceptAll}
        onRejectAll={onRejectAll}
        onClose={closePrefs}
      />
    </>
  );
}
