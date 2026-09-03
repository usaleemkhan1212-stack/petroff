import { MaybeLink } from "@/components/ui/MaybeLink";
import { cn } from "@/lib/utils";
import type { Block } from "@/lib/mentions";

/**
 * An address links to itself — `mailto:` when it holds an `@`, otherwise
 * `https://` plus the text. Figma draws these in periwinkle and cannot express
 * an href, but the destination is the string the comp already prints, so
 * nothing is invented. Same call as the mediation notice.
 */
function linkFor(text: string) {
  if (text.includes("@")) return `mailto:${text}`;
  return /^https?:\/\//.test(text) ? text : `https://${text}`;
}

const linkClass =
  "text-periwinkle hover:underline focus-visible:outline-gold rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2";

/** The three internal pages this document points at. All three exist. */
const routes = { c: "/confidentialite", k: "/cookies", n: "/mediateur-consommation" };

/**
 * The document's five inline runs.
 *
 * `<s>` is the weighted run — **Poppins SemiBold at the paragraph's own
 * 18/1.4**, as on the cookie policy and the mediation notice. It re-declares
 * `text-encre`, because half of its occurrences sit inside an encre/62 note
 * where a run carrying no colour of its own inherits the 62% and the weighting
 * silently disappears.
 *
 * `<b>` is the callout's own weighted run, Inter SemiBold 16 — that box is
 * 16px throughout, so it cannot share `<s>`.
 *
 * `<l>` is an address, linked to itself. `<c>`, `<k>` and `<n>` are the three
 * sibling legal pages.
 */
function inline(text: string) {
  return text
    .split(/(<s>.*?<\/s>|<b>.*?<\/b>|<l>.*?<\/l>|<[ckn]>.*?<\/[ckn]>)/g)
    .map((part, i) => {
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
      const tag = part.match(/^<([ckn])>/)?.[1];
      if (tag) {
        return (
          <MaybeLink
            key={i}
            href={routes[tag as keyof typeof routes]}
            className={linkClass}
          >
            {part.slice(3, -4)}
          </MaybeLink>
        );
      }
      return part;
    });
}

/** Pale gold under a gold edge, or pink at 40% under a red one. Both round
    their two right corners to 12, as on the cookie policy. */
const calloutTones = {
  gold: "bg-pale-gold border-gold",
  red: "bg-pink-soft/40 border-red",
};

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-body text-encre">{inline(block.text)}</p>;

    case "note":
      return <p className="text-body text-encre/62">{inline(block.text)}</p>;

    case "dl":
      /* Ruled above the first row and below every one. A 240 label on a 24px
         gap in Inter 18 — the cookie policy's list, not the mediation
         notice's 210-on-16 in Inter 16. */
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

    case "callout":
      return (
        <div
          className={cn(
            "rounded-r-field flex flex-col gap-2 border-l-3 px-6 py-5",
            calloutTones[block.tone],
          )}
        >
          <p className="text-body-strong text-encre">{block.title}</p>
          <p className="text-small text-encre leading-6">{inline(block.body)}</p>
        </div>
      );
  }
}

/**
 * One numbered section — Figma's `S01`-`S14`.
 *
 * A 20px column opened by a 1px `stone` rule carrying 28 beneath it. **Every
 * section has that rule, S01 included** — where the cookie policy leaves its
 * first bare, because its hero closes on nothing either. This hero also closes
 * on nothing, so the document's own first rule is what separates the two.
 *
 * The head is a 12px baseline row: the number in `text-rose` at `text-h4`
 * beside a Poppins Bold 30 title.
 */
export function Section({
  id,
  num,
  title,
  blocks,
}: {
  id: string;
  num: string;
  title: string;
  blocks: Block[];
}) {
  return (
    <section
      id={id}
      /* Figma marks every section frame word-break: break-word. It inherits,
         and it is what keeps a long token such as the hosting contact's URL
         inside a 320 viewport. */
      className="flex scroll-mt-6 flex-col gap-5 break-words"
    >
      <div className="border-stone flex items-baseline gap-3 border-t pt-7">
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
