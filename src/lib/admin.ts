/**
 * The admin's own navigation model.
 *
 * Its vocabulary is the site's, not a generic CMS's: "Articles" rather than
 * blog posts, because the Bibliotheque holds guides, fiches & FAQ and modeles;
 * and the page families are the ones this site actually has — Expertises,
 * service pages, lawyer pages and the four legal documents.
 */
export type SectionKey =
  | "dashboard"
  | "enquiries"
  | "pages"
  | "articles"
  | "media"
  | "settings"
  | "redirects";

export type IconKey =
  | "grid"
  | "inbox"
  | "doc"
  | "article"
  | "image"
  | "gear"
  | "redirect";

export const SECTION_TITLES: Record<SectionKey, string> = {
  dashboard: "Dashboard",
  enquiries: "Contact Enquiries",
  pages: "Pages",
  articles: "Articles",
  media: "Media Library",
  settings: "Global Settings",
  redirects: "Redirects",
};

export type NavEntry = {
  key: SectionKey;
  icon: IconKey;
  /** Rendered as an expandable list under the entry, as the live shell does. */
  children?: string[];
};

export const NAV_GROUPS: { label: string; items: NavEntry[] }[] = [
  {
    label: "Overview",
    items: [
      { key: "dashboard", icon: "grid" },
      { key: "enquiries", icon: "inbox" },
    ],
  },
  {
    label: "Content",
    items: [
      {
        key: "pages",
        icon: "doc",
        children: [
          "All pages",
          "Expertise pages",
          "Service pages",
          "Lawyer pages",
          "Legal pages",
          "Other pages",
        ],
      },
      { key: "articles", icon: "article" },
    ],
  },
  { label: "Library", items: [{ key: "media", icon: "image" }] },
  {
    label: "Configuration",
    items: [
      { key: "settings", icon: "gear" },
      { key: "redirects", icon: "redirect" },
    ],
  },
];

/** The dashboard's shortcut grid, in the comp's order. */
export const QUICK_ACTIONS: {
  key: SectionKey;
  icon: IconKey;
  note: string;
}[] = [
  { key: "enquiries", icon: "inbox", note: "Website form submissions" },
  { key: "pages", icon: "doc", note: "Edit page content & blocks" },
  { key: "articles", icon: "article", note: "Guides, fiches & modèles" },
  { key: "media", icon: "image", note: "Images & files" },
  { key: "settings", icon: "gear", note: "Site-wide configuration" },
  { key: "redirects", icon: "redirect", note: "Moved and retired URLs" },
];

/** Shared by the dashboard card and the Redirects summary. */
export const REDIRECT_STATS = [
  "Total redirects",
  "Renamed",
  "Deleted",
  "Merged",
  "Manual",
];

/**
 * Counts render as a middle dot until an API answers — which is exactly what
 * the live sidebar shows before its first response, so the prototype does not
 * imply data it does not have.
 */
export const PENDING = "·";
