import { useTranslations } from "next-intl";
import { Bullet } from "@/components/ui/Bullet";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";

/** The five situations that bring a client in, in Figma's order. */
const triggers = ["lancement", "dgccrf", "marketplace", "retours", "cgv"] as const;

/**
 * Figma's `13331:11924`: five triggers beside the "Parlons-en" card.
 *
 * Its two columns are 598.5 each with a 48px gutter — the container's whole
 * 1245 — and both hold only text, so they split at `lg` rather than waiting
 * for `xl` as the photo rows do.
 *
 * **The card was briefly unreadable in Figma and the designer has fixed it.**
 * It shipped filled Lilas 2 with the site's onDark tone set on top — gold
 * overline, white title, white/70 lead and footnote — so the copy was
 * invisible, and it was built that way verbatim. The updated node keeps the
 * pale ground and darkens the copy: **encre title, encre/62 lead and
 * footnote**, and a **gold** button where it had been red. The trigger bullets
 * went periwinkle to gold in the same pass, and are now the site's shared
 * 9x20 puce rather than a 14px circle of their own.
 */
export function QuandConsulter() {
  const t = useTranslations("EcommercePage.quand");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        {/*
          A grid, not a flex row. Two `flex-1` siblings do NOT come out
          equal when one of them is padded: `flex-basis: 0` cannot resolve
          below the padding sum, so the card claimed its 72px of padding
          *on top of* its half and the triggers column lost the same 72.
          Equal grid tracks give both Figma's 598.5.
        */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="flex min-w-0 flex-col gap-9">
            <div className="flex flex-col gap-4">
              {/* Uppercased in the style here, as on the Notre rôle overline. */}
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
              {/* Figma's frame is 760 inside a 598.5 column, so the comp clips
                  this line; it wraps here. */}
              <p className="text-body text-encre/62">{t("lead")}</p>
            </div>

            <ul className="flex flex-col gap-6">
              {triggers.map((key) => (
                <li key={key} className="flex items-start gap-4">
                  {/* The site's shared 9x20 gold puce (`13680:21226`), which
                      this frame now uses too — it was a 14px circle. Its own
                      20px box lands the dot on the title's first line, so the
                      row needs no margin of its own. */}
                  <Bullet />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                    <p className="text-body text-encre/62">{t(`items.${key}.body`)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/*
            Figma names this frame `sticky`, and it is 399 tall against the
            column's 752 — so it pins at 24px and rides the triggers past.
            `self-start` is what makes that work, as on the Principe card.
          */}
          <div className="bg-lilas-2 rounded-card flex min-w-0 flex-col items-start gap-6 p-6 sm:p-9 lg:sticky lg:top-6 lg:self-start">
            <div className="flex flex-col gap-4">
              <p className="text-overline font-poppins text-gold uppercase">
                {t("card.overline")}
              </p>
              <h3 className="text-price text-encre">{t("card.title")}</h3>
            </div>

            <p className="text-body text-encre/62">{t("card.lead")}</p>

            {/* Inert, like every CTA on the site until its route exists. */}
            <ConsultButton variant="gold" size="lg">
              {t("card.cta")}
            </ConsultButton>

            <p className="text-small text-encre/62">{t("card.footnote")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
