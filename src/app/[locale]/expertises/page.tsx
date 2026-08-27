import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Consultation } from "@/components/consultation/Consultation";
import { ScrollOverlap } from "@/components/ScrollOverlap";
import { CTAFinal } from "@/components/sections/expertises/CTAFinal";
import { Domaines } from "@/components/sections/expertises/Domaines";
import { Facons } from "@/components/sections/expertises/Facons";
import { Stage } from "@/components/sections/expertises/Stage";
import { routing } from "@/i18n/routing";

export default async function ExpertisesPage({
  params,
}: PageProps<"/[locale]/expertises">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Stage />
      {/* Climbs 20px over the Stage as the reader scrolls. */}
      <ScrollOverlap>
        <Domaines />
      </ScrollOverlap>
      <Facons />
      <CTAFinal />
      <Consultation />
    </>
  );
}
