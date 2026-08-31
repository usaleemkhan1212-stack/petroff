import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Body } from "@/components/sections/confidentialite/Body";
import { Hero } from "@/components/sections/confidentialite/Hero";
import { routing } from "@/i18n/routing";

/**
 * The privacy policy (Figma `13547:1042`, "Petroff.law — Politique de
 * confidentialité"). Reached from the footer's legal line, which already
 * listed *Confidentialité* as plain text.
 *
 * Its shape is a hero over a full-width rule, then a two-column legal
 * document: eighteen sections in a 765 column beside a 384 table of contents
 * (765 + 384 is 1149 inside the 1245 container, the familiar `justify-between`
 * 96). Built one pass at a time, so this list grows as each lands.
 *
 * The frame's own total is ~11836 with the footer at y=11477.
 */
export default async function ConfidentialitePage({
  params,
}: PageProps<"/[locale]/confidentialite">) {
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
