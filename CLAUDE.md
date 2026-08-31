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

### Redesign pass — frame `13323:4394` (1920x5722)

A second Home frame, being re-derived section by section. Same ten sections in
the same order; the user reports the changes are mostly colours.

- **Header (`13323:4395`) is unchanged.** `get_design_context` returns code
  byte-identical to the old `12841:24111` — same `rgba(246,245,242,0.2)` ground,
  `encre/8` rule, `#122a4c` CTA and active language pill, 72px row in a 1245
  container — and all four assets (logo mark, wordmark, tagline, phone) match
  the committed files' path data exactly. **Diff the old node against the new
  one before rebuilding a section**; one extra call saves a rebuild.
- Re-deriving it did surface a long-standing deviation, now fixed: Figma
  specifies the nav links as **Inter Regular 16/1.5** — its "Petroff/Small 16"
  style, i.e. `text-small` — where the build used the invented `--text-nav`
  token, Inter **Medium** 16 at line-height normal. Both frames say Regular, so
  `--text-nav` never had a Figma style behind it. The header links, the
  `NavMenu` dropdown and the `MobileNav` panel now take `text-small`; all five
  link widths land within **0.9px** of the comp (82/80/95/130/75 against
  81.2/79.1/94.1/129.6/74.5). `--text-nav` is still used by the Footer,
  OpenData and the Contentieux Forfaits — **check each against its own frame**
  when that section is re-derived rather than changing the token globally.
- Its measured geometry otherwise matches: row 1245 @ 337.5, logo 148.8x36.4,
  lang pill 211.8x41.2 @ 1105.3, CTA 211.4x43.2 @ 1324.5, phone exactly 38x38
  @ 1544.5. The pill's +2 and the header's 73-against-72 are the usual
  border-box difference. No overflow from 1920 down to 320.
- The nav cluster sits ~45px left of the comp because our two submenu carets
  are not in Figma. That is the documented Expertises/Bibliotheque dropdown
  addition, not a layout fault.

- **Hero (`13323:4447`) changed in exactly three fills, and nothing else.** All
  seven ornament drawings are byte-identical in path data to the committed
  assets, every one of the eight ornaments keeps its exact Figma coordinate and
  box, and the copy is character-identical to `messages/fr.json`. The layout
  numbers the build already had — 900px inner, `pt-22.5` / `pb-24`, 560px lead,
  22 and 32px spacers, 660px stage — are unchanged. What moved:
  - `laurel-branch.svg`: 6 fills brique -> **mint `#44CBA1`**
  - `courthouse.svg`: 4 fills pale-periwinkle -> **pale-blue `#DCE4F2`**
  - `arc-de-triomphe.svg`: 2 fills pale-periwinkle -> **pale-blue**
- `--color-mint` (#44cba1) was added for the first of those. It is Figma's own
  **"Petroff/Mint"** library style, so it goes in under the `--text-badge`
  precedent — a named style with no matching token — rather than being invented.
- **Two of those three files are shared, and were recoloured in place** on the
  user's instruction to follow Figma: `laurel-branch` is also used by the
  Contentieux hero and both FAQ illustrations, and `courthouse` by the
  Contentieux hero. Those pages therefore now show a mint laurel and a pale-blue
  courthouse **ahead of their own frames being re-derived**. If a redesigned
  domain frame turns out to keep brique, fork a variant for it rather than
  reverting the file. `arc-de-triomphe.svg` is home-only, so it carries no such
  risk.
- Measured against the frame: section **660 exactly**, and the pale-gold marker
  bar lands at **exactly 420x26 @ (750, 236)** — all four coordinates. Note
  Figma draws that bar as a separate rect centred on the 1920 stage where the
  build anchors it to the highlighted chunk with em units; the two agree to the
  pixel, so leave it anchored. Overline, title and lead land within 0.6px; the
  CTA row's 53.2 against 51 is the outline `Button`'s 1.5px border sitting
  outside the box, as everywhere else.
- No overflow from 1920 down to 320.
- **SearchBand (`13323:4519`) is unchanged too** — identical generated code to
  the old `12843:887`, no assets, no new tokens. Re-deriving it did fix two
  more long-standing mismatches, on the same "follow Figma" instruction:
  - its heading is Figma's **"Petroff/H3 Card"** — Poppins SemiBold **20**/1.3,
    i.e. `text-h3` — where the build used `text-h2-sm` (Poppins SemiBold 24).
    It now renders 20px on a 26px line box, exactly the comp's text height.
    `text-h2-sm` is still correct for the consultation drawer, so the token was
    left alone and only this call site changed.
  - its placeholder is **encre/62**, where the build used `encre/50`.
- Measured: form 820x59.2 at y=110 and the gold button 149.2x43.2 both land on
  the comp; section 295.2 against Figma's 293. The chips drift right by ~2px
  each — the usual border-box difference, five chips, so the row ends 12.3px
  past the comp's 1208. Nothing else moved.
- **Expertises (`13323:4538`) is the first section with a real change**, and it
  is again colour only: the eight card icon tiles go from a two-colour
  blue/gold alternation to **four tints**, and the sequence does not repeat —
  row 1 is blue / pink / mint / gold, row 2 is mint / gold / blue / pink. So
  `tone` is carried per card in `lib/expertises.ts`, not derived from the index.
  Everything else — all eight icons (path data and `stroke-width="1.95"`
  identical to the committed files), the copy, the 296.25 card width, the
  52px tile at `rounded-tile`, the 12px spacer, the head — is untouched.
- Two more named library styles became tokens, same precedent as `--color-mint`:
  **`--color-pale-mint` (#e8f5f1, "Petroff/Pale_Mint")** and **`--color-pink`
  (#fac5ef, "Petroff/Pink")**. The pink tile is drawn at **40%** —
  `rgba(250,197,239,0.4)` — so the class is `bg-pink/40`; Figma never uses that
  colour at full strength here.
- The **Expertises hub page's own `domaines.ts` still alternates blue/gold**.
  Its frame (`12858:886`) has not been re-derived, so it was left alone — but it
  is the obvious next place this four-tint palette will show up.
- Measured: all eight cards land on their exact Figma x (337.5 / 653.75 / 970 /
  1286.25) and the head's three bands within 0.2px. Card height 247.6 against
  245 and row 2 at 560.7 against 558 are the 2px card border, as everywhere.
  **Figma's own frames are undersized again** — `grid-exp` declares 502 while
  its two 245 rows plus a 20 gap need 510, and the section declares 891 while
  its content needs ~899 — the same thing already recorded for the Contrats
  Domaines grid. Judge this section by the card positions, not its frame height.
- Figma still draws card 1 with a permanent `0px 14px 17px` drop shadow. That
  is unchanged from the old frame and is still read as the designer showing
  `Card`'s hover state, so it is still not reproduced statically.
- **Bibliotheque (`13323:4607`) changes in one line**: the three big counts are
  **mint** (`#44CBA1`) where they were `periwinkle`. Same `text-h2` Poppins Bold
  40 otherwise, and nothing else in the section moved — no assets, no new
  tokens (mint arrived with the hero), same white ground, same 401.67 cards at
  `px-7 py-9`, same brique CTAs.
- Measured: all three cards on their exact Figma x (337.5 / 759.17 / 1180.83),
  every band within 1.2px, section 671.9 against Figma's 669 — the 2px card
  border. Card 2's CTA still sits 25px above the other two (494.5 against
  519.7), which is the comp's own two-line description and the documented
  "card CTAs are not bottom-aligned" behaviour.
- **OpenData (`13323:4632`) changes one badge**: **Judilibre is pale mint**
  where it was pale gold. The other three source badges are unchanged, so
  `sources` now carries three tints rather than a blue/gold alternation.
  Nothing else in the section moved — same lilas ground, same 612.5 cards, same
  dashed `encre/12` rules, same result-green status row.
- Re-deriving it fixed two more drifts, both the same kinds already corrected
  on the Header and SearchBand: the veille item title is Figma's **Inter
  Regular 16/1.5** (`text-small`), not `text-nav`; and its placeholder is
  **encre/62**, not encre/50.
- That leaves **exactly one `text-nav` call site on the site** —
  `contentieux/Forfaits.tsx:54` — on a page whose frame has not been
  re-derived. Check it against its own frame when that page's turn comes; if it
  is Regular there too, the token can be deleted outright.
- Measured: both cards on their exact Figma x (337.5 / 970) at 612.5 wide, the
  siren field 59.2 tall, and all four badges within 0.7px of their comp widths.
  The +1px on the field's x and -2 on its width are the card's 1px border,
  which Figma draws inside; the rows and badges accumulate 1px per dashed rule,
  so the badge row lands 4.2px low and the section measures 835.4 against 830.
- **Cabinet (`13323:4679`) is the first structural change of the pass.** Its
  left column is byte-identical to the old `12843:895`; its right column is
  entirely new. The collage — pale disc, columned building, sparkle and two
  tilted polaroid prints on a 440px stage — is replaced by **one 518x592
  photograph** on a 600px stage, with four different corner radii
  (tl 200 / tr 10 / br 100 / bl 60). `CabinetCollage.tsx` is deleted and the
  photo is inline in `Cabinet.tsx`.
- **Figma stretches that photo non-uniformly, and the stretch is real.** It
  paints the 3072x4096 source at 521.99x783.22 inside a 518x592 box, so the
  visible window is 3049x3096 of source squashed to a 0.875 ratio — an 11%
  horizontal squeeze. Settled by rendering both candidates and diffing them
  against `get_screenshot` of the image node: the squashed crop matches at
  **2.35/255**, a uniform `cover` at **27.41**. So the squeeze is baked into
  the stored file and the markup is a plain `object-cover`.
  **This is the way to resolve any "is that fill stretched?" question** — build
  both and diff against the node's own render.
- `signing-table-overhead.jpg` is stored at 1554x1776, 3x the comp's box, 293KB
  — the largest photo on the site, and proportionate to the largest box.
- Unlike the collage it replaces, the photo is **not hidden below `xl`**: one
  image scales cleanly where five stacked ornaments could not. It is
  `aspect-[518/592] w-full max-w-129.5` and pinned right, since Figma's
  left 72.5 + 518 is exactly its 590.5 column.
- **Figma's stage is 600 tall with the 592 photo at its top**, so the 8px below
  it is real and sets the section height. Without `xl:h-150` the section
  measured 784 against the frame's 792; with it, **792 exactly**, and the left
  column's centring improves to within 1.3px.
- **Its three counters must never break onto a second line, and they were one
  bad font-load away from it.** Figma marks the `stats` row (`13323:4686`)
  `flex-nowrap` with `whitespace-nowrap` and `shrink-0` on all three, so the
  comp cannot wrap at all — the build had `flex-wrap`. Measured, the row needs
  **565.8 of the column's 590.5** (576 at `xl`), which is 4% of slack at 1920
  and under 2% at 1280 — well inside the difference between Inter and the
  metric-adjusted fallback shown while the webfont loads, which is why it
  wrapped on some machines and not on this one. Reported from a Mac.
  It is **`flex-nowrap` from `sm`** with **`min-w-0`** on each counter, so the
  three always share a row and a label wraps inside its own column rather than
  pushing the page wide. Below `sm` the column is 335 against the row's 566, so
  there it still wraps — correctly.
  Verified by exaggerating the failure: with **+1px and +3px of tracking on
  every label** — far more than any fallback costs — the row still measures
  **one row at 1920, 1536, 1280, 1024, 768 and 640**, the `dl` simply growing
  74 -> 98 as one label takes a second line, and no horizontal overflow at any
  width. Desktop at rest is untouched: counters at x 337.5 / 519.1 / 688.3 (a
  36 gap, Figma's own 0 / 181.6 / 350.8), section still **792**, page still
  **5748**.
  **A wrap that only some machines see is a font-metrics problem, not a layout
  one** — measure the row's slack against its column before looking anywhere
  else. A sweep of every other flex row of 2-5 items across six pages found
  nothing else under 10% slack, so this row was the only one at risk.
- Its stats are Poppins Bold **40** — `text-h2`, not `text-stat`'s 28. **Both**
  frames say 40, so this was a long-standing deviation rather than a redesign
  change. `text-stat` is still used by the Expertises stage and both domain
  heroes, so the token stays; only this call site changed.
- `champs-elysees.jpg`, `team-meeting.jpg` and `circle-backdrop.svg` are now
  **orphans** — nothing imports them. They are left in the tree deliberately,
  in case the collage comes back.
- Measured: photo frame **518x592 at (1064.5, 96)** and radii
  `200px 10px 100px 60px`, all exact; every band in the left column within
  1.5px; section 792 against 792.
- **Actus (`13323:4700`) adds one thing and exposed three.** The only true
  redesign change is the **`vdots` pagination row** (`13323:4882`) under the
  grid: three dots, the first an active periwinkle 30x9 pill, the other two
  `encre/20` 9px circles, 12px apart, centred. The old frame has no such row.
- Everything else the diff turned up was the build drifting from **both**
  frames:
  - **The cards carry photographs, and always did.** The old frame ships the
    same three PNGs at the same crop percentages; the build had shipped tinted
    panels with monument illustrations instead. Now three real photos.
  - Its card kicker is Poppins SemiBold 16 at **0.18em** — `text-overline` —
    not `text-small-strong`'s Inter.
  - Its head row is **`items-start`**: Figma top-aligns the see-all link with
    the overline, not with the middle of the heading block.
  - **Card 1 is the wrong article.** Both frames give it "Preuve & contrats" /
    "Signature électronique : ce qui tient devant un juge français" — the same
    piece the Bibliotheque Vitrine and the article detail page carry. The build
    had an invented "Rupture brutale…" entry. Key renamed `rupture` ->
    `signature`.
- **Every section overline on this page was stored uppercase; Figma writes them
  all mixed-case.** `Expertises`, `Bibliothèque juridique`, `Données & outils —
  open data` (note the lowercase *outils*), `Le cabinet`, `Actualités`, and the
  three Actus kickers. Only the Hero's was already right, because it is title
  case in Figma too. This is the same finding CLAUDE.md already records for the
  domain pages — mixed case is the rule in this file, not the exception — so
  **check the casing of any remaining overline against its frame** rather than
  assuming uppercase.
- Photos: `bench-laptop.jpg` and `plant-filled-lounge.jpg` are new;
  `glass-meeting-room-wide.jpg` is a **second crop of a source the repo already
  had** — its centre crop matches `glass-meeting-room.jpg` at 1.5/255, but the
  Actus window is a different band, so it ships as a second file under the
  `reading-outdoors-tall` precedent. All three are 1205x420, 3x the comp's
  401.67x140 box, with Figma's crop baked in (all three windows are uniform
  scales, unlike the Cabinet photo).
- `haussmann-buildings.svg` is now an orphan; `arc-de-triomphe-colour` and
  `eiffel-tower-colour` are still used by the domain pages.
- Measured: **all three dots exact** (924 / 966 / 987, 30x9 and 9x9), all three
  cards on their exact Figma x, thumbnails exactly 140 tall, kicker resolving
  to Poppins 600 16px / 2.88px tracking, section 712.6 against 711. The see-all
  link's right edge is exact; it renders 5px wider than the comp because the
  arrow sits in a `gap-2` span where Figma types a plain space — the same
  treatment every other "→" CTA on the site uses.
- **CTAFinal (`13323:4727`) changes one fill**: the columned building's four
  columns go pale-periwinkle -> **pale-blue**, exactly as the hero's courthouse
  and arc did. `columned-building.svg` is recoloured in place, which also
  updates the Contentieux CTAFinal — consistent, since `courthouse.svg` is the
  same glyph at another box and was already recoloured.
- The new export is an **exact 1.2x scale** of the committed 150x112 file (max
  deviation 0.005 across 187 path numbers) and carries no strokes, so one file
  still serves both boxes. Its `<rect fill="white">` is the **clipPath
  definition, not a painted background** — inert, and not the white-rect trap
  recorded elsewhere. Check where the rect sits before stripping one.
- Two more build drifts fixed, both present in the old frame too:
  - its overline is **`Contact`**, not `CONTACT`;
  - the section takes **bottom padding only**. **The note claiming "the home
    CTAFinal uses `py-24` and that asymmetry is what Figma specifies" was
    wrong** — both frames give this section `pb-96` with no top padding,
    because Actus above it already closes with its own 96. Fixing it brought
    the section to **445.2 against the frame's 445**; it had been 96px tall.
- Measured: panel 1245x349.2 at y=0, both ornaments at their exact Figma
  coordinates and boxes (building 180x135 at 307.5/244, robe 130x140 at
  1363.5/-30), every copy band within 1.5px.
- **The whole page now measures 5748 against the frame's 5722.** All 26px are
  accounted for by the per-section border-box differences already recorded
  (SearchBand +2.2, Expertises +13.3, Bibliotheque +2.9, OpenData +5.4,
  Actus +1.6, CTAFinal +0.2, header +1) — no section is carrying stray padding.
  Useful whole-page check once the Footer lands.
- **Footer (`13323:4754`) is unchanged** — identical generated code to the old
  `12843:901`, and its three logo assets match the committed files. (The
  tagline's md5 differs but all 704 of its path numbers agree to within
  0.00002 — Figma float noise, the same case as the Haussmann exports. Compare
  numbers, not hashes.)
- Two pre-existing drifts fixed, both the patterns this pass kept finding:
  - its column titles are **`Le cabinet` / `Ressources` / `Outils`**, mixed
    case, not uppercase;
  - **every string in this footer is white 70%.** The build had three different
    alphas — 85% on the legal line and links, 60% on the overlines, 65% on the
    bottom row. Figma sets `rgba(255,255,255,0.7)` on all of them, and the
    render now resolves to exactly one text colour.
- Measured: footer 358.2 against 359, the third link column and every column
  title exact, the bottom rule at 1245 wide. The first two columns sit 3.6 and
  1.9px right of the comp because they are `w-58` (232) against Figma's
  233.636 and the group is `justify-end` — the already-recorded "nearest scale
  value" trade, not a new fault.

### Pass complete — the whole home page

All ten sections re-derived against frame `13323:4394`. Section-by-section
height against the comp, at 1920:

| Section | Figma | Rendered | Δ |
|---|---|---|---|
| Header | 72 | 73.0 | +1.0 |
| Hero | 660 | 660.0 | 0 |
| SearchBand | 293 | 295.2 | +2.2 |
| Expertises | 891 | 904.3 | +13.3 |
| Bibliotheque | 669 | 671.9 | +2.9 |
| OpenData | 830 | 835.4 | +5.4 |
| Cabinet | 792 | 792.0 | 0 |
| Actus | 711 | 712.6 | +1.6 |
| CTAFinal | 445 | 445.2 | +0.2 |
| Footer | 359 | 358.2 | −0.8 |
| **Page** | **5722** | **5747.8** | **+25.8 (0.45%)** |

Every delta is the border-box difference or, for Expertises, that frame's own
undersized `grid-exp`. No overflow from 1920 down to 320.

**What the redesign actually changed** — it is a colour pass plus two content
swaps, nothing structural beyond them:

1. three hero ornament fills (mint laurel, pale-blue courthouse and arc);
2. the Expertises card tiles, two tints to four;
3. the Bibliotheque counts, periwinkle to mint;
4. the OpenData Judilibre badge, pale gold to pale mint;
5. the Cabinet collage replaced by one 518x592 photograph;
6. the Actus pagination dot row;
7. the CTAFinal building's columns, pale-periwinkle to pale-blue.

Three new tokens, all named Figma library styles: `--color-mint`,
`--color-pale-mint`, `--color-pink`.

**Everything else this pass touched was the build drifting from a frame that
had not changed** — worth knowing before assuming the next page's build is
faithful. The recurring shapes were: overlines stored uppercase where Figma
writes them mixed case (seven of them on this page alone); `--text-nav`'s Inter
Medium where Figma says Inter Regular 16/1.5; placeholder text at 50% where
Figma says 62%; and three one-off wrong tokens (`text-h2-sm` for a 20px
heading, `text-stat` for a 40px stat, `text-small-strong` for a tracked
overline). **Diff the old node against the new one for every section** — it is
one extra call and it separates "the designer changed this" from "we built it
wrong", which need different fixes.

### The home page's consultation drawer — `13323:4833` + `13323:4812`

The home page gets the same sliding consultation panel the article has, opened
by a **red** side tab. No sticky bar — the home frame draws only the tab.

- **Their bodies are identical.** Both `db` frames are 510x908 with every
  field, the submit, the footnote, the marks and the phone line at the same
  offsets. The two drawers differ in exactly five places:
  1. a **photograph** (126px wide, `self-stretch`) where the article has the
     composed `lawyer-figure.svg`;
  2. the **lead sits beside that photo**, under the title, instead of below the
     figure row — which is the whole of the 256 vs 300 header height;
  3. the submit and the phone number are **red**, not gold and periwinkle;
  4. the check marks are **periwinkle**, not result-green;
  5. its overline is **sentence case**.
- **That last one is a real per-frame difference, not the casing bug.**
  `get_metadata` on the article's own drawer shows its text node is literally
  named `CONSULTATION — 15 MINUTES GRATUITES`, where this frame writes
  `Consultation — 15 minutes gratuites`. Checking before sharing the string is
  what caught it — **`get_metadata` is the cheap way to read Figma's exact
  copy**, since text nodes are named by their content.
- What is now shared, and how:
  - **`Consultation`** is the third top-level message namespace after
    `ContactCta` and `Transparence`. It carries every drawer string plus the
    tab label and the field labels; only `overline` stays on `ArticlePage.drawer`,
    the same split the Bibliotheque CTAFinal uses. The article's inline
    `consult` block reads its field labels and footnote from it too.
  - **`components/consultation/useDrawerBehaviour.ts`** — focus move, Tab trap,
    Escape, and the scroll lock with its scrollbar-gutter padding. Identical in
    both drawers, and a subtly wrong focus trap in one copy is exactly what
    duplication would have produced.
  - **`components/consultation/SideTab.tsx`** takes a `tone` — `gold` for the
    article, `red` for the home page. It replaces
    `sections/article/SideTab.tsx`.
  - The two *drawer* components stay separate: the header differs structurally
    and four colours differ, which is more than a tone prop.
- The shared `phone` string gained a **`<q>` tag** around its lead-in, because
  Figma weights "Vous préférez appeler ?" here and draws it plain on the
  article. The article passes `q: (chunks) => chunks`, so its output is
  byte-identical to before — verified.
- New: **`--color-red` (#f01a5d, Figma's "Petroff/Red")**, a `red` `Button`
  variant, and `lawyer-portrait-tall.jpg` (378x396, 3x the comp's 126x132 box,
  a centre `object-cover` crop of the same portrait source). `speech-bubble.svg`
  is reused for the tab icon — its path data matches exactly.
- Measured against the comp: tab **45x236** flush right and `#F01A5D`; panel
  **510** wide; overline **exactly 412** at 2.24px tracking; the ✕ exact at
  x=458, 22x24; the photo **126** wide with radii
  `59.854px 2.993px 29.927px 17.956px`, all exact. Panel 1175 against Figma's
  1164 — the fields' documented +4.38 each, plus 3px from `text-h2-sm` drawing
  the title at 35 where Figma's box is 32, which is the same discrepancy the
  article's drawer already carries.
- Behaviour driven and verified on **both** pages: tab visible at scroll 0,
  opening moves focus to the Nom field, `body` overflow locks and restores,
  Escape closes, focus returns to the tab, the closed panel is `inert`, and its
  bleeding `-26px` shadow computes transparent when closed.
- Its submit is inert like every other form on the site, and — as on the
  article — **the tab is `lg:flex`, so there is no way to open the drawer below
  `lg`**. Figma specifies desktop only. Note the home page, unlike the article,
  has **no inline consultation form to fall back on**, so that is a real gap on
  mobile rather than a styling one; showing the tab there is a one-class change.

### Home page — the Hero/SearchBand overlap

Asked for: as the reader scrolls, the SearchBand climbs over the Hero's bottom
edge so the Hero appears to lose height and tuck underneath — **20px, and no
more**. It lives in `SearchBand.tsx`, which was already the page's one client
section, so it needed no wrapper and no extra DOM node.

- **A negative `margin-top`, not a transform.** Everything below the band has
  to come up with it: a `translateY` would leave the eight sections after it
  20px too low and open a gap above the footer. The margin makes the document
  itself 20px shorter, which is exactly right.
- Its ramp is `min(scrollY / 120, 1) * 20`, **rounded to whole pixels** — 20
  steps at one every 6px of scroll, which reads as continuous at this size and
  caps the re-renders at 21 rather than one per frame. Pulling the band up is a
  layout change, so that rounding is what keeps it cheap. Both constants are
  named at the top of the file.
- The band takes **`relative z-10`** so its `bg-encre` ground paints over the
  Hero once the margin bites; the header is z-30, well clear.
- **Nothing moves under `prefers-reduced-motion: reduce`** — the effect's
  effect hook returns before it subscribes, so the margin stays 0.
- Verified by driving real scroll at 1920: overlap **0 / 5 / 10 / 15 / 20** at
  scrollY 0 / 30 / 60 / 90 / 120, holding at 20 through 300 and 900, with the
  Hero's bottom and the band's top coincident at rest (both 733) and 20 apart
  after. Document **5748 -> 5728**, exactly the 20. Under reduce: `margin-top`
  0 and the document 5748 at every scroll position.
- **At rest the page is unchanged** — all eight sections still measure
  660 / 295.2 / 904.3 / 671.9 / 835.4 / 792 / 712.6 / 445.2 and the page 5748,
  the same numbers this file's table records. No horizontal overflow at 1920,
  1280, 768, 375 or 320.

### Responsive spacing pass — home page

Figma specifies desktop only, and the build had been carrying every desktop
value at every width: six sections at **96px top and bottom on a 375 phone**,
1152px of pure padding, about 11% of the page, with the head-to-content gap
stuck at 48 everywhere.

Harmonised on a two-step scale. **Every value at `lg` and above is the Figma
number**, so the desktop page is byte-identical — re-measured section by
section, all ten still land exactly where they did (page 5747.8 at 1920, 5815
at 1280).

| Element | below `lg` | `lg`+ |
|---|---|---|
| The five content sections | `py-16` (64) | `py-24` (96) |
| Their head -> content gap | `gap-8` (32) | `gap-12` (48) |
| SearchBand band | `py-12` (48) | `py-16` (64) |
| CTAFinal section | `pb-16` (64) | `pb-24` (96) |
| CTAFinal panel | `px-6 py-12` | `sm:px-12`, `lg:py-16` |
| Footer | `pt-12` (48) | `lg:pt-16` (64) |
| Hero column | `py-16` | `lg:pt-22.5 lg:pb-24` |
| Cabinet grid | `gap-10` (40) | `xl:gap-16` |

- **`gap-16` on the Cabinet grid was Figma's *column* gap**, but the grid only
  splits at `xl`, so below that it was acting as a 64px *row* gap between the
  copy and the photo — larger than any other stacked gap on the page. It is
  `gap-10 xl:gap-16` now, which leaves the desktop column gap untouched.
- The card grids keep their flat `gap-5`: 20px is Figma's value and it reads
  correctly at every width.
- **This fixed a real clipping bug at 320.** CTAFinal's panel is
  `overflow-hidden`, and "Faire évaluer mon dossier" is 266px against what was
  a 232px content box, so the second button was being cut off. The panel's
  sides now drop to 24px below `sm` and both buttons go full width with their
  labels allowed to wrap (`whitespace-normal sm:whitespace-nowrap` — `Button`
  sets `whitespace-nowrap` in its base class, so it has to be overridden, not
  just omitted). That also closes the standing open item about the CTA panels'
  48px sides being heavy on a 335px phone.
- Result: 8463 -> **7869** at 768 and 10909 -> **10283** at 375, with no
  horizontal overflow from 1920 down to 320 and every route still serving.
- **The Footer change is site-wide**, since it lives in the layout — desktop
  unchanged, mobile lighter on every page. **The other pages' sections still
  carry a flat `py-24`**; harmonising them is the same one-line change per
  section and should be done when each page is re-derived.











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

## Page 2 — redesign check and responsive pass

**The Expertises hub frame `12858:881` is unchanged by the colour pass.**
Confirmed three ways rather than assumed:

1. `get_metadata` on the frame matches the build exactly — same four sections,
   same copy, same heights (72 + 784 + 1727 + 669 + 470 + 359 = 4081).
2. `get_variable_defs` on each of the four sections returns only the
   pre-existing palette — Brique, Encre, Pale blue, Pale gold, Gold, Lilas,
   Lilas 2, White. **No Mint, Pale_Mint, Pink or Red anywhere**, so the
   Domaines tiles keep their two-tone blue/gold alternation where the home
   grid went to four tints.
3. Variables do not cover ornaments, whose fills are flattened into the
   exported vectors — so the Stage and CTAFinal node renders were downloaded
   and their pixels counted: both still contain **`#c7d6ef` pale-periwinkle**
   and **no `#dce4f2`**. **`get_variable_defs` plus a pixel histogram of
   `get_screenshot` is the cheap way to answer "did this frame change?"** —
   two small calls per section against a full `get_design_context`.

- So `arc-de-triomphe-colour-lg.svg` **keeps its pale-periwinkle** while the
  home page's `columned-building.svg` and `arc-de-triomphe.svg` are now
  pale-blue. That is the designer's difference between two frames, not a
  build inconsistency — do not "fix" it without a redesigned frame.

**Responsive spacing harmonised to match the home page**, same two-step scale,
every `lg`+ value left at the Figma number:

| Element | below `lg` | `lg`+ |
|---|---|---|
| Domaines, Facons | `py-16` | `py-24` |
| their head -> content gap | `gap-8` | `gap-12` |
| CTAFinal section | `pb-16` | `pb-24` |
| CTAFinal panel | `px-6 py-12` | `sm:px-12`, `lg:py-16` |

- Its CTA buttons take the home page's treatment — full width with
  `whitespace-normal sm:whitespace-nowrap` below `sm`. They are 265 and 258px
  against a 239px content box at 375, which the `overflow-hidden` panel was
  clipping; this closes the open item that recorded exactly that.
- The **Stage was left alone**: its column is already `pt-4 pb-16` under a
  `py-5` breadcrumb, so it carries no heavy desktop padding to scale down.
- Desktop is unchanged — 4238.0 at 1920 before and after, with Stage 784
  exact, Facons 671.9, CTAFinal 470.4 and its buttons 264.9/257.5 against
  Figma's 265/258. At 375 the page drops 9375 -> 9126.
- Domaines measures 1880.5 against the frame's 1727 at desktop; that is the
  already-recorded tag-row wrapping, where Figma clips the third tag and the
  build wraps it.
- No horizontal overflow from 1920 down to 320. **The two domain pages and the
  Bibliotheque still carry a flat `py-24`** — same one-line change each.


### Page 2 — redesigned again (frame now 4267)

`12858:881` **has changed**, unlike the earlier pass that found it clean. It is
4267 where it was 4081, and the whole 186 is Domaines growing 1727 -> 1913.

- **Every domain card gains a ruled footer.** A full-width 1px `encre/10` rule,
  then a row on a 16px gap: a **pale-blue pill** carrying `Avocats du domaine`
  in encre (20/16 padding) beside the brique `Découvrir →` link the card used
  to close on by itself. Both point at the same domain page, so both are
  `MaybeLink` and both are spans until that page exists.
- **The card's own rhythm flattens to a uniform 16**, where it used to mix an
  8px gap with 12/14px spacer frames. Checked against Figma's own offsets:
  tile 28, title 96, desc 138, tags 204, footer 251 — each is the previous
  element's end plus exactly 16.
- **The tiles go from two tints to four**, and the sequence does not repeat:
  blue / gold / mint / pink, mint / blue / gold / blue, pink / mint / gold.
  Carried per domain in `domaines.ts`, sampled tile by tile from the node
  render — the same call the redesigned home Expertises grid made.
- That pink is Figma's **`#EFCFD9` at 40%**, a *third* hex under the library
  name "Petroff/Pink". Composited over white it lands within 3/255 of
  `--color-pink-soft`, so that token is reused rather than a fourth pink added.
  Note the **home** page's Expertises grid uses `--color-pink` (#FAC5EF) for
  its pink tile — same library name, different colour, different frame. **The
  name is not a stable key; compare the hex.**
- **The transverse card flips from dark to light** — lilas-2 ground with no
  border, a **pale-blue** tile with an encre glyph, encre title, encre/62 body,
  and a solid **gold** button where it had a gold text link on an encre card.
  Third block on this build to make that dark -> light move.
- **The Stage gains one ornament**: the mint laurel at (417, 267) 120x150,
  path-identical to `laurel-branch-mint.svg` — the fork the redesigned home
  hero introduced, now on its third page.
- **The page gains the red side tab** (`13395:14950`), which is the shared
  `SideTab` at `tone="red"` with the shared `ConsultationDrawer` behind it, so
  it is the existing `components/consultation/Consultation.tsx` wrapper
  unchanged. Its glyph is path-identical to `speech-bubble.svg`.
- **No new assets at all** — laurel, speech bubble and the transverse's
  `plus-circle` all match existing files exactly. One new string,
  `domaines.ctaLawyers`.
- All three overlines were stored uppercase; Figma writes them mixed case and
  the call sites already carry `uppercase`, so they are now `Expertises`,
  `Nos domaines` and `Une même méthode partout` in the source.

Measured at 1920: Stage **784** exact, Facons **671.9** against 669, CTAFinal
**470.4** against 470, Domaines **1956.5** against the frame's 1913. Page 4314
against 4267. Domaines' +43.5 is the documented tag-row wrapping — Figma clips
each card's third tag where the build wraps it, which costs ~39px a row — and
**Figma's own frame is 58 taller than its content** (96 + 141 + 48 + 1474 + 96
is 1855, not 1913), so judge this section by its card positions rather than the
frame. No horizontal overflow at any of nine widths from 1920 down to 320.

**Facons (`12858:888`) changes one fill**: card 3's icon tile is **pale mint**
where the row alternated blue / gold / blue. Nothing else moved — same white
cards on `encre/7`, same 20px corner, 28/36 padding, 8px gap with its 6 and 10
spacers, same brique text links, and all three icons (`calendar`, `star`,
`phase-bars`) are path-identical to the stored files. Measured **671.9 against
669**, overline at 96, title 128.8, grid 222.8, all three cards on their exact
Figma x (337.5 / 759.17 / 1180.83) at 401.7 wide. Its card 3 CTA still sits
25.2px below the other two — the documented deliberate behaviour, not a fault.

**CTAFinal (`12858:890`) is unchanged**, and the build already matches it to
the pixel: section **470.4 against 470**, panel 1245x374.4 at y=0 in lilas-2
with a 28px corner, overline 64, title 100.8, lead 162.8 — every band Figma's
own number — and both ornaments on their exact panel-relative coordinates
(three-figures −20.5 / 259 at 180x138, arc 1120.5 / −9 at 149.595x123).
- Its `arc-de-triomphe-colour-lg.svg` export still carries **`#c7d6ef`
  pale-periwinkle**, not the pale blue the home CTAFinal's building went to.
  The fork stands; this page keeps its own colour.

### Page 2 complete — re-derived against the 4267 frame

| Section | Figma | Rendered | Δ |
|---|---|---|---|
| Stage | 784 | 784.0 | **0** |
| Domaines | 1913 | 1956.5 | +43.5 * |
| Facons | 669 | 671.9 | +2.9 |
| CTAFinal | 470 | 470.4 | +0.4 |
| **Page** | **4267** | **4314** | **+47** |

\* Domaines' delta is the documented tag-row wrapping (Figma clips each card's
third tag, ~39px a row) against a frame that is itself 58px taller than its own
content. No horizontal overflow at any of nine widths from 1920 down to 320.

### The centred heroes now start on the same line

Asked for: the centred hero copy should sit in one place across pages. Four
heroes are centred — home, the Expertises hub, and the two domain pages;
Bibliotheque, the article pages and e-commerce are left-aligned and out of
scope. **All four were already horizontally exact** (every `h1` centred on
x=960); only the vertical differed.

| hero | overline, from the section top | page y | after |
|---|---|---|---|
| home | 90 | 163 | unchanged |
| Expertises hub | 80 | 153 | **90 / 163** |
| Contentieux | 194 | 267 | unchanged — see below |
| Contrats | 173 | 246 | unchanged — see below |

**Aligning the overline alone was not enough.** The home hero puts its title
directly under the overline with no gap; the hub's frame draws a 10px spacer.
So matching the overlines pushed the *titles* 10px apart — before the change
the titles happened to coincide at 110.8 and the overlines did not. Both the
hub's spacer and its top padding had to move together: `pt-4` -> `pt-6.5` and
the `h-2.5` spacer deleted. Now **overline 90 and title 110.8 on both**, and
the hub's section is still 784 (its `min-h-180` absorbs the shift) with the
home page untouched at 660.

**This is a deliberate departure from the hub's comp**, on the same footing as
the uppercase eyebrows: that frame puts its `inner` column at y=110, so the
build now sits 20px above it. Worth knowing the build was already 30px above
that number before this change — the frame moved at some point and the note
here claiming "Figma pins this column at y=17" was describing an older one.

**The two domain heroes were deliberately left alone, and the reason is
visual, not effort.** Their ornaments are pinned at literal Figma coordinates
and are composed *around* copy that starts at 194 / 173. Simulated the move in
the DOM and captured it: at 90 the title runs straight through the Arc on the
left and the Eiffel tower on the right, and the courthouse and robe are left
floating under 170px of dead space. **Render the change before assuming a
shared rule can be applied everywhere** — one screenshot settled it. Aligning
those two needs their ornaments repositioned, which is a design decision.

### The hero overlap, now shared

The home page's Hero/SearchBand effect moved into
**`components/ScrollOverlap.tsx`** and both pages wrap their second section in
it: SearchBand on the home page, Domaines on the hub. One implementation, one
pair of constants.

- Verified on both by driving real scroll: overlap **0 / 10 / 20** at scrollY
  0 / 60 / 120, holding at 20, and the document shrinking by exactly 20
  (5748 -> 5728 on the home page, 4314 -> 4294 on the hub).
- The home page is byte-identical at rest after the move — all eight sections
  still 660 / 295.2 / 904.3 / 671.9 / 835.4 / 792 / 712.6 / 445.2 and the page
  5748.
- The wrapped section needs an opaque ground of its own to paint over the hero:
  SearchBand has `bg-encre`, Domaines `bg-white`.

**A wedged dev server cost a round here.** Every route started returning 500,
including ones the change could not touch, and `git stash` proved it: a
completely clean tree still 500'd. `.next` had been emptied. Killing the server,
`rm -rf .next` and restarting fixed it. **Bisect with a stash before hunting
through a diff** — a 500 on a page your change does not import is the server,
not the code.

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

### Page 3 — redesign check and responsive pass

**The Contentieux frame `12870:881` is unchanged by the colour pass**, and all
eleven sections were verified by the histogram method rather than by reading:
`get_variable_defs` on the page frame returns the same pre-existing palette as
the Contrats page (no Mint, Pale_Mint, Pink or Red), and every section's Figma
render was compared pixel-for-pixel against the live one.

- Every section is **palette-clean** except **Espace's progress track** (1512px
  of lilas against Figma's 0) — the documented deliberate override, since Figma
  paints that track white on a white card and the bar would have no groove. The
  Contrats page carries the same override at 1872px; the difference is only the
  two pages' progress values (65 against 60.5).
- Its Hero and CTAFinal were the two sections the shared-asset leak had broken;
  both are clean now, and fixing the CTAFinal is what turned up the missing
  `opacity-90` on its building.
- Its FAQ frame is **1878 wide**, not 1920 — it auto-sized to the bleeding
  laurel — so absolute pixel counts run ~2% low against a 1920 capture. The
  presence/absence comparison is unaffected, but do not read the raw counts as
  a discrepancy.

**Responsive spacing harmonised**, same two-step scale as the other three pages:

| Element | below `lg` | `lg`+ |
|---|---|---|
| The eight `py-24` sections | `py-16` | `py-24` |
| Tools | `py-12` | `py-16` |
| Their head -> content gaps | `gap-8` | `gap-12` |
| Espace's stacked row gap | `gap-10` | `lg:gap-16` |
| CTAFinal panel | `px-6 py-12` | `sm:px-12`, `lg:py-16` |
| CTAFinal buttons | full width, wrapping | `sm:w-auto` |

- **Espace's `gap-16` here is Figma's desktop *column* gap** — the grid only
  splits at `lg`, so below that it was acting as a 64px row gap, the same trap
  the home Cabinet and the Contrats Espace hit.
- Desktop unchanged: page 8446 at 1920 before and after, with Domaines 1457.4,
  Methode 552.3, Espace 645.9, Bib 643.5, FAQ 671.5 and CTAFinal 550.4 all
  identical. At 375 the page drops 17494 -> 16757.
- No horizontal overflow from 1920 down to 320; CTA buttons fit at 320, where
  the `overflow-hidden` panel had been clipping them.
- **All four built pages now share one spacing scale.** Only the Bibliotheque
  and the article page still carry a flat `py-24`.


### Page 3 — redesigned (frame now 8539)

`12870:881` **has changed**, where the earlier pass found it clean. Caught in
one call: `get_variable_defs` on the page frame now returns **Mint,
Pale_Mint, Pink and Red**, none of which were there before. The frame is 8539
against 8374, and all of that is Domaines growing 1393 -> **1581**. Section ids
are otherwise identical, so nothing was added or removed except a **sidetab**
(`13395:14965`).

**All four new colours account for exactly four changes** — a useful way to
know the sweep is complete:

1. **Both laurels go mint.** The hero's (`12902:30664`) and the FAQ
   illustration's, so this page imports `laurel-branch-mint.svg` in both
   places. `laurel-branch.svg` now serves only the Contrats page.
2. **The Domaines tiles go to four tints**, non-repeating across the nine
   missions: blue / gold / mint / pink, blue / gold / mint, gold / pink.
   Sampled tile by tile from the node render.
3. That pink is `#EFCFD9` at 40% again, reusing `--color-pink-soft`.
4. **The red side tab**, which is the shared `Consultation` wrapper unchanged.

#### Methode (`12870:894`) — re-derived, **unchanged**, 552.3 against 550

The first section on this page that genuinely held, and checked value by value
rather than by height: ground lilas (the frame carries no fill), overline 96,
title 128.8 capped at 680, no lead, grid 222.8, all four cards on their exact
Figma x (337.5 / 653.75 / 970 / 1286.25) at 296.25, card padding `28px 24px`,
kicker Poppins 16 at 2.88px tracking in brique and uppercase, body encre/0.62,
and the badge periwinkle 44x44 at (14, −22) fully round. Copy unchanged too —
`Méthode` mixed case, kickers `Jour 0 / Jour 0 / Jour 1–5 / Signature`.

#### CTAFinal (`12870:902`) — re-derived, **unchanged**, 550.4 against 550

Panel 1245x358.4 at y=96 in lilas-2, 28px corner, `64px 48px` padding;
overline 64, title 96.8, lead 154.8; and **both ornaments on their exact Figma
coordinates** — the building 180x135 at (−31.5, 243) carrying its `opacity-90`,
the scales 150x150 at (1111.5, −7).

- Its building export still carries **`#c7d6ef` pale-periwinkle**, not the pale
  blue the home CTAFinal's went to — so the fork this file records still stands
  and must not be "tidied".
- The export's path data does not string-match `columned-building.svg`, which
  is only the 1.2x box: scaled by 150/180 it lands within **0.5 of a unit**
  across all 187 numbers, and the glyph carries no strokes, so rendering the
  150x112 file at 180x135 reproduces it exactly. **Compare numbers at the ratio,
  not strings.** `scales-of-justice-sm.svg` matches outright.

### Page 3 complete — re-derived section by section against the 8539 frame

| Section | Figma | Rendered | Changed? |
|---|---|---|---|
| Hero | 784 | 784.0 | **4 changes** — column up 84, laurel moved + mirrored + mint, marker 204x22, stats 40 |
| Domaines | 1581 | 1596 | **4 tints, ruled CTA footer, per-card pill tint, one white tag** |
| Tools | 844 | 848.7 | **harmonised with the Contrats twin** (4 values) |
| Prestations | 755 | 759.9 | **4 tints** |
| Forfaits | 980 | 992.7 | **prices 40/30/40, unit, feature alpha — retires `--text-nav`** |
| MidCTA | 115 | 115.2 | **run to `text-lead`, gold -> white/70** |
| Methode | 550 | 552.3 | unchanged |
| Espace | 645 | 645.9 | **4 tints** |
| Bib | 641 | 643.5 | **counts mint** |
| FAQ | 663 | 671.5 | **summary gap dropped, marker to encre/62** |
| CTAFinal | 550 | 550.4 | unchanged |
| side tab | 45x236 | 45x236 | **new** — shared `SideTab` at `tone="red"` |
| **Page** | **8539** | **8591** | +52 |

Nine of eleven sections moved. **Two of the four Hero changes and both MidCTA
changes sit inside sections whose height never moved** — which is the whole
case for running `get_design_context` per section rather than trusting a
palette diff and a height table.

No new assets across the entire page; one new string (`domaines.cta`); four
overlines corrected from stored-uppercase to Figma's mixed case (two of them
shared with the Contrats page and fixed there too). No horizontal overflow at
any of nine widths from 1920 down to 320.

