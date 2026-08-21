"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { heroSuggestions } from "@/lib/bibliotheque";

/**
 * The only client piece of this hero: the field keeps its own value so the
 * suggestion chips can prefill it. Submitting is inert until /recherche
 * exists, exactly like SearchBand and the OpenData lookup.
 */
export function HeroSearch() {
  const t = useTranslations("BibliothequePage.hero");
  const [query, setQuery] = useState("");

  return (
    <div className="flex w-full flex-col gap-7.5">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="border-encre/12 flex w-full max-w-160 items-center rounded-full border-[1.5px] bg-white p-1"
      >
        <label htmlFor="library-search" className="sr-only">
          {t("searchLabel")}
        </label>
        {/*
          type="text", not "search": Chrome's search decoration reserves inline
          space and adds a cancel button once there is a value, which clips the
          tail of the designed placeholder.
        */}
        <input
          id="library-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="text-body text-encre placeholder:text-encre/62 min-w-0 flex-1 bg-transparent pl-4.75 text-ellipsis outline-none"
        />
        {/* Figma draws 24px sides, between Button's md (28) and sm (20). */}
        <Button type="submit" size="lg" className="px-6">
          {t("searchSubmit")}
        </Button>
      </form>

      <div className="flex w-full max-w-152.25 flex-col gap-2.75">
        <p className="text-small-strong text-encre/62">{t("suggestionsLabel")}</p>
        {/*
          Figma lays these out as an equal-width 3x2 grid, which clips the
          first chip's label. They size to their content here and wrap, which
          reproduces the same 3 + 2 arrangement without the clipping.
        */}
        <div className="flex flex-wrap gap-2.5">
          {heroSuggestions.map((key) => (
            <Chip
              key={key}
              tone="solid"
              onClick={() => setQuery(t(`suggestions.${key}`))}
            >
              {t(`suggestions.${key}`)}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
