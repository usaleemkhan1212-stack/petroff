import type { ReactNode } from "react";

/**
 * The two inline runs the article body uses, shared by every prose paragraph
 * and by the copy inside the boxes:
 *
 * - `<b>` is Poppins SemiBold 18/1.35 — Figma's H4 metrics used inline, which
 *   is why it pairs `text-h4` with an explicit `font-poppins`: a text-* token
 *   never carries the family.
 * - `<ref>` is a legal citation, Inter SemiBold 16/1.45 in brique. It is a
 *   real size change mid-sentence, not just a colour.
 */
export const proseTags = {
  b: (chunks: ReactNode) => (
    <span className="text-h4 font-poppins">{chunks}</span>
  ),
  ref: (chunks: ReactNode) => (
    <span className="text-small-strong text-brique">{chunks}</span>
  ),
};

/** A body paragraph: Inter 18/1.4 in full-strength encre, not the 62% used elsewhere. */
export function Prose({ children }: { children: ReactNode }) {
  return <p className="text-body text-encre">{children}</p>;
}
