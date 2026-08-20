import { type DomaineKey, domaines } from "@/lib/domaines";
import { isLive } from "@/lib/routes";

/** A sub-item under a primary nav entry. Plain data so it can cross into client components. */
export type NavChild = {
  /** Key inside the `ExpertisesPage.domaines.items` message namespace. */
  key: DomaineKey;
  href: string;
};

/**
 * Domain pages that actually exist, in Domaines order. Derived from
 * `routes.ts`, so a domain appears here the moment its page lands and never
 * before — the menu only ever lists pages you can open.
 */
const expertiseChildren: readonly NavChild[] = domaines
  .filter(({ href }) => isLive(href))
  .map(({ key, href }) => ({ key, href }));

/** Primary navigation, in the order shown in the design. */
export type NavItem = {
  /** Key inside the `Nav` message namespace. */
  key: "cabinet" | "expertises" | "bibliotheque" | "donneesOutils" | "actualites";
  /** Intended route. Not rendered — nothing on the site navigates yet. */
  href: string;
  /** Rendered as a dropdown in the header and nested in the mobile panel. */
  children?: readonly NavChild[];
};

export const navItems: readonly NavItem[] = [
  { key: "cabinet", href: "/le-cabinet" },
  { key: "expertises", href: "/expertises", children: expertiseChildren },
  { key: "bibliotheque", href: "/bibliotheque" },
  { key: "donneesOutils", href: "/donnees-outils" },
  { key: "actualites", href: "/actualites" },
] as const;
