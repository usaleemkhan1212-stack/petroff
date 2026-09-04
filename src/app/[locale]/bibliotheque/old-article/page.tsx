import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScrollOverlap } from "@/components/ScrollOverlap";
import { Lawcard } from "@/components/contact/Lawcard";
import { ALireEnsuite } from "@/components/sections/article/ALireEnsuite";
import { Cabinet } from "@/components/sections/article/Cabinet";
import { Interlocuteurs } from "@/components/sections/article/Interlocuteurs";
import { Transparence } from "@/components/sections/article/Transparence";
import { CTAFinal } from "@/components/sections/article/CTAFinal";
import { Corps } from "@/components/sections/article/Corps";
import { Hero } from "@/components/sections/article/Hero";
import { Consultation } from "@/components/sections/article/Consultation";
import { routing } from "@/i18n/routing";

export default async function OldArticlePage({
  params,
}: PageProps<"/[locale]/bibliotheque/old-article">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ScrollOverlap>
        <Corps />
      </ScrollOverlap>

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
