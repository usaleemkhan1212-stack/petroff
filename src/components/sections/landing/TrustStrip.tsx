/**
 * Figma `14221:9342` — a lilas-2 band of four claims under the hero, 36 above
 * and below (95 in all).
 *
 * Its dot is a 10px gold circle drawn as a span rather than a file: Figma
 * exports a 10px SVG ellipse, which is not worth an asset — the same call both
 * of the site's other trust strips make. It is deliberately **not** the shared
 * `Bullet`: that is a 9px puce in a 9x20 box sized to a line of body copy, and
 * this file's own rule is that not every round marker is a bullet.
 */
const CLAIMS = [
  "Paris Bar lawyers — Toque C2396",
  "We act before the juge de l’exécution and the Paris courts",
  "For foreign creditors — UK, US, EU, Gulf, Asia",
  "Fee quoted before the mission, not after",
];

export function LandingTrustStrip() {
  return (
    <section className="bg-lilas-2 py-9">
      {/*
        **This row must not sit inside `Container`.** Figma gives the strip no
        horizontal padding at all and lets its `in` frame span the full 1920,
        centred; the four claims need ~1430, so a 1245 container wraps them to a
        second line and the band goes 95 -> 126. Exactly the trap the e-commerce
        trust strip already records. It keeps the page gutters and nothing else.
      */}
      <div className="px-5 sm:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-2">
          {CLAIMS.map((claim) => (
            <li key={claim} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="bg-gold size-2.5 shrink-0 rounded-full"
              />
              <span className="text-small-strong text-encre">{claim}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
