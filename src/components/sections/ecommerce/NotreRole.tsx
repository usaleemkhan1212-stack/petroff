import { Bullet } from "@/components/ui/Bullet";
import Image from "next/image";
import { useTranslations } from "next-intl";
import rolePhoto from "@/assets/images/card-payment-laptop.jpg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

/** The six things the firm does, and the three cards under them. */
const checks = ["c1", "c2", "c3", "c4", "c5", "c6"] as const;
const cards = ["conseil", "actes", "defense"] as const;

/**
 * Figma's `13331:11795`: what the firm actually does, as a checked list beside
 * a 470x548 photograph, over a three-card row.
 *
 * Its head is written out rather than reaching for `SectionHeading`: Figma
 * puts a flat 12px under both the overline and the title where that component
 * uses one gap, and its lead runs the column's full width.
 *
 * **Figma clips its own head.** The title's frame is 820 wide and the lead's
 * 720, inside a 679 column marked `overflow-clip`, so the comp cuts both off
 * mid-word. They wrap here instead — the same call the Expertises stage and
 * both domain heroes make — which is where this section's extra height
 * against the frame comes from.
 */
export function NotreRole() {
  const t = useTranslations("EcommercePage.role");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-12">
          {/* 679 + 96 + 470 is the container's whole 1245, so the row only
              holds together at `xl`. */}
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-24">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-9">
              <div className="flex flex-col gap-3">
                {/* Figma stores this string mixed case and uppercases it in
                    the style, unlike every other overline in the file. */}
                <p className="text-overline font-poppins text-brique uppercase">
                  {t("overline")}
                </p>
                <h2 className="text-h2 text-encre">{t("title")}</h2>
                <p className="text-body text-encre/62">{t("lead")}</p>
              </div>

              {/* Figma's 12px gap is kept at `lg`; below it each item runs
                  to five lines and 12px stops reading as separation. */}
              <ul className="flex flex-col gap-5 lg:gap-3">
                {checks.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    {/* Figma exports this as a 12px SVG circle, which is not
                        worth a file — the same call the hero's trust dot makes. */}
                    <Bullet />
                    {/* Two runs, not one: Figma sets the lead-in
                        **Inter SemiBold 18/1.5 in full encre** — `text-body-strong`
                        — against an 18/1.4 encre/62 remainder. The colour has
                        to be re-declared on the run, or it silently inherits
                        the paragraph's 62% and the emphasis disappears. */}
                    <p className="text-body text-encre/62">
                      {t.rich(`checks.${key}`, {
                        b: (chunks) => (
                          <span className="text-body-strong text-encre">{chunks}</span>
                        ),
                      })}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Inert, like every CTA on the site until its route exists. */}
              <ConsultButton variant="gold" size="lg">
                {t("cta")}
              </ConsultButton>
            </div>

            {/* The hero photo's exact box and radii, at 470x548. */}
            <div className="relative aspect-[470/548] w-full max-w-117.5 shrink-0 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
              <Image
                src={rolePhoto}
                alt={t("imageAlt")}
                fill
                sizes="(min-width: 1280px) 470px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {cards.map((key) => (
              <li key={key} className="flex">
                <Card className="flex min-w-0 flex-1 flex-col gap-3 p-7">
                  <h3 className="text-h3 text-encre">{t(`cards.${key}.title`)}</h3>
                  <p className="text-body text-encre/62">{t(`cards.${key}.body`)}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
