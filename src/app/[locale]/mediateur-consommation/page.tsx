import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Body } from "@/components/sections/mediateur/Body";
import { Hero } from "@/components/sections/mediateur/Hero";
import { routing } from "@/i18n/routing";

/**
 * The consumer-mediation notice (Figma `13833:379`) — the site's third pure
 * legal document and the third page reached from the footer's legal line.
 *
 * **Do not go by the frame's name.** It reads "Petroff.law — Politique de
 * confidentialité" because the designer duplicated that frame; its own hero
 * says *Médiateur de la consommation*, which is what this is.
 *
 * It is the privacy and cookie policies' shape — a hero over a two-column
 * document, seven sections in a 765 column beside a 384 table of contents —
 * and it differs from both in five places: the sections pad themselves 28
 * either side of their own rule, its `dl` is a 210 label on a 16 gap in Inter
 * 16, its callout is 20/16 with a 16px title, it adds a ruled procedure list,
 * and every address in it is a real link. So its components are its own.
 *
 * The frame's own total is 3739, with the footer at y=3380.
 */
export default async function MediateurPage({
  params,
}: PageProps<"/[locale]/mediateur-consommation">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Body />
    </>
  );
}
