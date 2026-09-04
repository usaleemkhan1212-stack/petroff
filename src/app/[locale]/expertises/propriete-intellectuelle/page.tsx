import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScrollOverlap } from "@/components/ScrollOverlap";
import { Consultation } from "@/components/consultation/Consultation";
import { Bib } from "@/components/sections/propriete/Bib";
import { CTAFinal } from "@/components/sections/propriete/CTAFinal";
import { Domaines } from "@/components/sections/propriete/Domaines";
import { Espace } from "@/components/sections/propriete/Espace";
import { Faq } from "@/components/sections/propriete/Faq";
import { Forfaits } from "@/components/sections/propriete/Forfaits";
import { Hero } from "@/components/sections/propriete/Hero";
import { Methode } from "@/components/sections/propriete/Methode";
import { MidCTA } from "@/components/sections/propriete/MidCTA";
import { Prestations } from "@/components/sections/propriete/Prestations";
import { Tools } from "@/components/sections/propriete/Tools";
import { routing } from "@/i18n/routing";

/**
 * Page 16 — Propriete intellectuelle & marques (`12874:881`), the seventh domain detail page.
 *
 * Same eleven-section shape as the three sibling domain pages. Its Hero is
 * the one
 * section derived from scratch; the rest share their anatomy with this page's
 * own copy, tints and prices, each read off its own node.
 */
export default async function ProprietePage({
  params,
}: PageProps<"/[locale]/expertises/propriete-intellectuelle">) {
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
