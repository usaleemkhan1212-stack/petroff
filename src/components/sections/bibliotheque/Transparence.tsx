import { useTranslations } from "next-intl";
import { SignalLink } from "@/components/contact/SignalLink";
import { Container } from "@/components/ui/Container";

export function Transparence() {
  const t = useTranslations("Transparence");

  return (
    /* The page's only dark band, and the only one whose overline is gold for
       the usual reason — SectionHeading's onDark tone, not Resultats' one-off. */
    <section className="bg-encre">
      {/* 1200 centred inside the Container lands on 360, as in Resultats. */}
      {/* 40 above and below: Figma pins the column at top 4 inside a 36px
          vertical padding, which is 40 either way once the frame's own 340 is
          accounted for. It was 72/28 before the redesign. */}
      <Container className="py-10">
        <div className="mx-auto flex max-w-300 flex-col gap-7">
          {/*
            Written out rather than using SectionHeading, and capped at 784 —
            both since the redesign, which flattened this head to a uniform
            7px gap where it used to put 10 under the overline and 4 under the
            title. The two paragraphs below run the full 1100.
          */}
          <div className="flex max-w-196 flex-col gap-1.75">
            <p className="text-overline font-poppins text-gold uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-white">{t("title")}</h2>
            <p className="text-body text-white/70">{t("sources")}</p>
          </div>

          <p className="text-body max-w-275 text-white/70">{t("disclaimer")}</p>
          <p className="text-small text-rose max-w-275">
            {/* This frame draws the whole line rose, so the shared string's
                <link> chunk is rendered plainly here. */}
            {t.rich("translation", {
              /* The one dark Transparence on the site. It opens the same
                 dialog as the other four, but keeps this frame's rose:
                 periwinkle on encre is 2.2:1, and `13062:1083` draws the whole
                 closing line rose here rather than marking the chunk at all. */
              link: (chunks) => <SignalLink tone="inherit">{chunks}</SignalLink>,
            })}
          </p>
        </div>
      </Container>
    </section>
  );
}
