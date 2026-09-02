/**
 * The consumer-mediation notice's seven sections, in Figma's order (S01-S07).
 *
 * As on the two other legal documents, the copy — titles, numbers and every
 * block — lives in `messages/fr.json` under `MediateurPage.sections`, because
 * for a legal text the block sequence *is* the content. These keys are what
 * lets a component read one section out of it with a literal message path.
 */
export const sectionKeys = [
  "droit",
  "mediateur",
  "reclamation",
  "exclusions",
  "plateforme",
  "saisir",
  "contact",
] as const;

export type SectionKey = (typeof sectionKeys)[number];

/**
 * The table of contents lists **six** of the seven — Figma stops at 06 and
 * leaves `contact` out. Reproduced rather than filled in; flag it, as with the
 * privacy policy's own list skipping 07 and 08.
 *
 * Unlike that page's, these labels are character-identical to the sections'
 * own titles, so they are read from `sections.<key>.title` rather than stored
 * a second time.
 */
export const tocKeys = sectionKeys.slice(0, 6) as readonly SectionKey[];

/** One block of a section, as stored in the message catalogue. */
export type Block =
  | { type: "p" | "note"; text: string }
  /**
   * The ruled procedure list — Figma's `proc`. `tone: "note"` is S06, whose
   * rows are encre/62 against S04's full encre.
   */
  | { type: "proc"; tone?: "note"; items: string[] }
  | {
      type: "dl";
      rows: {
        label: string;
        value: string;
        /**
         * Figma draws the value in periwinkle because it *is* an address —
         * a domain or an e-mail. The href is derived from the text itself, so
         * nothing is invented; see `linkFor` in the Section component.
         */
        link?: boolean;
      }[];
    }
  | { type: "callout"; title: string; body: string };
