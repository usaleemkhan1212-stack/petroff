import { useTranslations } from "next-intl";
import Courthouse from "@/assets/icons/courthouse.svg";
import GlobePaperPlane from "@/assets/icons/globe-paper-plane.svg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Figma `13701:24359` — the site's ninth closing panel: lilas-2 at a 28px
 * corner on `px-48 py-64`, centred on a 12px stack gap with the usual 14px
 * spacer before the CTA row.
 *
 * **Only its overline is shared.** Its title, lead and first button are this
 * page's own, and its second button is not a CTA at all — Figma sets it to the
 * phone number, in gold. That makes it the site's second `tel:` link after the
 * personal hero's pill, so it wears the same pill through `buttonClasses`
 * rather than `Button`, which is always a real button element.
 *
 * Its two ornaments both reuse:
 *
 * - `courthouse.svg` at **170x123.25**, a fifth box for that glyph and its
 *   pale-periwinkle original rather than the `-pale-blue` fork — confirmed
 *   from the export's own fills. The stretch is a non-uniform (0.68, 0.6662)
 *   and exact, since the glyph carries no strokes. Note a naive alternating
 *   number compare calls this a mismatch at 3.16: it has to be axis-aware,
 *   because H, V and A commands break the x/y alternation.
 * - `globe-paper-plane.svg` at its exact native 153x136, stroke 5 in both.
 */
export function CTAFinal() {
  const t = useTranslations("CabinetPage.ctaFinal");
  const shared = useTranslations("ContactCta");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="rounded-panel bg-lilas-2 relative overflow-hidden px-6 py-12 sm:px-12 lg:py-16">
          {/*
            Sanctioned ornament exception: literal Figma coordinates. Both
            bleed past the panel so its rounded edge clips them. The globe is
            pinned to the right edge rather than to `left: 1134.5px`, so it
            holds its inset as the panel narrows. Hidden below lg, where they
            would sit under the copy.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            <Courthouse
              width={170}
              height={123.25}
              className="absolute top-[235px] left-[-53.5px] max-w-none"
            />
            <GlobePaperPlane
              width={153}
              height={136}
              className="absolute top-[-51px] right-[-42.5px] max-w-none"
            />
          </div>

          <div className="relative flex flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins text-brique uppercase">
              {shared("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62 max-w-195.5">{t("lead")}</p>
            <span aria-hidden="true" className="h-3.5" />
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
              <ConsultButton
                size="lg"
                className="whitespace-normal sm:whitespace-nowrap"
              >
                {t("ctaPrimary")}
              </ConsultButton>
              {/*
                Figma's second button is the number itself, so it dials rather
                than opening the consultation panel. Its href is a separate
                string: stripping the punctuation out of the displayed number
                keeps the trunk 0 and gives an undialable +330178904646.
              */}
              <a
                href={shared("phoneHref")}
                className={buttonClasses({
                  variant: "gold",
                  size: "lg",
                  className: "whitespace-normal sm:whitespace-nowrap",
                })}
              >
                {shared("phone")}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
