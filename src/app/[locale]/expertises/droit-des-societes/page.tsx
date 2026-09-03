import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Consultation } from "@/components/consultation/Consultation";
import { Bib } from "@/components/sections/societes/Bib";
import { CTAFinal } from "@/components/sections/societes/CTAFinal";
import { Domaines } from "@/components/sections/societes/Domaines";
import { Espace } from "@/components/sections/societes/Espace";
import { Faq } from "@/components/sections/societes/Faq";
import { Forfaits } from "@/components/sections/societes/Forfaits";
import { Hero } from "@/components/sections/societes/Hero";
import { Methode } from "@/components/sections/societes/Methode";
import { MidCTA } from "@/components/sections/societes/MidCTA";
import { Prestations } from "@/components/sections/societes/Prestations";
import { Tools } from "@/components/sections/societes/Tools";
import { routing } from "@/i18n/routing";

/**
 * Page - Droit des societes & gouvernance (`13979:881`), the ninth domain
 * detail page and the same eleven-section shape as its seven siblings.
 *
 * Its Hero is the one section derived from scratch; the rest share the
 * siblings' anatomy with this page's own copy, tints and prices, each read off
 * its own node.
 */
export default async function SocietesPage({
  params,
}: PageProps<"/[locale]/expertises/droit-des-societes">) {
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
