import CalendarIcon from "@/assets/icons/calendar.svg";
import PhaseBarsIcon from "@/assets/icons/phase-bars.svg";
import StarIcon from "@/assets/icons/star.svg";

/** Keys inside the `ExpertisesPage.facons.items` message namespace. */
export type FaconKey = "abonnement" | "forfaits" | "phases";

export type Facon = {
  key: FaconKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Icon tile background — blue, gold, blue across the row. */
  tone: "blue" | "gold";
  /** Intended route. Not rendered until the page exists — see `routes.ts`. */
  href: string;
};

export const facons: readonly Facon[] = [
  { key: "abonnement", Icon: CalendarIcon, tone: "blue", href: "/abonnements" },
  { key: "forfaits", Icon: StarIcon, tone: "gold", href: "/forfaits" },
  { key: "phases", Icon: PhaseBarsIcon, tone: "blue", href: "/methode" },
] as const;
