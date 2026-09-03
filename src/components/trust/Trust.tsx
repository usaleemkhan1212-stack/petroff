import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/** The three claims, in Figma's order. */
const items = ["reponse", "confidentiel", "devis"] as const;

/**
 * Figma `13445:26850` on the service page and `13689:21444` on Le Cabinet — a
 * 100px lilas-2 band under the hero. The two frames are identical and their
 * three claims are character-identical, so this is one component reading a
 * shared top-level `Trust` namespace.
 *
 * Its own frame declares `py-24`, but that is a minimum: the frame is a fixed
 * 100 and Figma centres the 26px items in it, so the real padding is **37**.
 * Reading the declared value alone makes the band 74.
 *
 * Unlike the e-commerce trust strip this row fits — its three items span 995
 * inside the 1245 container — so it needs no full-bleed escape, only the band
 * itself painting the full width.
 *
 * **Justified rather than centred.** The service frame centres the row on a
 * fixed 96px gap, leaving 125 of slack either side of the 1245 band, and it was
 * changed to `justify-between` on the user's instruction — which the Cabinet
 * frame then turned out to specify outright, so the departure is now the comp.
 * Below `lg` the row can wrap, where `justify-between` would strand a lone
 * item, so it stays centred on a real gap until then.
 */
export function Trust() {
  const t = useTranslations("Trust");

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
