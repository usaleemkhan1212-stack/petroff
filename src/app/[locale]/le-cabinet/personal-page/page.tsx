import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScrollOverlap } from "@/components/ScrollOverlap";
import { Consultation } from "@/components/consultation/Consultation";
import { Lawcard } from "@/components/contact/Lawcard";
import { EnBref } from "@/components/sections/personal/EnBref";
import { Faq } from "@/components/sections/personal/Faq";
import { Hero } from "@/components/sections/personal/Hero";
import { Parcours } from "@/components/sections/personal/Parcours";
import { routing } from "@/i18n/routing";

/**
 * The personal page (Figma `13495:29357`, "Petroff.law — Personal page") —
 * Mᵉ Mariela Petrova's profile. Its crumb reads *Accueil · Le Cabinet · Mᵉ
 * Mariela Petrova*, which is where the route and the new Le Cabinet submenu
 * come from.
 *
 * Five content sections in the comp plus a side tab; built one at a time, so
 * this list grows as each lands.
 *
 * Note the frame's own 6266 is stale — its footer ends at 4489.
 */
export default async function PersonalPage({
  params,
}: PageProps<"/[locale]/le-cabinet/personal-page">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ScrollOverlap>
        <EnBref />
      </ScrollOverlap>
      <Parcours />
      <Faq />
      <Lawcard />

      {/* `13495:29913` — the shared red tab and drawer. */}
      <Consultation />
    </>
  );
}
