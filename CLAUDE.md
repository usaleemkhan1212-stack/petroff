@AGENTS.md

# Petroff.law — build from Figma

Built from Figma one section at a time. All three pages are complete: the home
page, the Expertises hub, and the Contentieux & arbitrage domain page.

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
| 3 | Facons | `12858:888` | done |
| 4 | CTAFinal | `12858:890` | done |

All four sections are built. Its sections live in
`src/components/sections/expertises/`, and its copy under the `ExpertisesPage`
message namespace. Note `expertises/CTAFinal.tsx` shares its component name
with the home `sections/CTAFinal.tsx` — different copy, ornaments and padding,
so they are deliberately two files. Home sections are still flat in
`src/components/sections/` — move them to a `home/` folder if that asymmetry
starts to grate.

Build one section per turn, then wait for approval before the next.

## Page 3 — Contentieux & arbitrage (`/expertises/contentieux-arbitrage`), frame `12870:881`

1920x8374, the first domain detail page. Header and Footer come from the
layout. `domaines.ts` already pointed the Contentieux card here, so adding the
path to `liveRoutes` made that card's "Découvrir" a real link.

| # | Section | Node ID | Status |
|---|---|---|---|
| 1 | Hero | `12870:884` | done |
| 2 | Domaines | `12855:29957` | done |
| 3 | Tools | `12870:888` | done |
| 4 | Prestations | `12870:890` | done |
| 5 | Forfaits | `12870:892` | done |
| 6 | MidCTA | `12883:886` | done |
| 7 | Methode | `12870:894` | done |
| 8 | Espace | `12870:896` | done |
| 9 | Bib | `12870:898` | done |
| 10 | FAQ | `12870:900` | done |
| 11 | CTAFinal | `12870:902` | done |

All eleven sections are built. They live in
`src/components/sections/contentieux/`, and their copy under the
`ContentieuxPage` message namespace.

`get_metadata` on the page frame is the cheap way to get this table — it
returned 63k characters, over the tool's limit, but the response is saved to a
file and `grep -nE '^  <(frame|instance)' ` on it lists exactly the top-level
sections.

## Hard rules

- **Tokens only.** No hardcoded hex, no arbitrary font sizes, no one-off spacing.
  All colours and text styles live in `src/app/globals.css` under `@theme static`.