#### FAQ (`12870:900`) — re-derived, 671.5 against 663

**Two changes, and both confirm a suspicion this file already carried.** The
note recording that the Contentieux FAQ row "differs from the Contrats one in
three small ways" flagged its `encre/50` marker as "possibly a third small bug
of the same kind — worth confirming". Confirmed: this frame states **0.62**,
and it also drops the gap.

| | was | now |
|---|---|---|
| the summary row | `gap-4` between question and marker | **no gap** — Figma lets the question box run right up to it |
| the marker | `encre/50` | **`encre/62`** |

- Everything else holds: white ground, overline 96, title 128.8 capped at 680,
  list 186.8, row radius **14** with `16px 24px` padding, question Inter
  SemiBold 18/1.5, one row open, and the laurel now mint (applied with the Hero
  in the same pass).
- The list renders **814 against Figma's 820** — the documented squeeze, since
  820 + 48 + 383 is 1251 inside a 1245 container. Its frame is **1926** wide
  now, not the 1878 recorded earlier; it still auto-sizes to the bleeding
  laurel, so absolute x positions are not comparable against a 1920 capture.
- Section 671.5 against 663 — the four row borders. No assets, no new strings.

#### Bib (`12870:898`) — re-derived, 643.5 against 641

**One change: the three big counts are mint** (`#44CBA1`) where they were
periwinkle — the same move the home page's Bibliotheque counts made in its own
redesign. Still `text-h2` Poppins Bold 40 otherwise.

- Everything else confirmed against the export: ground lilas (the frame carries
  no fill), overline 96, title 128.8 capped at 680, no lead, grid 268.8, all
  three cards on their exact Figma x (337.5 / 759.17 / 1180.83) at 401.7, card
  padding `36px 28px`, the 6px spacer before a brique `Parcourir →`.
- Its card CTAs are still **not bottom-aligned** — 491.4 / 466.2 / 491.4, card
  2 sitting 25.2 higher because its description is a line shorter. That is what
  Figma draws, for the fourth time on this site.
- No assets, no new strings.

#### Espace (`12870:896`) — re-derived, 645.9 against 645

**One change: the four feature tiles go to four tints** — blue, gold, **pink**,
**mint**, where they alternated blue / gold / blue / gold. Nothing else moved.

- Confirmed unchanged: the 64px column gap with both cells `self-stretch`, the
  44px tiles at 12px radius, the mock at 20px radius with 24 padding and its
  one-off `0px 24px 60px` shadow, the dashed `rgba(0,0,0,0.1)` row rules with
  the last row bare, and the 590.5 columns.
- **Both deliberate overrides still stand and are still deliberate.** Figma
  paints the progress track white on a white card; the build keeps it lilas, so
  the bar has a visible groove. Its bar renders 351.31 against Figma's 352.32 —
  the 65% rounding this file already records.
- **All four icons match existing files exactly** (`monitor-chart`, `lock`,
  `bell`, `globe`) — path-checked. No new assets, no new strings.

#### MidCTA (`12883:886`) — re-derived, 115.2 against 115

Two changes, both in the one inline run:

