import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Consultation } from "@/components/consultation/Consultation";
import { Bib } from "@/components/sections/immobilier/Bib";
import { CTAFinal } from "@/components/sections/immobilier/CTAFinal";
import { Domaines } from "@/components/sections/immobilier/Domaines";
import { Espace } from "@/components/sections/immobilier/Espace";
import { Faq } from "@/components/sections/immobilier/Faq";
import { Forfaits } from "@/components/sections/immobilier/Forfaits";
import { Hero } from "@/components/sections/immobilier/Hero";
import { Methode } from "@/components/sections/immobilier/Methode";
import { MidCTA } from "@/components/sections/immobilier/MidCTA";
import { Prestations } from "@/components/sections/immobilier/Prestations";
import { Tools } from "@/components/sections/immobilier/Tools";
import { routing } from "@/i18n/routing";

/**
 * Page 15 — Immobilier d'entreprise (`12873:1006`), the sixth domain detail page.
 *
 * Same eleven-section shape as the three sibling domain pages. Its Hero is
 * the one
 * section derived from scratch; the rest share their anatomy with this page's
 * own copy, tints and prices, each read off its own node.
 */
export default async function ImmobilierPage({
  params,
}: PageProps<"/[locale]/expertises/immobilier-entreprise">) {
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
