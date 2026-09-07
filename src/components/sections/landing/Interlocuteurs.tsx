import Image from "next/image";
import type { StaticImageData } from "next/image";

import cochetPhoto from "@/assets/images/landing-cochet-card.jpg";
import marielaPhoto from "@/assets/images/landing-mariela-card.jpg";
import { Container } from "@/components/ui/Container";

/**
 * Figma `14221:10332` — three lawyer cards on white, 96 above and below, in the
 * container's own 1245 rather than the 1200 band the middle sections use.
 *
 * **Cards two and three are identical in the comp** — same name, same role,
 * same pills, same note, same photograph. That is a duplicated-frame leftover
 * of the kind this build has hit repeatedly; it is reproduced as drawn and
 * flagged rather than invented around.
 */
type Lawyer = {
  key: string;
  photo: StaticImageData;
  name: string;
  role: string;
  tags: string[];
  languages: string;
  note: string;
  /** Figma fills the first card's CTA and outlines the other two. */
  primary: boolean;
  /**
   * The "Partner Lawyer" badge sits on cards 2 and 3 only — Mariela is the
   * firm's own partner, the other two are partner lawyers of the network, which
   * is exactly what the section's lead describes.
   */
  partner: boolean;
};

const LAWYERS: Lawyer[] = [
  {
    key: "petrova",
    photo: marielaPhoto,
    name: "Mᵉ Mariela Petrova",
    role: "Partner · Paris Bar since 2004 — Toque C2396 · Sofia Bar (European lawyer)",
    tags: [
      "Enforcement & protective measures",
      "Commercial litigation",
      "Cross-border recovery",
    ],
    languages: "FR · EN · BG — 15+ years in French and EU business law",
    note: "the application, its execution by the bailiff, defence of the measure if contested, and the merits that follow.",
    primary: true,
    partner: false,
  },
  {
    key: "cochet",
    photo: cochetPhoto,
    name: "Mᵉ Mathieu Cochet",
    role: "Financial law & litigation · Barreau de Grasse",
    tags: ["Banking & financial disputes", "Asset tracing", "Fraud recovery"],
    languages: "FR · EN",
    note: "freezes involving banks and financial intermediaries, tracing of transferred funds, recovery after fraud.",
    primary: false,
    partner: true,
  },
  {
    key: "cochet-2",
    photo: cochetPhoto,
    name: "Mᵉ Mathieu Cochet",
    role: "Financial law & litigation · Barreau de Grasse",
    tags: ["Banking & financial disputes", "Asset tracing", "Fraud recovery"],
    languages: "FR · EN",
    note: "freezes involving banks and financial intermediaries, tracing of transferred funds, recovery after fraud.",
    primary: false,
    partner: true,
  },
];

