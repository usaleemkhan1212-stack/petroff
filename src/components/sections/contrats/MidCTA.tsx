import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function MidCTA() {
  const t = useTranslations("ContratsPage.midCta");

  return (
    <section className="bg-encre">
      <Container className="py-9">
        {/* One line on desktop; the button wraps under the copy once they no
            longer fit, where Figma just lets the line run off its band. */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-h3 font-poppins text-white">
            {t.rich("text", {
              /*
                text-lead is 20/1.55 with weight 400, exactly what Figma
                specifies for this gold run — unlike the Contentieux MidCTA,
                whose gold half is 20/1.3 and borrows text-h3's metrics.
                font-inter is required: the token carries size, line-height and
                weight but not family, so without it the span inherits the
                paragraph's Poppins and renders visibly wider.
              */
              hl: (chunks) => (
                <span className="text-lead font-inter text-gold">{chunks}</span>
              ),
            })}
          </p>

          {/* px-6 for Figma's 24px; Button's sm is 20 and md is 28. */}
          <Button variant="gold" size="sm" className="px-6">
            {t("cta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
