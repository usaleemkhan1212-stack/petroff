import BalanceScaleIcon from "@/assets/icons/balance-scale.svg";
import BellIcon from "@/assets/icons/bell.svg";
import BookIcon from "@/assets/icons/book.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import DatabaseIcon from "@/assets/icons/database.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import LockIcon from "@/assets/icons/lock.svg";
import MagnifierIcon from "@/assets/icons/magnifier.svg";
import MonitorChartIcon from "@/assets/icons/monitor-chart.svg";
import NetworkNodesIcon from "@/assets/icons/network-nodes.svg";
import PaperPlaneIcon from "@/assets/icons/paper-plane.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import PersonIcon from "@/assets/icons/person.svg";
import ShieldCheckIcon from "@/assets/icons/shield-check.svg";

/** Keys inside the `SocialPage.tools.items` message namespace. */
export const tools = ["indemnites", "risque", "contrat", "agenda"] as const;

/**
 * Keys inside the `SocialPage.hero.stats` message namespace. Three, like the
 * Droit fiscal hero and unlike the first two domain pages' four.
 */
export const heroStats = ["contrat", "contentieux", "langues"] as const;

/** Keys inside the `SocialPage.domaines.items` message namespace. */
export type MissionKey =
  | "restructurations"
  | "prudhomal"
  | "negociation"
  | "dirigeants"
  | "ruptures"
  | "enquetes"
  | "epargne"
  | "mobilite"
  | "urssaf";

export type Mission = {
  key: MissionKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /**
   * Icon tile background, read card by card off the node's own export. **This
   * frame repeats a strict blue / gold / mint / pink cycle**, where Contentieux
   * and Droit fiscal deliberately break theirs — so the four tints are not a
   * single site-wide sequence. The card's CTA pill takes the same tint.
   */
  tone: "blue" | "gold" | "mint" | "pink";
};

export const missions: readonly Mission[] = [
  { key: "restructurations", Icon: NetworkNodesIcon, tone: "blue" },
  { key: "prudhomal", Icon: BalanceScaleIcon, tone: "gold" },
  { key: "negociation", Icon: PencilIcon, tone: "mint" },
  { key: "dirigeants", Icon: PersonIcon, tone: "pink" },
  { key: "ruptures", Icon: FileLinesIcon, tone: "blue" },
  { key: "enquetes", Icon: MagnifierIcon, tone: "gold" },
  { key: "epargne", Icon: DatabaseIcon, tone: "mint" },
  { key: "mobilite", Icon: PaperPlaneIcon, tone: "pink" },
  { key: "urssaf", Icon: ShieldCheckIcon, tone: "blue" },
] as const;

/** Keys inside the `SocialPage.prestations.items` message namespace. */
export type PrestationKey = "contrats" | "reglement" | "disciplinaire" | "audit";

export const prestations: readonly {
  key: PrestationKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /* Blue, gold, mint, pink — the Contrats order, not the Contentieux one. */
  tone: "blue" | "gold" | "mint" | "pink";
}[] = [
  { key: "contrats", Icon: FileLinesIcon, tone: "blue" },
  { key: "reglement", Icon: BookIcon, tone: "gold" },
  { key: "disciplinaire", Icon: CalendarIcon, tone: "mint" },
  { key: "audit", Icon: MonitorChartIcon, tone: "pink" },
] as const;

/** Keys inside the `SocialPage.methode.items` message namespace. */
export const methodeSteps = ["cadrage", "espace", "redaction", "signature"] as const;

/** Keys inside the `SocialPage.forfaits.items` message namespace. */
export type ForfaitKey = "contrat" | "rupture" | "hotline";

export type Forfait = {
  key: ForfaitKey;
  featured?: true;
  largePrice?: true;
};

/**
 * **A fourth large-price pattern, and the first that is uniform.** All three
 * price nodes measure 46 tall here — Poppins Bold 40 — where Contentieux runs
 * 40/30/40, Contrats 30/30/40 and Droit fiscal 40/30/30. Read the price
 * heights per frame; there is no site-wide rule.
 */
export const forfaits: readonly Forfait[] = [
  { key: "contrat", largePrice: true },
  { key: "rupture", featured: true, largePrice: true },
  { key: "hotline", largePrice: true },
] as const;

/** Keys inside the `SocialPage.espace.features` message namespace. */
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

/** Keys inside the `SocialPage.espace.mock.rows` message namespace. */
export type EspaceRowKey =
  | "strategie"
  | "courriers"
  | "entretien"
  | "protocole"
  | "solde";

/** Rows of the mock dossier, with the tone their status renders in. */
export const espaceRows: readonly {
  key: EspaceRowKey;
  tone: "done" | "waiting" | "todo";
}[] = [
  { key: "strategie", tone: "done" },
  { key: "courriers", tone: "done" },
  { key: "entretien", tone: "waiting" },
  { key: "protocole", tone: "todo" },
  { key: "solde", tone: "todo" },
] as const;

/** Keys inside the `SocialPage.faq.items` message namespace. */
export type FaqKey = "rupture" | "bareme" | "harcelement" | "mobilite";

/** The one question the design draws expanded. */
export const faqExpandedKey = "rupture" as const;

export const faqItems: readonly FaqKey[] = [
  "rupture",
  "bareme",
  "harcelement",
  "mobilite",
] as const;
