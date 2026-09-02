import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Consultation } from "@/components/consultation/Consultation";
import { Bib } from "@/components/sections/fiscal/Bib";
import { CTAFinal } from "@/components/sections/fiscal/CTAFinal";
import { Domaines } from "@/components/sections/fiscal/Domaines";
import { Espace } from "@/components/sections/fiscal/Espace";
import { Faq } from "@/components/sections/fiscal/Faq";
import { Forfaits } from "@/components/sections/fiscal/Forfaits";
import { Hero } from "@/components/sections/fiscal/Hero";
import { Methode } from "@/components/sections/fiscal/Methode";
import { MidCTA } from "@/components/sections/fiscal/MidCTA";
import { Prestations } from "@/components/sections/fiscal/Prestations";
import { Tools } from "@/components/sections/fiscal/Tools";
import { routing } from "@/i18n/routing";

/**
 * Page 12 — Droit fiscal (`12872:881`), the third domain detail page.
 *
 * Same eleven-section shape as Contentieux and Contrats. Its Hero is the one
 * section derived from scratch; the rest share those pages' anatomy with this
 * page's own copy, tints and prices, each read off its own node.
 */
export default async function DroitFiscalPage({
  params,
}: PageProps<"/[locale]/expertises/droit-fiscal">) {
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
