import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Consultation } from "@/components/consultation/Consultation";
import { Bib } from "@/components/sections/recouvrement/Bib";
import { CTAFinal } from "@/components/sections/recouvrement/CTAFinal";
import { Domaines } from "@/components/sections/recouvrement/Domaines";
import { Espace } from "@/components/sections/recouvrement/Espace";
import { Faq } from "@/components/sections/recouvrement/Faq";
import { Forfaits } from "@/components/sections/recouvrement/Forfaits";
import { Hero } from "@/components/sections/recouvrement/Hero";
import { Methode } from "@/components/sections/recouvrement/Methode";
import { MidCTA } from "@/components/sections/recouvrement/MidCTA";
import { Prestations } from "@/components/sections/recouvrement/Prestations";
import { Tools } from "@/components/sections/recouvrement/Tools";
import { routing } from "@/i18n/routing";

/**
 * Page 17 — Recouvrement & mesures conservatoires (`12874:993`), the eighth domain detail page.
 *
 * Same eleven-section shape as the three sibling domain pages. Its Hero is
 * the one
 * section derived from scratch; the rest share their anatomy with this page's
 * own copy, tints and prices, each read off its own node.
 */
export default async function RecouvrementPage({
  params,
}: PageProps<"/[locale]/expertises/recouvrement">) {
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
