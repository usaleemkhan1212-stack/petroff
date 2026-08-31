import { useTranslations } from "next-intl";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";

export function MidCTA() {
  const t = useTranslations("ContentieuxPage.midCta");

  return (
    <section className="bg-encre">
      <Container className="py-9">
        {/* One line on desktop; the button drops below the copy once they no
            longer fit, where Figma simply lets the text run off. */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-h3 font-poppins text-white">
            {t.rich("text", {
              /*
                Inter Regular 20/1.55 in white 70% — `text-lead` exactly. This
                run used to be gold at 20/1.3, borrowing `text-h3`'s metrics;
                the frame moved it to the Contrats twin's line-height and
                changed the colour. `font-inter` is required: the token carries
                size, line-height and weight but never the family, and the
                paragraph around it is Poppins.
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
