import BellIcon from "@/assets/icons/bell.svg";
import BranchSplitIcon from "@/assets/icons/branch-split.svg";
import ChainLinkIcon from "@/assets/icons/chain-link.svg";
import ChartLineUpIcon from "@/assets/icons/chart-line-up.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import FolderIcon from "@/assets/icons/folder.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import LockIcon from "@/assets/icons/lock.svg";
import MagnifierIcon from "@/assets/icons/magnifier.svg";
import MonitorChartIcon from "@/assets/icons/monitor-chart.svg";
import RocketIcon from "@/assets/icons/rocket.svg";
import RosetteCheckIcon from "@/assets/icons/rosette-check.svg";
import ShieldCheckIcon from "@/assets/icons/shield-check.svg";
import ShuffleArrowsIcon from "@/assets/icons/shuffle-arrows.svg";
import WarningTriangleIcon from "@/assets/icons/warning-triangle.svg";

/** Keys inside the `MaPage.tools.items` message namespace. */
export const tools = ["calendrier", "dataroom", "dilution", "nda"] as const;

/** Keys inside the `MaPage.hero.stats` message namespace — three, not four. */
export const heroStats = ["pilotage", "dataroom", "langues"] as const;

/** Keys inside the `MaPage.domaines.items` message namespace. */
export type MissionKey =
  | "cessions"
  | "dueDiligence"
  | "loi"
  | "gap"
  | "levees"
  | "lbo"
  | "jv"
  | "carveOut"
  | "postClosing";

export type Mission = {
  key: MissionKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /**
   * Icon tile background, read card by card off the node's own export — this
   * frame breaks its cycle at card 8, where Droit social repeats a strict
   * blue/gold/mint/pink. The card's CTA pill takes the same tint.
   */
  tone: "blue" | "gold" | "mint" | "pink";
};

export const missions: readonly Mission[] = [
  { key: "cessions", Icon: ShuffleArrowsIcon, tone: "blue" },
  { key: "dueDiligence", Icon: MagnifierIcon, tone: "gold" },
  { key: "loi", Icon: FileLinesIcon, tone: "mint" },
  { key: "gap", Icon: ShieldCheckIcon, tone: "pink" },
  { key: "levees", Icon: RocketIcon, tone: "blue" },
  { key: "lbo", Icon: ChartLineUpIcon, tone: "gold" },
  { key: "jv", Icon: GlobeIcon, tone: "mint" },
  { key: "carveOut", Icon: BranchSplitIcon, tone: "gold" },
  { key: "postClosing", Icon: WarningTriangleIcon, tone: "pink" },
] as const;

/** Keys inside the `MaPage.prestations.items` message namespace. */
export type PrestationKey = "nda" | "housekeeping" | "postClosing" | "intragroupe";

export const prestations: readonly {
  key: PrestationKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /* Blue, gold, mint, pink — the Contrats order. */
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "nda", Icon: FileLinesIcon, tone: "blue" },
  { key: "housekeeping", Icon: FolderIcon, tone: "gold" },
  { key: "postClosing", Icon: RosetteCheckIcon, tone: "mint" },
  { key: "intragroupe", Icon: ChainLinkIcon, tone: "pink" },
] as const;

/** Keys inside the `MaPage.methode.items` message namespace. */
export const methodeSteps = ["cadrage", "espace", "redaction", "signature"] as const;

/** Keys inside the `MaPage.forfaits.items` message namespace. */
export type ForfaitKey = "vdd" | "seed" | "cession";

export type Forfait = {
  key: ForfaitKey;
  featured?: true;
  largePrice?: true;
};

/**
 * Prices 30 / 30 / 40 — the Contrats pattern, and the third of the four this
 * build has now seen (Contentieux 40/30/40, Droit fiscal 40/30/30, Droit social
 * 40/40/40). Read the price nodes' heights per frame.
 *
 * Note the large one is `Sur devis`, not an amount.
 */
export const forfaits: readonly Forfait[] = [
  { key: "vdd" },
  { key: "seed", featured: true },
  { key: "cession", largePrice: true },
] as const;

/** Keys inside the `MaPage.espace.features` message namespace. */
export type EspaceFeatureKey = "avancement" | "coffre" | "alertes" | "langues";

export const espaceFeatures: readonly {
  key: EspaceFeatureKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "avancement", Icon: MonitorChartIcon, tone: "blue" },
  { key: "coffre", Icon: LockIcon, tone: "gold" },
  { key: "alertes", Icon: BellIcon, tone: "pink" },
  { key: "langues", Icon: GlobeIcon, tone: "mint" },
] as const;

/** Figma draws the bar at 358.48px in the mock's 594.5px inner width. */
export const espaceProgress = 60.5;

/** Keys inside the `MaPage.espace.mock.rows` message namespace. */
export type EspaceRowKey = "dataroom" | "loi" | "dd" | "spa" | "closing";

/** Rows of the mock dossier, with the tone their status renders in. */
export const espaceRows: readonly {
  key: EspaceRowKey;
  tone: "done" | "waiting" | "todo";
}[] = [
  { key: "dataroom", tone: "done" },
  { key: "loi", tone: "done" },
  { key: "dd", tone: "waiting" },
  { key: "spa", tone: "todo" },
  { key: "closing", tone: "todo" },
] as const;

/** Keys inside the `MaPage.faq.items` message namespace. */
export type FaqKey = "duree" | "gap" | "banquier" | "etrangers";

/** The one question the design draws expanded. */
export const faqExpandedKey = "duree" as const;

export const faqItems: readonly FaqKey[] = [
  "duree",
  "gap",
  "banquier",
  "etrangers",
] as const;