| | was | now |
|---|---|---|
| its second half | Inter Regular 20/**1.3**, borrowing `text-h3`'s metrics | **`text-lead`** (Inter 20/1.55) |
| its colour | **gold** | **white/70** |

So the note recording "the Contrats MidCTA's gold run is 20/1.55 where the
Contentieux one is 20/1.3" is now half out of date: the line-heights match,
but the Contrats run is still gold and this one is not. **Check the Contrats
frame when its turn comes** rather than assuming they converged completely.

- Measured: section 115.2, ground encre, first run Poppins 20 white, second
  run resolving to **Inter 400, 20px, line-height 31px** (20 x 1.55) at
  white/0.7, button gold with `12px 24px` padding at y=36. Every value Figma's.
- `font-inter` stays required on the run: the token carries size, line-height
  and weight but never the family, and the paragraph around it is Poppins.

#### Forfaits (`12870:892`) — re-derived, 992.7 against 980

Three changes, and together they **retire a token**:

| | was | now |
|---|---|---|
| the price sizes | all three `text-price` (30) | **40 / 30 / 40** — the two outer plans at `text-h2`, the featured middle one at 30 |
| the unit beside the price | `text-nav` | **`text-small`** (Inter Regular 16/1.5) |
| the feature lines | `encre/75` | **`encre/62`** |

- **The large-price flag is the inverse of the Contrats page's.** There only
  the *third* plan is 40; here it is the first and third, with the featured
  middle one small. Do not carry one page's pattern to the other.
- **`--text-nav` is deleted.** This was its last call site — exactly as this
  file predicted — so the token is gone from `globals.css` and deregistered
  from `cn`'s font-size group, and the stale "not the Contentieux page's
  text-nav" comment on the Contrats twin is removed. Verified after: all eight
  routes serve, and every page's height is unchanged except this one.
- Measured: overline 96, title 128.8, lead 232.8 (head and title capped at
  **680**), grid 331.2, all three cards on their exact Figma x
  (337.5 / 759.17 / 1180.83) at 401.7, footnote 872.7, and the prices
  resolving to **40 / 30 / 40px** with the units at Inter 400 16/24. Section
  992.7 against 980 — it read 974.4 *under* the frame before, which is what
  the two 30 -> 40 prices account for.

#### Prestations (`12870:890`) — re-derived, 759.9 against 755

**One change: the four icon tiles go to four tints** — blue, gold, **pink**,
**mint**, where they alternated blue / gold / blue / gold. Nothing else moved:
same white cards on `encre/7`, 20px corner, 24/28 padding, the 8px gap with
its 12px spacer after the tile and 10px before the tags, one tag each, and no
CTA row (unlike this page's Domaines).

- Measured: overline 96, title 128.8, lead 232.8 — head and title both capped
  at **680** — grid 331.2, and all four cards on their exact Figma x
  (337.5 / 653.75 / 970 / 1286.25) at 296.25 wide. The +4.9 is the card border
  plus the tag pill's.
- **All four icons match existing files exactly** (`envelope`, `file-lines`,
  `folder`, `bell`) — path-checked, not assumed. No new assets, no new strings.
- Its overline was stored uppercase; Figma writes `Gestion courante`. **The
  Contrats page stores the identical string**, so both were corrected together
  — same situation as the Tools overline, and the render is unchanged on both.

#### Tools (`12870:888`) — re-derived, 848.7 against 844

**The designer harmonised this section with the Contrats twin.** All three of
the differences this file recorded between the two Tools sections are gone,
plus a fourth alpha:

| | was | now |
|---|---|---|
| the badge pill | `text-badge` (Poppins Bold 16 / 0.08em) | **`text-button`** (SemiBold 16, no tracking) |
| the result panel | `rounded-note` (10) | **`rounded-note-lg`** (18) |
| its result text | `white/80` | **`white/70`** |
| the card description | `white/65` | **`white/70`** |

So the note saying "the two Tools sections disagree in three places, so do not
copy one to the other" is now **out of date** — they agree.

- Measured: section 848.7 (it was 860.4), ground encre, overline **64** in
  gold, title 96.8, lead 154.8 at **680** wide, grid 228, cards **612.5** at
  x=337.5 on a 20px gap, card radius 20 and padding 28, field radius **12**
  with `8px 8px 8px 20px`, result panel radius **18** on white/0.09. The +4.7
  is the two card borders.
- Its overline was stored uppercase. Figma writes `Legal tech — l'intendance
  en ligne`; **the Contrats page stores the identical string**, and both call
  sites uppercase it in CSS, so both were corrected together — the render is
  unchanged on either page.
- One value left as-is: Figma's placeholder is `rgba(27,27,27,0.55)`, a raw
  near-black with no token, where the build uses `encre/55`. Imperceptible on
  white and it predates this pass; flagged rather than inventing a token.
- No assets. No new strings.

#### Domaines (`12855:29957`) — re-derived, 1596 against 1581

**Its cards gain a ruled footer, but not the hub's.** A single `Voir le
service` pill at 28/16 padding and no text link beside it, where the hub's
cards carry a 20/16 pill *plus* the brique `Découvrir →`. Both pages flatten
the card's rhythm to a uniform 16, dropping the 8px gap and its 12/14 spacers.

- **The pill is grounded in the card's own tint, not a flat blue.** Deriving
  from one card missed this — card 1 happens to be pale blue, so a single-card
  read looks right and is wrong for eight of the nine. `tones[tone]` drives the
  tile *and* the pill.
- The nine tints, non-repeating: blue / gold / mint / pink, blue / gold / mint,
  gold / pink.
- **Card 8's tag pill is grounded white** where the other eight are lilas.
  Reproduced (`whiteTag` on that mission) rather than tidied away, but it is
  almost certainly a slip in the comp — flag it.
- Tag counts are one per card except `arbitrage`, which has two; the stored
  copy already matched.
- **Do not trust this section's Figma frame names.** They read "Droit des
  sociétés & gouvernance", "Fusions-acquisitions" and so on — the *hub's*
  domains — because the frames were duplicated from it. The text nodes carry
  the real litigation missions ("Stratégie précontentieuse"). Read the text,
  not the layer name.
- Measured: overline 96, title 128.8, lead 186.8 at **680** wide, grid 285.2
  against 285, footnote 1476, all cards on x=337.5 at 401.7. Row pitch 396.9
  against 392 — the ~5px a row from the card border plus the tag pill's.

Measured: Domaines **1596 against 1581**, its grid at 285.2 against 285, all
three cards per row on their exact Figma x (337.5 / 759.17 / 1180.83) at 401.7
wide, and card height 376.9 against 372 — the documented ~5px a row from the
card border plus the tag pill's. Page 8585 against 8539.

- One new string, `domaines.cta`. **No new assets** — the mint laurel already
  existed. No horizontal overflow at any of nine widths from 1920 to 320.

**A palette diff plus matching section heights is NOT enough to call a section
unchanged.** On the strength of those two signals this file briefly claimed
every other section on this page had held. Re-deriving the Hero with
`get_design_context` then found **four changes inside a section whose height
never moved** — see below. Run the export on each section; the cheap checks
tell you a page changed, never that a section did not.

#### Hero (`12870:884`) — re-derived, 784 exact

| | was | now |
|---|---|---|
| copy column, in the 720 stage | y=130.5 | **y=46** (Figma centres it: `top: calc(50% − 33.5px)` over 561 of content) |
| laurel | (207.9, 362), unmirrored | **(211, 119), mirrored** |
| marker bar | 150x22 at (613, 278.5) | **204x22 at (615, 217)** |
| stat values | `text-stat` (28) | **`text-h2` (40)** — Petroff/H2 Section |

- The copy moves **up 84**, so this hero's overline now sits at section y=110
  rather than 194 — much closer to the home page's 90 and the hub's own
  frame value of 110.
- **`get_metadata` and the export disagree about the laurel by exactly its
  width**: metadata says x=331, the export's inset resolves to left=211
  (10.99% of 1920) with right at 1589, and 211 + 120 = 331. The export is the
  self-consistent one and the node render agrees with it — 331 is the box's
  *right* edge. Same rule as the new-article badge: prefer the export.
- **The mirror reads as `transform: none`.** Tailwind v4 flips via the
  standalone `scale` property, so check `scale` (`-1 1`), not `transform` —
  the same trap the FAQ marker's rotation has.
- Measured after: overline **46**, title **(530, 102.8) 860x144.2**, lead
  **(640, 291) 640x75.6**, marker **(615, 217) 204x22** and laurel
  **(211, 119) 120x150** — every one of those Figma's own number, to the pixel.

**The marker bar was painting OVER the text, and no measurement could see it.**
Its box matched Figma to the pixel while the render was plainly wrong: the bar
is 204 wide where the `<hl>` chunk is only "vite", so it extends across " et"
— and a *positioned* element paints above the non-positioned inline text that
follows it. Figma draws that rect as the stage's **first child**, i.e. behind
every glyph. Fixed by giving the `h1` `relative z-0` (its own stacking
context) and the bar `-z-10`, and dropping the now-redundant `relative` on the
chunk. Confirmed by counting dark pixels inside the bar's own box: Figma 1837,
live 1659 — glyphs on top in both, where the broken build had the "et" hidden.

- **A hero marker only has this bug when text follows the highlighted chunk.**
  Grepping every `<hl>` string for a non-empty tail names them exactly: the
  Contentieux and **Contrats** heroes. The other four (home, the hub, the
  Bibliotheque hero, both MidCTAs) end on their chunk, so nothing can be
  covered and they are left at `z-index: auto`.
- The Contrats hero carries the identical defect — its bar is 304 wide against
  "tiennent —" and the title continues " négociés, signés, vivants." — so it
  took the same fix. Its bar still measures **(597, 91.2) 304x22** relative to
  the h1, and every section on both pages is unchanged.
- Its radius is Figma's `4px`, now written explicitly rather than relying on
  bare `rounded`.
- **Compare renders, not just boxes.** Four exact coordinates said this was
  correct; only putting the node's own screenshot beside the live one showed
  the glyphs were being covered.
- Its overline was stored uppercase; Figma writes `Expertises — contentieux &
  arbitrage` mixed case and the call site already uppercases it.

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
- Its Forfaits differs from Contentieux in three places (**not four — the
  claim that its outer plans sit on `bg-lilas` was wrong, and is fixed: the
  Figma render of this section contains zero lilas pixels, so all three plans
  are white like the Contentieux page's, the featured one differing only by its
  gold border and permanent shadow**): the price unit is `text-small` not `text-nav`, feature
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
- **Its Domaines cards are white on a white section, exactly like the
  Contentieux page's — the note that used to stand here, claiming a lilas
  ground, was wrong**, and the `raised` flag it introduced has been removed.
  Settled by counting pixels in `get_screenshot` of the node: `#ffffff` covers
  2.49M pixels — both the section and every card — while `#f6f5f1` appears only
  in a small bbox that turns out to be the tag pills. The faint
  `#fbfbfb`/`#fefefe` halo at the first card's edges is a **shadow**, so card 1
  is the designer showing `Card`'s hover state, exactly as on the home Domaines
  and Actus grids. Its blur is 34px rather than `Card`'s default 17.
  **A card that looks tinted in a comp may just be its neighbour's shadow —
  sample the pixels before encoding a second ground.**
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

### Page 4 — redesigned (frame now 8519), re-derived section by section

`12870:1006` **has changed**, the same way page 3 did. `get_variable_defs` on
the page frame returns **Mint, Pale_Mint, Pink and Red**, none of which were
there before; the frame is 8519 against 8300, all of it Domaines growing
1393 -> **1627**; and a **sidetab** (`13395:14970`) is new. Section ids are
otherwise unchanged.

**Do not read a matching section height as "unchanged" here either** — page 3
had four changes inside a Hero whose height never moved. Every section is being
re-derived with `get_design_context`.

#### Hero (`12870:1009`) — re-derived, 784 exact

| | was | now |
|---|---|---|
| copy column, in the 720 stage | y=109 (`lg:pt-27.25`) | **y=46** — Figma centres it, `top: calc(50% − 10px)` over ~608 of content |
| marker bar | 304x22 at (597, 257) | **304x22 at (597, 224)** — 33 higher in the stage, but **30 *lower* relative to the title**, which moved up 63 |
| `open-book.svg` | gold | **mint** |
| stat values | `text-stat` (28) | **`text-h2`** (40) |

- **The marker moved in the opposite direction to the column.** Its `bottom`
  offset goes 0.455em -> **0.014em**: the bar's underside now sits 0.96px above
  line two's box bottom. Deriving the em from the absolute y alone would have
  got the sign wrong — compute it against the *title box*, which also moved.
- **`open-book.svg` is recoloured in place, not forked**, because the Contrats
  hero is its only user. (`open-book-lg.svg` is a separate 167x125 file for
  this page's CTAFinal — check that one separately.)
- All seven ornament positions are unchanged and every other fill still matches
  its stored tokens. `eiffel-tower-colour` and `sparkle` show different path
  *strings* only because they are the documented non-uniform reuses.
- Measured after: overline **46**, title **(530, 102.8) 860x216.2**, marker
  **(597, 224) 304x22**, lead **(640, 363) 640x50.4**, stats **40px**, the book
  rendering mint — every one Figma's own number.
- Its overline was stored uppercase; Figma writes `Expertises — contrats &
  droit commercial`.

#### Forfaits (`12870:1017`) — re-derived, **unchanged**, 949.2 against 943

Prices **30 / 30 / 40**, exactly what the build carries — so the two pages
genuinely differ in which plan gets the large amount (the Contentieux twin went
to **40 / 30 / 40**), and neither is a bug. Unit `text-small` at Inter 400
16/24, features `encre/0.62`, card padding `36px 28px`, cards on their exact
Figma x at 401.7, footnote 829.2. This page already used `text-small` for the
unit, so retiring `--text-nav` was safe from both sides.

#### MidCTA (`12893:1107`) — re-derived, 115.2 against 115

**One change: its second run goes gold -> `white/70`.** The line-height was
already `text-lead` (Inter 20/1.55) here.

- **Both MidCTAs have now converged**, so the flag raised one page earlier —
  "the Contrats run is still gold" — was reading this file's old note rather
  than the frame. Reading it showed otherwise.
- Measured: section 115.2, ground encre, first run Poppins 20 white, second
  run **Inter 400, 20px, line-height 31px** at white/0.7, button gold with
  `12px 24px` padding.

#### Tools (`12870:1013`) — re-derived, **unchanged**, 870.7 against 866

Every value matches: encre ground, overline 64 gold, title 96.8, lead 200.8
(all at 680), grid 274, cards **612.5** at x=337.5 with radius 20, padding 28
and gap 12 on `white/0.06`, the pill at Poppins SemiBold 16 with **no
tracking** in rose on `encre/0.8`, description white/0.7, field radius **12**
with `8px 8px 8px 20px`, result panel radius **18** on white/0.09 at white/0.7.

**This confirms the direction of travel: the Contentieux Tools moved *to* match
this frame, not both drifting.** This one was the stable reference. The only
value still differing is the placeholder — Figma's raw `rgba(27,27,27,0.55)`
against the build's `encre/55`, the same untokened near-black flagged on the
twin.

#### CTAFinal (`12870:1027`) — re-derived, **unchanged**, 550.4 against 550

Panel 1245x358.4 at y=96 in lilas-2, 28px corner, `64px 48px` padding;
overline 64, title 96.8, lead 154.8; both ornaments on their exact Figma
coordinates — the book **167x125 at (−20.5, 231)** and the nib
**103.125x150 at (1169.5, 0)**.

- **`open-book-lg.svg` is still GOLD**, where the hero's 120x90 `open-book.svg`
  went mint. Same glyph, two sizes, two colours — checked the export's fills
  rather than assuming the recolour carried. Do not "harmonise" these.
- The nib's path strings differ only because it is the documented 110x153 ->
  103.125x150 non-uniform reuse; its fills match.

#### The side tab (`13395:14970`)

The shared `Consultation` wrapper — red `SideTab` plus the shared drawer.
Measured **45x236** flush right, `rgb(240,26,93)`, radius `14px 0 0 14px`.

### Page 4 complete — re-derived section by section against the 8519 frame

| Section | Figma | Rendered | Changed? |
|---|---|---|---|
| Hero | 784 | 784.0 | **4 changes** — column up 63, marker down 30 in the title, `open-book` mint, stats 40 |
| Domaines | 1627 | 1642 | **4 tints, ruled CTA footer, per-card pill tint, one 8px card gap** |
| Tools | 866 | 870.7 | unchanged (it was the reference the Contentieux twin moved to) |
| Prestations | 729 | 733.9 | **4 tints** — different order from Contentieux |
| Forfaits | 943 | 949.2 | unchanged — prices stay 30/30/40 |
| MidCTA | 115 | 115.2 | **run gold -> white/70** |
| Methode | 550 | 552.3 | unchanged |
| Espace | 645 | 645.9 | **4 tints**; one override retired |
| Bib | 641 | 643.5 | **counts mint** |
| FAQ | 638 | 646.4 | **laurel mint** |
| CTAFinal | 550 | 550.4 | unchanged |
| side tab | 45x236 | 45x236 | **new** |
| **Page** | **8519** | **8565** | +46 |

Seven of eleven sections moved. **No new assets** — `open-book.svg` was
recoloured in place (single user) and every other glyph matched. One new string
(`domaines.cta`); one overline corrected to mixed case.

#### FAQ (`12870:1025`) — re-derived, 646.4 against 638

**One change: the illustration's laurel goes mint.** Everything else was
already right — the summary is `items-start` with **no gap** and the marker is
`encre/62`, which is what the Contentieux twin was corrected *to* last page, so
this frame was the reference for that row.

- **`laurel-branch.svg` (brique) is now an orphan.** It was this file's last
  user; every laurel on the site is the mint fork. Left in the tree under the
  usual orphan policy, but the brique/mint fork itself is now moot and could be
  collapsed if the designer confirms.
- Measured: overline 96, title 128.8 capped at 680, list 186.8 at **814**
  against Figma's 820 (the documented 1251-in-1245 squeeze), row radius 14 with
  `16px 24px`, one row open, laurel rendering `rgb(68,203,161)`. Section 646.4
  against 638 — the four row borders.
- Its section row is `items-start`, where the Contentieux FAQ's is
  `items-center`; both match their own frames.

#### Bib (`12870:1023`) — re-derived, 643.5 against 641

**One change: the three counts go mint** (`#44CBA1`) from periwinkle — the same
move the Contentieux twin and the home Bibliotheque made. Still `text-h2`
Poppins Bold 40; counts 31 / 520+ / 80+ unchanged.

- Everything else confirmed: ground lilas, overline 96, title 128.8 capped at
  680, no lead, grid 268.8, cards on their exact Figma x at 401.7, padding
  `36px 28px`, the 6px spacer before a brique `Parcourir →`.
- Card CTAs still **not bottom-aligned** — 491.4 / 466.2 / 466.2 here, where
  the Contentieux twin is 491.4 / 466.2 / 491.4. Different descriptions, same
  designed behaviour.

#### Espace (`12870:1021`) — re-derived, 645.9 against 645

**One change: four feature tints** — blue, gold, **pink**, **mint** (the same
order as the Contentieux twin here, unlike Prestations).

- **One of this page's two deliberate overrides is no longer a deviation.**
  Figma now marks the mock `self-stretch`, so it fills the row exactly as the
  build already does. The note recording "Figma does not stretch the mock —
  deliberately overridden" is **out of date**; only the lilas progress track
  remains an override, since the frame still paints it white on a white card.
- Confirmed unchanged: the asymmetric columns (**590.5 + 12 + 642.5**, not
  equal halves), the mock's heavier `rgba(0,0,0,0.08)` border and
  `0px 24px 60px rgba(0,0,0,0.12)` shadow, the 44px tiles at 12px radius, and
  the dashed row rules with the last row bare.
- Measured: track 592.5 in lilas, bar **358.45 against Figma's 358.48**, mock
  642.5 wide with 24 padding and an `encre/0.08` border.

#### Methode (`12870:1019`) — re-derived, **unchanged**, 552.3 against 550

Byte-identical to the Contentieux twin — same overline, title, four steps, copy
and badge — which confirms this file's long-standing note that the two Methode
sections are the same drawing. Measured: ground lilas, overline 96, title 128.8
capped at 680, no lead, grid 222.8, all four cards on their exact Figma x
(337.5 / 653.75 / 970 / 1286.25) at 296.25, card padding `28px 24px`, kicker
Poppins 16 at 2.88px tracking in brique, badge periwinkle 44x44 at (14, −22).

#### Prestations (`12870:1015`) — re-derived, 733.9 against 729

**One change: four tile tints** — blue, gold, **mint**, **pink**.

- **The order differs from the Contentieux page's** (blue / gold / pink /
  mint). Two sibling sections, same four tints, different sequence — read each
  frame rather than carrying the sibling's.
- Everything else holds: white cards on `encre/7`, 20px corner, 24/28 padding,
  the 8px gap with its 12px spacer after the tile and 10 before the tags, one
  tag each, no CTA row.
- Measured: overline 96, title 128.8, lead 232.8 (all 680), grid 331.2, all
  four cards on their exact Figma x (337.5 / 653.75 / 970 / 1286.25) at 296.25.
- **All four icons match existing files exactly** (`book`, `lightning-bolt`,
  `globe`, `folder`). No new assets, no new strings.

#### Domaines (`12870:1011`) — re-derived, 1642 against 1627

The same three changes as the Contentieux twin, and the card's rhythm flattens
the same way:

- **Four tints, non-repeating** across the nine domains: blue / gold / mint /
  pink, mint / gold / blue, gold / pink.
- **A ruled footer on every card** — a 1px `encre/10` rule then a `Voir le
  service` pill at 28/16 padding, **grounded in the card's own tint**, not a
  flat blue. Verified all nine pill grounds equal their tile grounds.
- **The card gap flattens from 8-plus-spacers to a uniform 16** — except
  `transparence`, whose card the frame still sets to **8**. Reproduced with a
  per-card check, but it is almost certainly a slip: it is the only one of the
  nine, exactly like the white tag pill on the Contentieux card 8. **Flag both
  to the designer together.**
- Card 1 keeps its `0px 14px 34px` shadow, still read as `Card`'s hover state.
- **All nine icons match existing files exactly** — path-checked, not assumed.
  One new string (`domaines.cta`). No new assets.
- Measured: overline 96, title 128.8, lead 232.8 (all at 680), grid 331.2,
  footnote 1522, rows on a 396.9 pitch against Figma's 392, cards x=337.5 at
  401.7. The +15 is the ~5px a row this file already records.

### Page 4 — earlier redesign check and responsive pass

**The Contrats frame `12870:1006` is unchanged by the colour pass.**
`get_variable_defs` on the whole page frame — one call for all eleven sections
— returns only Periwinkle, Encre, Gold, Brique, White, Pale gold, Pale blue,
Lilas, Lilas 2, Rose and Result green. **No Mint, Pale_Mint, Pink or Red.** And
every desktop section still measures exactly what the original build recorded
(Domaines 1431.4, Methode 552.3, Espace 645.9, Bib 643.5, FAQ 646.4, CTAFinal
550.4), so nothing moved either. **`get_variable_defs` on a page frame is the
cheapest possible "did this page change?" check.**

The one real fix was the Domaines card ground, corrected above.

**Responsive spacing harmonised**, same two-step scale as the home page and the
hub, with every `lg`+ value left at the Figma number:

| Element | below `lg` | `lg`+ |
|---|---|---|
| The eight `py-24` sections | `py-16` | `py-24` |
| Tools | `py-12` | `py-16` |
| Their head -> content gaps | `gap-8` | `gap-12` |
| Espace's stacked row gap | `gap-y-10` | `lg:gap-y-16` |
| CTAFinal panel | `px-6 py-12` | `sm:px-12`, `lg:py-16` |
| CTAFinal buttons | full width, wrapping | `sm:w-auto` |

- The Hero was already responsive (`pt-16 pb-16 lg:pt-27.25 lg:pb-0`) and
  MidCTA's `py-9` is small enough to leave.
- **Espace's `gap-y-16` was never a Figma value** — Figma gives only the 12px
  *column* gap, and the 64px row gap was chosen to match the sibling page's
  rhythm. It scales like every other stacked gap now.
- Desktop unchanged: page 8354 at 1920 before and after, every section
  identical. At 375 the page drops to 16447 and the CTA buttons fit at 320,
  where they were being clipped by the `overflow-hidden` panel.
- No horizontal overflow from 1920 down to 320.

### Recolouring a shared asset in place was a mistake — three files forked back

The home redesign moved three ornament fills. Because those files are shared,
recolouring them in place silently changed pages whose frames had **not**
changed, and `get_variable_defs` cannot catch it: an ornament's fills are
flattened into the exported vector, so they are not Figma variables at all.

Each is now forked — the shared file carries what the **unchanged** frames draw,
and the redesigned home page imports a variant:

| Shared file (restored) | Home variant |
|---|---|
| `laurel-branch.svg` (brique) | `laurel-branch-mint.svg` |
| `courthouse.svg` (pale-periwinkle) | `courthouse-pale-blue.svg` |
| `columned-building.svg` (pale-periwinkle) | `columned-building-pale-blue.svg` |

`arc-de-triomphe.svg` needed no fork — only the home hero uses it.

**The method that catches this: render the Figma node with `get_screenshot`,
screenshot the same live section, and compare exact-hex colour histograms
against the token palette.** It found the mint laurel on both domain pages, the
pale-blue courthouse and building on Contentieux, a wrong card ground on
Contrats Forfaits, and a missing opacity — none of which any amount of reading
the markup would have shown. Two caveats learned while building it:

- **Match hexes exactly.** A nearest-colour matcher with a tolerance of 6
  reported a phantom "pale-mint" in the Contrats hero that was just text
  antialiasing.
- **A near-miss hex is usually opacity, not a different colour.** The
  Contentieux CTAFinal read `#cad8f0` in Figma against `#c7d6ef` live: that is
  pale-periwinkle composited at **0.9** over the lilas-2 panel, so the building
  was simply missing `opacity-90`. Now fixed, matching the home panel.


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

### Page 5 — redesigned, re-derived section by section

`13060:881` **has changed**, though its frame is still **6266**.
`get_variable_defs` now returns **Pink, Pale_Mint and Red** (no Mint), the
**Vitrine shrank 911 -> 879**, and a **sidetab** (`13415:15644`) is new.
Everything else keeps its frame height — which after pages 3 and 4 means
nothing, so each section is being re-derived with `get_design_context`.

#### Hero (`13160:9273`) — re-derived, 663.1 against 660

Six changes, and the section height barely moved (658.1 -> 663.1):

| | was | now |
|---|---|---|
| the crumb band above the copy | 62 + a 16 gap = **78**, closing with 32 | **40**, closing with **71** |
| the polaroid print | pale-blue `mix-blend-color` duotone at 90% opacity | **a plain crop** — both gone |
| its print's corners | uniform `rounded` (4) | the site's asymmetric portrait set, **59.854 / 2.993 / 29.927 / 17.956** |
| its card's corners | uniform `rounded-lg` (8) | **60 / 8 / 30 / 30** |
| its print | 126x120 | **120 square** |
| the suggestion chips | 14px sides, 10px gap, capped at 609 | **16px sides, 12px gap, the full 640** |

- **The chip note in this file is now out of date.** It recorded that `Chip`'s
  16px sides "wrapped to three rows and made the section 45px too tall" — that
  was against the old frame, which drew an equal-width 3x2 grid inside a 609
  cap. Figma now sizes each chip to its label inside the full 640, and at 16px
  they land **3 + 2 in two rows**, 233/215/145/202/254 against Figma's
  234/214/143/201/253. `Chip`'s `solid` tone is used only here, so its padding
  moved with it.
- The copy therefore sits **38px higher**; overline measured at exactly **40**,
  title 77.8.
- **`p-1.125` silently generates nothing** — 0.125 is not on Tailwind's spacing
  scale, and the form collapsed to zero padding rather than erroring. Figma's
  4.5 needed `p-[4.5px]`, which lands the field at **62.2 against 62**.
- The marker is unchanged and still exact (336x26 = 4.941em x 0.382em at
  `bottom-[0.069em]`), as are the 17 / 35 / 30 column gaps and the 692 + 511
  row that `justify-between` spaces by 42.
- No new assets; the portrait is the stored crop, now shown square.

#### Vitrine (`13238:1013`) — re-derived, 881.4 against 879

**The 911 -> 879 is one number: its top padding.** Figma now gives this
section **64 above and 96 below**, where it took 96 on both sides. Nothing
else in it moved — the 32px head gap, the 8/12 head spacers, the 48 to the
track, the 24 card gap, 18px corners, `encre/8` border, the 224 photo, the
28/24/28 body with its 10px gap, the 11/3 pills, the 32 to the dots and the
30x9 + 9 + 9 dot row all match the export exactly.

- **Its three photographs are unchanged**, and the check is worth repeating
  rather than assuming: run Figma's own placement on each export and diff it
  against the stored crop. `founders-meeting` lands at **1.23/255** and
  `advisors-round-table` at **1.52**, with the next-best candidate in the whole
  image folder 60 away — so identity is never in doubt even when the number is
  not JPEG-noise small. Card 1's offset crop reads 9.66 because its window is a
  2.67x upscale, and its runner-up is 49.
- Its two arrow exports are still one file: the `précédent` glyph is the exact
  reflection of `chevron-right.svg` about x=10, which is what `-scale-x-100`
  draws.
- Figma still draws the cards **ragged** — 519 / 458 / 458 — and the build
  still levels them to one height with the meta row on `mt-auto`. That is the
  recorded deliberate deviation and it costs no height, since the tallest card
  already sets the row.
- Measured: overline at **64** exactly, title 92.8 against 93, track 222.8
  against 223, dots 776.4 against 774, all three cards on their exact Figma x
  (337.5 / 760.5 / 1183.5) at 399 wide. Every delta is the 2px card border.

#### Resultats (`13061:955`) — re-derived, 859.2 against 860

**Two changes, and both are small.** The section's structure, filters, card
anatomy and every one of its measured bands are unchanged.

| | was | now |
|---|---|---|
| the card's meta row | one inline run — `Guide · 18 min · <cta>Lire →</cta>` | **a flex row on an 8px gap**, the text node and the link split |
| the select carets | `right-5` (20) | **`right-4.25`** — Figma puts both at left 210 / 258, i.e. 17 from the right |

- The meta row's new node ids are in the **`13395:` range** against the
  section's `13061:`, which is the tell that the designer edited just this row.
  The leading text becomes an anonymous flex item, so its trailing space is
  trimmed at end-of-line and the 8px gap is all that separates the two — which
  is exactly what the comp draws. The CTA moved **506.2 -> 510.1**, the 8 minus
  that trimmed space. **The Vitrine's meta is still one inline run**, so the
  two sections now differ here; check each rather than copying one.
- **Figma's sixth card contradicts itself and the build is left as it was.**
  Its type pill reads `Fiche & FAQ` on the fiche's lilas-2 ground, while its
  meta line now reads `Guide · 6 min`. The stored string says `Fiche · 6 min`,
  which agrees with the pill, so it stays — the same call the `Gratitut` typo
  and the e-commerce panel's doubled `dans` got. **Flag it.**
- Everything else confirmed against the export: white ground, gold `text-button`
  overline at **y=86 exactly**, title 115.2 against 116, the 1200 band at
  x=360, both selects at 239 and 287 on a 12px gap, the `encre/12` divider
  26 tall with its 24/16 margins, four tabs 40 tall on an 8px gap, and all six
  cards **384 wide at their exact Figma x** (360 / 768 / 1176) and **250 tall**,
  on a 24px gap both ways.
- Card internals exact too: pill at (25, 23) 31.2 tall, title at 70, description
  at 128, meta at 205.8 against Figma's 206. No assets, no new tokens, no new
  palette — this section carries none of Pink, Pale_Mint or Red.

- **Re-checked its top and bottom padding against the node's own render**,
  since a correct total height cannot tell two pads apart. Figma: frame 860,
  first ink (the overline's cap) at **87**, last ink (the card row's bottom) at
  **794**, bottom gap **66**. Live: 859.2, 86, 793, 65 — **5 ink bands in both,
  every one within 3px**. So 86 above and 66 below is right and unchanged.
- **The Next.js dev-tools badge survives the hide-fixed sweep**, and it read as
  a real discrepancy: the first live profile showed an extra ink band at
  823-858 that the comp has nothing for. It samples `rgb(51,51,51)` at x≈30 —
  the badge, which lives in a `nextjs-portal` **shadow root**, so
  `querySelectorAll("body *")` in `sect.mjs` never finds it. Exclude the left
  ~200px (or profile a narrower x range) before reading a band near the bottom
  edge of any live capture.

#### ParCategorie (`13062:881`) — re-derived, 1417.2 against 1416

**This is where Pink and Pale_Mint land.** The nine icon tiles go from a strict
blue/gold alternation to **four tints**, and the sequence does not repeat:
blue / gold / pink / mint, blue / gold / mint / pink, blue. Carried per
category in `bibliotheque.ts`, not derived from the index.

- That pink is Figma's `#EFCFD9` at 40% — the **same third hex** under the
  library name "Petroff/Pink" that the Expertises hub and the new article's
  ladder already use, so `--color-pink-soft` is reused rather than a fourth
  pink added. No new tokens on this section at all.
- **Nothing else moved.** Every value confirmed against the export: lilas
  ground, overline at **y=86 exactly**, title 116.8 against 116, the 18px lead
  at 760 wide and y=168.8, grid 233.2 against 232, all nine tiles **384x350 on
  their exact Figma x** (360 / 768 / 1176) on a 24px gap both ways, 20px
  corner, `encre/8` border, the 46px tile at 12px radius, and — inside the card
  — the icon tile at (25, 23), the title at (85, 25) 274 wide, the counts line
  at **83**, the pill rows at **135** on a 40px pitch, and the CTA at 309.8
  against 311. All four of those are Figma's own numbers.

**All nine icons still reuse, and the check is worth writing down properly.**
Six are exact **24/26** scales of existing 26px files — `person`, `file-lines`,
`shuffle-arrows`, `balance-scale`, `envelope` match to **0.0001 or better**,
and the exports carry `stroke-width="1.8"` against the originals' `1.95`, which
is that same 24/26 — so rendering the 26px file at 24 lands the stroke exactly
where Figma wants it. The other three (`rosette-check`, `people-pair`, `house`)
are native 24px files. Nothing new.

- **`percent` looks like a mismatch and is not.** A positional number compare
  reports a deviation of **13.0**, because the export serialises the same glyph
  from a different start point and winding direction — its diagonal is written
  `M19 5 L5 19` where the stored file writes `M6.5 19.5 L19.5 6.5`. Read the
  geometry: same line, same two circles, with the export's diagonal 1px longer
  at each end and its dots 0.5px off — exactly the difference this file already
  records. **A big positional delta can be a re-ordered path, not a different
  drawing.**
- **A duplicate pair surfaced while checking.** The article's 24px
  `monument.svg` and `inbox.svg` are **byte-identical** to this section's
  `litiges` and `payer` exports, which are themselves `balance-scale.svg` and
  `envelope.svg` at 24/26. So the tree carries the same two glyphs twice, at
  two boxes, under four names. Harmless, and not touched here — but worth
  collapsing when assets are next tidied.

#### Parcours (`13062:1032`) — re-derived, **unchanged**, 572.8 against 572

Checked value by value rather than by height, and every band is Figma's own
number: white ground, overline at **86 exactly**, title 116.8 against 116, no
lead, grid 186.8 against 186, all three cards **384x300 on their exact Figma x**
(360 / 768 / 1176) on a 24px gap, card ground lilas-2 at a 20px corner with
**no border**, padding `28px` sides with 26 above and 24 below, card title at
(28, 26), meta at **58**, the four steps at **96 / 132 / 168 / 204** on a 36px
pitch in **full-strength encre**, and the CTA at 256.8 against 256.

- Its steps are still a real `<ol>` with `list-inside`, and the ~4px marker
  difference (Figma types two spaces after the numeral, the browser's marker
  uses one) is unchanged and still deliberate.
- Card 3's fourth step still wraps to two lines, which is what the `mt-auto`
  CTA with no padding above it is for — the note recording that trap stands.

#### Vivante (`13062:1059`) — re-derived, **unchanged**, 527.2 against 526

Lilas ground, overline at **86 exactly**, title 116.8 against 116, the 18px
lead at **820** wide and y=168.8, grid 233.2 against 232, all three cards
**384x208 on their exact Figma x** (360 / 768 / 1176) at a 20px corner with an
`encre/8` border, and inside the card the date at **23**, the title at 50.2
against 51, the description at 90.2 against 91 and the CTA at 167.8 against
167. No assets, no new tokens.

#### Transparence (`13062:1078`) — re-derived, 340.4 against 340

**Four changes, and it stays dark** — the encre ground is confirmed, unlike the
article's twin, which flipped to white in its own redesign. The two still share
strings through the top-level `Transparence` namespace, which is exactly what
lets them diverge in colour without touching the copy.

| | was | now |
|---|---|---|
| section padding | `pt-18 pb-7` (72 / 28) | **40 / 40** — Figma pins the column at `top: 4` inside a 36px vertical padding |
| head gaps | 10 under the overline, 4 under the title | **a uniform 7** |
| block gaps | 19 and 18 | **28 and 28** |
| the head group | uncapped, the full 1100 | **capped at 784** — the two paragraphs still run 1100 |

- Its new column wrapper carries a **`13395:` node id** against the section's
  `13062:`, the same tell the Resultats meta row had. **Grep the export for
  out-of-range ids** — they name exactly what the designer touched.
- So this block has moved toward the article's shape: that one already had 8/8
  head gaps and a 784 cap, which this file recorded as a genuine per-frame
  difference. Half of that difference is now gone.
- **Verified with an ink-band profile against the node's own render**, since a
  correct total height cannot tell two pads apart — the lesson the article
  page's Transparence taught. **7 text bands in both, every one within 2px**
  (44/43, 71/72, 124/125, 177/179, 203/204, 255/257, 280/282), first ink 44
  against 43 and last 297 in both.
- Figma's render shows an 8th "band" at 336-339 spanning the full 1920 at a
  uniform `rgb(126,138,154)`. That is the frame boundary in the downscaled
  render, not content — check a band's width and colour before believing it.
- Measured: overline at **y=40**, title 67.8, sources 120.8, head **784x106**,
  disclaimer 174 at 1100, note 252.4 at 1100. Every one the export's own
  number. No assets, no new tokens.

#### CTAFinal (`13060:934`) — re-derived, **unchanged**, 550.4 against 550

Panel 1245x358.4 at y=96 in lilas-2, 28px corner, `48px` sides with 64 above
and below, a **12px** stack gap; overline at **64**, title 96.8, lead 154.8,
the 14px spacer, and the CTA row at 243.2 on a **16px** gap — every one the
export's own number. Buttons encre then **gold**, both `size="lg"` (28/16).

- **Both ornaments land on their exact Figma coordinates**: the nib
  **110x160 at (-20.5, 231)** and the magnifier **140x140 at (1169.5, 0)**.
  The magnifier export matches `magnifier-check.svg` at **0.0000** across all
  66 path numbers. The nib reads a 6.83 deviation against `pen-nib.svg` purely
  because this box is 110x**160** where the file is 110x**153** — a pure y
  stretch, exact because the glyph carries no strokes at all. Its third box on
  the site. No new assets.
- Only its title is this page's own; the overline, lead, phone line and both
  button labels come from `ContactCta` and its `ask` pair.

#### The side tab (`13415:15644`) — new

The shared `Consultation` wrapper, unchanged: red `SideTab` plus the shared
`ConsultationDrawer`. **This frame draws no sticky bar and no drawer of its
own**, exactly like the home and e-commerce frames.

- Its 18px glyph is **path-identical** to `speech-bubble.svg`.
- Measured: tab **45x236** flush right, `rgb(240,26,93)`, radius
  `14px 0 0 14px`, shadow `0px 10px 30px rgba(18,42,76,0.2)` — every value the
  node's.
- Behaviour driven and verified: the tab opens the drawer at **510**, focus
  lands on the Nom field, `body` overflow locks and restores, Escape closes,
  the closed panel is `inert` and focus returns to the tab.

### Page 5 complete — eight sections plus the tab

| Section | Figma | Rendered | Changed? |
|---|---|---|---|
| Hero | 660 | 663.1 | **6 changes** — crumb band 78 -> 40, print square + asymmetric radii, tint dropped, chips 16/12 at the full 640 |
| Vitrine | 879 | 881.4 | **top padding 96 -> 64** — the whole 911 -> 879 |
| Resultats | 860 | 859.2 | **meta row -> a flex row on an 8px gap**, carets to 17 from the right |
| ParCategorie | 1416 | 1417.2 | **4 tints** — where Pink and Pale_Mint land |
| Parcours | 572 | 572.8 | unchanged |
| Vivante | 526 | 527.2 | unchanged |
| Transparence | 340 | 340.4 | **4 changes** — padding 72/28 -> 40/40, head gaps to a uniform 7, block gaps to 28, head capped at 784 |
| CTAFinal | 550 | 550.4 | unchanged |
| side tab | 45x236 | 45x236 | **new** |
| **Page** | **6266*** | **6243** | |

\* The frame total is stale — its own sections sum to 5803, which with the 72
header and 359 footer is 6234, not 6266. Compare section by section.

**No new assets and no new tokens across the entire page** — every glyph and
photograph matched something already in the tree, and the four tints reuse
`--color-pale-mint` and `--color-pink-soft`. Two new strings only (none: the
copy was already stored). Section padding harmonised to the site's two-step
scale on all six padded sections, every `lg`+ value left at the Figma number.
No horizontal overflow at any of nine widths from 1920 down to 320.

**One comp slip to flag**, alongside the standing list: the Resultats grid's
sixth card now reads `Guide · 6 min` in its meta line while its own type pill
says `Fiche & FAQ`. The stored `Fiche · 6 min` is kept.

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
| + | StickyBar | `13121:25317` | done |
| + | SideTab | `13170:1046` | done |
| + | ConsultationDrawer | `13116:1880` | done |

**The sticky bar is the page's one piece of scroll behaviour.** It appears
once `window.scrollY / (scrollHeight - innerHeight)` reaches **0.5** and then
stays fixed to the bottom; the page scrolls normally underneath because the
bar is fixed rather than in flow. It is kept mounted and translated out of
view rather than unmounted, so the transition runs both ways, and carries
`aria-hidden` + `inert` while it is down so nothing focusable hides
off-screen. Honours `prefers-reduced-motion`.

- **The ✕ used to collapse the bar into the gold side tab. It no longer
  does.** With the drawer built, the tab is a persistent control of its own
  (see below), so the ✕ simply dismisses the bar for the rest of the visit —
  and dismissing it no longer takes the consultation away with it. Confirmed
  with the user before changing; the alternative on the table was keeping the
  tab as the bar's collapsed state *and* having it open the drawer.
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

**The consultation drawer (`13116:1880`) is the page's second client-side
behaviour, and the site's first modal.** 510x1208, sliding in from the right
over the page. It measures **1215 against Figma's 1208 — 0.58%** — with an
**x-band ink |Δ| of 0.19**, the tightest horizontal match on the build, and
its 21 ink bands align 1:1 with the comp's.

- **Three controls, one piece of state.** `Consultation.tsx` is a thin client
  wrapper owning `open`; it renders `StickyBar`, `SideTab` and
  `ConsultationDrawer`. The tab and the bar's "Consulter un avocat" both open
  the drawer. Splitting the tab out of `StickyBar` into its own `SideTab.tsx`
  is what let it become persistent.
- **The article column's own `consult` block deliberately stays out of it.**
  It is the same form already inline on the page, so wiring its button to the
  drawer would discard whatever the reader had typed, and it would cost
  `Corps` its server component. Confirmed with the user.
- Behaviour verified by driving it: the tab is on screen at scroll 0; opening
  moves focus to the Nom field (which is the state Figma draws); Tab and
  Shift+Tab wrap inside the panel's 7 focusables; Escape and a backdrop click
  both close and return focus to the trigger; `body` overflow is `hidden`
  while open and restored after; the closed panel is `inert` and Tab skips it;
  and under `prefers-reduced-motion` both the panel's and the tab's
  `transition-property` resolve to `none`.
- **Focus return is owned by the wrapper, not the drawer.** Two reasons: the
  tab is `inert` while the drawer is open, so only the render that clears it
  can focus it again; and reading `document.activeElement` when the drawer
  mounts is wrong, because a click does not always leave focus on the button
  it hit. The trigger is taken from the click's `currentTarget` instead.
- Its inputs are real and labelled but **not wrapped in a `<form>`**, like the
  Consult block it mirrors, Tools and the OpenData lookup.
- **Its four field labels and its secret-professionnel note are character-
  identical to the Consult block's**, so it reads those from
  `ArticlePage.consult` rather than duplicating them — the pattern
  `ContactCta` established. Only its own strings live in `ArticlePage.drawer`.
- Its `avocate` is the two seams' composed `lawyer-figure.svg` at 60.125x101
  — the same 29 component instance ids at the same insets, and a uniform
  **1.1995x** of that file's own 50.125x84.202. Because the composed file
  carries a `viewBox`, its strokes scale with the geometry, so it reuses
  exactly where a raw Figma export at a larger box would not. Confirmed by
  cropping both at 3x: same drawing, same colours, same proportions. **No new
  assets on this node at all** — the 28 exported URLs were never needed.
- **Its overline is +14% tracking, not the +18% every other overline in the
  file carries**, which is why `--text-overline-tight` was added. It is
  load-bearing rather than noise: the `top` row is 450 wide with a 22px ✕ and
  a 16px gap, leaving the overline exactly 412, and Figma draws it as one
  21px line. Measured with a probe span, `text-overline` renders that string
  at **426px** and would wrap; at 0.14em it is **404px** and fits.
- Its five controls are Inter 17/24 in Figma. **There is no 17px token**, so
  they take `text-body` (18/1.4) like every other input on the site — asked
  before deciding. That is 1.2px of line box per field, and with the 2px
  border-box difference each field runs **+4.38** against the comp. Four
  fields is the whole of the drift: positions are exact at the top, reach
  **+16 to +20** by the textarea, and close to **+8** at the phone line. The
  panel's own +7 is what survives.
- Its `border-[1.5px]` is on the fields in **every** state, not 1px growing to
  Figma's focused 1.5px: browsers round border widths to whole device pixels,
  so at dpr 1 both render 1px, and swapping the width on focus would shift the
  field's content by half a pixel. Only the colour and the ground change,
  which is all Figma draws. The focused Nom field lands **exactly** (352-356).
- Its ✕ needs an explicit **`h-6`**: Figma's ✕ box is 24 tall and sets the
  top row's height, where `text-lead` with `leading-none` draws 20 and pulled
  the whole header band 3px short. With it the header is exact — overline, ✕,
  figure and lead all land at Δ0.
- **Its green ✓ falls back to Segoe UI Symbol.** The site's Inter subset does
  not carry U+2713, so the browser resolves it from a system font and draws a
  taller, steeper check than Figma's. Confirmed with
  `CSS.getPlatformFontsForNode`. The box is still exactly Figma's 15x24 and
  `font-bold` has no effect, since that fallback has no bold. Left as the
  browser draws it — the same call the Forfaits ⚡ note makes, and the second
  glyph on the site whose font stack differs from Figma's.
- **Its drop shadow must be carried by the open state, not the base class.**
  Figma's is `-26px 0px 32px` — a *negative* x offset with a 32px blur, so it
  paints to the LEFT of the panel and kept painting while the panel itself was
  translated off screen, reading as a grey band down the right edge behind the
  gold tab. It is toggled with `shadow-none` and transitioned alongside the
  slide so it fades as the panel leaves. Verified in both states: closed
  computes to an all-transparent shadow list, open to
  `rgba(18, 42, 76, 0.22) -26px 0px 32px 0px`. **Any fixed panel that slides
  out has this problem whenever its shadow offset points back on screen.**
- Note `shadow-none` computes to a list of *transparent* shadows, not the
  string `none` — a test asserting `boxShadow === 'none'` reports a false
  failure.
- **The side tab's own shadow is correct and stays**: `13170:1046` specifies
  `0px 10px 30px rgba(18,42,76,0.2)`, which is what is built. Re-checked in
  Figma when the drawer's bleeding shadow was first read as the tab's.
- **The tab's only hover state is a 6px nudge out of the edge** — 45 to 51
  wide over 180ms, growing leftward because it is pinned to `right: 0`. Taken
  from a mockup the user supplied (`.sidetab:hover{padding-right:19px}`), so
  **Figma draws no hover state at all**; it is a deliberate addition. The
  ground does **not** change with it — the old `hover:bg-brique` was removed on
  the user's instruction, and `background-color` came out of the transition
  list with it. The two remaining transitions carry their own durations —
  `[transition-duration:300ms,180ms]` against `transition-[translate,width]` —
  so the nudge stays quick while the slide keeps the 300ms it shares with the
  drawer panel.
  Verified with real `Input.dispatchMouseEvent` hovers on all three pages that
  carry the tab: 45 -> 51 -> 45, the right edge never moving, the fill holding
  at `rgb(240,26,93)` throughout, and opening, Escape, focus return and the
  `inert` slide-out all unchanged.
- Its `role="dialog"` panel is kept mounted and translated out rather than
  unmounted, so the transition runs both ways, and carries `aria-hidden` +
  `inert` while it is out. The backdrop is `pointer-events-none opacity-0`
  when closed, or an always-mounted `fixed inset-0` would eat every click on
  the page.
- Its scroll lock hands the scrollbar's width back as `padding-right` on
  `body`, so locking does not shift the whole page.
- **`transition-transform` is wrong for the tab.** Tailwind v4 translates via
  the standalone `translate` property, so the tab's slide is
  `transition-[translate,background-color]`. (`transition-transform` happens
  to cover it — v4 expands it to `transform, translate, scale, rotate` — but
  naming a property list means naming `translate`, not `transform`.)
- **Its overline holds one line down to a 502px viewport and wraps to two
  below.** The panel is `min(viewport, 510)` and the slot is `panel - 98`
  (60 padding + 22 ✕ + 16 gap), against a 404px string — so 502 is the exact
  flip. One line at 375 would need ~11px type and at 320 ~9px; the only other
  route is a shorter string ("CONSULTATION" alone is 150px and fits
  everywhere, and the "15 minutes gratuites" claim is restated in the ✓ marks
  just below). **Raised with the user and left wrapping** — Figma specifies
  desktop only, and the overline reflows like every other piece of copy on the
  site.
- **That one line has only 8px of slack, and the font-load fallback does not
  fit in it.** Poppins renders the string at 403.7 inside 412, but next/font's
  metric-adjusted `"Poppins Fallback"` — what `display: "swap"` shows until
  the webfont arrives — measures **454.8**, so the overline wraps during the
  swap even at desktop. (Plain `system-ui` is 393.5 and would have fitted; the
  size-adjust that keeps CLS down is what widens it. Arial is 416.8.) Invisible
  in practice because the drawer is closed and off-screen at first paint, but
  it recurs on every dev-server reload, so **expect to see it while working on
  the page**. Widening the slot needs 455 against a 450px content width, so
  even giving the ✕ the corner would not quite cover it.
- Figma draws the drawer at desktop only, and the tab stays `lg:flex` like the
  bar. So **there is no way to open the drawer below `lg`** — readers there
  get the same form inline as the article column's `consult` block instead.
  The panel is built responsive anyway (full width at 375/320, measured 1401
  and 1425 tall) so showing the tab on mobile is a one-class change.
- Sweep is clean from 1920 down to **320**: no page overflow at any of the
  nine widths, and no offending element outside an `overflow-x` container.

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
- **It is capped at the viewport and scrolls internally** —
  `max-h-[calc(100vh-3rem)] overflow-y-auto`. Its content is **1201px against
  a 900px viewport**, so without a cap its bottom — CTA card, author card,
  verification line — could not be read at all until the very end of a
  14,000px article. Put the cursor over the rail and the wheel moves the rail;
  scroll chaining is deliberately left **on**, so at either end the page takes
  over and the reader is never trapped. Verified by dispatching real
  `Input.dispatchMouseEvent` wheels at 1920x900: rail 0 -> 349 (its full range,
  1201-852) while the page held, then the page resumed; and back 349 -> 0 on
  the way up.
  (An earlier version left it uncapped and let it ride up with the page over
  the last screenful. **That is the note this replaces** — it read as "the
  whole height is readable" but in practice meant the bottom third was
  unreachable for the entire article.)
- **The bar itself is hidden** (`no-scrollbar`), on the user's instruction: a
  default 15px scrollbar eats 5% of a 300px rail and reads as a rendering
  artefact against the card edges. The column still scrolls under the cursor,
  and the bar takes no space either — measured `offsetWidth - clientWidth = 0`.
  A `.thin-scrollbar` utility was tried first and removed; do not reintroduce
  it.
- Its `pb-24` now sits **inside the scroll area**, where it doubles as
  clearance for the sticky bar — fixed over the last 78px of the viewport — so
  the verification line can always be scrolled clear of it.
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

## Page 6 redesign — frame `13318:2398` (1920x19284.6)

A **new** article frame, replacing `13095:881`. Unlike every other page in this
pass it carries real structural change, not just colour. Section-by-section
against the live build at 1920:

| Section | Figma | Built | State |
|---|---|---|---|
| Hero | 890 | 890.5 | **rebuilt** |
| Corps | 13966.6 | 14371.4 | +404.8 — outstanding |
| Cabinet | 774 | 776.9 | unchanged (2.9 = borders) |
| Interlocuteurs | 900 | 780.4 | −119.6 — outstanding |
| ALireEnsuite | 1405 | 1461.3 | +56.3 — outstanding |
| Transparence | 370 | 370.5 | unchanged |
| CTAFinal | 550 | 550.4 | unchanged |

- Its palette adds **`Petroff/Red`**, which is the **side tab** — now red like
  the home page's, done with `tone="red"` since `SideTab` was already
  parameterised.
- **The article drawer is now the home drawer.** The redesign gives it its own
  node, **`13318:3628`** — not an edit of `13116:1880`, which still holds the
  old design and is now dead. The new one is identical to the home page's
  `13323:4833`: photograph rather than the illustrated figure, lead beside it,
  sentence-case overline, **red** submit and phone number, **periwinkle** check
  marks. Its photo export diffs against the stored `lawyer-portrait-tall.jpg`
  at **0.00**.
  So the two components were merged into
  `components/consultation/ConsultationDrawer.tsx`, the article's copy deleted,
  and `ArticlePage.drawer` — down to the obsolete caps overline — removed. Both
  pages now read the shared `Consultation` namespace end to end.
  **Watch for this pattern: a redesign may add a new node rather than edit the
  old one, so an unchanged `get_design_context` on the id you have recorded
  does not mean the design is unchanged.** Reading `13116:1880` is exactly what
  led to reporting "the drawer is unchanged" one turn earlier.
- Verified on both pages after the merge: red tab, panel 510x1177, sentence-case
  overline, photo present and no SVG figure, red submit, periwinkle ticks, red
  phone, focus to the Nom field on open, Escape closes and restores the scroll
  lock.

- **Corps colour pass, left column, first run.** Compared block by block against
  the new nodes with the histogram method:
  | block | Figma | was | done |
  |---|---|---|---|
  | `answer` (`13318:2519`) | pale mint | lilas-2 | yes |
  | `rulebox` (`13318:2533`) | white + periwinkle edge | same | no change |
  | `ladder` (`13318:2624`) status pill | pale mint | lilas-2 | yes |
  | `ladder` tiles | blue/gold alternating | same | no change |
  | `trap` (`13318:2729`) | **pale rose 30% + red tag** | pale gold + brique | yes |
  | `vigil` (`13318:2818`) | white + encre | same | no change |
  | `takeaways` (`13318:3062`) | **lilas-2, encre, H3, periwinkle bullet** | encre panel, white, H2, gold | yes |
- **Corps colour pass, the two tools and the consult block.**
  | block | Figma | was |
  |---|---|---|
  | `outil-simulateur` "Analyser ma situation" | **encre** | gold |
  | its verdict panel | **pale-rose/30 + red copy** | brique/14 + brique |
  | its "Soumettre à un avocat" | **red** | gold |
  | both tools' "60 secondes" pill | **encre/8 ground, encre/62 text** | encre/80 + rose |
  | `outil-triage` "Consulter un avocat" | **red** | gold |
  | `consult` | **pale-mint, photo, red overline, encre submit, no marks** | encre panel, dark figure, gold overline, gold submit, three marks |
- **`consult` is the third block to flip dark -> light**, after Transparence and
  Takeaways — that is the shape of this redesign. It also drops its three
  reassurance marks entirely, swaps `lawyer-figure-dark.svg` for a photograph
  (`lawyer-portrait-consult.jpg`, 422x492 = 3x its 140.657x164 box, the same
  asymmetric radii as every other portrait on the site) and rounds **only its
  top corners**. `lawyer-figure-dark.svg` is now an orphan.
- Both tools' pills read **"Gratitut · 60 secondes"** in Figma — a typo for
  *Gratuit*, and mixed case where the build had it uppercase. The casing was
  taken, the typo was not; flag it to the designer.
- `cmp`, `faq`, `vigil` and `rulebox` compare clean and were left alone.

- **`flex-1` on a row that must wrap is the same bug in a second place.** The
  Ladder card's header row already carried `flex-wrap`, yet its status pill
  still painted over the title on a phone: `flex-1` sets `flex-basis: 0`, so
  the line always "fits" and nothing wraps — the pill simply got squeezed. Its
  title is `grow basis-40` now (160px), which makes the line genuinely overflow
  on a narrow card and pushes the pill onto its own row; the pill also takes
  `shrink-0`. Verified at seven widths: inline down to 560, stacked below 430,
  **no overlap anywhere**.
  Together with the simulator's e-mail row, the rule is: **`flex-1` and
  `flex-wrap` do not co-operate.** If a row is meant to wrap, give its flexible
  child a real basis.
- The article's own section padding now runs the site's two-step scale:
  Corps, Cabinet and CTAFinal `py-16 lg:py-24`, Transparence
  `pt-12 pb-9 lg:pt-18 lg:pb-13`, Interlocuteurs and ALireEnsuite
  `pb-16 lg:pb-24` (bottom only, as their frames specify). Desktop is
  unchanged — 96/96, 72/52 and 0/96 exactly as before, page still 19114.
- **`min-w-0 flex-1` on a flex item lets it shrink below its own content**, and
  that is what broke the simulator's e-mail row on a phone: the placeholder
  collapsed and wrapped onto four lines while the button, which cannot shrink,
  stayed beside it and painted over the text. `flex-wrap` never fired, because
  the pair technically still "fitted".
  The row is `w-full` first and side by side only from **`md`** — one
  breakpoint later than the Consult footnote's `sm`, because at `sm` the row is
  just 414 wide and the placeholder still wrapped onto two lines. Verified at
  ten widths from 1920 to 320: no overlap anywhere, side by side down to 768,
  stacked below it.
  Note this is the **opposite** fix to the Tools cards, which needed `min-w-0`
  *added*. The question to ask is whether the item has content that must not be
  squeezed — a label may shrink, a field with a placeholder may not.

- **Nested padding is the article's mobile problem, not the section padding.**
  Its two tools nest three deep — the tool box (28), the result panel (24) and
  the dark submit panel (28) — which is **80px of inset a side**. At 320 that
  left the innermost email row **118px** wide; at 375, 173.
  Every article block now scales its padding below `sm`: outer blocks
  `p-5 sm:p-7`, the two result panels `px-4 py-5 sm:px-6 sm:py-5.5`, and the
  innermost dark panel `p-4 sm:p-7`. The row goes to **174 at 320** and **229
  at 375**, and `sm:` restores Figma's 28/24/28 exactly at desktop — verified,
  with every section height unchanged.
  **Measure the nesting, not the outermost padding**: the section shell was
  never the problem here.
- **The Figma page frames carry their own corner radius.** It is a canvas
  artefact and must not be built. Confirmed the site has none: `html`, `body`,
  `main`, `header` and `footer` all compute `0px 0px 0px 0px`, no section or
  container-width element carries one, and the viewport corner pixels are
  filled edge to edge (`#f5f5f0` top, the footer's colour bottom) — a rounded
  page would show whatever sits behind it there instead.
  The large radii that *are* real are all per-block: the seam's 54px top left,
  the Interlocuteurs card and portrait at 80, the `consult` block's top corners
  and the 200/10/100/60 set on the photos.

- **Four corrections after review, three of them things the checks had missed:**
  1. **Interlocuteurs is white cards on a lilas ground** — the section was built
     `bg-white`. Sampling the node render settles it: `#f6f5f1` covers 916k
     pixels (the section) and `#ffffff` 571k (the cards). Its
     `0px 14px 34px` shadow is the **hover state**, not a permanent one — the
     same call the home Domaines and Actus grids and the Contrats Domaines
     make. That is now the fourth time a Figma-drawn shadow has turned out to
     be hover; **assume hover unless a second card in the same grid lacks it.**
  2. **Both prev/next labels are periwinkle.** The left one was brique — the
     old frame really did set them differently, and the note recording that is
     now out of date. Sampled at `#2e5bb8` for both. They keep different type
     styles: the left is the overline (0.18em), the right the Button style with
     none. **The section overline above them stays brique `#a67c1b`** — a
     global replace of `text-brique` catches it too, which is exactly the
     mistake to avoid here.
  3. The sticky bar left its **2px red rule showing along the bottom edge when
     dismissed**: `translate-y-full` moves the box but the rule still painted
     at the boundary. The closed state now carries `opacity-0` as well, and the
     transition names `[translate,opacity]`.
  4. Its ground is **60%, not Figma's 30%** — asked for, and justified: the bar
     is fixed over live page content, and at 30% the copy was unreadable
     against whatever ran underneath. A deliberate departure from the comp.
- **ALireEnsuite needed three fixes beyond the pale-gold model row**, none of
  which a palette comparison could see — it reported "palette ok" throughout.
  An **ink-band comparison** found all three: every band sat a constant 96px
  low, and the last four diverged.
  1. **Bottom padding only.** Its overline is at y=0, like Interlocuteurs and
     the home CTAFinal. That was the constant 96px.
  2. **The sub-category list fills column-major** — the first two items run
     down the left column and the last two down the right. A plain
     `grid-cols-2` fills across and interleaves them, which is what shipped.
     It is `sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-[auto_auto]`.
     - **`grid-cols-2` is still needed alongside the column flow**: without it
       the tracks size to their content — 557 and 624 against Figma's equal
       590.5 — and the first row wraps.
     - **`grid-rows-2` is wrong here.** Tailwind maps it to
       `repeat(2, minmax(0,1fr))`, which levels the two tracks; Figma sizes
       each to its own content (41 and 66). `grid-rows-[auto_auto]` is the fix.
  3. Its label sits **34px** above the first row — 20 to the grid plus a 14px
     column inset — where the build had 14.
- After: **1403.3 against 1405**, with **24 ink bands in both and a maximum
  band offset of 6px**. It had been +56.3 with the bands 96px out.
- **Lesson: a clean palette comparison does not mean a section is correct.**
  Run the ink-band profile too — it catches padding, ordering and track-sizing
  differences that colour counting cannot.

- **The sticky bar is redesigned too** (`13318:3406`), and it is easy to miss:
  it is `position: fixed`, so it does **not** appear in the page frame's static
  flow — it sits as a separate node at the end of the tree. Grep the metadata
  for it rather than assuming the section list is complete.
  It goes from an encre bar with white copy and a gold button to a
  **pale-rose/30 band under a 2px red rule**, with an encre title, a
  **periwinkle** detail line, and a **white button carrying red copy** and a
  speech bubble rotated -90°. 78 -> 98 tall.
  Its button is written out rather than using `Button`: white-on-red-copy with
  an icon is not one of its variants. Measured: bar 100 against 98 (the 2px
  border), button **43 exactly**, every colour matching.
- Cabinet and the Footer are **unchanged** — Cabinet compares palette-clean at
  774 and its `prestgrid` is the same three 399px cards; the Footer is the
  shared component and its 357 matches.

- **Corps, the rest of the column.**
  | block | Figma | was |
  |---|---|---|
  | `seam` (x2) | **pale mint, photo, 54px top-left corner, link under the copy** | lilas, gold left edge, composed figure, link to the right |
  | `reflist` | **4 rows + a "+9 Voir la liste complète" outline button** | all 13 rows |
  | `tl`, `cmp`, `jur-list` | unchanged | — |
  - The seam went **124 -> 220** because its link moved under the copy; it now
    measures 220 exactly. The reflist went **1124 -> 415** against Figma's 430.
    All thirteen references stay in the data — that is what the "+9" counts.
- **Interlocuteurs is restructured** (`13323:4272`): two side-by-side cards with
  104px circular portraits become **two full-width stacked cards**, each with a
  200x240 rectangular portrait, a permanent `0px 14px 34px` shadow, an
  **80px top-left corner** on both card and portrait, a **red** angle rule where
  it was pale gold, a **periwinkle** languages line, and **two** CTAs.
  - **It takes bottom padding only** — Figma puts its overline at y=0. That was
    the whole of a 102px overshoot; with `pb-16 lg:pb-24` it measures **906.4
    against 900**.
  - Two new crops at 3x the 200x240 box: `lawyer-portrait-card.jpg` and
    `tony-portrait-card.jpg`. Its languages copy also changed, and each lawyer
    gained a second CTA.
- **ALireEnsuite**: the commented-model row gains a **pale-gold ground** where
  it was a bare bordered strip on lilas. Palette-clean after; 1459.3 against
  1405, which is the already-recorded card-border and sub-category accumulation.
- **Whole page: 19170 against the frame's 19284.6 — 0.6% under**, with Hero
  +0.5, Cabinet +2.9, Interlocuteurs +6.4, Transparence +0.5 and CTAFinal +0.4.
  Corps is −181.7 over 13,966px, which is where the remaining difference sits.
- Orphans created by this pass: `lawyer-figure.svg`, `lawyer-figure-dark.svg`
  and the two `-square` portraits are no longer used by the article column.

- **`--color-pale-rose` (#edc2dc) is the one token added here, and it was
  asked about first.** Unlike Mint, Pale_Mint, Pink and Red it is **not** a
  named Figma library style — just a raw `rgba(237,194,220,0.3)` fill on the
  trap box and its tag — so the named-style precedent did not cover it. It is
  only ever drawn at 30%: `bg-pale-rose/30`.
- The `answer` box change is the one to remember: **pale mint #e8f5f1 against
  lilas-2 #e8ecf5**. Those two are indistinguishable by eye and differ only in
  the green channel; nothing but a pixel comparison would have caught it.
- `bullet-mark.svg` went gold -> periwinkle. It is used only by `takeaways`,
  so it was recoloured in place rather than forked.
- Its title copy also changed: **"Sept points à retenir"**, from "Points clés à
  retenir".
- Measured after: takeaways 568 against Figma's 565, four mint ladder pills,
  trap resolving to `pale-rose/30` with red tag text, answer at
  `rgb(232,245,241)`.

- **Transparence flipped from dark to light.** `13318:3318` draws it on
  **white** with an encre title and disclaimer and encre/62 secondary text,
  where it had been the article's only dark band. The overline stays gold and
  the closing `Signalez-la-nous.` stays rose; every measurement — 72/52
  padding, 20px block gaps, the 8px head gap, the 784 head cap and the 1100
  column at x=360 — is unchanged. Section still 370.
  **The Bibliotheque hub's Transparence is a different component and stays
  dark** — confirmed after the change: its band still measures encre 616218.
  The two share strings through the top-level `Transparence` namespace, which
  is exactly why they could diverge in colour without touching the copy.
- Cabinet and CTAFinal compare **palette-clean** against their new nodes
  (`13318:3141`, `13318:3326`), so neither changed.
- **Hide `position: fixed` elements before any clip capture on this page.** The
  red side tab is fixed, so it photobombed every section capture with a
  constant 9149 red pixels and read as a palette mismatch in Cabinet,
  Transparence and CTAFinal at once. The same trap the sticky bar caused
  before; `sect.mjs` now hides every fixed element outside the header.

- **Hero rebuilt to `13318:2451`.** What changed from the old one:
  - the photo is **470x548** (was 450x414) and has **lost its 2px gold
    border**; same asymmetric radii. Its stage is 553 wide because Figma sizes
    that group by its overhanging children, not by the photo, so the photo sits
    42.53px in. `reading-outdoors-tall.jpg` was re-cropped in place to the new
    window (1410x1644, 3x) — it had no other user.
  - the rotated verification chip is replaced by a **`hero-card`** — "Un
    dossier, un avocat." over a small note, white, `rounded-[16px]`, overhanging
    the photo's lower left.
  - a new **"15 ANS" seal**: a 97.333px encre disc with a 2px lilas border,
    rotated 7°, gold heading over white lines. Figma's 108.47 box is the
    *rotated bounding box*, so the untransformed box sits at 450.1/64.57 — the
    same centre-of-rotation correction the Bibliotheque polaroid needed.
  - **`Art.` is periwinkle, where it was gold.**
  - the verification line folds into the meta string: "12 min de lecture ·
    vérifiée le 19 août 2026".
  - the row is `items-center` with a **36px gap**, where the old one was
    `items-start` with none.
- **The hero card is a two-thirds-scaled component instance**, which is where
  its 14.667/9.333px type and 16.667px padding come from — all arbitrary
  values, none on the spacing scale. Its body sits well under the design
  system's own 16px floor; that is what the comp draws and it is worth raising
  with the designer.
- Measured: section **890.5 against 890**, photo 470x548 at the exact offset
  with radii `200px 10px 100px 60px` and no border, card 213.3x98 at (0, 428),
  badge bounding box 108.5 at (444.5, 59) rotated 7deg, articles row at y=688.
  No horizontal overflow from 1920 down to 320.


## Page 8 — new-article-page (`/bibliotheque/new-article-page`), frame `13318:2398`

**A second build of the frame `/bibliotheque/article-design` was made from.**
Same article — same crumb, same title, same hero card and badge — but the frame
has grown since that page was derived, so this one is being rebuilt section by
section against the current nodes while the old page stays untouched for
comparison. Asked for explicitly; the slug is the user's.

| | when article-design was built | now |
|---|---|---|
| Corps | 13966.6 | **14362.6** |
| ALireEnsuite | 1405 | **1411** |
| Page frame | 19284.6 | **19686.6** |

Hero, Cabinet, Interlocuteurs, Transparence and CTAFinal are unchanged heights.

- Its components are their own copies under `src/components/sections/new-article/`,
  so an edit here never reaches the original. **Its copy is not duplicated** —
  the article is the same article, so these sections read the existing
  `ArticlePage` namespace and only what the new frame actually changes goes into
  `NewArticlePage`. `ArticleActions` is imported from the original rather than
  copied: it takes both labels as props and holds nothing page-specific.

| # | Section | Node ID | Figma h | Status |
|---|---|---|---|---|
| 1 | Hero | `13318:2451` | 890 | done |
| 2 | Corps | `13318:2503` | 14362.6 | in progress |
| 3 | Cabinet | `13318:3141` | 774 | |
| 4 | Interlocuteurs | `13318:3188` | 900 | |
| 5 | ALireEnsuite | `13318:3230` | 1411 | |
| 6 | Transparence | `13318:3318` | 370 | |
| 7 | CTAFinal | `13318:3326` | 550 | |
| + | sidetab | `13318:3413` | 45x236 | |

- **Nothing on this page is ported.** A first attempt copied the original
  page's components and only fixed the spacing; that produced the old design on
  the new rhythm, and the user rejected it. Every component here is derived
  from its current node.
- **Hero: 890.5 against 890**, with the photo, hero card, badge box and
  code-articles row on Figma's exact coordinates — photo **(1072, 102)
  470x548**, card **(1029.5, 530) 213.3x98**, badge box **(1474, 161) 108.47**,
  articles **(337.5, 672) 1245x123.5**, marker within 1.3px.
- Its body padding is **40 above and 72 below**, not a symmetric 56: Figma
  centres a 1245 grid at HeroFiche y=40 whose three rows — the 548 hero row,
  the articles band and a 1px rule — sit on a 22px row gap, and closes the 828
  band 72 below. With 56/56 every element in the body sits **16px low** while
  the section still measures 890.5, which is how a wrong pad hides.
- The gold marker sits **0.804em** below the title box — 37px, the foot of line
  one — where the original page has 0.591em.
- **Let Figma's own 108.47 box centre the badge.** The export wraps the rotated
  97.333 disc in a 108.47 flex box at 444.53/59, so placing that box and
  centring the disc inside it avoids the rotate-about-the-centre arithmetic the
  polaroid and the old verification chip needed.
- **`get_metadata` and `get_design_context` disagree about the badge by 12px.**
  The metadata puts its box at 456.39 inside the 553 stage; the export says
  444.53, and 444.53 + 108.47 is exactly 553, so the export is the
  self-consistent one and is what is built. Where the two differ, prefer the
  export.
- Two icons matched existing files exactly and are reused (`link.svg`,
  `printer.svg`); `bench-laptop-portrait.jpg` is new — 1410x1644, 3x the
  470x548 box, and **not** the original hero's `reading-outdoors-tall.jpg`.
- **Never quote a raw Figma class string in this file.** Tailwind v4 scans the
  project root, `.md` included, so a `gap-[var(--petroff…)]` written in prose is
  compiled as a real utility. That one is invalid CSS, and it took the whole
  stylesheet down — `Parsing CSS source code failed`, every page served as the
  error shell, and nothing in `src/` to show for it. Describe such classes;
  never paste them.
- No horizontal overflow from 1920 down to 320.
- Reachable from the **Bibliotheque submenu, which now carries three children**
  — verified by opening it: `article-design`, `Avocat e-commerce`,
  `new-article-page`.

### Page 8 — Corps, to build

The column (`13318:2505`) is a flat stack of **twenty blocks on a uniform 48px
gap** — every wrapper's end plus 48 is exactly the next one's start, to
14170.57 — with a uniform **24** inside each block. That replaces the original
page's per-block spacer frames (18, 56, 16, 30).

Its full design is saved: one `get_design_context` with `forceCode`, 100k
characters, **19 assets already downloaded**, so no further Figma calls are
needed for this column. What that spec shows, against the original page:

- **`<ref>` is Inter SemiBold 18/1.5 in plain encre**, not 16/1.45 in brique.
  Counting the column's inline spans settles a run that appears in three forms:
  **28 at 18/1.5 encre, 2 brique, 2 at 16/1.45** — the first is the rule.
  `<b>` is unchanged, Poppins SemiBold 18/1.35, 15 occurrences.
- Fills have moved again — read the fill, never assume the last pass holds:
  `answer` is **lilas-2** (it went pale mint, and has come back); `trap` is
  **lilas with a stone tag in brique** (it was pale gold, then pale rose at 30%
  with a red tag); both `seam`s are **lilas-2 with a filled gold pill** where
  they were pale mint with a periwinkle text link.
- The simulator's four bands are on a uniform 36.
- Content: the `juge` block loses its sub-heading; the consult block's three
  reassurance marks return as a row **beneath** it; `takeaways` gains a heading
  above it, "Points clés à retenir", the string its own title used to carry.
- **Figma puts the column band at x=402.5, not 337.5.** Its Corps frame is an
  auto-layout row whose first child is a stray 1px `marks` frame, and
  337.5 + 1 + 64 is exactly 402.5 — an artefact, not intent.

**Rail (`13318:3093`) and the first three blocks are built.** Measured: column
**881 at x=338**, rail **300 at x=1283** — a 64px gap, the container's whole
1245 — and blocks 1, 2, 3 at **0/478, 526/476, 1050/207** against Figma's
0/475, 523/475, 1046/204. Every gap measures 48.

- The rail's TOC, CTA card and author card are character-identical to the
  original page's copy, so they read `ArticlePage.rail`. **Its verification
  line is not**: Figma now writes just `Vérifié le 19 août 2026` — masculine,
  and without the old "Signaler une inexactitude" link — so that one string
  lives in `NewArticlePage.rail`.
- Its seal glyph matched `seal-ribbon.svg` exactly and is reused;
  `lawyer-portrait-rail.jpg` is a new window on the portrait source
  `lawyer-portrait-card.jpg` already uses (732x420, 3x the 244x140 box).
- Figma renders the TOC's last entry, "Questions fréquentes", at Poppins Bold
  40 — the section-title style leaking into a list item. Built like the other
  nine.
- **The active marker moves as you read** — an `IntersectionObserver` spy, the
  one behaviour on this rail Figma does not draw: it marks only the first entry
  gold, which is a state rather than a fixed style.

**Block 4, the simulator (`13318:2543`), is built.** Lilas-2, 18px corners, and
its four bands on a uniform **36**. Measured 1305/1364 against Figma's
1298/1350, with the bands at 28/115, 179/181, 396/85, 517/819 against 28/114,
178/176, 390/85, 511/811.

- **Three of its fills moved again.** Its CTA is **gold** (it had gone encre);
  the verdict panel is **pale blue with encre copy** (it was brique at 14%,
  then pale rose at 30% with red copy); and the submit panel is **pale blue
  with an encre button**, where it was a dark encre panel with a red one.
- **Its four result values carry Figma's own widths** — 347, 337, 246, 363 —
  which are narrower than the row can give, so they wrap. Those are stale
  auto-layout widths and they break mid-citation, but reproducing them is what
  matches the 811px result panel: letting them flex, as the original page
  does, costs **62** of it. They still flex below `sm`, where the row is too
  narrow for any of them.
- Its chevron matched `chevron-down.svg` exactly and is reused. Its pill copy
  reads `Gratitut · 60 secondes` in Figma — still the typo already recorded;
  the stored string says `Gratuit`.

**Blocks 5-7 — `niveaux`, `ladder`, `cmp` — are built.**

- The `ladder`'s four tile tints are **pale blue, pale gold, pink at 40%, pale
  mint** — they do not track the level and do not repeat, so they are carried
  per rung. Every status pill is pale mint whatever the tile.
- That pink is Figma's `rgba(239,207,217,0.4)`, a **third** pink value. Once
  composited it lands within two units of `--color-pink-soft` at the same
  alpha, so that token is reused rather than a third one added — the same call
  the arc reuse makes.
- `cmp` is a real table with an **encre header band**, 230/325/325 columns and
  five rows on `encre/6` rules. Its two right-hand body columns are Inter 16,
  not the body's 18; only the level itself is Poppins SemiBold 18.
- **All six icons this pass needed matched existing files exactly** — `key`,
  `circle-slash`, `circle-half`, `padlock`, `courthouse-line`,
  `warning-circle`. Run the path-data match before adding anything.
- **The typed catalogue earned its keep**: the fourth ladder key is
  `authentique`, not the `manuscrite` the tile order suggested, and `tsc`
  caught it before it ever rendered.
- **A `**16**/1.5` written inside a JSDoc block comment closes the comment** —
  the `**` before the `/` is a `*/`, and everything after it parses as code.
  It cost two rounds here, because the note explaining the trap contained the
  trap. Write such measurements out in words inside comments.

**Blocks 8-10 — `seam`, `juge` + `trap`, `denie` + `tl` — are built.**

- Both seams are **lilas-2** with a 54px top-left corner, 36 of padding left
  against 64 right, and a **filled gold button** where the original page has a
  periwinkle text link. Their labels therefore lose the trailing `→` the link
  carried, which is why `NewArticlePage` holds two CTA strings of its own. The
  portrait is the stored `lawyer-portrait-inline.jpg`, already 422x492 —
  exactly 3x this box.
- **The `denie` wrapper is the one block whose inner gap is not 24.** It nests
  the heading and its paragraph as a group and then leaves **36** before the
  timeline. Missing that is −12.
- **The timeline's rail is drawn per item, not once.** Figma pins a single 2px
  pale-periwinkle bar at a fixed 435px height, which only holds at the width it
  was measured on. Each item draws its own connector and the last drops it, so
  the line always starts and stops on a dot. Deliberate.
- **A stored string was truncated, and only measuring found it.** Timeline step
  4 came out 132 against Figma's 158 — one line short. `ArticlePage`'s copy
  drops "du signataire contestataire sans avoir vérifié au préalable si le
  procédé était qualifié", which leaves the sentence ungrammatical: "mis la
  preuve à la charge (Cass. …)". The frame carries it in full, so the complete
  version lives in `NewArticlePage.timeline.s4Body` and this page reads that
  for step 4. **The original page still shows the truncated sentence** — worth
  fixing there too, separately.
- `calendar-dots.svg` is new — the `denie` heading now carries a 46px glyph
  where it had none. Every other glyph this pass matched an existing file
  exactly: `shield-badge`, `open-code`, `balance-scales`, `doc-stack`.

**Blocks 15-16 — `reflist`, `jur-list` — are built.** The reflist is four ruled
rows on a 24px gap closing with an outline "+9" button; all thirteen references
stay in the data, which is what the +9 counts. Each `jur` card stacks its
brique citation, 20px title and body **flush — the card carries no gap of its
own** — which is why it now lands at +13 where the ported version was +73.

**Blocks 11-14 — `forme`, the second seam, `organiser`, `vigil` — are built.**
Three needed no new component; `vigil` is four ruled rows with no gap between
them, 18 of padding each side, an 18px gap to a 24px glyph and an `encre/10`
rule under every row including the last. All four of its icons matched existing
files exactly — `inbox`, `page-corner`, `monument`, `clock`.

**Blocks 17-20 — `triage`, `faq`, `consult` + `marks`, `takeaways` — are
built, and the column is complete.**

- `triage` keeps its **gold** CTA and pale-blue result panel, matching the
  simulator above it; its third option is still the one Figma marks chosen, and
  is reproduced as `aria-current` on a list row rather than as a control that
  does nothing. Its own CTA copy, note and disclaimer moved into
  `NewArticlePage.triage`.
- **The consult block and its three reassurance marks are one card, not two.**
  Figma rounds the form's top left to 54 and top right to 18, the strip rounds
  the two bottom corners, and an `encre/20` rule separates them — so a single
  lilas-2 column, not a block plus a strip on the 48 rhythm.
- **Do not give that marks row a column gap.** Figma sets only `gap-y-8px` and
  lets `justify-between` space the three items; adding `gap-x-6` pushed them to
  816 against 809 available and wrapped the third onto a second row, taking the
  strip from 64 to 97 and the block from 668 to 708. Removing it landed both.
- **Its `whitespace-nowrap` has to be `sm:whitespace-nowrap`.** The longest
  mark is 306.8px wide, which with the strip's 20px sides overruns a 320
  viewport by 27 — the only overflow the sweep found on this page. Below `sm`
  it wraps.
- **`takeaways` is pink again, and its bullet is gold.** Its ground is
  `#EFCFD9` at 40% — a **third** hex under the library name "Petroff/Pink",
  beside `--color-pink` (#FAC5EF) and `--color-pink-soft` (#F0D5DD). Composited
  at 40% over white it lands under 3/255 from `pink-soft`, so that token is
  reused rather than a fourth near-identical colour added. **The name is not a
  stable key in this file — compare the hex every time.**
- Its bullet is **gold** where the original page's is periwinkle, and
  `bullet-mark.svg` is shared, so it is **forked** to `bullet-mark-gold.svg`
  rather than recoloured — the same call the mint laurel and pale-blue
  courthouse forks make.
- Its heading, "Points clés à retenir", is a `SectionTitle` with no glyph over
  the box, whose own title stays "Sept points à retenir". All seven point
  strings are character-identical to `ArticlePage.takeaways`, so only the
  heading is new copy.

Blocks 1-20 against the frame:

| # | block | Figma h | built h | Δ |
|---|---|---|---|---|
| 1 | answer | 475 | 478 | +3 |
| 2 | ecrit | 475 | 476 | +1 |
| 3 | rulebox | 204 | 207 | +3 |
| 4 | simulateur | 1350 | 1364 | +14 |
| 5 | niveaux | 675 | 678 | +3 |
| 6 | ladder | 787 | 797 | +10 |
| 7 | cmp | 668 | 675 | +7 |
| 8 | seam | 220 | 220 | **0** |
| 9 | juge | 602 | 602 | **0** |
| 10 | denie + tl | 838 | 836 | -2 |
| 11 | forme | 636 | 637 | +1 |
| 12 | seam | 220 | 220 | **0** |
| 13 | organiser | 886 | 889 | +3 |
| 14 | vigil | 471 | 477 | +6 |
| 15 | reflist | 500 | 508 | +8 |
| 16 | jur-list | 1044 | 1057 | +13 |
| 17 | triage | 813 | 829 | +16 |
| 18 | faq | 1092 | 1119 | +27 |
| 19 | consult + marks | 668 | 676 | +8 |
| 20 | takeaways | 635 | 638 | +3 |

**All twenty built, every one within 27, and the column measures 14295.4
against Figma's 14170.57 — 0.88% over more than fourteen thousand pixels.**
No horizontal overflow at 1920, 1280, 768, 375 or 320.

**Cabinet (`13318:3141`) is built: 776.9 against Figma's 774**, with every
band exact — overline at 96, title 126.8, lead 186.8, grid 254.8, footnote row
627.9 — and all three cards on their exact Figma x at exactly 399 wide
(337.5 / 760.5 / 1183.5). The 2.9 is one card border plus line rounding.

- **One thing changed from the original page: card 3's tile is pale mint**,
  where that build repeats card 1's pale blue. The other two are unchanged.
- **Figma marks the row `items-start` and stretches only the first card**, so
  cards 2 and 3 keep their own heights (373.1 / 371.4 / 372.3) — the
  Interlocuteurs shape, not the levelled grid the original page uses. It only
  shows when card 1 is not the tallest, which is why it is easy to miss.
- **All three icons match existing files exactly and are reused** —
  `file-lines`, `shield-check-wide`, `balance-scale`. Two of them carry the
  library's 1.95 stroke against this export's 2.1125; that is the already
  recorded 0.16px difference at 26px, invisible. **No new assets.**
- Its copy is character-identical to `ArticlePage.cabinet`, so no new strings
  either. Its head is written out (10 under the overline, 14 under the title,
  lead `text-small` at the full 1245) and its lead is Inter 16, not 18.

**Interlocuteurs (`13318:3188`) is built: 906.4 against Figma's 900** — the
same number the original page's records, and the 6.4 is the two card borders
plus line rounding. Bands exact: overline at 0, title 30.8, lead 90.8, grid
158.8; portrait **200x240 at x=366.5**; card radii `80/18/60/18` and portrait
`80/4/20/20`, all exact; angle rule red, languages periwinkle, ground lilas.

- **It takes bottom padding only** — Figma puts its overline at y=0, since
  Cabinet above closes with its own 96. (The e-commerce twin is the one that
  pads both sides.)
- **Figma draws the `0px 14px 34px` shadow on the first card only**, so it is
  the hover state, not a permanent one — carried on `hover:`. That is the fifth
  time on this build; assume hover unless a second card in the same grid has it
  too.
- Its two cards are **not levelled** (298 / 317.6, 36 apart) — Figma marks the
  grid `items-start` and neither card carries `self-stretch`.
- **No new assets.** Both portrait exports are the raw sources; run through
  Figma's own placement (card 1 a plain centre `cover`, card 2 at 125.18% /
  151.44% with a −12.59% / −0.19% offset) they diff against the stored
  `lawyer-portrait-card.jpg` and `tony-portrait-card.jpg` at **1.09 and 1.81
  of 255** — JPEG noise, so the stored crops are exact.
