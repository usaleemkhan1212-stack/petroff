import BellIcon from "@/assets/icons/bell.svg";
import BalanceScaleIcon from "@/assets/icons/balance-scale.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import FolderIcon from "@/assets/icons/folder.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import KeyLineIcon from "@/assets/icons/key-line.svg";
import LockIcon from "@/assets/icons/lock.svg";
import MagnifierIcon from "@/assets/icons/magnifier.svg";
import MonitorChartIcon from "@/assets/icons/monitor-chart.svg";
import NetworkNodesIcon from "@/assets/icons/network-nodes.svg";
import OfficeBuildingIcon from "@/assets/icons/office-building.svg";
import PercentRoundedIcon from "@/assets/icons/percent-rounded.svg";
import PersonIcon from "@/assets/icons/person.svg";

/** Keys inside the `FiscalPage.tools.items` message namespace. */
export const tools = ["remuneration", "enregistrement", "dutreil", "echeancier"] as const;

/**
 * Keys inside the `FiscalPage.hero.stats` message namespace.
 *
 * **Three, where both sibling domain pages have four** — this hero's row is
 * `J-0 / 100 % / Dutreil`, so do not carry the four-column shape across.
 */
export const heroStats = ["reponse", "positions", "dutreil"] as const;

/** Keys inside the `FiscalPage.domaines.items` message namespace. */
export type MissionKey =
  | "structuration"
  | "dirigeant"
  | "controle"
  | "contentieux"
  | "prixTransfert"
  | "integration"
  | "dutreil"
  | "tva"
  | "rescrits";

export type Mission = {
  key: MissionKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /**
   * Icon tile background — four tints, non-repeating across the nine domains,
   * read card by card off the node's own export. It happens to run in the same
   * order as the Contentieux page's, but each frame was read rather than
   * assumed. The card's CTA pill takes the same tint.
   */
  tone: "blue" | "gold" | "mint" | "pink";
};

export const missions: readonly Mission[] = [
  { key: "structuration", Icon: NetworkNodesIcon, tone: "blue" },
  { key: "dirigeant", Icon: PersonIcon, tone: "gold" },
  { key: "controle", Icon: MagnifierIcon, tone: "mint" },
  { key: "contentieux", Icon: BalanceScaleIcon, tone: "pink" },
  { key: "prixTransfert", Icon: GlobeIcon, tone: "blue" },
  { key: "integration", Icon: OfficeBuildingIcon, tone: "gold" },
  { key: "dutreil", Icon: KeyLineIcon, tone: "mint" },
  { key: "tva", Icon: PercentRoundedIcon, tone: "gold" },
  { key: "rescrits", Icon: FileLinesIcon, tone: "pink" },
] as const;

/** Keys inside the `FiscalPage.prestations.items` message namespace. */
export type PrestationKey = "revue" | "rescrits" | "declarations" | "prixTransfert";

export const prestations: readonly {
  key: PrestationKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /* Blue, gold, pink, mint — the Contentieux order, not the Contrats one. */
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "revue", Icon: MonitorChartIcon, tone: "blue" },
  { key: "rescrits", Icon: FileLinesIcon, tone: "gold" },
  { key: "declarations", Icon: CalendarIcon, tone: "pink" },
  { key: "prixTransfert", Icon: FolderIcon, tone: "mint" },
] as const;

/** Keys inside the `FiscalPage.methode.items` message namespace. */
export const methodeSteps = ["cadrage", "espace", "redaction", "signature"] as const;

/** Keys inside the `FiscalPage.forfaits.items` message namespace. */
export type ForfaitKey = "consultation" | "controle" | "revue";

export type Forfait = {
  key: ForfaitKey;
  /** The gold-bordered middle plan carrying the badge. */
  featured?: true;
  /** Figma draws this plan's amount at 40px where the others are 30. */
  largePrice?: true;
};

/**
 * **A third large-price pattern.** Figma renders these three prices at
 * 40 / 30 / 30 — the *first* plan is the big one here, where Contentieux is
 * 40/30/40 and Contrats 30/30/40. Read the price heights per frame.
 */
export const forfaits: readonly Forfait[] = [
  { key: "consultation", largePrice: true },
  { key: "controle", featured: true },
  { key: "revue" },
] as const;

/** Keys inside the `FiscalPage.espace.features` message namespace. */
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

/**
 * How far the mock dossier has progressed. Figma draws the bar at 358.48px in
 * the mock's 594.5px inner width — the same numbers the Contrats mock uses.
 */
export const espaceProgress = 60.5;

/** Keys inside the `FiscalPage.espace.mock.rows` message namespace. */
export type EspaceRowKey =
  | "avis"
  | "audit"
  | "reponse"
  | "transaction"
  | "contentieux";

/** Rows of the mock dossier, with the tone their status renders in. */
export const espaceRows: readonly {
  key: EspaceRowKey;
  tone: "done" | "waiting" | "todo";
}[] = [
  { key: "avis", tone: "done" },
  { key: "audit", tone: "done" },
  { key: "reponse", tone: "waiting" },
  { key: "transaction", tone: "todo" },
  { key: "contentieux", tone: "todo" },
] as const;

/** Keys inside the `FiscalPage.faq.items` message namespace. */
export type FaqKey = "dividendes" | "controle" | "dutreil" | "rescrit";

/** The one question the design draws expanded. */
export const faqExpandedKey = "dividendes" as const;

export const faqItems: readonly FaqKey[] = [
  "dividendes",
  "controle",
  "dutreil",
  "rescrit",
] as const;
