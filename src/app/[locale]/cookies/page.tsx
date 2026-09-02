import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Body } from "@/components/sections/cookies/Body";
import { Hero } from "@/components/sections/cookies/Hero";
import { routing } from "@/i18n/routing";

/**
 * The cookie policy (Figma `13872:881`, "Petroff.law — Politique cookies") —
 * the site's second pure legal document and the second page reached from the
 * footer, whose legal line now lists *Cookies* beside *Confidentialité*.
 *
 * Its shape is the privacy policy's: a hero over a two-column document, eight
 * sections in a 765 column beside a 384 table of contents. It differs from it
 * in six places — no closing rule under the hero, a 28px section gap rather
 * than 48, a 28px pad under each section rule, a Poppins rather than Inter
 * weighted run, a gold-edged rounded callout, and a cookie table this document
 * adds — so its components are its own rather than shared.
 *
 * The frame's own total is 3954, with the footer at y=3595.
 */
export default async function CookiesPage({ params }: PageProps<"/[locale]/cookies">) {
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
