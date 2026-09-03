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

/**
 * The eight domain cards of "Domaines couverts", in Figma's order, with the
 * tile tint and prestation count each carries.
 *
 * **Every icon reuses** — and the check that proved it is worth repeating: a
 * path-string compare called seven of the eight new, because Figma serialises
 * the same glyph from a different start point. Comparing the numbers instead
 * matched all eight to 0.001, the `percent` case this file already records.
 *
 * **Its lead says "Neuf domaines" and the comp draws eight cards.** Reproduced
 * as drawn; flag it, alongside "Dix leviers" over six on the service page.
 */
export const domaineCards = [
  { key: "societes", tint: "bg-pale-blue", count: 9, href: "/expertises" },
  {
    key: "fusions",
    tint: "bg-pink-soft/40",
    count: 12,
    href: "/expertises/fusions-acquisitions",
  },
  {
    key: "propriete",
    tint: "bg-pale-mint",
    count: 12,
    href: "/expertises/propriete-intellectuelle",
  },
  {
    key: "contentieux",
    tint: "bg-pale-gold",
    count: 12,
    href: "/expertises/contentieux-arbitrage",
  },
  { key: "social", tint: "bg-pale-mint", count: 12, href: "/expertises/droit-social" },
  { key: "fiscal", tint: "bg-pale-gold", count: 12, href: "/expertises/droit-fiscal" },
  {
    key: "immobilier",
    tint: "bg-pale-blue",
    count: 12,
    href: "/expertises/immobilier-entreprise",
  },
  {
    key: "contrats",
    tint: "bg-pink-soft/40",
    count: 12,
    href: "/expertises/contrats-commerciaux",
  },
] as const;

/** The three coordinated areas chipped under the domain list. */
export const networkChips = ["emploi", "fiscalite", "conformite"] as const;

/**
 * The eight sectors of "Secteurs", in Figma's order. All eight icons are new —
 * native 24px line glyphs at `stroke-width` 1.8, which is the library's 1.95 at
 * the documented 24/26.
 *
 * **Its first row's inner gap is 12 where the other seven use 8** — the same
 * one-row slip the service page's "Quand faire appel" carries. Reproduced.
 */
export const secteurRows = [
  "transport",
  "commerce",
  "industrie",
  "ecommerce",
  "pharma",
  "tech",
  "b2b",
  "consommation",
] as const;

/** The two ruled facts in "Nos clients". */
export const clientFacts = ["tailles", "bilingue"] as const;

/**
 * The four working languages. Figma fills the first two solid encre and leaves
 * the other two lilas — so the tint is per chip, not derived from the index.
 */
export const clientLanguages = [
  { key: "fr", solid: true },
  { key: "en", solid: true },
  { key: "es", solid: false },
  { key: "zh", solid: false },
] as const;

/**
 * The ten countries, as Figma's **two explicit columns** — so the fill is
 * column-major by structure rather than by a `grid-flow-col` trick, and each
 * row keeps its own height for free. "International" closes the second column
 * in brique rather than encre.
 */
export const clientCountries = [
  ["emirats", "etatsUnis", "australie", "chine", "inde"],
  ["qatar", "canada", "nouvelleZelande", "hongKong", "international"],
] as const;

/** The three case studies, in Figma's order. */
export const caseStudies = ["blocage", "levee", "marque"] as const;

/**
 * Figma `13701:24212` — the two people whose cards this page draws, then the
 * four partners it lists by name and role. Mᵉ Petrova's card links to her
 * profile page; the rest have none yet, so `MaybeLink` renders them as spans.
 */
export const cabinetPeople = [
  { key: "petrova", href: "/le-cabinet/personal-page" },
  { key: "hlebarova", href: "/le-cabinet/hlebarova" },
] as const;

export const cabinetPartners = ["mehandzhiyska", "bazin", "cochet", "willard"] as const;
