@AGENTS.md

# Petroff.law — build from Figma

Built from Figma one section at a time. Five pages are complete — the home
page, the Expertises hub, both domain pages (Contentieux & arbitrage and
Contrats & droit commercial), and the Bibliotheque. The article detail page is
in progress.

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

## Page 4 — Contrats & droit commercial (`/expertises/contrats-commerciaux`), frame `12870:1006`

1920x8300, the second domain detail page — the same eleven-section shape as
Contentieux, and now complete. `domaines.ts` already pointed the Contrats card at this path, so
adding it to `liveRoutes` lit up both that card and the header submenu, which
now lists two domains.

| # | Section | Node ID | Status |
|---|---|---|---|
| 1 | Hero | `12870:1009` | done |
| 2 | Domaines | `12870:1011` | done |
| 3 | Tools | `12870:1013` | done |
| 4 | Prestations | `12870:1015` | done |
| 5 | Forfaits | `12870:1017` | done |
| 6 | MidCTA | `12893:1107` | done |
| 7 | Methode | `12870:1019` | done |
| 8 | Espace | `12870:1021` | done |
| 9 | Bib | `12870:1023` | done |
| 10 | FAQ | `12870:1025` | done |
| 11 | CTAFinal | `12870:1027` | done |

Its sections live in `src/components/sections/contrats/`, and its copy under
the `ContratsPage` message namespace.

- Its hero column starts at y=109, not the Contentieux hero's 130.5, because
  the title runs to three lines — `lg:pt-27.25`. And it takes **no bottom
  padding at lg**: Figma's stage is simply 720px tall with the content ending
  inside it, so `lg:min-h-180` supplies the height. Adding `lg:pb-10` (as the
  Contentieux hero does, where the shorter content happens to land on 720
  anyway) pushed the section to 809.8px against the designed 784.
- Its marker bar sits **0.563em left of the highlighted chunk's own centre** —
  Figma draws it at (597, 257) 304x22, wider than "tiennent —" itself. All four
  coordinates now land within 0.03px.
- **Figma renders this hero's lead at 28px line spacing, where its own code
  export declares `leading-[1.4]` (25.2px).** `text-body` is correct: the
  Contentieux hero's lead measures 25px in Figma's render, as do the Bib card
  descriptions, so 1.4 matches everywhere else. This one node disagrees with
  both the design-system style and its own export, so the token was kept. The
  cost is the CTA row and stats sitting 8px higher than the comp. Worth asking
  the designer before "fixing" it.
- **The ⚡ in the Forfaits flash lines is a colour emoji in Figma too** — an
  8x crop shows Figma rendering it yellow/amber, not in the brique text colour.
  Leave it as the browser draws it. `font-variant-emoji: text` was tried and
  reverted: it makes the glyph monochrome, which moves *away* from the comp.
  The artwork still differs slightly because Figma and Windows use different
  emoji fonts; that is inherent to emoji in content and not worth chasing.
  **Do not judge a small glyph from a downscaled crop** — the first read of a
  1000px-wide comparison had this exactly backwards.
- Its MidCTA's gold run is Inter 20/**1.55** — exactly `text-lead` — where the
  Contentieux one is 20/1.3 and has to borrow `text-h3`'s metrics. It still
  needs an explicit `font-inter`; see the font-family note under Hard rules.
- Its Forfaits differs from Contentieux in four places: outer plans are
  `bg-lilas` not white, the price unit is `text-small` not `text-nav`, feature
  text is `encre/62` not `/75`, and **the third plan's price is 40px** where the
  others are 30 (`text-h2` against `text-price`). Because `text-h2` is fluid and
  `text-price` is fixed, that inverts below ~1100px — at 375 the "large" price
  renders 28px against the others' 30. The cards are stacked by then so the two
  are never seen side by side, but a fixed 40px token would remove it.
- Its CTAFinal ports the Contentieux one with different ornaments, and its
  copy is **character-identical to the Expertises and Contentieux blocks for
  the third time** — so the recorded plan was carried out: the strings now
  live in a shared top-level **`ContactCta`** namespace and all three
  components read it, with the two duplicate `ctaFinal` blocks deleted. The
  three *components* stay separate: they differ in ornaments, panel gap (16px
  on Expertises, 12px on both domain pages) and section padding. Verified
  after the move — all three still render with their own gap and height
  (470.36 / 550.36 / 550.36) and no missing keys.
- `open-book-lg.svg` (167x125) is a **fourth file of the `-lg` kind**, beside
  the three arcs and the three scales: every coordinate is an exact 1.3917 x /
  1.3889 y scale of `open-book.svg` (120x90), but `stroke-width: 6` is left
  unscaled, so rendering the small file at 167 would draw an 8.35px stroke.
  Its `pen-nib.svg`, by contrast, **is** reused straight — 110x153 stretched
  to 103.125x150, a non-uniform 0.9375/0.9804 scale that is exact because the
  glyph carries no strokes at all. Check for strokes before deciding; the two
  ornaments in one section fell on opposite sides of it.
- Its section measures 550.36 against Figma's 550. The panel copy sits 1px
  high (sub-pixel line-box rounding, not a border — this panel has none) and
  both ornaments land within 0.1px; the CTA row is exact.
- **`Contact` is the fifth mixed-case overline**, and this one was checked on
  all three frames that share the block — Expertises `12858:890`, Contentieux
  `12870:902` and this one — before the casing was corrected once in the
  shared namespace.
