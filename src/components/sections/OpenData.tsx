"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resultRows, sources, watchItems } from "@/lib/opendata";
import { cn } from "@/lib/utils";

/** Dashed rule under every result row and veille item. */
const row = "border-encre/12 flex w-full border-b border-dashed py-3";

const strong = "text-small-strong text-encre";
const muted = "text-small text-encre/62";

const badgeTones = {
  blue: "bg-pale-blue",
  gold: "bg-pale-gold",
} as const;

export function OpenData() {
  const t = useTranslations("OpenData");
  const [query, setQuery] = useState("");

  return (
    <section className="bg-lilas">
      <Container className="py-24">
        <div className="flex flex-col gap-12">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            lead={t("lead")}
          />

          {/* Two equal cards side by side; they reflow 2 -> 1. */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card className="flex flex-col gap-3 px-7 py-9">
              <h3 className="text-h3 text-encre">{t("verify.title")}</h3>
              <p className={muted}>{t("verify.description")}</p>

              <form
                role="search"
                aria-label={t("verify.title")}
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: query the INSEE Sirene API. Inert for now — nothing
                  // on this page navigates or calls out yet.
                }}
                className="rounded-field bg-lilas flex w-full items-center gap-2 p-2"
              >
                <label htmlFor="siren-lookup" className="sr-only">
                  {t("verify.label")}
                </label>
                {/*
                  Deliberately type="text", not "search": Chrome's search
                  decoration reserves inline space and adds a cancel button once
                  there is a value, which clips the designed placeholder. The
                  field also carries no padding of its own — Figma insets the
                  text by the wrapper's 8px and nothing more. text-ellipsis
                  keeps the truncation graceful below the 1245px design width.
                */}
                <input
                  id="siren-lookup"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("verify.placeholder")}
                  className="text-body text-encre placeholder:text-encre/50 min-w-0 flex-1 bg-transparent text-ellipsis outline-none"
                />
                <Button type="submit">{t("verify.submit")}</Button>
              </form>

              {/* Sample lookup baked into the comp, not a live result. */}
              {/* gap-3 inside matches the card's own gap, so the rows sit on
                  the same 12px rhythm as the heading and field above them. */}
              <dl aria-label={t("verify.resultsLabel")} className="flex flex-col gap-3">
                {resultRows.map(({ key, emphasis, green }) => (
                  <div
                    key={key}
                    className={cn(row, "flex-wrap items-baseline gap-x-4")}
                  >
                    <dt className={emphasis === "term" ? strong : muted}>
                      {t(`verify.rows.${key}.term`)}
                    </dt>
                    <dd
                      className={cn(
                        "ml-auto text-right",
                        emphasis === "detail" ? strong : muted,
                        green && "text-result-green",
                      )}
                    >
                      {t(`verify.rows.${key}.detail`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>

            <Card className="flex flex-col gap-3 px-7 py-9">
              <h3 className="text-h3 text-encre">{t("watch.title")}</h3>
              <p className={muted}>{t("watch.description")}</p>

              <ul className="flex flex-col gap-3">
                {watchItems.map((key) => (
                  <li key={key} className={cn(row, "flex-col gap-1")}>
                    <p className="text-nav text-encre">
                      {t(`watch.items.${key}.title`)}
                    </p>
                    <p className={muted}>{t(`watch.items.${key}.meta`)}</p>
                  </li>
                ))}
              </ul>

              <ul aria-label={t("watch.sourcesLabel")} className="flex flex-wrap gap-2">
                {sources.map(({ key, tone }) => (
                  <li
                    key={key}
                    className={cn(
                      "text-small-strong text-encre rounded-full px-3 py-1",
                      badgeTones[tone],
                    )}
                  >
                    {t(`watch.sources.${key}`)}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
