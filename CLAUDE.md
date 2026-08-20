@AGENTS.md

# Petroff.law — build from Figma

Built from Figma one section at a time. The home page is complete; the
Expertises hub is in progress.

- **Figma file key:** `FOkn6jOmKh2I1YfbJUczBf`
- **Page frame:** `12843:882` ("Petroff.law — Home", 1920x5598)
- **URL:** https://www.figma.com/design/FOkn6jOmKh2I1YfbJUczBf/Mariela-Project-s--Copy-?node-id=12843-882&m=dev
- Requires the claude.ai **Figma** connector. It attaches at session start.

## Page 1 — Home (`/`), frame `12843:882`

Sections, in order:

| # | Section | Node ID | Status |
|---|---|---|---|
| 1 | Header | `12841:24111` | done |
| 2 | Hero | `12843:885` | done |
| 3 | SearchBand | `12843:887` | done |
| 4 | Expertises | `12843:889` | done |
| 5 | Bibliotheque | `12843:891` | done |
| 6 | OpenData | `12843:893` | done |
| 7 | Cabinet | `12843:895` | done |
| 8 | Actus | `12843:897` | done |
| 9 | CTAFinal | `12843:899` | done |
| 10 | Footer | `12843:901` | done |

All ten sections are built. Header and Footer live in
`src/app/[locale]/layout.tsx`, so every page gets them; the eight content
sections are in `page.tsx`.

## Page 2 — Expertises hub (`/expertises`), frame `12858:881`

1920x4081. Header and Footer are the shared ones from the layout.

| # | Section | Node ID | Status |
|---|---|---|---|
| 1 | Stage | `12855:29434` | done |
| 2 | Domaines | `12858:886` | done |
| 3 | Facons | `12858:888` | **next** |
| 4 | CTAFinal | `12858:890` | todo |

Its sections live in `src/components/sections/expertises/`, and its copy under
the `ExpertisesPage` message namespace. Home sections are still flat in
`src/components/sections/` — move them to a `home/` folder if that asymmetry
starts to grate.

Build one section per turn, then wait for approval before the next.

## Hard rules

- **Tokens only.** No hardcoded hex, no arbitrary font sizes, no one-off spacing.
  All colours and text styles live in `src/app/globals.css` under `@theme static`.
- If a Figma value has **no matching token, stop and ask** — never invent one.
  Tokens added this way so far: `--text-nav`, `--text-h2-sm`, `--radius-card`,
  `--radius-tile`, `--radius-field`, `--radius-panel`, `--container-page`.
- Sanctioned exceptions: hero/CTA ornament coordinates, the `1920px` ornament
  canvas, `border-[1.5px]`, and the em values on the hero highlight bar.
- **No absolute positioning for layout** — rebuild with flex/grid so it reflows.
  Decorative ornaments are the only exception (aria-hidden, hidden below `lg`).
- Card grids reflow 4 -> 2 -> 1; 3-up and 2-up grids reflow to 1.
- **Only live routes link.** `src/lib/routes.ts` lists the pages that exist;
  `MaybeLink` renders a real `Link` for those and an identically-styled
  `<span>` for everything else, so nothing can navigate to a 404. Add a path to
  `liveRoutes` the moment its page lands and every call site starts linking.
  Live today: `/` and `/expertises`.
- `Button` still has no `href` prop by design — wrap the call site in `Link`
  when a CTA needs to navigate. `LanguageSwitcher`'s `Link` branch is dead
  today (only `fr` is registered) and is the locale mechanism, not a route.

## Figma quota

The account now has a **Dev seat** (~200 read calls/day), up from the View
seat's 6/month that blocked this build earlier.

Still prefer **1 call per section**: `get_design_context` already returns the
asset URLs, so `curl` those rather than spending a second call on
`download_assets`.

## Workflow per section

1. Load the `figma-design-to-code` skill, then `get_design_context` on that
   section's node ID only — never the full page frame.
2. `curl` the asset URLs from that response immediately (they expire).
3. Render unknown icons to a PNG and name them for what they depict — every
   Figma layer is called "Frame".
4. Map every value to a token; ask about anything unmatched.
5. Build, then **measure the rendered DOM against the spec** by driving Chrome
   over CDP (`--remote-debugging-port`, `Emulation.setDeviceMetricsOverride`,
   `Runtime.evaluate`). Check for horizontal overflow at 1920/1280/768/375.
   Do not trust `--window-size` screenshots at narrow widths; they misreport.

## Conventions

- Sections: `src/components/sections/<Name>.tsx`, server components by default.
  `'use client'` only for the language switcher, SearchBand, OpenData SIREN
  lookup, and mobile nav.
- Primitives: `src/components/ui/` — `Container`, `Button`, `Card`, `Chip`,
  `SectionHeading`, `Logo`, `MaybeLink`. `SectionHeading` takes `leadClassName`
  for sections that design the lead wider than its default 640px measure.
  `Logo` takes `tone="onDark"` for the footer, which
  swaps only the wordmark to white; mark and tagline keep their brand colours.
  The footer logo parts are byte-identical to the header's, so one asset set
  serves both.
- `Container` is the shared 1245px **content** width; padding sits outside it.
- Text inputs use `type="text"`, never `type="search"`. Chrome's search
  decoration silently reserves ~15px inside the field and adds a cancel button
  once there is a value, which clipped the designed placeholder in both
  SearchBand and OpenData. Pair it with `text-ellipsis` so the tail truncates
  gracefully below the 1245px design width.
