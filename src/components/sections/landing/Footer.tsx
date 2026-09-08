import { Fragment } from "react";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { isLive } from "@/lib/routes";

/**
 * Figma `14221:10771` — the landing page's own footer, 162 tall against the
 * site's 358.
 *
 * One encre band: the lockup opposite a single legal line, then a rule and the
 * legal links. No columns, no languages row.
 */

/**
 * The four legal pages, in the comp's own order.
 *
 * **Plain anchors, not `MaybeLink`.** That component routes through next-intl's
 * `Link`, which reads a locale this page has none of: `/landing-page` is
 * excluded from the proxy matcher and sits outside `[locale]`. Crossing into a
 * different root layout is a full document load either way, so `Link` would buy
 * nothing even if it resolved. `isLive` is still consulted — it is a plain
 * function over `routes.ts` — so nothing here can point at a 404.
 *
 * The labels are English because the comp writes them so; the pages themselves
 * are French. Worth raising with the firm.
 */
const LEGAL = [
  { label: "Legal notice", href: "/mentions-legales" },
  { label: "Privacy", href: "/confidentialite" },
  { label: "Cookies", href: "/cookies" },
  { label: "Consumer mediator", href: "/mediateur-consommation" },
];

export function LandingFooter() {
  return (
    <footer className="bg-encre py-9">
      <Container>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <Logo tone="onDark" />
            <p className="text-small text-white/70">
              PETROFF AVOCATS · 182 rue de Rivoli, 75001 Paris · RCS Paris
              814433470 · Toque #C2396 · © 2026
            </p>
          </div>

          <div className="flex justify-end border-t border-white/15 pt-4">
            <p className="text-small text-white/70">
              {LEGAL.map((item, i) => (
                <Fragment key={item.href}>
                  {i > 0 ? " · " : null}
                  {isLive(item.href) ? (
                    <a
                      href={item.href}
                      className="transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </Fragment>
              ))}
              {/*
                Not a link: « Manage Cookies » is the consent panel, which the
                site opens through `CookieConsent`'s delegated
                `data-cookie-preferences` hook — and this page's root layout
                deliberately mounts no cookie banner. It stays plain text until
                that is decided; see the notes.
              */}
              <span className="text-rose"> · Manage Cookies</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
