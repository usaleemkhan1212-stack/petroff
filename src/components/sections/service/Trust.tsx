import { useTranslations } from "next-intl";

/** The three claims, in Figma's order. */
const items = ["reponse", "confidentiel", "devis"] as const;

/**
 * Figma `13445:26850` — a 100px lilas-2 band under the hero.
 *
 * Its own frame declares `py-24`, but that is a minimum: the frame is a fixed
 * 100 and Figma centres the 26px items in it, so the real padding is **37**.
 * Reading the declared value alone makes the band 74.
 *
 * Unlike the e-commerce trust strip this row fits — its three items span 995
 * inside the 1245 container — so it needs no full-bleed escape, only the band
 * itself painting the full width.
 */
export function Trust() {
  const t = useTranslations("ServicePage.trust");

  return (
    <section className="bg-lilas-2 px-5 py-6 sm:px-8 lg:py-9.25">
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-24">
        {items.map((key) => (
          <li key={key} className="flex items-center gap-2">
            {/* Figma exports this as a 10px SVG circle; a span is not worth a
                file, the same call the e-commerce trust dot makes. */}
            <span
              aria-hidden="true"
              className="bg-gold size-2.5 shrink-0 rounded-full"
            />
            <p className="text-h3 font-poppins text-encre">{t(key)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
