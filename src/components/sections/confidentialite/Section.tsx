import { cn } from "@/lib/utils";
import type { Block } from "@/lib/confidentialite";

/**
 * The document's one inline run — `<s>…</s>`, Inter SemiBold 18 in
 * full-strength encre against the surrounding encre/62 or plain body.
 *
 * The copy is static source text rather than user input, and it holds well
 * over a hundred strings, so it is split here instead of being routed through
 * `t.rich` — which would need a literal message path per string and would put
 * the document's whole structure into a lib file to get them.
 */
function inline(text: string) {
  return text.split(/(<s>.*?<\/s>)/g).map((part, i) =>
    part.startsWith("<s>") ? (
      <span key={i} className="text-body-strong text-encre">
        {part.slice(3, -4)}
      </span>
    ) : (
      part
    ),
  );
}

/** A 9px dot. Figma draws it as a 9x27 SVG in pale periwinkle; it is **gold**
    here under the site-wide bullet rule, and a span rather than a file since
    its geometry is `bullet-mark.svg`'s. Its own 27 box is kept — that is this
    frame's, and it sets the row height. `mt-2.25` puts it on the first line
    where Figma's `items-end` would drop it to the last one as soon as an item
    wraps. */
function Bullet() {
  return (
    <span
      aria-hidden="true"
      className="bg-gold mt-2.25 size-2.25 shrink-0 rounded-full"
    />
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-body text-encre">{inline(block.text)}</p>;

    case "note":
      return <p className="text-body text-encre/62">{inline(block.text)}</p>;

    case "sub":
      return <h3 className="text-h3 text-encre">{block.text}</h3>;

    case "list":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            /* min-h 27 is Figma's puce box, which sets the row height for a
               one-line item; a wrapped item is taller than that anyway, so
               this matches the comp without the `items-end` misbehaviour. */
            <li key={i} className="flex min-h-6.75 items-start gap-4">
              <Bullet />
              <p className="text-body text-encre min-w-0 flex-1">{inline(item)}</p>
            </li>
          ))}
        </ul>
      );

    case "dl":
      return (
        <dl className="flex flex-col">
          {block.rows.map((row, i) => (
            <div
              key={i}
              /* cn, never string concatenation: a trailing space inside a
                 quoted class fragment is exactly the kind of thing a formatter
                 removes, and `border-t` + `flex` then merge into one dead
                 class. That silently stacked every row here. */
              className={cn(
                "flex flex-col gap-2 sm:flex-row sm:gap-6",
                row.header ? "bg-lilas-2 border-stone border-t p-4" : "py-3",
                !row.header && row.rule && "border-stone border-t",
              )}
            >
              <dt
                className={
                  row.header
                    ? "text-overline font-poppins text-encre/62 uppercase sm:w-60 sm:shrink-0"
                    : "text-body-strong text-encre sm:w-60 sm:shrink-0"
                }
              >
                {row.label}
              </dt>
              <dd
                className={cn(
                  "min-w-0 flex-1",
                  row.header
                    ? "text-overline font-poppins text-encre/62 uppercase"
                    : row.strong
                      ? "text-body-strong text-encre"
                      : "text-body text-encre/62",
                )}
              >
                {inline(row.value)}
              </dd>
            </div>
          ))}
          {block.ruleAfter ? <div className="bg-stone h-px w-full" /> : null}
        </dl>
      );

    case "callout":
      return (
        <div
          className={`flex flex-col gap-2 border-l-3 px-6 py-5 ${
            block.tone === "red"
              ? "bg-pink-soft/40 border-red"
              : "bg-pale-gold border-brique"
          }`}
        >
          <p className="text-body-strong text-encre">{block.title}</p>
          <p className="text-small text-encre leading-6">{block.body}</p>
        </div>
      );
  }
}

/**
 * One numbered section of the policy — Figma's `S01`-`S18`.
 *
 * A 20px column, opened by a 1px `stone` rule on every section but the first
 * (the page rule under the hero serves there), then a 12px baseline head row:
 * the number in `text-rose` beside a Poppins Bold 30 title, i.e. `text-price`.
 */
export function Section({
  id,
  num,
  title,
  blocks,
  rule,
}: {
  id: string;
  num: string;
  title: string;
  blocks: Block[];
  rule: boolean;
}) {
  return (
    <section
      id={id} /* Figma marks every section frame word-break: break-word. It is
         inherited, and it is what keeps a bare URL such as
         tools.google.com/dlpage/gaoptout inside a 320 viewport. */
      className="flex scroll-mt-6 flex-col gap-5 break-words"
    >
      {rule ? <div className="bg-stone h-px w-full" /> : null}

      <div className="flex items-baseline gap-3">
        <p aria-hidden="true" className="text-h4 font-poppins text-rose shrink-0">
          {num}
        </p>
        <h2 className="text-price font-poppins text-encre min-w-0 flex-1">{title}</h2>
      </div>

      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </section>
  );
}
