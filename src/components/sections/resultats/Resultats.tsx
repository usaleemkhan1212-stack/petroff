"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CaretDown from "@/assets/icons/caret-down.svg";
import { Container } from "@/components/ui/Container";
import {
  type ContentDomain,
  type ContentType,
  contentDomains,
  contentTypes,
} from "@/lib/bibliotheque";
import { initialDomain, resultats } from "@/lib/resultats";
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
  "text-button font-poppins h-12 max-w-full cursor-pointer appearance-none truncate " +
  "rounded-full bg-white pr-11 pl-4.5 " +
  "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * Figma's `13063:1088` — the Résultats section in its **filtered** state.
 *
 * It is the `/bibliotheque` section with three differences, and the section
 * grows 860 -> 890 because of the second:
 *
 * 1. it opens on a chosen category (`Se faire payer`), so its select is drawn
 *    **active** — a 2px periwinkle border where the resting one is `encre/14`;
 * 2. a **status row** sits between the filters and the grid — the result count
 *    at the right, then a periwinkle `Réinitialiser`;
 * 3. its four contents are this page's own, and none of them appears in the
 *    `/bibliotheque` set.
 *
 * The filters still work: the tabs and the select narrow the grid exactly as
 * they do on the hub, and `Réinitialiser` returns both to their opening state
 * rather than clearing them — that is what "reset" means on a page whose
 * default is itself a filter.
 */
export function Resultats() {
  const t = useTranslations("BibliothequePage.resultats");
  const page = useTranslations("ResultatsPage");
  /* Domain and type labels are the hub's; only the contents are this page's. */
  const shared = useTranslations("BibliothequePage");

  const [domain, setDomain] = useState<ContentDomain | "all">(initialDomain);
  const [type, setType] = useState<ContentType | "all">("all");

  const visible = resultats.filter(
    (r) =>
      (domain === "all" || r.domain === domain) && (type === "all" || r.type === type),
  );

  const filtered = domain !== initialDomain || type !== "all";

  return (
    <section className="bg-white">
      {/*
        Figma bands this section at 1200 rather than the shared 1245, which is
        exactly 1200 centred inside the Container — so x still lands on 360.
      */}
      <Container className="pt-16 pb-12 lg:pt-21.5 lg:pb-16.5">
        <div className="mx-auto max-w-300">
          {/*
            Gold at Poppins 16/1.2, not the brique text-overline every other
            section uses — this one really is the Button style in gold.
          */}
          <p className="text-button font-poppins text-gold uppercase">
            {t("overline")}
          </p>
          <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>

          <div className="mt-6 flex flex-wrap items-center gap-y-3">
            <div className="relative">
              <label htmlFor="library-category" className="sr-only">
                {t("categoryLabel")}
              </label>
              {/*
                Active: Figma draws the chosen category at a 2px periwinkle
                border. `border-2` costs a pixel of inner width against the
                resting `border`, which the 239px fixed width absorbs.
              */}
              <select
                id="library-category"
                value={domain}
                onChange={(e) => setDomain(e.target.value as ContentDomain | "all")}
                className={cn(
                  select,
                  "text-encre w-59.75",
                  domain === "all"
                    ? "border-encre/14 border"
                    : "border-periwinkle border-2",
                )}
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
                className="text-encre pointer-events-none absolute top-1/2 right-4.25 -translate-y-1/2"
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
                className={cn(
                  select,
                  "border-encre/14 text-encre/62 w-71.75 cursor-default border",
                )}
              >
                <option>{t("allSubcategories")}</option>
              </select>
              <CaretDown
                aria-hidden="true"
                width={12}
                height={8}
                className="text-encre pointer-events-none absolute top-1/2 right-4.25 -translate-y-1/2"
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

          {/*
            The status row this frame adds — and the whole of its 860 -> 890.
            Figma right-aligns it in the 1200 band: the count at x=1003 and the
            reset at 1104, ending on 1200. `justify-end` reproduces that without
            pinning either to a literal x.

            The count is `aria-live` so a filter change is announced; the reset
            only appears once something has actually moved off the opening
            state, which is what keeps it honest as a control.
          */}
          <div className="mt-3 flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
            <p aria-live="polite" className="text-small-strong text-encre/62">
              {visible.length === 1
                ? page("countOne")
                : page("count", { count: visible.length })}
            </p>
            {filtered && (
              <button
                type="button"
                aria-label={page("resetLabel")}
                onClick={() => {
                  setDomain(initialDomain);
                  setType("all");
                }}
                className="text-button font-poppins text-periwinkle focus-visible:outline-gold cursor-pointer rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {page("reset")}
              </button>
            )}
          </div>

          {visible.length > 0 ? (
            /* 3 -> 1, and the cards level so the meta rows line up. */
            <ul className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {visible.map(({ key, domain: cardDomain, type: cardType }) => (
                <li key={key} className="flex">
                  <article className="rounded-note-lg border-encre/8 flex min-h-62.5 min-w-0 flex-1 flex-col border bg-white pt-5.5 pr-6.5 pb-5 pl-6 transition-shadow hover:shadow-[0px_14px_34px_rgba(0,0,0,0.1)]">
                    <div className="flex flex-wrap gap-2">
                      <span className={cn(pill, "bg-pale-periwinkle")}>
                        {shared(`domains.${cardDomain}`)}
                      </span>
                      <span className={cn(pill, typeTones[cardType])}>
                        {shared(`types.${cardType}`)}
                      </span>
                    </div>

                    {/*
                      pr-6.5, not px-6: Figma's text boxes are 332 wide inside
                      the 384 card, so 24 left and 26 right. The title reserves
                      two lines so every description and meta row sits on one
                      baseline across the grid.
                    */}
                    <h3 className="text-h3 text-encre mt-4 min-h-13">
                      {page(`contents.${key}.title`)}
                    </h3>
                    <p className="text-small text-encre/62 mt-1.5">
                      {page(`contents.${key}.description`)}
                    </p>

                    <p className="text-small-strong text-encre/62 mt-auto flex items-center gap-2">
                      {page.rich(`meta.${key}`, {
                        cta: (chunks) => (
                          <span className="text-button font-poppins text-periwinkle">
                            {chunks}
                          </span>
                        ),
                      })}
                    </p>
                  </article>
                </li>
              ))}
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
