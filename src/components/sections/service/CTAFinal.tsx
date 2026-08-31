import { useTranslations } from "next-intl";
import GlobePaperPlane from "@/assets/icons/globe-paper-plane.svg";
import ParcelBox from "@/assets/icons/parcel-box.svg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";

/**
 * Figma `13445:17943` — the site's **eighth** closing panel, and a duplicate of
 * the e-commerce one: same lilas-2 panel, same parcel and globe at the same
 * coordinates, same copy. Both ornaments reuse — their exported paths differ
 * only in formatting and match the stored files to **0.002**.
 *
 * Only its title is this page's own; the overline, lead and phone line come
 * from the shared `ContactCta` block and the two labels from that block's
 * `ask` pair, exactly as the article's and the Bibliotheque hub's do. Same
 * anatomy as those two with the ornaments swapped — a parcel off the lower
 * left and a wireframe globe off the upper right.
 *
 * **It takes top padding as well as bottom**, unlike the home and article
 * panels: Figma puts its panel at y=96, because the Transparence band above
 * closes with only 52.
 */
export function CTAFinal() {
  const t = useTranslations("ServicePage.ctaFinal");
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
            <ParcelBox
              width={213}
              height={201}
              className="absolute top-[179px] left-[-68.5px]"
            />
            <GlobePaperPlane
              width={153}
              height={136}
              className="absolute top-[-51px] right-[-42.5px]"
            />
          </div>

          <div className="relative flex flex-col items-center gap-3 text-center">
            <p className="text-overline font-poppins text-brique uppercase">
              {shared("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            {/* Two lines, no gap between them — the 12px stack gap wraps the pair. */}
            <div className="text-body text-encre/62">
              <p>{shared("lead")}</p>
              <p>{shared("contact")}</p>
            </div>
            <span aria-hidden="true" className="h-3.5" />
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
              <ConsultButton
                size="lg"
                className="whitespace-normal sm:whitespace-nowrap"
              >
                {shared("ask.ctaPrimary")}
              </ConsultButton>
              <ConsultButton
                size="lg"
                variant="gold"
                className="whitespace-normal sm:whitespace-nowrap"
              >
                {shared("ask.ctaSecondary")}
              </ConsultButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
