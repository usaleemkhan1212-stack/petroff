import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ModelFolder from "@/assets/icons/model-folder.svg";
import glassMeetingRoom from "@/assets/images/glass-meeting-room.jpg";
import loungeConversation from "@/assets/images/lounge-conversation.jpg";
import standingHuddle from "@/assets/images/standing-huddle.jpg";
import { Container } from "@/components/ui/Container";

/*
  The type pill is data, not styling — pale gold for a guide, pale blue for a
  fiche — while the domain pill is always pale periwinkle. Same pill and the
  same 11/3 padding as the Vitrine's, so no new variant.
*/
const cards = [
  { key: "formation", photo: loungeConversation, type: "bg-pale-gold" },
  { key: "preuve", photo: standingHuddle, type: "bg-pale-blue" },
  { key: "copie", photo: glassMeetingRoom, type: "bg-pale-blue" },
] as const satisfies readonly {
  key: string;
  photo: StaticImageData;
  type: string;
}[];

/* Figma fills the sub-category list column by column, not row by row. */
const sameCat = [
  ["cg", "mandat"],
  ["date", "engagement"],
] as const;

const tag = "text-small-strong text-encre rounded-full px-2.75 py-0.75";

/**
 * Figma's `ALireEnsuite` (`13318:3230`): five blocks on a uniform 36px gap —
 * the head, the prev/next pair, a 3-up library grid, the commented-model row
 * and the sub-category list.
 *
 * **It takes bottom padding only** — Figma puts its overline at y=0, the same
 * shape as Interlocuteurs above it.
 *
 * **Its head gaps are 16 and 16**, where the original page's build puts 10
 * under the overline and 14 under the title. Figma wraps the three lines in
 * one 16px column here.
 *
 * **The prev/next labels are deliberately asymmetric**: both are periwinkle,
 * but the left one is the overline style (0.18em tracking) and the right one
 * the Button style with none. Check the tracking before assuming a pair of
 * labels shares a style.
 *
 * Figma puts a nowrap on the next-article title. That is an auto-layout
 * artefact — it fits on one line at the designed width anyway, and keeping it
 * would push the page wide below about 500px. Omitted.
 *
 * **The card descriptions are Inter 16 (`text-small`)**, not the body's 18.
 *
 * All four assets match stored files: `model-folder.svg` is path-identical,
 * and the three photo exports run through Figma's own placement diff against
 * the stored crops at 2.7 to 4.0 of 255. No new assets, and its copy is
 * character-identical to `ArticlePage.alire`, so no new strings.
 */
export function ALireEnsuite() {
  const t = useTranslations("ArticlePage.alire");

  return (
    <section className="bg-lilas">
      {/* The column goes INSIDE `Container` — it renders a padded outer div
          around a max-w inner one, so a flex class passed to it lands on the
          outer element and the five blocks lose their 36px gap entirely. */}
      <Container className="pb-12 sm:pb-16 lg:pb-24">
        <div className="flex flex-col gap-6 lg:gap-9">
          <div className="flex flex-col gap-4">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-small text-encre/62">{t("lead")}</p>
          </div>

          {/* Previous / next. Figma stretches only the right card. */}
          <nav className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="rounded-note-lg border-encre/8 flex flex-col gap-2 border bg-white p-5 sm:flex-1 sm:p-7">
              <p className="text-overline font-poppins text-periwinkle uppercase">
                {t("prevLabel")}
              </p>
              <p className="text-h3 font-poppins text-encre">
                {t("items.formation.title")}
              </p>
            </div>
            <div className="rounded-note-lg border-encre/8 flex flex-col items-end gap-2 border bg-white p-5 text-right sm:flex-1 sm:self-stretch sm:p-7">
              <p className="text-button font-poppins text-periwinkle uppercase">
                {t("nextLabel")}
              </p>
              <p className="text-h3 font-poppins text-encre">{t("nextTitle")}</p>
            </div>
          </nav>

          <ul className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {cards.map(({ key, photo, type }, index) => (
              <li
                key={key}
                className={`rounded-note-lg border-encre/8 flex min-w-0 flex-col overflow-hidden border bg-white lg:flex-1 ${
                  index > 0 ? "lg:self-stretch" : ""
                }`}
              >
                <div className="relative h-56 w-full shrink-0">
                  <Image
                    src={photo}
                    alt={t(`items.${key}.photoAlt`)}
                    fill
                    sizes="(min-width: 1024px) 399px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2.5 px-5 pt-6 pb-5 sm:px-7 sm:pb-7">
                  <ul className="flex flex-wrap gap-2">
                    <li className={`${tag} bg-pale-periwinkle`}>{t("domain")}</li>
                    <li className={`${tag} ${type}`}>{t(`items.${key}.type`)}</li>
                  </ul>
                  <p className="text-h3 font-poppins text-encre">
                    {t(`items.${key}.title`)}
                  </p>
                  <p className="text-small text-encre/62">
                    {t(`items.${key}.description`)}
                  </p>
                  <p className="flex flex-wrap items-center gap-1.5">
                    <span className="text-small-strong text-encre/62">
                      {t(`items.${key}.meta`)}
                    </span>
                    {/* Inert — the article routes do not exist. */}
                    <span className="text-button font-poppins text-periwinkle inline-flex items-center gap-2">
                      {t("cta")}
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* The commented model, on its own pale-gold band. */}
          <div className="rounded-note-lg bg-pale-gold flex flex-col items-start gap-6.5 p-5 sm:p-7 lg:flex-row lg:items-center">
            <ModelFolder
              aria-hidden="true"
              width={64}
              height={56}
              className="shrink-0"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <p className="text-h3 font-poppins text-encre">{t("model.title")}</p>
              <p className="text-body text-encre/62">{t("model.description")}</p>
            </div>
            <span className="text-button font-poppins text-encre border-encre shrink-0 rounded-full border-[1.5px] px-6 py-3">
              {t("model.cta")}
            </span>
          </div>

          {/* Same sub-category. Figma fills these column by column, and sizes
            each row to its own content — so two real columns, not a grid whose
            tracks would be levelled. */}
          <div className="border-encre/10 flex flex-col gap-5 border-t pt-6">
            <p className="text-button font-poppins text-encre">{t("sameCatLabel")}</p>
            <div className="flex flex-col gap-5 pt-3.5 sm:flex-row sm:gap-16">
              {sameCat.map((column) => (
                <ul key={column[0]} className="flex min-w-0 flex-1 flex-col gap-5">
                  {column.map((key) => (
                    <li
                      key={key}
                      className="border-encre/6 flex items-center gap-3 border-b py-2"
                    >
                      <span className="text-body text-encre min-w-0 flex-1">
                        {t(`sameCat.${key}.title`)}
                      </span>
                      <span className="text-small-strong text-encre/62 shrink-0">
                        {t(`sameCat.${key}.meta`)}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
