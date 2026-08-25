import ArrowsMerge from "@/assets/icons/arrows-merge.svg";
import Briefcase from "@/assets/icons/briefcase.svg";
import Building from "@/assets/icons/building.svg";
import Copyright from "@/assets/icons/copyright.svg";
import Document from "@/assets/icons/document.svg";
import Gavel from "@/assets/icons/gavel.svg";
import Percent from "@/assets/icons/percent.svg";
import Users from "@/assets/icons/users.svg";

/** Keys inside the `Expertises.items` message namespace. */
export type ExpertiseKey =
  | "societes"
  | "fusions"
  | "propriete"
  | "contentieux"
  | "social"
  | "fiscal"
  | "immobilier"
  | "contrats";

export type Expertise = {
  key: ExpertiseKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /**
   * Icon tile background. Figma gives the eight cards four tints rather than
   * a two-colour alternation, and the sequence does not repeat — row 1 runs
   * blue/pink/mint/gold and row 2 runs mint/gold/blue/pink — so it is carried
   * per card rather than derived from the index.
   */
  tone: "blue" | "gold" | "mint" | "pink";
};

export const expertises: readonly Expertise[] = [
  { key: "societes", Icon: Briefcase, tone: "blue" },
  { key: "fusions", Icon: ArrowsMerge, tone: "pink" },
  { key: "propriete", Icon: Copyright, tone: "mint" },
  { key: "contentieux", Icon: Gavel, tone: "gold" },
  { key: "social", Icon: Users, tone: "mint" },
  { key: "fiscal", Icon: Percent, tone: "gold" },
  { key: "immobilier", Icon: Building, tone: "blue" },
  { key: "contrats", Icon: Document, tone: "pink" },
] as const;
