import { useTranslations } from "next-intl";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";

export function MidCTA() {
  const t = useTranslations("MaPage.midCta");

  return (
    <section className="bg-encre">
      <Container className="py-9">
        {/* The standard 115 band - 36 around a 43px row. Below lg the
            button wraps under the copy. */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-h3 font-poppins text-white">
            {t.rich("text", {
              /*
                Inter Regular 20/1.55 in white 70% — `text-lead` exactly. This
                run was gold; the frame changed the colour, and the Contentieux
                twin made the same move, so both MidCTAs now read identically.
                `font-inter` is required: the token carries size, line-height
                and weight but not family, so without it the span inherits the
                paragraph's Poppins and renders visibly wider.
              */
              hl: (chunks) => (
                <span className="text-lead font-inter text-white/70">{chunks}</span>
              ),
            })}
          </p>

          {/* px-6 for Figma's 24px; Button's sm is 20 and md is 28. */}
          <ConsultButton variant="gold" size="sm" className="px-6">
            {t("cta")}
          </ConsultButton>
        </div>
      </Container>
    </section>
  );
}
