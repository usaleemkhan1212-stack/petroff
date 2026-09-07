"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";

/**
 * Figma `14221:10081` — "From your first call to frozen assets": a 450 card
 * carrying a two-door control beside six numbered steps, on white with 96 above
 * and below. Its band is 1200, like IsThisYou above it, and the row is
 * 450 + 48 + the rest.
 *
 * **The two doors are a real control**, not a picture of one. Figma draws door
 * one selected — white on a lilas track with an `0px 8px 11px` lift — and a
 * toggle that cannot be toggled is worse than none, which is the call this
 * build already made for the e-commerce "Deux portes" and the article's triage.
 */
const ROWS = [
  { key: "route", label: "Your route" },
  { key: "first", label: "First step" },
  { key: "basis", label: "Legal basis" },
  { key: "timing", label: "Typical timing" },
  { key: "then", label: "Then" },
] as const;

/**
 * Door one is Figma's own, verbatim. **Door two is not in the comp** — the
 * frame supplies no second state, so its five values are composed strictly from
 * what this page already states elsewhere: the IsThisYou card ("a UK, US or EU
 * judgment, or an arbitral award, lets you freeze without asking the judge
 * first (Art. L. 511-2). Exequatur follows for the sale."), step 3 ("if you
 * hold an enforceable title or a qualifying instrument, this step is skipped")
 * and the 1-month deadline in Stats. No new figures or legal claims.
 * **These five strings need the firm's sign-off**, like the drafted FAQ answers.
 */
const DOORS = [
  {
    key: "notYet",
    title: "Not yet",
    sub: "Invoices, contract, correspondence",
    values: {
      route: "Authorisation, then execution",
      first: "Ex parte request to the juge de l’exécution",
      basis: "Art. L. 511-1 CPCE",
      timing: "Days to the order, then the bailiff",
      then: "Claim on the merits within 1 month",
    },
  },
  {
    key: "yes",
    title: "Yes",
    sub: "Foreign judgment, award, French judgment",
    values: {
      route: "Straight to execution",
      first: "Instruct the commissaire de justice",
      basis: "Art. L. 511-2 CPCE",
      timing: "Days to the freeze, no prior application",
      then: "Exequatur, then conversion into a seizure",
    },
  },
] as const;

const STEPS = [
  {
    kicker: "Day 0",
    title: "Fifteen-minute assessment",
    body: "Debt, evidence, debtor, assets, urgency. You leave the call knowing whether the conditions of Art. L. 511-1 are met and what the fee will be.",
  },
  {
    kicker: "Day 0–1",
    title: "Evidence assembled, assets located",
    body: "Contract, invoices, correspondence, foreign judgment or award. We identify banks, real estate, shareholdings and receivables to attach — and in what order.",
  },
  {
    kicker: "Day 1–3",
    title: "Application to the juge de l’exécution",
    body: "Ex parte request on the merits of your claim and the threat to recovery. If you hold an enforceable title or a qualifying instrument, this step is skipped (Art. L. 511-2).",
  },
  {
    kicker: "On the order",
    title: "The bailiff freezes",
    body: "A commissaire de justice serves the bank, the company or the land registry. Accounts are blocked up to the amount authorised; shares are pledged; property is charged with a provisional judicial mortgage.",
  },
  {
    kicker: "Within 8 days",
    title: "The debtor is notified — after the fact",
    body: "The measure is served on the debtor once executed. They may apply to lift it; the burden of showing the conditions were not met is theirs to argue.",
  },
  {
    kicker: "Within 1 month",
    title: "Proceedings on the merits — or enforcement",
    body: "We issue the claim before the competent court (or launch exequatur of your judgment). Once you hold an enforceable title, the freeze converts into a seizure and the funds are paid out.",
  },
];

export function LandingHowItWorks() {
  const [door, setDoor] = useState<(typeof DOORS)[number]["key"]>("notYet");
  const chosen = DOORS.find((d) => d.key === door) ?? DOORS[0];

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-300 flex-col gap-4">
          <p className="text-overline font-poppins text-brique uppercase">
            What happens next
          </p>
          <h2 className="text-h2 font-poppins text-encre">
            From your first call to frozen assets
          </h2>
          <p className="text-lead text-encre max-w-[754px]">
            Pick your starting point — the route, the timing and the first step
            change with it.
          </p>

          <div className="flex flex-col gap-12 pt-12 xl:flex-row xl:items-start">
            {/* The two-door card — 450 at xl. */}
            {/* Sticky from xl: 840 of card against ~1250 of steps, so it rides the
                list rather than leaving a column of dead space. `self-start` is
                what makes that possible — a stretched item has nothing to
                stick within. */}
            <div className="border-stone flex w-full flex-col gap-4 rounded-[24px] border bg-white p-6 sm:p-9 xl:sticky xl:top-6 xl:w-112.5 xl:shrink-0 xl:self-start">
              <p className="text-overline font-poppins text-brique uppercase">
                Two doors
              </p>
              <p className="text-h3 font-poppins text-encre">
                Do you already hold a judgment or award?
              </p>

              {/*
                Buttons with `aria-pressed` rather than a radiogroup: one panel
                is driven, not one per option — the call the Bibliotheque's
                filter tabs and the article's triage both make.
              */}
              {/* Stacked below `sm`: side by side each door is 131 wide against 140 of
                  content, so the labels clip. */}
              <div className="bg-lilas flex flex-col gap-2 rounded-[16px] p-2 sm:flex-row">
                {DOORS.map((option) => {
                  const active = option.key === door;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setDoor(option.key)}
                      className={`flex min-w-0 flex-1 cursor-pointer flex-col gap-1 rounded-[12px] px-4 py-3 text-left transition-shadow ${
                        active
                          ? "bg-white drop-shadow-[0px_8px_11px_rgba(18,41,77,0.1)]"
                          : ""
                      }`}
                    >
                      <span className="text-small-strong text-encre">
                        {option.title}
                      </span>
                      <span className="text-small text-encre/62">
                        {option.sub}
                      </span>
                    </button>
                  );
                })}
              </div>

              <dl aria-live="polite" className="flex flex-col">
                {ROWS.map((row, i) => (
                  <div
                    key={row.key}
                    className={`flex flex-col gap-1 py-3 ${
                      i > 0 ? "border-stone border-t border-dashed" : ""
                    }`}
                  >
                    <dt className="text-small text-encre/62">{row.label}</dt>
                    <dd className="text-body-strong text-encre">
                      {chosen.values[row.key]}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="#assess"
                className="text-button font-poppins bg-gold flex items-center justify-center rounded-full px-7 py-4 text-white transition-opacity hover:opacity-90"
              >
                Assess my case
              </a>
              <p className="text-small text-encre/62 text-center">
                Or call{" "}
                <a
                  href="tel:+33178904646"
                  className="text-small-strong text-encre hover:underline"
                >
                  +33 1 78 90 46 46
                </a>
              </p>
            </div>

            {/* Six steps on lilas, against the section's white. */}
            <ol className="flex min-w-0 flex-1 flex-col gap-4">
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="bg-lilas flex items-start gap-4 rounded-[18px] p-6"
                >
                  {/* The numeral is decorative — the <ol> conveys the order. */}
                  <span
                    aria-hidden="true"
                    className="bg-lilas-2 text-h3 font-poppins text-periwinkle flex size-11 shrink-0 items-center justify-center rounded-[10px]"
                  >
                    {i + 1}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="text-small-strong text-periwinkle">
                      {step.kicker}
                    </p>
                    <h3 className="text-h4 font-poppins text-encre">
                      {step.title}
                    </h3>
                    <p className="text-body text-encre/62">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
