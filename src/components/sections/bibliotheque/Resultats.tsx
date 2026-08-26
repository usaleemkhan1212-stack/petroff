"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CaretDown from "@/assets/icons/caret-down.svg";
import { Container } from "@/components/ui/Container";
import {
  type ContentDomain,
  type ContentType,
  contentByKey,
  contentDomains,
  contentTypes,
  resultatsItems,
} from "@/lib/bibliotheque";
import { cn } from "@/lib/utils";

/**
 * A fiche is lilas-2 here where the Vitrine tints it pale blue — the two
 * sections genuinely disagree in Figma, so they keep their own maps.
 */
const typeTones: Record<ContentType, string> = {
  guide: "bg-pale-gold",
  fiche: "bg-lilas-2",
  modele: "bg-pale-blue",
};

const pill = "text-small-strong text-encre rounded-full px-3 py-1";

/**
 * Fixed widths, because a select sizes itself to its longest option: left to
 * itself the category one grows to 333px and shoves the tabs 100px right of
 * where the comp puts them. `truncate` keeps a long choice inside the pill.
 */
const select =
  "text-button font-poppins border-encre/14 h-12 max-w-full cursor-pointer appearance-none truncate " +
  "rounded-full border bg-white pr-11 pl-4.5 " +
  "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2";

export function Resultats() {
  const t = useTranslations("BibliothequePage.resultats");
  /* Titles, domains and type labels are shared with the Vitrine carousel. */
  const shared = useTranslations("BibliothequePage");

  const [domain, setDomain] = useState<ContentDomain | "all">("all");
  const [type, setType] = useState<ContentType | "all">("all");

  const visible = resultatsItems.filter((key) => {
    const content = contentByKey.get(key);
    if (!content) return false;
    return (
      (domain === "all" || content.domain === domain) &&
      (type === "all" || content.type === type)
    );
  });

  return (
    <section className="bg-white">
      {/*
        Figma bands this section at 1200 rather than the shared 1245, which is
        exactly 1200 centred inside the Container — so x still lands on 360.
      */}
      <Container className="pt-21.5 pb-16.5">
        <div className="mx-auto max-w-300">
          {/*
            Gold at Poppins 16/1.2, not the brique text-overline every other
            section uses — this one really is the Button style in gold.
          */}
          <p className="text-button font-poppins uppercase text-gold">{t("overline")}</p>
          <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>

          <div className="mt-6 flex flex-wrap items-center gap-y-3">
            <div className="relative">
              <label htmlFor="library-category" className="sr-only">
                {t("categoryLabel")}
              </label>
              <select
                id="library-category"
                value={domain}
                onChange={(e) => setDomain(e.target.value as ContentDomain | "all")}
                className={cn(select, "text-encre w-59.75")}
              >
                <option value="all">{t("allCategories")}</option>
                {contentDomains.map((key) => (
                  <option key={key} value={key}>
                    {shared(`domains.${key}`)}
                  </option>
                ))}
              </select>
              <CaretDown
                aria-hidden="true"
                width={12}
                height={8}
                className="text-encre pointer-events-none absolute top-1/2 right-5 -translate-y-1/2"
              />
            </div>

            {/*
              Disabled, at the 60% opacity Figma draws: sub-categories are the
              taxonomy's second level and no content carries one yet.
            */}
            <div className="relative ml-3 opacity-60">
              <label htmlFor="library-subcategory" className="sr-only">
                {t("subcategoryLabel")}
              </label>
              <select
                id="library-subcategory"
                disabled
                className={cn(select, "text-encre/62 w-71.75 cursor-default")}
              >
                <option>{t("allSubcategories")}</option>
              </select>
              <CaretDown
                aria-hidden="true"
                width={12}
                height={8}
                className="text-encre pointer-events-none absolute top-1/2 right-5 -translate-y-1/2"
              />
            </div>

            <span
              aria-hidden="true"
              className="bg-encre/12 mr-4 ml-6 hidden h-6.5 w-px lg:block"
            />

            {/*
              Real tabs over the type facet. They are buttons rather than
              role="tab": there is one panel, not one per tab, so a tablist
              would promise a widget this is not.
            */}
            <div
              role="group"
              aria-label={t("typeLabel")}
              className="flex flex-wrap gap-2"
            >
              {(["all", ...contentTypes] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={type === key}
                  onClick={() => setType(key)}
                  className={cn(
                    "text-button font-poppins flex h-10 cursor-pointer items-center rounded-full border px-4 transition-colors",
                    "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2",
                    type === key
                      ? "bg-encre border-encre text-white"
                      : "border-encre/10 text-encre/62 hover:border-encre/25 hover:text-encre bg-white",
                  )}
                >
                  {t(`tabs.${key}`)}
                </button>
              ))}
            </div>
          </div>

          {visible.length > 0 ? (
            /* 3 -> 1, and the cards level so the meta rows line up. */
            <ul className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {visible.map((key) => {
                const content = contentByKey.get(key);
                if (!content) return null;
                return (
                  <li key={key} className="flex">
                    <article className="rounded-note-lg border-encre/8 flex min-h-62.5 min-w-0 flex-1 flex-col border bg-white pt-5.5 pr-6.5 pb-5 pl-6">
                      <div className="flex flex-wrap gap-2">
                        <span className={cn(pill, "bg-pale-periwinkle")}>
                          {shared(`domains.${content.domain}`)}
                        </span>
                        <span className={cn(pill, typeTones[content.type])}>
                          {shared(`types.${content.type}`)}
                        </span>
                      </div>

                      {/*
                        pr-6.5, not px-6: Figma's text boxes are 332 wide
                        inside the 384 card, so 24 left and 26 right. The 2px
                        matters — at 334 two of the six titles pull up onto
                        one line and stop matching the comp.

                        Non-uniform on purpose: Figma gives 16px under the
                        pills but only 6px under the title. It also pins the
                        description to a fixed y whatever the title's length,
                        so the title reserves two lines (min-h-13) — that
                        keeps every description and meta row on one baseline
                        across the grid, which a one-line title would break.
                      */}
                      <h3 className="text-h3 text-encre mt-4 min-h-13">
                        {shared(`contents.${key}.title`)}
                      </h3>
                      <p className="text-small text-encre/62 mt-1.5">
                        {shared(`contents.${key}.description`)}
                      </p>

                      {/* mt-auto holds the meta row on the card's bottom edge. */}
                      <p className="text-small-strong text-encre/62 mt-auto">
                        {t.rich(`meta.${key}`, {
                          cta: (chunks) => (
                            <span className="text-button font-poppins text-periwinkle">
                              {chunks}
                            </span>
                          ),
                        })}
                      </p>
                    </article>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p role="status" className="text-body text-encre/62 mt-9">
              {t("empty")}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
