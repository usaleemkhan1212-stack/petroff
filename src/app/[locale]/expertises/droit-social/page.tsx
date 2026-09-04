import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScrollOverlap } from "@/components/ScrollOverlap";
import { Consultation } from "@/components/consultation/Consultation";
import { Bib } from "@/components/sections/social/Bib";
import { CTAFinal } from "@/components/sections/social/CTAFinal";
import { Domaines } from "@/components/sections/social/Domaines";
import { Espace } from "@/components/sections/social/Espace";
import { Faq } from "@/components/sections/social/Faq";
import { Forfaits } from "@/components/sections/social/Forfaits";
import { Hero } from "@/components/sections/social/Hero";
import { Methode } from "@/components/sections/social/Methode";
import { MidCTA } from "@/components/sections/social/MidCTA";
import { Prestations } from "@/components/sections/social/Prestations";
import { Tools } from "@/components/sections/social/Tools";
import { routing } from "@/i18n/routing";

/**
 * Page 13 — Droit social (`12872:1005`), the fourth domain detail page.
 *
 * Same eleven-section shape as the three sibling domain pages. Its Hero is
 * the one
 * section derived from scratch; the rest share their anatomy with this page's
 * own copy, tints and prices, each read off its own node.
 */
export default async function DroitSocialPage({
  params,
}: PageProps<"/[locale]/expertises/droit-social">) {
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
