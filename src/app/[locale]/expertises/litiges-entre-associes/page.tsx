import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScrollOverlap } from "@/components/ScrollOverlap";
import { Consultation } from "@/components/consultation/Consultation";
import { Bib } from "@/components/sections/litiges/Bib";
import { CTAFinal } from "@/components/sections/litiges/CTAFinal";
import { Domaines } from "@/components/sections/litiges/Domaines";
import { Espace } from "@/components/sections/litiges/Espace";
import { Faq } from "@/components/sections/litiges/Faq";
import { Forfaits } from "@/components/sections/litiges/Forfaits";
import { Hero } from "@/components/sections/litiges/Hero";
import { Methode } from "@/components/sections/litiges/Methode";
import { MidCTA } from "@/components/sections/litiges/MidCTA";
import { Prestations } from "@/components/sections/litiges/Prestations";
import { Tools } from "@/components/sections/litiges/Tools";
import { routing } from "@/i18n/routing";

/**
 * Page - Litiges entre associes (`13986:881`), the twelfth domain
 * detail page and the same eleven-section shape as its seven siblings.
 *
 * Its Hero is the one section derived from scratch; the rest share the
 * siblings' anatomy with this page's own copy, tints and prices, each read off
 * its own node.
 */
export default async function LitigesPage({
  params,
}: PageProps<"/[locale]/expertises/litiges-entre-associes">) {
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
