import { type DomaineKey, domaines } from "@/lib/domaines";

/**
 * The message paths a submenu label may use, spelled out as literals so the
 * typed catalogue still checks them — `t()` rejects a plain `string`, which is
 * the whole point of the typing in `global.d.ts`.
 */
type MessagePath =
  | `ExpertisesPage.domaines.items.${DomaineKey}.title`
  | "Nav.servicePage"
  | "Nav.articleDesign"
  | "Nav.ecommerce"
  | "Nav.newArticle";
import { isLive } from "@/lib/routes";

/** A sub-item under a primary nav entry. Plain data so it can cross into client components. */
export type NavChild = {
  key: string;
  href: string;
  /**
   * Full message path rather than a bare key: the submenu now serves more
   * than one parent, and their labels live in different namespaces.
   */
  labelKey: MessagePath;
};

/**
 * Domain pages that actually exist, in Domaines order. Derived from
 * `routes.ts`, so a domain appears here the moment its page lands and never
 * before — the menu only ever lists pages you can open.
 */
const expertiseChildren: readonly NavChild[] = [
  ...domaines
    .filter(({ href }) => isLive(href))
    .map(({ key, href }): NavChild => ({
      key,
      href,
      labelKey: `ExpertisesPage.domaines.items.${key}.title`,
    })),
  /*
    Service pages sit a level below a domain — this one's crumb reads
    Accueil · Expertises · Contentieux & arbitrage · Litiges entre associés —
    but the submenu is a flat list, so they are appended after the domains
    rather than nested. Same purpose as the rest of this menu: it exists so a
    page is reachable while it is being built.
  */
  ...(
    [
      {
        key: "servicePage",
        href: "/expertises/contentieux-arbitrage/service-page",
      },
    ] as const
  )
    .filter(({ href }) => isLive(href))
    .map(({ key, href }): NavChild => ({
      key,
      href,
      labelKey: `Nav.${key}` as const,
    })),
];

/**
 * Library pages that are not part of the design's own navigation. Like the
 * Expertises submenu, this exists so a page is reachable while it is being
 * built — the article detail page is a static design study, not a real
 * article route, so it is labelled as such rather than by its title.
 */
const bibliothequeChildren: readonly NavChild[] = (
  [
    { key: "articleDesign", href: "/bibliotheque/article-design" },
    { key: "ecommerce", href: "/bibliotheque/avocat-e-commerce" },
    { key: "newArticle", href: "/bibliotheque/new-article-page" },
  ] as const
)
  .filter(({ href }) => isLive(href))
  .map(({ key, href }) => ({ key, href, labelKey: `Nav.${key}` as const }));

/** Primary navigation, in the order shown in the design. */
export type NavItem = {
  /** Key inside the `Nav` message namespace. */
  key: "cabinet" | "expertises" | "bibliotheque" | "donneesOutils" | "actualites";
  /** Intended route. Not rendered — nothing on the site navigates yet. */
  href: string;
  /** Rendered as a dropdown in the header and nested in the mobile panel. */
  children?: readonly NavChild[];
  /** Key inside `Nav` for the dropdown toggle's screen-reader label. */
  submenuLabel?: "domainsLabel" | "libraryPagesLabel";
};

export const navItems: readonly NavItem[] = [
  { key: "cabinet", href: "/le-cabinet" },
  {
    key: "expertises",
    href: "/expertises",
    children: expertiseChildren,
    submenuLabel: "domainsLabel",
  },
  {
    key: "bibliotheque",
    href: "/bibliotheque",
    children: bibliothequeChildren,
    submenuLabel: "libraryPagesLabel",
  },
  { key: "donneesOutils", href: "/donnees-outils" },
  { key: "actualites", href: "/actualites" },
] as const;
