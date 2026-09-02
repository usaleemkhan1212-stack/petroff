/**
 * The cookie policy's eight sections, in Figma's order (S01-S08).
 *
 * As on the privacy policy, the copy — titles, numbers and every block — lives
 * in `messages/fr.json` under `CookiesPage.sections`, because for a legal
 * document the block sequence *is* the content. These keys are what lets a
 * component read one section out of it with a literal message path.
 */
export const sectionKeys = [
  "cookie",
  "utilises",
  "publicitaire",
  "consentement",
  "conservation",
  "navigateur",
  "tiers",
  "droits",
] as const;

export type SectionKey = (typeof sectionKeys)[number];

/**
 * Unlike the privacy policy's, this table of contents lists **all eight** —
 * that frame's own list jumps 06 -> 09, this one does not. Its labels are
 * still shorter than four of the sections' own titles, so they are their own
 * strings rather than being read from `sections.<key>.title`.
 */
export const tocKeys = sectionKeys;

/** The two grounds Figma gives the category pill in the cookie table. */
export type TagTone = "essential" | "audience";

/** One block of a section, as stored in the message catalogue. */
export type Block =
  | { type: "p" | "note"; text: string }
  /** `tone: "link"` is Figma's periwinkle list — S06's four browser names. */
  | { type: "list"; tone?: "link"; items: string[] }
  | {
      type: "table";
      /** Cookie / Finalité / Catégorie / Durée. */
      head: [string, string, string, string];
      rows: {
        name: string;
        purpose: string;
        category: string;
        tone: TagTone;
        duration: string;
        /**
         * The pill spans the whole 150px Catégorie cell instead of hugging its
         * label. Figma sets it on the third row only — measured off the node's
         * own render, where that pill is 150 wide against the other two at 83
         * — and it is almost certainly a slip, since the label itself needs
         * 114. Reproduced rather than tidied away; flag it to the designer.
         */
        fill?: boolean;
      }[];
    }
  | { type: "callout"; title: string; body: string }
  | {
      type: "dl";
      rows: {
        label: string;
        value: string;
        /** The whole row is Inter SemiBold encre, not just its label. */
        strong?: boolean;
      }[];
    };
