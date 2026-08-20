/**
 * Static demo content for the OpenData section. The rows below mirror the
 * sample lookup shown in Figma; they are placeholders until the section is
 * wired to the INSEE Sirene, Légifrance, Judilibre and BODACC APIs.
 */

/** A term/detail pair in the company-lookup result list. */
export type ResultRow = {
  /** Key inside the `OpenData.verify.rows` message namespace. */
  key: "name" | "siege" | "etat";
  /** Which side carries the semibold encre treatment; the other is encre/62. */
  emphasis: "term" | "detail";
  /** Result green on the detail — the design uses it for the status row. */
  green?: true;
};

export const resultRows: readonly ResultRow[] = [
  { key: "name", emphasis: "term" },
  { key: "siege", emphasis: "detail" },
  { key: "etat", emphasis: "detail", green: true },
] as const;

/** Keys inside the `OpenData.watch.items` message namespace. */
export const watchItems = ["rupture", "suretes", "collectives"] as const;

/** Source badges, alternating pale blue / pale gold as the design does. */
export type Source = {
  /** Key inside the `OpenData.watch.sources` message namespace. */
  key: "sirene" | "legifrance" | "judilibre" | "bodacc";
  tone: "blue" | "gold";
};

export const sources: readonly Source[] = [
  { key: "sirene", tone: "blue" },
  { key: "legifrance", tone: "gold" },
  { key: "judilibre", tone: "gold" },
  { key: "bodacc", tone: "blue" },
] as const;
