import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ConsultationProvider } from "@/components/consultation/ConsultationProvider";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { localeHtmlLang, routing } from "@/i18n/routing";
import "../globals.css";

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Pre-render every locale at build time. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  // hasLocale narrows `string` to the Locale union that next-intl expects.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Site" });

  return {
    title: {
      default: `${t("name")} — ${t("tagline")}`,
      template: `%s — ${t("name")}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required for static rendering — without it every page opts into SSR.
  setRequestLocale(locale);

  return (
    <html
      lang={localeHtmlLang[locale] ?? locale}
      className={`${poppins.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          {/*
            The drawer's state lives here so that every contact button on the
            site can open it, not just the side tabs and the article's sticky
            bar. The panel itself is rendered once by the provider.
          */}
          <ConsultationProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ConsultationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