export function LandingInterlocuteurs() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        {/* The head is written out: Figma spaces it with explicit 10 / 14 / 44
            spacer frames rather than one gap. */}
        <p className="text-overline font-poppins text-brique uppercase">
          Our lawyers
        </p>
        <h2 className="text-h2 font-poppins text-encre mt-2.5">
          Who handles freeze files at the firm
        </h2>
        <p className="text-lead text-encre/62 mt-3.5">
          The lawyer who takes your call runs the file. Where the debtor’s
          assets or the dispute call for it, a partner lawyer of the network
          joins — same team, one point of contact.
        </p>

        <div className="mt-11 flex flex-col gap-12">
          {/*
            Figma marks the row `items-start` and gives no card `self-stretch`,
            so the three keep their own heights — measured 771 / 675 / 675 in
            the comp’s own render. A stretched grid levelled all three, which
            is the opposite of what it draws.
          */}
          <div className="grid items-start gap-12 lg:grid-cols-3">
            {LAWYERS.map((lawyer) => (
              <article
                key={lawyer.key}
                /*
                  The `0px 14px 34px` shadow Figma draws on the first card is the
                  **hover state**, not a permanent lift — the site-wide rule, and
                  the test it rests on holds here: two siblings in the same grid
                  lack it. All three lift on hover; none is raised at rest.

                  The 1px rule is an inset shadow rather than a border, and that
                  is load-bearing: Figma draws its border inside the 383 card, so
                  the content box is 311. A real `border` sits outside the padding
                  box and leaves 309, which knocks every child 2px narrow.
                */
                className={`flex flex-col items-center overflow-hidden rounded-tl-[48px] rounded-tr-[18px] rounded-br-[36px] rounded-bl-[18px] bg-white p-6 shadow-[inset_0_0_0_1px_rgba(18,42,76,0.08)] transition-shadow hover:shadow-[inset_0_0_0_1px_rgba(18,42,76,0.08),0px_14px_34px_0px_rgba(0,0,0,0.1)] sm:rounded-tl-[80px] sm:rounded-br-[60px] sm:p-9 ${
                  lawyer.primary ? "gap-6" : "gap-9"
                }`}
              >
                {/*
                  Figma gives card 1's photo x=36 w=311 — the content width — and
                  cards 2 and 3 x=17 w=349, i.e. 19px wider than the content box
                  on each side, bleeding into the 36px padding. That is a real
                  per-card difference in the comp, not a stale width: the render
                  shows those two photos reaching within 17px of the card edge.
                */}
                <div
                  className={`relative w-full ${
                    lawyer.primary ? "" : "sm:w-[calc(100%+38px)]"
                  }`}
                >
                  <div className="relative h-[200px] w-full overflow-hidden rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px]">
                    <Image
                      src={lawyer.photo}
                      alt={lawyer.name}
                      sizes="(min-width: 1024px) 349px, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/*
                    Figma places the badge at card x=17.5, y=220 — flush with the
                    photo's own left edge, overlapping its last 16px and hanging
                    15 below. It lives OUTSIDE the photo's `overflow-hidden`,
                    which would otherwise crop the overhang, and being absolute
                    it adds no height: the body still starts on the card's 36 gap.
                  */}
                  {lawyer.partner ? (
                    <span className="bg-pale-periwinkle text-small-strong text-encre absolute -bottom-[15px] left-0 rounded-full px-3 py-1 whitespace-nowrap">
                      Partner Lawyer
                    </span>
                  ) : null}
                </div>

                <div className="flex w-full flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-h3 font-poppins text-encre">
                      {lawyer.name}
                    </h3>
                    {/* 263 in a 311 content box — Figma’s own measure, and what puts
                        card 1’s role on three lines rather than two. */}
                    <p className="text-small text-encre/62 max-w-[263px]">
                      {lawyer.role}
                    </p>
                  </div>

                  {/* Labels, not controls, so plain list items rather than
                      `Chip` — which renders a button. */}
                  <ul className="flex flex-wrap gap-x-2 gap-y-0">
                    {lawyer.tags.map((tag) => (
                      <li
                        key={tag}
                        className="bg-lilas text-small-strong text-encre/62 rounded-full px-3 py-1"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <p className="text-small text-encre/62">
                    {lawyer.languages}
                  </p>

                  {/* Figma: nt frame 311, text at x=16 w=295 — the 3px rule is
                      drawn within that inset, not added to it. As a border
                      it would take 3px of layout and leave the text 292. */}
                  <div className="pl-4 shadow-[inset_3px_0_0_0_var(--color-red)]">
                    <p className="text-body text-encre">
                      <b className="font-semibold">On this page:</b>{" "}
                      {lawyer.note}
                    </p>
                  </div>

                  <a
                    href="#assess"
                    className={
                      lawyer.primary
                        ? "text-button font-poppins bg-encre self-start rounded-full px-7 py-4 text-white transition-opacity hover:opacity-90"
                        : "text-button font-poppins border-encre text-encre hover:bg-encre/5 self-start rounded-full border-[1.5px] px-7 py-4 transition-colors"
                    }
                  >
                    Consult
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="text-small text-encre/62">
            Commissaires de justice (bailiffs), a notary for real-estate charges
            and correspondent lawyers across the EU are instructed and
            coordinated by the firm; you keep one interlocutor.
          </p>
        </div>
      </Container>
    </section>
  );
}
