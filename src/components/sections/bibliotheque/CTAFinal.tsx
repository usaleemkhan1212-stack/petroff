import { useTranslations } from "next-intl";
import MagnifierCheck from "@/assets/icons/magnifier-check.svg";
import PenNib from "@/assets/icons/pen-nib.svg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";

export function CTAFinal() {
  const t = useTranslations("BibliothequePage.ctaFinal");
  /*
    Only the title is this page's own. The overline, lead and phone line are
    the shared block the other CTAFinals read, and the two button labels are
    that block's `ask` pair, which the article's panel reads too.
  */
  const shared = useTranslations("ContactCta");

  return (
    <section className="bg-lilas">
      <Container className="py-24">
        <div className="rounded-panel bg-lilas-2 relative overflow-hidden px-12 py-16">
          {/*
            Sanctioned ornament exception: literal Figma coordinates, both
            shapes bleeding past the panel so the rounded edge clips them —
            the nib off the left and bottom, the magnifier off the right. Its
            handle is entirely outside the panel, which is why the comp shows
            only a ring. Pinned to the right edge rather than to
            `left: 1169.5px` so it holds its inset as the panel narrows.
            Hidden below lg, where they would sit under the copy.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            <PenNib
              width={110}
              height={160}
              className="absolute top-[231px] left-[-20.5px]"
            />
            <MagnifierCheck
              width={140}
              height={140}
              className="absolute top-0 right-[-64.5px]"
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
            <div className="flex flex-wrap justify-center gap-4">
              <ConsultButton size="lg">{shared("ask.ctaPrimary")}</ConsultButton>
              <ConsultButton size="lg" variant="gold">
                {shared("ask.ctaSecondary")}
              </ConsultButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
