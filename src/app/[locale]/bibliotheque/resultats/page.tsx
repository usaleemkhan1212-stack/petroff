import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Consultation } from "@/components/consultation/Consultation";
import { CTAFinal } from "@/components/sections/resultats/CTAFinal";
import { Hero } from "@/components/sections/resultats/Hero";
import { ParCategorie } from "@/components/sections/resultats/ParCategorie";
import { Parcours } from "@/components/sections/resultats/Parcours";
import { Resultats } from "@/components/sections/resultats/Resultats";
import { Transparence } from "@/components/sections/resultats/Transparence";
import { Vitrine } from "@/components/sections/resultats/Vitrine";
import { Vivante } from "@/components/sections/resultats/Vivante";
import { routing } from "@/i18n/routing";

/**
 * Page 18 — Bibliothèque: résultats (`13063:881`).
 *
 * The `/bibliotheque` page in its **filtered** state, which the designer drew
 * as a frame of its own. Seven of its eight sections are that page's, node for
 * node and height for height; only **Résultats** differs — it opens on a
 * chosen category, gains a result count and a reset, and grows 860 -> 890.
 *
 * Its components are their own copies under `sections/resultats/` so an edit
 * here never reaches the hub, and its copy is not duplicated: only the four
 * contents and the status row live in `ResultatsPage`, everything else reads
 * the existing `BibliothequePage` namespace.
 */
export default async function ResultatsPage({
  params,
}: PageProps<"/[locale]/bibliotheque/resultats">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Vitrine />
      <Resultats />
      <ParCategorie />
      <Parcours />
      <Vivante />
      <Transparence />
      <CTAFinal />
      <Consultation />
    </>
  );
}
