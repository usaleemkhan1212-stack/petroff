/**
 * Data for the **Le Cabinet page** (`/le-cabinet`, Figma `13689:21336`).
 *
 * Not to be confused with `lib/cabinet.ts`, which belongs to the home page's
 * own Cabinet band — same word, two different things, and this file exists
 * under a distinct name for exactly that reason.
 */

/** The hero's three stat columns, in Figma's order. */
export const heroStats = ["paris", "sources", "langues"] as const;

/**
 * Méthode's three pillars, in Figma's order, with the illustration each one
 * carries. **All three reuse an existing glyph** — checked at the target box,
 * not by path string: `columned-building` lands within 0.002 at 124x90,
 * `shield-badge` within 0.001 at 84x90 (its stroke scaling to 6.0 against
 * Figma's 6.067, a 1.1% difference), and `three-figures` within 0.003 at
 * 117x90.
 */
export const methodePillars = [
  { key: "conseil", width: 124 },
  { key: "donnees", width: 84 },
  { key: "ia", width: 117 },
] as const;

/** The five official data sources, chipped under Méthode. */
export const methodeSources = [
  "insee",
  "legifrance",
  "judilibre",
  "bodacc",
  "inpi",
] as const;
