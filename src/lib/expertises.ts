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
  /** Icon tile background — alternates pale blue / pale gold across the grid. */
  tone: "blue" | "gold";
};

export const expertises: readonly Expertise[] = [
  { key: "societes", Icon: Briefcase, tone: "blue" },
  { key: "fusions", Icon: ArrowsMerge, tone: "gold" },
  { key: "propriete", Icon: Copyright, tone: "blue" },
  { key: "contentieux", Icon: Gavel, tone: "gold" },
  { key: "social", Icon: Users, tone: "blue" },
  { key: "fiscal", Icon: Percent, tone: "gold" },
  { key: "immobilier", Icon: Building, tone: "blue" },
  { key: "contrats", Icon: Document, tone: "gold" },
] as const;
