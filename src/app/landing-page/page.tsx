import { LandingFooter } from "@/components/sections/landing/Footer";
import { LandingHeader } from "@/components/sections/landing/Header";
import { LandingHero } from "@/components/sections/landing/Hero";
import { LandingConsultation } from "@/components/sections/landing/Consultation";
import { LandingCTAFinal } from "@/components/sections/landing/CTAFinal";
import { LandingDocuments } from "@/components/sections/landing/Documents";
import { LandingFaq } from "@/components/sections/landing/Faq";
import { LandingFees } from "@/components/sections/landing/Fees";
import { LandingHowItWorks } from "@/components/sections/landing/HowItWorks";
import { LandingInterlocuteurs } from "@/components/sections/landing/Interlocuteurs";
import { LandingIsThisYou } from "@/components/sections/landing/IsThisYou";
import { LandingStats } from "@/components/sections/landing/Stats";
import { LandingWhatFrozen } from "@/components/sections/landing/WhatFrozen";
import { LandingTransparence } from "@/components/sections/landing/Transparence";
import { LandingTrustStrip } from "@/components/sections/landing/TrustStrip";

/**
 * Figma `14221:8802` — "Freeze a debtor's assets in France", a standalone
 * English landing page. Fourteen sections plus its own header, footer and
 * side tab; nothing here is shared with the rest of the site.
 */
export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingTrustStrip />
        <LandingStats />
        <LandingIsThisYou />
        <LandingHowItWorks />
        <LandingWhatFrozen />
        <LandingDocuments />
        <LandingFees />
        <LandingInterlocuteurs />
        <LandingFaq />
        <LandingTransparence />
        <LandingCTAFinal />
      </main>
      <LandingFooter />
      <LandingConsultation />
    </>
  );
}
