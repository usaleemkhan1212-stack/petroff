/** Primary navigation, in the order shown in the design. */
export type NavItem = {
  /** Key inside the `Nav` message namespace. */
  key: "cabinet" | "expertises" | "bibliotheque" | "donneesOutils" | "actualites";
  /** Intended route. Not rendered — nothing on the site navigates yet. */
  href: string;
};

export const navItems: readonly NavItem[] = [
  { key: "cabinet", href: "/le-cabinet" },
  { key: "expertises", href: "/expertises" },
  { key: "bibliotheque", href: "/bibliotheque" },
  { key: "donneesOutils", href: "/donnees-outils" },
  { key: "actualites", href: "/actualites" },
] as const;
