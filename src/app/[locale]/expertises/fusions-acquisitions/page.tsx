import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
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
 * Page 14 — Fusions-acquisitions & capital-risque (`12873:881`), the fifth domain detail page.
 *
 * Same eleven-section shape as the three sibling domain pages. Its Hero is
 * the one
 * section derived from scratch; the rest share their anatomy with this page's
 * own copy, tints and prices, each read off its own node.
 */
export default async function FusionsAcquisitionsPage({
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
