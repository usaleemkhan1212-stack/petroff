import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Domaines } from "@/components/sections/expertises/Domaines";
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
      <Domaines />
    </>
  );
}
