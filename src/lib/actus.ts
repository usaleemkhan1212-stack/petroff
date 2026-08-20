import ArcDeTriompheColour from "@/assets/icons/arc-de-triomphe-colour.svg";
import EiffelTowerColour from "@/assets/icons/eiffel-tower-colour.svg";
import HaussmannBuildings from "@/assets/icons/haussmann-buildings.svg";

/** Keys inside the `Actus.items` message namespace. */
export type ArticleKey = "rupture" | "formeSociale" | "implantation";

export type Article = {
  key: ArticleKey;
  /** Illustration centred on the card's tinted thumbnail. */
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Thumbnail tint — each card gets its own in the design. */
  tone: "periwinkle" | "gold" | "blue";
};

export const articles: readonly Article[] = [
  { key: "rupture", Icon: ArcDeTriompheColour, tone: "periwinkle" },
  { key: "formeSociale", Icon: HaussmannBuildings, tone: "gold" },
  { key: "implantation", Icon: EiffelTowerColour, tone: "blue" },
] as const;