- No new strings either: everything but the angle note is the shared top-level
  `Interlocuteurs` namespace, and the angle comes from
  `ArticlePage.interlocuteurs`.

**ALireEnsuite (`13318:3230`) is built: 1419.3 against Figma's 1411.** Five
blocks on a uniform 36px gap — head, prev/next, a 3-up library grid, the
commented-model row and the sub-category list — with every gap measuring 36
exactly, all three cards on their exact Figma x at 399 wide, and the
sub-category columns at 590.5 + 64 + 590.5 = the container's whole 1245.

- **It takes bottom padding only**, like Interlocuteurs above it.
- **Its head gaps are 16 and 16 here**, not the 10 / 14 the original page's
  build uses — Figma wraps the three lines in one 16px column (`13427:15828`,
  a node id from the newer range, so this is a real change).
- **The card descriptions are Inter 16 (`text-small`)**, not the body's 18.
- **Both prev/next labels are periwinkle** but keep different type styles —
  the left is the overline (0.18em tracking), the right the Button style with
  none.
- **The sub-category list is two explicit columns in Figma now**
  (`13323:4355` / `13323:4356`), each holding its two rows — so the
  column-major fill is structural rather than the `grid-flow-col` trick the
  original page needed, and each row keeps its own height for free.
- **No new assets and no new strings.** `model-folder.svg` is path-identical to
  the export, the three photo exports run through Figma's own placement diff
  against the stored crops at 2.7 / 4.0 / 2.7 of 255, and the copy is
  character-identical to `ArticlePage.alire`.
- **The `Container` trap cost a round here.** `flex flex-col gap-9` passed to
  `Container` lands on its padded OUTER div, leaving the inner max-w div as a
  single flex child — so all five blocks stacked flush and the section came out
  **1275.3, exactly 4 x 36 short**. The column has to go *inside* `Container`.
  Same fault the article's sticky bar hit; it is worth checking the gap
  measures what you asked for whenever a `Container` carries flex classes.

**Transparence (`13318:3318`) is built: 369.5 against Figma's 370**, with
every band on the comp — overline 62, title 90.8, sources 144.8, disclaimer
190, note 260.4 — the band at x=360 and 1200 wide, and the two text measures at
784 and 1100. White ground, gold overline, encre disclaimer, rose closing
sentence, all five strings from the shared `Transparence` namespace.

- **Its column is vertically centred in the band, not padded 72/52.** Figma
  pins the group at `top: 62.43` over 246.4 of content, leaving 61.2 below.
  **Both readings total 370**, so the section height cannot tell them apart —
  an **ink-band profile of the node render** settles it: the overline's cap top
  is at **y=67**, which is what a 62.43 box gives, where 72 would put it at
  ~76.5.
- **That makes the original page's Transparence 10px low on every band** —
  `/bibliotheque/article-design` measures its overline at 72 against this
  page's 62, and its section at 370.5 because 72 + 246.5 + 52 also lands on
  370. The note in this file recording "72/52 padding … unchanged" was wrong.
  Left alone on the original page, which is kept for comparison; **worth
  fixing there separately**, like the truncated timeline string.
- The lesson generalises: **a correct section height is not evidence of correct
  padding.** Two pads that sum the same put every band in a different place,
  and only a band profile or the export's own offset shows which.

**CTAFinal (`13318:3326`) is built: 550.4 against Figma's 550**, and both
ornaments land on their exact Figma coordinates — the magnifier 150x150 at
(0.5, 231) inside the panel and the nib 103.125x150 at (1169.5, 0). Panel
1245x358.4 at y=96, 28px corner, lilas-2; every copy band exact (overline 160,
title 192.8, lead 250.8, phone 276, CTA row 339.2).

