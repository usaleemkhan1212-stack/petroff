import BalanceScaleIcon from "@/assets/icons/balance-scale.svg";
import BellIcon from "@/assets/icons/bell.svg";
import BookIcon from "@/assets/icons/book.svg";
import BriefcaseIcon from "@/assets/icons/briefcase.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import FolderIcon from "@/assets/icons/folder.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import HouseIcon from "@/assets/icons/house.svg";
import LightningBoltIcon from "@/assets/icons/lightning-bolt.svg";
import LockIcon from "@/assets/icons/lock.svg";
import MapFoldedIcon from "@/assets/icons/map-folded.svg";
import MonitorChartIcon from "@/assets/icons/monitor-chart.svg";
import NetworkNodesIcon from "@/assets/icons/network-nodes.svg";
import OfficeBuildingIcon from "@/assets/icons/office-building.svg";
import RefreshArrowsIcon from "@/assets/icons/refresh-arrows.svg";
import UsersIcon from "@/assets/icons/users.svg";

/** Keys inside the `ImmobilierPage.tools.items` message namespace. */
export const tools = ["indexation", "echeancier", "droitAuBail", "checklist"] as const;

/** Keys inside the `ImmobilierPage.hero.stats` message namespace. */
export type HeroStatKey = "echeances" | "indexation" | "vefa";

/**
 * **The first hero whose stats are not all one size.** Figma sets `ILC / ILAT`
 * at 28 — Petroff/Stat — where the other two are 40, because the string is far
 * longer than a figure. Carried per stat rather than derived.
 */
export const heroStats: readonly { key: HeroStatKey; small?: true }[] = [
  { key: "echeances" },
  { key: "indexation", small: true },
  { key: "vefa" },
] as const;

/** Keys inside the `ImmobilierPage.domaines.items` message namespace. */
export type MissionKey =
  | "baux"
  | "renouvellement"
  | "cessions"
  | "acquisitions"
  | "construction"
  | "copropriete"
  | "montages"
  | "urbanisme"
  | "contentieux";

export type Mission = {
  key: MissionKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Read card by card off the node's own export. The CTA pill takes the same tint. */
  tone: "blue" | "gold" | "mint" | "pink";
};

export const missions: readonly Mission[] = [
  { key: "baux", Icon: FileLinesIcon, tone: "blue" },
  { key: "renouvellement", Icon: RefreshArrowsIcon, tone: "gold" },
  { key: "cessions", Icon: BriefcaseIcon, tone: "pink" },
  { key: "acquisitions", Icon: HouseIcon, tone: "mint" },
  { key: "construction", Icon: OfficeBuildingIcon, tone: "blue" },
  { key: "copropriete", Icon: UsersIcon, tone: "gold" },
  { key: "montages", Icon: NetworkNodesIcon, tone: "blue" },
  { key: "urbanisme", Icon: MapFoldedIcon, tone: "mint" },
  { key: "contentieux", Icon: BalanceScaleIcon, tone: "pink" },
] as const;

/** Keys inside the `ImmobilierPage.prestations.items` message namespace. */
export type PrestationKey = "modeles" | "relecture" | "traductions" | "contratheque";

/**
 * **This section is the Contrats page's, verbatim** — same four cards, same
 * copy, same tags, same icons and the same blue/gold/mint/pink tints. It is a
 * leftover from the duplicated frame, like the layer names; built as drawn and
 * flagged rather than invented around.
 */
export const prestations: readonly {
  key: PrestationKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "modeles", Icon: BookIcon, tone: "blue" },
  { key: "relecture", Icon: LightningBoltIcon, tone: "gold" },
  { key: "traductions", Icon: GlobeIcon, tone: "mint" },
  { key: "contratheque", Icon: FolderIcon, tone: "pink" },
] as const;

/** Keys inside the `ImmobilierPage.methode.items` message namespace. */
export const methodeSteps = ["cadrage", "espace", "redaction", "signature"] as const;

/** Keys inside the `ImmobilierPage.forfaits.items` message namespace. */
export type ForfaitKey = "bail" | "conge" | "audit";

export type Forfait = {
  key: ForfaitKey;
  featured?: true;
  largePrice?: true;
};

/**
 * Prices 30 / 40 / 40 — a **fifth** pattern, after Contentieux 40/30/40,
 * Contrats and M&A 30/30/40, Droit fiscal 40/30/30 and Droit social 40/40/40.
 * Read the price nodes' heights per frame; there is no site-wide rule.
 */
export const forfaits: readonly Forfait[] = [
  { key: "bail" },
  { key: "conge", featured: true, largePrice: true },
  { key: "audit", largePrice: true },
] as const;

/** Keys inside the `ImmobilierPage.espace.features` message namespace. */
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

/** Keys inside the `ImmobilierPage.espace.mock.rows` message namespace. */
export type EspaceRowKey =
  | "audit"
  | "negociation"
  | "contreProjet"
  | "annexes"
  | "signature";

/** Rows of the mock dossier, with the tone their status renders in. */
export const espaceRows: readonly {
  key: EspaceRowKey;
  tone: "done" | "waiting" | "todo";
}[] = [
  { key: "audit", tone: "done" },
  { key: "negociation", tone: "done" },
  { key: "contreProjet", tone: "waiting" },
  { key: "annexes", tone: "todo" },
  { key: "signature", tone: "todo" },
] as const;

/** Keys inside the `ImmobilierPage.faq.items` message namespace. */
export type FaqKey = "conge" | "loyer" | "eviction" | "investisseurs";

/** The one question the design draws expanded. */
export const faqExpandedKey = "conge" as const;

export const faqItems: readonly FaqKey[] = [
  "conge",
  "loyer",
  "eviction",
  "investisseurs",
] as const;
