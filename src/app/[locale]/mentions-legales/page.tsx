import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Body } from "@/components/sections/mentions/Body";
import { Hero } from "@/components/sections/mentions/Hero";
import { routing } from "@/i18n/routing";

/**
 * Mentions légales & Conditions d'utilisation (Figma `13852:881`) — the site's
 * fourth pure legal document, and the one that completes the footer's legal
 * line: every item in it but « Gérer les cookies » is now a real page.
 *
 * Its shape is the cookie policy's — a hero over a two-column document, with
 * each section opening on a `stone` rule carrying 28 beneath it — and it
 * differs in three places: its hero is 433 rather than 361 because the title
 * runs to two lines, it rules its **first** section too, and it adds a second
 * callout tone (pink at 40% under a red edge). So its components are its own.
 *
 * It is also the most interlinked page on the site: it points at all three of
 * its sibling legal pages by name.
 *
 * The frame's own total is 6364, with the footer at y=6005.
 */
export default async function MentionsPage({
  params,
}: PageProps<"/[locale]/mentions-legales">) {
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
