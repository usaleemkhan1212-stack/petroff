import { useTranslations } from "next-intl";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";

export function MidCTA() {
  const t = useTranslations("SocialPage.midCta");

  return (
    <section className="bg-encre">
      <Container className="py-9">
        {/*
          **Figma's own row overflows its band here**, unlike the three sibling
          MidCTAs: its 1039px line plus the 49 of gap and the 216 button need
          1304 inside a 1245 container, so the comp simply runs 59px past it.

          The copy flexes instead — `lg:flex-nowrap` keeps the button beside it
          and lets the line wrap in two, which costs 31px of band height and is
          the same call the FAQ's 1251-in-1245 squeeze makes. Without it the
          button drops below the copy and the section runs 55 over. Below lg it
          still wraps, which is correct at those widths.
        */}
        <div className="flex flex-wrap items-center justify-between gap-6 lg:flex-nowrap">
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
