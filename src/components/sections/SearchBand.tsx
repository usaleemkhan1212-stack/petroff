"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { popularSearches } from "@/lib/search";

export function SearchBand() {
  const t = useTranslations("SearchBand");
  const [query, setQuery] = useState("");

  /**
   * TODO: navigate to /recherche?q= once that route exists. Until then
   * nothing on this page routes anywhere, so submitting is inert and the
   * popular chips just prefill the field.
   */
  const search = (term: string) => {
    setQuery(term.trim());
  };

  return (
    <section className="bg-encre">
      <Container className="py-16">
        <div className="flex flex-col gap-5">
          <h2 className="text-h2-sm font-poppins text-white">{t("heading")}</h2>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              search(query);
            }}
            className="flex w-full max-w-205 items-center gap-2 rounded-full bg-white p-2"
          >
            <label htmlFor="site-search" className="sr-only">
              {t("label")}
            </label>
            {/*
              type="text", not "search": Chrome's search decoration reserves
              inline space and adds a cancel button once there is a value,
              which clipped the tail of the designed placeholder.
            */}
            <input
              id="site-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("placeholder")}
              className="text-body text-encre placeholder:text-encre/50 min-w-0 flex-1 bg-transparent pl-2 text-ellipsis outline-none"
            />
            <Button type="submit" variant="gold" size="md">
              {t("submit")}
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-small text-white/70">{t("popular")}</span>
            {popularSearches.map((term) => (
              <Chip key={term} onClick={() => search(term)}>
                {term}
              </Chip>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
