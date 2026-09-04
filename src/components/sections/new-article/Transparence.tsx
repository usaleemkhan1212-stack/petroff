import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/**
 * Figma's `Transparence` (`13318:3318`): the sources-and-transparency band —
 * white, a gold overline, an encre title and a full-encre disclaimer over the
 * translation note, whose closing sentence alone is rose.
 *
 * **Its column is vertically centred in the 370px band, not padded 72/52.**
 * Figma pins the group at `top: 62.43` and its content runs 246.4, which
 * leaves 61.2 below. An ink-band profile of the node render puts the
 * overline's cap top at **y=67**, which is what a 62.43 box gives; 72 would
 * put it at ~76.5. The two paddings both total 370, so the height alone cannot
 * tell them apart — only the band positions can.
 *
 * **Its band is 1100 left-aligned inside the 1200 one, not centred.** 1100
 * centred in the 1245 Container would start at 410, where the frame says 360 —
 * which is where 1200 centred lands. So the band position (`max-w-300`) and
 * the text measure (`max-w-275`) are two separate things here.
 *
 * Figma splits both paragraphs into explicit lines; at this measure the
 * natural wrap breaks at the same word, so neither needs a `<br>`.
 *
 * All five strings come from the shared top-level `Transparence` namespace.
 */
export function Transparence() {
  const t = useTranslations("Transparence");

  return (
    <section className="bg-white">
      <Container className="py-12 lg:pt-15.5 lg:pb-15.25">
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
