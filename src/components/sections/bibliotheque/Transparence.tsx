import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

export function Transparence() {
  const t = useTranslations("Transparence");

  return (
    /* The page's only dark band, and the only one whose overline is gold for
       the usual reason — SectionHeading's onDark tone, not Resultats' one-off. */
    <section className="bg-encre">
      {/* 1200 centred inside the Container lands on 360, as in Resultats. */}
      <Container className="pt-18 pb-7">
        <div className="mx-auto max-w-300">
          {/*
            Written out rather than using SectionHeading: 10px under the
            overline and 4px under the title, where SectionHeading uses one
            gap for both.
          */}
          <p className="text-overline font-poppins uppercase text-gold">{t("overline")}</p>
          <h2 className="text-h2 mt-2.5 text-white">{t("title")}</h2>
          <p className="text-body mt-1 text-white/70">{t("sources")}</p>

          <p className="text-body mt-4.75 max-w-275 text-white/70">
            {t("disclaimer")}
          </p>
          <p className="text-small text-rose mt-4.5 max-w-275">
            {/* This frame draws the whole line rose, so the shared string's
                <link> chunk is rendered plainly here. */}
            {t.rich("translation", { link: (chunks) => chunks })}
          </p>
        </div>
      </Container>
    </section>
  );
}
