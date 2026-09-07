import { Container } from "@/components/ui/Container";

/**
 * Figma `14221:10738` — the sources band, white, its column pinned at
 * `top: 72` and `left: 360` over 1100.
 *
 * That 1100 is **left-aligned inside the 1200 band, not centred**: 1100 centred
 * in the 1245 container would start at 410 where the frame says 360. So the
 * band positions and the text measure are two separate things here, exactly as
 * the article's own Transparence records.
 *
 * Its overline is **gold**, where every other overline on this page is brique.
 */
export function LandingTransparence() {
  return (
    <section className="bg-white pt-18 pb-4">
      <Container>
        <div className="mx-auto max-w-300">
          <div className="flex max-w-275 flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-overline font-poppins text-gold uppercase">
                Sources & transparency
              </p>
              <h2 className="text-h2 font-poppins text-encre">
                Every rule on this page has a text behind it
              </h2>
              <p className="text-body text-encre/62">
                Légifrance (PISTE) · Judilibre · BODACC · INSEE Sirene · données
                INPI
              </p>
            </div>
            <p className="text-body text-encre">
              Code des procédures civiles d’exécution, Arts. L. 511-1 to L.
              533-1 and R. 511-1 to R. 533-6 · Code de procédure civile, Art.
              700 · Regulation (EU) 655/2014 (European Account Preservation
              Order)
            </p>
            <p className="text-small text-encre/62">
              General information on French law, current at the date of
              publication; not legal advice on your file. Timings are those
              observed in the firm’s practice and depend on the court, the
              bailiff and the bank.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
