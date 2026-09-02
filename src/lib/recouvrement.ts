import BalanceScaleIcon from "@/assets/icons/balance-scale.svg";
import BellIcon from "@/assets/icons/bell.svg";
import EnvelopeIcon from "@/assets/icons/envelope.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import FolderIcon from "@/assets/icons/folder.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import LightningBoltIcon from "@/assets/icons/lightning-bolt.svg";
import LockIcon from "@/assets/icons/lock.svg";
import MonitorChartIcon from "@/assets/icons/monitor-chart.svg";
import RefreshArrowsIcon from "@/assets/icons/refresh-arrows.svg";
import ShieldCheckIcon from "@/assets/icons/shield-check.svg";
import WarningTriangleIcon from "@/assets/icons/warning-triangle.svg";

/** Keys inside the `RecouvrementPage.tools.items` message namespace. */
export const tools = ["score", "interets", "miseEnDemeure", "tableau"] as const;

/** Keys inside the `RecouvrementPage.hero.stats` message namespace. */
export type HeroStatKey = "action" | "amiable" | "openData";

/** All three at 40 here. */
export const heroStats: readonly { key: HeroStatKey; small?: true }[] = [
  { key: "action" },
  { key: "amiable" },
  { key: "openData" },
] as const;

/** Keys inside the `RecouvrementPage.domaines.items` message namespace. */
export type MissionKey =
  | "amiable"
  | "injonction"
  | "saisies"
  | "collective"
  | "international"
  | "garanties"
  | "dailly"
  | "contentieux"
  | "prevention";

export type Mission = {
  key: MissionKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Read card by card off the node's own export; the CTA pill takes the same tint. */
  tone: "blue" | "gold" | "mint" | "pink";
};

export const missions: readonly Mission[] = [
  { key: "amiable", Icon: EnvelopeIcon, tone: "blue" },
  { key: "injonction", Icon: LightningBoltIcon, tone: "gold" },
  { key: "saisies", Icon: LockIcon, tone: "mint" },
  { key: "collective", Icon: WarningTriangleIcon, tone: "pink" },
  { key: "international", Icon: GlobeIcon, tone: "blue" },
  { key: "garanties", Icon: ShieldCheckIcon, tone: "gold" },
  { key: "dailly", Icon: RefreshArrowsIcon, tone: "mint" },
  { key: "contentieux", Icon: BalanceScaleIcon, tone: "gold" },
  { key: "prevention", Icon: FileLinesIcon, tone: "pink" },
] as const;

/** Keys inside the `RecouvrementPage.prestations.items` message namespace. */
export type PrestationKey =
  | "relances"
  | "injonctions"
  | "declarations"
  | "surveillance";

export const prestations: readonly {
  key: PrestationKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /* Blue, gold, mint, pink — the Contrats order. */
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "relances", Icon: EnvelopeIcon, tone: "blue" },
  { key: "injonctions", Icon: FileLinesIcon, tone: "gold" },
  { key: "declarations", Icon: FolderIcon, tone: "mint" },
  { key: "surveillance", Icon: BellIcon, tone: "pink" },
] as const;

/** Keys inside the `RecouvrementPage.methode.items` message namespace. */
export const methodeSteps = ["cadrage", "espace", "redaction", "signature"] as const;

/** Keys inside the `RecouvrementPage.forfaits.items` message namespace. */
export type ForfaitKey = "miseEnDemeure" | "injonction" | "abonnement";

export type Forfait = {
  key: ForfaitKey;
  featured?: true;
  largePrice?: true;
};

/** Prices 40 / 40 / 40 — the Droit social pattern, the second page to use it. */
export const forfaits: readonly Forfait[] = [
  { key: "miseEnDemeure", largePrice: true },
  { key: "injonction", featured: true, largePrice: true },
  { key: "abonnement", largePrice: true },
] as const;

/** Keys inside the `RecouvrementPage.espace.features` message namespace. */
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

/** Keys inside the `RecouvrementPage.espace.mock.rows` message namespace. */
export type EspaceRowKey =
  | "pieces"
  | "demeure"
  | "echeancier"
  | "injonction"
  | "execution";

/** Rows of the mock dossier, with the tone their status renders in. */
export const espaceRows: readonly {
  key: EspaceRowKey;
  tone: "done" | "waiting" | "todo";
}[] = [
  { key: "pieces", tone: "done" },
  { key: "demeure", tone: "done" },
  { key: "echeancier", tone: "waiting" },
  { key: "injonction", tone: "todo" },
  { key: "execution", tone: "todo" },
] as const;

/** Keys inside the `RecouvrementPage.faq.items` message namespace. */
export type FaqKey = "cout" | "insolvabilite" | "collective" | "international";

/** The one question the design draws expanded. */
export const faqExpandedKey = "cout" as const;

export const faqItems: readonly FaqKey[] = [
  "cout",
  "insolvabilite",
  "collective",
  "international",
] as const;
