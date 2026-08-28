import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";

/**
 * The six practice areas, in Figma's order, pointing at the domain pages they
 * name — two of which exist today, so those two are real links and the rest
 * render as spans.
 */
const domains = [
  { key: "societes", href: "/expertises/droit-des-societes" },
  { key: "fusions", href: "/expertises/fusions-acquisitions" },
  { key: "contrats", href: "/expertises/contrats-commerciaux" },
  { key: "propriete", href: "/expertises/propriete-intellectuelle" },
  { key: "immobilier", href: "/expertises/immobilier-entreprise" },
  { key: "contentieux", href: "/expertises/contentieux-arbitrage" },
] as const;

/**
 * Figma `13495:29858` — "L'affaire d'abord, la procédure ensuite".
 *
 * A 679 copy column beside a 470 list of practice areas. **The row takes no
 * gap**: 679 + 470 is 1149 inside the 1245 container, which `justify-between`
 * spaces by exactly 96.
 *
 * Its rows carry **no gap** — each closes on its own `encre/10` rule — and the
 * band is `pt-64 pb-96`, not a symmetric 96.
 *
 * **Figma draws the first row entirely in brique** — tick, label and arrow —
 * where the other five are a result-green tick, an encre label and an
 * encre/62 arrow. Read as the hover state rather than a permanent highlight:
 * nothing on a profile page makes "Droit des sociétés" current, and this is
 * the sixth time the comp has shown one row of a list in its hover state.
 * Applied to all six on `hover`/`focus-visible` instead.
 */
export function EnBref() {
  const t = useTranslations("PersonalPage.enBref");

  return (
    <section className="bg-white">
      <Container className="pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          <div className="flex min-w-0 flex-col gap-6 lg:w-169.75">
            <div className="flex flex-col gap-4">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
            </div>
            <div className="text-body text-encre/62 flex flex-col gap-4">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4 lg:w-117.5">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("listTitle")}
            </p>
            <ul className="flex flex-col">
              {domains.map(({ key, href }) => (
                <li key={key}>
                  <MaybeLink
                    href={href}
                    className="border-encre/10 group flex w-full items-center justify-between gap-5 border-b py-3"
                  >
                    <span className="flex min-w-0 items-center gap-5">
                      {/* Result-green at rest, brique on hover — the Inter
                          subset carries no U+2713, so it falls back to a
                          system font like every other ✓ on the site. */}
                      <span
                        aria-hidden="true"
                        className="text-lead font-inter text-result-green group-hover:text-brique shrink-0 transition-colors"
                      >
                        ✓
                      </span>
                      <span className="text-h4 font-poppins text-encre group-hover:text-brique min-w-0 transition-colors">
                        {t(`items.${key}`)}
                      </span>
                    </span>
                    {/* Figma draws an SF Symbols `arrow.right` placeholder. */}
                    <span
                      aria-hidden="true"
                      className="text-small text-encre/62 group-hover:text-brique shrink-0 transition-colors"
                    >
                      &rarr;
                    </span>
                  </MaybeLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
