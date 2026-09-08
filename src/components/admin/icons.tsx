import LogoMark from "@/assets/icons/logo-mark.svg";
import LogoTagline from "@/assets/icons/logo-tagline.svg";
import LogoWordmark from "@/assets/icons/logo-wordmark.svg";
import { cn } from "@/lib/utils";

/**
 * The admin's own icon set — 24px line glyphs on a 1.7 stroke.
 *
 * They are drawn here rather than added to `src/assets/icons/` because none of
 * them exists in the site's library: that library is Figma's 26px export at
 * stroke 1.95, and mixing the two weights in one chrome reads as two icon sets.
 * They stroke `currentColor`, so a call site colours them with a token class.
 */
const PATHS = {
  grid: ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M13 13h7v7h-7z", "M4 13h7v7H4z"],
  inbox: [
    "M22 12h-6l-2 3h-4l-2-3H2",
    "M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z",
  ],
  doc: ["M6 2h8l4 4v16H6z", "M14 2v4h4", "M9 13h6", "M9 17h4"],
  article: ["M4 4h16v16H4z", "M8 8h8", "M8 12h8", "M8 16h5"],
  image: [
    "M3 4h18v16H3z",
    "M3 16l5-5 4 4 3-3 6 6",
    "M8.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3",
  ],
  gear: [
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
    "M19.4 13.5a1.6 1.6 0 0 0 .3 1.8 2 2 0 1 1-2.8 2.8 1.6 1.6 0 0 0-2.7 1.1 2 2 0 1 1-4 0 1.6 1.6 0 0 0-2.7-1.1 2 2 0 1 1-2.8-2.8 1.6 1.6 0 0 0-1.1-2.7 2 2 0 1 1 0-4 1.6 1.6 0 0 0 1.1-2.7A2 2 0 1 1 7 4.6a1.6 1.6 0 0 0 2.7-1.1 2 2 0 1 1 4 0A1.6 1.6 0 0 0 16.4 4.6a2 2 0 1 1 2.8 2.8 1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1 2 2 0 1 1 0 4 1.6 1.6 0 0 0-1.5 1z",
  ],
  redirect: ["M4 17h10a4 4 0 0 0 4-4V6", "M14 10l4-4 4 4"],
  search: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16", "M21 21l-4.3-4.3"],
  chevDown: ["M6 9l6 6 6-6"],
  refresh: [
    "M3 12a9 9 0 0 1 15-6.7L21 8",
    "M21 3v5h-5",
    "M21 12a9 9 0 0 1-15 6.7L3 16",
    "M3 21v-5h5",
  ],
  check: ["M5 12l4 4L19 7"],
  clock: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18", "M12 7v5l3 2"],
  archive: ["M3 5h18v4H3z", "M5 9v10h14V9", "M10 13h4"],
  download: ["M12 3v12", "M8 11l4 4 4-4", "M4 21h16"],
  plus: ["M12 5v14", "M5 12h14"],
  upload: [
    "M12 15V3",
    "M8 7l4-4 4 4",
    "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  ],
  folder: ["M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"],
  mail: ["M4 4h16v16H4z", "M4 7l8 6 8-6"],
  globe: [
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18",
    "M3 12h18",
    "M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18",
  ],
  logout: ["M16 17l5-5-5-5", "M21 12H9", "M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"],
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 18,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/**
 * The firm's lockup, on the sidebar's encre ground.
 *
 * All three files fill `currentColor`, so each part takes its brand colour from
 * a token class exactly as `ui/Logo.tsx` does — periwinkle mark, white wordmark
 * for the dark surface, gold tagline. Their intrinsic sizes are left untouched,
 * which is what preserves the designed geometry.
 */
export function AdminLockup() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className="text-periwinkle shrink-0" aria-hidden="true" />
      <span className="flex flex-col gap-1">
        <LogoWordmark className="text-white" aria-hidden="true" />
        <LogoTagline className="text-gold" aria-hidden="true" />
      </span>
    </span>
  );
}
