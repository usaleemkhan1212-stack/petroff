import { Container } from "@/components/ui/Container";

/**
 * Figma `14221:9356` — five deadlines across the container on white, 64 above
 * and below.
 *
 * Its figure is Figma's own "Petroff/Stat" (Poppins Bold 28/1.15), so it takes
 * `text-stat` rather than the `text-h2` the site's other counters use — this
 * frame states 28, and several of those state 40.
 */
const STATS = [
  {
    value: "0",
    label:
      "notice to the debtor before the freeze — the application is ex parte",
    cite: "Art. L. 511-1 CPCE",
  },
  {
    value: "A Few Days",
    label:
      "between instruction and a bailiff freezing the account, in most urgent files",
    cite: "Order + saisie by commissaire de justice",
  },
  {
    value: "8 Days",
    label:
      "after execution to serve the measure on the debtor — never before",
    cite: "Art. R. 523-3 CPCE (bank accounts)",
  },
  {
    value: "1 Month",
    label: "to start proceedings on the merits after the freeze, or it lapses",
    cite: "Art. R. 511-7 CPCE",
  },
  {
    value: "3 Months",
    label: "validity of the judge’s authorisation to carry out the measure",
    cite: "Art. R. 511-6 CPCE",
  },
];

export function LandingStats() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <Container>
        {/*
          Figma lays these out as five `flex-1` columns on a 24px gap. A grid is
          used instead so they reflow 5 -> 3 -> 2 -> 1 rather than being crushed:
          at desktop the tracks are equal, which is what `flex-1` gives there.
        */}
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {STATS.map((stat) => (
            <div key={stat.cite} className="flex min-w-0 flex-col gap-2">
              <dt className="text-stat font-poppins text-encre">
                {stat.value}
              </dt>
              <dd className="text-small text-encre/62">{stat.label}</dd>
              {/* The citation is Small 16 strong in periwinkle — a reference,
                  not an eyebrow, so it takes no tracking and no uppercase. */}
              <dd className="text-small-strong text-periwinkle">{stat.cite}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
