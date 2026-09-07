import { Container } from "@/components/ui/Container";

/**
 * Figma `14221:10162` — the asset classes, on lilas with 96 above and below.
 * Four white cards over a wide encre panel; the 1200 band again.
 *
 * Its second row is 1:2 — a 392 card beside a 784 panel on a 24px gap — and the
 * panel carries a **120px bottom-left corner** where its other three are 24.
 */
const CARDS = [
  {
    kicker: "Saisie conservatoire de créances",
    title: "Bank accounts and receivables",
    body: "The bank must declare balances and block them up to the amount authorised. Sums owed to the debtor by its own customers can be attached the same way.",
  },
  {
    kicker: "Saisie conservatoire de biens meubles",
    title: "Stock, vehicles, equipment",
    body: "Inventoried by the bailiff and rendered unavailable — the debtor keeps custody but cannot sell.",
  },
  {
    kicker: "Nantissement judiciaire",
    title: "Shares and securities",
    body: "A judicial pledge over the debtor’s shareholdings, registered with the company: no transfer, no dilution behind your back.",
  },
];

export function LandingWhatFrozen() {
  return (
    <section className="bg-lilas py-16 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-300 flex-col gap-4">
          <p className="text-overline font-poppins text-brique uppercase">
            What can be frozen
          </p>
          <h2 className="text-h2 font-poppins text-encre">
            Every asset class French law allows
          </h2>
          <p className="text-lead text-encre max-w-[925px]">
            The measure is chosen by asset. We target the ones that hurt the
            debtor most and cost you least.
          </p>

          <div className="flex flex-col gap-6 pt-12">
            <div className="grid gap-6 md:grid-cols-3">
              {CARDS.map((card) => (
                <article
                  key={card.title}
                  className="flex flex-col gap-3 rounded-[24px] bg-white p-6 sm:p-9"
                >
                  <p className="text-small-strong text-periwinkle">
                    {card.kicker}
                  </p>
                  <h3 className="text-h3 font-poppins text-encre">
                    {card.title}
                  </h3>
                  <p className="text-body text-encre/62">{card.body}</p>
                </article>
              ))}
            </div>

            {/* Figma's `flex-1` beside `flex-2`, i.e. a 1:2 split of the row. */}
            <div className="grid gap-6 lg:grid-cols-3">
              <article className="flex flex-col gap-3 rounded-[24px] bg-white p-6 sm:p-9">
                <p className="text-small-strong text-periwinkle">
                  Hypothèque judiciaire provisoire
                </p>
                <h3 className="text-h3 font-poppins text-encre">Real estate</h3>
                <p className="text-body text-encre/62">
                  A provisional judicial mortgage registered at the land
                  registry. The property can no longer be sold free of your
                  claim.
                </p>
              </article>

              <article className="bg-encre flex flex-col items-start gap-3 rounded-tl-[24px] rounded-tr-[24px] rounded-br-[24px] rounded-bl-[60px] p-6 pb-12 sm:rounded-bl-[120px] sm:pt-9 sm:pr-9 sm:pb-16 sm:pl-12 lg:col-span-2">
                {/* Its kicker is pale gold on encre, where the white cards'
                    are periwinkle — the panel's own inverse palette. */}
                <p className="text-small-strong text-pale-gold">Cross-border</p>
                <h3 className="text-h3 font-poppins text-white">
                  Debtor with accounts in several EU countries?
                </h3>
                <p className="text-body max-w-[560px] text-white/70">
                  The European Account Preservation Order (Reg. EU 655/2014)
                  freezes bank accounts across member states in one procedure.
                  We advise which route — French saisie or EAPO — reaches the
                  money faster in your case.
                </p>
                <a
                  href="#assess"
                  className="text-button font-poppins bg-gold rounded-full px-7 py-4 text-white transition-opacity hover:opacity-90"
                >
                  Assess my case
                </a>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
