import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScrollOverlap } from "@/components/ScrollOverlap";
import { Consultation } from "@/components/consultation/Consultation";
import { Bib } from "@/components/sections/ma/Bib";
import { CTAFinal } from "@/components/sections/ma/CTAFinal";
import { Domaines } from "@/components/sections/ma/Domaines";
import { Espace } from "@/components/sections/ma/Espace";
import { Faq } from "@/components/sections/ma/Faq";
import { Forfaits } from "@/components/sections/ma/Forfaits";
import { Hero } from "@/components/sections/ma/Hero";
import { Methode } from "@/components/sections/ma/Methode";
import { MidCTA } from "@/components/sections/ma/MidCTA";
import { Prestations } from "@/components/sections/ma/Prestations";
import { Tools } from "@/components/sections/ma/Tools";
import { routing } from "@/i18n/routing";

/**
 * Page - Fusions-acquisitions (`13966:881`), the tenth domain
 * detail page and the same eleven-section shape as its seven siblings.
 *
 * Its Hero is the one section derived from scratch; the rest share the
 * siblings' anatomy with this page's own copy, tints and prices, each read off
 * its own node.
 */
export default async function MaPage({
  params,
}: PageProps<"/[locale]/expertises/fusions-acquisitions">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ScrollOverlap>
        <Domaines />
      </ScrollOverlap>
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
