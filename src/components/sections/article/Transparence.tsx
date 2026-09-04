import { useTranslations } from "next-intl";
import { SignalLink } from "@/components/contact/SignalLink";
import { Container } from "@/components/ui/Container";

/**
 * The article's sources-and-transparency band.
 *
 * Same five strings as the Bibliotheque hub's block — they live in the shared
 * top-level `Transparence` namespace — but **not the same component**: this
 * frame spaces its head 8/8 where the hub's uses 10/4, caps that head at 784,
 * and makes only the closing sentence rose.
 *
 * **It is a light band since the redesign** (`13318:3318`) — white ground,
 * encre title and disclaimer — where it used to be the article's only dark
 * one and the hub's still is. Every measurement is unchanged; only the
 * colours flipped.
 */
export function Transparence() {
  const t = useTranslations("Transparence");

  return (
    <section className="bg-white">
      {/* 1200 centred inside the Container lands on 360, which is where this
          frame starts its 1100 column — so the band positions and the text
          measure separately. */}
      {/* 52px below the last line, where the hub's frame leaves 28 — both
          are simply what each frame's height leaves over. */}
      <Container className="pt-12 pb-9 lg:pt-18 lg:pb-13">
        <div className="mx-auto flex max-w-300 flex-col gap-5">
          <div className="flex max-w-196 flex-col gap-2">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62">{t("sources")}</p>
          </div>

          <p className="text-body text-encre max-w-275">{t("disclaimer")}</p>

          <p className="text-small text-encre/62 max-w-275">
            {t.rich("translation", {
              link: (chunks) => <SignalLink>{chunks}</SignalLink>,
            })}
          </p>
        </div>
      </Container>
    </section>
  );
}
