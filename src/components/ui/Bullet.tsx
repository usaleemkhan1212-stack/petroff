import BulletMark from "@/assets/icons/bullet-mark.svg";
import { cn } from "@/lib/utils";

/**
 * The site's one list bullet — Figma's `puce` component (`13680:21226`), a 9px
 * dot in a 9x20 box.
 *
 * **Every list bullet on the site renders this**, at one size and one colour,
 * on the user's instruction: the icon and the colour are site-wide rather than
 * per frame, so several sections that drew their own 10px or 12px circle now
 * defer to it. The colour lives here and nowhere else — one line changes every
 * bullet on the site.
 *
 * Its 20px box puts the dot's centre at 12.5, which is exactly the middle of a
 * 25.2px line box — and of the cap height, since Inter's ascent and descent put
 * the two in the same place. But a line of lowercase text has its visual mass
 * lower than that: Inter's x-height band is centred 1.7px further down, so a
 * dot on the line-box centre reads high against the word beside it. Hence the
 * 2px `translate-y`, which is optical rather than layout — being a transform it
 * cannot change a row's height, so Figma's own 25.2 + 20 = 45.2 arithmetic for
 * a one-line row still holds. A row therefore needs no margin of its own.
 *
 * **Not every round marker is a bullet.** The two trust strips' claim dots, and
 * the timeline `pastille` — a node on a rail, with a white ring — keep their
 * own size and colour; check what a dot *is* before pointing it here.
 */
export function Bullet({ className }: { className?: string }) {
  return (
    <BulletMark
      aria-hidden="true"
      width={9}
      height={20}
      className={cn("text-gold shrink-0 translate-y-[2px]", className)}
    />
  );
}
