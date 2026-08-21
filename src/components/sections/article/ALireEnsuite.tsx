import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ModelFolder from "@/assets/icons/model-folder.svg";
import glassMeetingRoom from "@/assets/images/glass-meeting-room.jpg";
import loungeConversation from "@/assets/images/lounge-conversation.jpg";
import standingHuddle from "@/assets/images/standing-huddle.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/*
  `tone` is the type pill's ground, which is data rather than styling — pale
  gold for a guide, pale blue for a fiche, exactly as the Bibliotheque Vitrine
  colours them. The domain pill is always pale periwinkle.
*/
const contents = [
  { key: "formation", photo: loungeConversation, tone: "bg-pale-gold" },
  { key: "preuve", photo: standingHuddle, tone: "bg-pale-blue" },
  { key: "copie", photo: glassMeetingRoom, tone: "bg-pale-blue" },
] as const satisfies readonly {
  key: string;
  photo: StaticImageData;
  tone: string;
}[];

const sameCat = ["cg", "mandat", "date", "engagement"] as const;

const tag = "text-small-strong text-encre rounded-full px-2.75 py-0.75";

/**
 * What to read after this article: the previous and next fiches, three
 * related library contents, the commented model, and the rest of the
 * sub-category.
 *
 * Third section on this page to write its head out rather than using
 * `SectionHeading` — 10px under the overline, 14px under the title, and a
 * full-width `text-small` lead.
 */
export function ALireEnsuite() {
  const t = useTranslations("ArticlePage.alire");

  return (
    <section className="bg-lilas">
      <Container className="py-24">
        <p className="text-overline font-poppins text-brique">{t("overline")}</p>
        <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>
        <p className="text-small text-encre/62 mt-3.5">{t("lead")}</p>

        {/* Previous / next. Figma sets the two labels differently on purpose:
            the left one is the brique overline, the right one the periwinkle
            Button style with no tracking. */}
        <nav className="mt-11 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-note-lg border-encre/8 flex flex-col items-start gap-2 border bg-white p-7">
            <p className="text-overline font-poppins text-brique">
              {t("prevLabel")}
            </p>
            <p className="text-h3 font-poppins text-encre">
              {t("items.formation.title")}
            </p>
          </div>
          <div className="rounded-note-lg border-encre/8 flex flex-col items-end gap-2 border bg-white p-7 text-right">
            <p className="text-button font-poppins text-periwinkle">
              {t("nextLabel")}
            </p>
            <p className="text-h3 font-poppins text-encre">{t("nextTitle")}</p>
          </div>
        </nav>

        {/* 3 -> 1. Card 1 sets the row height; the other two stretch to it. */}
        <ul className="mt-8.5 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {contents.map(({ key, photo, tone }) => (
            <li key={key} className="flex">
              <article className="rounded-note-lg border-encre/8 flex min-w-0 flex-1 flex-col overflow-hidden border bg-white">
                <Image
                  src={photo}
                  alt={t(`items.${key}.photoAlt`)}
                  sizes="(min-width: 1024px) 399px, 100vw"
                  className="h-56 w-full object-cover"
                />

                <div className="flex flex-col gap-2.5 px-7 pt-6 pb-7">
                  <div className="flex flex-wrap gap-2">
                    <span className={cn(tag, "bg-pale-periwinkle")}>
                      {t("domain")}
                    </span>
                    <span className={cn(tag, tone)}>
                      {t(`items.${key}.type`)}
                    </span>
                  </div>

                  <h3 className="text-h3 text-encre">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-small text-encre/62">
                    {t(`items.${key}.description`)}
                  </p>

                  <p className="flex flex-wrap items-center gap-1.5">
                    <span className="text-small-strong text-encre/62">
                      {t(`items.${key}.meta`)}
                    </span>
                    <span className="text-button font-poppins text-periwinkle">
                      {t("cta")} <span aria-hidden="true">&rarr;</span>
                    </span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* The commented model. Bordered but not white — it sits on lilas. */}
        <div className="rounded-note-lg border-encre/8 mt-6 flex flex-col items-start gap-6.5 border p-7 sm:flex-row sm:items-center">
          <ModelFolder
            aria-hidden="true"
            width={64}
            height={56}
            className="shrink-0"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <p className="text-h3 font-poppins text-encre">
              {t("model.title")}
            </p>
            <p className="text-body text-encre/62">{t("model.description")}</p>
          </div>
          {/* Figma's 24px sides; `sm` is 20 and `md` is 28. */}
          <Button variant="outline" className="shrink-0 px-6">
            {t("model.cta")}
          </Button>
        </div>

        <div className="border-encre/10 mt-8.5 border-t pt-6">
          <p className="text-button font-poppins text-encre/62">
            {t("sameCatLabel")}
          </p>
          {/* Two columns, 32px apart and no row gap — the rules do the work.
              `items-start` because Figma lets each row keep its own height:
              a one-line row's rule sits higher than its two-line neighbour's,
              where a stretched grid would level the two. */}
          <ul className="grid grid-cols-1 items-start gap-x-8 pt-3.5 sm:grid-cols-2">
            {sameCat.map((key) => (
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
        </div>
      </Container>
    </section>
  );
}
