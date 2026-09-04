import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScrollOverlap } from "@/components/ScrollOverlap";
import { Consultation } from "@/components/consultation/Consultation";
import { ALireEnsuite } from "@/components/sections/ecommerce/ALireEnsuite";
import { CommentCaMarche } from "@/components/sections/ecommerce/CommentCaMarche";
import { CommentNousAidons } from "@/components/sections/ecommerce/CommentNousAidons";
import { ComprendreLeDroit } from "@/components/sections/ecommerce/ComprendreLeDroit";
import { CTAFinal } from "@/components/sections/ecommerce/CTAFinal";
import { Faq } from "@/components/sections/ecommerce/Faq";
import { Forfaits } from "@/components/sections/ecommerce/Forfaits";
import { Hero } from "@/components/sections/ecommerce/Hero";
import { Interlocuteurs } from "@/components/sections/ecommerce/Interlocuteurs";
import { NotreRole } from "@/components/sections/ecommerce/NotreRole";
import { PrincipeIntro } from "@/components/sections/ecommerce/PrincipeIntro";
import { QuandConsulter } from "@/components/sections/ecommerce/QuandConsulter";
import { Transparence } from "@/components/sections/ecommerce/Transparence";
import { routing } from "@/i18n/routing";

/**
 * The e-commerce practice page (Figma `13331:10364`).
 *
 * Thirteen sections in the comp plus a side tab; being built one at a time,
 * so this list grows as each lands.
 */
export default async function EcommercePage({
  params,
}: PageProps<"/[locale]/bibliotheque/avocat-e-commerce">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ScrollOverlap>
        <PrincipeIntro />
      </ScrollOverlap>
      <NotreRole />
      <QuandConsulter />
      <CommentNousAidons />
      <Forfaits />
      <CommentCaMarche />
      <ComprendreLeDroit />
      <Faq />
      <Interlocuteurs />
      <ALireEnsuite />
      <Transparence />
      <CTAFinal />
      <Consultation />
    </>
  );
}
