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

/** Keys inside the `SocietesPage.tools.items` message namespace. */
export const tools = ["calendrier", "dataRoom", "dilution", "nda"] as const;

/** Keys inside the `SocietesPage.hero.stats` message namespace. */
export type HeroStatKey = "delai" | "dataRoom" | "langues";

/** Three stats, all `text-h2` — every value node measures 46 in the frame. */
export const heroStats: readonly { key: HeroStatKey; small?: true }[] = [
  { key: "delai" },
  { key: "dataRoom" },
  { key: "langues" },
] as const;

/** Keys inside the `SocietesPage.domaines.items` message namespace. */
export type MissionKey =
  | "constitution"
  | "pactes"
  | "capital"
  | "gouvernance"
  | "dirigeants"
  | "secretariat"
  | "restructurations"
  | "groupes"
  | "dissolution";

export type Mission = {
  key: MissionKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Read card by card off the node's own export; the CTA pill takes the same tint. */
  tone: "blue" | "gold" | "mint" | "pink";
};

/**
 * Blue / gold / mint / pink, blue / gold / mint, gold / pink — the Contentieux
 * and Droit fiscal sequence, which breaks its cycle at card 8.
 *
 * **All nine icons match existing files at 0.0000**, three of them
 * (`rocket`, `chart-line-up`, `branch-split`) files the deleted M&A page had
 * just orphaned.
 */
export const missions: readonly Mission[] = [
  { key: "constitution", Icon: ShuffleArrowsIcon, tone: "blue" },
  { key: "pactes", Icon: MagnifierIcon, tone: "gold" },
  { key: "capital", Icon: FileLinesIcon, tone: "mint" },
  { key: "gouvernance", Icon: ShieldCheckIcon, tone: "pink" },
  { key: "dirigeants", Icon: RocketIcon, tone: "blue" },
  { key: "secretariat", Icon: ChartLineUpIcon, tone: "gold" },
  { key: "restructurations", Icon: GlobeIcon, tone: "mint" },
  { key: "groupes", Icon: BranchSplitIcon, tone: "gold" },
  { key: "dissolution", Icon: WarningTriangleIcon, tone: "pink" },
] as const;

/** Keys inside the `SocietesPage.prestations.items` message namespace. */
export type PrestationKey = "nda" | "housekeeping" | "formalites" | "intragroupe";

export const prestations: readonly {
  key: PrestationKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /* Blue, gold, mint, pink — the Contrats order. */
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "nda", Icon: FileLinesIcon, tone: "blue" },
  { key: "housekeeping", Icon: FolderIcon, tone: "gold" },
  { key: "formalites", Icon: RosetteCheckIcon, tone: "mint" },
  { key: "intragroupe", Icon: ChainLinkIcon, tone: "pink" },
] as const;

/** Keys inside the `SocietesPage.methode.items` message namespace. */
export const methodeSteps = ["cadrage", "espace", "redaction", "signature"] as const;

/** Keys inside the `SocietesPage.forfaits.items` message namespace. */
export type ForfaitKey = "vdd" | "seed" | "cession";

export type Forfait = {
  key: ForfaitKey;
  featured?: true;
  largePrice?: true;
};

/**
 * Prices **30 / 30 / 40** — the Contrats pattern, read from the frame's own
 * price node heights (34 = `text-price`, 46 = `text-h2`). The large one is
 * `Sur devis`, not an amount.
 */
export const forfaits: readonly Forfait[] = [
  { key: "vdd" },
  { key: "seed", featured: true },
  { key: "cession", largePrice: true },
] as const;

/** Keys inside the `SocietesPage.espace.features` message namespace. */
export type EspaceFeatureKey = "avancement" | "coffre" | "alertes" | "langues";

/** Blue, gold, pink, mint — sampled from the node's own render. */
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
 * Figma draws the bar 358 wide in the mock's 592.5 track — measured off the
 * node render, where it is periwinkle. That is 60.5%, the Contrats value.
 */
export const espaceProgress = 60.5;

/** Keys inside the `SocietesPage.espace.mock.rows` message namespace. */
export type EspaceRowKey = "dataroom" | "loi" | "diligence" | "spa" | "closing";

/** Rows of the mock dossier, with the tone their status renders in. */
export const espaceRows: readonly {
  key: EspaceRowKey;
  tone: "done" | "waiting" | "todo";
}[] = [
  { key: "dataroom", tone: "done" },
  { key: "loi", tone: "done" },
  { key: "diligence", tone: "waiting" },
  { key: "spa", tone: "todo" },
  { key: "closing", tone: "todo" },
] as const;

/** Keys inside the `SocietesPage.faq.items` message namespace. */
export type FaqKey = "creation" | "pacte" | "expertComptable" | "groupes";

/** The one question the design draws expanded. */
export const faqExpandedKey = "creation" as const;

export const faqItems: readonly FaqKey[] = [
  "creation",
  "pacte",
  "expertComptable",
  "groupes",
] as const;
