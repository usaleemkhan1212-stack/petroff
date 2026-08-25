import benchLaptop from "@/assets/images/bench-laptop.jpg";
import glassMeetingRoomWide from "@/assets/images/glass-meeting-room-wide.jpg";
import plantFilledLounge from "@/assets/images/plant-filled-lounge.jpg";

/** Keys inside the `Actus.items` message namespace. */
export type ArticleKey = "signature" | "formeSociale" | "implantation";

export type Article = {
  key: ArticleKey;
  /**
   * Card photo, stored at 1205x420 — 3x the comp's 401.67x140 thumbnail, with
   * Figma's own crop window already baked in, so the markup is a plain
   * object-cover.
   */
  photo: typeof benchLaptop;
};

export const articles: readonly Article[] = [
  { key: "signature", photo: benchLaptop },
  { key: "formeSociale", photo: plantFilledLounge },
  { key: "implantation", photo: glassMeetingRoomWide },
] as const;
