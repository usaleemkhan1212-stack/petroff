import { Bullet } from "@/components/ui/Bullet";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { cn } from "@/lib/utils";
import type { Block, TagTone } from "@/lib/cookies";

/**
 * The document's two inline runs.
 *
 * `<s>` is the weighted run — and it is **Poppins SemiBold at the paragraph's
 * own 18/1.4**, where the privacy policy's is Inter SemiBold 18/1.5. It always
 * re-declares `text-encre`, because half of its occurrences sit inside an
 * encre/62 note where it would otherwise inherit the 62% and disappear — the
 * `proseTags` trap CLAUDE.md records.
 *
 * `<c>` is the one link in the document, to the privacy policy, which Figma
 * draws in periwinkle in S08.
 *
 * The copy is static source text rather than user input, and it holds a
 * hundred-odd strings, so it is split here instead of being routed through
 * `t.rich` — which would need a literal message path per string.
 */
function inline(text: string) {
  return text.split(/(<s>.*?<\/s>|<c>.*?<\/c>)/g).map((part, i) => {
    if (part.startsWith("<s>")) {
      return (
        <span key={i} className="text-encre font-poppins font-semibold">
          {part.slice(3, -4)}
        </span>
      );
    }
    if (part.startsWith("<c>")) {
      return (
        <MaybeLink
          key={i}
          href="/confidentialite"
          className="text-periwinkle transition-colors hover:underline"
        >
          {part.slice(3, -4)}
        </MaybeLink>
      );
    }
    return part;
  });
}

/**
 * The category pill's two grounds. Its copy is stored in natural case and
 * uppercased here, per the site-wide eyebrow rule.
 */
const tagTones: Record<TagTone, string> = {
  essential: "bg-pale-blue",
  audience: "bg-pale-gold",
};

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-body text-encre">{inline(block.text)}</p>;

    case "note":
      return <p className="text-body text-encre/62">{inline(block.text)}</p>;

    case "list":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            /* Figma's puce here is the shared 9x20 box, not the privacy
               page's 9x27, and a one-line row is 25 tall — set by the text,
               not the box — so this list needs no `min-h` of its own. */
            <li key={i} className="flex items-start gap-4">
              <Bullet />
              <p
                className={cn(
                  "text-body min-w-0 flex-1",
                  /* S06's four browser names are periwinkle. Figma styles them
                     as links and gives them no targets, so they stay spans —
                     the rule the article citations follow. */
                  block.tone === "link" ? "text-periwinkle" : "text-encre",
                )}
              >
                {inline(item)}
              </p>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        /* Four named columns of legal text — a real table, with a row and
           column scope. Its 170 / flex / 150 / 90 columns are the comp's, and
           it scrolls inside its own container below ~660px rather than
           crushing them; the handling the article comparison table gets. */
        <div className="-mx-1 overflow-x-auto px-1">
          <table className="w-full min-w-164.5 table-fixed border-collapse text-left">
            {/* Figma's row is four cells on a 16px gap — 170 / flex / 150 /
                90 — so the three fixed tracks each carry that gap as their own
                left padding and are 16 wider than the cell they hold. 170 +
                323 + 166 + 106 is the column's 765, leaving 307 of content in
                the Finalite cell, which is Figma's own number. */}
            <colgroup>
              <col className="w-42.5" />
              <col />
              <col className="w-41.5" />
              <col className="w-26.5" />
            </colgroup>
            <thead>
              <tr className="border-stone border-b">
                {block.head.map((cell, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={cn(
                      "text-small-strong text-brique pb-2.5 align-top font-semibold",
                      i > 0 && "pl-4",
                    )}
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.name} className="border-stone border-b">
                  <th
                    scope="row"
                    className="text-small-strong text-encre py-3 align-top font-semibold"
                  >
                    {row.name}
                  </th>
                  <td className="text-small text-encre/62 py-3 pl-4 align-top">
                    {row.purpose}
                  </td>
                  <td className="py-3 pl-4 align-top">
                    <span
                      className={cn(
                        "text-tag font-poppins text-encre inline-block rounded-full px-2.5 py-1 uppercase",
                        tagTones[row.tone],
                        /* Figma stretches the third pill across its whole cell
                           — see the `fill` note in lib/cookies.ts. */
                        row.fill && "block w-full",
                      )}
                    >
                      {row.category}
                    </span>
                  </td>
                  <td className="text-small text-encre/62 py-3 pl-4 align-top">
                    {row.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout":
      /* Pale gold under a 3px **gold** left edge, with the two right corners
         rounded to 12. The privacy policy's gold callout has a brique edge and
         no radius at all — two frames, two callouts; read each. */
      return (
        <div className="bg-pale-gold border-gold rounded-r-field flex flex-col gap-2 border-l-3 px-6 py-5">
          <p className="text-body-strong text-encre">{block.title}</p>
          <p className="text-small text-encre leading-6">{block.body}</p>
        </div>
      );

    case "dl":
      /* Ruled above the first row and below every one, so four rows carry five
         rules. A 240 label beside a 24 gap, stacking below `sm`. */
      return (
        <dl className="border-stone flex flex-col border-t">
          {block.rows.map((row) => (
            <div
              key={row.label}
              className="border-stone flex flex-col gap-2 border-b py-3 sm:flex-row sm:gap-6"
            >
              <dt className="text-body-strong text-encre sm:w-60 sm:shrink-0">
                {row.label}
              </dt>
              <dd
                className={cn(
                  "min-w-0 flex-1",
                  row.strong
                    ? "text-body-strong text-encre"
                    : "text-body text-encre/62",
                )}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

/**
 * One numbered section of the policy — Figma's `S01`-`S08`.
 *
 * A 20px column opened by a 1px `stone` rule on every section but the first
 * (nothing precedes it there — this hero draws no closing rule). **That rule
 * carries 28px beneath it**, where the privacy page's sits in the column's own
 * 20px gap.
 *
 * The head is a 12px baseline row: the number in `text-rose` at `text-h4`
 * beside a Poppins Bold 30 title, i.e. `text-price`.
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
      id={id}
      /* Figma marks every section frame word-break: break-word. It inherits,
         and it is what keeps a long token such as the consent cookie's name or
         an e-mail address inside a 320 viewport. */
      className="flex scroll-mt-6 flex-col gap-5 break-words"
    >
      <div
        className={cn(
          "flex items-baseline gap-3",
          rule && "border-stone border-t pt-7",
        )}
      >
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
