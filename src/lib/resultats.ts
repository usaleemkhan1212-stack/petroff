import type { ContentDomain, ContentType } from "@/lib/bibliotheque";

/**
 * The four contents the `Bibliothèque: résultats` frame (`13063:881`) draws in
 * its filtered grid. They are this page's own — none of them appears in the
 * `/bibliotheque` set — so they live here rather than in `bibliotheque.ts`, and
 * their copy sits under the `ResultatsPage` namespace.
 *
 * All four are `payer`, which is the category the page opens on.
 */
export type ResultatKey = "impayee" | "injonction" | "saisie" | "redressement";

export type Resultat = {
  key: ResultatKey;
  domain: ContentDomain;
  type: ContentType;
};

export const resultats: readonly Resultat[] = [
  { key: "impayee", domain: "payer", type: "guide" },
  { key: "injonction", domain: "payer", type: "guide" },
  { key: "saisie", domain: "payer", type: "fiche" },
  { key: "redressement", domain: "payer", type: "fiche" },
] as const;

/**
 * The category the page opens filtered on — Figma draws its select active, at
 * a 2px periwinkle border rather than the resting `encre/14`.
 */
export const initialDomain: ContentDomain = "payer";
