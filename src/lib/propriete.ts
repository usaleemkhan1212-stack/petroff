import BellIcon from "@/assets/icons/bell.svg";
import CloudIcon from "@/assets/icons/cloud.svg";
import CodeBracketsIcon from "@/assets/icons/code-brackets.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import FolderIcon from "@/assets/icons/folder.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import LockIcon from "@/assets/icons/lock.svg";
import MagnifierIcon from "@/assets/icons/magnifier.svg";
import MonitorChartIcon from "@/assets/icons/monitor-chart.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import PeopleCrossedIcon from "@/assets/icons/people-crossed.svg";
import RefreshArrowsIcon from "@/assets/icons/refresh-arrows.svg";
import RosetteCheckIcon from "@/assets/icons/rosette-check.svg";
import ShieldCheckIcon from "@/assets/icons/shield-check.svg";
import WarningTriangleIcon from "@/assets/icons/warning-triangle.svg";

/** Keys inside the `ProprietePage.tools.items` message namespace. */
export const tools = ["disponibilite", "surveillance", "cout", "anteriorite"] as const;

/** Keys inside the `ProprietePage.hero.stats` message namespace. */
export type HeroStatKey = "depot" | "territoires" | "surveillance";

/** All three at 40 here, unlike the Immobilier hero's mixed row. */
export const heroStats: readonly { key: HeroStatKey; small?: true }[] = [
  { key: "depot" },
  { key: "territoires" },
  { key: "surveillance" },
] as const;

/** Keys inside the `ProprietePage.domaines.items` message namespace. */
export type MissionKey =
  | "strategie"
  | "oppositions"
  | "contrefacon"
  | "logiciels"
  | "licences"
  | "domaines"
  | "secrets"
  | "donnees"
  | "titularite";

export type Mission = {
  key: MissionKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Read card by card off the node's own export; the CTA pill takes the same tint. */
  tone: "blue" | "gold" | "mint" | "pink";
};

export const missions: readonly Mission[] = [
  { key: "strategie", Icon: RosetteCheckIcon, tone: "blue" },
  { key: "oppositions", Icon: ShieldCheckIcon, tone: "gold" },
  { key: "contrefacon", Icon: WarningTriangleIcon, tone: "mint" },
  { key: "logiciels", Icon: CodeBracketsIcon, tone: "pink" },
  { key: "licences", Icon: FileLinesIcon, tone: "blue" },
  { key: "domaines", Icon: GlobeIcon, tone: "gold" },
  { key: "secrets", Icon: LockIcon, tone: "mint" },
  { key: "donnees", Icon: CloudIcon, tone: "gold" },
  { key: "titularite", Icon: PeopleCrossedIcon, tone: "pink" },
] as const;

/** Keys inside the `ProprietePage.prestations.items` message namespace. */
export type PrestationKey = "depots" | "inscriptions" | "constats" | "portefeuille";

export const prestations: readonly {
  key: PrestationKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /* Blue, gold, mint, pink — the Contrats order. */
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "depots", Icon: PencilIcon, tone: "blue" },
  { key: "inscriptions", Icon: RefreshArrowsIcon, tone: "gold" },
  { key: "constats", Icon: MagnifierIcon, tone: "mint" },
  { key: "portefeuille", Icon: FolderIcon, tone: "pink" },
] as const;

/** Keys inside the `ProprietePage.methode.items` message namespace. */
export const methodeSteps = ["cadrage", "espace", "redaction", "signature"] as const;

/** Keys inside the `ProprietePage.forfaits.items` message namespace. */
export type ForfaitKey = "depotFr" | "marqueUe" | "defense";

export type Forfait = {
  key: ForfaitKey;
  featured?: true;
  largePrice?: true;
};

/** Prices 40 / 30 / 40 — the Contentieux pattern, the sixth page to be read. */
export const forfaits: readonly Forfait[] = [
  { key: "depotFr", largePrice: true },
  { key: "marqueUe", featured: true },
  { key: "defense", largePrice: true },
] as const;

/** Keys inside the `ProprietePage.espace.features` message namespace. */
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

/** Keys inside the `ProprietePage.espace.mock.rows` message namespace. */
export type EspaceRowKey =
  | "recherche"
  | "classes"
  | "depot"
  | "opposition"
  | "certificat";

/** Rows of the mock dossier, with the tone their status renders in. */
export const espaceRows: readonly {
  key: EspaceRowKey;
  tone: "done" | "waiting" | "todo";
}[] = [
  { key: "recherche", tone: "done" },
  { key: "classes", tone: "done" },
  { key: "depot", tone: "waiting" },
  { key: "opposition", tone: "todo" },
  { key: "certificat", tone: "todo" },
] as const;

/** Keys inside the `ProprietePage.faq.items` message namespace. */
export type FaqKey = "territoire" | "copie" | "titularite" | "logiciels";

/** The one question the design draws expanded. */
export const faqExpandedKey = "territoire" as const;

export const faqItems: readonly FaqKey[] = [
  "territoire",
  "copie",
  "titularite",
  "logiciels",
] as const;
