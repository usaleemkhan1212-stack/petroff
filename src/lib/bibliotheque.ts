import BalanceScaleIcon from "@/assets/icons/balance-scale.svg";
import EnvelopeIcon from "@/assets/icons/envelope.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import HouseIcon from "@/assets/icons/house.svg";
import PeoplePairIcon from "@/assets/icons/people-pair.svg";
import PercentIcon from "@/assets/icons/percent.svg";
import PersonIcon from "@/assets/icons/person.svg";
import RosetteCheckIcon from "@/assets/icons/rosette-check.svg";
import ShuffleArrowsIcon from "@/assets/icons/shuffle-arrows.svg";
import advisorsRoundTable from "@/assets/images/advisors-round-table.jpg";
import foundersMeeting from "@/assets/images/founders-meeting.jpg";
import readingOutdoors from "@/assets/images/reading-outdoors.jpg";

/** Keys inside the `Bibliotheque.collections` message namespace. */
export type CollectionKey = "guides" | "fiches" | "modeles";

export type Collection = {
  key: CollectionKey;
  /** Intended route. Not rendered — nothing on the site navigates yet. */
  href: string;
};

/** The three library collections, in the order shown in the design. */
export const collections: readonly Collection[] = [
  { key: "guides", href: "/bibliotheque/guides" },
  { key: "fiches", href: "/bibliotheque/fiches" },
  { key: "modeles", href: "/bibliotheque/modeles" },
] as const;

/**
 * Quick-search suggestions under the Bibliotheque hero's search box. Keys
 * inside the `BibliothequePage.hero.suggestions` message namespace.
 */
export const heroSuggestions = [
  "associe",
  "impaye",
  "forme",
  "marque",
  "bail",
] as const;

/**
 * One library content. Its labels live under `BibliothequePage.contents`, so
 * the Vitrine carousel and the Resultats grid render the same entry from one
 * string set — only their meta lines differ, since Resultats drops the date.
 */
export type ContentKey =
  | "signature"
  | "exclusion"
  | "filiale"
  | "cession"
  | "recouvrement"
  | "bail"
  | "marque"
  | "garantie";

/** Keys inside `BibliothequePage.domains` — the nine actions of the taxonomy. */
export type ContentDomain =
  | "creer"
  | "vendre"
  | "acheter"
  | "payer"
  | "locaux"
  | "marque"
  | "implanter";

/** Keys inside `BibliothequePage.types`. `modele` has no content yet. */
export type ContentType = "guide" | "fiche" | "modele";

export type Content = {
  key: ContentKey;
  domain: ContentDomain;
  type: ContentType;
};

export const contents: readonly Content[] = [
  { key: "signature", domain: "vendre", type: "fiche" },
  { key: "exclusion", domain: "creer", type: "guide" },
  { key: "filiale", domain: "implanter", type: "guide" },
  { key: "cession", domain: "acheter", type: "guide" },
  { key: "recouvrement", domain: "payer", type: "guide" },
  { key: "bail", domain: "locaux", type: "guide" },
  { key: "marque", domain: "marque", type: "guide" },
  { key: "garantie", domain: "acheter", type: "fiche" },
] as const;

export const contentByKey = new Map(contents.map((c) => [c.key, c]));

/**
 * The carousel's contents. Figma draws three in the Vitrine itself; the other
 * five are the distinct library cards its own Resultats section lists, so the
 * carousel pages through real design copy rather than invented entries. Eight
 * items at three per view is three pages, which is what the comp's dot row
 * shows. Their photos cycle the three the Vitrine supplies.
 */
export const vitrineItems: readonly { key: ContentKey; photo: typeof readingOutdoors }[] = [
  { key: "signature", photo: readingOutdoors },
  { key: "exclusion", photo: foundersMeeting },
  { key: "filiale", photo: advisorsRoundTable },
  { key: "cession", photo: foundersMeeting },
  { key: "recouvrement", photo: readingOutdoors },
  { key: "bail", photo: advisorsRoundTable },
  { key: "marque", photo: readingOutdoors },
  { key: "garantie", photo: advisorsRoundTable },
] as const;

/**
 * The six contents Figma draws in the Resultats grid, in its order. Left
 * un-annotated on purpose: the literal tuple type is what lets next-intl
 * check `resultats.meta.<key>`, which only carries these six.
 */
export const resultatsItems = [
  "exclusion",
  "cession",
  "recouvrement",
  "bail",
  "marque",
  "garantie",
] as const;

/** Tabs above the grid, in the order the comp shows them. */
export const contentTypes: readonly ContentType[] = ["guide", "fiche", "modele"] as const;

/** Category select options, in taxonomy order. */
export const contentDomains: readonly ContentDomain[] = [
  "creer",
  "vendre",
  "acheter",
  "payer",
  "locaux",
  "marque",
  "implanter",
] as const;

/**
 * The nine taxonomy actions, in the order the ParCategorie grid draws them.
 * Note this set is not `ContentDomain`: the contents' pills include
 * "S’implanter en France", which is not one of the nine, and two of the nine
 * carry a longer title here than the pills use.
 */
export type CategoryKey =
  | "creer"
  | "vendre"
  | "acheter"
  | "marque"
  | "recruter"
  | "locaux"
  | "fiscal"
  | "litiges"
  | "payer";

export const categories: readonly {
  key: CategoryKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Icon tile background — strict blue/gold alternation across the grid. */
  tone: "blue" | "gold";
  /** How many subcategory pills the tile carries. */
  tags: number;
}[] = [
  { key: "creer", Icon: PersonIcon, tone: "blue", tags: 5 },
  { key: "vendre", Icon: FileLinesIcon, tone: "gold", tags: 4 },
  { key: "acheter", Icon: ShuffleArrowsIcon, tone: "blue", tags: 4 },
  { key: "marque", Icon: RosetteCheckIcon, tone: "gold", tags: 4 },
  { key: "recruter", Icon: PeoplePairIcon, tone: "blue", tags: 4 },
  { key: "locaux", Icon: HouseIcon, tone: "gold", tags: 4 },
  { key: "fiscal", Icon: PercentIcon, tone: "blue", tags: 4 },
  { key: "litiges", Icon: BalanceScaleIcon, tone: "gold", tags: 4 },
  { key: "payer", Icon: EnvelopeIcon, tone: "blue", tags: 4 },
] as const;

/** Keys inside the `BibliothequePage.parcours.items` message namespace. */
export const parcoursItems = ["creer", "lever", "recouvrer"] as const;

/** Keys inside the `BibliothequePage.vivante.items` message namespace. */
export const vivanteItems = ["finances", "suretes", "earnout"] as const;
