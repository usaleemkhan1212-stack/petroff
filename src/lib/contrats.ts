import BookIcon from "@/assets/icons/book.svg";
import ChainLinkIcon from "@/assets/icons/chain-link.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import FolderIcon from "@/assets/icons/folder.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import LightbulbIcon from "@/assets/icons/lightbulb.svg";
import LightningBoltIcon from "@/assets/icons/lightning-bolt.svg";
import NetworkNodesIcon from "@/assets/icons/network-nodes.svg";
import OfficeBuildingIcon from "@/assets/icons/office-building.svg";
import PercentRoundedIcon from "@/assets/icons/percent-rounded.svg";
import PersonIcon from "@/assets/icons/person.svg";
import WarningTriangleIcon from "@/assets/icons/warning-triangle.svg";

/** Keys inside the `ContratsPage.tools.items` message namespace. */
export const tools = ["audit", "score", "nda", "contratheque"] as const;

/** Keys inside the `ContratsPage.hero.stats` message namespace. */
export const heroStats = ["relecture", "signature", "langues", "reponse"] as const;

/** Keys inside the `ContratsPage.domaines.items` message namespace. */
export type MissionKey =
  | "distribution"
  | "agence"
  | "cgv"
  | "industriels"
  | "sousTraitance"
  | "rupture"
  | "transparence"
  | "international"
  | "negociations";

export type Mission = {
  key: MissionKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Icon tile background — strict blue/gold alternation across the grid. */
  tone: "blue" | "gold";
  /** Figma draws the first card already lifted; see the note in Domaines.tsx. */
  raised?: true;
};

export const missions: readonly Mission[] = [
  { key: "distribution", Icon: NetworkNodesIcon, tone: "blue", raised: true },
  { key: "agence", Icon: PersonIcon, tone: "gold" },
  { key: "cgv", Icon: FileLinesIcon, tone: "blue" },
  { key: "industriels", Icon: OfficeBuildingIcon, tone: "gold" },
  { key: "sousTraitance", Icon: ChainLinkIcon, tone: "blue" },
  { key: "rupture", Icon: WarningTriangleIcon, tone: "gold" },
  { key: "transparence", Icon: PercentRoundedIcon, tone: "blue" },
  { key: "international", Icon: GlobeIcon, tone: "gold" },
  { key: "negociations", Icon: LightbulbIcon, tone: "blue" },
] as const;

/** Keys inside the `ContratsPage.prestations.items` message namespace. */
export type PrestationKey = "modeles" | "relecture" | "traductions" | "contratheque";

export const prestations: readonly {
  key: PrestationKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  tone: "blue" | "gold";
}[] = [
  { key: "modeles", Icon: BookIcon, tone: "blue" },
  { key: "relecture", Icon: LightningBoltIcon, tone: "gold" },
  { key: "traductions", Icon: GlobeIcon, tone: "blue" },
  { key: "contratheque", Icon: FolderIcon, tone: "gold" },
] as const;

/** Keys inside the `ContratsPage.forfaits.items` message namespace. */
export type ForfaitKey = "packCgv" | "distribution" | "contratheque";

export type Forfait = {
  key: ForfaitKey;
  /** The gold-bordered middle plan carrying the badge. */
  featured?: true;
  /** Figma sets the subscription price at 40px where the others are 30px. */
  largePrice?: true;
};

export const forfaits: readonly Forfait[] = [
  { key: "packCgv" },
  { key: "distribution", featured: true },
  { key: "contratheque", largePrice: true },
] as const;
