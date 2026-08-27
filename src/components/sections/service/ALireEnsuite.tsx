import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import cardCoffee from "@/assets/images/card-and-coffee-laptop.jpg";
import cardPayment from "@/assets/images/card-payment-laptop-wide.jpg";
import laptopColumn from "@/assets/images/laptop-by-column.jpg";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * The three pieces, in Figma's order. `type` drives the second pill's tint —
 * pale gold for a guide, pale blue for a fiche — exactly as the Vitrine and
 * both other ALireEnsuite blocks do. The domain pill is always pale periwinkle.
 */
const items = [
  { key: "abus", photo: laptopColumn, type: "bg-pale-gold" },
  { key: "blocage", photo: cardCoffee, type: "bg-pale-blue" },
  { key: "prix", photo: cardPayment, type: "bg-pale-blue" },
] as const satisfies readonly {
  key: string;
  photo: StaticImageData;
  type: string;
}[];

const pill = "text-small-strong text-encre rounded-full px-2.75 py-0.75";

/**
 * Figma `13445:17883` — "À lire sur le litige entre associés".
 *
 * **Bottom padding only**: Figma puts its overline at y=0, because Thèmes liés
 * above closes with its own 96. The same shape the e-commerce and article
 * ALireEnsuite blocks have.
 *
 * Its head is written out — 10 under the overline, 14 under the title, then 44
 * to the grid.
 */
export function ALireEnsuite() {
  const t = useTranslations("ServicePage.alire");

  return (
    <section className="bg-lilas">
      <Container className="pb-16 lg:pb-24">
        <p className="text-overline font-poppins text-brique uppercase">
          {t("overline")}
        </p>
        <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>
        <p className="text-body text-encre/62 mt-3.5">{t("lead")}</p>

        {/*
          Figma marks cards 2 and 3 `self-stretch` and leaves card 1 at its
          natural height, so the comp shows card 1 about 22px shorter. That
          reads as an artefact rather than a design — every other card grid on
          the site levels — so all three stretch here.
        */}
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-11">
          {items.map(({ key, photo, type }) => (
            <li key={key} className="flex">
              <article className="rounded-note-lg border-encre/8 flex min-w-0 flex-1 flex-col overflow-hidden border bg-white">
                <Image
                  src={photo}
                  alt=""
                  sizes="(min-width: 768px) 399px, 100vw"
                  className="h-56 w-full object-cover"
                />

                <div className="flex flex-1 flex-col gap-2.5 px-7 pt-6 pb-7">
                  <div className="flex flex-wrap gap-2">
                    <span className={cn(pill, "bg-pale-periwinkle")}>
                      {t("domain")}
                    </span>
                    <span className={cn(pill, type)}>
                      {t(`items.${key}.type`)}
                    </span>
                  </div>

                  <h3 className="text-h3 text-encre">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-small text-encre/62">
                    {t(`items.${key}.description`)}
                  </p>

                  {/* A 6px gap here, where Resultats uses 8 and the Vitrine
                      keeps one inline run — three variants of the same row. */}
                  <p className="flex items-center gap-1.5">
                    <span className="text-small-strong text-encre/62">
                      {t(`items.${key}.meta`)}
                    </span>
                    <span className="text-button font-poppins text-periwinkle">
                      {t("read")}
                    </span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Three cards are all on screen at once, so the dots are decorative. */}
        <div
          aria-hidden="true"
          className="mt-8.5 flex justify-center gap-3"
        >
          <span className="bg-periwinkle h-2.25 w-7.5 rounded-full" />
          <span className="bg-encre/20 size-2.25 rounded-full" />
          <span className="bg-encre/20 size-2.25 rounded-full" />
        </div>
      </Container>
    </section>
  );
}
