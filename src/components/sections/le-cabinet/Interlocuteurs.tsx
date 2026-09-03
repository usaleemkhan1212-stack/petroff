import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import LaurelBranch from "@/assets/icons/laurel-branch-mint.svg";
import ParisScene from "@/assets/icons/paris-scene.svg";
import Sparkle from "@/assets/icons/sparkle.svg";
import hlebarova from "@/assets/images/hlebarova-portrait.jpg";
import petrova from "@/assets/images/lawyer-portrait-rail.jpg";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { cabinetPartners, cabinetPeople } from "@/lib/le-cabinet";

const photos: Record<(typeof cabinetPeople)[number]["key"], StaticImageData> = {
  petrova,
  hlebarova,
};

/**
 * Figma `13701:24212` — "Vos interlocuteurs", a white band on `py-96`.
 *
 * **A fourth Interlocuteurs shape**, and none of the other three ports: the
 * article's is two stacked full-width cards, the e-commerce page copies those,
 * and the service page draws one full-width lawcard over three partner cards.
 * This one is **two 350 author cards beside the arch illustration**, then a
 * partners block that is names and roles only — no photographs at all.
 *
 * Its head is the same 10 / 14 / 44 chain the service and e-commerce blocks
 * use, and its lead is Inter 16, not 18.
 *
 * The row is `items-start` and neither card carries `self-stretch`, so Figma
 * ends them at 498 and 475 — their own heights, not one levelled row.
 */
export function Interlocuteurs() {
  const shared = useTranslations("Interlocuteurs");
  const t = useTranslations("CabinetPage.interlocuteurs");

  return (
    /* The laurel bleeds past the container's right edge, as it does in every
       FAQ illustration on the site. */
    <section className="overflow-hidden bg-white">
      <Container className="py-16 lg:py-24">
        <p className="text-overline font-poppins text-brique uppercase">
          {shared("overline")}
        </p>
        <h2 className="text-h2 text-encre mt-2.5">{shared("title")}</h2>
        <p className="text-small text-encre/62 mt-3.5">{shared("lead")}</p>

        <div className="mt-8 flex flex-col gap-9 lg:mt-11 lg:gap-12">
          <div className="flex flex-col gap-9 xl:flex-row xl:items-start xl:justify-between">
            {/* `xl:contents` lets the two cards become direct children of the
                justify-between row, so Figma's 81px gaps fall out of the 1245
                band rather than being stated. */}
            <div className="flex flex-col gap-9 sm:flex-row xl:contents">
              {cabinetPeople.map(({ key, href }) => (
                <article
                  key={key}
                  className="border-encre/8 flex min-w-0 flex-1 flex-col items-center gap-6 overflow-hidden rounded-tl-[80px] rounded-tr-[18px] rounded-br-[60px] rounded-bl-[18px] border bg-white p-7 xl:w-87.5 xl:flex-none"
                >
                  <Image
                    src={photos[key]}
                    alt={t(`photoAlt.${key}`)}
                    sizes="(min-width: 1280px) 294px, 100vw"
                    className="h-42.25 w-full rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px] object-cover"
                  />

                  <div className="flex w-full flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <p className="text-h3 font-poppins text-encre">
                        {t(`people.${key}.name`)}
                      </p>
                      <p className="text-small-strong text-periwinkle">
                        {t(`people.${key}.role`)}
                      </p>
                      <p className="text-small text-encre/62">
                        {t(`people.${key}.bio`)}
                      </p>
                    </div>

                    {/* Figma's 20/11 padding — `size="sm"` is 20/12, so the 11
                        is written out. An anchor cannot use `Button`, which is
                        always a real button element, so it wears the same pill
                        through `buttonClasses`. */}
                    <MaybeLink
                      href={href}
                      className={buttonClasses({
                        variant: "outline",
                        size: "sm",
                        className: "w-fit py-2.75",
                      })}
                    >
                      {shared("profileCta")}
                    </MaybeLink>
                  </div>
                </article>
              ))}
            </div>

            {/*
              The arch composition, coordinate for coordinate the FAQ
              illustration this site draws on five other pages — arch 313x400
              at (70.5, 8), sparkle 46 at (49, -4), laurel 120x150 at
              (421.5, 335.5), which is what Figma's own inset percentages
              resolve to on this 383x440 box. It differs in exactly two things:
              the arch's bottom corners are rounded 25.04 rather than square,
              and it carries a drop shadow.

              `paris-scene.svg` reuses at 313x400.64 — an exact 1.0016 of its
              312.5x400, and its five stroke widths scale with it (5 to 5.008,
              6.25 to 6.26), so no fork.
            */}
            <div
              aria-hidden="true"
              className="relative hidden h-110 w-95.75 shrink-0 xl:block"
            >
              <div className="absolute top-2 left-[70.5px] h-100 w-78.25 overflow-hidden rounded-t-full rounded-b-[25.04px] drop-shadow-[0px_15.024px_13.772px_rgba(33,29,51,0.13)]">
                <ParisScene
                  width={313}
                  height={400.64}
                  className="absolute top-0 left-0 max-w-none"
                />
              </div>
              <Sparkle
                width={46}
                height={46}
                className="absolute top-[-4px] left-[49px]"
              />
              <LaurelBranch
                width={120}
                height={150}
                className="absolute top-[335.5px] left-[421.5px] max-w-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("partnersLabel")}
            </p>
            <ul className="flex flex-wrap gap-x-9 gap-y-6 lg:justify-between">
              {cabinetPartners.map((key) => (
                <li key={key} className="flex flex-col gap-2">
                  <p className="text-h3 font-poppins text-encre">
                    {t(`partners.${key}.name`)}
                  </p>
                  <p className="text-small-strong text-encre/62">
                    {t(`partners.${key}.role`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
