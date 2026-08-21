import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/**
 * The article's sources-and-transparency band.
 *
 * Same five strings as the Bibliotheque hub's block — they live in the shared
 * top-level `Transparence` namespace — but **not the same component**: this
 * frame spaces its head 8/8 where the hub's uses 10/4, caps that head at 784,
 * sets the disclaimer at full white rather than 70%, and makes only the
 * closing sentence rose. Both were checked against their own frames.
 */
export function Transparence() {
  const t = useTranslations("Transparence");

  return (
    <section className="bg-encre">
      {/* 1200 centred inside the Container lands on 360, which is where this
          frame starts its 1100 column — so the band positions and the text
          measure separately. */}
      {/* 52px below the last line, where the hub's frame leaves 28 — both
          are simply what each frame's height leaves over. */}
      <Container className="pt-18 pb-13">
        <div className="mx-auto flex max-w-300 flex-col gap-5">
          <div className="flex max-w-196 flex-col gap-2">
            <p className="text-overline font-poppins text-gold">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-white">{t("title")}</h2>
            <p className="text-body text-white/70">{t("sources")}</p>
          </div>

          <p className="text-body max-w-275 text-white">{t("disclaimer")}</p>

          <p className="text-small max-w-275 text-white/70">
            {t.rich("translation", {
              link: (chunks) => (
                <span className="text-small-strong text-rose">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </Container>
    </section>
  );
}
