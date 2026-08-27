import BalanceScaleIcon from "@/assets/icons/balance-scale.svg";
import BellIcon from "@/assets/icons/bell.svg";
import LockIcon from "@/assets/icons/lock.svg";
import MonitorChartIcon from "@/assets/icons/monitor-chart.svg";
import ChainLinkIcon from "@/assets/icons/chain-link.svg";
import DatabaseIcon from "@/assets/icons/database.svg";
import EnvelopeIcon from "@/assets/icons/envelope.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import FolderIcon from "@/assets/icons/folder.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import LightbulbIcon from "@/assets/icons/lightbulb.svg";
import LightningBoltIcon from "@/assets/icons/lightning-bolt.svg";
import PeopleDisputeIcon from "@/assets/icons/people-dispute.svg";
import ShieldCheckIcon from "@/assets/icons/shield-check.svg";

/** Keys inside the `ContentieuxPage.hero.stats` message namespace. */
export const heroStats = ["urgence", "resolus", "langues", "reponse"] as const;

/** Keys inside the `ContentieuxPage.tools.items` message namespace. */
export const tools = ["diagnostic", "prescription", "couts", "suivi"] as const;

/** Keys inside the `ContentieuxPage.domaines.items` message namespace. */
export type MissionKey =
  | "strategie"
  | "referes"
  | "commercial"
  | "contractuels"
  | "associes"
  | "arbitrage"
  | "mediation"
  | "execution"
  | "defense";

export type Mission = {
  key: MissionKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Icon tile background — strict blue/gold alternation across the grid. */
  tone: "blue" | "gold" | "mint" | "pink";
  /*
    Figma grounds this one card's tag pill white where the other eight are
    lilas. Almost certainly a slip in the comp, but reproduced rather than
    tidied away — flagged to the designer.
  */
  whiteTag?: true;
};

export const missions: readonly Mission[] = [
  { key: "strategie", Icon: LightbulbIcon, tone: "blue" },
  { key: "referes", Icon: LightningBoltIcon, tone: "gold" },
  { key: "commercial", Icon: BalanceScaleIcon, tone: "mint" },
  { key: "contractuels", Icon: FileLinesIcon, tone: "pink" },
  { key: "associes", Icon: PeopleDisputeIcon, tone: "blue" },
  { key: "arbitrage", Icon: GlobeIcon, tone: "gold" },
  { key: "mediation", Icon: ChainLinkIcon, tone: "mint" },
  { key: "execution", Icon: DatabaseIcon, tone: "gold", whiteTag: true },
  { key: "defense", Icon: ShieldCheckIcon, tone: "pink" },
] as const;

/** Keys inside the `ContentieuxPage.prestations.items` message namespace. */
export type PrestationKey = "misesEnDemeure" | "injonctions" | "creances" | "veille";

export type Prestation = {
  key: PrestationKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /* Four tints since the redesign — blue, gold, pink, mint across the row. */
  tone: "blue" | "gold" | "mint" | "pink";
};

export const prestations: readonly Prestation[] = [
  { key: "misesEnDemeure", Icon: EnvelopeIcon, tone: "blue" },
  { key: "injonctions", Icon: FileLinesIcon, tone: "gold" },
  { key: "creances", Icon: FolderIcon, tone: "pink" },
  { key: "veille", Icon: BellIcon, tone: "mint" },
] as const;

/** Keys inside the `ContentieuxPage.forfaits.items` message namespace. */
export type ForfaitKey = "diagnostic" | "urgence" | "fond";

export type Forfait = {
  key: ForfaitKey;
  /** The gold-bordered middle plan carrying the badge. */
  featured?: true;
  /**
   * Figma sets the two outer plans' amounts at 40px and the featured middle
   * one at 30 — the inverse of the Contrats page, where only the third is
   * large. Do not carry one page's flag pattern to the other.
   */
  largePrice?: true;
  /** How many ✓ lines the plan lists. */
  features: number;
};

export const forfaits: readonly Forfait[] = [
  { key: "diagnostic", largePrice: true, features: 5 },
  { key: "urgence", featured: true, features: 5 },
  { key: "fond", largePrice: true, features: 5 },
] as const;

/** Keys inside the `ContentieuxPage.methode.items` message namespace, in order. */
export const methodeSteps = ["cadrage", "espace", "redaction", "signature"] as const;

/** Keys inside the `ContentieuxPage.espace.features` message namespace. */
export type EspaceFeatureKey = "avancement" | "coffre" | "alertes" | "langues";

export const espaceFeatures: readonly {
  key: EspaceFeatureKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /* Four tints since the redesign — blue, gold, pink, mint down the list. */
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "avancement", Icon: MonitorChartIcon, tone: "blue" },
  { key: "coffre", Icon: LockIcon, tone: "gold" },
  { key: "alertes", Icon: BellIcon, tone: "pink" },
  { key: "langues", Icon: GlobeIcon, tone: "mint"},
] as const;

/** How far the mock dossier has progressed, as a percentage of the bar. */
export const espaceProgress = 65;

/** Keys inside the `ContentieuxPage.espace.mock.rows` message namespace. */
export type EspaceRowKey =
  "questionnaire" | "statuts" | "signature" | "capital" | "greffe";

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

/** Keys inside the `ContentieuxPage.faq.items` message namespace. */
export type FaqKey = "transiger" | "cout" | "arbitrage" | "etranger";

/**
 * The one question the design draws expanded — and the only one with answer
 * copy. Kept as a literal so next-intl can type-check the answer key; the
 * other three genuinely have no answer in Figma yet, and TypeScript will fail
 * the moment someone tries to render one that does not exist.
 */
export const faqExpandedKey = "transiger" as const;

export const faqItems: readonly FaqKey[] = [
  "transiger",
  "cout",
  "arbitrage",
  "etranger",
] as const;
