import { MaybeLink } from "@/components/ui/MaybeLink";

/**
 * One ruled row of the page's two "vigil" lists — "Aller plus loin"
 * (`13445:24956`) and "Thèmes liés" (`13445:24999`).
 *
 * Figma draws the two sections with identical row anatomy and only different
 * labels, so the markup lives here once: a title and body on an 8px gap, then
 * 18 to a CTA row carrying a periwinkle link and a brique label, all closing
 * on an `encre/10` rule with no gap between rows.
 */
export function LinkRow({
  title,
  body,
  cta,
  secondary,
  href,
}: {
  title: string;
  body: string;
  cta: string;
  secondary: string;
  href: string;
}) {
  return (
    <li className="border-encre/10 flex flex-col gap-4.5 border-b py-4.5">
      <div className="flex flex-col gap-2">
        <h3 className="text-h3 text-encre">{title}</h3>
        <p className="text-body text-encre/62">{body}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Inert until these pages exist — MaybeLink renders a span for a
            route that is not live. */}
        <MaybeLink
          href={href}
          className="text-body-strong text-periwinkle hover:text-encre inline-flex items-center gap-2 transition-colors"
        >
          {cta}
          <span aria-hidden="true">&rarr;</span>
        </MaybeLink>
        <span className="text-body text-brique">{secondary}</span>
      </div>
    </li>
  );
}
