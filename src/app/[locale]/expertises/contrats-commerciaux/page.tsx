import { Consultation } from "@/components/consultation/Consultation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CTAFinal } from "@/components/sections/contrats/CTAFinal";
import { Bib } from "@/components/sections/contrats/Bib";
import { Domaines } from "@/components/sections/contrats/Domaines";
import { Espace } from "@/components/sections/contrats/Espace";
import { Faq } from "@/components/sections/contrats/Faq";
import { Forfaits } from "@/components/sections/contrats/Forfaits";
import { Hero } from "@/components/sections/contrats/Hero";
import { Methode } from "@/components/sections/contrats/Methode";
import { MidCTA } from "@/components/sections/contrats/MidCTA";
import { Prestations } from "@/components/sections/contrats/Prestations";
import { Tools } from "@/components/sections/contrats/Tools";
import { routing } from "@/i18n/routing";

export default async function ContratsPage({
  params,
}: PageProps<"/[locale]/expertises/contrats-commerciaux">) {
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
      {/* New in the redesign: the red side tab (`13395:14970`). */}
      <Consultation />
    </>
  );
}