- Only its **title** is this page's own; the overline, lead, phone line and
  both button labels come from `ContactCta` and its `ask` pair — the same split
  the original page's and the hub's panels make. No new strings.
- **Both ornaments reuse existing files.** The magnifier at 150 is an exact
  uniform 150/140 scale of `magnifier-check.svg` — 66 path numbers matching to
  **0.0000** — with `stroke-width` left at 10 rather than scaling to 10.71,
  which is 0.7px on a 150px ornament. The nib at 103.125x150 is a non-uniform
  stretch of `pen-nib.svg`'s 110x153, exact because that glyph carries no
  strokes. No new assets.

**The side tab (`13318:3413`) and the sticky bar (`13318:3406`) are built,
and the page is complete.** Both are `position: fixed`, so they sit as separate
nodes at the end of the frame's tree rather than in the static flow — grep the
metadata for them rather than assuming the section list is complete.

- **The tab is the shared `SideTab` at `tone="red"`, unchanged.** Measured
  exactly **45x236** flush right, `rgb(240,26,93)`, shadow
  `0px 10px 30px rgba(18,42,76,0.2)`, radius `14px 0 0 14px` — every value the
  node's. Its 18px glyph is path-identical to `speech-bubble.svg`. The drawer
  is the shared `ConsultationDrawer`; this frame draws no drawer of its own.
- **The sticky bar has moved again, so it is NOT the bar the original page
  carries.** It is now a **lilas band at 60% under a 1px `encre/30` rule**,
  with an encre title, an **encre** detail line and a **red button with white
  copy**. The original page's is a pale-rose band under a **2px red** rule,
  with a **periwinkle** detail line and a **white** button carrying red copy —
  every one of those inverted. Note Figma now specifies the 60% ground itself,
  where the original build had to depart from a 30% comp to keep the copy
  readable over live page content. **This is the second time this node has been
  redesigned; read it, never port it.**
- Measured: bar **99.3 against 98** (its 1px border, drawn inside in Figma),
  button **43 exactly**, icon resolving to `-90deg`, ground `lilas/0.6`, rule
  `1px encre/0.3`. It still fades as well as slides — `translate-y-full` alone
  leaves the rule painting along the bottom edge when dismissed.
- **A 60% ground over white needs a backdrop blur or it reads as solid.**
  `rgba(246,245,241,0.6)` composites over the article's white column to
  `rgb(250,249,247)` — sampled, and within a unit of the arithmetic — which is
  near enough to white that the bar looked opaque while the page text stayed
  sharp behind it. `backdrop-blur-lg` (**16px**) is what makes the translucency
  visible; asked for. Verified by sampling the band right of the bar's own
  copy: 942 distinct colours with **luma bottoming out at 120**, where sharp
  encre glyphs would reach 18-40. **The export carries no blur radius**, so
  16px is a judgement call rather than a Figma number.
- Note the **original page's bar carries the same 60% ground with no blur**,
  and would read the same way; left alone with the rest of that page.
- Behaviour driven and verified: bar hidden and `inert` at scroll 0, visible
  and pinned to the bottom past 50%, the tab opening the drawer at 510 with
  focus landing on the Nom field, `body` overflow locking and restoring,
  Escape closing and returning focus to the tab, and the ✕ dismissing the bar
  while leaving the tab in place.

**One real overflow, and it is the recorded shape.** At 640 the page ran to
646 with **no element's box outside the viewport** — the simulator's fourth
result value was painting past its own box. Its `<dd>` carries Figma's stale
347/337/246/363 widths from `sm`, but at 640 the 380px label plus a 24px gap
leaves about **66px** inside three levels of nested padding, and `min-w-0` lets
the value shrink below its own content. The pair sits side by side from **`md`**
now and stacks below it. Desktop is untouched — Corps still 14487.4 and the
page still 19832. **`documentElement.scrollWidth` is what catches this; an
element scan does not**, because every rect stays inside the page.

**`<ref>` citations go brique on hover.** The article body's legal citations —
`(C. civ., art. 1366)`, `(Cass. com., 13 mars 2024, n° 22-16.487)` and 44 more
on this page — are destined to link out to the text they name, so they take
`hover:text-brique` with a colour transition and a pointer cursor. They were
briefly gold; **brique is the link colour for the article body**, asked for,
and it is now the only text-colour hover in that column. **Figma draws
no hover state for them; this is a deliberate addition, asked for.** They stay
`<span>`s until there is somewhere to point them, under the rule that nothing
navigates to a route that does not exist, so the cursor is an affordance for
the link they are about to become.

- It lives once, in `new-article/blocks/Prose.tsx`'s `proseTags`, which is
  where every `<ref>` in the column resolves — the five blocks that pass their
  own rich-text handlers (`Consult`, `Simulator`, `Triage`, `Interlocuteurs`,
  `Transparence`) carry `b`/`s`/`link`, never `ref`.
- Verified with a real `Input.dispatchMouseEvent`, against all **46** of them:
  `rgb(18,42,76)` at rest, **`rgb(166,124,27)`** on hover, back to encre off.
- **No `hover:text-gold` is left anywhere on the site.** The article column's
  other hovers are not text colours — the reflist button's `hover:bg-encre/5`,
  the simulator's and triage's `hover:border-*` — and the Rail's table of
  contents and the sticky bar's ✕ go encre/62 -> encre, which is a different
  pattern and was left alone.
- The original page's `<ref>` is a different style anyway
  (`text-small-strong text-brique`, the pre-redesign 16/1.45 run) and was left
  alone with the rest of that page.

**Anchor jumps ease rather than snap.** The rail's table of contents was
landing on its heading instantly; `scroll-behavior: smooth` now sits on `html`
in the base layer, wrapped in `@media (prefers-reduced-motion: no-preference)`
so a reader who has asked for less motion still gets the instant jump.

- It is **site-wide**, since it lives in `globals.css` — but this TOC is the
  only place on the site with in-page anchors today, so nothing else changes.
- Guarded with a media query rather than a `motion-reduce:` utility, because
  the rule belongs to `html`, which no component owns.
- Verified by clicking real TOC entries and sampling `scrollY` per frame:
  **56 distinct positions** over 900ms at no-preference against **1** under
  reduce, `scrollBehavior` computing `smooth` and `auto` respectively, the hash
  updating natively in both, and all three sampled headings landing at
  **23.5-23.9px** from the top — the `scroll-mt-6` the headings already carry.

### Page 8 — responsive pass

Asked for: harmonise and reduce the mobile gaps, and check the nested cards.
**Every `lg`+ value is left at the Figma number, so desktop is byte-identical**
— re-measured after each change, all seven sections and the 19832 page total
unchanged.

**The page was carrying three flat values that ignored the site's two-step
scale**, and they were the whole of the airiness:

| Element | was | below `lg` | `lg`+ |
|---|---|---|---|
| Corps' 20-block column | `gap-12` flat | `gap-8` (32) | `gap-12` (48) |
| its `denie` inner group | `gap-9` flat | `gap-6` | `gap-9` |
| ALireEnsuite's five blocks | `gap-9` flat | `gap-6` | `gap-9` |
| Interlocuteurs' two cards | `gap-9` flat | `gap-6` | `gap-9` |
| Cabinet / Interlocuteurs head -> grid | `mt-11` flat | `mt-8` | `mt-11` |
| the five padded sections | `py-16 lg:py-24` | `py-12 sm:py-16` | `py-24` |

- A flat `gap-12` across twenty blocks is **912px of pure gap on a phone**;
  that one line is the biggest single lever on this page.
- The section padding gains a **`sm` step** (48 / 64 / 96) rather than the
  site's usual two. That is new for section padding but not for this codebase —
  `p-5 sm:p-7` and `px-6 sm:px-12` already work that way. **The other seven
  pages still use a flat `py-16` below `lg`**, so this page is now one step
  lighter than they are on a phone; sweeping them is the same one-line change
  each.
- Result at 375: the six between-section gaps are **80 / 96 / 48 / 48 / 96 /
  96** — every one a multiple of 48, where they had been 80 / 128 / 64 / 64 /
  112 / 112. The 80 is the Hero, whose own body padding is 32; it is left
  alone rather than *grown* to 96.

**Cards inside cards.** The simulator nests four levels — block, result panel,
submit panel, field row — which at 320 was **136px of horizontal inset** before
any content, leaving the innermost box 126px. Only the **nested** levels were
tightened, so the outer blocks keep one rhythm with their unnested neighbours:

| level | was | below `sm` | `sm`+ |
|---|---|---|---|
| outer block | `p-5 sm:p-7` | **unchanged** | 28 |
| result panel | `p-4 sm:p-6` | `p-3` (12) | 24 |
| submit panel | `p-4 sm:p-7` | `p-3` (12) | 28 |
| Triage's result panel | `px-4 py-5` | `px-3 py-4` | 24 / 22 |

That takes the panel chain from 136 to **112**, and the innermost content box
from 126 to 160 at 320.

- **The e-mail field's padding had to move to `md`, not `sm`.** Figma's pill is
  `pl-16 pr-4` because the button sits flush inside it on the right — which is
  only true once the two share a row, and they only do from `md`. While they
  are stacked that left the placeholder **touching the right edge** with 12px
  on the left. It is a symmetric `p-3` below `md` now. Caught by looking at a
  render, not by any measurement: nothing overflowed and no height was wrong.

### Page 8 complete — seven sections plus the fixed pair

| Section | Figma | Rendered | Δ |
|---|---|---|---|
| Hero | 890 | 890.5 | +0.5 |
| Corps | — | 14487.4 | — |
| Cabinet | 774 | 776.9 | +2.9 |
| Interlocuteurs | 900 | 906.4 | +6.4 |
| ALireEnsuite | 1411 | 1419.3 | +8.3 |
| Transparence | 370 | 369.5 | −0.5 |
| CTAFinal | 550 | 550.4 | +0.4 |
| sticky bar | 98 | 99.3 | +1.3 |
| side tab | 45x236 | 45x236 | **0** |

Page **19832** at 1920. Every delta is the border-box difference. **No
horizontal overflow at any of nine widths from 1920 down to 320.**

Assets added across the whole page: `bench-laptop-portrait.jpg`,
`lawyer-portrait-rail.jpg`, `calendar-dots.svg` and `bullet-mark-gold.svg` —
four files, everything else matched something already in the tree.

## Page 7 — Avocat e-commerce (`/bibliotheque/avocat-e-commerce`), frame `13331:10364`

1920x17207. **Despite its frame name — the designer duplicated the fiche frame,
so it still reads "Fiche : Signature électronique" — this is a practice-area
landing page for e-commerce law.** Do not go by the frame title.

Its sections live in `src/components/sections/ecommerce/` and its copy under
the `EcommercePage` namespace. Reachable from the Bibliotheque submenu, which
now carries two children.

| # | Section | Node ID | Figma h | Status |
|---|---|---|---|---|
| 1 | Hero (crumb + row + trust + stats) | `13331:10417` | 1104 | done |
| 2 | Principe + intro | `13331:11415` | 1197 | done |
| 3 | Notre rôle | `13331:11795` | 1155 | done |
| 4 | Quand consulter | `13331:11924` | 944 | done |
| 5 | Comment nous aidons | `13331:11970` | 4726 | done |
| 6 | Forfaits | `13331:12906` | 988 | done |
| 7 | Comment ça marche | `13331:12970` | 1159 | done |
| 8 | Comprendre le droit | `13331:13264` | 2221 | done |
| 9 | FAQ | `13331:13351` | 844 | done |
| 10 | Interlocuteurs | `13331:11124` | 996 | done |
| 11 | ALireEnsuite | `13331:11178` | 818 | done |
| 12 | Transparence | `13331:11268` | 370 | done |
| 13 | CTAFinal | `13331:11276` | 550 | done |
| + | sidetab | `13331:11356` | 45x236 | done |

- **Its hero is one Figma frame holding four bands** — crumb, headline row,
  trust strip and stat band — so it is one `<section>` here and measures
  against 1104 directly. **1103.8**, with the stage (1029.5/118, 553x548), the
  photo (1072, 470x548), the trust strip (y=714, h=100) and the stat row
  (y=878) all landing exactly.
- **The trust strip must not sit inside `Container`.** Its four claims need
  1430px and Figma's own frame is padded to 1245, so the row overflows that
  padding and centres across the full 1920. Capping it at the container width
  wrapped it to two lines and made the strip 136 against the comp's 100.
- **`max-w-full` does not contain an offset absolute bar.** The pale-gold
  marker is pinned `left-[6.098em]` to underline "e-commerce"; `max-w-full`
  caps its width but not its left edge, so at 375 it reached x=431 and pushed
  the whole page sideways. It is `hidden sm:block` — below `sm` the title wraps
  after "Avocats du" anyway, which would leave the bar under the wrong word.
- Its photo, hero card and "15 ANS" seal are the **article hero's exact
  construction**, including the 42.53px inset and the rotated-bounding-box
  correction. `ecommerce-lawyer.jpg` is 1410x1644, 3x the 470x548 box.
- The gold trust dot is a `bg-gold size-2.5 rounded-full` span, not an asset —
  Figma exports it as a 10px SVG circle, which is not worth a file.
- **Principe + intro** measures **1198.67 against Figma's 1197**, with the
  illustration exactly 537.5x414 and the dark card exactly 611x414. Its left
  column profiles 17 ink bands in both renders, every one within 1-2px.
- Its row is 610 + 24 + 611 = the container's whole 1245, so it only holds
  together at **`xl`**; below that it stacks in DOM order — illustration,
  headline, paragraphs, CTA, then the card. At `xl` the intro column is
  `items-end` so the panel's right edge closes the column; once stacked it is
  `items-start` and aligns with the copy.
- **Its illustration is a second Paris skyline, not the Bibliotheque hero's.**
  Same 450x414 panel with the same corner radii, and the same two stars at the
  same sizes (31.8656 and 20.7127), but a **narrower Eiffel tower** (80x243.1
  against 141.8x280.4), **five** Haussmann blocks against that one's three, and
  three tower groups it does not have. So it ships as its own composed
  `paris-skyline-ecommerce.svg`, built from the twelve pieces at their own
  mask-positions exactly as `paris-skyline.svg` is — one file rather than nine
  sized ornaments. Every fill mapped to an existing token; no new colours.
- It needs a **601px viewport** (537.5 of illustration inside `Container`'s
  padding), so it is `hidden sm:block`. Below `sm` the section is copy only —
  the same call the Bibliotheque hero's collage makes at `xl`.
- Its polaroid repeats that hero's rotation correction: Figma's 0/121 is the
  *bounding box* of the -8deg frame, so the untransformed 150x202 card sits at
  **13.33/130.46**. Unlike the Bibliotheque one it carries **no `mix-blend`
  tint** — the print is a plain crop. `smiling-lawyer-square.jpg` is new (360px,
  3x the 120 print) and is a different person from both `lawyer-portrait` and
  `tony-portrait`.
- **Its card body wraps to four lines where Figma fits three**, and the whole
  difference is ~2.5px of glyph metrics: Figma's line 2 fills 511 of the 515
  content box, and the same line needs ~513.5 here. Nothing is misconfigured —
  same 515px measure, same 18/1.4. The card is a fixed 414 at `xl`, so it costs
  no height; the button simply sits 26px lower than the comp. This is the
  half-percent Inter drift already recorded for the article's prose.
- Its two buttons are `Button size="lg"` (28/16) — Figma's `btn` exactly, solid
  encre in the intro and `variant="gold"` in the card. Both inert.
- **The card is sticky at `xl`**, on the user's instruction — Figma draws it
  static. The intro column is 1005 tall against the card's 414, so it pins at
  24px and rides the rest of that column past. `self-start` is what makes that
  possible: the row is `items-start`, so the card keeps its own height rather
  than stretching to the row and leaving nothing to stick. Verified by
  scrolling — `sticky` and pinned at top 24 through 800px of scroll at 1920 and
  1280, `static` at 1024 and 375 where the two columns stack.
- **`Page.captureScreenshot` hangs at narrow widths if the prep script awaits
  every image.** A lazy `next/image` that is never scrolled near never fires
  `load`, so `Promise.all` over `document.images` never settles and the capture
  never runs — it reads as a wedged browser. Race that wait against a timeout.
- **Notre rôle** measures **1160.55 against Figma's 1155**, with every ink band
  in the head, the six checks and all three cards within 5px, and the
  photograph diffing against the node render at **1.96/255** — JPEG noise, so
  its crop and box are exact.
- **Figma clips its own head here.** The title's frame is 820 wide and the
  lead's 720, inside a 679 column marked `overflow-clip`, so the comp cuts both
  off mid-word ("des vende|"). They wrap here instead, the same call the
  Expertises stage and both domain heroes make — and it costs no height,
  because the title still lands on two lines at 679.
- Its head is written out rather than using `SectionHeading`: a flat 12px under
  both the overline and the title, where that component uses one gap for both.
- **Its overline is the first on the site that Figma uppercases in the style.**
  The text node stores `Notre rôle · Petroff Avocats` mixed case and the style
  sets `text-transform: uppercase`, so the string is stored as written and the
  call site carries `uppercase`. That is the opposite of the mixed-case finding
  everywhere else — **read the transform, not just the stored string**.
- Its check bullet is a plain `bg-gold size-3 rounded-full` span. Figma exports
  it as a 12px SVG circle, which is not worth a file — the same call the hero's
  trust dot makes. Figma puts it at the text box's y=0, not optically centred
  on the first line, and that is reproduced.
