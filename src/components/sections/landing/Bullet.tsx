/**
 * This page's list dot.
 *
 * It is **not** the shared `ui/Bullet`, and the reason is a 2px difference that
 * shows on every list here. That component carries a deliberate `translate-y`
 * of 2px — an optical nudge tuned so a 9px dot reads level with a line of
 * lowercase Inter on the French site. This frame does not draw that nudge: its
 * three `d`/`puce` exports are
 *
 *   hero        9x20, circle cy 12.5 r 4.5  -> top 8
 *   IsThisYou  10x18, circle cy 13   r 5    -> top 8
 *   Fees        8x16, circle cy 12   r 4    -> top 8
 *
 * so the rule across the whole page is **the dot's top edge sits 8px below the
 * row's top**, and only its diameter changes. With the shared component every
 * bullet on the page sat 2px low.
 *
 * The box height is not reproduced because it never sets the row: 20/18/16 all
 * sit under their row's line box (25.2 / 24.3 / 25.2), so the text drives the
 * height and the dot only has to land in the right place.
 */
export function LandingBullet({
  size = 9,
  tone = "gold",
}: {
  /** Diameter in px — 9 in the hero, 10 in IsThisYou, 8 in Fees. */
  size?: number;
  /** Figma draws the featured fee card's dots red and every other one gold. */
  tone?: "gold" | "red";
}) {
  return (
    <span
      aria-hidden="true"
      className={`mt-2 block shrink-0 rounded-full ${
        tone === "red" ? "bg-red" : "bg-gold"
      }`}
      style={{ width: size, height: size }}
    />
  );
}
