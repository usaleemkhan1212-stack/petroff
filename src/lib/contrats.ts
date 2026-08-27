import BellIcon from "@/assets/icons/bell.svg";
import BookIcon from "@/assets/icons/book.svg";
import ChainLinkIcon from "@/assets/icons/chain-link.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import FolderIcon from "@/assets/icons/folder.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import LightbulbIcon from "@/assets/icons/lightbulb.svg";
import LightningBoltIcon from "@/assets/icons/lightning-bolt.svg";
import LockIcon from "@/assets/icons/lock.svg";
import MonitorChartIcon from "@/assets/icons/monitor-chart.svg";
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
  /*
    Four tints since the redesign, non-repeating across the nine domains.
    Sampled from the node's own export, card by card.
  */
  tone: "blue" | "gold" | "mint" | "pink";
};

export const missions: readonly Mission[] = [
  { key: "distribution", Icon: NetworkNodesIcon, tone: "blue"},
  { key: "agence", Icon: PersonIcon, tone: "gold"},
  { key: "cgv", Icon: FileLinesIcon, tone: "mint"},
  { key: "industriels", Icon: OfficeBuildingIcon, tone: "pink"},
  { key: "sousTraitance", Icon: ChainLinkIcon, tone: "mint"},
  { key: "rupture", Icon: WarningTriangleIcon, tone: "gold"},
  { key: "transparence", Icon: PercentRoundedIcon, tone: "blue"},
  { key: "international", Icon: GlobeIcon, tone: "gold"},
  { key: "negociations", Icon: LightbulbIcon, tone: "pink"},
] as const;

/** Keys inside the `ContratsPage.prestations.items` message namespace. */
export type PrestationKey = "modeles" | "relecture" | "traductions" | "contratheque";

export const prestations: readonly {
  key: PrestationKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /*
    Four tints since the redesign — blue, gold, mint, pink across the row.
    Note the order differs from the Contentieux page's (blue/gold/pink/mint):
    check each frame, do not carry the sibling's sequence.
  */
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "modeles", Icon: BookIcon, tone: "blue" },
  { key: "relecture", Icon: LightningBoltIcon, tone: "gold" },
  { key: "traductions", Icon: GlobeIcon, tone: "mint"},
  { key: "contratheque", Icon: FolderIcon, tone: "pink"},
] as const;

/** Keys inside the `ContratsPage.methode.items` message namespace. */
export const methodeSteps = ["cadrage", "espace", "redaction", "signature"] as const;

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

/** Keys inside the `ContratsPage.espace.features` message namespace. */
export type EspaceFeatureKey = "avancement" | "coffre" | "alertes" | "langues";

export const espaceFeatures: readonly {
  key: EspaceFeatureKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /* Four tints since the redesign — blue, gold, pink, mint down the list. */
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "avancement", Icon: MonitorChartIcon, tone: "blue" },
  { key: "coffre", Icon: LockIcon, tone: "gold" },
  { key: "alertes", Icon: BellIcon, tone: "pink"},
  { key: "langues", Icon: GlobeIcon, tone: "mint"},
] as const;

/**
 * How far the mock dossier has progressed, as a percentage of the bar. Figma
 * draws 358.48px inside a 592.5px track, which is 60.5% to within 0.02px.
 */
export const espaceProgress = 60.5;

/** Keys inside the `ContratsPage.espace.mock.rows` message namespace. */
export type EspaceRowKey =
  | "questionnaire"
  | "statuts"
  | "signature"
  | "capital"
  | "greffe";

/** Rows of the mock dossier, with the tone their status renders in. */
export const espaceRows: readonly {
  key: EspaceRowKey;
  tone: "done" | "waiting" | "todo";
}[] = [
  { key: "questionnaire", tone: "done" },
  { key: "statuts", tone: "done" },
  { key: "signature", tone: "waiting" },
  { key: "capital", tone: "todo" },
  { key: "greffe", tone: "todo" },
] as const;

/** Keys inside the `ContratsPage.faq.items` message namespace. */
export type FaqKey = "cgv" | "rupture" | "international" | "negociation";

/** The one question the design draws expanded. */
export const faqExpandedKey = "cgv" as const;

export const faqItems: readonly FaqKey[] = [
  "cgv",
  "rupture",
  "international",
  "negociation",
] as const;
