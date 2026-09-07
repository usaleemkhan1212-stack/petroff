import Image from "next/image";

import Hourglass from "@/assets/icons/hourglass.svg";
import counselPhoto from "@/assets/images/landing-counsel-terrace.jpg";
import { Container } from "@/components/ui/Container";
import { LandingBullet } from "./Bullet";

/**
 * Figma `14221:9378` — six qualifying situations beside a photo and a CTA
 * panel, on lilas with 96 above and below.
 *
 * Its band is **1200, not the container's 1245**, so it is `mx-auto max-w-300`
 * inside the normal `Container` rather than a second width system — the same
 * treatment the Bibliotheque Resultats band gets. The row is 690 + 450, which
 * `justify-between` spaces by exactly 60.
 */
const SITUATIONS = [
  {
    title: "Your French customer has stopped paying and is selling assets",
    body: "Stock being cleared, a property listed, a subsidiary transferred: circumstances threatening recovery are exactly what the law requires.",
  },
  {
    title: "You hold a foreign judgment and the debtor ignores it",
    body: "A UK, US or EU judgment, or an arbitral award, lets you freeze without asking the judge first (Art. L. 511-2). Exequatur follows for the sale.",
  },
  {
    title: "You were defrauded and the money went to a French account",
    body: "Speed decides everything. A saisie conservatoire on the account blocks the funds while the criminal complaint and civil claim are prepared.",
  },
  {
    title: "A French distributor or agent terminated and owes you",
    body: "Unpaid invoices, retained stock, commissions: freeze the receivables their own customers owe them.",
  },
  {
    title: "The debtor is a French company heading for insolvency",
    body: "Act before the opening judgment. A freeze executed before proceedings open gives you a position an unsecured creditor does not have.",
  },
  {
    title: "A shareholder or director is stripping the company",
    body: "Shares, dividends and director’s accounts can be attached; a judicial pledge over shares stops a transfer.",
  },
];

export function LandingIsThisYou() {
  return (
    <section className="bg-lilas py-16 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-300 flex-col items-start gap-12 xl:flex-row xl:justify-between xl:gap-0">
          {/* Copy column — 690 at xl. */}
          <div className="flex w-full flex-col gap-4 xl:w-172.5">
            <p className="text-overline font-poppins text-brique uppercase">
              Is this you?
            </p>
            <h2 className="text-h2 font-poppins text-encre">
              Six situations where a freeze is the right first move
            </h2>
            {/* Figma's lead here is full-strength encre, not the encre/62 most
                section leads on the site use. */}
            <p className="text-lead text-encre">
              The common thread: the debt is real, and waiting for a judgment
              means recovering nothing. A protective attachment turns the order
              of events around — secure first, litigate second.
            </p>

            {/*
              Figma nests a `grid` frame with 48 of top padding around a single
              `list`, whose rows are pairs of 320 cells spaced by
              `justify-between` inside the 690 column — 50 between them. A
              two-track grid reproduces that and reflows to one on a phone.
            */}
            <ul className="grid grid-cols-1 gap-x-[50px] gap-y-9 pt-12 sm:grid-cols-2">
              {SITUATIONS.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <LandingBullet size={10} />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="text-h4 font-poppins text-encre">
                      {item.title}
                    </h3>
                    <p className="text-small text-encre/62">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Aside — 450 at xl: the photo with its overlay card, then the panel. */}
          <div className="flex w-full flex-col gap-9 xl:w-112.5 xl:shrink-0 xl:self-stretch">
            <div className="relative w-full">
              {/*
                `overflow-hidden` belongs to the image alone, not to this box:
                Figma hangs the overlay card off the photo's left edge as a
                sibling, so clipping here would crop it.
              */}
              <div className="relative aspect-[450/414] w-full overflow-hidden rounded-tl-[110px] rounded-tr-[10px] rounded-br-[60px] rounded-bl-[36px] sm:rounded-tl-[200px] sm:rounded-br-[100px] sm:rounded-bl-[60px]">
                <Image
                  src={counselPhoto}
                  alt="A Petroff lawyer outside the Paris courts"
                  sizes="(min-width: 1280px) 450px, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>

              {/*
                Figma centres this card at left 50% − 127 and top 50% + 138.5 of
                the photo box, so it is written that way rather than resolved to
                literal offsets — it then holds its position as the photo scales.
                Hidden below `sm`, where a 258px card overhanging a 335px column
                has nowhere to go.
              */}
              <div className="absolute top-[calc(50%+138.5px)] left-[calc(50%-127px)] hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[16px] bg-white p-3 shadow-[0px_14.667px_36.667px_0px_rgba(18,42,76,0.12)] sm:flex">
                {/* The same hourglass the Recouvrement hero draws, at a fourth
                    box — it carries no strokes, so the stretch is exact. */}
                <Hourglass
                  aria-hidden="true"
                  width={37}
                  height={50}
                  className="shrink-0"
                />
                <div className="flex w-[189px] flex-col justify-center">
                  <p className="text-small-strong text-encre">
                    Frozen before notified.
                  </p>
                  <p className="text-encre/62 text-[14px] leading-[1.2]">
                    The bailiff acts first; the debtor is served afterwards.
                  </p>
                </div>
              </div>
            </div>

            {/* Figma names this frame `sticky` (14221:9829), so it is. The aside is
                left stretching rather than `self-start`: the panel can only travel
                inside its own parent, and a hugged aside would give it none. */}
            <div className="bg-lilas-2 rounded-card flex flex-col gap-5 p-5 sm:p-7 xl:sticky xl:top-6">
              <div className="flex flex-col gap-4">
                <p className="text-overline font-poppins text-brique uppercase">
                  Why now
                </p>
                <p className="text-price font-poppins text-encre">
                  Time works against you
                </p>
              </div>
              <p className="text-body text-encre/62">
                Once funds leave the French banking system, the same debt costs
                a multiple to recover. The assessment call decides in fifteen
                minutes whether the conditions are met and which assets to
                target first.
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href="#assess"
                  className="text-button font-poppins bg-encre flex items-center justify-center rounded-full px-7 py-4 text-white transition-opacity hover:opacity-90"
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
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
