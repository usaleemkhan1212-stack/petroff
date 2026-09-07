import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";

/**
 * A **second root layout**, and the reason this page can have its own chrome.
 *
 * `[locale]/layout.tsx` renders the site's Header and Footer around every route
 * beneath it, so a page needing different chrome cannot live under it. There is
 * no `app/layout.tsx`, so that file is itself a root layout — which leaves
 * `app/landing-page/` free to be a second one. A static segment also beats the
 * `[locale]` dynamic segment in routing, so `/landing-page` resolves here
 * rather than being read as a locale.
 *
 * The page is standalone by design, asked for: no next-intl, no shared
 * consultation provider, no cookie banner. Its copy is English and lives beside
 * its components.
 */
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

export const metadata: Metadata = {
  title: "Freeze a debtor's assets in France — Petroff Avocats",
  description:
    "French law lets a creditor freeze a debtor's bank accounts, stock, shares and property before any judgment. Paris Bar lawyers, first assessment free.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full`}>
      {/*
        `bg-white` is load-bearing, and it is what the header's ground depends
        on. globals.css paints `body` lilas for the site; this page's frame is
        white, and the header is only `rgba(246,245,242,0.2)` — 20% of a near
        lilas. Over white that composites to rgb(253,253,252), which is what
        Figma renders (252,252,252); over the site's lilas it composites to
        rgb(246,245,241) and the band reads far warmer and darker than the comp.
        Every section paints its own ground, so this shows only behind the
        header.
      */}
      <body className="flex min-h-full flex-col bg-white">{children}</body>
    </html>
  );
}
