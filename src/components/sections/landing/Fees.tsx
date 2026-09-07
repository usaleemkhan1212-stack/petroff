import { Container } from "@/components/ui/Container";
import { LandingBullet } from "./Bullet";

/**
 * Figma `14222:909` — three fee phases on lilas, 96 above and below, the 1200
 * band on a 48px stack gap.
 *
 * The featured card is `#EFCFD9` at 40% under a **3px red** border with the
 * site's `0px 14px 34px` shadow. That pink is the third hex the library calls
 * "Petroff/Pink"; composited at 40% it lands under 3/255 from
 * `--color-pink-soft`, so that token is reused rather than a fourth pink added
 * — the call this file already records twice. Unlike every other card shadow on
 * the build this one is **permanent**: it marks the highlighted plan rather
 * than showing a hover state, exactly as the domain pages' featured forfait
 * does.
 */
const PLANS = [
  {
    key: "assessment",
    badge: null,
    kicker: "Assessment",
    price: "Free",
    unit: "· 15 minutes by video",
    body: "Whether the conditions are met, which assets to target, the realistic timing — and the written quote for the next phase.",
    items: [
      "Reading of the debt file",
      "Review of the threat to recovery",
      "Route: saisie, EAPO or enforcement of your title",
    ],
    featured: true,
  },
  {
    key: "application",
    badge: "Most files",
    kicker: "Application & execution",
    price: "Firm fee",
    unit: "· quoted within 24 h",
    body: "From drafting the request to the bailiff’s report: one fee, known before we start.",
    items: [
      "Request to the juge de l’exécution",
      "Instruction and coordination of the commissaire de justice",
      "Service on banks, registries, third parties",
      "Notification to the debtor and first response",
    ],
    featured: false,
  },
  {
    key: "merits",
    badge: null,
    kicker: "Merits & conversion",
    price: "Per phase",
    unit: "· capped budgets",
    body: "The claim on the merits or the exequatur of your judgment, then conversion of the freeze into payment.",
    items: [
      "Claim before the competent court",
      "Defence of the freeze if the debtor applies to lift it",
      "Conversion into saisie-attribution and payout",
      "Success fee possible by agreement",
    ],
    featured: false,
  },
];

export function LandingFees() {
  return (
    <section className="bg-lilas py-16 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-300 flex-col gap-12">
          <div className="flex flex-col gap-4">
            <p className="text-overline font-poppins text-brique uppercase">
              Transparent fees
            </p>
            <h2 className="text-h2 font-poppins text-encre">
              What a freeze costs
            </h2>
            <p className="text-lead text-encre">
              A firm fee per phase, quoted in writing after the assessment call.
              Bailiff and court costs are invoiced separately at cost — and can
              be claimed back from the debtor.
            </p>
          </div>

          <div className="grid gap-9 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <article
                key={plan.key}
                className={
                  plan.featured
                    ? "bg-pink-soft/40 flex flex-col justify-between gap-9 rounded-[24px] border-[3px] border-[var(--color-red)] p-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)] sm:p-7"
                    : "border-stone flex flex-col justify-between gap-9 rounded-[24px] border bg-white p-5 sm:p-7"
                }
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-start gap-1">
                    {plan.badge ? (
                      <span className="bg-lilas-2 text-overline font-poppins text-periwinkle rounded-full px-3 py-1 uppercase">
                        {plan.badge}
                      </span>
                    ) : null}
                    <p className="text-small-strong text-periwinkle">
                      {plan.kicker}
                    </p>
                    <div className="flex flex-wrap items-baseline gap-2">
                      {/* The featured plan prices in red; the other two encre. */}
                      <p
                        className={`text-price font-poppins ${
                          plan.featured ? "text-red" : "text-encre"
                        }`}
                      >
                        {plan.price}
                      </p>
                      <p className="text-small text-encre/62">{plan.unit}</p>
                    </div>
                  </div>

                  {/* These bodies are full-strength encre, not the encre/62 the
                      card bodies elsewhere on this page use. */}
                  <p className="text-body text-encre">{plan.body}</p>

                  <ul className="flex flex-col gap-2">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        {/* Figma draws the featured card's dots red and the
                            other two gold, both at 8px here. */}
                        <LandingBullet
                          size={8}
                          tone={plan.featured ? "red" : "gold"}
                        />
                        <span className="text-body text-encre min-w-0 flex-1">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.featured ? (
                  <a
                    href="#assess"
                    className="text-button font-poppins bg-encre flex items-center justify-center rounded-full px-7 py-4 text-white transition-opacity hover:opacity-90"
                  >
                    Assess my case
                  </a>
                ) : (
                  <a
                    href="#assess"
                    className="text-button font-poppins border-encre text-encre hover:bg-encre/5 flex items-center justify-center rounded-full border-[1.5px] px-7 py-4 transition-colors"
                  >
                    Assess my case
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="bg-pale-gold rounded-field px-5 py-4">
            <p className="text-body-strong text-encre">Costs recoverable.</p>
            <p className="text-small text-encre">
              The court may order the losing debtor to bear part of your fees
              (Art. 700 CPC) and the costs of enforcement. Never guaranteed —
              always claimed.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
