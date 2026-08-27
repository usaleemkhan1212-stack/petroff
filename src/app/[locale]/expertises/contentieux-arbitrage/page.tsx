import { Consultation } from "@/components/consultation/Consultation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Bib } from "@/components/sections/contentieux/Bib";
import { CTAFinal } from "@/components/sections/contentieux/CTAFinal";
import { Domaines } from "@/components/sections/contentieux/Domaines";
import { Espace } from "@/components/sections/contentieux/Espace";
import { Faq } from "@/components/sections/contentieux/Faq";
import { Forfaits } from "@/components/sections/contentieux/Forfaits";
import { Hero } from "@/components/sections/contentieux/Hero";
import { Methode } from "@/components/sections/contentieux/Methode";
import { MidCTA } from "@/components/sections/contentieux/MidCTA";
import { Prestations } from "@/components/sections/contentieux/Prestations";
import { Tools } from "@/components/sections/contentieux/Tools";
import { routing } from "@/i18n/routing";

export default async function ContentieuxPage({
  params,
}: PageProps<"/[locale]/expertises/contentieux-arbitrage">) {
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
      {/* New in the redesign: the red side tab (`13395:14965`). */}
      <Consultation />
    </>
  );
}
