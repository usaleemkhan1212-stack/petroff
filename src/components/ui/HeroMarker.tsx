import type { ReactNode } from "react";

/**
 * The pale-gold bar under a hero's highlighted words.
 *
 * **It is painted as a background on the marked run, not as a positioned bar**,
 * and that is the whole point: a background box is exactly as wide as the text
 * it belongs to, so the bar follows the words into any translation — where a
 * fixed `w-[…em]` bar stays the width French happened to need. It also survives
 * the run wrapping, since `box-decoration-break: clone` gives every line
 * fragment its own background box.
 *
 * Two things come free with it. The bar paints *behind* the glyphs by
 * definition, so the negative-z-index dance several heroes carried is no longer
 * needed; and it cannot overhang its column, so neither is `max-w-full`.
 *
 * `top` and `height` are ems of the title's own font size, measured from the
 * top of the marked run's box — the sanctioned literal-em case this file's
 * hard rules already carve out for hero markers. The 4px corner radius Figma
 * draws on the rect is the one thing lost; a background cannot round only its
 * painted band.
 */
export function HeroMarker({
  top,
  height,
  children,
}: {
  top: number;
  height: number;
  children: ReactNode;
}) {
  const from = `${top}em`;
  const to = `${Number((top + height).toFixed(4))}em`;

  return (
    <span
      /*
        `inline-block` keeps the marked phrase on one line, which is what these
        heroes were built with and what Figma draws — as a plain inline the run
        splits mid-phrase and four titles gained a line. `max-w-full` is what
        makes that safe: a translation too long for the column wraps inside the
        box rather than pushing the page sideways.
      */
      className="inline-block max-w-full [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent ${from}, var(--color-pale-gold) ${from}, var(--color-pale-gold) ${to}, transparent ${to})`,
      }}
    >
      {children}
    </span>
  );
}
