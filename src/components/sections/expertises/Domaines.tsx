import { useTranslations } from "next-intl";
import { ConsultTrigger } from "@/components/consultation/ConsultButton";
import PlusCircle from "@/assets/icons/plus-circle.svg";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { domaines } from "@/lib/domaines";
import { cn } from "@/lib/utils";

/*
  Four tints since the redesign, against the two this grid used to alternate.
  The pink is Figma's `#EFCFD9` at 40%: composited over white that lands
  within 3/255 of `--color-pink-soft` at the same alpha, so that token is
  reused rather than a fourth near-identical pink added. Note the home page's
  Expertises grid names its pink `--color-pink` (#FAC5EF) — Figma gives both
  the same library name, so compare the hex, never the name.
*/
const tones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
  mint: "bg-pale-mint",
  pink: "bg-pink-soft/40",
} as const;

/** Shared by the domain tags. */
const tag =
  "text-small-strong text-encre/62 border-encre/8 bg-lilas rounded-full border px-3 py-1";

export function Domaines() {
  const t = useTranslations("ExpertisesPage.domaines");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            lead={t("lead")}
            className="gap-3"
            leadClassName="max-w-170"
          />

          {/* Eleven domains plus the transverse card; 3 -> 2 -> 1. */}
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {domaines.map(({ key, Icon, tone, href }) => (
              <li key={key} className="flex">
                {/* Figma spaces every child of the card by a flat 16 since the
                    redesign, where it used to mix an 8px gap with 12/14px
                    spacer frames. */}
                <Card className="flex flex-1 flex-col gap-4 px-6 py-7">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "rounded-tile flex size-13 shrink-0 items-center justify-center",
                      tones[tone],
                    )}
                  >
                    <Icon className="text-encre" />
                  </span>

                  <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                  <p className="text-body text-encre/62">
                    {t(`items.${key}.description`)}
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {(t.raw(`items.${key}.tags`) as string[]).map((label) => (
                      <li key={label} className={tag}>
                        {label}
                      </li>
                    ))}
                  </ul>

                  {/* New in the redesign: a ruled footer carrying a pale-blue
                      pill beside the brique text link the card used to close
                      on by itself. Both point at the same domain page. */}
                  <div className="mt-auto flex flex-col gap-4">
                    <span aria-hidden="true" className="bg-encre/10 h-px w-full" />
                    <div className="flex flex-wrap items-center gap-4">
                      <MaybeLink
                        href={href}
                        className="text-button font-poppins bg-pale-blue text-encre hover:bg-pale-periwinkle rounded-full px-5 py-4 transition-colors"
                      >
                        {t("ctaLawyers")}
                      </MaybeLink>
                      <MaybeLink
                        href={href}
                        className="text-button font-poppins text-brique hover:text-encre inline-flex items-center gap-2 transition-colors"
                      >
                        {t("cta")}
                        <span aria-hidden="true">&rarr;</span>
                      </MaybeLink>
                    </div>
                  </div>
                </Card>
              </li>
            ))}

            {/* The transverse card closing the grid. **Light since the
                redesign** — lilas-2 on a pale-blue tile with encre copy, where
                it used to be an inverse encre card with white copy and a gold
                text link. Its CTA is a solid gold button now. */}
            <li className="flex">
              <Card className="bg-lilas-2 flex flex-1 flex-col gap-2 border-transparent px-6 py-7">
                <span
                  aria-hidden="true"
                  className="rounded-tile bg-pale-blue flex size-13 shrink-0 items-center justify-center"
                >
                  <PlusCircle className="text-encre" />
                </span>
                <span aria-hidden="true" className="h-3" />

                <h3 className="text-h3 text-encre">{t("transverse.title")}</h3>
                <p className="text-body text-encre/62">{t("transverse.description")}</p>
                <span aria-hidden="true" className="h-3.5" />

                <ConsultTrigger className="text-button font-poppins bg-gold hover:bg-brique self-start rounded-full px-7 py-4 text-white transition-colors">
                  {t("transverse.cta")}
                </ConsultTrigger>
              </Card>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
