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

### Page 4 — redesign check and responsive pass

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
| 3 | Notre rôle | `13331:11795` | 1155 | |
| 4 | Quand consulter | `13331:11924` | 944 | |
| 5 | Comment nous aidons | `13331:11970` | 4432 | |
| 6 | Forfaits | `13331:12906` | 988 | |
| 7 | Comment ça marche | `13331:12970` | 1159 | |
| 8 | Comprendre le droit | `13331:13264` | 2221 | |
| 9 | FAQ | `13331:13351` | 844 | |
| 10 | Interlocuteurs | `13331:11124` | 996 | |
| 11 | ALireEnsuite | `13331:11178` | 818 | |
| 12 | Transparence | `13331:11268` | 370 | |
| 13 | CTAFinal | `13331:11276` | 550 | |
| + | sidetab | `13331:11356` | 45x236 | |

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
