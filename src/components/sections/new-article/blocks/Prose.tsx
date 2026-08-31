import type { ReactNode } from "react";

/**
 * The two inline runs the article body uses, shared by every paragraph and by
 * the copy inside the boxes:
 *
 * - `<b>` is Poppins SemiBold 18/1.35 — Figma's H4 metrics used inline, hence
 *   `text-h4` *plus* an explicit `font-poppins`: a text-* token never carries
 *   the family.
 * - `<ref>` is Inter SemiBold **18/1.5** in plain encre. Counting the column's
 *   inline spans settles a run the frame writes three ways — 28 at 18/1.5
 *   encre against 2 in brique and 2 still at 16/1.45 — so this is the rule and
 *   the rest are leftovers. It is a weight change mid-sentence, not a size one.
 *
 * **A `<ref>` goes brique on hover**, because these citations are destined to be
 * links out to the text they name. Figma draws no hover state for them; this
 * is a deliberate addition, asked for. They stay `<span>`s until there is
 * somewhere to point them — the site's rule is that nothing navigates to a
 * route that does not exist — so the pointer cursor is an affordance for the
 * link they are about to become, not a working one.
 */
export const proseTags = {
  b: (chunks: ReactNode) => <span className="text-h4 font-poppins">{chunks}</span>,
  ref: (chunks: ReactNode) => (
    <span className="text-body-strong hover:text-brique cursor-pointer transition-colors">
      {chunks}
    </span>
  ),
};

/** A body paragraph: Inter 18/1.4 in full-strength encre, not the 62% used elsewhere. */
export function Prose({ children }: { children: ReactNode }) {
  return <p className="text-body text-encre">{children}</p>;
}
