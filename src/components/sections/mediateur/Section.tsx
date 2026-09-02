import { Bullet } from "@/components/ui/Bullet";
import { cn } from "@/lib/utils";
import type { Block } from "@/lib/mediateur";

/**
 * Figma draws every address on this page in periwinkle, and cannot express an
 * href — but here **the link text *is* the target**: a bare domain, or an
 * e-mail address. So these become real links rather than the periwinkle spans
 * the cookie policy's browser names stay as; nothing is invented, since the
 * destination is the string the comp already prints.
 *
 * A deliberate addition to the comp, and the obvious reading of a page whose
 * whole purpose is to tell a consumer how to reach the mediator.
 */
function linkFor(text: string) {
  if (text.includes("@")) return `mailto:${text}`;
  return /^https?:\/\//.test(text) ? text : `https://${text}`;
}

const linkClass =
  "text-periwinkle hover:underline focus-visible:outline-gold rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * The document's three inline runs.
 *
 * `<s>` is the weighted run — **Poppins SemiBold at the paragraph's own
 * 18/1.4**, as on the cookie policy and unlike the privacy policy's Inter. It
 * re-declares `text-encre`, because most of its occurrences sit inside an
 * encre/62 note where a run carrying no colour of its own inherits the 62% and
 * the weighting silently disappears.
 *
 * `<b>` is the callout's own weighted run, which is **Inter SemiBold 16** —
 * that box is 16px throughout, so it cannot share `<s>`.
 *
 * `<l>` is an address, linked to itself by `linkFor`.
 */
function inline(text: string) {
  return text.split(/(<s>.*?<\/s>|<b>.*?<\/b>|<l>.*?<\/l>)/g).map((part, i) => {
    if (part.startsWith("<s>")) {
      return (
        <span key={i} className="text-encre font-poppins font-semibold">
          {part.slice(3, -4)}
        </span>
      );
    }
    if (part.startsWith("<b>")) {
      return (
        <span key={i} className="font-semibold">
          {part.slice(3, -4)}
        </span>
      );
    }
    if (part.startsWith("<l>")) {
      const inner = part.slice(3, -4);
      return (
        <a key={i} href={linkFor(inner)} className={linkClass}>
          {inner}
        </a>
      );
    }
    return part;
  });
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-body text-encre">{inline(block.text)}</p>;

    case "note":
      return <p className="text-body text-encre/62">{inline(block.text)}</p>;

    case "proc":
      /* Ruled rows with no gap of their own: 20 of padding above and below,
         a 20px gap to the puce, and a `stone` rule above every row but the
         first. Figma's puce sits in a **9x27** box, which is what sets the
         height of a one-line row (27, not the text's 25) — so that box is
         restored as a `min-h`, exactly as on the privacy policy. */
      return (
        <ul className="flex flex-col">
          {block.items.map((item, i) => (
            <li
              key={i}
              className={cn(
                "flex min-h-6.75 items-start gap-5 py-5",
                i > 0 && "border-stone border-t",
              )}
            >
              <Bullet />
              <p
                className={cn(
                  "text-body min-w-0 flex-1",
                  block.tone === "note" ? "text-encre/62" : "text-encre",
                )}
              >
                {inline(item)}
              </p>
            </li>
          ))}
        </ul>
      );

    case "dl":
      /* Ruled above the first row and below every one. Its label column is
         **210** with a 16px gap here, where the cookie policy's is 240 with
         24 — and both sides are Inter 16, not the body's 18. */
      return (
        <dl className="border-stone flex flex-col border-t">
          {block.rows.map((row) => (
            <div
              key={row.label}
              className="border-stone flex flex-col gap-2 border-b py-3 sm:flex-row sm:gap-4"
            >
              <dt className="text-small-strong text-encre sm:w-52.5 sm:shrink-0">
                {row.label}
              </dt>
              <dd
                className={cn(
                  "text-small min-w-0 flex-1",
                  row.link ? "" : "text-encre/62",
                )}
              >
                {row.link ? (
                  <a href={linkFor(row.value)} className={linkClass}>
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "callout":
      /* Pale gold under a 3px gold left edge with the right corners rounded to
         12 — the cookie policy's callout, at **20/16 padding with a 16px
         title** rather than 24/20 with an 18px one. */
      return (
        <div className="bg-pale-gold border-gold rounded-r-field flex flex-col gap-2 border-l-3 px-5 py-4">
          <p className="text-small-strong text-encre">{block.title}</p>
          <p className="text-small text-encre">{inline(block.body)}</p>
        </div>
      );
  }
}

/**
 * One numbered section — Figma's `Section 01`-`Section 07`.
 *
 * A 20px column with **28 of padding above and below**, opened by a 1px
 * `stone` rule on every section but the first, which takes 16 above instead.
 * That is a third spelling of the same idea: the privacy policy puts its rule
 * in the column's own 20px gap and the cookie policy hangs 28 under it, where
 * this frame pads the section itself and puts the rule on its top edge.
 *
 * The head is a 12px baseline row — the number in `text-rose` at `text-h4`
 * beside a Poppins Bold 30 title.
 */
export function Section({
  id,
  num,
  title,
  blocks,
  first,
  smallTitle,
}: {
  id: string;
  num: string;
  title: string;
  blocks: Block[];
  first: boolean;
  smallTitle: boolean;
}) {
  return (
    <section
      id={id}
      /* Figma marks these frames word-break: break-word. It inherits, and it
         is what keeps the mediator's 55-character saisine URL inside a 320
         viewport. */
      className={cn(
        "flex scroll-mt-6 flex-col gap-5 break-words",
        first ? "pt-4 pb-7" : "border-stone border-t py-7",
      )}
    >
      {/* Figma marks this row `whitespace-nowrap`, which is an auto-layout
          artefact: every title fits on one line at 765 anyway, and keeping it
          would push the page wide on a phone — S05's is 743 of the 765. */}
      <div className="flex items-baseline gap-3">
        <p aria-hidden="true" className="text-h4 font-poppins text-rose shrink-0">
          {num}
        </p>
        {/* S03 alone is Poppins SemiBold 20 where the other six are Bold 30.
            Reproduced and flagged — almost certainly a slip in the comp. */}
        <h2
          className={cn(
            "font-poppins text-encre min-w-0 flex-1",
            smallTitle ? "text-h3" : "text-price",
          )}
        >
          {title}
        </h2>
      </div>

      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </section>
  );
}
