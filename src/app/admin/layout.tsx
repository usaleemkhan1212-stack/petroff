import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import "../globals.css";

/**
 * A **third root layout**, on the same footing as `landing-page`.
 *
 * `[locale]/layout.tsx` wraps every route beneath it in the site's header and
 * footer, which an admin must not have; there is no `app/layout.tsx`, so that
 * file is itself a root layout and a sibling static segment can carry another.
 * A static segment also beats the `[locale]` dynamic segment in routing, so
 * `/admin` resolves here rather than being read as a locale — and `proxy.ts`
 * excludes the path, or next-intl rewrites it to `/fr/admin`, which has no
 * route.
 *
 * No next-intl, no consultation provider, no cookie banner: this is the firm's
 * own tool, not a page of the site.
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
  title: "Petroff Avocats — Content Manager",
  description:
    "Content manager for Petroff.law — enquiries, pages, articles, media and site settings.",
  /* An admin has no business in an index, and this one is reachable. */
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full`}>
      {/*
        `overflow-hidden` because the shell owns its own scrolling: the rail and
        the content column scroll independently and the page itself never does.
      */}
      <body className="font-inter text-encre h-full overflow-hidden bg-white text-[14px]">
        {children}
      </body>
    </html>
  );
}
