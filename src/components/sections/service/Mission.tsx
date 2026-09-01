import Image from "next/image";
import { useTranslations } from "next-intl";
import ParisRooftops from "@/assets/icons/paris-rooftops-wide.svg";
import portrait from "@/assets/images/lawyer-portrait-polaroid.jpg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";

/** The six phases of the mission, in Figma's order. */
const phases = [
  "evaluation",
  "preuve",
  "negociation",
  "urgence",
  "fond",
  "cloture",
] as const;

/**
 * Figma `13445:20731` — "Une position sécurisée, puis imposée".
 *
 * A 679 intro column beside a 470 card. **The row takes no gap**: 679 + 470 is
 * 1149 inside the 1245 container, which `justify-between` spaces by exactly 96
 * — the same arithmetic the section above uses.
 *
 * It splits at `xl`, not `lg`: at 1024 the container gives the column only 418
 * against the illustration panel's 450.
 */
export function Mission() {
  const t = useTranslations("ServicePage.mission");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between xl:gap-0">
          <div className="flex min-w-0 flex-col gap-9 xl:w-169.75">
            {/*
              The illustration block: a 450x414 lilas-2 panel flush right in the
              679 column, carrying the composed rooftops scene, with the
              polaroid overhanging its left edge.

              Hidden below sm, where a 450 panel cannot fit — the same call the
              e-commerce Principe illustration and the Cabinet collage make.
            */}
            <div aria-hidden="true" className="relative hidden h-103.5 w-full sm:block">
              <div className="bg-lilas-2 absolute top-0 right-0 h-full w-full max-w-112.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
                {/* Figma places the scene at (108.5, 27.56) in the column,
                    i.e. 120.5 left of the panel, and lets the panel clip it. */}
                <ParisRooftops
                  className="absolute top-[27.56px] left-[-120.5px]"
                  width={570.958}
                  height={386.163}
                />
              </div>

              {/*
                Figma's 176.653x220.910 box is the *rotated* bounding box of a
                150x202 card at -8deg (150·cos8 + 202·sin8 = 176.66). CSS
                rotates about the centre, so the untransformed card sits at
                106.83/197.33 for its bounding box to land on Figma's 93.5/187.88
                — the same correction the Bibliotheque polaroid needed.
              */}
              <figure className="absolute top-[197.33px] left-[106.83px] h-50.5 w-37.5 -rotate-8 rounded-tl-[60px] rounded-tr-[8px] rounded-br-[30px] rounded-bl-[30px] bg-white drop-shadow-[0px_16px_18px_rgba(18,42,76,0.16)]">
                <div className="absolute top-[12.31px] left-[13.42px] size-30 overflow-hidden rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px]">
                  <Image
                    src={portrait}
                    alt=""
                    sizes="120px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="text-button font-poppins text-encre absolute top-[142px] left-1/2 w-31.5 -translate-x-1/2 text-center">
                  {t.rich("polaroid", { br: () => <br /> })}
                </figcaption>
              </figure>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
              <p className="text-body text-encre/62">{t("lead")}</p>
            </div>

            <ol className="flex flex-col gap-3">
              {phases.map((key, i) => (
                <li
                  key={key}
                  className="border-encre/10 flex items-start gap-4.5 border-b py-4.5"
                >
                  {/* aria-hidden: the <ol> already conveys the sequence.
                      Figma gives it a fixed **60px** column (`13445:27591`),
                      so every title starts on the same left edge — it had
                      sized to content. */}
                  <span
                    aria-hidden="true"
                    className="text-h2 font-poppins text-pale-periwinkle w-15 shrink-0"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="text-h4 font-poppins text-encre">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-body text-encre/62">{t(`items.${key}.body`)}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* 361px of label against a 335 content box at 375: full width
                with the label allowed to wrap below sm. `Button` sets
                whitespace-nowrap in its base class, so it has to be
                overridden rather than just omitted. */}
            <ConsultButton
              size="lg"
              variant="gold"
              className="w-full whitespace-normal sm:w-auto sm:self-start sm:whitespace-nowrap"
            >
              {t("cta")}
            </ConsultButton>
          </div>

          {/* Figma names this frame `sticky`, and at 414 against the column's
              1503 it has plenty to ride. */}
          <div className="bg-encre rounded-card flex flex-col items-start gap-6 p-6 sm:p-9 xl:sticky xl:top-6 xl:w-117.5 xl:self-start">
            <div className="flex flex-col gap-4">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("card.overline")}
              </p>
              <h3 className="text-price font-poppins max-w-92.25 text-white">
                {t("card.title")}
              </h3>
            </div>
            <p className="text-body text-white/70">{t("card.body")}</p>
            <ConsultButton size="lg" variant="gold">
              {t("card.cta")}
            </ConsultButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
