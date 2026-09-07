import PhoneIcon from "@/assets/icons/phone.svg";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

/**
 * Figma `14221:8803` — the landing page's own header.
 *
 * **It carries no navigation at all**: logo, one encre CTA and the phone
 * pill, in the site's usual 72px row on a 1245 container. That is the whole
 * difference from `sections/Header.tsx`, and it is why this page lives outside
 * `[locale]` with its own root layout rather than borrowing the site's chrome.
 */
export function LandingHeader() {
  return (
    <header className="border-encre/8 bg-lilas/20 relative z-30 border-b">
      <Container>
        {/* Figma specifies desktop only. Below `sm` the logo plus the two
            pills need 486 against a 335 content box, so both the row and the
            pill cluster wrap. The padding is dropped from `sm` because Figma’s
            row is a fixed 72 and the phone pill is 49.2 — 12 of padding either
            side takes it to 73.2 and the header renders 74 against the comp’s
            72. `min-h-18` holds the 72 without capping the wrapped case. */}
        <div className="flex min-h-18 flex-wrap items-center justify-between gap-3 py-3 sm:py-0">
          <Logo />

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="#assess"
              className="text-button font-poppins bg-encre rounded-full px-5 py-3 text-white transition-opacity hover:opacity-90"
            >
              Assess my case
            </a>
            {/* Figma borders this one `rgba(0,0,0,0.1)`, not the encre/8 the
                site header uses — a landing-page difference, kept. */}
            <a
              href="tel:+33178904646"
              className="text-small-strong text-encre hover:border-encre/30 flex items-center gap-3 rounded-full border border-black/10 px-5 py-3 transition-colors"
            >
              <PhoneIcon aria-hidden="true" className="size-[17px] shrink-0" />
              <span className="whitespace-nowrap">+33 (0)1 78 90 46 46</span>
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
