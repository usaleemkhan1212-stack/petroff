import BuildingIcon from "@/assets/icons/building.svg";
import DatabaseIcon from "@/assets/icons/database.svg";
import DocumentIcon from "@/assets/icons/document.svg";
import GavelIcon from "@/assets/icons/gavel.svg";
import OfficeBuildingIcon from "@/assets/icons/office-building.svg";
import PeopleDisputeIcon from "@/assets/icons/people-dispute.svg";
import PercentIcon from "@/assets/icons/percent.svg";
import RegisteredTrademarkIcon from "@/assets/icons/registered-trademark.svg";
import ShuffleArrowsIcon from "@/assets/icons/shuffle-arrows.svg";
import TrendingUpIcon from "@/assets/icons/trending-up.svg";
import UsersIcon from "@/assets/icons/users.svg";

/** Keys inside the `ExpertisesPage.domaines.items` message namespace. */
export type DomaineKey =
  | "societes"
  | "fusions"
  | "capitalRisque"
  | "contrats"
  | "contentieux"
  | "litigesAssocies"
  | "propriete"
  | "social"
  | "fiscal"
  | "immobilier"
  | "recouvrement";

export type Domaine = {
  key: DomaineKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /*
    Icon tile background. Four tints since the redesign, and the sequence does
    not repeat — blue / gold / mint / pink, then mint / blue / gold / blue,
    then pink / mint / gold — so it is carried per domain rather than derived
    from the index. Sampled tile by tile from the node render.
  */
  tone: "blue" | "gold" | "mint" | "pink";
  /** Intended route. Not rendered until the page exists — see `routes.ts`. */
  href: string;
};

export const domaines: readonly Domaine[] = [
  {
    key: "societes",
    Icon: OfficeBuildingIcon,
    tone: "blue",
    href: "/expertises/droit-des-societes",
  },
  {
    key: "fusions",
    Icon: ShuffleArrowsIcon,
    tone: "gold",
    href: "/expertises/fusions-acquisitions",
  },
  {
    key: "capitalRisque",
    Icon: TrendingUpIcon,
    tone: "mint",
    href: "/expertises/capital-risque",
  },
  {
    key: "contrats",
    Icon: DocumentIcon,
    tone: "pink",
    href: "/expertises/contrats-commerciaux",
  },
  {
    key: "contentieux",
    Icon: GavelIcon,
    tone: "mint",
    href: "/expertises/contentieux-arbitrage",
  },
  {
    key: "litigesAssocies",
    Icon: PeopleDisputeIcon,
    tone: "blue",
    href: "/expertises/litiges-entre-associes",
  },
  {
    key: "propriete",
    Icon: RegisteredTrademarkIcon,
    tone: "gold",
    href: "/expertises/propriete-intellectuelle",
  },
  { key: "social", Icon: UsersIcon, tone: "blue", href: "/expertises/droit-social" },
  { key: "fiscal", Icon: PercentIcon, tone: "pink", href: "/expertises/droit-fiscal" },
  {
    key: "immobilier",
    Icon: BuildingIcon,
    tone: "mint",
    href: "/expertises/immobilier-entreprise",
  },
  {
    key: "recouvrement",
    Icon: DatabaseIcon,
    tone: "gold",
    href: "/expertises/recouvrement",
  },
] as const;
