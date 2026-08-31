/**
 * The signature simulator's rule set — a direct transcription of `calcSig()`
 * in `public/PETROFF-GABARIT-ARTICLE-v6.html`, which is the only place the
 * logic is specified. Figma draws one completed run (synallagmatique /
 * non-commerçant / 45 000 € / signature simple) and its four outputs, which is
 * exactly what these defaults produce.
 *
 * It returns message keys rather than strings, so every word stays in
 * `messages/fr.json` under `ArticlePage.simulator.results`.
 */
export const natures = ["synallagmatique", "unilateral", "authentique"] as const;
export const qualites = ["com", "civ"] as const;
export const niveaux = ["simple", "avancee", "qualifiee", "avocat"] as const;

export type Nature = (typeof natures)[number];
export type Qualite = (typeof qualites)[number];
export type Niveau = (typeof niveaux)[number];

/** Figma's own chosen values, which are also the template's defaults. */
export const defaults = {
  nature: "synallagmatique" as Nature,
  qualite: "civ" as Qualite,
  montant: 45000,
  niveau: "simple" as Niveau,
};

/** The threshold above which a written proof is required — C. civ. art. 1359. */
const ECRIT_THRESHOLD = 1500;

export type Analysis = {
  ecrit: "libre" | "oui" | "non";
  presomption: "authentique" | "avocat" | "qualifiee" | "aucune";
  mention: "commercial" | "avocat" | "exigee" | "authentique" | "synallagmatique";
  verdict: "authentique" | "favorable" | "tenable" | "renforcer";
};

export function analyse({
  nature,
  qualite,
  montant,
  niveau,
}: {
  nature: Nature;
  qualite: Qualite;
  montant: number;
  niveau: Niveau;
}): Analysis {
  const ecrit =
    qualite === "com" ? "libre" : montant > ECRIT_THRESHOLD ? "oui" : "non";

  /* `charge` tracks `presomption` one for one in the template, so one key
     drives both rows. */
  const presomption =
    nature === "authentique"
      ? "authentique"
      : niveau === "avocat"
        ? "avocat"
        : niveau === "qualifiee"
          ? "qualifiee"
          : "aucune";

  const mention =
    nature === "unilateral"
      ? qualite === "com"
        ? "commercial"
        : niveau === "avocat"
          ? "avocat"
          : "exigee"
      : nature === "authentique"
        ? "authentique"
        : "synallagmatique";

  const verdict =
    nature === "authentique"
      ? "authentique"
      : niveau === "qualifiee" || niveau === "avocat"
        ? "favorable"
        : qualite === "com"
          ? "tenable"
          : "renforcer";

  return { ecrit, presomption, mention, verdict };
}
