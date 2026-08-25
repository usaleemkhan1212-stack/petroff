import { useTranslations } from "next-intl";
import BulletMark from "@/assets/icons/bullet-mark.svg";
import { proseTags } from "@/components/sections/article/blocks/Prose";

const points = [
  "validite", "presomption", "equivalence", "denegation",
  "dossier", "forme", "contrat",
] as const;

/**
 * Figma's `takeaways`: the article's closing summary.
 *
 * **A light block since the redesign** (`13318:3062`) — lilas-2 ground, encre
 * title at H3 rather than H2, encre/62 body with full-encre lead-ins, and a
 * periwinkle bullet where it was gold. It used to be a dark encre panel.
 */
export function Takeaways({ title }: { title: string }) {
  const t = useTranslations("ArticlePage.takeaways");

  return (
    <div className="rounded-note-lg bg-lilas-2 p-5 sm:p-7">
      <h2 className="text-h3 text-encre">{title}</h2>
      <ul className="mt-4">
        {points.map((key) => (
          <li key={key} className="flex items-start gap-4.25 py-2.5">
            <BulletMark
              aria-hidden="true"
              width={9}
              height={27}
              className="shrink-0"
            />
            {/* Figma weights the lead-in at full encre inside an encre/62 line, which
                the shared proseTags cannot express — it leaves <b> to inherit. */}
            <p className="text-body text-encre/62 min-w-0 flex-1">
              {t.rich(key, {
                ...proseTags,
                b: (chunks) => (
                  <span className="text-h4 font-poppins text-encre">{chunks}</span>
                ),
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
