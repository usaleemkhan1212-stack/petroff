import Image from "next/image";
import { useTranslations } from "next-intl";
import ArcDeTriomphe from "@/assets/icons/arc-de-triomphe-colour-xl.svg";
import ArrowsMerge from "@/assets/icons/arrows-merge.svg";
import Briefcase from "@/assets/icons/briefcase.svg";
import Building from "@/assets/icons/building.svg";
import Copyright from "@/assets/icons/copyright.svg";
import Document from "@/assets/icons/document.svg";
import Gavel from "@/assets/icons/gavel.svg";
import LaDefenseWide from "@/assets/icons/la-defense-wide.svg";
import Percent from "@/assets/icons/percent.svg";
import Users from "@/assets/icons/users.svg";
import portrait from "@/assets/images/lawyer-portrait-polaroid.jpg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { domaineCards, networkChips } from "@/lib/le-cabinet";
import { cn } from "@/lib/utils";

const icons = {
  societes: Briefcase,
  fusions: ArrowsMerge,
  propriete: Copyright,
  contentieux: Gavel,
  social: Users,
  fiscal: Percent,
  immobilier: Building,
  contrats: Document,
} as const;

/**
 * Figma `13689:21524` — "Domaines couverts", a lilas band on `py-96` holding a
 * 679 intro column beside a 470x414 encre card, then a lilas-2 network strip
 * and a closing link to the Expertises hub.
 *
 * **Its illustration is the service page's Mission composition**, rebuilt for
 * this frame: a 450x414 lilas-2 panel with a masked scene, an encre ground bar
 * and the Arc laid over it, plus the -8deg polaroid. Figma masks each piece
 * with the panel's own rounded shape, so the panel's `overflow-hidden` does the
 * clipping and each piece takes its mask offset as a position — the technique
 * `paris-skyline.svg` established.
 *
 * **One new asset on the whole section**: `la-defense-wide.svg`, a 549x304.666
 * landscape composition of the Grande Arche and its towers — a different
 * drawing from the portrait `la-defense-scene.svg`. Everything else reuses:
 * all eight 26px icons, `arc-de-triomphe-colour-xl` at 192x157 (its stroke
 * rendering 6.33 against Figma's 6, a 5.5% difference) and
 * `lawyer-portrait-polaroid.jpg`, which diffs at **0.47** once Figma's own
 * centre-cover placement is applied to the export.
 */
export function Domaines() {
  const t = useTranslations("CabinetPage.domaines");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex min-w-0 flex-col gap-9 xl:w-169.75 xl:shrink-0 xl:items-end">
              {/* The illustration: a 450 panel pushed right inside the 679
                  column, with the polaroid overhanging its lower left. */}
              <div className="relative hidden h-97.75 w-full xl:block">
                <div className="bg-lilas-2 absolute top-0 left-[135.5px] h-103.5 w-112.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
                  <LaDefenseWide
                    aria-hidden="true"
                    width={548.374}
                    height={304.666}
                    className="absolute top-[109px] left-[-38.5px] max-w-none"
                  />
                  <span
                    aria-hidden="true"
                    className="bg-encre absolute top-[402.53px] left-[-55.152px] h-[11.196px] w-[485.162px]"
                  />
                  <ArcDeTriomphe
                    aria-hidden="true"
                    width={192}
                    height={157}
                    className="absolute top-[264px] left-[113.5px] max-w-none"
                  />
                </div>

                {/*
                  Figma's 176.653x220.91 is the *rotated* bounding box of a
                  150x202 card at -8deg, so the untransformed card sits at
                  13.33/9.46 for its box to land at (0, 167).
                */}
                <figure className="absolute top-[176.46px] left-[13.33px] h-50.5 w-37.5 -rotate-8 rounded-tl-[60px] rounded-tr-[8px] rounded-br-[30px] rounded-bl-[30px] bg-white drop-shadow-[0px_16px_18px_rgba(18,42,76,0.16)]">
                  <Image
                    src={portrait}
                    alt={t("photoAlt")}
                    sizes="120px"
                    className="absolute top-[12.31px] left-[13.42px] size-30 rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px] object-cover"
                  />
                  <figcaption className="text-button font-poppins text-encre absolute top-[142px] left-1/2 w-31.5 -translate-x-1/2 text-center">
                    {t.rich("polaroid", { br: () => <br /> })}
                  </figcaption>
                </figure>
              </div>

              <div className="flex w-full flex-col gap-9">
                <div className="flex flex-col gap-3">
                  <p className="text-overline font-poppins text-brique uppercase">
                    {t("overline")}
                  </p>
                  <h2 className="text-h2 text-encre">{t("title")}</h2>
                  <p className="text-body text-encre/62">{t("lead")}</p>
                </div>

                <ul className="flex flex-col gap-3">
                  {domaineCards.map(({ key, tint, count, href }) => {
                    const Icon = icons[key];
                    return (
                      <li key={key}>
                        {/* Figma lifts the first card on `0px 14px 17px`; that
                            is `Card`'s hover shadow, the sixth time a drawn
                            shadow has turned out to be a state. */}
                        <MaybeLink
                          href={href}
                          className="border-encre/7 flex items-center justify-between gap-6 rounded-[20px] border bg-white px-6 py-5 transition-shadow hover:shadow-[0px_14px_17px_0px_rgba(0,0,0,0.1)]"
                        >
                          <span className="flex min-w-0 items-center gap-6">
                            <span
                              className={cn(
                                "rounded-tile flex size-13 shrink-0 items-center justify-center",
                                tint,
                              )}
                            >
                              <Icon
                                aria-hidden="true"
                                width={26}
                                height={26}
                                className="text-encre"
                              />
                            </span>
                            <span className="text-h3 font-poppins text-encre min-w-0">
                              {t(`cards.${key}`)}
                            </span>
                          </span>
                          <span className="text-body-strong text-periwinkle flex shrink-0 items-center gap-2">
                            {t("cta", { count })}
                            <span aria-hidden="true">→</span>
                          </span>
                        </MaybeLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="bg-encre flex flex-col gap-6 rounded-[20px] p-9 xl:h-103.5 xl:w-117.5 xl:shrink-0">
              <div className="flex flex-col gap-4">
                <p className="text-overline font-poppins text-brique uppercase">
                  {t("transverse.overline")}
                </p>
                <p className="text-price font-poppins max-w-92.25 text-white">
                  {t("transverse.title")}
                </p>
              </div>
              <p className="text-body text-white/70">{t("transverse.body")}</p>
              <div className="flex flex-col items-start gap-2">
                <ConsultButton variant="gold" size="lg">
                  {t("transverse.cta")}
                </ConsultButton>
                <p className="text-small text-white/70">
                  {t.rich("transverse.note", {
                    s: (chunks) => (
                      <span className="text-small-strong text-white">{chunks}</span>
                    ),
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-lilas-2 flex flex-col gap-6.5 rounded-[18px] p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-body-strong text-encre">{t("network.label")}</p>
              {networkChips.map((key) => (
                <span
                  key={key}
                  className="text-small-strong text-encre/62 rounded-full bg-white px-3 py-1"
                >
                  {t(`network.chips.${key}`)}
                </span>
              ))}
            </div>
            <p className="text-body text-encre/62">{t("network.note")}</p>
          </div>

          <MaybeLink
            href="/expertises"
            className="text-body-strong text-periwinkle flex w-fit items-center gap-2 hover:underline"
          >
            {t("hubCta")}
            <span aria-hidden="true">→</span>
          </MaybeLink>
        </div>
      </Container>
    </section>
  );
}
