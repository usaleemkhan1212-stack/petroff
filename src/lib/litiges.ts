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

/** Keys inside the `LitigesPage.tools.items` message namespace. */
export const tools = ["calendrier", "dataRoom", "dilution", "nda"] as const;

/** Keys inside the `LitigesPage.hero.stats` message namespace. */
export type HeroStatKey = "refere" | "dataRoom" | "langues";

/** Three stats, all `text-h2` — every value node measures 46 in the frame. */
export const heroStats: readonly { key: HeroStatKey; small?: true }[] = [
  { key: "refere" },
  { key: "dataRoom" },
  { key: "langues" },
] as const;

/** Keys inside the `LitigesPage.domaines.items` message namespace. */
export type MissionKey =
  | "blocages"
  | "exclusion"
  | "revocation"
  | "expertise"
  | "responsabilite"
  | "nullites"
  | "urgence"
  | "sortie"
  | "dissolution";

export type Mission = {
  key: MissionKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Read card by card off the node's own export; the CTA pill takes the same tint. */
  tone: "blue" | "gold" | "mint" | "pink";
};

/**
 * Blue / gold / mint / pink, blue / gold / mint, gold / pink — the Contentieux
 * and Droit fiscal sequence, breaking its cycle at card 8.
 *
 * **The nine icons are the Droit des sociétés page's, in the same order and at
 * 0.0000** — this frame was built from that one, so its Domaines, Tools,
 * Prestations and Forfaits all reuse that page's glyphs and, in three sections,
 * its copy verbatim.
 */
export const missions: readonly Mission[] = [
  { key: "blocages", Icon: ShuffleArrowsIcon, tone: "blue" },
  { key: "exclusion", Icon: MagnifierIcon, tone: "gold" },
  { key: "revocation", Icon: FileLinesIcon, tone: "mint" },
  { key: "expertise", Icon: ShieldCheckIcon, tone: "pink" },
  { key: "responsabilite", Icon: RocketIcon, tone: "blue" },
  { key: "nullites", Icon: ChartLineUpIcon, tone: "gold" },
  { key: "urgence", Icon: GlobeIcon, tone: "mint" },
  { key: "sortie", Icon: BranchSplitIcon, tone: "gold" },
  { key: "dissolution", Icon: WarningTriangleIcon, tone: "pink" },
] as const;

/** Keys inside the `LitigesPage.prestations.items` message namespace. */
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

/** Keys inside the `LitigesPage.methode.items` message namespace. */
export const methodeSteps = ["cadrage", "espace", "redaction", "signature"] as const;

/** Keys inside the `LitigesPage.forfaits.items` message namespace. */
export type ForfaitKey = "vdd" | "seed" | "cession";

export type Forfait = {
  key: ForfaitKey;
  featured?: true;
  largePrice?: true;
};

/**
 * Prices **30 / 30 / 40** — read from the frame's own price node heights
 * (34 = `text-price`, 46 = `text-h2`). The large one is `Sur devis`.
 */
export const forfaits: readonly Forfait[] = [
  { key: "vdd" },
  { key: "seed", featured: true },
  { key: "cession", largePrice: true },
] as const;

/** Keys inside the `LitigesPage.espace.features` message namespace. */
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

/** Keys inside the `LitigesPage.espace.mock.rows` message namespace. */
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

/** Keys inside the `LitigesPage.faq.items` message namespace. */
export type FaqKey = "duree" | "exclusion" | "refereFond" | "majoriteMinorite";

/** The one question the design draws expanded. */
export const faqExpandedKey = "duree" as const;

export const faqItems: readonly FaqKey[] = [
  "duree",
  "exclusion",
  "refereFond",
  "majoriteMinorite",
] as const;
