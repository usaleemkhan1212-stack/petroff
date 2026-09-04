import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScrollOverlap } from "@/components/ScrollOverlap";
import { Consultation } from "@/components/consultation/Consultation";
import { CTAFinal } from "@/components/sections/bibliotheque/CTAFinal";
import { Hero } from "@/components/sections/bibliotheque/Hero";
import { ParCategorie } from "@/components/sections/bibliotheque/ParCategorie";
import { Parcours } from "@/components/sections/bibliotheque/Parcours";
import { Resultats } from "@/components/sections/bibliotheque/Resultats";
import { Transparence } from "@/components/sections/bibliotheque/Transparence";
import { Vitrine } from "@/components/sections/bibliotheque/Vitrine";
import { Vivante } from "@/components/sections/bibliotheque/Vivante";
import { routing } from "@/i18n/routing";

export default async function BibliothequePage({
  params,
}: PageProps<"/[locale]/bibliotheque">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ScrollOverlap>
        <Vitrine />
      </ScrollOverlap>
      <Resultats />
      <ParCategorie />
      <Parcours />
      <Vivante />
      <Transparence />
      <CTAFinal />

      {/* New in the redesign (`13415:15644`): the shared red tab and drawer,
          unchanged from the home page's — this frame draws no sticky bar. */}
      <Consultation />
    </>
  );
}
