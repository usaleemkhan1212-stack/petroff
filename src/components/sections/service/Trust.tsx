import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

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
 *
 * **Justified rather than centred**, on the user's instruction: Figma centres
 * the row on a fixed 96px gap, which leaves 125 of slack either side of the
 * 1245 band. `justify-between` spreads the three claims to the container's own
 * edges instead. A deliberate departure from the comp. Below `lg` the row can
 * wrap, where `justify-between` would strand a lone item, so it stays centred
 * on a real gap until then.
 */
export function Trust() {
  const t = useTranslations("ServicePage.trust");

  return (
    <section className="bg-lilas-2 py-6 lg:py-9.25">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-between">
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
      </Container>
    </section>
  );
}
