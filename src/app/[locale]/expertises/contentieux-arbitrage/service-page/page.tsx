import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Consultation } from "@/components/consultation/Consultation";
import { Essentiel } from "@/components/sections/service/Essentiel";
import { Faq } from "@/components/sections/service/Faq";
import { Forfaits } from "@/components/sections/service/Forfaits";
import { Hero } from "@/components/sections/service/Hero";
import { ALireEnsuite } from "@/components/sections/service/ALireEnsuite";
import { AllerPlusLoin } from "@/components/sections/service/AllerPlusLoin";
import { CTAFinal } from "@/components/sections/service/CTAFinal";
import { CeQuilNousFaut } from "@/components/sections/service/CeQuilNousFaut";
import { ComprendreLeDroit } from "@/components/sections/service/ComprendreLeDroit";
import { DeLAnalyse } from "@/components/sections/service/DeLAnalyse";
import { CommentNousProcedons } from "@/components/sections/service/CommentNousProcedons";
import { Interlocuteurs } from "@/components/sections/service/Interlocuteurs";
import { MidCTA } from "@/components/sections/service/MidCTA";
import { Mission } from "@/components/sections/service/Mission";
import { QuandFaireAppel } from "@/components/sections/service/QuandFaireAppel";
import { ThemesLies } from "@/components/sections/service/ThemesLies";
import { Transparence } from "@/components/sections/service/Transparence";
import { Trust } from "@/components/sections/service/Trust";
import { routing } from "@/i18n/routing";

/**
 * The service page (Figma `13445:16534`, "Petroff.law — Service page").
 *
 * Its subject is "Litige entre associés", but the route and the nav label say
 * `service-page` — it is one page of design for a service template rather than
 * a real service route, exactly as `new-article-page` is.
 *
 * Eighteen content sections in the comp plus a side tab; built one at a time,
 * so this list grows as each lands. Its crumb puts it a level below the
 * Contentieux domain page, which is where the route comes from.
 *
 * Note the frame's own 17105 is stale: its sections run to 17401.
 */
export default async function ServicePage({
  params,
}: PageProps<"/[locale]/expertises/contentieux-arbitrage/service-page">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Trust />
      <QuandFaireAppel />
      <Mission />
      <CommentNousProcedons />
      <CeQuilNousFaut />
      <DeLAnalyse />
      <Forfaits />
      <ComprendreLeDroit />
      <MidCTA />
      <Essentiel />
      <Faq />
      <AllerPlusLoin />
      <Interlocuteurs />
      <ThemesLies />
      <ALireEnsuite />
      <Transparence />
      <CTAFinal />

      {/* `13445:18026` — the shared red tab and drawer, as on every other
          page in this pass. This frame draws no sticky bar. */}
      <Consultation />
    </>
  );
}
