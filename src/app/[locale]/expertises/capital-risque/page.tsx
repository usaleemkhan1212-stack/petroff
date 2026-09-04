import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Consultation } from "@/components/consultation/Consultation";
import { Bib } from "@/components/sections/capital/Bib";
import { CTAFinal } from "@/components/sections/capital/CTAFinal";
import { Domaines } from "@/components/sections/capital/Domaines";
import { Espace } from "@/components/sections/capital/Espace";
import { Faq } from "@/components/sections/capital/Faq";
import { Forfaits } from "@/components/sections/capital/Forfaits";
import { Hero } from "@/components/sections/capital/Hero";
import { Methode } from "@/components/sections/capital/Methode";
import { MidCTA } from "@/components/sections/capital/MidCTA";
import { Prestations } from "@/components/sections/capital/Prestations";
import { Tools } from "@/components/sections/capital/Tools";
import { routing } from "@/i18n/routing";

/**
 * Page - Capital-risque & private equity (`13973:881`), the eleventh domain
 * detail page and the same eleven-section shape as its seven siblings.
 *
 * Its Hero is the one section derived from scratch; the rest share the
 * siblings' anatomy with this page's own copy, tints and prices, each read off
 * its own node.
 */
export default async function CapitalPage({
  params,
}: PageProps<"/[locale]/expertises/capital-risque">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Domaines />
      <Tools />
      <Prestations />
      <Forfaits />
      <MidCTA />
      <Methode />
      <Espace />
      <Bib />
      <Faq />
      <CTAFinal />
      <Consultation />
    </>
  );
}
