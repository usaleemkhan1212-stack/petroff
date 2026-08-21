"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SealRibbon from "@/assets/icons/seal-ribbon.svg";
import authorPhoto from "@/assets/images/lawyer-portrait-square.jpg";
import { cn } from "@/lib/utils";

/** Anchor ids on the article's section headings, in reading order. */
export const tocSections = [
  "answer",
  "ecrit",
  "niveaux",
  "cmp",
  "juge",
  "denie",
  "forme",
  "organiser",
  "textes",
  "faq",
] as const;

/**
 * The 300px rail beside the article: a table of contents, a CTA card, the
 * author and a verification line.
 *
 * **Sticky**, which is the whole point of a 1167px rail beside a 14,000px
 * column — `self-start` is what lets it be, since the row's default stretch
 * would make it as tall as the article and leave nothing to stick.
 *
 * It takes **no height cap and no internal scroll**. A sticky element unpins
 * when its containing block ends, so the rail rides up with the page over the
 * last screenful and its whole height — author card and verification line
 * included — is on screen by the end of the section. Capping it at the
 * viewport instead pinned it forever and buried that bottom behind an
 * internal scrollbar the reader had to find.
 *
 * Its bottom padding clears the **sticky bar**, which is fixed over the last
 * 78px of the viewport by the time the rail releases: at `pb-4` the
 * verification line unpinned directly underneath it.
 *
 * Client-side only for the scroll-spy: Figma marks the first entry active with
 * a gold edge, and a highlight that never moved would be worse than none.
 */
export function Rail() {
  const t = useTranslations("ArticlePage.rail");
  const [active, setActive] = useState<string>(tocSections[0]);

  useEffect(() => {
    const headings = tocSections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const onScroll = () => {
      /* The last heading whose top has passed the reading line. */
      const line = window.innerHeight * 0.25;
      let current = headings[0];
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= line) current = el;
      }
      setActive(current.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="sticky top-6 hidden w-75 shrink-0 self-start pb-24 xl:block">
      <nav aria-label={t("tocLabel")}>
        <p className="text-button font-poppins text-encre/62">{t("tocLabel")}</p>
        <ul className="pt-3.5">
          {tocSections.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                className={cn(
                  "text-small block border-l-2 py-2 pl-4 transition-colors",
                  active === id
                    ? "border-gold text-encre"
                    : "border-encre/10 text-encre/62 hover:text-encre",
                )}
              >
                {t(`toc.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-encre/10 mt-4 h-px w-full" />

      <div className="flex flex-col gap-3.5 pt-4">
        <div className="rounded-card bg-lilas-2 flex flex-col gap-2 p-5">
          <p className="text-h4 font-poppins text-encre">{t("ctaTitle")}</p>
          <p className="text-small text-encre/62">{t("ctaBody")}</p>
          <span className="text-button font-poppins bg-gold rounded-full py-3 text-center text-white">
            {t("ctaButton")}
          </span>
          <p className="text-small text-encre/62">{t("ctaNote")}</p>
        </div>

        <div className="rounded-note-lg border-encre/8 flex flex-col items-center border bg-white p-7">
          <Image
            src={authorPhoto}
            alt={t("authorPhotoAlt")}
            sizes="90px"
            className="size-22.5 rounded-full object-cover opacity-90"
          />
          <p className="text-h3 text-encre font-poppins mt-3 text-center">
            {t("authorName")}
          </p>
          <p className="text-small text-encre/62 text-center">{t("authorRole")}</p>
          <span className="text-button font-poppins text-encre border-encre mt-2.5 w-full rounded-full border-[1.5px] px-4.5 py-2.75 text-center">
            {t("authorCta")}
          </span>
        </div>

        <p className="text-small text-encre/62 flex items-center gap-2.5">
          <SealRibbon aria-hidden="true" width={19.13} height={30} className="shrink-0" />
          <span className="min-w-0 flex-1">
            {t.rich("verified", {
              b: (chunks) => (
                <span className="text-button font-poppins text-encre">{chunks}</span>
              ),
              link: (chunks) => (
                <span className="text-small-strong text-periwinkle">{chunks}</span>
              ),
            })}
          </span>
        </p>
      </div>
    </aside>
  );
}