- If a Figma value has **no matching token, stop and ask** — never invent one.
  Tokens added this way so far: `--text-nav`, `--text-h2-sm`, `--radius-card`,
  `--radius-tile`, `--radius-field`, `--radius-panel`, `--container-page`,
  `--text-badge` (Poppins Bold 16 / 0.08em, Tools' uppercase card badges),
  `--radius-note` (10px, Tools' inset result panels), `--text-body-strong`
  (Inter SemiBold 18/1.5 — Figma's "Petroff/Body 18 strong", the FAQ questions)
  and `--text-price`
  (Poppins Bold 30 — Figma's own "Petroff/Price", the forfait amounts; added
  under the `--text-badge` precedent rather than re-asking, since it is the
  same case: a named Figma style with no matching token).
- **A new `--text-*` token must also be registered in `cn`'s font-size group**
  in `src/lib/utils.ts`. They look like colour utilities to tailwind-merge,
  which silently strips them the moment a text colour is merged in.
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

`whoami` reports seat `View` on the `starter` tier, but the account does have
Dev access — confirmed by the user, and the calls go through. Ignore what
`whoami` says about the seat; it does not reflect the real quota.

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
   **Do not test overflow with `scrollWidth > window.innerWidth`.** When content
   overflows on an emulated mobile viewport the layout viewport *expands* to fit
   it — `innerWidth` read 463 on a 375 emulation — so the comparison is against
   the already-broken width and always passes. Compare against the width you
   emulated instead, and exclude the sanctioned `w-[1920px]` ornament canvas.

## Conventions

- Sections: `src/components/sections/<Name>.tsx`, server components by default.
  `'use client'` only for the language switcher, SearchBand, OpenData SIREN
  lookup, mobile nav, and the Expertises dropdown.
- Primitives: `src/components/ui/` — `Container`, `Button`, `Card`, `Chip`,
  `SectionHeading`, `Logo`, `MaybeLink`. `SectionHeading` takes `leadClassName`
  for sections that design the lead wider than its default 640px measure.
  `Logo` takes `tone="onDark"` for the footer, which
  swaps only the wordmark to white; mark and tagline keep their brand colours.
  The footer logo parts are byte-identical to the header's, so one asset set
  serves both.
- `Container` is the shared 1245px **content** width; padding sits outside it.
- **The Expertises nav entry has a domain submenu.** It is not in Figma — it
  exists so the domain pages are reachable while they are being built.
  `nav.ts` builds it from `domaines.ts` filtered by `isLive`, taking `key` and
  `href` only so no icon components cross into the client bundle. **It lists
  only pages that exist** — never placeholders for unbuilt ones. Adding a path
  to `liveRoutes` is all it takes for its domain to appear; until then the
  submenu simply does not carry it, and with no live domains the dropdown does
  not render at all. `ExpertisesMenu` (desktop) and `MobileNav` (indented list)
  both label entries from `ExpertisesPage.domaines.items.*.title` rather than
  duplicating the names.
- `MaybeLink` forwards extra props to **both** branches. It used to drop them on
  the `Link` branch, so `MobileNav`'s `onClick` never fired for live routes and
  the panel stayed open after navigating.
- The header is `z-30`. Every content section below it is positioned, so
  without it the mobile panel and the dropdown paint *underneath* the page —
  which looked like the menu was not rendering at all.
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
  `/donnees-outils`, `/actualites`, `/recherche`, plus Facons' `/abonnements`,
  `/forfaits` and `/methode`. `nav.ts`, `bibliotheque.ts` and `facons.ts` carry
  them as data; `MaybeLink` renders them as spans until the pages land.
- Language switcher renders EN/中文/ES as disabled — only `fr` is registered in
  `src/i18n/routing.ts`. They become links automatically when locales are added.
- The phone number "+ 33 (0) 1 78 90 46 46" appears in two places: the home
  CTAFinal lead and the Expertises CTAFinal's second lead line (`contact`).
  Both are plain text, not `tel:` links, and the header phone control is still
  inert — wire all three up together if that number is real. Its spaces are
  ordinary, unlike the U+202F in "24 h".
- SearchBand submit and the OpenData SIREN form are inert placeholders. The
  popular chips prefill the search field instead of navigating.
- **There are now three CTAFinal components** — home, Expertises, Contentieux —
  and the last two have **character-identical copy**. `ContentieuxPage.ctaFinal`
  is a verbatim copy of `ExpertisesPage.ctaFinal`. Every remaining domain page
  will want the same block, so promote it to a shared `ContactCta` namespace
  rather than making an eleventh copy.
- **Their panel gaps differ**: 12px on Contentieux, 16px on Expertises. Copying
  the sibling's `gap-4` put this one's buttons 16px low — four gaps × 4px.
  Check the gap per panel; do not assume the CTAFinals agree.
- `scales-of-justice-sm.svg` (150x150) is a third size of that glyph beside
  `scales-of-justice.svg` (220x200) and `-wide.svg` (234x200), for the same
  reason the arc has three: `stroke-width: 4` is left unscaled, so rendering
  the 220-wide file at 150 would draw a ~2.7px stroke instead of 4px. Its
  building ornament reuses `columned-building.svg` at 180x135, exactly as the
  home CTAFinal does.
- **FAQ is a real accordion**: native `<details>`/`<summary>` sharing a `name`,
  so the group is exclusive and it needs no JavaScript — the section stays a
  server component. `faqExpandedKey` sets the one open by default, matching the
  comp. Verified by driving it: mouse, Enter and Space all toggle, summaries
  are tabbable, and closed answers are genuinely hidden.
- **Three of its four answers are drafts, not Figma copy.** Figma only supplies
  an answer for the first question; a working accordion needs all four, so the
  other three were composed strictly from facts already stated on this page
  (the Forfaits prices, the arbitrage/exequatur scope, the four languages). No
  new figures or legal claims were invented. **These need the firm's sign-off
  before launch** — they are client-facing legal copy.
- **The FAQ panel slides open with no JavaScript.** A closed `<details>` panel
  is `display: none`, so nothing can transition it; `::details-content` is the
  element browsers expose for exactly that, and `interpolate-size:
  allow-keywords` (set on `:root`) makes the auto height interpolable. Both
  live in the `components` layer of `globals.css` as `.details-panel`.
  Browsers without `::details-content` toggle instantly — no regression.
  Honours `prefers-reduced-motion`: measured 15 distinct heights normally,
  1 under reduce.
- Its marker is **one ▸ rotated 90°**, not Figma's separate ▸/▾ glyphs, so it
  turns with the panel instead of snapping. A filled ▸ turned 90° reads as ▾.
- Testing `<details>` over CDP, three traps that each produced a false failure:
  `getBoundingClientRect().height` does *not* reflect a closed panel — use
  `checkVisibility()`; a bare `keyDown` will not activate a summary — dispatch
  `rawKeyDown` + `char` + `keyUp`; and Tailwind v4 rotates via the standalone
  `rotate` property, so `transform` reads `none` on a rotated element — check
  `rotate`.
- Its illustration is a rectangular 312.5x400 `paris-scene.svg` clipped into an
  arch by its container: `rounded-t-full` resolves to exactly the 156.25px
  Figma specifies for a 312.5-wide box. `laurel-branch` and `sparkle` are
  reused. The laurel deliberately sits outside the 383px box to the lower
  right, so the section is `overflow-hidden`: it shows fully from ~1290px up
  and clips below, and the whole composition is hidden under `lg`.
- **Figma's FAQ frame is 1878 wide, not 1920** — it auto-sized to the bleeding
  laurel. So only *y* positions are comparable between its render and a 1920
  viewport; the illustration sits 42px further right here, exactly the frame
  difference.
- Bib reuses `collections` from `bibliotheque.ts` — the home Bibliotheque
  section lists the same three keys and routes, so the counts and copy differ
  per page but the routes cannot drift. Its big numbers are `text-h2` in
  `periwinkle`, not a new token.
- Espace is the page's first **two-column** section: copy left, a static mock
  of the client portal right, stacking below `lg`. Its feature rows use
  `text-button` for the title (Poppins SemiBold 16/1.2 — an exact match) and
  44px tiles at `rounded-field`, not the 52px `rounded-tile` the card grids use.
- **Its two columns stretch to equal height — do not centre them.** Figma marks
  the row `items-center`, but both cells carry `self-stretch`, which overrides
  it, and the mock is `h-full`: the card fills the row with its rows packed to
  the top and blank space below. Reading only the row's `items-center` gives a
  card 317px tall against the designed ~454px. When a Figma row and its
  children disagree on alignment, **the child wins**.
- **Its mock rows are direct children of the card**, so the card's 12px gap
  falls between every row too. Wrapping them in a `<dl>` without `gap-3` makes
  the list end ~50px short — the rows sit flush instead of on a 52px pitch.
  Row pitch measures 53.25 here against Figma's 52.25: `border-b` adds 1px per
  row where Figma draws the rule inside the frame, the same border-box
  difference `Button` and `Card` show.
- Verifying this section is what established the **pixel-diff workflow**:
  `get_screenshot` the node at `maxDimension: 1920`, screenshot the same
  section over CDP at scale 1, decode both PNGs and compare ink density per
  block. It located both faults immediately where reading the markup had not.
  Note Chrome's subpixel text antialiasing produces coloured fringes that
  Figma's server render lacks, so compare solid regions and ink density rather
  than exact pixel colours in text areas.
- Its progress bar's width is **data, not styling**: `espaceProgress` (65) is
  applied as an inline `style` width. Figma draws 352.32px in a 542.5px track,
  which is 65% to within a pixel; the rendered 351.31px is that rounding.
- Its mock card carries a one-off `0px 24px 60px rgba(0,0,0,0.1)` shadow,
  deeper than `Card`'s hover shadow, so it is written inline like
  CabinetCollage's.
- This section's style list reports `Petroff/Periwinkle: #2E5BB8` — the correct
  value — which is what confirmed the Methode badge hex was a serialization
  fault rather than a real design-system inconsistency.
- **`get_design_context` can report the wrong fill.** For Methode's step
  badges it returned `bg-[rgba(241,205,216,0.3)]` with a white numeral, and
  listed the style as "Petroff/Periwinkle: #F1CDD8". The actual node renders a
  **solid `#2E5BB8`** disc — the existing `periwinkle` token — with a white
  numeral. The style *name* was right and the *hex* was wrong. Two rounds of
  colour decisions were made on that bad data before a `get_screenshot` of the
  node settled it. **When a colour looks off, or a fill is translucent and its
  named style disagrees with its hex, screenshot the node and sample the
  pixels** rather than trusting the generated Tailwind.
- Its badge is anchored to the **`<li>`, not the `Card`** — the li has no
  border, so Figma's top -22 / left 14 are the literal offsets. Contrast with
  Forfaits, whose badge sits on the card and therefore has to absorb its
  border. Reach for the li whenever a badge straddles a bordered card.
- Methode is an `<ol>`: the steps are ordered, so the numerals are
  `aria-hidden` and the list conveys the sequence.
- MidCTA needed **no new token** despite its gold half being Inter Regular 20:
  `text-h3` is Poppins SemiBold 20/1.3, and the gold run is the same size and
  line-height, so it is `font-inter font-normal` on a span rather than a
  separate style. (`text-lead` is Inter 20 but at 1.55, so it does not fit.)
  Its button takes Figma's 24px sides as `size="sm" className="px-6"` — `sm` is
  20 and `md` is 28, neither of which matches.
- On desktop MidCTA is one row; below `lg` the button wraps under the copy,
  where Figma just lets the line run off its 1245 band. The section grows from
  115px to 217px at 375 as a result.
- Forfaits' featured-plan badge is **absolutely positioned on purpose** — it
  has to straddle the card's top border, which no in-flow box can do. Its
  offsets resolve against the *padding* box, so they must absorb that card's
  2px border: Figma's top -14 / left 22 are written `-top-4 left-5`.
- Its featured card keeps the `0px 14px 17px` shadow **permanently**. Unlike
  the first-card shadows in Domaines and Actus, this one marks the highlighted
  plan rather than showing a hover state.
- Its three CTAs are deliberately **not** bottom-aligned, exactly as in Facons:
  the cards stretch to equal height, but the third plan's shorter feature list
  pulls its button ~26px above the other two, which is what Figma draws.
- Figma gives its two outer cards `rgba(0,0,0,0.07)` — black, where every other
  card uses `rgba(33,29,51,0.07)`. `Card`'s `encre/7` covers both; at 7% none
  of the three are distinguishable.
- Prestations caps its **title** at 680 as well as its lead, which is what
  wraps "Le socle, industrialisé et au forfait" onto two lines as the comp has
  it. `SectionHeading` has no `titleClassName`, so this is done by putting
  `max-w-170` on its `className` (which constrains the whole block) and
  repeating it in `leadClassName` to lift the lead off its default 640.
- Its cards carry a 10px spacer before the tags and **no trailing spacer**,
  where contentieux Domaines uses 12px and closes with 14px. Same card
  otherwise. `file-lines.svg`, added for Domaines, is reused here; only
  `envelope`, `folder` and `bell` were new.
- **The tag pill class string now exists in three sections** — both Domaines
  and Prestations — identical in all of them. Extract it to `ui/` the moment a
  fourth copy appears.
- **Tools' cards need `min-w-0`.** An `<input>` defaults to `size=20`, roughly
  240px of intrinsic width, and a flex item defaults to `min-width: auto` — so
  the card refused to shrink below ~434px and blew the page out at 375. The
  three earlier card grids have no input and never hit this.
- `SectionHeading` now takes `tone="onDark"` (gold overline, white title, white
  70% lead), mirroring `Logo`'s prop of the same name. Tools is the first
  section on an `encre` ground.
- Tools' four inputs are inert like SearchBand and the OpenData lookup, but they
  are deliberately **not** wrapped in a `<form>`: with no submit handler, Enter
  would reload the page. That also keeps the section a server component.
- Contentieux's **Domaines shares only its name** with the hub's. The hub grid
  is the eleven practice areas plus a transverse card; this one is nine
  litigation *missions* with their own copy and icons. Same card anatomy
  though, so it reuses `Card`, the icon-tile idiom and the hub's exact `tag`
  pill string — Figma specifies identical values for both.
- Seven of its nine icons are new; `people-dispute.svg` and `database.svg`
  matched exactly and are reused. `file-lines.svg` is a second document glyph
  beside `document.svg` — genuinely different drawings (two paths with rounded
  caps against one with square), so both exist. `balance-scale.svg` is the
  26px line icon, not the 220x200 `scales-of-justice.svg` illustration.
- Its cards end with a 14px spacer below the tags, so the visual bottom padding
  is 50px, not the 28px the frame declares. Measured 51 here because `Card`'s
  1px border sits outside the box where Figma draws it inside — the same
  border-box difference the outline `Button` shows.
- **Figma's hero inner columns carry a 12px flex gap between every child on
  top of the explicit spacer frames.** So a spacer labelled 20px is really 44px
  of separation (12 + 20 + 12). Missing this makes every vertical gap 24px too
  tight and is invisible until you measure. Both the Contentieux Hero and the
  Expertises Stage are built this way.
- The Contentieux Hero reuses five existing assets across non-uniform boxes —
  `eiffel-tower-colour` 56x96 -> 140x271, `courthouse` 250x185 -> 240x178,
  `laurel-branch` 120x150 unchanged, `lawyer-robe-colour` 130x140 -> 160x170,
  and `sparkle` at 36 and 46. None of them carry strokes, so the stretch is
  exact. Verify a candidate by comparing path data with the axes taken from the
  SVG command letters, not by alternating x/y — `H`, `V` and `A` break naive
  alternation and make identical glyphs look different.
- `courthouse.svg` (250x185) and `columned-building.svg` (150x112) are the
  **same glyph** at two boxes — both match the Hero's export exactly. Predates
  this work; worth collapsing to one file.
- `lawyer-robe-colour.svg` is reused at 160x170 even though one coordinate of
  its gold panel differs from the Hero's export (a tail running to x=30 that the
  robe body covers). A difference blend at 6x brightness shows only antialiasing,
  so it is not worth a second file.
- **There are now three arc-de-triomphe files** — 90x74, 149.595x123 (`-lg`) and
  182x150 (`-xl`) — one glyph, differing only because Figma leaves
  `stroke-width: 6` unscaled. Adding a fourth would be silly. One file carrying
  `vector-effect="non-scaling-stroke"` on Vector_8 would render a 6px stroke at
  every size and could replace all three; that is a refactor across the home
  CTAFinal, the Expertises CTAFinal and this Hero, so it needs a decision first.
- **Apostrophes are inconsistent in the source.** The Contentieux frame exports
  straight `'` ("jusqu'au", "d'urgence") where the Expertises frames export
  typographic `’`. Every existing string in `messages/fr.json` uses `’`, and
  mixing the two inside one page looks broken, so the Contentieux copy uses `’`
  throughout. That is a deliberate deviation from the raw export — reverse it if
  the straight quotes are intentional.
- The Contentieux Hero column uses `lg:pt-32.5` (130px) against Figma's 130.5,
  and drops to `pt-16` below `lg` where the ornaments are hidden and 130px of
  head room would just read as a gap.
- `Button`'s outline variant puts its 1.5px border outside the box, so the CTA
  row measures 53.19px tall against Figma's 51.2. Figma draws the stroke inside
  the frame. Shared with the home Hero, so it is a `Button` decision, not a
  per-section one.
- Figma clips the Contentieux Hero stats the same way it clips the Expertises
  ones: the row needs 915.7px inside an 860px column, so "pour une action
  d’urgence" and "première réponse garantie" are cut in the comp. Here the stats
  sit against the 1245px container and all four fit.
- `gavel.svg` is a low-confidence name for the Contentieux icon. So is
  `phase-bars.svg` for the "Missions par phases" one — three bars of growing
  length with two detached round markers, read as phased milestones.
- Facons' star is a new `star.svg`; the existing `sparkle.svg` is a four-point
  sparkle, not the same glyph.
- Facons deliberately does **not** bottom-align its three card CTAs. The cards
  stretch to equal height, but Figma lets the third card's five-line body push
  its CTA ~25px below the other two, so the spacer above the CTA must not
  `grow`. Body line counts match the comp exactly: 4 / 4 / 5.
- `scales-of-justice-wide.svg` (234x200) is the Expertises stage's export of
  the same scales as `scales-of-justice.svg` (220x200), which HeroOrnaments
  still uses. The x geometry is an exact 234/220 scale but the beam sits ~12px
  higher, so it is a separate file rather than a reuse.
- Same story for `arc-de-triomphe-colour-lg.svg` (149.595x123) against
  `arc-de-triomphe-colour.svg` (90x74), which the home CTAFinal uses. Every
  path is an exact 1.662x scale, but `stroke-width` stays `6` in both, so
  rendering the 90-wide file at 149.595 would draw the arch outline at 9.97px
  instead of the 6px Figma intends. Hence a second file.
- `arc-de-triomphe-colour.svg` still has one raw hex, `stroke="#A67C1B"` on
  Vector_8, which predates the tokens-only rule being applied to assets. The
  `-lg` copy uses `var(--color-brique)` there. Harmless — same colour — but the
  original is worth tidying next time it is touched.
- `three-figures.svg` (180x138) is the Expertises CTAFinal's left ornament:
  three robed figures on a plinth, one periwinkle and two gold.
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
- Both CTAFinals keep the panel's designed 48px side padding at every width,
  which is heavy on a 335px phone panel (239px of content). On the Expertises
  one the buttons are 265px and 258px wide, so at 375 they overrun that content
  box by ~13px a side — still inside the panel and not clipped, but the padding
  no longer reads as 48px, and the phone number wraps before "Paris". Figma
  only specifies desktop; worth reducing below `sm` if it reads too tight.
- The Expertises CTAFinal has **bottom padding only** (`pb-24`, no top), because
  Facons above it already closes with its own 96px. The home CTAFinal uses
  `py-24`. That asymmetry is what Figma specifies, not an oversight.
- Its two CTA buttons are inert, like the home ones — `Button` has no `href`.
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
