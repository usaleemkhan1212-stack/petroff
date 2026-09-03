"use client";

import { useTranslations } from "next-intl";
import CookieBite from "@/assets/icons/cookie-bite.svg";
import { Button } from "@/components/ui/Button";
import { MaybeLink } from "@/components/ui/MaybeLink";

/** Figma pads both buttons 36/14, which none of `Button`'s sizes gives. */
const pill = "px-9 py-3.5 leading-[22px]";

const linkClass =
  "text-small-strong text-periwinkle hover:underline focus-visible:outline-gold rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * The cookie banner — Figma `13853:9064`, a 1245x237 card.
 *
 * **Figma draws no placement for it**: the two frames given as context are the
 * home page with nothing overlaid. At 1245 it is exactly the container width,
 * so it sits fixed at the foot of the viewport inside `Container`, with no
 * backdrop — a consent notice should not block the page it is asking about.
 *
 * Its card is the contact popup's shell again — white on an `encre/8` border,
 * the same **80 / 18 / 60 / 18** radii and `0px 14px 34px` shadow — with
 * Figma's asymmetric `pl-36 pr-24 py-36`.
 *
 * A labelled `<section>` rather than a dialog: it traps nothing and the reader
 * can go on using the page, so calling it a dialog would promise otherwise.
 */
export function CookieBanner({
  onCustomise,
  onAcceptAll,
  onRejectAll,
}: {
  onCustomise: (event: React.MouseEvent<HTMLElement>) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}) {
  const t = useTranslations("CookieConsent");

  return (
    <section
      aria-label={t("label")}
      /* Capped and scrollable as a safety net: at 320 the notice already takes
         586 of a 640 viewport, so a longer translation or a larger default
         font would otherwise push its buttons off screen. */
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-5 pb-5 sm:px-8 sm:pb-6 xl:px-15"
    >
      <div className="border-encre/8 pointer-events-auto mx-auto flex max-h-[calc(100dvh-2.5rem)] max-w-311.25 flex-col gap-6 overflow-y-auto rounded-tl-[48px] rounded-tr-[18px] rounded-br-[36px] rounded-bl-[18px] border bg-white p-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)] sm:rounded-tl-[80px] sm:rounded-br-[60px] lg:flex-row lg:items-center lg:gap-9 lg:py-9 lg:pr-6 lg:pl-9">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
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

          {/*
            Figma styles the second link in Outfit, a font this project does
            not have and which appears nowhere else — the same artefact the
            cookie policy's table header carries. Both links take the first
            one's own style, Inter SemiBold 16.
          */}
          <p className="text-small text-encre/62">
            {t.rich("body", {
              k: (chunks) => (
                <MaybeLink href="/cookies" className={linkClass}>
                  {chunks}
                </MaybeLink>
              ),
              c: (chunks) => (
                <MaybeLink href="/confidentialite" className={linkClass}>
                  {chunks}
                </MaybeLink>
              ),
            })}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 lg:shrink-0">
          {/* A text button, not a pill — Figma draws it as Inter SemiBold 18
              in encre beside the two pills. */}
          <button
            type="button"
            onClick={onCustomise}
            className="text-body-strong text-encre hover:text-brique focus-visible:outline-gold cursor-pointer rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {t("customise")}
          </button>
          <Button variant="outline" className={pill} onClick={onRejectAll}>
            {t("reject")}
          </Button>
          <Button className={pill} onClick={onAcceptAll}>
            {t("accept")}
          </Button>
        </div>
      </div>
    </section>
  );
}