- Its FAQ brings the page's **only new asset and only new token**:
  `la-defense-scene.svg` — the Grande Arche with its flanking glass towers,
  parvis steps and potted trees — and `--color-sand` (#d8d2c2), which paints
  the two paving joints and the shaded lintel inside the arch. It is a
  genuinely different drawing from `paris-scene.svg`: same 312.5x400 box, 59
  paths against 47, and only one path shared. Its `laurel-branch` matches
  exactly and its 46px sparkle is an exact 1.15x scale of the 40px
  `sparkle.svg` with no strokes, so both reuse — the same reasoning the
  Contentieux FaqIllustration already applies.
- **Its `FaqIllustration` differs from the Contentieux one by a single
  import.** Every coordinate is identical, so the two are the clearest
  candidate for the consolidation pass; they are kept separate for now only
  to match the per-page `HeroOrnaments` precedent.
- Its FAQ row differs from the sibling's in three small ways: it is
  `items-start` where that one is `items-center`, its summary has **no gap**
  between the question and the marker (Figma lets the question box run to it),
  and its marker is `encre/62` where the sibling uses `encre/50`. This frame
  states 0.62 explicitly; the Contentieux frame was not re-checked, so that
  /50 may be a third small bug of the same kind — worth confirming.
- **Figma's own FAQ band overflows here**: 820 (list) + 48 (gap) + 383
  (illustration) is 1251 inside a 1245 container, so the list renders at 814
  and the illustration sits **exactly 6px left** of the comp. Everything else
  in the illustration is pixel-identical — arch box 312x352 and the tree span
  both land within a pixel once that 6px is taken out. Unlike the Contentieux
  FAQ, this frame is a true 1920 wide, so x positions *are* comparable.
- Its section measures 646.36 against Figma's 638, and that 8.36 is entirely
  the four cards' 2px borders; the per-line diff shows the drift accumulating
  exactly 2px per card down the list.
- Behaviour verified by driving it: mouse, Enter and Space all toggle, the
  group is exclusive, summaries are tabbable, closed answers fail
  `checkVisibility()`, and the panel still animates (15 distinct heights).
- **Three of its four answers are drafts, not Figma copy** — the same
  situation as the Contentieux FAQ, which supplies only the first answer.
  They were composed strictly from facts already stated on this page: the
  `rupture` card's own `L.442-1` tag and "sécuriser une sortie ou défendre vos
  préavis", the `international` card's "loi applicable, juridiction,
  Incoterms" and the four languages, and the distribution forfait's "deux
  tours de négociation incluses". No new figures or legal claims were
  invented. **These need the firm's sign-off before launch**, exactly as the
  Contentieux three do — that is now six drafted answers across two pages.
- Its Bib is the **third clean port** from Contentieux — identical structure
  and values, so the component was copied with only the namespace swapped. It
  needs no lib entry at all: it reuses `collections` from `bibliotheque.ts`
  exactly as the sibling does, so only the counts and copy differ
  (31 / 520+ / 80+ against 22 / 380+ / 35+). No assets. Section measures
  643.55 against Figma's 641 — the card's 1px top and bottom borders — and
  every text line lands within 1.1px, which is that same top border.
- Its card CTAs are **not bottom-aligned**, for the third time on this site
  after Facons and Forfaits: the cards stretch to equal height, but card 3's
  two-line description leaves its "Parcourir" 25px above the other two, which
  is what Figma draws.
- **`Bibliothèque — contrats & droit commercial` is the third mixed-case
  overline**, after `Méthode` and `Espace client` — and note the domain half
  is **lowercase**, so the Contentieux twin is
  `Bibliothèque — contentieux & arbitrage`, not the uppercase string that
  shipped. Both corrected. At this point mixed case looks like the rule for
  this file rather than the exception, so **check the remaining Contentieux
  overlines** (`faq`, `ctaFinal`, and the five head copies shared with the
  Contrats page) rather than assuming the uppercase ones are right.
- Its Espace reuses the sibling's whole anatomy and **all four of its icons
  match existing files exactly** (`monitor-chart`, `lock`, `bell`, `globe`) —
  but the layout differs in four places, so it is not a straight copy:
  - the columns are **590.5 + 12 + 642.5**, not equal halves with a 64px gap,
    so the ratio is carried as `lg:grid-cols-[590.5fr_642.5fr]`. The 12px
    column gap is far too tight stacked and Figma only specifies desktop, so
    it is `gap-x-3 gap-y-16` — the x gap is the design, the y gap keeps the
    sibling page's rhythm. No breakpoint variant needed: only one of the two
    applies at a time.
  - Figma **does not stretch** the mock to the row — it draws the card 358px
    tall against a 453px column, leaving it floating short of the copy.
    Verified by scanning the render for the card's own top and bottom borders,
    so this is what the comp says, not a misread of the export. It reads as
    unfinished on the page, so it is **deliberately overridden**: the card
    fills the row like the Contentieux one, rows packed to the top.
  - Figma paints the progress track **white on a white card**, leaving the bar
    with no visible groove. Also **deliberately overridden** to lilas, as on
    the Contentieux page. `espaceProgress` is 60.5 (358.48px in a 592.5px
    track), against the sibling's 65 — that part is kept.
  - Those two are the only places on this page where the build knowingly
    departs from the comp for visual reasons rather than a token or
    border-box difference. Both are one class each if the designer confirms
    the comp is what they want.
  - its border and shadow are a shade heavier: `rgba(0,0,0,0.08)` and 12%
    against `0.07` and 10%.
- **`Espace client` is a second mixed-case overline**, alongside `Méthode` —
  and again both domain frames agree, so both pages were corrected. Its
  render matched Figma's to 141 vs 142px of ink once fixed. The remaining
  uppercase overlines on the Contentieux page (`bib`, `faq`, `ctaFinal`) have
  not been checked against their frames; each will surface when the Contrats
  twin is built, so fix them then rather than auditing separately.
- Its pixel-diff, taken before the two overrides above: 14 of the left
  column's 18 text lines land within **0.1px**, the rest within 1.2px of
  sub-pixel line-height accumulation (column measures 453.92 against Figma's
  453). The mock drifted 1px per row — pitch 53 here against Figma's 52 — for
  the border-box reason already recorded below, which was the whole of its
  365.19 against Figma's 358. Section 645.92 against 645, unchanged by the
  overrides since the left column sets the height.
- No horizontal overflow from 1920 down to **320**; every hit the sweep
  reports is an `aria-hidden` hero ornament inside an `overflow-hidden`
  section, and `scrollWidth` equals the viewport at every step.
- Its Methode is the **second section that ports cleanly** from Contentieux —
  the two frames are pixel-identical, copy included, so the component was
  copied with only the namespace and lib import swapped. Reading it exposed
  **a bug in the shipped Contentieux Methode**, now fixed in both: the card
  kicker is Petroff/Overline (Poppins SemiBold 16 / 0.18em), not `text-h3`,
  and because it is a `<p>` it also needs `font-poppins` — only `h1`-`h4`
  inherit Poppins from the base layer, so `text-h3` alone rendered it in
  Inter at 20px with no tracking. Its head copy is the fourth verbatim
  duplication of a Contentieux namespace.
- **Figma writes this section's overline as `Méthode` and its kickers as
  `Jour 0` / `Signature` — mixed case**, where every other overline in the
  file is uppercase. It is mixed-case in *both* domain frames independently,
  so it reads as intentional and the source now stores it that way; the
  Contentieux copy was uppercased by habit and has been corrected. Flag it to
  the designer alongside the hero line-height question.
- The Methode section takes **no fill in Figma** — it inherits the page
  frame — so its ground is `bg-lilas`, which is also `body`'s background.
  Confirmed by the x-band ink profile matching the Figma render exactly.
- Its pixel-diff is clean: per-line centres inside the cards land within
  **1px** of Figma everywhere, and that 1px is the `Card` border-box
  difference (2px at the card's bottom edge, hence 552.34 rendered against
  Figma's 550 frame). The kicker line lands within 0.03px.
- Its `<p>` kicker is why the "tokens carry no font family" rule needs a
  companion note: `<h3 className="text-h3">` is fine because the base layer
  gives `h1`-`h4` Poppins, but the same token on a `<p>`, `<span>` or `<li>`
  silently falls back to Inter.
- Its Prestations is the **one section that ports cleanly** from Contentieux:
  same structure and character-identical overline, title and lead, so the
  component was copied with only the namespace and lib import swapped. Its
  `ContratsPage.prestations` head copy duplicates `ContentieuxPage.prestations`
  verbatim — one of five such duplications, with the two CTAFinals, the two
  Domaines footnotes and now the two Methode blocks.
- **The two Tools sections disagree in three places**, so do not copy one to
  the other: its badges are `text-button` here (Poppins SemiBold 16, no
  tracking) against `text-badge` on Contentieux; its result panel is 18px
  (`rounded-note-lg`) against 10px; and its body copy is `white/70` against
  `white/65` and `white/80`. Everything else is identical.
- Its Domaines cards rest on **lilas against a white section** — the inverse of
  the Contentieux page — and lift to white with a `0px 14px 34px` shadow on
  hover. Figma draws the first card already in that lifted state, and unlike
  the Contentieux page (where card 1 differs only by a shadow on an identical
  white ground) the difference here is plainly visible, so it is reproduced via
  a `raised` flag on the first mission. If that turns out to be the designer
  demonstrating hover, drop the flag and nothing else changes.
- **These exports carry a bare `<rect width="26" height="26" fill="white"/>`**
  behind the glyph — an opaque background, not a clip mask. It must be stripped
  or it paints a white square on the coloured icon tile. Earlier exports in this
  build had none, so check every batch. `matchall.js` compares only `<path d>`,
  so reuse detection is unaffected.
- `percent-rounded.svg` is a second percent glyph beside `percent.svg` — three
  paths with rounded caps against one with square caps, the same
  `file-lines`/`document` situation.
- Its section measures 1431.4 against Figma's 1393 frame, but **Figma's own
  frame is undersized**: its rendered content runs to ~1416 and its `grid-exp`
  declares `h-966` while needing ~989. Of the real 15px gap, ~5px per card row
  is the border-box difference — 2px for the card border and 2px for the tag
  pill's, both of which Figma draws inside.
- Four new ornaments — `pen-nib`, `desk-lamp`, `award-rosette`, `open-book`.
  The tower reuses `eiffel-tower-colour` at the same 140x271 the Contentieux
  hero uses, and both sparkles reuse `sparkle`.

## Page 5 — Bibliotheque (`/bibliotheque`), frame `13060:881`

1920x6266, and now complete. Header and Footer come from the layout. `nav.ts` already carried
the `bibliotheque` entry, so adding `/bibliotheque` to `liveRoutes` turned the
header link, the mobile panel entry and every other call site into real links
at once — verified: the header renders `<a href="/bibliotheque">`.

| # | Section | Node ID | Status |
|---|---|---|---|
| 1 | Hero | `13160:9273` | done |
| 2 | Vitrine | `13238:1013` | done |
| 3 | Resultats | `13061:955` | done |
| 4 | ParCategorie | `13062:881` | done |
| 5 | Parcours | `13062:1032` | done |
| 6 | Vivante | `13062:1059` | done |
| 7 | Transparence | `13062:1078` | done |
| 8 | CTAFinal | `13060:934` | done |

Its sections live in `src/components/sections/bibliotheque/`, and its copy
under the `BibliothequePage` message namespace. Note the existing home-page
section namespace is `Bibliotheque` — different thing, easy to confuse.

- Its CTAFinal is **not** the shared `ContactCta` block: the metadata gives it
  its own title ("Vous ne trouvez pas la réponse ?") and its own buttons
  ("Parler à un avocat" / "Poser votre question"), plus different ornaments.
  Do not reach for `ContactCta` there without checking.
- **Its CTAFinal is a fourth panel, not the shared block** — but it reads
  three of its five strings from `ContactCta` all the same. Only the title
  ("Vous ne trouvez pas la réponse ?") and the two button labels ("Parler à un
  avocat" / "Poser votre question") are this page's own; the overline, lead
  and phone line are shared, so the number now lives in one place for all four
  panels. That is the pattern for any further CTA panel: put the differences
  in the page namespace and read the rest from `ContactCta`.
- `pen-nib.svg` is reused a **second** time at yet another box — 110x160 here
  against the Contrats CTA's 103.125x150 and its own 110x153. A non-uniform
  stretch each time, exact because the glyph carries no strokes at all.
- `magnifier-check.svg` is new: a heavy encre ring over a pale-periwinkle
  disc with a check. **Its handle is entirely outside the panel**, which is
  why the comp shows only a ring — do not read the crop as a target or a
  clock. Section 550.36 against Figma's 550, panel copy within 1px, both
  ornaments within 0.1px, x-band delta 0.48.
- **Transparence is the page's only dark band** (`bg-encre`) and the only one
  whose gold overline is gold for the ordinary reason — `SectionHeading`'s
  onDark tone — rather than Resultats' one-off gold-on-light. It still writes
  its head out, because it puts 10px under the overline and 4px under the
  title. Section 341.36 against Figma's 340, every element within 1.1px.
- Its disclaimer and translation note are **single paragraphs at max-w-275**
  where Figma splits them into explicit lines; the natural wrap breaks at the
  same word, verified by ink extents (line 2 lands 361 -> 793 in both). No
  `<br>` needed.
- Its x-band ink delta is 2.75 against the ~0.3 the light sections manage.
  That is Chrome's subpixel text rendering on a dark ground, not a layout
  difference — expect a looser x-band number whenever a section is inverted,
  and judge those by extents and band positions instead.
- **Vivante went in clean** — no assets, no new tokens, no surprises: section
  527.17 against Figma's 526, every band within 1.1px and an x-band ink delta
  of **0.24**, the tightest on the build. It is the third section in a row
  built on the same skeleton (1200 band, overline / h2 / lead, a flat-height
  3-up grid with `mt-auto` on the CTA), which is why it needed no measuring
  rounds.
- **Parcours is the closest match on this build**: section 572.8 against
  Figma's 572, every band in the heading and all three cards within **1.1px**,
  and an x-band ink delta of 0.52. No assets, no new tokens.
- **Do not put padding above an `mt-auto` CTA.** Its card 3's last step wraps
  to two lines and Figma leaves only **4px** above the CTA there, so a
  `pt-4` grew that card to 311 and the grid levelled the other two with it —
  12px on the section. `min-h-75` plus a bare `mt-auto` gives all three the
  comp's flat 300 and lands the CTA within 0.8px. Same mistake shape as the
  Vitrine's `pt-2.5`; the pattern is that a guaranteed gap and a fixed card
  height cannot both be satisfied when the copy is at its longest.
- Its steps are a real `<ol>` with **`list-inside`**, not the default outside:
  Figma lets a wrapped step return flush to the left edge rather than hanging
  under its label, which is exactly what `list-inside` does. Known cosmetic
  difference: Figma types **two** spaces after the numeral where the browser's
  marker uses one, so its labels sit ~4px further right. Proper list markup
  was kept over that 4px — reverse it by putting the numeral in the text with
  `whitespace-pre-wrap` if the designer disagrees.
- Its cards carry **no border**, unlike every other card on this page, and sit
  on `lilas-2` against a white section.
- **ParCategorie's exports scaled their strokes, unlike the arc and the
  book.** Six of its nine 24px icons are exact 24/26 copies of existing ones
  (`person`, `file-lines`, `shuffle-arrows`, `percent`, `balance-scale`,
  `envelope`) — and crucially they carry `stroke-width="1.8"` where the
  originals carry `1.95`, which is that same 24/26. So rendering the 26px file
  at 24 lands the stroke exactly where Figma wants it and all six reuse. The
  rule is **check whether the stroke scaled with the geometry**, not "a stroke
  blocks reuse": `open-book-lg` needed a new file because its stroke stayed
  at 6, these did not.
- `percent.svg` is reused here even though the export differs slightly — its
  dots sit 0.5px off and its diagonal runs 1px longer at each end. A **fourth**
  percent file for that would be silly, exactly as the arc note says.
- Three genuinely new icons: `rosette-check`, `people-pair`, `house`. The
  first is unrelated to the existing `award-rosette`, which is a large
  multi-colour illustration, not a 24px line icon.
- **Its nine categories are not the same set as `ContentDomain`.** The
  contents' pills include "S’implanter en France", which is not one of the
  nine, and two of the nine carry a longer title here than the pills use
  ("Créer & structurer **la société**", "**Trouver** locaux & immobilier").
  So `categories` and `domains` are deliberately separate vocabularies that
  happen to agree on four labels — do not fold them together.
- Fixed slots again, as in Resultats: the title reserves two lines and the
  counts line reserves two, so every tile's pills start at the same y whatever
  the copy length. Its tile is a flat 350 (`min-h-87.5`).
- **Its pill is the fifth variant on the site**: lilas ground with `encre/62`
  text, against the content cards' pale periwinkle with full-strength encre,
  and the domain pages' bordered tag. That is now five distinct pills and one
  more argument for extracting them.
- Section measures 1417.17 against Figma's 1416, every tile lands within
  1.9px, and the x-band ink profile matches to 0.38.
- **Resultats' filters really filter.** The four type tabs and the category
  select both narrow the grid, and they compose — measured: Tous 6, Guides 5,
  Fiches & FAQ 1, Modeles 0, category `acheter` 2, `acheter` + Fiches 1. The
  sub-category select is `disabled` at the 60% opacity Figma draws, because
  the taxonomy's second level has no content attached yet. `Modeles` matches
  nothing, so the section needs an **empty state** — that one line is new UI
  copy, not from Figma.
- Its tabs are **buttons with `aria-pressed`, not `role="tab"`**: there is one
  panel, not one per tab, so a tablist would promise a widget this is not.
- **Its copy is shared with the Vitrine.** The two sections draw six of the
  same contents, so titles, descriptions, domain labels and type labels live
  in `BibliothequePage.contents` / `.domains` / `.types`, and each section
  keeps only its own `meta` line — Resultats' carries no date where the
  Vitrine's does. That headed off what would have been the seventh verbatim
  duplication on this build. `resultatsItems` is deliberately **left
  un-annotated** so its literal tuple type lets next-intl check
  `resultats.meta.<key>`, which only carries those six.
- **A fiche is lilas-2 here and pale blue in the Vitrine.** The two sections
  genuinely disagree in Figma, so each keeps its own `typeTones` map.
- **Its band is 1200 at x=360**, not the shared 1245 — but 1200 centred inside
  the Container lands on exactly 360, so it is `mx-auto max-w-300` inside the
  normal `Container` rather than a second width system.
- **Its overline is gold at Poppins 16/1.2 with no tracking** — the Button
  style, not the brique `text-overline` every other section on the site uses.
  Check the tracking before reaching for `text-overline`.
- **A `<select>` sizes itself to its longest option.** Left alone the category
  one grew to 333px against Figma's 239 and shoved the tabs 100px right. Both
  selects take explicit widths plus `truncate`.
- **Its card text box is 332 inside a 384 card** — 24px left and 26px right,
  not symmetric. That 2px is not cosmetic: at 334 two of the six titles pull
  up onto one line and stop matching the comp.
- Figma pins each card's description to a **fixed y** whatever the title's
  length, so the title reserves two lines (`min-h-13`). Without it a one-line
  title pulls its description 28px up and breaks the row's alignment.
- **The browser breaks at a hyphen where Figma does not.** "d'actif-passif"
  wrapped as "d'actif-" / "passif ?" until the copy took a **non-breaking
  hyphen (U+2011)**. Worth remembering for any compound in a title.
- Section measures 859.19 against Figma's 860, and every region — heading,
  filter row, tabs and all six cards — lands within 2.5px, which is the card
  border plus that 0.8.
- **Vitrine is a real, working carousel** — the one interactive section on
  this page, and therefore the only `'use client'` one. The comp draws page 1
  of a carousel ("Neuf contenus choisis chaque semaine") but the Vitrine frame
  itself supplies only three contents; the other five come from **this page's
  own Resultats frame**, whose six library cards are the same shape and one of
  which already duplicates Vitrine card 2. So it pages through eight pieces of
  real design copy and **nothing was invented** — except the five carried
  cards' dates, which Resultats does not give and which are maquette values
  needing real ones before launch. Their photos cycle the three the Vitrine
  supplies.
- **It is a scroll container, not a transform.** The track is
  `overflow-x-auto snap-x snap-mandatory`, so it keeps working with a
  trackpad, the keyboard (it is a focusable `role="region"`) or no JavaScript
  at all, and the page count follows whatever fits at the current width with
  no breakpoint arithmetic — three per view from `lg`, one below. Arrows
  disable at the ends, which is exactly the state Figma draws for page 1
  (previous dimmed to 35%, next full), so that styling follows the real bounds
  rather than being hard-coded. `scrollTo` drops to `behavior: "auto"` under
  `prefers-reduced-motion`.
- **Do not derive the page count from `scrollWidth / clientWidth`.** The gaps
  between cards inflate it — eight cards one-per-view at 375 reported *nine*
  pages, so the dot row had a ninth dot that scrolled nowhere. Measure the
  card step instead (`first card width + columnGap`), get `perView` from that,
  and take `ceil(items / perView)`. The gap is read from `getComputedStyle`
  rather than repeated as a constant, so it cannot drift from the class.
- `.no-scrollbar` lives in the `components` layer of `globals.css` beside
  `.details-panel`: the track has to be a genuine scroll container, but its bar
  would sit under the cards and read as a rendering artefact.
- **Its cards are levelled, against the comp.** Figma's track is
  `items-start`, so card 1 runs 519 tall against card 3's 434 and the "Lire"
  rows land wherever the copy ends. They stretch to one height here and the
  meta row takes `mt-auto`, so every card's bottom edge and CTA line up across
  all three pages — measured: one height per width, and every meta row exactly
  29px above its card's bottom (28px padding + the 1px border). This is a
  **deliberate deviation**; removing `items-stretch` and that `mt-auto`
  returns it to the comp. Note the levelling costs nothing in height — the
  tallest card already set the row — so the section still measures 913.36
  against Figma's 911.
- Do not add padding above an `mt-auto` row in a `gap` flex column: the gap
  already guarantees the minimum spacing, so a `pt-2.5` there simply made the
  tallest card 10px taller and pushed the whole section with it.
- Its head is **written out rather than using `SectionHeading`**: it puts 8px
  under the overline and 12px under the title where `SectionHeading` uses one
  gap for both, and it shares an `items-end` row with the arrows. Its lead is
  `text-small` (16/1.5), not the `text-body` 18 every other section's lead
  uses.
- One `chevron-right.svg`, mirrored with `-scale-x-100` for the previous
  arrow: the two exports are exact reflections about x=10. Same call as the
  FAQ marker's single rotated glyph.
- Its three photos are cropped to the window the comp actually shows — card 1
  is offset (`h-[267.25%] top-[-109.15%]`), cards 2 and 3 are centre
  `object-cover` — then stored at 1197x672, 3x the 399x224 box. They arrive as
  8-13MB portrait files and leave at ~100KB each.
- Its type pill is **data, not styling**: pale blue for a fiche, pale gold for
  a guide, while the domain pill is always pale periwinkle. Its 11/3 padding
  makes it a different pill from the domain pages' tag pills — do not fold
  them together when the tag-pill string finally gets extracted.
- Section measures 913.36 against Figma's 911, and every band in the head and
  both sampled card bodies lands within 1.2px — all of it the cards' 2px
  borders.
- **The skyline is one scene, not eight ornaments.** Figma builds it as eight
  separately-masked pieces sharing one mask the shape of the panel, so it
  ships as a single composed `paris-skyline.svg` (450x414) placed at each
  piece's exact `mask-position`, with the panel's own `overflow-hidden` doing
  the clipping. That avoided **five new sized variants** — the arc alone would
  have been a fourth file, and the Eiffel tower, Haussmann block and two stars
  a fifth through eighth. Same precedent as `paris-scene.svg` and
  `la-defense-scene.svg`.
- Its two Haussmann exports differ only in the **fifth decimal** (9.61838 vs
  9.61891) — Figma float noise, not two glyphs. Its two stars are an exact
  1.5385 scale of each other. Compare normalised path data before believing
  two exports are different drawings.
- **The row takes no gap.** Figma's 692 copy column plus the 511 illustration
  is 1203 inside the 1245 band, which `justify-between` spaces by exactly 42.
  Adding `gap-12` pushed the pair to 1251 and overflowed the container — the
  same trap the Contrats FAQ hit, now twice.
- The illustration appears **from `xl`**, like the Cabinet collage: 692 + 511
  needs 1203, which the container cannot give at `lg`.
- **Its suggestion chips take 14px sides, not `Chip`'s 16.** Figma lays them
  out as an equal-width 3x2 grid, which clips the first label; they size to
  their content here and wrap to the same 3 + 2 arrangement without clipping.
  At `Chip`'s default padding they wrapped to *three* rows and made the whole
  section 45px too tall — the entire height error came from 2px of padding.
  `Chip` gained a `solid` tone (white pill, `encre/12` border, `text-button`).
- **Figma puts the hl marker at grid x=0 and the title text at x=6**, so the
  comp's title sits 6px right of its own overline and lead. The title is
  aligned to the container here and the marker pinned to its left edge
  instead, which lands the bar within 1.5px of the comp at both ends while
  keeping the column aligned. Its `h-[0.382em]` is the same as the home hero's
  — 26/68 either way.
- **`border-[1.5px]` renders as 1px at dpr 1.** Browsers round border widths
  to whole device pixels, so the search field measures 61.19 against Figma's
  62. This is also why the outline `Button` measures 53.19 rather than 54.2 —
  the note below reads as a border-box quirk but is really this.
- Its polaroid is the first rotated element on the site, and **Figma's 0/122
  is the rotated frame's bounding box**. CSS rotates about the centre, so the
  untransformed box has to sit at 13.36/131.46 for its bounding box to land
  there; using 0/122 directly put it 11px left and 10px high. Its card is 202
  tall with a **22px bottom margin** against 12px on the other three sides —
  polaroid proportions, not uniform padding.
- Its print is tinted by a `pale-blue` layer on `mix-blend-color` — a duotone
  that keeps the photo's luminosity, not a flat overlay.
- `lawyer-portrait.jpg` came from Figma as a **3744x2496 JPEG named `.png`**.
  It is cropped to the window the comp actually shows (Figma places it at
  220% width / 154% height with a negative offset) and stored at 378x360, 3x
  the 126x120 print — 21KB.
- Its hero title is **character-identical to the home hero's**, rich-text tags
  and all.
- Section measures 658.08 against Figma's 660; the 1.92 is the 1px border
  rounding on the search field plus 0.8px per chip row.

## Page 6 — Article detail (`/bibliotheque/article-design`), frame `13095:881`

1920x**19493** — by far the largest frame in the file, and now **complete**.
A single article, "Fiche : Signature electronique", built as a **static design
study**: the route and the nav label say `article-design` rather than the
article's own title, because it is one page of design rather than a real
article route. The finished page measures **19457 at 1920 against that 19493
frame — 0.18% over more than nineteen thousand pixels** — with no horizontal
overflow from 1920 down to 320.

Reachable through a **second nav submenu**, under Bibliotheque. That meant
generalising the dropdown that used to be Expertises-only:

- `ExpertisesMenu` is now `NavMenu` and takes an `id` (two dropdowns cannot
  share one `aria-controls` target) and a `menuLabel`.
- `NavChild.labelKey` is a **full message path**, not a key inside one
  namespace, so children can come from anywhere. It is typed as a literal
  union rather than `string` — next-intl's typed catalogue rejects a bare
  `string`, which is the whole point of `global.d.ts`.
- Both submenus verified after the change, desktop and mobile.

| # | Section | Node ID | Status |
|---|---|---|---|
| 1 | Hero | `13160:6877` | done |
| 2 | Corps (article column + rail) | `13095:1022` | done |
| 3 | Cabinet | `13095:1023` | done |
| 4 | Interlocuteurs | `13095:1024` | done |
| 5 | ALireEnsuite | `13095:1025` | done |
| 6 | Transparence | `13095:934` | done |
| 7 | CTAFinal | `13095:940` | done |
| + | StickyBar + SideTab | `13121:25317`, `13170:1046` | done |

**The sticky bar is the page's one piece of scroll behaviour.** It appears
once `window.scrollY / (scrollHeight - innerHeight)` reaches **0.5** and then
stays fixed to the bottom; the page scrolls normally underneath because the
bar is fixed rather than in flow. It is kept mounted and translated out of
view rather than unmounted, so the transition runs both ways, and carries
`aria-hidden` + `inert` while it is down so nothing focusable hides
off-screen. Honours `prefers-reduced-motion`.

- **The ✕ collapses it to the gold side tab, which brings it back.** Figma
  draws both elements but says nothing about the relationship; this is the
  reading that makes both purposeful, and it is one state to change if the tab
  is meant to stand alone.
- **`Container` renders a padded outer div wrapping a `max-w` inner one, so
  flex utilities passed to it land on the OUTER element.** The inner div then
  becomes a single flex child and everything inside it stacks. That made the
  bar 119 tall against the comp's 78, with the copy, button and ✕ in a column.
  Put the row *inside* `Container`, never on it.
- Its side tab uses **`writing-mode: vertical-rl`, not a rotation** — no
  transform arithmetic to hug the edge, and it reflows. Its 45x236 box is set
  explicitly, because intrinsic sizing under `vertical-rl` resolves the icon
  and gap onto axes that give 59x221 instead.
- Measured against the comp: bar 78.3 against 78, its copy column 977.5
  against 977, its button 209.5 against 210, and the tab exactly 45x236.
- `--text-h4` was added for its headline — Figma's own "Petroff/H4", Poppins
  SemiBold 18/1.35, under the same precedent as `--text-badge`.

**Corps is being built in passes, from one saved response.** Calling
`get_design_context` per block would be ~100 Figma calls, so it was called
**once** on the article column (`13099:881`) with `forceCode`. The response is
178k characters, which the tool saves to a file; that file was extracted to
`article-code.tsx` in the scratchpad and indexed by block, and **all 74 of its
asset URLs were downloaded immediately** — they expire in 7 days and there is
no second chance. The remaining passes need **no further Figma calls** for
this column.

Block index, in column order: `hdico` / `answer` / prose / `rulebox` /
`outil-simulateur` / `hdico` / prose / `ladder` / `cmp` / `seam` / prose /
`trap` / `hdico` / `tl` / prose / `seam` / prose / `vigil` / `reflist` /
`jur-list` / `outil-triage` / `faq` / `consult` / `takeaways`.

- Pass 1 landed the two-column shell and the opening run: `SectionTitle`
  (Figma's `hdico`), `AnswerBox`, `Prose` and `RuleBox`, in
  `sections/article/blocks/`.
- Pass 2 landed `outil-simulateur` — the largest single block at 1226px. It
  is **deliberately static**: Figma gives each field one chosen value and no
  option list, and labels the panel "Résultat (démo)", so it is a picture of a
  completed run rather than a working tool. Same call as the Tools section's
  inert inputs, and it keeps the article a server component.
- **Its result values are let to flex, where Figma wraps every one of them.**
  Each value in the comp carries a stale auto-width frame (347, 337, 246, 363)
  narrower than its own text, so all four wrap — and they break mid-citation
  ("C. civ. art. / 1359", "invoque / l'acte"). Flexing them into the 377px
  the row actually has reads better and reflows, at the cost of **56px** of
  block height against the comp. Reproduce the comp by fixing each value's
  width per row if that matters more.
- Its verdict panel is `brique/14` — the only tint of brique on the site — and
  its disclaimer's emphasis is Poppins **16**/1.2, not the body's 18/1.35
  `<b>`, so it takes its own rich-text tag.
- `chevron-down.svg` (14x14) is a **third caret**, beside `caret-down.svg`
  (12x8) and `chevron-right.svg` (20x20). Same glyph family, three boxes,
  because each export centres it differently.

- Pass 3 landed the `Les niveaux de signature` heading, its four prose
  paragraphs and the `ladder` — four cards for the four levels of signature,
  each with a tinted 44px tile, a title, a status pill and a body indented 60px
  to clear the tile. Its tints **alternate** pale blue / pale gold rather than
  tracking the level, so they are positional, not semantic. 797.1 against
  Figma's 787, which is the four cards' borders.
- Five more icons off the saved batch: `circle-slash`, `circle-half`,
  `padlock`, `courthouse-line` and `key`.
- **A `key: string` annotation breaks next-intl's typing.** Widening the key
  makes `t(`${key}.title`)` a plain template string, which the typed catalogue
  rejects. Declare the array `as const satisfies readonly {...}[]` so the keys
  stay literal *and* the shape is still checked — the same trap
  `resultatsItems` hit, with a tidier fix.

- Pass 4 landed `cmp` and the first `seam`.
- **`cmp` is a real `<table>`** — three named columns compared across five
  rows, so the markup says so, with `<th scope>` on both axes. Its 230/325/325
  columns are the comp's; it scrolls inside its own container below 680px
  rather than crushing three columns of legal text. 559.2 against Figma's 552,
  which is the five row rules plus the card border.
- **`seam` measures exactly 124.2, the comp's own height** — and its figure is
  a second composed asset. Figma builds the `avocate` from **29 separately
  inset vectors**; they are flattened into `lawyer-figure.svg` at those exact
  insets, the same technique as `paris-skyline.svg`. Placement comes from the
  `inset-[t_r_b_l]` percentages against its 50.125x84.202 box.
- **Its two skin tones (#A8724D, #C98D63) stay raw hex.** They are
  illustration content, not brand colours, and inventing tokens for them would
  pollute the palette — the same call `paris-scene.svg` makes for its `black`
  shading fills. Flagged in the file itself.

- Pass 5 landed the `trap` callout, two more headings with their prose, and
  the `tl` timeline.
- **`RuleBox` became `Callout` with variants**, because `trap` shares its
  anatomy but not its look: white with a 5px periwinkle left edge and a plain
  `text-button` tag for `rule`; pale gold, no border, and a brique tag that
  carries the **overline's 0.18em tracking** for `trap`. The tag styles are the
  easy thing to get wrong — one is `text-button`, the other `text-overline`.
  The trap measures 206.4 against Figma's 206.
- **The timeline's rail is drawn per item, not as one line.** A single
  absolutely positioned rail has to know where the last dot is; a `bottom-`
  guess left it running past the end whenever the last step's body was tall.
  Each item now draws its own connector from under its dot to the next
  (`top-6.25 -bottom-11`), with `group-last:hidden` dropping it on the final
  item — so it reflows and always stops on the last dot.

- Pass 6 landed the `Les actes qui appellent une autre forme` and
  `Organiser sa preuve` runs, the second `seam`, and the `vigil` list.
- **A seam's height is driven by its figure, not its text.** Both seams are
  exactly 124.2 in the comp: the 84.2px `avocate` plus its 20px padding. Figma
  gives the two text frames *different* widths (421 and 375), and pinning
  either one wraps the other onto a fourth line and pushes that seam to 144.
  The text flexes instead, and both land on 124.2 exactly. Seam 2 reuses the
  same composed `lawyer-figure.svg` — its 28 vectors are the same figure.
- `vigil` measures 350.9 against Figma's 344, which is its five rules.
- Five more icons: `shield-badge`, `inbox`, `page-corner`, `monument` and
  `clock`. **The last two were first named from their path data and were
  wrong** — `M12 4V20 M19 8L12 4L5 8` read as an arrow but renders as a
  monument, and a circle with hands is a clock, not a mark. Render a glyph
  before naming it; path data alone misleads.

- Pass 7 landed `reflist` (thirteen ruled rows of source texts, each ending
  in its own link) and `jur-list` (five decision cards, citation first). Two
  more icons: `open-code` and `balance-scales`.
- `reflist` measures 1124.5 against Figma's 1104 — its thirteen rules.
- **`jur-list` measures 1044.7 against Figma's 972, and the gap is real**: its
  two longest bodies each render four lines where the frame allows about two
  and a half. Both are `w-full` inside the same 28px padding, so the measure
  is identical — this looks like the frame being undersized against its own
  content, the same thing already recorded for the Contrats Domaines grid
  (`h-966` declared while needing ~989). Worth confirming with the designer
  before treating it as a build error.

- Pass 8 landed `outil-triage`, the article's second tool. Static for the
  same reason as the simulator, and its third option is the one Figma marks
  chosen — reproduced as `aria-current` on a list row rather than as a control
  that does nothing. 757.4 against Figma's 813, which is the same 56px that
  flexing the result values costs in the simulator.
- **Its FAQ has eleven questions and Figma answers only the first.** The other
  ten were drafted, on the user's instruction, strictly from what this article
  already states above — it covers every one of those questions directly, so
  no new legal claims were introduced. **That takes the sign-off list from six
  drafted answers to sixteen**, all client-facing legal copy.
- Its FAQ measures **1022.7 against Figma's 1022** and behaves: eleven native
  `<details>` sharing a `name`, exclusive, closed answers failing
  `checkVisibility()`, and the article still a server component.
- **Its marker is Figma's own `–` / `+` pair, not the domain pages' rotated
  triangle** — a plus cannot be rotated into a minus, so the two glyphs swap
  on `group-open` instead.

- Pass 9 landed `consult` and `takeaways`, which **completes the article
  column**: it measures **14,179.4 against Figma's 14,237 — 0.4% over more
  than fourteen thousand pixels**, with every block within a few px of its own
  frame.
- `consult` is a second composed figure: Figma's `AvocateDark` is the same
  29-piece construction as the seam's, recoloured for the dark ground, so it
  ships as `lawyer-figure-dark.svg`. Its `#354E75` robe joins the two skin
  tones as literal hex — illustration content, not brand colour.
- **`flex-1` collapses a sized flex item.** The consult's four 388px fields
  landed on one row instead of Figma's two, because `flex-1` sets
  `flex-basis: 0`. `grow basis-97` keeps the width and wraps correctly — and
  that single class was 63px of the block's height. `flex-1` is right for a
  column that should take the remaining space, wrong for one with a designed
  width.
- Its form inputs are real and labelled but **not wrapped in a `<form>`**,
  like Tools and the OpenData lookup: no submit handler means a bare form
  would reload the page on Enter.

- **The rail is sticky, and `self-start` is what makes that possible.** In a
  flex row the default `align-items: stretch` makes the rail as tall as the
  14,000px article, leaving nothing to stick — `sticky top-6 self-start` is
  the pair that works. Verified by scrolling: it pins at 24px and stays there
  through the whole column.
- **It takes no height cap and no internal scroll**, which is what makes its
  whole height readable. A sticky element unpins when its containing block
  ends, so the rail rides up over the last screenful and its bottom — CTA
  card, author card, verification line — is on screen by the end of the
  section. Capping it at `calc(100vh - 3rem)` with `overflow-y-auto` pinned it
  forever and hid that bottom behind an internal scrollbar the reader had to
  find; adding `no-scrollbar` only hid the evidence. Measured at 1920x900:
  pinned at top 24 until y=14163, then released with its bottom tracking the
  column's to the page end.
- Its `pb-24` is **clearance for the sticky bar**, not rhythm. The bar is
  fixed over the last 78px of the viewport by the time the rail releases, so
  at `pb-4` the verification line unpinned directly underneath it.
- **Its table of contents is real.** The ten headings carry anchor ids and
  `scroll-mt-6`, the entries are `<a href="#...">`, and a scroll-spy moves the
  gold active marker as you read — Figma marks only the first entry active,
  and a highlight that never moved would be worse than none. That makes `Rail`
  the article's second client component; `Corps` itself stays a server one.
- **Figma renders the TOC's last entry at 40px Poppins Bold** — the section
  title style leaking into a list item. It is built like the other nine.
- **An element can overflow the page without its own box ever leaving it.**
  Consult's footnote was `min-w-0 flex-1` beside a 259px button in a 279px
  row, so the box shrank to **2px** and its *text* painted 53px past a 375
  viewport. `documentElement.scrollWidth` caught it; the element scan did not,
  because every rect was inside the page. It is `w-full sm:w-auto sm:min-w-0
  sm:flex-1` now, so it drops below the button until there is room beside it.
  `min-w-0` is what permits this: it lets a flex item shrink past its own
  min-content width, which is the opposite of the Tools fix that *added* it.
- The 15–21 elements the sweep flags at 640 and 375 are all inside
  ComparisonTable's `overflow-x: auto` wrapper — a wide table scrolling in its
  own container, which is the intended handling. Filter the scan by ancestor
  `overflow-x` before reading a raw count as breakage.

- **The body has exactly two inline runs**, shared by every paragraph and box,
  so they live once in `Prose.tsx` as `proseTags`: `<b>` is Poppins SemiBold
  18/1.35 — Figma's H4 metrics used inline, hence `text-h4` *plus* an explicit
  `font-poppins` — and `<ref>` is a legal citation, Inter SemiBold **16**/1.45
  in brique. The citation is a real size change mid-sentence, not just a
  colour.
- Its prose is full-strength `encre`, not the `encre/62` every other section's
  body uses.
- Figma spaces these blocks with **explicit spacer frames of varying height**
  (18, 56, 16, 30…) rather than one rhythm, so the gaps are margins per block
  rather than a `gap` on the column.
- Positions land within 3-6px through the first run, drifting slowly because
  the mixed inline line-heights resolve differently: a `<b>` run at 1.35
  inside a 1.4 paragraph takes the larger line box here, where Figma's own
  render mixes them. Expect roughly half a percent of accumulated drift over
  14,000px — worth knowing before chasing it.

- **`shield-check.svg` already existed and the Cabinet build clobbered it.**
  The name looked free because the path-match script correctly reported "no
  match" — the two are genuinely different shields (the old one spans
  5.42-20.58 at stroke 1.95, the export 4.875-21.125 at 2.1125) — but the
  script compares *drawings*, not *filenames*, so a `cat >` overwrote a
  tracked asset. The original is restored and the export ships as
  `shield-check-wide.svg`. **Check `git status` for an `M` on an asset after
  every batch**, and note the original is an orphan: nothing imports it, and
  nothing did before this either.

- **CTAFinal is the site's fifth CTA panel and the closest match on the
  build**: section **550 against Figma's 550**, four of its five copy bands
  pixel-identical and the fifth within 1px, and both ornaments within 1-2px.
- Only its **title** is this page's own. The overline, lead and phone line
  come from `ContactCta` as the other panels do, and the two button labels
  moved into that block as **`ContactCta.ask`**, which the Bibliotheque hub's
  panel now reads too — so `BibliothequePage.ctaFinal` is down to a single
  key. Verified after the move: the hub panel still measures 550.36 with its
  own title and both shared labels.
- **Its ornaments are the hub's two, swapped and resized**: the magnifier
  moves to the bottom left at 150 (from the right at 140) and the nib to the
  top right at 103.125x150 (from the left at 110x160).
- `magnifier-check.svg` at 150 is an **exact uniform 1.07143 scale** of the
  140 file — all 66 path numbers match to 0.0000 — with `stroke-width` left at
  10 rather than scaling to 10.71. **Reused rather than forked**: 0.7px of
  stroke on a 150px ornament is the Cabinet-icon case, not the `open-book-lg`
  (6 -> 8.35) or arc (6 -> 9.97) case that earned a second file. The measured
  cost is the whole difference in the diff — a 117x111 rendered box against
  Figma's 115x110.
- `pen-nib.svg` is now reused at a **third** box: 110x153 native, 103.125x150
  here exactly as on the Contrats CTA, and 110x160 on the hub. It carries no
  strokes at all, so every stretch is exact.

- **Transparence shares all five strings with the Bibliotheque hub's block
  but is a different component.** The copy moved to a shared top-level
  **`Transparence`** namespace — the second such namespace after `ContactCta`
  — and `BibliothequePage.transparence` is gone. Section 371 against Figma's
  370, 7 ink bands in both within 1px, and both paragraphs wrap at the same
  word (extents 1441 against 1439, 1435 against 1431).
- **Both frames were read before changing either.** They genuinely differ in
  five places, so this is not a bug in the shipped hub section: head gaps 8/8
  here against 10/4 there, the head capped at 784 here and uncapped there, the
  disclaimer **full white** here and white/70 there, the closing sentence
  **rose only on `Signalez-la-nous.`** here and rose for the whole line there,
  and 52px of bottom padding here against 28.
- That last difference is why the shared string carries a `<link>` tag: the
  article wraps the chunk in `text-small-strong text-rose`, the hub renders it
  plainly inside an already-rose paragraph. Verified after the move — the hub
  still measures 341.36 with its own colours and no missing keys.
- Its band is **1100 left-aligned inside the 1200 one**, not centred: 1100
  centred in the 1245 Container would start at 410, where the frame says 360.
  So the band positions (`mx-auto max-w-300`) and the text measures
  (`max-w-275`, `max-w-196`) are two separate things here.

- **The sticky bar photobombs any capture taken past 50% scroll.** It is
  `position: fixed`, so `Page.captureScreenshot` paints it over whatever
  section is being measured — in the first ALireEnsuite diff it merged four
  text bands and made a correct card body read as broken. Hide every
  `position: fixed` element outside the header before capturing. `shoot.js`
  in the scratchpad does the load-images-then-hide-fixed dance for this page.
- **ALireEnsuite**: section 1461 against Figma's 1451, every band within 3px
  through the cards and +9/+10 by the tail — that 10px is five card borders.
  Five blocks: prev/next, a 3-up library grid, the model row, and the
  sub-category list.
- **Its prev/next labels are deliberately asymmetric.** Figma sets
  `← précédent` as the brique **overline** (0.18em tracking, lowercase) and
  `SUIVANT →` as the periwinkle **Button** style (no tracking, uppercase).
  Check the tracking before assuming a pair of labels shares a style.
- Its type pills reuse the Vitrine's data-driven colouring exactly — pale gold
  for a guide, pale blue for a fiche, domain always pale periwinkle, all at
  the same 11/3 padding. Same pill, so no seventh variant.
- **Its sub-category list needs `items-start`.** Figma keeps each row at its
  own height, so a one-line row's rule sits 25px above its two-line
  neighbour's; a stretched grid levels them. Reproduced to the pixel: 1339 and
  1364 against Figma's 1329 and 1354.
- Card 1's title is the **same string as the previous-article link**, so it is
  one key read from two places rather than a ninth verbatim duplication.
- Figma puts `whitespace-nowrap` on the next-article title. That is an
  auto-layout artefact — it fits on one line at the designed width anyway, and
  keeping it would push the page wide below ~500px. Omitted.
- Three new photos, all at 1197x672 = 3x the same 399x224 box the Vitrine
  cards use: `lounge-conversation`, `standing-huddle`, `glass-meeting-room`.
  Only the middle one takes a Figma placement (240.4% height, top -38.23%);
  the other two are plain centre `object-cover`.
- `model-folder.svg` (64x56) needed **no new token** — all four of its fills
  are existing ones (gold, lilas, encre, periwinkle), unlike the two skin
  tones and the dark robe in the article column.

- **`next/image` lazy-loads, so a beyond-viewport capture photographs empty
  boxes.** The first Interlocuteurs pixel-diff reported 10 bands against
  Figma's 8 purely because neither portrait had loaded 15,900px down the page
  — the merged portrait-plus-text band was missing and every band below it
  read as displaced by ~77px. Scroll the section into view and await
  `img.complete` on each image *before* `Page.captureScreenshot`. Nothing was
  wrong with the layout; the second capture matched to 3px.
- **Interlocuteurs**: section 780 against Figma's 776, 8 ink bands in both and
  every band within 0-3px — that 4px is the two cards' 2px borders. Its head
  repeats the Cabinet band's 10/14/44 shape, so it is written out too.
- **Its Mariela portrait is the same crop as the rail's**, not a new one:
  Figma places the shared 3744x2496 original at 231.12% / 154.08% with a
  -29.68% / -3.23% offset, which resolves to the identical 1620x1620 window
  `lawyer-portrait-square.jpg` already carries (mean abs diff 1.68 of 255,
  i.e. JPEG noise). That file was **promoted from 270 to 312** — 3x this
  section's larger 104px circle — and reused in both places rather than
  shipping a near-duplicate. Only `tony-portrait-square.jpg` is new.
- Its chips are the **sixth pill variant on the site**: lilas ground,
  `text-small-strong` in encre/62, 12/4 padding. They are plain `<li>`s, not
  `Chip` — `Chip` renders a `<button>` and these are labels, not controls.
- Its "angle" note is a 3px `pale-gold` left border with a rich `<b>` run in
  `text-button font-poppins text-encre` ahead of ordinary `text-small` body.
  Figma writes the paragraph at `text-[0px] leading-[0]`, which is its usual
  mixed-inline artefact, not a real style.
- Its button is the outline `Button` at Figma's 20/11 — `size="sm"` plus
  `py-2.75`, since `sm` is 20/12.
- **Its two cards are deliberately not levelled** (420.8 and 429.6): Figma
  marks the row `items-start` and neither card carries `self-stretch`, unlike
  the Cabinet grid above where the first one does.
- Below `sm` the card's own row stacks portrait over text. Figma specifies
  desktop only, and at 375 a 104px circle beside the copy leaves 151px of
  measure. Sweep is clean from 1920 to 320.

- **Cabinet went in clean**: section 777 against Figma's 774, 14 ink bands in
  both, every band within 1-3px, and that 3px is the cards' 2px border. Three
  prestations with their billing stated, over a footnote row.
- Its head is **written out rather than using `SectionHeading`** — Figma puts
  10px under the overline and 14px under the title where that component uses
  one gap for both, and its lead is `text-small` at the full 1245, not the
  `text-body max-w-160` default. Same call the Vitrine and Transparence made.
- **Its three icons carry `stroke-width="2.1125"` where the library's 26px
  icons carry `1.95`** — same box, heavier stroke, so the stroke did *not*
  scale with the geometry. Two of them (`file-lines`, `balance-scale`) match
  an existing file's path data exactly and are **reused anyway**: 0.16px of
  stroke at 26px is invisible, confirmed by cropping both tiles and comparing.
  Contrast `open-book-lg`, where the unscaled stroke would have drawn 8.35px
  against 6 — that ratio justifies a second file, this one does not.
  `shield-check.svg` is genuinely new; the existing `shield-badge.svg` is a
  50px two-tone illustration, not this 26px line glyph.
- Its middle card's terms line is `text-h4` encre because it is an amount
  (1 200 € HT); the other two are ordinary `text-body` encre/62. Carried as a
  `price` flag rather than three separate card bodies.
- Its cards' descriptions **wrap one word earlier than the comp** — content
  box 341 against Figma's 343, because `border` sits outside the padding box
  where Figma draws it inside. Line counts and every band position still
  match, so this costs no height; it is the whole of the section's 6.4 x-band
  ink delta and is not worth chasing.
- All four of its CTAs are inert: `/prestations` and `/prestations/<key>` do
  not exist, so `MaybeLink` renders spans. Verified.

**Corps is the whole job**: 14429px, 99 blocks, roughly 15,000 words of
French legal prose, and about fifteen custom block types — `rulebox`,
`outil-simulateur`, `ladder`, `cmp`, `seam`, `trap`, `tl`, `vigil`,
`reflist`, `jur-list`, `outil-triage`, `faq`, `consult`, `takeaways` — plus a
300px `rail` carrying a scrolling table of contents and a pinned card. The
user asked for **all of it verbatim**, so expect several turns on this
section alone.

- `--text-article-title` was added for its 46/52 title: a real size in the
  design with no named Figma style, under the `--text-badge` / `--text-price`
  precedent. Fluid over the same 375..1440 range as `--text-h2`.
- Its hero row takes **no gap** — the copy column flexes against a 504px image
  stage inside the 1245 band, leaving 741. A `gap-12` takes it to 693 and
  pushes the title onto a third line. That is the third section to hit this.
- Its verification chip needed the same rotation correction as the
  Bibliotheque polaroid: Figma's 0/306 is the *bounding box* of the rotated
  frame, so the untransformed box sits at 2.6/313.
- **The gold marker is a fixed 12.17em bar, not a highlighted chunk**, so it
  needs `max-w-full`: below ~500px it is wider than its column and pushed the
  whole page to 410. Caught by `scrollWidth`, **not** by the element scan —
  the marker is `aria-hidden`, which that scan excludes. Trust `scrollWidth`.
- Its hero photo is the **same source file** as the Vitrine's first card,
  which is fitting: that card is this article. Stored as a second crop,
  `reading-outdoors-tall.jpg`, because the hero shows a taller window of it.
- Its `ArticleActions` are real: copy-link writes the canonical URL to the
  clipboard and print opens the dialog. That makes them the first genuinely
  working buttons on the site, and the hero's only client component.

## Hard rules

- **Tokens only.** No hardcoded hex, no arbitrary font sizes, no one-off spacing.
  All colours and text styles live in `src/app/globals.css` under `@theme static`.
- If a Figma value has **no matching token, stop and ask** — never invent one.
  Tokens added this way so far: `--text-nav`, `--text-h2-sm`, `--radius-card`,
  `--radius-tile`, `--radius-field`, `--radius-panel`, `--container-page`,
  `--text-badge` (Poppins Bold 16 / 0.08em, Tools' uppercase card badges),
  `--radius-note` (10px) and `--radius-note-lg` (18px) — Tools' inset result
  panels, two sizes because the Contentieux and Contrats frames disagree about
  the same element — `--color-sand` (#d8d2c2, the FAQ illustration's paving
  joints and arch lintel; asked before adding, since it is the first
  illustration colour with no token) — `--text-body-strong`
  (Inter SemiBold 18/1.5 — Figma's "Petroff/Body 18 strong", the FAQ questions)
  and `--text-price`
  (Poppins Bold 30 — Figma's own "Petroff/Price", the forfait amounts; added
  under the `--text-badge` precedent rather than re-asking, since it is the
  same case: a named Figma style with no matching token).
- **`text-*` tokens carry size, line-height, weight and tracking — never the
  font family.** A `text-lead` span inside a `font-poppins` paragraph renders
  in Poppins, not Inter, and reads visibly wider and heavier. Pair the token
  with `font-inter` (or `font-poppins`) whenever the run differs from its
  parent. This is what made the Contrats MidCTA's gold half wrong.
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
  Live today: `/`, `/expertises`, `/expertises/contentieux-arbitrage`,
  `/expertises/contrats-commerciaux`, `/bibliotheque` and
  `/bibliotheque/article-design`.
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
  lookup, mobile nav, the Expertises dropdown, the Bibliotheque hero's search
  field, its Vitrine carousel and its Resultats filters.
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
  them as data; `MaybeLink` renders them as spans until the pages land. The
  article's Cabinet band adds `/prestations` and three `/prestations/<key>`
  detail paths to that list.
- Language switcher renders EN/中文/ES as disabled — only `fr` is registered in
  `src/i18n/routing.ts`. They become links automatically when locales are added.
- The phone number "+ 33 (0) 1 78 90 46 46" appears in two places: the home
  CTAFinal lead and the Expertises CTAFinal's second lead line (`contact`).
  Both are plain text, not `tel:` links, and the header phone control is still
  inert — wire all three up together if that number is real. Its spaces are
  ordinary, unlike the U+202F in "24 h".
- SearchBand submit and the OpenData SIREN form are inert placeholders. The
  popular chips prefill the search field instead of navigating.
- **There are six CTAFinal components** — home, Expertises, Contentieux,
  Contrats, Bibliotheque and the article — and all but the home one share
  their copy through the top-level **`ContactCta`** namespace. The three
  domain/hub panels read its `ctaPrimary`/`ctaSecondary`; the two library-side
  panels read its **`ask`** pair instead and supply only their own title. The
  home one keeps its own `CTAFinal` namespace, which is genuinely different
  copy. The components themselves stay separate on purpose: different
  ornaments, panel gaps and section padding.
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
- French thousands separators and unit gaps use a **thin space (U+2009)**.
  Figma's gap measures 6px at 30px Poppins; U+2009 is exactly 6.00px there,
  where the U+202F originally used renders at only 3.19px and left prices
  reading "1200 €". Measured with a hidden probe span, not guessed. Caveat:
  U+2009 is a *breaking* space, so a number can in principle wrap across it —
  add `whitespace-nowrap` if that ever shows up. (U+00A0 is 6.36px and
  non-breaking if the wrap matters more than the exact width.)
