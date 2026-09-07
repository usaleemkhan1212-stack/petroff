import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

/**
 * Figma `14221:10771` — the landing page's own footer, 162 tall against the
 * site's 358.
 *
 * One encre band: the lockup opposite a single legal line, then a rule and the
 * legal links. No columns, no languages row.
 */
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
              Legal notice · Privacy · Cookies · Consumer mediator{" "}
              <span className="text-rose">· Manage Cookies</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
