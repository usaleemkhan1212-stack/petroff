import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Lawcard } from "@/components/contact/Lawcard";
import { ALireEnsuite } from "@/components/sections/new-article/ALireEnsuite";
import { CTAFinal } from "@/components/sections/new-article/CTAFinal";
import { Cabinet } from "@/components/sections/new-article/Cabinet";
import { Consultation } from "@/components/sections/new-article/Consultation";
import { Corps } from "@/components/sections/new-article/Corps";
import { Interlocuteurs } from "@/components/sections/new-article/Interlocuteurs";
import { Transparence } from "@/components/sections/new-article/Transparence";
import { Hero } from "@/components/sections/new-article/Hero";
import { routing } from "@/i18n/routing";

/**
 * A second build of the article frame `13318:2398`, alongside the original at
 * `/bibliotheque/article-design`.
 *
 * The frame has grown since that page was derived — Corps 13966.6 -> 14362.6
 * and ALireEnsuite 1405 -> 1411 — so this page is being rebuilt section by
 * section against the current nodes while the old one stays untouched for
 * comparison.
 *
 * **Nothing here is ported from the original page** — every component is
 * derived from the current Figma nodes, on the user's instruction, after a
 * first attempt at porting produced the old design on the new rhythm.
 *
 * **Its copy is not duplicated**: the article is the same article, so these
 * sections read the existing `ArticlePage` namespace, and only what the new
 * frame actually says goes into `NewArticlePage`.
 *
 * Eight sections in the comp; being built one at a time, so this list grows.
 */
export default async function NewArticlePage({
  params,
}: PageProps<"/[locale]/bibliotheque/new-article-page">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Corps />

      {/* `13544:34907` — the contact lawcard, a new top-level section
          between Corps and Cabinet. It replaces the `consult` form that
          used to sit inside the article column, and is the personal
          page's card on a lilas-2 band rather than lilas. */}
      <Lawcard tone="lilas-2" />
      <Cabinet />
      <Interlocuteurs />
      <ALireEnsuite />
      <Transparence />
      <CTAFinal />
      <Consultation />
    </>
  );
}
