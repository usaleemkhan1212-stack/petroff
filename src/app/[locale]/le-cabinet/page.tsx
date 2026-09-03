import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Consultation } from "@/components/consultation/Consultation";
import { Domaines } from "@/components/sections/le-cabinet/Domaines";
import { Hero } from "@/components/sections/le-cabinet/Hero";
import { Methode } from "@/components/sections/le-cabinet/Methode";
import { Secteurs } from "@/components/sections/le-cabinet/Secteurs";
import { Trust } from "@/components/trust/Trust";
import { routing } from "@/i18n/routing";

/**
 * Le Cabinet (Figma `13689:21336`, "Petroff.law — Le Cabinet") — 1920x9220,
 * the firm's own page and the one the header's first nav entry finally points
 * at. Ten sections plus the red side tab; built one at a time.
 *
 * | # | Section | Node | Figma h |
 * |---|---|---|---|
 * | 1 | Hero | `13689:21389` | 853 |
 * | 2 | Trust | `13689:21444` | 100 |
 * | 3 | Méthode | `13689:21454` | 814 |
 * | 4 | Domaines couverts | `13689:21524` | 1973 |
 * | 5 | Secteurs | `13701:23684` | 1374 |
 * | 6 | Nos clients | `13701:23826` | 749 |
 * | 7 | Études de cas | `13701:24725` | 1243 |
 * | 8 | MidCTA | `13701:24190` | 136 |
 * | 9 | Interlocuteurs | `13701:24212` | 999 |
 * | 10 | CTAFinal | `13701:24359` | 550 |
 *
 * **Do not go by its layer names** — three separate sections are called
 * `Domaines`. Read each one's first text nodes instead.
 */
export default async function CabinetPage({
  params,
}: PageProps<"/[locale]/le-cabinet">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Trust />
      <Methode />
      <Domaines />
      <Secteurs />
      <Consultation />
    </>
  );
}
