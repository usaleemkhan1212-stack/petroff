import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/ecommerce/Hero";
import { PrincipeIntro } from "@/components/sections/ecommerce/PrincipeIntro";
import { routing } from "@/i18n/routing";

/**
 * The e-commerce practice page (Figma `13331:10364`).
 *
 * Fifteen sections in the comp; being built one at a time, so this list grows
 * as each lands.
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
      <PrincipeIntro />
    </>
  );
}
