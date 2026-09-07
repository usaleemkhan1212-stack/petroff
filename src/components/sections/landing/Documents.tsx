import PhoneIcon from "@/assets/icons/phone.svg";
import { Container } from "@/components/ui/Container";

/**
 * Figma `14221:10193` — the three documents needed to open a file, then a
 * ruled bar closing the section. White, 96 above and below, the 1200 band.
 *
 * The bar is a sibling of the grid inside the band's own 16px gap, so it sits
 * 16 under the cards — not on the 48 the grid takes above itself.
 */
const DOCS = [
  {
    title: "Proof of the debt",
    body: "Contract, invoices, delivery notes, correspondence acknowledging the sum — or the foreign judgment / award with its certificate.",
  },
  {
    title: "Proof of the threat",
    body: "Anything showing recovery is at risk: sale of assets, unanswered reminders, insolvency signals, transfer of business, a debtor who has gone silent.",
  },
  {
    title: "What you know about the assets",
    body: "Bank details from past payments, property addresses, company registration numbers, main customers. We complete the picture from the French public registers.",
  },
];

export function LandingDocuments() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-300 flex-col gap-4">
          <p className="text-overline font-poppins text-brique uppercase">
            What we need from you
          </p>
          <h2 className="text-h2 font-poppins text-encre">
            Three documents are enough to start
          </h2>
          <p className="text-lead text-encre">
            The application stands or falls on the file. Send what you have; we
            reply within 24 hours with what is missing.
          </p>

          <ol className="grid gap-6 pt-12 md:grid-cols-3">
            {DOCS.map((doc, i) => (
              <li
                key={doc.title}
                className="bg-lilas flex flex-col gap-3 rounded-[18px] p-6"
              >
                <span
                  aria-hidden="true"
                  className="bg-lilas-2 text-h3 font-poppins text-periwinkle flex size-11 items-center justify-center rounded-[10px]"
                >
                  {i + 1}
                </span>
                <h3 className="text-h4 font-poppins text-encre">{doc.title}</h3>
                <p className="text-body text-encre/62">{doc.body}</p>
              </li>
            ))}
          </ol>

          <div className="border-stone flex flex-col items-start gap-6 rounded-[24px] border px-9 py-7 lg:flex-row lg:items-center lg:gap-12">
            <p className="text-body text-encre min-w-0 flex-1">
              {/* Figma weights this run but keeps Body 18’s own 1.4 leading, where
                  `text-body-strong` is 1.5 — so it is a weight change only. */}
              <b className="font-semibold">Send what you have.</b>{" "}
              We reply within 24 h with what is missing and whether the
              conditions are met.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#assess"
                className="text-button font-poppins bg-gold rounded-full px-7 py-4 text-white transition-opacity hover:opacity-90"
              >
                Assess my case
              </a>
              <a
                href="tel:+33178904646"
                className="text-small-strong text-encre hover:border-encre/30 flex items-center gap-3 rounded-full border border-black/10 px-5 py-3 transition-colors"
              >
                <PhoneIcon aria-hidden="true" className="size-[17px] shrink-0" />
                <span className="whitespace-nowrap">+33 (0)1 78 90 46 46</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
