"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import CookieBite from "@/assets/icons/cookie-bite.svg";
import { useDialogBehaviour } from "@/components/consultation/useDialogBehaviour";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Figma pads both buttons 36/14, which none of `Button`'s sizes gives. */
const pill = "px-9 py-3.5 leading-[22px]";

/**
 * The toggle — Figma's `14000:222`, a 59x36 track with a 27x28 knob inset 4px
 * top and bottom, drawn **mint** in its on state with the knob at left 29.
 *
 * A real `role="switch"`, so it announces its state and works from the
 * keyboard. Figma draws no off state; the track takes `encre/20` there, which
 * is the neutral this build uses for a resting control everywhere else.
 */
function Toggle({
  on,
  onChange,
  label,
  ref,
}: {
  on: boolean;
  onChange: (next: boolean) => void;
  label: string;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        "focus-visible:outline-gold relative h-9 w-[59px] shrink-0 cursor-pointer rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
        on ? "bg-mint" : "bg-encre/20",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1 h-7 w-[27px] rounded-full bg-white shadow-[0px_3px_8px_0px_rgba(0,0,0,0.15),0px_3px_1px_0px_rgba(0,0,0,0.06)] transition-[left] motion-reduce:transition-none",
          on ? "left-[29px]" : "left-1",
        )}
      />
    </button>
  );
}

/**
 * The cookie preferences panel — Figma `13894:9223`, a 600x561 card.
 *
 * Opened two ways: from the banner's "Personnaliser", and from the footer's
 * « Gérer les cookies » at any time afterwards — which is what the cookie
 * policy promises when it says the link is "présent en bas de chaque page".
 *
 * Its card is the contact popup's shell again: white on an `encre/8` border,
 * the same **80 / 18 / 60 / 18** radii and the same `0px 14px 34px` shadow.
 * Figma gives no backdrop or placement, so it is centred over one, like the
 * contact popup.
 */
export function CookiePreferences({
  open,
  analytics,
  onAnalyticsChange,
  onSave,
  onAcceptAll,
  onRejectAll,
  onClose,
}: {
  open: boolean;
  analytics: boolean;
  onAnalyticsChange: (next: boolean) => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onClose: () => void;
}) {
  const t = useTranslations("CookieConsent.prefs");
  /* "Tout refuser" and "Tout accepter" are the banner's strings — the panel
     repeats them rather than owning a second copy. */
  const shared = useTranslations("CookieConsent");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLButtonElement>(null);

  useDialogBehaviour({ open, onClose, panelRef, firstFieldRef });

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`bg-encre/30 fixed inset-0 z-60 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div className="pointer-events-none fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("label")}
          aria-hidden={!open}
          inert={!open}
          className={`border-encre/8 pointer-events-auto relative max-h-full w-full max-w-150 overflow-y-auto rounded-tl-[48px] rounded-tr-[18px] rounded-br-[36px] rounded-bl-[18px] border bg-white px-5 pt-5 pb-4 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)] transition-[opacity,scale] duration-300 motion-reduce:transition-none sm:rounded-tl-[80px] sm:rounded-br-[60px] sm:px-9 sm:pt-9 sm:pb-7 ${
            open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-5">
                <CookieBite
                  aria-hidden="true"
                  width={51.076}
                  height={50}
                  className="shrink-0"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-overline font-poppins text-brique uppercase">
                    {t("overline")}
                  </p>
                  <p className="text-h3 font-poppins text-encre">{t("title")}</p>
                </div>
              </div>

              <p className="text-small text-encre/62">{t("lead")}</p>

              {/* Figma's two `vrow`s: a rule above each, 12 of padding, and a
                  36px gap to the control on the right. */}
              <div className="border-encre/10 flex flex-col gap-9 border-t py-3 sm:flex-row sm:items-start">
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                  <p className="text-small-strong text-encre">
                    {t("rows.necessary.label")}
                  </p>
                  <p className="text-small text-encre/62">
                    {t("rows.necessary.description")}
                  </p>
                </div>
                <p className="text-small text-result-green shrink-0">{t("always")}</p>
              </div>

              <div className="border-encre/10 flex flex-col gap-9 border-t py-3 sm:flex-row sm:items-start">
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                  <p className="text-small-strong text-encre">
                    {t("rows.analytics.label")}
                  </p>
                  <p className="text-small text-encre/62">
                    {t("rows.analytics.description")}
                  </p>
                </div>
                <Toggle
                  ref={firstFieldRef}
                  on={analytics}
                  onChange={onAnalyticsChange}
                  label={t("rows.analytics.label")}
                />
              </div>
            </div>

            {/* One wrapping row on a 16px gap, right-aligned — which is what
                puts "Tout accepter" on its own second line at 528, exactly as
                the comp draws it. */}
            <div className="flex flex-wrap justify-end gap-4">
              <Button variant="outline" className={pill} onClick={onRejectAll}>
                {shared("reject")}
              </Button>
              <Button variant="outline" className={pill} onClick={onSave}>
                {t("save")}
              </Button>
              <Button className={pill} onClick={onAcceptAll}>
                {shared("accept")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