- Icons: SVGs in `src/assets/icons/`, kebab-case, imported as React components
  via SVGR. Colours are `currentColor` or `var(--color-*)` — never hex.
- **Rename every `clipPath` / gradient id on import.** Figma exports them as
  `clip0_0_N`, so two unrelated icons collide and `url(#id)` silently resolves
  to whichever renders first — the icon then disappears with correct size,
  position and computed fills, which makes it look like a CSS bug. Use the
  filename: `clip-columned-building`. `phone.svg` and `columned-building.svg`
  both shipped `clip0_0_4` and the second one vanished.
- Photos: `src/assets/images/`, stored at 3x the comp's box (the collage prints
  are 190x150, so 570x450) and served through `next/image` with explicit
  `width`/`height` plus `sizes`. Figma hands them over as multi-megabyte JPEGs
  named `.png`; resize before committing.
- Copy: French is the **source locale**, all strings in `messages/fr.json`.
  Keep accents and typographic apostrophes exactly as Figma has them.
- Always import `Link`/`useRouter` from `@/i18n/navigation`, never `next/link`.
- **`src/proxy.ts`'s matcher needs `\\.`, not `\.`.** In a JS string `"\."`
  is just `"."`, so the exclusion becomes `.*..*`, which matches every
  non-empty path and switches locale negotiation off for everything but `/`.
  With `localePrefix: "as-needed"` that 404s unprefixed routes such as
  `/expertises` while `/` keeps working, so it hides until a second route
  exists. Correct behaviour: `/` and `/expertises` serve French, `/fr` and
  `/fr/expertises` 307 to them.
- Adding a route? Its `PageProps<"...">` type only exists once Next has
  regenerated `.next/types/routes.d.ts`. A dev server started before the route
  existed keeps serving it while `tsc` still errors — run `next build` once.
- After moving or renaming routes, `rm -rf .next` — stale Turbopack caches
  cause panics and drop newly added Tailwind breakpoint variants.

## Known open items

- Intended routes, none of which exist or are linked yet: `/contact`,
  `/bibliotheque` (+ `/guides`, `/fiches`, `/modeles`), `/le-cabinet`,
  `/donnees-outils`, `/actualites`, `/expertises`, `/recherche`. `nav.ts` and
  `bibliotheque.ts` still carry them as data; nothing renders them.
- Language switcher renders EN/中文/ES as disabled — only `fr` is registered in
  `src/i18n/routing.ts`. They become links automatically when locales are added.
- The CTAFinal lead is the only place a phone number appears:
  "+ 33 (0) 1 78 90 46 46". It is plain text inside that sentence, not a
  `tel:` link, and the header phone control is still inert — wire them up
  together if that number is real.
- SearchBand submit and the OpenData SIREN form are inert placeholders. The
  popular chips prefill the search field instead of navigating.
- `gavel.svg` is a low-confidence name for the Contentieux icon.
- `scales-of-justice-wide.svg` (234x200) is the Expertises stage's export of
  the same scales as `scales-of-justice.svg` (220x200), which HeroOrnaments
  still uses. The x geometry is an exact 234/220 scale but the beam sits ~12px
  higher, so it is a separate file rather than a reuse.
- Figma's Expertises stage clips its own hero stats: the row is 816px inside an
  800px column, so the outer labels are cut in the comp. Here the stats sit
  outside that column, against the 1245px container, so all four fit.
- Same story in Domaines: the "Droit des sociétés" and "Propriété
  intellectuelle" tag rows are 356px and 348px against 353.7px of card width,
  so Figma clips the third tag. Here they wrap, which makes those rows ~46px
  taller than the comp's 328px.
- Domaines cards use `Card`, whose border is `encre/7`; Figma specifies
  `rgba(33,29,51,0.07)`. No token exists for #211D33 and the difference is
  imperceptible at 7%.
- Figma gives the first Domaines card a `0px 14px 17px rgba(0,0,0,0.1)` shadow
  — the same values as `Card`'s hover shadow, which supports reading these
  first-card shadows as the hover state. The Actus one (34px blur) is the
  outlier.
- Figma draws the first Actus card with a permanent
  `0px 14px 34px rgba(0,0,0,0.1)` shadow that the other two do not have —
  read as the designer showing the hover state. All three reuse `Card`, whose
  hover shadow is `0px 14px 17px`. Worth confirming which blur is intended.
- Multi-colour illustrations that duplicate an existing flat silhouette take a
  `-colour` suffix: `arc-de-triomphe-colour.svg`, `eiffel-tower-colour.svg` and
  `lawyer-robe-colour.svg` sit beside the single-colour originals, which
  HeroOrnaments still uses.
- CTAFinal keeps the panel's designed 48px side padding at every width, which
  is heavy on a 335px phone panel (239px of content). Figma only specifies
  desktop; worth reducing below `sm` if it reads too tight.
- The footer link columns are a grid while stacked and a flex row from `xl`.
  Equal grid tracks would force the third column to the same 232px as the
  first two, but Figma leaves it at content width — that is what puts the
  group where the comp has it (nav 711.7px wide against Figma's ~714).
- The Cabinet collage appears from `xl` only. Its stage is 548px wide, so at
  `lg` the second photo print would be cut. Its captions repeat the heading and
  lead, so nothing is lost when it is hidden.
- French thousands separators use a narrow no-break space (U+202F)
  ("2 400+", "552 032 534", "+4 %"). Figma's exact code point could not be read
  back from the API response, so this is a choice, not a verified copy.
