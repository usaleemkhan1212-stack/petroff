import { useTranslations } from "next-intl";
import BulletMark from "@/assets/icons/bullet-mark.svg";
import { proseTags } from "@/components/sections/article/blocks/Prose";

const points = [
  "validite", "presomption", "equivalence", "denegation",
  "dossier", "forme", "contrat",
] as const;

/** Figma's `takeaways`: the article's closing summary, on an encre ground. */
export function Takeaways({ title }: { title: string }) {
  const t = useTranslations("ArticlePage.takeaways");

  return (
    <div className="rounded-note-lg bg-encre p-7">
      <h2 className="text-h2 text-white">{title}</h2>
      <ul className="mt-4">
        {points.map((key) => (
          <li key={key} className="flex items-start gap-4.25 py-2.5">
            <BulletMark
              aria-hidden="true"
              width={9}
              height={27}
              className="shrink-0"
            />
            <p className="text-body min-w-0 flex-1 text-white/70">
              {t.rich(key, proseTags)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