- `card-payment-laptop.jpg` is new: 1410x1644, 3x the 470x548 box, a uniform
  crop (the window's 0.8577 aspect matches the box exactly, so no stretch).
  Its box and radii are the hero photo's.
- Two mobile-only departures, desktop untouched: the checks take `gap-5` below
  `lg` because each item runs to five lines there and Figma's 12px stops
  reading as separation, and the card row is `lg:grid-cols-3` rather than
  `md:` — three 218px cards at 768 are too narrow for a 20px heading.
- **Its last check ends `en bonne forme ; coût`** — Figma writes an ordinary
  space before the semicolon, so on a narrow column the `;` can start a line.
  The copy is left character-identical to the export; worth raising with the
  designer, since French typography wants a narrow no-break space there.
- **Quand consulter** measures **946.23 against Figma's 944**, with 21 ink
  bands in both and every one within 2px, and the card region diffing against
  the node render at **1.07/255**.
- **Its "Parlons-en" card shipped unreadable in Figma and the designer has
  since fixed it.** The first version filled the card Lilas 2 while keeping the
  site's onDark tone set on top — gold overline, white title, white/70 lead and
  footnote — so the copy was invisible; it was built that way verbatim on the
  user's instruction. The updated node **keeps the pale ground and darkens the
  copy**: encre title, encre/62 lead and footnote, and a **gold** button where
  it had been red. The five trigger bullets went **periwinkle to gold** in the
  same pass — a change nothing in the card would have led you to.
  Re-derived by **diffing the old node render against the new one pixel for
  pixel**, which named every changed band (the card's title, lead, button and
  footnote, and the bullet column) and proved the left column's head untouched.
  That diff is the cheapest way to answer "what did they change?" — far
  cheaper than re-reading the export. After: the card region's palette matches
  count for count (gold 9116 against 9190, encre 6631 against 7286), the whole
  section diffs at **3.02/255**, its 21 ink bands still land within 2px, and
  its height is unchanged at 946.23.
- **`flex-1` does not split a row evenly when one side is padded.** Both
  columns are 598.5 in Figma; as two `flex-1` siblings the padded card came out
  **634.5** and the triggers column **562.5** — exactly its 72px of padding
  moved across — because `flex-basis: 0` cannot resolve below the padding sum,
  so the padding is added on top of the item's share rather than sitting inside
  it. `min-w-0` does not help. The row is a `lg:grid-cols-2` now, whose tracks
  are equal whatever the padding, and both columns land on 598.5 exactly.
  That 36px of lost measure was the whole of a +52.6 overshoot: it wrapped the
  lead and one trigger body onto an extra line each. **This is the third flex
  trap on the build, after `flex-1` blocking `flex-wrap` and `min-w-0` letting
  a field collapse — reach for a grid whenever two columns must be equal.**
- **Figma names the card's frame `sticky`**, and it is 399 tall against the
  column's 752, so it is `lg:sticky lg:top-6 lg:self-start` like the Principe
  card. Verified: `sticky` and pinned at 24 at 1920 and 1024, `static` at 900
  and 375 where the columns stack.
- Its two columns hold only text, so the row splits at **`lg`** rather than
  waiting for `xl` as the two photo rows do.
- Its trigger bullet is a 14px **periwinkle** circle — again a span, not a
  file. Its section overline is uppercased in the style, like Notre rôle's.
- **Comment nous aidons** measures **4784.4 against Figma's 4726 — +1.2% over
  more than four thousand pixels.** Twelve service cards in two independent
  columns, broken by two photographs, two illustrated tiles and two CTA seams.
- **The saved page metadata is stale for this section, and the table above said
  4432.** Its CTA rows carry node ids in the `13416:…` range against the
  frame's `13331:…`, so the designer added the divider-plus-button row after
  the `get_metadata` snapshot — which also means every `svc` height in that
  snapshot predates it. `get_screenshot` reports the node's **current** size
  (4726), and `get_design_context`'s own `grid-rows` list gives the current
  per-card heights. **Check a node's id range against its frame's before
  trusting a saved metadata height.**
- Against those current row heights every card lands **+5.5 to +5.7** — the
  `Card` border plus sub-pixel line rounding — and the two tiles land −5.3,
  which is only that our columns are 598.5 where Figma's are 610.
- **Figma's own grid is 1268 wide inside the 1245 band** (610 + 48 + 610), so
  it overhangs the container by 23px. Equal grid tracks put the columns at
  598.5, the same call every other oversized frame gets.
- The columns are **lists, not rows** — Figma gives each its own sequence and
  they do not line up — so they stack one after the other below `lg` rather
  than interleaving.
- **`get_design_context` reported two fills wrongly, and a pixel count settled
  both.** It gives the second seam `bg-[#122a4c]` with white copy; the node
  renders **`#f3e5ea`**, which is `pale-rose` at 30% over lilas, with the same
  gold overline, encre title and gold button as the mint seam. And it gives the
  cart tile `bg-[#e8ecf5]`; the node renders **`#f3e3c0`**, pale gold. This is
  the second time this tool has misreported a fill, after the Methode badges —
  **histogram the node render before trusting a panel colour.**
- Our rose seam resolves to `#f4e6ea` against Figma's `#f3e5ea`: one unit in R
  and G, because Tailwind composites the 30% in **oklab** where Figma blends in
  sRGB. Imperceptible, and the article's trap callout already renders this way.
- Figma draws **no shadow** on these cards — sampling right below a card edge
  returns plain lilas — so `Card`'s hover-only shadow is correct here.
- **A `Page.captureScreenshot` clip taller than the emulated viewport paints
  blank past it.** The first capture of this section was correct for its top
  2000px and empty for the remaining 2800, which read as three missing panel
  fills. Grow the viewport to the section's own height before capturing
  anything this tall; `s5/shoot.mjs` in the scratchpad does it in two steps.
- Two new illustrations, `shopfront.svg` (142x160) and `shopping-cart-scene.svg`
  (137x160), every fill mapped to an existing token; two new photographs at
  1830x840, 3x the 610x280 tile. Its list bullet is a 10px **rose** span.
- Its cards' CTA is an outline **gold** border with **brique** copy — not one of
  `Button`'s variants, so it is written out. Six of the twelve carry Figma's
  `rounded-bl-[120px]` flourish with the deeper bottom padding that goes with
  it; the other six are plain `rounded-card`.
- **Forfaits** measures **993.1 against Figma's 988**, with every band in both
  card columns within 5px and the palette matching count for count (gold 13919
  against 13420). No assets, no new tokens.
- It is the **fourth Forfaits on the site** and ports the domain pages' anatomy
  almost exactly — same `Card`, same `-top-4 left-5` badge absorbing the 2px
  border, same gold-bordered featured plan with its permanent
  `0px 14px 17px` shadow, same 40px price on that plan against the others' 30,
  same non-bottom-aligned CTAs. Three differences: **no unit or flash line**
  beside the price, its feature text is **`text-small`** where the domain pages
  use `text-body`, and the head is written out because this page's overlines
  are uppercased in the style.
- Its `✓` is the same system-font fallback the domain pages record — 36 pixels
  of result-green against Figma's 123, because the Inter subset carries no
  U+2713 and the substitute draws a lighter check. Left as the browser draws it.
- Its footnote is 967 wide; `max-w-242` (968) is the nearest scale value, the
  same trade the footer columns make.
- **Comment ça marche** measures **1171 against Figma's 1159**, and the whole
  12px is the five step cards' 2px borders — the band offsets accumulate
  +1, +3, +6, +8, +10 straight down the list. Its right-hand card matches
  within 3px and the palette matches count for count (lilas-2 8316 against
  8264, gold 25747 against 26022).
- **It is the second grid on this page for the same reason as Quand consulter**:
  598.5 + 48 + 598.5, with the right column padded. As two `flex-1` siblings
  the card would take its 28px of padding *on top of* its half.
- **Its two doors are a picture of a chosen state, not controls.** Figma marks
  the first selected — white, raised on a `0px 8px 22px` shadow, gold icon —
  and gives the second no target, so they are `<li>`s with `aria-current` on
  the chosen one, the same call `outil-triage` makes on the article.
- Two new 26px icons at the library's `stroke-width="1.95"`, both converted to
  `currentColor` so the chosen/unchosen tone lives at the call site:
  `storefront.svg` and `package-box.svg`. Neither matched an existing file.
- Its entry rows are separated by a **`2 2` dashed encre/10 rule**, exported as
  a 542.5x1 SVG; it is a `border-t border-dashed border-encre/10`, not a file.
  Note this is encre/**10**, where OpenData's dashed rules are encre/12.
- Its numeral tile is 44px `rounded-field` lilas-2 with a **periwinkle** 20px
  numeral, and the numerals are `aria-hidden` inside a real `<ol>` — the same
  treatment the domain pages' Methode gives them.
- **Its card is sticky at `lg`**, on the user's instruction — Figma draws it
  static, as it does the Principe one. At ~545 tall against the steps column's
  ~1075 it pins at 24px and rides the five steps past, then leaves with its row
  as the section ends. Verified: `sticky` and pinned at 24 at 1920, 1280 and
  1024, `static` at 900 and 375 where the columns stack. Section height
  unchanged at 1171.
- **Three of this page's sections now carry a sticky right column** — Principe
  (`xl`), Quand consulter (`lg`) and this one (`lg`). Figma names only the
  Quand consulter frame `sticky`; the other two were asked for. In all three
  `self-start` is the load-bearing class.
- **Comprendre le droit** measures **2238.7 against Figma's 2221**. Ten
  explainer cards on a **lilas-2** ground; every card is +3 to +4 taller than
  the comp's (the `Card` border plus line rounding), which accumulates to +14
  by the fifth row and is the whole of the section's +17.7.
- **Detect card boxes, not ink bands, when a grid's cards do not line up.** The
  ink-band profile went badly out of step here because the two columns break at
  different heights; scanning one column at an x **inside the card but left of
  its 28px padding** gives clean card tops and heights, and lines up 10 for 10.
- **Figma calls the block `masonry` but does not behave like one**: its rows
  are aligned, so every row is as tall as its taller card and a short card
  leaves a hole beneath it. **Built as real masonry on the user's
  instruction** — two independent columns, each a flex stack packing upward on
  the same 24px gap, cards alternating left/right by index so the placement
  still matches the comp. A `grid-cols-2` cannot do this; the horizontal gap
  stays the grid's, so both columns are still Figma's 610 (610.5 measured).
  That closes every hole and takes the section to **2188.3 against the comp's
  2221** — under it now, which is the point.
  Below `lg` the two stacks follow one another, so the reading order there is
  the odd cards then the even ones; DOM order and visual order still agree, so
  no `order` trickery and no screen-reader mismatch.
- **Only the first card carries Figma's `0px 14px 34px` shadow**, checked by
  sampling four pixels below every one of the ten: the other nine sit on flat
  lilas-2. That is the designer showing `Card`'s hover state for the **fifth**
  time, so it is not reproduced statically. Its blur is 34 against `Card`'s 17,
  the same outlier the home Actus grid has.
- **Its tag chips are tinted per card, and the pattern is not derivable from
  the index.** Four grounds cycling and five text colours, sampled card by
  card: pale-gold/brique, pink-soft/40 + red, pale-mint/result-green,
  pale-blue/periwinkle — and `plateformes` is the odd one, the same pale-mint
  ground as `garanties` but **mint** copy. Carried as a `chip` key per note,
  like the redesigned home Expertises tiles.
- **`--color-pink-soft` (#f0d5dd) is new, and it was asked about — because
  Figma gives it the same library name as an existing token with a different
  hex.** The chip fill is literally `rgba(240,213,221,0.4)` and the style list
  calls it "Petroff/Pink", but `--color-pink` is already #fac5ef from the
  Expertises tiles. Repointing that token would have silently recoloured a page
  whose frame has not changed — the shape of the shared-asset leak this build
  already had to undo — so both are kept until the designer says which the name
  should carry. **Watch for this: a Figma style name is not a stable key.**
- Note `get_variable_defs` on the masonry reported Petroff/Pink as **#DBB9C1**
  while `get_design_context` on a card gave `rgba(240,213,221,0.4)` and named
  it #F0D5DD. The literal CSS is the one to trust; #DBB9C1 is that colour
  already composited. Third time this tool family has disagreed with itself
  about a fill.
- Its chip is 12/4 where the Vitrine's type pill is 11/3, so it is a variant of
  its own — the site's **seventh** pill. Its "Parler à un avocat →" is
  periwinkle `text-button`, with the arrow in a `gap-2` span as everywhere else.
- **FAQ** measures **858.4 against Figma's 844**, and the whole 14.4 is the
  seven accordion rows' 2px borders — the offsets accumulate +1, +2, +4, +6,
  +8, +10, +12, +14 straight down. 12 ink bands in both.
- **Its questions are Poppins SemiBold 20 (`text-h3`)**, where both domain
  pages' are Inter 18 (`text-body-strong`). **Check the style before copying
  one FAQ onto another** — everything else about the row is identical.
- Behaviour verified by driving it: seven native `<details>` sharing a `name`,
  the first open as the comp draws it, closed answers failing
  `checkVisibility()`, clicking the third closing the first, summaries
  tabbable, and the marker resolving to `rotate: 90deg` when open (read
  `rotate`, not `transform` — Tailwind v4 rotates via the standalone property).
- **Only one new asset.** The laurel's path data is an **exact** match for
  `laurel-branch-mint.svg` — the variant the redesigned home hero introduced,
  now used by a second page — and the sparkle is an exact 1.15x of
  `sparkle.svg`, which carries no strokes, so both reuse. Only
  `paris-rooftops-scene.svg` (313x400.64, 264 paths) is new; it is a different
  drawing from both `paris-scene.svg` and `la-defense-scene.svg`.
- Nineteen of that scene's fills have no token — roof slates, stonework,
  terracotta chimneys — and stay **raw hex**, the same call `paris-scene.svg`
  makes for its shading fills. Everything that is a token is mapped, and the
  file says so in a comment.
- **Figma's band overflows again**: 820 + 48 + 383 = 1251 inside 1245, so the
  list flexes and the illustration lands **exactly 6px left** of the comp
  (right edge 1740 against 1746, top identical at 92) — the same difference the
  Contrats FAQ records. Its palette matches count for count: mint 3048 against
  3065, gold 2553 against 2557, pale-periwinkle 602 against 603.
- Its `rounded-t-full` resolves to exactly Figma's 156.5 for a 313 box, as on
  the domain pages; the laurel bleeds past the 383 box, so the section is
  `overflow-hidden`.
- **Six of its seven answers are drafts, not Figma copy** — Figma supplies only
  the first. They were composed strictly from facts already stated elsewhere on
  this page (the 66-5 secret professionnel stat, the ordonnance n° 2026-2, the
  DGCCRF forfait's three steps, the convention d'honoraires, the Pack CGV's
  1 490 € entry point). No new figures or legal claims. **That takes the
  sign-off list from sixteen drafted answers to twenty-two.**
- **Interlocuteurs is the article's section, duplicated.** Every value matches:
  the 80px top-left corner on card and portrait, the red angle rule, the
  periwinkle languages line, the lilas chips, both CTAs, and the
  `0px 14px 34px` shadow on the **first card only** — checked below both cards'
  edges here too, so it is the hover state again. The portrait export diffs
  against the stored `lawyer-portrait-card.jpg` at **1.09/255**, so no new
  assets at all. Measures **1002.4 against 996**, card boxes at 256/296 and
  590/315 against 256/294 and 588/311 — the border, twice.
- **One real difference: this section takes top padding as well as bottom.**
  Figma puts its overline at y=96 where the article's sits at y=0.
- Its copy is **character-identical** to the article's, angle notes included, so
  everything but the angle moved to a shared top-level **`Interlocuteurs`**
  namespace — the fourth after `ContactCta`, `Transparence` and `Consultation`.
  Each page keeps only `angle.<lawyer>`. Verified after the move: the article's
  section still measures **906.4** and neither page shows a missing key.
- **Its angle notes are today the article's verbatim** — "Sur cette fiche : le
  choix du niveau de signature, la convention de preuve…", which is the
  signature électronique article's subject, not e-commerce. That is the
  duplicated-frame leftover this page's heading note warns about; keeping
  `angle` per page is exactly what lets the designer rewrite one without
  touching the other. **Flag it — it is wrong content, faithfully built.**
- **ALireEnsuite is the closest match on this page: 818.23 against Figma's
  818.** 12 ink bands in both, every one within 2px, and the palette matching
  count for count (pale-periwinkle 15434 against 16047, pale-blue 4747 against
  4936, pale-gold 1352 against 1406).
- **Bottom padding only** — Figma puts its overline at y=0, the shape this
  page's Interlocuteurs and the home CTAFinal also have. Its head is written
  out: 10px under the overline, 14px under the title.
- Its pills are the **Vitrine's data-driven type pill reused exactly** — pale
  gold for a guide, pale blue for a fiche, domain always pale periwinkle, all
  at 11/3 — so no eighth variant. Its dot row is the home Actus row verbatim
  (30x9 periwinkle pill, two `encre/20` 9px circles, 12px apart) and is
  `aria-hidden`, since three cards are all on screen at once.
- Three photos at 1197x672, 3x the 399x224 box. **`card-payment-laptop-wide.jpg`
  is a second crop of the source Notre rôle already uses** — the two exports
  diff at **0.00** — so it ships as its own file under the
  `glass-meeting-room-wide` precedent rather than being re-derived from the
  tall crop. `laptop-by-column.jpg` and `card-and-coffee-laptop.jpg` are new;
  only the first takes a Figma placement (118.76% height, top −18.8%).
- **Transparence is the article's band, duplicated** — and this page is now the
  **third** user of the shared top-level `Transparence` namespace, after the
  article and the Bibliotheque hub. Every value matches the article's: white
  ground, gold overline, encre title, encre/62 sources, a full-encre
  disclaimer, the closing `Signalez-la-nous.` in rose, the 1100 column at
  x=360, the head capped at 784 with 8/8 gaps, 20px block gaps and 72/52
  padding. No assets, no new tokens.
- Measures **370.5 against 370**, 7 ink bands in both within 2px, and both
  paragraphs wrap at the same word (extents 361-1441 against 361-1439 and
  361-1435 against 361-1432) — the same numbers the article's records.
- **One difference: this frame uppercases the overline in the style.** That is
  why one shared string renders `Sources & transparence` on the article and
  `SOURCES & TRANSPARENCE` here. Confirmed after the build that the other two
  blocks are untouched — the article's still 370.5 on white with
  `text-transform: none`, the hub's still 341.4 on encre.
- **This page uppercases every overline in the style; the article page
  uppercases none.** That is a per-page rule, not a per-string one, so the same
  shared copy is correct in both places.
- **CTAFinal is the site's seventh closing panel, and the tightest match on the
  page: 550.36 against 550**, with four of its five ink bands at **Δ0** and
  both ornaments landing exactly (parcel 377,358→451,453 identical; globe
  1485,96→1582,175 against 1581,175). Palette matches count for count.
- **It takes top padding as well as bottom** — Figma puts its panel at y=96,
  because the Transparence band above closes with only 52. Building it
  bottom-only put every band a constant **−96** out and the section at 454
  against 550; that constant offset is the signature of a missing pad.
- Only its title is this page's own; the overline, lead, phone line and both
  button labels come from `ContactCta` and its `ask` pair — the same split the
  article's and the hub's panels make. **Figma's title reads "ne rentre pas
  dans dans nos services" — a doubled word.** Corrected here and flagged, the
  same call the `Gratitut` typo got.
- Two new ornaments, `parcel-box.svg` (213x201) and `globe-paper-plane.svg`
  (153x136); every fill mapped to an existing token. The globe is pinned to the
  panel's **right** edge rather than to Figma's `left: 1134.5px`, so it holds
  its inset as the panel narrows — the article panel's treatment.
- **The side tab is the home page's, unchanged.** `13331:11356` is red
  `#f01a5d` with the same speech-bubble icon and "Consulter un avocat", so the
  home wrapper moved from `sections/Consultation.tsx` to
  **`components/consultation/Consultation.tsx`** and both pages import it.
  Verified on both after the move: tab exactly **45x236** flush right and
  `rgb(240,26,93)`, the drawer opening at 510, focus landing on the Nom field,
  `body` locking and restoring, Escape closing.
- Figma draws **no sticky bar and no drawer frame** for this page — only the
  tab — exactly as the home frame does; the drawer is the shared component.

### Page 7 complete — thirteen sections and the side tab

| Section | Figma | Rendered | Δ |
|---|---|---|---|
| Hero | 1104 | 1103.8 | −0.2 |
| Principe + intro | 1197 | 1198.7 | +1.7 |
| Notre rôle | 1155 | 1160.5 | +5.5 |
| Quand consulter | 944 | 946.2 | +2.2 |
| Comment nous aidons | 4726 | 4784.4 | +58.4 |
| Forfaits | 988 | 993.1 | +5.1 |
| Comment ça marche | 1159 | 1171.0 | +12.0 |
| Comprendre le droit | 2221 | 2188.3 | −32.7 * |
| FAQ | 844 | 858.4 | +14.4 |
| Interlocuteurs | 996 | 1002.4 | +6.4 |
| ALireEnsuite | 818 | 818.2 | +0.2 |
| Transparence | 370 | 370.5 | +0.5 |
| CTAFinal | 550 | 550.4 | +0.4 |
| **Sections** | **17072** | **17145.9** | **+73.9 (0.43%)** |

\* Comprendre le droit is **under** the comp because its two columns pack as
real masonry rather than in aligned rows — a deliberate deviation, asked for.

Every delta is the border-box difference; the two largest (Comment nous aidons,
Comprendre le droit) are twelve and ten card borders respectively. **Note the
page frame still reads 17207, which is stale** — it was not resized when
Comment nous aidons grew from 4432 to 4726, so compare section by section
rather than against the frame total.

No horizontal overflow at any of twelve widths from 1920 down to 320.



## Page 9 — service-page (`/expertises/contentieux-arbitrage/service-page`), frame `13445:16534`

1920x**17105**, named "Petroff.law — Service page" — the first **service**
page: a level below a domain, not a domain itself. Its crumb reads
*Accueil · Expertises · Contentieux & arbitrage · Litiges entre associés*,
which is where the route's parent comes from.

**Its subject is "Litige entre associés", but the route and the nav label are
`service-page`** — asked for. It is one page of design for a service template
rather than a real service route, exactly as `article-design` and
`new-article-page` are. Its sections live in `src/components/sections/service/`
and its copy under the **`ServicePage`** namespace.

**Its frame total is stale.** The footer ends at **17401.3**, 296 past the
declared 17105, so compare section by section — the same situation the
e-commerce frame is in.

**Do not go by the layer names.** The frame reuses them: three separate
sections are called `Domaines`, two `Comprendre le droit` and two `FAQ`. Read
each section's first text nodes instead — `get_metadata` names text nodes by
their content, so one saved metadata file gives the whole map for free.

| # | Section | Node ID | Figma h | Subject | Status |
|---|---|---|---|---|---|
| 1 | Hero | `13445:16587` | 816 | crumb + headline row | done |
| 2 | Trust | `13445:26850` | 100 | three claims | done |
| 3 | Domaines | `13445:28048` | 1712 | Quand faire appel à un avocat | done |
| 4 | Principe + intro | `13445:20731` | 1695 | Ce que comprend la mission | done |
| 5 | Notre rôle | `13445:21438` | 1210 | Comment nous procédons | done |
| 6 | Prestations | `13445:21585` | 951 | Ce que nous devons analyser | done |
| 7 | FAQ | `13495:28614` | 628 | De l'analyse à la résolution | done |
| 8 | Forfaits | `13445:17231` | 1104 | Tarifs transparents | done |
| 9 | Comprendre le droit | `13445:17363` | 2241 | Ce que le droit français donne | done |
| 10 | MidCTA | `13445:23733` | 136 | Faites évaluer votre situation | done |
| 11 | Comprendre le droit | `13445:23789` | 825 | À retenir — l'essentiel en six points | done |
| 12 | FAQ | `13445:17452` | 940 | Questions fréquentes | done |
| 13 | Domaines | `13445:24956` | 785 | Aller plus loin | done |
| 14 | Interlocuteurs | `13445:26666` | 1178.3 | Vos interlocuteurs | done |
| 15 | Domaines | `13445:24999` | 950 | Thèmes liés | done |
| 16 | ALireEnsuite | `13445:17883` | 781 | Dans la bibliothèque | done |
| 17 | Transparence | `13445:17935` | 370 | Sources & transparence | done |
| 18 | CTAFinal | `13445:17943` | 550 | Contact | done |
| + | sidetab | `13445:18026` | 45x236 | | done |

- **Reachable from the Expertises submenu**, which now carries three entries.
  A service page sits a level below a domain, but `NavChild` is a flat list, so
  it is **appended after the domains** rather than nested — `expertiseChildren`
  is now the live domains plus an explicit list, the same shape
  `bibliothequeChildren` already had. Verified by opening the dropdown:
  Contrats, Contentieux, then **service-page**.

- **Renaming the route corrupted a Next manifest, and it read exactly like the
  wedged dev server this file already records** — every route 500, including
  ones the change cannot touch. It was not the same fault, and the fix is not
  the same either. The error was
  `SyntaxError: Unexpected non-whitespace character after JSON at position 750
  (line 1 column 751)` with no file named. **`line 1` is the clue**: no JSON in
  the repo is single-line, so the culprit was generated. Scanning `.next` for
  one-line JSON that fails to parse named it in one command —
  `.next/dev/prerender-manifest.json`, 944 bytes holding a complete 750-byte
  document followed by the tail of a longer one. Two writers had raced: the old
  `next dev` was still shutting down when the new one started.
  The fix is the documented one plus patience — kill **every** process holding
  port 3000, wait, `rm -rf .next`, then start a single server and let it reach
  Ready before touching it. **When a 500 names no file of yours, scan the
  generated manifests before reading your own diff.**

#### Hero (`13445:16587`) — built, 819.3 against 816

Two bands, the new article hero's construction: a 62px lilas crumb, then a
754px `HeroFiche` centring a 1245 grid at **y=56** — a 679 copy column beside a
539 photo stage on a 36px gap. The column measures 642, so the band closes a
symmetric 56 below.

- Measured, all HeroFiche-relative: row/column/stage at **56**, overline 56,
  title **92.8**, marker **(605, 135) 271x15** — all four exact — lead 220.8,
  checks 368.8, CTA row 575.9 against 576, verif 653.1 against 651, photo
  **470x548** with radii `200px 10px 100px 60px`, hero card at **499** at
  213.3 wide, badge box at **115** at 108.5. The +3.3 on the section is the
  outline `Button`'s 1.5px border plus line rounding.
- **Figma's own row is 1254 inside its 1245 grid.** The stage is sized by the
  badge's right edge (430.53 + 108.47 = 539), not by the photo (28.53 + 470 =
  498.53), so the badge pokes 9px past the container. The copy column flexes
  here and takes 670, which puts the badge flush with the container instead —
  everything in the stage therefore sits 9px left of the comp, and nothing
  overflows. Same shape as the new article hero's 553 stage.
- **The overline needed `xl:whitespace-nowrap`, and only measuring found it.**
  Uppercase at 0.18em the string needs ~693 against a 679 measure, so Figma
  nowraps it and lets it overflow its own column; the build wrapped it to two
  lines, which pushed **every** band below it down 20.8px — including the
  marker, which was still correct *relative to its title*. A marker that
  measures right against its own box can still be in the wrong place on the
  page.
- **`calendar-dots-bold.svg` is a fork, not a reuse**, and the path check alone
  would have said reuse: its geometry is `calendar-dots.svg` at an exact 40/46
  (max deviation 0.0017 across 222 numbers) — but its periwinkle band is
  `stroke-width` **8** where that file carries **2.45**. Rendering the 46px
  file at 40 draws a 2.13px band against Figma's 8, which is nothing like the
  magnifier's 0.7px or the Cabinet icons' 0.16px. Rendered both to be sure: one
  band is thick, the other thin. **Compare stroke-width, not just path data.**
- `seal-ribbon.svg` **is** reused — the export is an exact **1.2x** uniform
  scale (max deviation 0.0022) and its stroke stays 1.52174 in both, so the
  rendered stroke over-thickens by 0.3px on a 36px glyph. That is the
  magnifier/Cabinet case, not the `open-book-lg` case.
- `litige-associes-hero.jpg` is new: Figma places a 4096x1537 source at 310.72%
  width with a -125.09% offset, which resolves to a **uniform** crop of source
  x 1649-2967 at full height. Stored at its native **1318x1537**, i.e. 2.8x the
  470x548 box rather than the usual 3x — the source has no more pixels.
- **Two comp slips to flag**, both stored corrected: the overline reads
  `à PariS` in the text node (a stray capital), and the CTAFinal title carries
  the same doubled `dans dans` the e-commerce panel does.
- Its checks reserve **64px** at the right of each row, so the text wraps
  before the column's edge rather than at it. Its two CTAs sit on a **9px**
  gap, not the usual 16.
- No horizontal overflow at any of nine widths from 1920 down to 320.

#### Trust (`13445:26850`) — built, **100 exactly**

A lilas-2 band under the hero: three claims on a 96px gap, each a 10px gold
dot beside a `text-h3` label, the row centred across the full width.

- **Its frame declares `py-24` and that is a minimum, not the padding.** The
  frame is a fixed 100 and Figma centres the 26px items inside it, so the real
  vertical padding is **37**. Building the declared 24 makes the band 74. The
  metadata's item `y=37` is what settles it — **read a fixed frame's child
  offsets, not its declared padding**.
- Unlike the e-commerce trust strip this row **fits**: its three items span 995
  inside the 1245 container, so it needs no full-bleed escape — only the band
  itself painting the full width. That page's four claims needed 1430 and had
  to leave `Container` altogether.
- Its dot is a `bg-gold size-2.5 rounded-full` span, not a file — Figma exports
  a 10px SVG circle, the same call the e-commerce trust dot got.
- Figma types an **ordinary space** in `Réponse sous 48 h`, where every other
  unit gap in the catalogue uses a thin space (U+2009) — `ContentieuxPage`'s own
  `48 h` included. Stored with the thin space, the same deliberate deviation
  the apostrophes take.
- Measured: section **100**, items at **y=37** and 26 tall, dot 10x10 at y=45
  in gold, label Poppins 600 20/26. Before the change the three items landed
  within **1.3px** of their Figma x (463.8 / 766.4 / 1094.5 against 462.5 /
  766.5 / 1095.5) on a 96px gap.
- **Justified rather than centred, asked for.** Figma centres the row on a
  fixed 96px gap, which leaves ~125 of slack either side of the 1245 band; the
  row now sits inside `Container` with `lg:justify-between`, so the first claim
  starts at **337.5** and the last ends at **1582.5** — the container's own
  edges — with even 222px gaps. Section still 100 and items still at y=37. A
  deliberate departure from the comp. Below `lg` the row can wrap, where
  `justify-between` would strand a lone item on the last line, so it stays
  centred on a real gap until then.

**A new headless Chrome shifted every measurement 7.5px, and it looked like a
layout fault.** This one paints a 15px scrollbar where the previous instance
did not, so `document.documentElement.clientWidth` is **1905** against a 1920
emulation and every centred element moves half of that. The hero's container
read 330 instead of the 337.5 recorded an hour earlier. Fixed in the harness,
not the code: `cdp.mjs` and `sect.mjs` now send
**`Emulation.setScrollbarsHidden { hidden: true }`** after the metrics
override. **Check `clientWidth` equals the width you emulated before believing
a systematic offset.**

#### Quand faire appel (`13445:28048`) — built, 1720.7 against 1712

A 470 photo column beside a 679 list of nine situations. Every band is Figma's
own number: overline **96**, title 132.8, lead 194.8 at **1000** wide, row
293.2, photo **470x548** with radii `200px 10px 100px 60px`, the angle note
**470x124 at column y=584**, the button 224.4x51.2 right-aligned at x=245, and
all nine rows with row 1 at **125.5 against 125**. The +8.7 is the nine row
borders.

- **The row takes no gap.** 470 + 679 is 1149 inside the 1245 container, which
  `justify-between` spaces by exactly **96** — the fourth section on this build
  to hit that, after the Bibliotheque hero and both FAQ bands.
- **Figma draws all nine icons as SF Symbols placeholders** — `dollarsign`,
  `text.justify.left`, `arrow.up`, `text.document`, `person`, `building.2`,
  `rectangle.portrait.and.arrow.right`, `bag`, `checkmark.shield` — so the comp
  exports **no artwork at all** for them and the designer has not chosen real
  ones. Each is mapped to the nearest glyph already in the library (`percent`,
  `file-lines`, `trending-up`, `document`, `person`, `office-building`,
  `people-dispute`, `briefcase`, `shield-check`), all 26px `currentColor` line
  icons at stroke 1.95 rendered at 24 — the documented 24/26. **No new assets,
  but this needs the designer's own choices before launch.**
- **The angle note is full width, not right-aligned.** Its frame is the whole
  470 with the text at x=16, so the 3px red border sits *inside* that 16 —
  `pl-3.25` lands the text on 454 where `pl-4` gives 451. Building it
  right-aligned like the button put it at x=353.5; only the metadata's own
  `x=0, width=470` settles it. **`items-end` on a column moves only the
  children that are not full width.**
- Its first row's inner gap is **12** where the other eight are **8** —
  reproduced per row and flagged, the same call the Contrats `transparence`
  card's 8px gap got. Almost certainly a slip.
- Its `<b>` runs are Inter SemiBold 18/1.5 inside an 18/1.4 paragraph, which is
  exactly `text-body-strong`; no `font-inter` needed, since the parent is Inter
  already.
- `associes-walking.jpg` is new — a uniform crop of a 4096x2730 source
  (Figma places it at 174.87% width with a -15.99% offset), stored at 1410x1644,
  3x the box.
- **Its left column is sticky from `lg`**, on the user's instruction — Figma
  draws it static, as it does the three e-commerce cards. At 795 against the
  list's 1332 it pins at 24 and rides roughly 800px of the nine situations,
  then leaves with its row as the section ends. Verified: `sticky` and pinned
  at 24 at 1920 and 1280, `static` at 900 and 375 where the columns stack;
  section height unchanged at 1720.7.
- That makes **four sticky columns on the build** — the three on the
  e-commerce page and this one. `self-start` is the load-bearing class in all
  four.
- No horizontal overflow at any of nine widths.

#### Mission (`13445:20731`) — built, 1705.2 against 1695

A 679 intro column beside a 470 encre card, on a lilas ground. **The row takes
no gap** — 679 + 470 is 1149 inside 1245, which `justify-between` spaces by
exactly 96, the same arithmetic as the section above. It splits at **`xl`**,
not `lg`: at 1024 the container leaves the column 418 against a 450 panel.

- Measured: row/column/card at **96**, card **470 at x=1112.5** exact, panel
  **450x414 at x=566.5** exact with radii `200px 10px 100px 60px` in lilas-2,
  head at **546** (187.2 against 187), list at **769.2**, button 361.1 against
  362, six rows at 94.5 / 119.7 against Figma's 93 / 118, numerals resolving to
  Poppins 40 in pale-periwinkle. The +10.2 on the section is the six row
  borders.
- **The polaroid's bounding box lands exactly** — `176.7x220.9 at (431, 283.9)`
  against Figma's 176.653x220.910 at (93.5, 187.876). Its 176.653 is the
  *rotated* box of a **150x202 card at -8deg** (150·cos8 + 202·sin8 = 176.66),
  so the untransformed card sits at 106.83/197.33 — the same
  centre-of-rotation correction the Bibliotheque polaroid needed.
- Figma names the right-hand frame **`sticky`**, so it is, from `xl`. Verified:
  pinned at 24 at 1920 and 1280, `static` at 900 and 375.
- Its card title is Poppins Bold **30** — Figma's own "Petroff/Price" style, so
  `text-price`, not `text-h2`.

**Two asset lessons, both new.**

1. **`download_assets` is the way to export a node `get_design_context` will
   not return.** This scene is ~200 nodes, so both `get_design_context` and a
   call on its mask group returned only sparse metadata. `download_assets` with
   `defaultFormat: "svg"` exports the whole group as one 103KB file in a single
   call. That is the tool to reach for whenever a composed illustration is too
   large to read — it replaces the piece-by-piece `mask-position` composition
   `paris-skyline.svg` needed.
2. **It bakes every ancestor frame background into the export as a painted
   rect.** This one arrived with a 571x387 canvas rect, the **1920x17105 page
   frame** and a 1920x1695 section rect in front of the artwork, which painted
   the panel white and hid its lilas-2 ground. Strip the leading rects. The
   white rects that remain are inside `clipPath` and are inert — the same
   distinction `columned-building.svg` already records.

- **Keep angle brackets out of an SVG comment.** A note describing the stripped
  `rect`/`clipPath` elements rendered as **visible text across the page**:
  SVGR does not treat a comment containing them as a comment. Describe such
  elements in words.
- `paris-rooftops-wide.svg` is the site's **third composed Paris scene**, after
  `paris-skyline.svg` and `paris-skyline-ecommerce.svg`. Same artwork family as
  `paris-rooftops-scene.svg` (the e-commerce FAQ arch) but a different
  composition — the rooftop block repeated twice to fill a 450x414 panel. Every
  tokened fill is mapped; roof slates, stonework and terracotta chimneys stay
  raw hex, as that file's do.
- `lawyer-portrait-polaroid.jpg` is a new 360 square crop of the portrait
  source: it diffs at **17.76** against `lawyer-portrait-tall.jpg` with the
  next candidate at 36.7 — same person, different window, so a second file
  under the `glass-meeting-room-wide` precedent.
- **One overflow, caught by the sweep**: its gold CTA is 361px of label against
  a 335 content box at 375. `w-full whitespace-normal sm:w-auto
  sm:whitespace-nowrap` — `Button` sets `whitespace-nowrap` in its base class,
  so it must be overridden, not omitted. Clean at nine widths after.

#### Comment nous procédons (`13445:21438`) — built, 1220.4 against 1210

A 470 photo beside a 679 column on a **96px gap**. Note Figma *states* the 96
here rather than leaving `justify-between` to produce it, as the two sections
above do — the sum is the same 1245 either way. Splits at `xl`: at 1024 the
column would be 418.

- Measured: row and photo at **96**, photo **470x548 at x=337.5** with radii
  `200px 10px 100px 60px`, column **679 at x=903.5** (so the gap is exactly
  96), head **187.2 against 187**, list 319.2, button 204.6x51.2. Section
  +10.4 — six row borders plus line-box rounding, ~1.7 a row.
- **Its six rows carry no gap of their own**; each closes on its own `encre/10`
  rule, so they sit flush. That differs from the section above, whose rows are
  on a 16px gap — check each.
- Its bullet is a **12px gold circle Figma draws at cy=12 inside a 12.5x18
  box**, i.e. 6px down, level with the title's first line. Built as
  `mt-1.5 size-3 bg-gold rounded-full` and measured at exactly (x, y+24) —
  a span, not a file, as the e-commerce bullets are.
- `associee-tablet.jpg` is new: a uniform crop of a 4096x2730 source (174.68%
  width, -15.18% offset), stored 1410x1644.
- No new tokens, no new strings beyond its own. No horizontal overflow at any
  of nine widths.

#### Ce qu'il nous faut (`13445:21585`) — built, 952.7 against 951

Four document families split by dashed rules, then a 610 photo beside a closing
block. **The section carries no fill of its own**, so it sits on the page's
lilas — confirmed by sampling the node render, not assumed.

- Measured: head **116 at y=96** (Figma's own 116), row at **260**, bottom at
  **543.9**, all four columns **256.5** wide at their exact Figma x, photo
  **610x280 at x=337.5** with radii `120px 10px 60px 20px`, and the closing
  column starting at **1011.5** — i.e. the 64px gap exactly.
- **The row measures 235.9 against the rule SVG's own 235**, which is the
  cheapest confirmation that the four columns' content height matches the comp:
  Figma sizes that divider to the row, so its height *is* the row's.
- **The dividers are dashed, not solid** — `stroke-dasharray="2 2"` at
  `encre/10`, the same `2 2` the e-commerce Comment ça marche rows use. Built
  as `border-l border-dashed`, and each is its own flex item in Figma, so the
  visual space around it is 36 either side rather than 36 total.
- Its four tile tints are **pale-blue / pale-gold / pale-mint / pink-soft at
  40%** — the four-tint set again, and the third page to draw that pink as
  `#EFCFD9` at 40%.
- **Four more SF Symbols placeholders** — `text.document`, `menucard`,
  `chart.line.uptrend.xyaxis`, `clock`, at 22px. Mapped to `document`,
  `file-lines`, `trending-up` and `clock` and rendered at their native 26,
  which is what every other 52px tile on the site carries. That is now
  **thirteen placeholder icons on this page** awaiting the designer.
- Its closing block has **no overline** — Figma gives it a title and lead only.
- `associe-laptop-columns.jpg` is new: a uniform full-width crop, stored
  1830x840, 3x the box.
- No horizontal overflow at any of nine widths.

#### De l'analyse à la résolution (`13495:28614`) — built, **628.2 against 628**

**Its layer name is `FAQ` and it is not one** — a text block beside the Paris
skyline. Its node id is in the **`13495:` range** against the frame's `13445:`,
so it was added after the rest of the page; the same out-of-range tell the
Resultats meta row and the Bibliotheque Transparence column carried.

- Measured: lilas-2 ground, row and column at **96**, column **679**, stage
  **511 at x=1064.5** — so the gap is exactly **48** and the pair uses 1238 of
  the 1245, leaving Figma's own 7px at the right. Head 78.8, lead 198.8, verif
  408.8, button 481; panel **450x414 at stage x=61** in pale blue with radii
  `200px 10px 100px 60px`; polaroid bounding box at stage **(0, 122)** exactly.
- Its lead is **`text-lead` in full-strength encre** — 20/1.55, not the
  encre/62 body every other section uses.
- **No new assets at all**, and two of the three checks were worth running:
  - **The skyline is `paris-skyline.svg`.** Its eight mask pieces compare badly
    by path string, because each is exported at its own origin where the stored
    file has them translated to their mask-positions — 0 to 6 shared paths out
    of 14. Rendering settles it: the node's own 450x414 screenshot diffs
    against the stored file at **7.28 mean with 1.31% of pixels over 20**, i.e.
    two renderers' antialiasing. **Render composed scenes; never compare their
    piece strings.**
  - **The verif glyph is `pen-nib.svg` at a fourth box** — 24x36 against its
    110x153 native. Axis-aware deviation **0.0017** at a non-uniform
    (0.2182, 0.2353), same five fills in the same order, and the glyph carries
    no strokes, so the stretch is exact. Its boxes are now 110x153, 103.125x150,
    110x160 and 24x36.
  - Its polaroid print matches `lawyer-portrait-polaroid.jpg` at **1.1** — the
    square crop made for the Mission section one section earlier.
- **The whole stage is the Bibliotheque hero's illustration reused wholesale**:
  same 511 box, same 450x414 panel, same composed skyline, polaroid at the same
  13.36/131.46. It differs in exactly two things — the panel is **pale blue**
  here where that one is lilas-2, and the print is the square crop. Kept as its
  own markup, matching the per-page `HeroOrnaments` / `FaqIllustration`
  precedent, but it is the clearest candidate yet for a shared component.
- No horizontal overflow at any of nine widths.

#### Forfaits (`13445:17231`) — built, 1109.9 against 1104

**The site's fifth Forfaits, and the first that does not price its plans.**
There is no `text-price` anywhere: the figures sit inside each card's
description as a `text-body-strong` run ("À partir de 990 € HT", "Sur devis"),
so this block carries none of the price / unit / flash-line anatomy the four
others share. Two further differences: every plan carries a **brique
`text-body-strong` heading over its feature list**, and the closing footnote is
a **pale-gold panel at `rounded-note-lg`**, not the bare line the others use.

- Measured: head **116 at y=96** exact, grid at **260**, footnote at **905.7**,
  all three cards **401.7 at the site's standard 3-up x** (337.5 / 759.2 /
  1180.8) on a 20px gap, the featured card's 2px gold border with its permanent
  `0px 14px 17px` shadow, and the badge at card-relative **(22, -14)** exactly
  — `-top-4 left-5`, absorbing the 2px border, the same arithmetic the domain
  Forfaits use. The +5.9 is the card borders plus line rounding.
- **Its CTAs are deliberately not bottom-aligned**, for the fifth time on this
  build: the cards stretch to one height but each button sits right after its
  own feature list, so the four-feature plan's is highest — measured
  767.5 / 696.5 / 704.5. An `mt-auto` levelled them and had to come out.
- **A card cannot shrink below its widest nowrap child**, and that broke 320:
  the outline CTA is 259.9 plus 56 of padding and 2 of border, so every card
  measured **317.9** against a 280 box. The fix is the documented one on the
  button (`w-full whitespace-normal sm:w-auto sm:whitespace-nowrap`), with the
  card padding also stepping `px-5 py-7 sm:px-7 sm:py-9`. **The overflow scan
  named the card, not the button** — look at what inside it cannot shrink.
- No new assets, no new tokens.

#### Comprendre le droit (`13445:17363`) — built, 2248.3 against 2241

A 679 column of six levers beside the 470 card. **The row takes no gap** —
679 + 470 is 1149 inside 1245, which `justify-between` spaces by exactly 96,
the third section on this page built that way.

- Measured: lilas ground, row / column / card at **96**, card **470 at
  x=1112.5** (so the gap is exactly 96), head **187.2 against 187**, list at
  **319.2**, six rows flush with no gap between them, each closing on its own
  `encre/10` rule. The +7.3 is the six row borders plus rounding.
- **Each row closes on a tinted pill with encre copy**, not a `Button` variant,
  and the tints cycle **blue / pink-soft-40 / gold** across the six — verified
  colour by colour. The pill is 51.2 tall against Figma's h-51.
- Figma names the right frame **`sticky`** again, so it is, from `xl`.
  Verified: pinned at 24 at 1920 and 1280, `static` at 900 and 375. This card
  is the shortest relative to its column on the page — 478 against 2056 — so it
  rides almost the whole section.
- Its card repeats the Mission card exactly — encre, 20px corner, 36 padding,
  a `text-price` title at 369 and a gold CTA. Its overline text node is stored
  **uppercase** in Figma (`LE LIVRABLE`) where Mission's is mixed case; the
  site-wide rule applies, so both are stored mixed and uppercased in CSS.
- **A comp inconsistency to flag**: its lead says "**Dix** leviers" and the
  frame draws **six**. Left as written, like the `Gratitut` typo and the
  Resultats card's `Guide`/`Fiche` clash.
- No new assets, no new tokens. No horizontal overflow at any of nine widths.

#### MidCTA (`13445:23733`) — built, 138.2 against 136

A lilas-2 strip on **24px** of padding: a 661 copy column and a 450 phone
field, spaced by `justify-between` inside the 1245 band (which gives 134).

- **This is not the domain pages' MidCTA.** Those are one inline run and a
  button on an encre ground; this carries a real field on lilas-2, so it is
  closer to SearchBand. Do not port either onto the other.
- Measured: row at **24**, left column **661 at x=337.5**, right **450 at
  x=1132.5** (flush with the container's right edge), pill **450x61.2** at a
  36px radius with an `encre/10` border, note at **90.2**, button 199.7x43.2,
  flag **21x16 at x=1157.5** — i.e. Figma's 24px left padding plus the border.
  The +2.2 on the section is that border.
- `flag-fr.svg` is the one new asset. Its three fills are the **French flag's
  official colours** (#000091, white, #E1000F) and stay raw hex — a national
  flag is content, not brand colour, the same call `paris-scene.svg` makes for
  its shading. Its `clip0_0_4` id was renamed on import, per the collision rule.
- Its note glyph is another **SF Symbols `shield` placeholder**; mapped to
  `shield-check.svg` at 16. Fourteen placeholders on this page now.
- The field is inert and deliberately not in a `<form>`, like SearchBand, Tools
  and the OpenData lookup. Below `sm` the button drops under the field — at 375
  a flag, a placeholder and a 200px button cannot share one row.

#### L'essentiel en six points (`13445:23789`) — built, 827.4 against 825

A 470 photo beside a 711 column on a **stated 64px gap**. Measured: photo
**470x548 at x=337.5** with radii `200px 10px 100px 60px`, column **711 at
x=871.5** (so the gap is exactly 64), head **78.8**, box at **198.8** and 711
wide, its rows inset **28** at 655, bullet **9x27**, button at 680.2.

- **Its takeaways box carries a radius and 28 of padding but no fill**, so it
  reads as an inset column on the section's own lilas rather than as a panel —
  unlike both article pages' takeaways, which are tinted (pale-rose, then
  pink). Easy to miss and worth stating: `bg` computed `rgba(0,0,0,0)`.
- Its rows carry **no gap**; each has its own 10px padding, so consecutive
  points sit 20 apart.
- `bullet-mark-gold.svg` **reuses exactly** — same 9x27 viewBox and identical
  path data. (It and `bullet-mark.svg` differ only in fill, which is why the
  gold fork exists.) No new icons.
- `associes-grass-laptop.jpg` is new — a uniform crop stored 1410x1644. At q82
  it came out **406KB**, the largest photo on the site; re-encoded at q76 to
  366KB. Grass and foliage cost far more than the interiors elsewhere.
- **A second copy inconsistency, in the same section**: the section title says
  "L'essentiel en **six** points", the box title says "**Sept** points à
  retenir", and six bullets are drawn. The box title is the string the new
  article page's takeaways carries, so it looks like a paste. Kept as written
  and flagged, with "Dix leviers" from the section before it.

#### FAQ (`13445:17452`) — built, 979.9 against 940

Seven questions beside the arch illustration. Its questions are **Poppins
SemiBold 20** (`text-h3`), like the e-commerce FAQ and unlike both domain
pages' Inter 18. Two differences from the e-commerce twin: its summary takes
**no gap** between question and marker (the question box runs up to it, as on
the Contrats FAQ), and its answer is **full-strength encre**, not `encre/62`.

- **The +39.9 is fully accounted for and is mostly deliberate**: the answer cap
  costs one line (+25.2 — Figma runs it 5 lines at 772, the 640 measure gives
  6) and the seven row borders +14. Row 1 measures **219.1 against 219.2**
  before the cap is applied, so the row anatomy itself is exact.
- The documented **1251-in-1245 squeeze** again: 820 + 48 + 383, so the list
  flexes to **814** and the illustration sits **exactly 6px left** of the comp
  at x=1199.5, flush with the container's right edge.
- **All three illustration assets reuse, and the whole component is
  coordinate-for-coordinate the e-commerce one**: arch at (70.5, 8) 313x400,
  sparkle at (49, -4) 46, laurel at (421.5, 335.5) — which is what Figma's
  `inset-[76.25% -41.38% -10.34% 110.05%]` resolves to on the 383x440 box. The
  laurel matches `laurel-branch-mint.svg` to **0.0023**, the arch matches
  `paris-rooftops-scene.svg` to **0.004** at its native 313x400.64, and the
  sparkle is an exact **1.15x** of `sparkle.svg`. No new assets.
- **That is now four near-identical `FaqIllustration` components** — the two
  domain pages' (differing only by which laurel they import), e-commerce's and
  this one. Kept per-page to match the existing precedent, but the
  consolidation this file has flagged twice is overdue.
- Behaviour verified: seven native `<details>` sharing a `name`, the first open
  as the comp draws it, closed answers failing `checkVisibility()`, clicking
  the third closing the first, summaries tabbable, and the marker resolving to
  `rotate: 90deg` when open.
- **Only the first answer is Figma copy.** The other six were drafted strictly
  from facts already stated on this page — the six levers, the takeaways and
  the "Le temps joue" note. No new figures or legal claims. **That takes the
  sign-off list from twenty-two drafted answers to twenty-eight.**

#### Aller plus loin (`13445:24956`) — built, 787.9 against 785

Two lists of two on a **96px gap**, each row closing on its own `encre/10` rule
with no gap between rows — the same anatomy as "Comment nous procédons" and the
six levers.

- Measured: head **116 at y=96** exact, row at **260**, both columns **574.5**
  at x=337.5 and 1008 (so the gap is exactly 96), rows **166.4** against ~165,
  button at 640.7. The +2.9 is the row borders.
- **Read its items down each column, not across**: Figma splits them into two
  independent `vigil` lists, so the reading order is
  Constitution / Transformation, then Pacte / Preuve.
- Its row CTA is `text-body-strong` in **periwinkle** beside a second label in
  **brique** — and both are inert, since none of these service pages exist.
- **A fourth comp typo: all four rows read `Deivs`**, a transposition of
  *Devis*. Stored corrected and flagged, like `Gratitut` and the doubled
  `dans dans`.
- No new assets, no new tokens.

#### Interlocuteurs (`13445:26666`) — built, 1183.7 against 1178.3

**A third Interlocuteurs shape**, not the article's two stacked cards and not
the e-commerce copy of them: one **full-width lawcard** for Mariela, then a row
of **three partner cards** on a 96px gap. Do not port either of the others.

- Its head is written out — **10** under the overline, **14** under the title,
  then **44** to the grid — and its lead is Inter 16. Measured 96 / 126.8 /
  186.8 / 254.8, every one Figma's own number.
- Both card types share the same four radii (**80 / 18 / 60 / 18**), and the
  lawcard's portrait carries its own **80 / 4 / 20 / 20** at 200x240, placed at
  card-relative (29, 29) — 28 of padding plus the 1px border. The three partner
  photos take the site's asymmetric portrait set at `aspect-[244/140]`.
- Measured: lawcard **1245x298**, row at **600.8**, all three partner cards
  **351** at their exact Figma x (337.5 / 784.5 / 1231.5), so the gap is
  exactly 96. The +5.4 is the card borders.
- **The lawcard's `0px 14px 34px` shadow is the hover state** — the three
  partner cards below carry none, which is the test this file already records.
  It computes `none` at rest.
- Its head and Mariela's whole card are **character-identical to the shared
  top-level `Interlocuteurs` namespace**, so they are read from it; only the
  angle note and the three partners are this page's own.
- `lawyer-portrait-card.jpg` **reuses** for Mariela (diffs at **0.8**). Three
  new partner photos at 732x420, 3x the 244x140 box: `cochet-portrait.jpg`,
  `mehandzhiyska-portrait.jpg`, `bazin-portrait-wide.jpg`.
- **Two more comp leftovers to flag.** Its lead still reads "**Deux** avocats,
  deux angles" while the frame draws **four** people; and its angle note is
  once again the *signature électronique* article's verbatim ("le choix du
  niveau de signature…"), exactly as the e-commerce page's is. Wrong content,
  faithfully built.

#### Thèmes liés (`13445:24999`) — built, 954.3 against 950

**Structurally identical to "Aller plus loin" two sections earlier** — same
head, same two-column `vigil` lists on a 96px gap, same ruled rows, same
closing button. Only the labels differ: its rows read "Parler à un avocat →"
and "Lire l'article" where that one reads "En savoir plus →" and "Devis".

- **So the row markup was extracted rather than duplicated**, into
  `service/LinkRow.tsx`, and "Aller plus loin" was refactored onto it. Verified
  after the move: that section still measures **787.9** with its columns on the
  same x. This is the duplication this file keeps flagging elsewhere, caught
  while it was still two copies rather than four.
- Measured: head **116 at y=96**, row at **260**, both columns **574.5** at
  x=337.5 and 1008 (gap exactly 96), three rows of **166.4** each, button at
  807.1. The +4.3 is the six row borders.
- Read its items **down each column, not across**, as with "Aller plus loin".
- No new assets, no new tokens. No horizontal overflow at any of nine widths.

#### ALireEnsuite (`13445:17883`) — built, 783.4 against 781

**Bottom padding only** — Figma puts its overline at **y=0**, because Thèmes
liés above closes with its own 96. The same shape the e-commerce and article
blocks have.

- Measured: overline **0**, title 30.8, lead 90.8, grid **160** — the head's
  10 / 14 / 44 chain exactly — all three cards **399 at the site's standard
  3-up x** (337.5 / 760.5 / 1183.5) on a 24px gap, photos 224 tall, 18px
  corner, and the dot row at 678.4 with its dots on **924 / 966 / 987** at
  30x9 and 9x9 — the identical numbers the home Actus row measures.
- **All three photographs reuse the e-commerce ALireEnsuite crops** —
  `laptop-by-column` 1.08, `card-and-coffee-laptop` 0.88,
  `card-payment-laptop-wide` 1.27. No new assets.
- Its pills are the Vitrine's data-driven pair reused again: pale gold for a
  guide, pale blue for a fiche, domain always pale periwinkle, all at 11/3.
- **Its meta row is a third variant.** Figma gives it a **6px** gap here, where
  Resultats uses 8 and the Vitrine keeps one inline run — three spellings of
  the same row across the site. Check each.
- **Figma marks cards 2 and 3 `self-stretch` and leaves card 1 natural**, so
  the comp shows card 1 about 22px shorter. Read as an artefact rather than a
  design — every other card grid on the site levels — so all three stretch
  here. Flagged rather than silently followed.

#### Transparence (`13445:17935`) — built, 370.5 against 370

The article's band duplicated a fourth time, and the **fourth user of the
shared top-level `Transparence` namespace**. Every value matches: white ground,
gold overline, encre title, encre/62 sources, full-encre disclaimer, the
closing `Signalez-la-nous.` in rose, the 1100 column at x=360, the head capped
at **784** with 8/8 gaps and 20px block gaps.

- **Its column is pinned at `top: 72` in the export** — the article's original
  padding, *not* the 62.43 centring the new article page's frame uses. Two
  frames of the same block genuinely differ, and the section measures 370
  either way, so read the offset rather than inferring it from the height.
- Measured: column at **(360, 72)**, head 784x108, overline 72, title 100.8,
  sources 154.8, disclaimer 200 at 1100, note 270.4 at 1100.

#### CTAFinal (`13445:17943`) — built, 550.4 against 550

**The site's eighth closing panel, and a duplicate of the e-commerce one** —
same lilas-2 panel, same parcel and globe, same copy.

- Measured: panel **1245x358.4 at y=96** with a 28px corner, overline **64**,
  title 96.8, CTA row 243.2, and **both ornaments on their exact Figma
  coordinates** — the parcel **213x201 at (-68.5, 179)** and the globe
  **153x136 at (1134.5, -51)**.
- **Both ornaments reuse, and the path strings said otherwise.** `parcel-box`
  and `globe-paper-plane` compare as non-matching by string but their numbers
  agree to **0.002** at identical viewBoxes — a formatting difference only.
  Third time on this page that a string compare has been wrong about an asset.
- It takes **top padding as well as bottom**, because Transparence above closes
  with only 52.
- **Figma repeats the e-commerce panel's doubled `dans dans`.** Corrected here
  too.

#### The side tab (`13445:18026`)

The shared `Consultation` wrapper, unchanged and wired from the scaffold.
Measured **45x236** flush right, `rgb(240,26,93)`, radius `14px 0 0 14px`,
shadow `0px 10px 30px rgba(18,42,76,0.2)`. Behaviour driven: the drawer opens
at 510, focus lands on the Nom field, `body` overflow locks and restores,
Escape closes, the closed panel is `inert` and focus returns to the tab.

### Page 9 complete — eighteen sections plus the tab

| # | Section | Figma | Rendered | Δ |
|---|---|---|---|---|
| 1 | Hero | 816 | 819.3 | +3.3 |
| 2 | Trust | 100 | 100.0 | **0** |
| 3 | Quand faire appel | 1712 | 1720.7 | +8.7 |
| 4 | Mission | 1695 | 1705.2 | +10.2 |
| 5 | Comment nous procédons | 1210 | 1220.4 | +10.4 |
| 6 | Ce qu'il nous faut | 951 | 952.7 | +1.7 |
| 7 | De l'analyse à la résolution | 628 | 628.2 | +0.2 |
| 8 | Forfaits | 1104 | 1109.9 | +5.9 |
| 9 | Comprendre le droit | 2241 | 2248.3 | +7.3 |
| 10 | MidCTA | 136 | 138.2 | +2.2 |
| 11 | L'essentiel en six points | 825 | 827.4 | +2.4 |
| 12 | FAQ | 940 | 979.9 | +39.9 * |
| 13 | Aller plus loin | 785 | 787.9 | +2.9 |
| 14 | Interlocuteurs | 1178.3 | 1183.7 | +5.4 |
| 15 | Thèmes liés | 950 | 954.3 | +4.3 |
| 16 | ALireEnsuite | 781 | 783.4 | +2.4 |
| 17 | Transparence | 370 | 370.5 | +0.5 |
| 18 | CTAFinal | 550 | 550.4 | +0.4 |
| **Sections** | **16972.3** | **17080.4** | **+108.1 (0.64%)** |

Page **17511** at 1920. \* The FAQ's +39.9 is the deliberate answer cap (one
line) plus its seven row borders; every other delta is the border-box
difference. **No horizontal overflow at any of nine widths from 1920 to 320.**

**Assets added across the whole page: seven.** `calendar-dots-bold.svg` (a
fork — same geometry as `calendar-dots.svg` at 40/46 but stroke 8 against
2.45), `flag-fr.svg`, `paris-rooftops-wide.svg`, and four photographs
(`litige-associes-hero`, `associes-walking`, `associee-tablet`,
`associe-laptop-columns`, `associes-grass-laptop`, `lawyer-portrait-polaroid`
and the three partner portraits). Everything else matched something already in
the tree — including the whole Bibliotheque hero stage, the e-commerce FAQ
illustration, all three ALireEnsuite photographs and both CTAFinal ornaments.

**What this page taught, beyond the section notes:**

1. **`download_assets` with `defaultFormat: "svg"` exports what
   `get_design_context` will not return** — but it bakes every ancestor frame
   background in as a painted rect, which must be stripped.
2. **Compare rendered geometry, not path strings.** Three assets on this page
   (the skyline pieces, the parcel, the globe) compare as non-matching by
   string and are identical; one (`calendar-dots`) matches by path and is a
   genuine fork, because only its stroke-width differs.
3. **`Button`'s `whitespace-nowrap` broke four widths across four sections.**
   A card cannot shrink below its widest nowrap child, and the overflow scan
   names the *card*, not the button.
4. **Fourteen icons in this comp are SF Symbols placeholders** with no artwork
   exported. They are mapped to the nearest library glyphs and need the
   designer's own choices.

**Six comp slips to put to the designer**, all stored corrected or flagged:
`Deivs` for *Devis* (four rows), the doubled `dans dans`, `à PariS`, "**Dix**
leviers" over six, "**Sept** points à retenir" over six, "**Deux** avocats" over
four — plus the Interlocuteurs angle note, which is still the *signature
électronique* article's copy, exactly as the e-commerce page's is.
**Six more drafted FAQ answers** take the sign-off list to **twenty-eight**.

## Page 10 — personal-page (`/le-cabinet/personal-page`), frame `13495:29357`

1920x**6266**, named "Petroff.law — Personal page" — Mᵉ Mariela Petrova's
profile. Its crumb reads *Accueil · Le Cabinet · Mᵉ Mariela Petrova*, which is
where the route comes from.

**Its frame total is stale**, like the last two pages': the footer ends at
**4489**, not 6266. Compare section by section.

| # | Section | Node ID | Figma h | Subject | Status |
|---|---|---|---|---|---|
| 1 | Hero | `13495:30072` | 740 | crumb + profile row + stat band | done |
| 2 | Vitrine | `13495:29858` | 527 | En bref + Domaines d'intervention | done |
| 3 | Principe + intro | `13495:30380` | 830 | Parcours & qualifications | done |
| 4 | FAQ | `13544:33769` | 940 | Questions fréquentes | done |
| 5 | lawcard | `13544:34906` | 1021 | Contact — Parlez à Mariela Petrova | done |
| + | sidetab | `13495:29913` | 45x236 | | done |

Its sections live in `src/components/sections/personal/` and its copy under the
**`PersonalPage`** namespace.

- **Le Cabinet gains the site's third dropdown**, and it is the first whose own
  page does not exist. `NavMenu` linked its parent with a plain `Link`, which
  would have navigated to a 404 — it takes **`MaybeLink`** now, so the parent
  renders as a span while the child is a real link. Verified: the parent is a
  `SPAN`, the panel lists `personal-page`, and no header anchor points at
  `/le-cabinet`.
- **That third caret broke the header at exactly 1280, on every page.** The
  desktop nav appears at `xl`, where the container gives it 1216; with three
  dropdowns its content needs ~1237, so `documentElement.scrollWidth` read
  1281. Three header gaps now tighten by a total of 24 between `xl` and `2xl`
  and return to the Figma numbers at `2xl` — the header is pixel-specified at
  1920 and must not move there. Verified after: row still **1245 at x=337.5**,
  logo 148.8x36.4, header 73, and all ten routes clean at 1920 / 1280 / 375
  with every page height unchanged.

#### Hero (`13495:30072`) — built, **740 exactly**

Two bands: a 62px lilas crumb, then a 678 `HeroFiche` centring a 1245 grid at
**y=56** — a 414 hero row and a 123 stat band on a 30px gap — closing 55 below.

- **The row takes no gap.** 692 of copy plus the 511 stage is 1203 inside the
  1245 container, which `justify-between` spaces by exactly **42** — the same
  arithmetic the Bibliotheque hero uses.
- Measured, all fiche-relative: row at **56**, column **692** at x=337.5, stage
  **511** flush with the container's right edge, photo **450x414 at stage x=61**
  with radii `200px 10px 100px 60px`, hero card at stage **(0, 309)**, band at
  **500** and **123** tall with its three 280 columns at y=29 on a 20px gap.
  The copy column is `items-center` in the 414 row.
- Its title is Figma's own **Display H1** — Poppins Bold 68 on a 1.06 line box
  at -0.01em — so `text-display` matches exactly, resolving to 68px/72.08.
- **Two of its three assets reuse.** `seal-ribbon.svg` at 1.2x (deviation
  **0.0022**, the same box the service hero uses) and — the surprise —
  **`courthouse.svg` at a fourth box**, 55x40 against its 250x185 native:
  axis-aware deviation **0.0013** at a non-uniform (0.22, 0.2162), matching
  fills, and the glyph carries no strokes so the stretch is exact. Note it is
  the pale-periwinkle original, not the `-pale-blue` fork.
- `mariela-portrait-hero.jpg` is new — Figma paints the source at 138% width
  and 100% height, which is a 1% horizontal squeeze, so it is stored as a
  uniform crop of source x 0-2968 at 1350x1242, 3x the box.
- **The stat band needs 880** (three 280 columns plus their gaps), which the
  container cannot give until `lg`, so it stacks below that. At `sm` it
  overflowed to 852.

#### En bref (`13495:29858`) — built, 532.8 against 527

A 679 copy column beside a 470 list of practice areas. **The row takes no gap**
— 679 + 470 is 1149 inside 1245, which `justify-between` spaces by exactly 96 —
and the band is **`pt-64 pb-96`**, not a symmetric 96.

- Measured: row at **64**, column **679 at x=337.5**, list **470 at x=1112.5**
  (so the gap is exactly 96), head 128.8 against 129, body at **216.8**, list
  title 20.8, rows at **100.8** and **56** each against Figma's 55. The +5.8 is
  the six row borders.
- Its rows carry **no gap**; each closes on its own `encre/10` rule.
- **Figma draws the first row entirely in brique** — tick, label and arrow —
  where the other five are a result-green tick, an encre label and an encre/62
  arrow. Read as the **hover state** rather than a permanent highlight: nothing
  on a profile page makes "Droit des sociétés" current, and this is the sixth
  time the comp has shown one row of a list in its hover state. Applied to all
  six on `hover`/`focus-visible` instead — verified with a real pointer, label
  and arrow both resolving to `rgb(166,124,27)`.
- Its rows point at the domain pages they name, so **two of the six are real
  links** (`contrats-commerciaux`, `contentieux-arbitrage`) and the other four
  are spans — verified `SPAN,SPAN,A,SPAN,SPAN,A`.
- Its arrow is another **SF Symbols `arrow.right` placeholder**; rendered as the
  site's usual `→` rather than a new file.
- No new assets, no new tokens.

#### Parcours (`13495:30380`) — built, 835.7 against 830

A 679 timeline beside a 329 side column. **The row takes no gap**: Figma spaces
the two with `justify-between`, which gives 237 inside the 1245 container, and
the side column carries its own **`pr-96`** so its content is 233 wide with its
right edge 96 in from the container. It splits at `xl` — 679 + 329 needs 1008.

- Measured: head **78.8 against 79**, row at **210.8**, list **679 at x=337.5**,
  side column **329 at x=1253.5** — Figma's exact 916 inside the row — five
  timeline rows of **96.2** against 95 on a 12px gap, year resolving to
  `text-price` 30px in pale-periwinkle. The +5.7 is the five row borders.
- **One label wraps where Figma fits it on one line.** "Avocat européen ·
  depuis 2012" needs ~236 in the 233 column, so its item runs 71.2 against
  47.2 and the side column's three blocks sit ~25px lower than the comp
  (Figma 0 / 203 / 319, built 0 / 228 / 376). That is the half-percent Inter
  drift this file already records for the article prose and the Cabinet cards.
  **It costs no section height** — the side column is 509 against the
  timeline's 529, so the timeline sets the row either way.
- Its "Langues de travail" row is the same story at the other end: Figma's
  three labels need 277 in the 233 column and it **clips** the third; they wrap
  here, as every other clipped row on the site does.
- The last block carries **no rule** — only the first two close on one.
- Its three language labels are typed uppercase in the text node; stored
  natural and uppercased at the call site, per the site-wide rule.
- No new assets, no new tokens.

#### FAQ (`13544:33769`) — built, 979.9 against 940

Seven questions beside the arch illustration — **but the illustration is on the
LEFT here**, where every other FAQ on the site puts it on the right. White
ground; the accordion follows on a 48px gap.

- Measured: illustration **383x440 at x=337.5**, accordion at **x=768.5** —
  both Figma's own — so the gap is exactly **48**. Head 124.8, list at 232.8,
  row 1 **219.1**, seven rows, the first open.
- **Its whole composition is mirrored**, and the offsets are exact: arch at
  illustration-relative **(17.5, 8)** against the right-hand version's 70.5,
  sparkle at **(331.5, 17)** rather than (49, -4), and the laurel bleeding off
  the **lower left** at **(-102.5, 335.5)** under a `-scale-x-100` — its
  `inset-[76.25% 95.43% -10.34% -26.76%]` resolves to exactly that. Verified
  `scale: -1 1`; Tailwind v4 flips via the standalone property, so `transform`
  reads `none`.
- **That is a fifth `FaqIllustration`**, and the first to mirror. All three
  assets still reuse — laurel 0.0023, arch 0.004, sparkle an exact 1.15x.
- The documented **squeeze** again, mirrored: 383 + 48 + 820 is 1251 inside
  1245, so the accordion flexes to **814** and ends flush with the container.
- The +39.9 is identical to the service page's FAQ: the deliberate answer cap
  costs one line (+25.2) and the seven row borders +14. Row anatomy is that
  page's exactly — white on `encre/7` at a 14px corner, 24/16 padding, an 8px
  gap, a `text-h3` question with **no gap** to the marker, and a
  **full-strength encre** answer.
- **Its copy is the service page's verbatim, title included** ("Litiges entre
  associés : questions & réponses") — a leftover from the duplicated frame,
  exactly like the e-commerce Interlocuteurs angle note. Stored per page so
  either can be rewritten alone. **Flag it: on a profile page it is wrong
  content, faithfully built.**

#### Contact (`13544:34906`) — built, 1027.5 against 1021

A 1245 white card on a full-width **lilas** band, inset **120 above and 99
below** — an asymmetry worth reading from the frame rather than assuming 96.

- Measured: card at **y=120**, 1245 wide, radii **80 / 18 / 60 / 18** and the
  `0px 14px 34px` shadow exact; left column **221 at card-relative 65** (64
  padding + the 1px border), right column at **350** and 830 wide, portrait
  **221x265** with its own `80 / 4 / 20 / 20`, head **187.2 against 187**,
  textarea **155** at 408, footer **90 exactly**. The +6.5 is the card and
  input borders.
- **Its shadow is hover only**, asked for. The comp draws it lifted, but it is
  a single card with no sibling to settle it, and every Figma-drawn shadow on
  this build has turned out to be the hover state — so it follows the
  Interlocuteurs lawcard, whose radii it already shares. Verified: `none` at
  rest, `rgba(0,0,0,0.1) 0px 14px 34px` on hover, section height unchanged.
  **The rule is now simply: a Figma-drawn card shadow is the hover state**, the
  only standing exception being the Forfaits featured plan, where it marks the
  highlighted card rather than a state.
- `lawyer-portrait-card.jpg` reuses (diffs at 3.48 at this box, with the next
  candidate 3.57 — all three are crops of the same portrait). No new assets.
- Its marks are a **periwinkle Inter Bold tick** on a 26px line box, with a
  Poppins SemiBold periwinkle lead-in — a different tick from the result-green
  ones everywhere else on the site.
- Its inputs are real and labelled but deliberately **not in a `<form>`**, like
  Tools, SearchBand and the article's consult block.
- **Two form-control gotchas cost 16px between them, and only measuring the
  group found either.** A form control does not inherit the token's
  line-height, so each input rendered **62.2 against Figma's 57** until
  `leading-[1.4]` was set explicitly; and a `textarea` is `inline-block` by
  default, so its wrapper picked up ~6px of line-box descender until the field
  class took `block`. Both are invisible field by field — the fields group read
  335.4 against 325 and neither child looked wrong.

### Page 10 complete — five sections plus the tab

| # | Section | Figma | Rendered | Δ |
|---|---|---|---|---|
| 1 | Hero | 740 | 740.0 | **0** |
| 2 | En bref | 527 | 532.8 | +5.8 |
| 3 | Parcours | 830 | 835.7 | +5.7 |
| 4 | FAQ | 940 | 979.9 | +39.9 * |
| 5 | Contact | 1021 | 1027.5 | +6.5 |
| + | side tab | 45x236 | 45x236 | **0** |
| **Sections** | **4058** | **4115.9** | **+57.9 (1.4%)** |

Page **4547** at 1920. \* The FAQ's +39.9 is the deliberate answer cap plus its
seven row borders, exactly as on the service page; every other delta is the
border-box difference. **No horizontal overflow at any of nine widths.**

**One new asset on the whole page** — `mariela-portrait-hero.jpg`. Everything
else matched: `seal-ribbon` at 1.2x, **`courthouse.svg` at a fourth box**, the
three FAQ ornaments, and `lawyer-portrait-card.jpg`.

**Two comp leftovers to flag**, both from the duplicated frame: the FAQ's whole
block — title included, "Litiges entre associés : questions & réponses" — is
the service page's verbatim on a profile page; and its seven questions are that
page's too. Stored per page so either can be rewritten alone.

## Page 11 — Politique de confidentialité (`/confidentialite`), frame `13547:1042`

1920x**11836** — the site's first pure legal document, and the first page
reached from the **footer** rather than the header. Its route takes the
footer's own label, `Confidentialité`.

Its sections live in `src/components/sections/confidentialite/` and its copy
under the **`ConfidentialitePage`** namespace.

| # | Node | Figma h | Status |
|---|---|---|---|
| 1 | Hero `13549:1042` | 423 | done |
| + | rule `13549:1048` | 1920x1 | done |
| 2 | Body `13550:1042` | 10981 | done |
| | ├ Content `13550:1064` | 765x10837 | done — 18 sections, S01-S18 |
| | └ TOC `13550:1044` | 384x609 | done |

- **The body is a two-column legal document**: a 765 content column beside a
  384 table of contents. 765 + 384 is 1149 inside the 1245 container, which
  `justify-between` spaces by exactly **96** — the arithmetic four other
  sections on this build already use.
- **Its eighteen sections sit on a uniform 48px gap**, with a uniform **20**
  inside each, and each carries its own 1px `stone` rule at the top (S01 has
  none — the page rule above it serves).
- Each section head is a 12px baseline row: the **number in `text-rose`**
  (Poppins SemiBold 18 — Figma's own "Petroff/Rose", #7FA6E0, which is already
  a token) beside a Poppins Bold 30 title, i.e. `text-price`.
- Its `dl` blocks are ruled rows — a 240px `text-body-strong` label beside a
  flexed encre/62 value on 12px of vertical padding, with a rule above every
  row and one closing the list.
- **The whole 765 column is saved.** One `get_design_context` with `forceCode`
  returned 94,810 characters, extracted to `priv-code.tsx` in the scratchpad
  and indexed by section, so **the remaining passes need no further Figma
  calls** for it.
- **Only two assets in the entire column, and neither needs a file.** The
  bullet is a 9x27 box holding a 9px `#C7D6EF` circle — geometry identical to
  `bullet-mark.svg` but pale periwinkle where that one is periwinkle, so it is
  a span like every other bullet dot on the site rather than a third fork.

#### Hero (`13549:1042`) — built, **423.9 against 424**

One 1245 column on a uniform 16px gap, `pt-64 pb-36` — not a symmetric pad —
closed by the full-width `stone` rule, which is `border-b` on the section.
Measured: overline at **64**, title 100.8, meta 188.9, lead 231.9 at **920**
wide, the border resolving to `1px rgb(233,228,216)`.

- Its rule is **`#e9e4d8`, an exact `--color-stone` match** — no new token.
- Its meta line takes **`whitespace-pre-wrap`**: Figma types three spaces
  either side of the middle dot, which HTML would otherwise collapse to one.
- **The footer's legal line now links.** `Footer.legalLinks` carries a `<c>`
  tag around *Confidentialité*, so one string still holds all three labels and
  only the live one is an anchor — the other two stay plain text. It is in the
  layout, so the link is on every page.

#### Body (`13550:1042`) — built, 11003.5 against 10981

The document: a 765 content column at **x=337.5** beside the **384** TOC at
**x=1198.5**, so the gap is exactly **96** and the TOC's right edge closes the
container. Eighteen sections on a **uniform 48px gap** — all seventeen gaps
measure 48 — with a uniform 20 inside each, and every section but the first
opening on its own 1px `stone` rule. The band takes **48 above and 96 below**.

| S | Figma | built | | S | Figma | built |
|---|---|---|---|---|---|---|
| 01 | 446 | 449.4 | | 10 | 682 | 685.4 |
| 02 | 452 | 453.3 | | 11 | 918 | 899.4 * |
| 03 | 1207 | 1211.1 | | 12 | 270 | 271.8 |
| 04 | 605 | 607.0 | | 13 | 295 | 297.0 |
| 05 | 1095 | 1100.1 | | 14 | 607 | 609.0 |
| 06 | 873 | 877.6 | | 15 | 325 | 326.3 |
| 07 | 350 | 353.8 | | 16 | 175 | 176.3 |
| 08 | 668 | 670.6 | | 17 | 245 | 246.6 |
| 09 | 432 | 434.2 | | 18 | 376 | 374.9 |

Every section lands within **+5**, except S11.

- \* **S11 is 18.6 short and all of it is one table row.** Figma renders the
  DigitalOcean value on **three** lines in a 501px cell where the browser fits
  it on two — its `dl` measures 357 against the built 335.2, and its own
  metadata gives that row `h=99` against 51 for its neighbours. That is the
  half-percent Inter wrap drift this file already records for the article
  prose; nothing is misconfigured.
- **The document's copy is stored as blocks, not as loose strings.** For a
  legal text the block sequence *is* the content, so `ConfidentialitePage.
  sections.<key>` holds `{ num, title, blocks[] }` and one generic renderer
  walks it. `src/lib/confidentialite.ts` carries only the eighteen keys, the
  sixteen TOC keys and the `Block` union.
  - **`t.raw` needs a leaf.** next-intl's typed catalogue exposes only leaf
    paths, and an *array* is a leaf where an object is not — so
    `t.raw(\`sections.${key}\`)` fails to typecheck while
    `t.raw(\`sections.${key}.blocks\`)` passes, with `num` and `title` read as
    ordinary strings beside it.
  - Its one inline run, `<s>…</s>` (Inter SemiBold 18 encre), is split in the
    renderer rather than routed through `t.rich`: with well over a hundred
    strings, `t.rich` would need a literal message path for every one and would
    drag the whole document structure into a lib file to get them.
- **Six block types cover the whole document**: `p` (encre), `note`
  (encre/62), `sub` (a `text-h3` sub-heading), `list`, `dl` and `callout`.
- Its **bullet is a span**, a 9px pale-periwinkle dot — geometry identical to
  `bullet-mark.svg` but in another colour, so no third fork. Figma lays the row
  out **`items-end` against a 27px puce box**, which drops the dot to the *last*
  line the moment an item wraps; it is `items-start` with `mt-2.25` here, and
  the row takes **`min-h-6.75`** so a one-line item still measures Figma's 27.
  That `min-h` is worth 1.8px a bullet — **12.6 on S02 and 14.4 on S14**, which
  is the whole of what those two sections were missing.
- Its **`callout` has two tones**: `pink-soft/40` under a 3px **red** left edge
  (S03), and solid `pale-gold` under a 3px **brique** one (S08). Both are padded
  **24 at the sides and 20 top and bottom**, with an Inter SemiBold 18 title
  over an Inter 16 body, both in encre.
  Note this is a different anatomy from the article's `Callout`, whose `rule`
  variant is white with a 5px periwinkle edge.
- Its `dl` rows are **not uniformly ruled**. S01, S15 and S18 carry a rule above
  every row and one closing the list; **S11 leaves three of its six without
  one** (Vercel, Resend, Google Ireland). Their node ids sit outside the
  section's range, so they were added later without their rules — reproduced
  per row and almost certainly a slip. **Flag it.**
- **S11's table header row asks for a font the project does not have.** Figma
  styles it `Outfit Bold 14 / 18px / 1.04px tracking`, uppercase on lilas-2 —
  and Outfit appears nowhere else on this site, which is Poppins + Inter. It is
  built with `text-overline` (Poppins SemiBold 16 / 0.18em), the nearest style,
  the same call the SF Symbols placeholders got. **Needs the designer.**
- Two dl rows are strong on **both** sides — `Site: www.cnil.fr` and
  `E-mail: m.petrova@petroff.law` — because Figma puts the SemiBold on the row
  rather than the label. Carried as a `strong` flag per row.
- **`break-words` on the section is load-bearing.** Figma marks every section
  frame `word-break: break-word`; without it S10's bare
  `tools.google.com/dlpage/gaoptout` pushed the page to 342 at a 320 viewport.
  The property inherits, so one class on the section covers the document.
- **The row splits at `xl`, not `lg`.** 765 + 96 + 384 is the container's whole
  1245, which needs 1309 of viewport; at `lg` the content column was squeezed to
  576 and the page ran to 13506. Stacking there instead brings it to 11511.
- **The `xl:` widths did not reach the stylesheet on first compile** — the TOC
  measured its content width (341.3) rather than 384, and `xl:top-6` was absent
  so the sticky never pinned. A content change to `globals.css` fixed both.
  Exactly the Turbopack/Tailwind rescan trap this file records; it is worth
  re-measuring after *any* pass that introduces a new breakpoint variant.

#### The TOC (`13550:1044`) — built, 613.5 against 609

384 wide of which **36 is left padding**, so its content is 348. A brique
overline at y=0 (20.8 against 21) over a 12px list at **44.8** (Figma 45);
sixteen rows of 24.3 against 24, each a 16px gap between the number in
`text-rose` and an Inter 16 label in encre/62.

- **Its labels are shorter than the sections' own titles** — "Informations sur
  les sociétés & marques" against "Publication d'informations sur les sociétés
  & les marques" — so they are their own strings under `ConfidentialitePage.toc`.
- **Figma's list jumps 06 -> 09**, so `traduction` (07) and `relation` (08) are
  missing from it. Reproduced rather than filled in. **Flag it.**
- **Sticky, which Figma does not draw** — a 609px table of contents beside a
  10,837px column stops being one after the first screenful. `xl:sticky
  xl:top-6 xl:self-start`, verified pinning at **exactly 24** at scrollY 4000.
  Its entries are real anchors and the sections take `scroll-mt-6`; the
  site-wide `scroll-behavior: smooth` added for the article TOC applies here
  too, so **a CDP `window.scrollTo(0, n)` animates** — pass
  `behavior: "instant"` or the measurement reads mid-animation.

**Page 11 so far: 11859 at 1920 against the frame's 11836 (+23)** — the
per-section line-box rounding, less S11's one wrapped row. No horizontal
overflow at any of nine widths from 1920 down to 320.

## FAQ answers are capped at a reading measure

Asked for: the accordion "goes long away" when a row opens. Measured — the
answer paragraph ran the **full width of the row**: 764px on the three
standalone FAQ sections and 831 in the article column, i.e. **95-105 characters
a line** at 18px, well past a comfortable measure. The section height barely
moves when a row opens (672 -> 697 at most), so this was never a height
problem; it is line length.

- The answer now wraps at **`max-w-160` (640px)** — the same measure
  `SectionHeading`'s lead already uses, about 80 characters. The question row
  stays full width, so the chevron and the row edge are unchanged.
- Applied to **Contentieux, Contrats and e-commerce**. The two article FAQs are
  deliberately left alone: their answers are 831 wide, which is exactly the
  article column's own prose measure, so capping them would make the FAQ
  narrower than the body text running above it.
- **Capping the answer shrank the row as a side effect**, and only re-measuring
  caught it: the left column sized to its content, and with nothing inside
  forcing 820 any more it collapsed to 690. The column takes `flex-1` now and
  the rows measure **814** again. *Whenever you cap a child's width, re-measure
  the parent* — a max-width can quietly remove the thing that was setting it.
- After: answers 640, rows 814 on all three; the two article FAQs untouched at
  831/881. Contentieux 8591, Contrats 8590, e-commerce 17602. No horizontal
  overflow at 1920, 1280, 768, 375 or 320.
- **This is a deliberate departure from the comp** on all three frames, which
  run the answer full width.

## Eyebrows are uppercase site-wide

**Every section eyebrow, card kicker and panel overline renders in all caps on
every page**, asked for after the e-commerce hero's `13331:10425`. It is done
with a `uppercase` class at the call site, **not** by rewriting the strings:
the French copy stays stored in its natural casing (`Avocat en droit du
e-commerce`, `Le cabinet`, `Méthode`), which keeps accents and the message
catalogue readable and matches how Figma itself does it on this page — a
`text-transform` in the style rather than caps in the text node.

**This deliberately overrides the mixed-case finding recorded throughout this
file.** Several frames — the home page's seven overlines, the domain pages'
`Méthode` / `Espace client`, the Actus and Methode card kickers — genuinely
write their eyebrows mixed case, and the build was corrected to match. The
instruction supersedes that: do not "fix" an eyebrow back to mixed case on the
strength of an older note here.

`SectionHeading` carries the class, which covers about thirty sections at once;
the rest are the sections that write their head out. 32 call sites in all.

**Five things share the overline style but are NOT eyebrows and stay as they
are** — check against this list before adding `uppercase` anywhere new:

| Not an eyebrow | Where |
|---|---|
| `← précédent` / `SUIVANT →` | the article's prev/next navigation |
| `Piège fréquent` | the article `trap` callout's badge |
| `Art. L. 221-18 C. conso.` and the other four | e-commerce hero stat citations |
| `FR · EN · 中文 · ES` | the footer's languages line |
| `Le cabinet` / `Ressources` / `Outils` | footer column headings, which Figma draws mixed case |

The consultation drawer's overline **is** included, and it fits: uppercase at
`--text-overline-tight`'s 0.14em measures **403.7 in its 412px slot**, the same
number this file already records for the old all-caps string. At the ordinary
0.18em it would not.

Verified after the change on all seven pages: no eyebrow left in mixed case
except those five, every page height unchanged (home 5748, Expertises 4238,
Contentieux 8446, Contrats 8354, Bibliotheque 6271, article 19114, e-commerce
17577), and no horizontal overflow at 1920, 375 or 320.

## The trap callout's glyph is brique

Asked for, and it is a build fault rather than a preference — checked before
changing it. `13318:2729` exports its 24px warning triangle with
`stroke="#A67C1B"`, Petroff/Brique, the same colour as the "Piège fréquent"
tag beside it; the build rendered it encre.

- The stored `warning-circle.svg` is **path-identical** to that export and
  already strokes `currentColor`, so this is one class. `Callout`'s variant map
  carries an `icon` colour now — `trap` brique, `rule` encre — rather than the
  colour being hard-coded on the element.
- Everything else in the callout already matched and was re-checked: lilas
  ground, 18px corner, **28** padding, an **8** column gap, the head row on
  **12** with 4 of bottom padding, and the stone tag at **4/14** with brique
  Poppins SemiBold 16 at 0.18em.
- **The original page keeps its encre glyph**, and deliberately: its trap is
  still the older pale-rose box with a red tag, so a brique triangle would
  clash with its own tag. It follows when that block is re-derived.

## The reflist's "+9" button opens the rest

Asked for. It was an inert span: the component was handed only the first four
references and the button counted the nine it was hiding without a way to show
them. **The template shows all thirteen with no button at all**, so the
collapse is Figma's own idea and the expansion is the only reading of it that
is not a dead control.

- `RefList` takes **every** reference as a child now and shows the first four
  until pressed — `Children.toArray(...).slice(0, 4)` — so the "+9" stays true
  to the data rather than being a number in a string that could drift.
- It is a real `<button>` with `aria-expanded` and `aria-controls` pointing at
  the list, so it announces its state and works from the keyboard for free.
  The two pages pass their own list ids, since both render one.
- One new string, **`reflist.less` = "Réduire la liste"** — Figma draws only
  the collapsed label, so the expanded one is ours, like the Resultats empty
  state.
- Driven on both pages: **4 rows / "+9 Voir la liste complète" / block 438.3**,
  then **13 rows / "Réduire la liste" / 1270.7**, then back to 4 and 438.3.
  Thirteen minus four is nine, so the comp's own count is right.

## Jurisprudence liée re-derived — `13424:15804`

Asked for. Its spacing was wrong in three places, and the wrapper node is the
one to read: it gives the whole block a **24px column gap** between the `hdico`
heading and the list, which neither page had.

| | was | Figma |
|---|---|---|
| the card's three fields | **flush** on new-article, `mt-1` / `mt-2` (4 / 8) on article-design | a **12px gap**, uniform |
| head -> list | 24 on new-article, **18** on article-design (the older frame's spacer) | **24** |
| the card's bold lead-in | inherited the body's **encre/62** | **full encre** |

- **The card gap was a deliberate mistake.** This file recorded the three
  fields stacking "flush — the card carries no gap of its own", which is what
  brought the block to +13 against a ported version's +73. The wrapper node
  says 12, and at 0 the citation, holding and facts read as one run of text
  rather than three fields.
- **The bold run is the same `proseTags` trap the takeaways had.** Its `b`
  carries no colour, so inside an `encre/62` paragraph the weighted half
  silently inherits the 62%. Any block that sets its own body colour has to
  re-declare `b`.
- Measured after, and every value is Figma's: head gap **16** with a **48x48**
  glyph, head -> list **24**, list gap **24**, card **28** padding at an **18**
  corner with a 1px `encre/8` border and a **12** gap, and the card's three
  fields at **29 / 64.2 / 102.2** — 28 padding plus the border, then 12 between
  each. Citation Inter 16/23.2 brique, holding Poppins 20/26 encre, body Inter
  18/25.2 encre/62, the lead-in Poppins 18/24.3 in **full encre**.
- Block **1176.7 against the node's 1164** — the five cards' borders.
- Both article pages are identical here now; only the heading's own wrapper
  still differs, since article-design keeps the older frame's per-block spacers.

## The simulator is a real tool now — `13318:2543`

Asked for, and built the same way as the triage: against
`public/PETROFF-GABARIT-ARTICLE-v6.html`, whose `calcSig()` is **the only place
these rules are specified**. Figma draws one completed run and gives each field
a single chosen value with no option list.

- **The template's defaults are exactly Figma's chosen values** — synallagmatique
  / non-commerçant / 45 000 € / signature simple — and its output for them is
  exactly the result Figma draws. So the form opens on the comp's own state and
  the comp's own answer, with nothing invented.
- The rules live in **`src/lib/simulator.ts`**, shared by both article pages,
  and `analyse()` returns **message keys rather than strings** so every word
  stays in the catalogue under `simulator.results`.
- Its four controls are three `<select>` and a number `<input>`, in the same box
  the read-only rows used, with the caret absolutely positioned over the select
  (a native select cannot keep an inline sibling). **Not inside a `<form>`** —
  with no submit handler Enter would reload the page.
- **The result panel starts closed** and "Analyser ma situation" reveals it,
  matching the template (`#s-res` ships `hidden`) and the triage tool. Changing
  a field afterwards **re-runs the analysis in place**, so a stale verdict can
  never sit under a changed form. Block **508.7 closed against 1388.3 open**.
- **`charge` tracks `presomption` one for one** in the template, so one key
  drives both rows.
- Figma's shortened result strings are replaced by the template's full ones,
  which carry the citations — the same call the triage's three extra branches
  got.

**The layout stays Figma's 2x2** — 391px fields, two per row on the column's
881, exactly as the comp draws them. Only the control changed.

**Its dropdown is a listbox, not a `<select>`, and that is the whole reason.**
A native select's popup is drawn by the browser and sized to its **longest
option**, so it spills well past a 391px field and no CSS reaches it.
`components/ui/Select.tsx` is a button plus a `role="listbox"` panel pinned
`left-0 right-0` on the control, so the open list is **exactly 391 — measured,
control 391 and panel 391 sharing a left edge** — and a long label wraps inside
it instead of widening it.

- It keeps the native keyboard contract: Enter, Space or either arrow opens it,
  the arrows and Home/End move the highlight, Enter or Space commits, Escape
  and Tab close, and a click outside closes. **Focus stays on the button** with
  `aria-activedescendant` pointing at the highlighted option — the combobox
  pattern, not a roving tabindex. Driven: arrow-arrow-Enter selects the third
  option and closes the panel, an arrow reopens it, and Escape closes it with
  focus still on the control.
- Its caret is the site's own `caret-down.svg` at 12x8 in full encre — the
  Bibliotheque filters' treatment — and it **flips on open**.
- The closed control still truncates a long label, which is Figma's field width
  rather than a fault: a half column gives 341px of room and seven of the nine
  option labels overrun it. The open panel is where the full text is read.
- **The Bibliotheque's two Resultats filters are still native `<select>`s** and
  have the same overflowing popup. They can take this component whenever it is
  wanted.

Driven on **both** pages, every branch of the rule set:

| input | Écrit exigé | verdict |
|---|---|---|
| the default run | Oui, au-delà de 1 500 € | Position à renforcer |
| montant 900 | Non exigé en deçà de 1 500 € | Position à renforcer |
| cocontractant commerçant | Non exigé — preuve libre | Position tenable |
| signature qualifiée | — | Position favorable |
| acte authentique | — | Voie authentique |

and the mention branch separately: an engagement unilatéral gives **"Exigée,
apposable sous forme électronique"**, which becomes **"Dispensée par le
contreseing de l'avocat"** once the level is the avocat contreseing.

- **The typed catalogue forced the shape of two lookups.** A template over the
  row key crosses into `results.ecrit.commercial`, and a `${string}` option key
  is not a literal at all — so the option labels are resolved per field into a
  `{v, label}` list, and the four values into a small record, before either
  reaches a generic helper. Both are one call per field rather than a loop.
- No horizontal overflow at any of nine widths on either page.

## The triage tool is a real control now — `13318:2948`

Asked for, against **`public/PETROFF-GABARIT-ARTICLE-v6.html`**, which the user
placed in the repo. That template carries the behaviour Figma cannot draw: its
`triage(i, btn)` marks the clicked option `.on` and rewrites the three result
rows and the note beneath from a four-entry `TRI` array.

- **It opens closed, and it toggles.** No option pressed and **no panel in the
  DOM at all** until one is clicked, and **clicking the chosen option again
  clears it and closes the panel**. The template does neither — `#tri-res`
  ships `hidden` but never hides again, and its `triage()` only ever sets — and
  Figma draws the third option already open. Both are deliberate departures,
  asked for. The block measures **434.3 closed against 828.9 open** on the new
  article page, so it returns to exactly its closed height each time.
  `aria-pressed` carries the state either way, which is the whole reason the
  buttons are not a radiogroup: a radio cannot be unchecked by clicking it.
- **The unselected rows hover to encre, not the template's red.** Asked for;
  `.opt:hover{border-color:var(--corail)}` is the only place this build departs
  from the template's own styling. Verified with a real pointer: `encre/12` at
  rest, **`rgb(18,42,76)`** on hover, back to `encre/12` off.
- **It has all four branches' copy, so nothing was invented.** The instruction
  was to use dummy text for the three Figma does not draw; the template supplies
  real copy for every one, so `results.processus`, `.unilateral` and `.officier`
  are its own `TRI[0]`, `[1]` and `[3]`, with apostrophes normalised to `’` as
  everywhere else. **`results.denie` keeps Figma's wording**, which differs from
  the template's in its note ("le contrat, l'annexe correspondante et la pièce
  révélant le passif" against "le certificat de signature, les éléments
  d'identification du signataire et la preuve de conservation").
- The copy moved from `rows.<row>.value` + a single `note` to
  **`results.<option>.{diligence, delai, honoraires, note}`**, with
  `rows.<row>.label` left where it was. **The typed catalogue caught the second
  page immediately** — the article-design block was still reading
  `rows.delai.value` and failed to compile, which is exactly what it is for.
- **Buttons with `aria-pressed`, not a radiogroup**: there is one result panel
  rather than one per option, so a radiogroup would promise a widget this is
  not — the same call the Bibliotheque's filter tabs make. The panel is
  `aria-live="polite"`, and the unselected rows take the template's own
  `.opt:hover` red edge.
- Both blocks become client components; `Corps` stays a server one.
- Driven on **both** pages from the closed state: no option pressed and no
  panel at first, then a click opens a branch and **a second click on the same
  row closes it again** — verified open/close/open/switch/close/open across all
  four. All four options select, the three rows and the note
  rewrite each time, the chosen row resolves to `2px rgb(46,91,184)`, and Enter
  activates from the keyboard. The new-article row also goes to Inter SemiBold
  on selection, which is its frame's own difference — article-design's stays
  Regular.
- Open, the block is still **828.9 against Figma's 813** on the new article
  page — the comp's own number — so nothing about the panel moved; only its
  default state did. No horizontal overflow at any of nine widths on either
  page.
- **The simulator above it is still static**, and the template has a `simule()`
  for it too. Same treatment when asked.

## The article FAQ opens closed too

Asked for, in the same pass as the triage panel. Both article pages' eleven
`<details>` now ship with **no `open` attribute at all** — Figma draws the first
one expanded and `PETROFF-GABARIT-ARTICLE-v6.html` ships it `<details open>`, so
this is a deliberate departure from both.

- It is one constant per file: `EXPANDED` / `expandedKey` is `null` now rather
  than `"plateforme"`, typed as `(typeof items)[number] | null` so a real key
  still typechecks if it comes back.
- **The group is still exclusive and still needs no JavaScript** — the
  `<details>` share a `name`, so the sections stay server components. Driven on
  both pages: 11 rows, **0 open and 0 answers passing `checkVisibility()` at
  load**, clicking row 4 opens only row 4, clicking row 1 closes it and opens
  row 1, and clicking row 1 again closes everything.
- Pages at rest: **19648** and **19076**, the first answer's height lighter.
- **The site's five other FAQs still open their first row**, which is what their
  own comps draw — Contentieux, Contrats, e-commerce, the service page and the
  personal page. Each is the same one-line change (`faqExpandedKey` for the two
  domain pages, an `EXPANDED` constant for the rest) if that should be
  site-wide.

## Every contact button opens the drawer

Asked for, site-wide. The drawer's state used to live in each page's own
`Consultation` wrapper, so only the side tab and the article's sticky bar could
reach it — every other "Prendre rendez-vous", "Parler à un avocat" or "Obtenir
un devis" on the site was an inert button.

- **`ConsultationProvider` now owns that state, in the layout**, and renders the
  panel once for the whole site. `Consultation` is reduced to the side tab (plus
  the sticky bar on the two article pages), reading the same context.
- Two triggers: **`ConsultButton`** wraps `Button` for the ordinary CTAs, and
  **`ConsultTrigger`** is a bare styled `<button>` for the CTAs written out with
  their own pill classes — the article tools, the e-commerce cards, the rail,
  the header's phone control. Both are client components taking children from
  server sections, so no section had to become a client component.
- **The drawer is now reachable below `lg`.** It is mounted on every page, so a
  contact button opens it at any width — measured **510 wide at 1920 and 768,
  and the full viewport at 375 and 320**, with the scroll lock working and no
  overflow. Previously the tab was `lg:flex` and there was simply no way in on a
  phone, which this file recorded as a real gap.
- It also works on **`/confidentialite`**, which draws no side tab at all.

**What counts as a contact button** — verified by clicking *every* visible
button on every page and reading whether the dialog left `inert`:

| Opens the drawer | Does not |
|---|---|
| Prendre rendez-vous (header, hero, CTAFinal), Nous appeler, the phone pill on the personal hero | the three nav dropdowns, the language switcher |
| every CTAFinal pair — Réserver un créneau visio / Obtenir un devis en ligne, Parler à un avocat / Poser votre question | Rechercher, Vérifier, the search chips |
| both MidCTAs, Décrire mon besoin, Faire évaluer mon dossier | the legal-tech tool cards' Évaluer / Calculer / Estimer / Auditer / Analyser / Préparer |
| every Forfaits plan CTA — Démarrer, Être rappelé, S'abonner, Commander l'audit, Commander le pack, Demander un devis | Voir les forfaits, Explorer la bibliothèque, Choisir un domaine |
| all twelve e-commerce service cards and both its seams | Voir le service, Voir le profil, En savoir plus sur Mᵉ X |
| every service-page CTA, and all four Consulter Mᵉ X | Rencontrer l'équipe, Voir la prestation |
| the article rail's two, Soumettre à un avocat, the triage CTA, the sticky bar | Copier le lien, Imprimer / PDF, Analyser ma situation, the triage options |
| Demander à être rappelé (the lawcard) | the Bibliotheque carousel, pagination and filter controls |

Counts after the sweep: **5 on the home page, 6 on the Expertises hub, 9 on each
domain page, 4 on the Bibliotheque, 11 on the new article page, 38 on the
e-commerce page, 36 on the service page, 2 on the privacy page.**

- Behaviour re-verified from a mid-page CTA rather than the tab: focus lands on
  the Nom field, `body` overflow locks and restores, Escape closes, the panel
  goes `inert`, and **focus returns to the button that opened it** — the trigger
  is taken from the click's `currentTarget`, which is what makes that work from
  any of them.
- Every page height is unchanged: 5748, 4314, 8591, 8590, 6243, 17602, 17511,
  4547, 11859, and 19076 / 19648 for the two article pages. No horizontal
  overflow at 1920, 375 or 320.

### Two traps this pass hit

1. **An import prepended above `"use client"` silently breaks the directive.**
   Prettier then rewrites the orphaned string as `("use client");`, the file
   becomes a server component, and *every route* 500s with an error naming a
   file the change barely touched. Four files hit it. **The directive must stay
   the first statement.**
2. **The Tailwind Prettier plugin trims class strings, so a trailing space used
   for concatenation disappears.** A row class built as
   `` `${cond ? "border-stone border-t " : ""}flex flex-col …` `` lost that
   space and produced `border-tflex` — two dead classes. It cost the privacy
   page **227px**: every `dl` row stacked instead of sitting side by side, and
   only the four sections with tables moved, which is what made it findable.
   **Never build a class string by concatenation — use `cn`.**

## The consultation form left the article body — `13544:34907`

Asked for. The frame `13318:2398` gained a **new top-level section** between
Corps and Cabinet — `13544:34907`, 1918x1021 at y=14766.6 — and Corps shrank
from 14362.6 to **13804.6**, which is exactly the `consult` block and its marks
strip coming out of the column.

- **It is the personal page's contact lawcard, duplicated.** `13544:34907` and
  `13544:34906` have the same node names, the same child offsets and
  character-identical copy, so it is **one component** at
  `components/contact/Lawcard.tsx`, with its strings in a shared top-level
  **`Lawcard`** namespace — the fifth, after `ContactCta`, `Transparence`,
  `Consultation` and `Interlocuteurs`. `sections/personal/Contact.tsx` and
  `PersonalPage.contact` are gone.
- **The two frames differ in exactly one thing: the band.** `13495:31490` is
  lilas on the personal page, `13544:34908` is **lilas-2** on the articles —
  checked on both rather than assumed, since the rest is a verbatim copy. It is
  a `tone` prop, the same shape `SideTab` uses.
- Measured, identically on all three pages: band at the right colour, card top
  at **120 exactly**, card **1245** wide, photo **221x265 at (65, 65)**,
  overline at (350, 65), title at 97.8, textarea **830x155 at (350, 288.2)** —
  every one Figma's own number plus the card's 1px border. Section **1027.5
  against 1021**.
- The two `blocks/Consult.tsx` files are deleted. `ArticlePage.consult` and
  `NewArticlePage.consult` are now **unused copy** — left in the catalogue
  rather than deleted, since only the form moved. `lawyer-portrait-inline.jpg`
  is **not** an orphan: both `Seam` blocks still use it.

### Walking the whole frame

Section by section at 1920, both article pages against `13318:2398`:

| Section | Figma | article-design | new-article |
|---|---|---|---|
| Hero | 890 | 890.5 | 890.5 |
| Corps | 13804.6 | **13146** | 13762 |
| Lawcard | 1021 | 1027.5 | 1027.5 |
| Cabinet | 774 | 776.9 | 776.9 |
| Interlocuteurs | 900 | 906.4 | 906.4 |
| ALireEnsuite | 1411 | 1403.3 | 1419.3 |
| Transparence | 370 | 370.5 | 369.5 |
| CTAFinal | 550 | 550.4 | 550.4 |
| **Page** | | **19503** | **20134** |

- **`/bibliotheque/new-article-page` is the faithful build of this frame** —
  every section within 8.3, and Corps within 42.6 over more than thirteen
  thousand pixels.
- **`/bibliotheque/article-design`'s Corps is 658.6 short of the frame**, and
  that is the legacy column, not a regression: page 8 exists precisely because
  that page was derived before the frame changed and porting it was rejected.
  Its blocks genuinely differ — thirteen reflist rows against four, different
  seams, a different simulator. **Re-deriving that column is the outstanding
  item on this frame**; everything outside Corps now matches.
- **The sticky bar was still the older design on `article-design`** and is
  aligned now: `13318:3406` is a **lilas band at 60% under a 1px `encre/30`
  rule** with an encre title, an encre detail line and a **red button carrying
  white copy** — where that page had a pale-rose band under a 2px red rule with
  a periwinkle detail line and a white button. This node has now been
  redesigned twice; read it, never port it.
- Behaviour re-driven on both pages after the change: red tab **45x236**, the
  drawer opening at **510** with focus landing on the Nom field, `body`
  overflow locking and restoring, Escape closing and the panel going `inert`,
  and the bar resolving to `lilas/0.6` with a `1px encre/0.3` rule and a
  **16px** backdrop blur. No horizontal overflow at any of nine widths from
  1920 down to 320, on either article page or the personal page.

## One gold bullet, site-wide

Asked for, from `13680:21328`. That node is a **9x20 box holding a 9px circle
in `#D9A441`** — Figma's own "Petroff/Gold", so an exact `--color-gold` match —
and it is byte-identical to the puce the takeaways block draws.

`bullet-mark.svg` now **is** that glyph: 9x20, gold, where it was 9x27
periwinkle. All three of its call sites take it at `height={20}` — the article
takeaways, the new-article takeaways and the service page's
"L'essentiel en six points". **`bullet-mark-gold.svg` is now an orphan**: the
brique/periwinkle split that forced the fork is gone, so one file serves
everything. Left in the tree under the usual orphan policy.

- **The 9x20 box is a fix, not just a resize.** Its circle sits at cy 12.5,
  level with the 25.2px first line of `text-body`; the old 27 box put it at
  15.5, three pixels low, and — being taller than the line — it set the row
  height. Figma's own arithmetic is `25.2 + 20 = 45.2` for a one-line item and
  `50.4 + 20 = 70.4` for two, which is exactly what the rows now measure.
- **This is a site-wide instruction that overrides individual frames**, on the
  same footing as the uppercase eyebrows. Two list bullets that Figma draws in
  another colour were recoloured gold and **keep their own geometry**, since
  their frames size them differently and their rows depend on it: the privacy
  page's 9px dot (drawn pale periwinkle, 44 of them) and the e-commerce
  "Comment nous aidons" 10px dot (drawn rose). Do not "fix" either back on the
  strength of its frame.
- Already gold and therefore untouched: the two trust strips' 10px dots,
  e-commerce Notre rôle's 12px checks, its Quand consulter 14px triggers and
  the service page's Comment nous procédons 12px dots. Each keeps the size its
  own frame gives it.
- **Not bullets, and deliberately left periwinkle**: the two Timeline rails'
  14px nodes (a dot on a rail, with a white ring) and the Actus / ALireEnsuite
  pagination rows. Check what a dot *is* before recolouring it.

### Takeaways re-derived — `13318:3062`, 566.2 against 565

**Its ground has moved again**: `#EFCFD9` at 40% where this build had lilas-2.
That is the third hex under the library name "Petroff/Pink" — composited it
lands under 3/255 from `--color-pink-soft`, so that token is reused rather than
a fourth pink added. **The name is not a stable key; compare the hex.**

Everything else confirmed against the export: 18px radius, 28 padding, a
Poppins SemiBold 20 title, a 16px spacer, then rows on a **17px** gap with
**10px** of vertical padding, each a full-encre Poppins SemiBold lead-in
followed by encre/62 Inter 18. Measured rows: six at 70.5 and one at 45.3,
exactly Figma's two-line and one-line arithmetic.

- **The new article page's lead-ins were rendering at 62%, and only a colour
  read caught it.** Figma weights each point's lead-in at **full encre**
  (`#122a4c`) inside an encre/62 line. That block passed the shared `proseTags`
  straight through, and its `b` carries **no colour** — so inside a
  `text-encre/62` paragraph the bold half simply inherited the 62% and every
  point read flat. The sibling page already overrode it; this one does now too.
  Verified by reading the computed colour of the run on both pages:
  `rgb(18,42,76)` against the body's 62%.
  **`proseTags` is only safe inside a full-encre `Prose` paragraph.** Any block
  that sets its own body colour has to re-declare `b`, or the weighting
  silently disappears — nothing about the markup looks wrong.
- Its padding also gained the site's mobile step, `p-5 sm:p-7`, which it was
  missing against every other article block.
- Confirmed against the node's own render afterwards: ground `#f9eef1` against
  Figma's `#f8ecf0` (the one-unit oklab-against-sRGB compositing difference
  this build always shows on a 40% fill), bullets `#d9a443` against `#d9a645`,
  and the same seven line breaks. Both pages now measure 566.2 with identical
  rows; the pages are unchanged at 19112 and 19830.
- **Both article pages read the *same* Figma node.** `/bibliotheque/article-design`
  and `/bibliotheque/new-article-page` were derived from one frame
  (`13318:2398`) and one column (`13318:2505`), so `13318:3062` is the takeaways
  block for both — a change here lands on both pages at once, and there is no
  second node to update. Its seven bullets are **instances** of the new gold
  component, ids `13680:21307`-`21325` against the section's own `13318:` range,
  which is the tell that the designer swapped just those.
- **The four timeline `pastille` nodes stay periwinkle.** `13318:2757` and its
  siblings are `#2e5bb8` with a 4px white ring, unchanged — a marker on a rail,
  not a bullet, and the only round periwinkle elements left on either article
  page. Checked rather than assumed.
- **Both article pages now draw the identical block** — same ground, same
  bullet, same 566.2 — where the original page had been carrying lilas-2 and a
  periwinkle dot. It had read 568 before; the correction takes it to +1.2.
- Every other page is unchanged to the pixel: home 5748, Bibliotheque 6243,
  e-commerce 17602, service 17511, confidentialite 11859. The two article
  pages drop 2px, which is that one single-line row finally measuring 45.2.

## The article-card rows are real carousels

Asked for, in two passes: first "on tablet and mobile it does not look like a
carousel", then "make sure it works — add a dummy card so it can".

**Figma draws a pagination row under these grids, and a pagination row only
means anything if there is more than a viewful.** With exactly three cards in a
three-up grid there never was, so the dots had been built decorative. The track
is a carousel at **every** width now — one card per view on a phone, two from
`sm`, the comp's three from `lg` — and each row carries a **fourth card** so
the dots have somewhere to go.

`components/ui/CardCarousel.tsx` is shared by all five rows: the home **Actus**
grid and the four **ALireEnsuite** blocks (e-commerce, service, and both
article pages).

- **A scroll container, not a transform** — the call the Bibliotheque's Vitrine
  already makes — so it works with a swipe, a trackpad, the keyboard (a
  focusable `role="region"`) or no JavaScript, and the page count follows
  whatever fits at the current width with no breakpoint arithmetic.
- Its `perView` comes from the **card step**, never `scrollWidth /
  clientWidth`: the gaps inflate that ratio and produce a dot that scrolls
  nowhere, which is the bug the Vitrine already hit.
- **The active dot comes from the scroll *fraction*, not `scrollLeft /
  pageWidth`.** The last page is usually partial — four cards three per view
  leaves it a third of a page wide — so dividing by a full page rounds the end
  of the track back to page one and the marker never moves. It read `current: 0`
  at the end of the track until this was fixed; `goTo` uses the same arithmetic
  in reverse so the last dot lands on the track's end rather than short of it.
- **`overflow-x: auto` clips vertically too**, which would cut the cards' hover
  shadow. The track takes `py-6 -my-6`: the padding gives the shadow room and
  the negative margin takes the space back, so nothing moves.
- The dots are real `<button>`s while paging and plain spans when not, so a row
  that fits keeps exactly the markup the comp draws.

Driven at five widths on all five rows — 1920, 1280, 1024, 768, 375 — every one
scrollable, dots interactive, the last dot reaching the track's exact maximum
scroll and marking itself `aria-current`, the first returning to 0.

| | 1920 | 1280 | 1024 | 768 | 375 |
|---|---|---|---|---|---|
| card | 399 * | 389 | 304 | 340 | 335 |
| pages | 2 | 2 | 2 | 2 | 4 |

\* 401.7 on the home page, whose gap is 20 rather than 24. **Both are the
comp's own numbers, so desktop is unchanged** — the fourth card simply sits off
the container's right edge.

### Two things to know about the fourth card

1. **It is a placeholder.** Each row's data gained a `demo` entry reusing one of
   that section's own photographs, and its copy says so — "carte de
   démonstration … à remplacer par un contenu réel". Four message namespaces
   carry it. **Remove it the moment a real fourth item exists**; the carousel
   needs no code change, since `count` is read from the data's length.
2. **The two article pages' frames draw no dot row**, and they show one now —
   +43px each at desktop. Without it their fourth card would be unreachable
   with a mouse. A deliberate addition; `dotsClassName="lg:hidden"` puts it back
   if the designer prefers the comp.

### `flex-1` and a mobile basis fight over the shorthand

Hit while wiring this. The new article page's row was the only *flex* row
rather than a grid, and its `lg:flex-1` lost to the carousel's `basis-full
shrink-0`: the three cards measured **504** against 399. `flex-1` sets
`flex-basis: 0` through the shorthand, and whichever of it and `basis-*` the
stylesheet emits last wins — which Prettier's class sorter can quietly change.
Giving every card an explicit per-breakpoint `basis` and no `flex-1` at all is
what settled it. **Never let `flex-1` and a `basis-*` utility land on the same
element.**

## Article cards lift on hover, everywhere

Asked for. Only the home Actus grid had a hover shadow at all — it is the one
article grid built on `Card` — while the other six were hand-built `<article>`
elements with no shadow in any state. They all carry one now.

**The blur is Figma's own 34, not `Card`'s 17.** This file has recorded the
`0px 14px 34px rgba(0,0,0,0.1)` shadow on the *first* card of the Actus grid,
the home Domaines grid, the Contrats Domaines, the e-commerce masonry and both
Interlocuteurs — six times, always on one card of a grid, which is the comp
showing a hover state. So 34 is what the designer draws for a content card, and
the standing "worth confirming which blur is intended" note on the Actus grid is
now answered in favour of the comp. **`Card`'s own 17 is left alone**, since the
domain and hub grids specify it.

The seven grids, all verified by driving a real pointer over **every card** and
reading the computed shadow at rest, on hover and after leaving:

| Page | Grid | cards |
|---|---|---|
| `/` | Actus | 3 |
| `/bibliotheque` | Vitrine | 8 |
| `/bibliotheque` | Resultats | 6 |
| `/bibliotheque` | Vivante | 3 |
| `/bibliotheque/article-design` | ALireEnsuite | 3 |
| `/bibliotheque/new-article-page` | ALireEnsuite | 3 |
| `/bibliotheque/avocat-e-commerce` | ALireEnsuite | 3 |
| `.../service-page` | ALireEnsuite | 3 |

Every one reads `none` at rest, `rgba(0,0,0,0.1) 0px 14px 34px` on hover and
`none` again on leaving. On the home page the other eleven `Card` grids still
resolve to 17, unchanged.

- **What counts as an article card**: a piece of content with a title, a meta
  or date line and a read link. `Vivante`'s three dated updates are in;
  `ParCategorie`'s nine category tiles and `Parcours`' three reading paths are
  **not** — they are navigation, not content. Nor are the article body's
  `JurList`, `Ladder`, `Cabinet` or `Rail` cards, or the ALireEnsuite prev/next
  pair, which Figma draws flat.
- A shadow costs no layout, and that was checked rather than assumed: all six
  affected pages measure exactly what this file records — 5748, 6243, 19114,
  19832, 17602 and 17511.

## Hard rules

- **Tokens only.** No hardcoded hex, no arbitrary font sizes, no one-off spacing.
  All colours and text styles live in `src/app/globals.css` under `@theme static`.
- If a Figma value has **no matching token, stop and ask** — never invent one.
  (`--text-nav` was one of these and has since been **deleted**: it was an
  invented Inter Medium 16 that no Figma style ever backed, and the redesigned
  Contentieux Forfaits removed its last call site.)
  Tokens added this way so far: `--text-h2-sm`, `--radius-card`,
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
  same case: a named Figma style with no matching token) — and
  `--text-overline-tight` (Poppins SemiBold 16 / 1.3125 / **0.14em**, the
  consultation drawer's overline; asked before adding, because it is the one
  overline in the file that is not +18% and the difference is load-bearing:
  at 0.18em its string overruns its 412px slot and wraps).
  Plus `--color-mint` (#44cba1) — Figma's own "Petroff/Mint" library
  style, the redesigned home hero's laurel branch; added under the same
  named-style precedent, not invented.
  Then `--color-pale-mint` (#e8f5f1, "Petroff/Pale_Mint") and `--color-pink`
  (#fac5ef, "Petroff/Pink", only ever drawn at 40%) for the redesigned
  Expertises card tiles — same precedent again.
  And `--color-pale-rose` (#edc2dc, the article trap callout, always at 30%) —
  **asked about**, because unlike those four it is a raw fill, not a named style.
  And `--color-pink-soft` (#f0d5dd, the e-commerce tag chips, always at 40%) —
  **asked about**, because Figma gives it the *same* library name as
  `--color-pink` (#fac5ef) with a different hex, so repointing the existing
  token would have recoloured the Expertises tiles unasked.
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
  `/expertises/contrats-commerciaux`, `/bibliotheque`,
  `/bibliotheque/article-design` and `/bibliotheque/avocat-e-commerce`.
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
5. **A class added to a file *after* its first compile may not reach the
   stylesheet.** Turbopack recompiles the component — the new class appears in
   the DOM — but Tailwind does not rescan, so the rule is simply absent and the
   element silently keeps its old geometry. `touch`ing a file does not fix it;
   a **content** change to `globals.css` does, and is far cheaper than the
   `rm -rf .next` remedy. Probe with an *empty* `<div>`: an ungenerated class
   measures 0px, where a div with text misleads you with its content height.
6. `npx tsc --noEmit` exits **1 with no diagnostics at all** under the
   agent sandbox, which reads as a failing typecheck and is not one. Run
   `node ./node_modules/typescript/lib/tsc.js --noEmit` instead — that reports
   the real result.
7. Build, then **measure the rendered DOM against the spec** by driving Chrome
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
  field, its Vitrine carousel, its Resultats filters, and the article's
  `Consultation` wrapper with its drawer, side tab and sticky bar.
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
- The phone number "+ 33 (0) 1 78 90 46 46" now appears in **four** places:
  the home CTAFinal lead, the Expertises CTAFinal's second lead line
  (`contact`, shared through `ContactCta`), the article's sticky bar detail
  line, and the consultation drawer's "Vous préférez appeler ?" line. The
  drawer's is its own string because only the number is periwinkle there,
  which `ContactCta.contact` cannot express. All are plain text, not `tel:`
  links, and the header phone control is still inert — wire all of them up
  together if that number is real. Its spaces are
  ordinary, unlike the U+202F in "24 h".
- SearchBand submit and the OpenData SIREN form are inert placeholders. The
  popular chips prefill the search field instead of navigating.
- The consultation drawer's "Soumettre votre demande" is inert, like every
  other form on the site. It is the site's first modal, so it is also the
  first place a real submit handler would need somewhere to POST to.
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
