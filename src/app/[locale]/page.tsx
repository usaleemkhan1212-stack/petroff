import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Actus } from "@/components/sections/Actus";
import { Bibliotheque } from "@/components/sections/Bibliotheque";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Cabinet } from "@/components/sections/Cabinet";
import { Expertises } from "@/components/sections/Expertises";
import { OpenData } from "@/components/sections/OpenData";
import { Hero } from "@/components/sections/Hero";
import { SearchBand } from "@/components/sections/SearchBand";
import { routing } from "@/i18n/routing";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SearchBand />
      <Expertises />
      <Bibliotheque />
      <OpenData />
      <Cabinet />
      <Actus />
      <CTAFinal />
    </>
  );
}
