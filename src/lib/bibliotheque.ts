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
