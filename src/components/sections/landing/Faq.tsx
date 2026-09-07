import { Container } from "@/components/ui/Container";

/**
 * Figma `14221:10537` — a 360 copy column beside the accordion, on lilas with
 * 96 above and below and the 1200 band on a 64px gap.
 *
 * Native `<details>` sharing a `name`, so the group is exclusive and the
 * section stays a server component — no JavaScript. `.details-panel` gives the
 * slide, and honours `prefers-reduced-motion`.
 *
 * **Only the first answer is Figma's.** The other seven were composed strictly
 * from what this page already states — the ex parte rule and the 8-day service
 * in Stats, Art. L. 511-2 and the two-door card, the six steps, the fee phases
 * and the Art. 700 note, and the EAPO panel in WhatFrozen. No new figures or
 * legal claims. **They need the firm's sign-off before launch**, like the
 * other drafted answers on this build.
 */
const QUESTIONS = [
  {
    q: "Do I need a French judgment before I can freeze anything?",
    a: "No. Under Art. L. 511-1 of the Code des procédures civiles d’exécution, any creditor whose claim appears well-founded in principle and who can show circumstances threatening recovery may ask the juge de l’exécution for authorisation. The judge decides on the papers, without hearing the debtor.",
  },
  {
    q: "I already have a judgment from the UK / US, or an arbitral award. Does that help?",
    a: "Yes — it changes the route. A foreign judgment or an arbitral award lets you proceed without first asking the judge for authorisation (Art. L. 511-2), so the file goes straight to execution by the commissaire de justice. Exequatur then follows for the sale of the assets.",
  },
  {
    q: "Will the debtor know before the freeze?",
    a: "No. The application is made ex parte: there is no notice to the debtor before the measure. The freeze is served on them only once the bailiff has acted, within 8 days of execution for bank accounts (Art. R. 523-3 CPCE).",
  },
  {
    q: "How fast can it be done?",
    a: "In the most urgent files, a few days between instruction and a bailiff freezing the account. The assessment takes fifteen minutes, evidence and assets are assembled within a day, and the application reaches the juge de l’exécution in the first days.",
  },
  {
    q: "What happens after the freeze?",
    a: "You have one month from execution to start proceedings on the merits, or the measure lapses (Art. R. 511-7 CPCE). We issue the claim before the competent court — or launch exequatur of your judgment. Once you hold an enforceable title, the freeze converts into a seizure and the funds are paid out.",
  },
  {
    q: "Can the debtor have the freeze lifted?",
    a: "They may apply to the juge de l’exécution to lift it, and the burden of showing that the conditions were not met is theirs to argue. Defending the measure if it is contested is part of the application and execution phase.",
  },
  {
    q: "What does it cost, and can I recover it?",
    a: "The assessment is free. After it you receive a firm fee in writing for the application and its execution, then capped budgets per phase for the merits and the conversion. Bailiff and court costs are invoiced separately at cost, and the court may order the losing debtor to bear part of your fees (Art. 700 CPC) and the costs of enforcement — never guaranteed, always claimed.",
  },
  {
    q: "The debtor’s accounts are in Germany or Spain, not France.",
    a: "The European Account Preservation Order (Reg. EU 655/2014) freezes bank accounts across member states in a single procedure. We advise which route — a French saisie conservatoire or an EAPO — reaches the money faster in your case.",
  },
];

export function LandingFaq() {
  return (
    <section className="bg-lilas py-16 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-300 flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex w-full flex-col items-start gap-4 lg:sticky lg:top-6 lg:w-90 lg:shrink-0 lg:self-start">
            <p className="text-overline font-poppins text-brique uppercase">
              Questions creditors ask first
            </p>
            <h2 className="text-h2 font-poppins text-encre">
              Freezing assets in France — the essentials
            </h2>
            <p className="text-body text-encre/62">
              Still unsure whether your file qualifies? The assessment call
              answers it in fifteen minutes.
            </p>
            <a
              href="#assess"
              className="text-button font-poppins bg-gold rounded-full px-7 py-4 text-white transition-opacity hover:opacity-90"
            >
              Assess my case
            </a>
            <p className="text-small text-encre/62">
              Or call{" "}
              <a
                href="tel:+33178904646"
                className="text-small-strong text-encre hover:underline"
              >
                +33 1 78 90 46 46
              </a>
            </p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {QUESTIONS.map((item, i) => (
              <details
                key={item.q}
                name="landing-faq"
                open={i === 0}
                className="details-panel group rounded-[14px] border border-black/7 bg-white px-6 py-4"
              >
                <summary className="flex cursor-pointer list-none items-start gap-4">
                  <span className="text-body-strong text-encre min-w-0 flex-1">
                    {item.q}
                  </span>
                  {/*
                    Figma types two glyphs, a closed triangle and an open one.
                    One rotated triangle is used instead so the marker turns
                    with the panel rather than snapping — the site's own
                    treatment. Read `rotate`, not `transform`: Tailwind v4
                    rotates via the standalone property.
                  */}
                  <span
                    aria-hidden="true"
                    className="text-small text-encre/62 shrink-0 transition-transform group-open:rotate-90"
                  >
                    ▸
                  </span>
                </summary>
                {/*
                  `details-panel` sits on the <details> itself, not here: it
                  styles `::details-content`, which is the box wrapping
                  everything after the summary. On a child it silently does
                  nothing and the panel snaps open.

                  The answer is capped at the site's reading measure. Figma runs
                  it the full 776 of the column, ~95 characters a line — the same
                  call every other standalone FAQ on this build makes, and a
                  deliberate departure from the comp.
                */}
                <p className="text-body text-encre max-w-160 pt-2">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
