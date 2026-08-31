/**
 * The privacy policy's eighteen sections, in Figma's order (S01-S18).
 *
 * The copy — titles, numbers and every block — lives in `messages/fr.json`
 * under `ConfidentialitePage.sections`, because for a legal document the block
 * sequence *is* the content. These keys are what lets a component read one
 * section out of it with a literal message path.
 */
export const sectionKeys = [
  "responsable",
  "donnees",
  "demandes",
  "comptes",
  "societes",
  "legislation",
  "traduction",
  "relation",
  "navigation",
  "cookies",
  "hebergement",
  "destinataires",
  "securite",
  "droits",
  "autorite",
  "liens",
  "modifications",
  "contact",
] as const;

export type SectionKey = (typeof sectionKeys)[number];

/**
 * The table of contents lists **sixteen** of those eighteen — Figma's own list
 * jumps 06 -> 09, so `traduction` (07) and `relation` (08) are missing from it.
 * Reproduced rather than filled in; flag it to the designer.
 */
export const tocKeys = [
  "responsable",
  "donnees",
  "demandes",
  "comptes",
  "societes",
  "legislation",
  "navigation",
  "cookies",
  "hebergement",
  "destinataires",
  "securite",
  "droits",
  "autorite",
  "liens",
  "modifications",
  "contact",
] as const satisfies readonly SectionKey[];

/** One block of a section, as stored in the message catalogue. */
export type Block =
  | { type: "p" | "note" | "sub"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "dl";
      rows: {
        label: string;
        value: string;
        /** A `stone` rule sits above this row. Figma leaves three of S11's
            without one, which is almost certainly a slip — reproduced. */
        rule?: boolean;
        /** S11's table header: lilas-2, uppercase, tracked. */
        header?: boolean;
        /** The whole row is Inter SemiBold encre, not just its label. */
        strong?: boolean;
      }[];
      ruleAfter: boolean;
    }
  | { type: "callout"; tone: "red" | "gold"; title: string; body: string };


