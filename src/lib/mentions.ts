/**
 * The legal notice's fourteen sections, in Figma's order (S01-S14).
 *
 * As on the three other legal documents, the copy — titles, numbers and every
 * block — lives in `messages/fr.json` under `MentionsPage.sections`, because
 * for a legal text the block sequence *is* the content. These keys are what
 * lets a component read one section out of it with a literal message path.
 */
export const sectionKeys = [
  "objet",
  "editeur",
  "directeur",
  "hebergeur",
  "profession",
  "consultation",
  "propriete",
  "liens",
  "donnees",
  "responsabilite",
  "internet",
  "mediation",
  "droit",
  "contact",
] as const;

export type SectionKey = (typeof sectionKeys)[number];

/**
 * This table of contents lists **all fourteen** — unlike the privacy policy's,
 * which skips two, and the mediation notice's, which stops one short. Four of
 * its labels are shortened against the sections' own titles ("Responsabilité &
 * informations" for "Responsabilité et informations à titre indicatif"), so
 * they are stored separately rather than read from `sections.<key>.title`.
 */
export const tocKeys = sectionKeys;

/** One block of a section, as stored in the message catalogue. */
export type Block =
  | { type: "p" | "note"; text: string }
  | {
      type: "dl";
      rows: {
        label: string;
        value: string;
        /** The whole row is Inter SemiBold encre, not just its label. */
        strong?: boolean;
      }[];
    }
  /**
   * `gold` is the cookie policy's callout — pale gold under a gold edge.
   * `red` is new here: pink at 40% under a red edge, which is the privacy
   * policy's own red tone and the article `trap`'s shape.
   */
  | { type: "callout"; tone: "gold" | "red"; title: string; body: string };
