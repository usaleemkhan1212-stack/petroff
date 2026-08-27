import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import bazinPhoto from "@/assets/images/bazin-portrait-wide.jpg";
import cochetPhoto from "@/assets/images/cochet-portrait.jpg";
import mehandzhiyskaPhoto from "@/assets/images/mehandzhiyska-portrait.jpg";
import petrovaPhoto from "@/assets/images/lawyer-portrait-card.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Mariela's three practice chips, in Figma's order. */
const tags = ["tag1", "tag2", "tag3"] as const;

/** The three partner cards, in Figma's order. */
const partners = [
  { key: "cochet", photo: cochetPhoto },
  { key: "mehandzhiyska", photo: mehandzhiyskaPhoto },
  { key: "bazin", photo: bazinPhoto },
] as const satisfies readonly { key: string; photo: StaticImageData }[];

/** Shared by both card types — Figma gives them the same four radii. */
const cardShape =
  "border-encre/8 rounded-tl-[80px] rounded-tr-[18px] rounded-br-[60px] rounded-bl-[18px] border bg-white";

/**
 * Figma `13445:26666` — "Qui traite ce sujet au cabinet".
 *
 * **A third Interlocuteurs shape**, not the article's two stacked cards: one
 * full-width lawcard for Mariela, then a row of three partner cards on a 96px
 * gap. Its head is written out — 10 under the overline, 14 under the title,
 * then 44 to the grid — and its lead is Inter 16, not 18.
 *
 * The head and Mariela's own copy are character-identical to the shared
 * top-level `Interlocuteurs` namespace, so they are read from it; only the
 * angle note and the three partners are this page's own.
 */
export function Interlocuteurs() {
  const shared = useTranslations("Interlocuteurs");
  const t = useTranslations("ServicePage.interlocuteurs");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <p className="text-overline font-poppins text-brique uppercase">
          {shared("overline")}
        </p>
        <h2 className="text-h2 text-encre mt-2.5">{shared("title")}</h2>
        <p className="text-small text-encre/62 mt-3.5">{shared("lead")}</p>

        <div className="mt-8 flex flex-col gap-12 lg:mt-11">
          {/* Figma draws the shadow on this card only, and the three partner
              cards below have none — so it is the hover state, the fifth time
              on this build. */}
          <article
            className={`${cardShape} flex flex-col gap-7 p-6 transition-shadow sm:flex-row sm:items-start sm:p-7 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)]`}
          >
            <Image
              src={petrovaPhoto}
              alt={shared("photoAlt.petrova")}
              sizes="200px"
              className="h-60 w-50 shrink-0 rounded-tl-[80px] rounded-tr-[4px] rounded-br-[20px] rounded-bl-[20px] object-cover"
            />

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-h3 text-encre">
                    {shared("items.petrova.name")}
                  </h3>
                  <p className="text-small text-encre/62">
                    {shared("items.petrova.role")}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-small-strong text-encre/62 bg-lilas rounded-full px-3 py-1"
                    >
                      {shared(`items.petrova.${tag}`)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-small-strong text-periwinkle">
                  {shared("items.petrova.languages")}
                </p>
                {/* 3px red left edge, as on the article and e-commerce. */}
                <p className="text-small text-encre/62 border-red border-l-3 py-0.5 pl-3.5">
                  {t.rich("angle", {
                    s: (chunks) => (
                      <span className="text-button font-poppins text-encre">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>
              </div>

              {/* "En savoir plus sur Mᵉ Petrova" is 275px with its padding
                  against a 230px card box at 320, so the labels wrap below sm.
                  `Button` sets whitespace-nowrap in its base class. */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="sm"
                  className="px-5 py-2.75 whitespace-normal sm:whitespace-nowrap"
                >
                  {shared("items.petrova.cta")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-5 py-2.75 whitespace-normal sm:whitespace-nowrap"
                >
                  {shared("items.petrova.cta2")}
                </Button>
              </div>
            </div>
          </article>

          <ul className="flex flex-col gap-12 lg:flex-row lg:gap-8 xl:gap-24">
            {partners.map(({ key, photo }) => (
              <li key={key} className="flex lg:flex-1">
                <article
                  className={`${cardShape} flex flex-1 flex-col items-center gap-6 p-6 sm:p-7`}
                >
                  <Image
                    src={photo}
                    alt={t(`partners.${key}.photoAlt`)}
                    sizes="(min-width: 1024px) 244px, 100vw"
                    className="aspect-[244/140] w-full rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px] object-cover"
                  />

                  <div className="flex w-full flex-col gap-2 text-center">
                    <h3 className="text-h3 text-encre">
                      {t(`partners.${key}.name`)}
                    </h3>
                    <p className="text-encre/62">
                      <span className="text-small block">
                        {t(`partners.${key}.speciality`)}
                      </span>
                      <span className="text-small-strong block">
                        {t("partnerLabel")}
                      </span>
                    </p>
                    <p className="text-small-strong text-periwinkle">
                      {t(`partners.${key}.bar`)}
                    </p>
                  </div>

                  <div className="flex w-full flex-col items-center gap-4">
                    {/* "Consulter Mᵉ Mehandziyska" cannot hold one line in a
                        264px card at lg, so these wrap until xl. */}
                    <Button
                      size="sm"
                      className="px-5 py-2.75 text-center whitespace-normal xl:whitespace-nowrap"
                    >
                      {t(`partners.${key}.cta`)}
                    </Button>
                    <Button variant="outline" size="sm" className="px-5 py-2.75">
                      {t("profileCta")}
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
