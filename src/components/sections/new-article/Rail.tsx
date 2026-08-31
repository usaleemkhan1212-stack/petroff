"use client";

import { ConsultTrigger } from "@/components/consultation/ConsultButton";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SealRibbon from "@/assets/icons/seal-ribbon.svg";
import railPortrait from "@/assets/images/lawyer-portrait-rail.jpg";
import { cn } from "@/lib/utils";

/** The ten table-of-contents entries, in Figma's order and their anchor ids. */
const toc = [
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
 * Figma's `rail` (`13318:3093`): a 300px column beside the article — a
 * contents list on a 2px left rule, a rule, then the pinned CTA card, author
 * card and verification line.
 *
 * **Sticky, and capped at the viewport.** `sticky top-6 self-start` is the
 * pair that works: in a flex row the default `stretch` would make the rail as
 * tall as the 14,000px article and leave nothing to stick. Its content is
 * taller than a short viewport, so it scrolls internally with the bar hidden —
 * scroll chaining is deliberately left on, so at either end the page takes
 * over and the reader is never trapped.
 *
 * **The active marker moves as you read.** Figma marks only the first entry
 * gold, which is a state, not a fixed style; a highlight that never moved
 * would be worse than none. That is the one behaviour here Figma does not
 * draw.
 *
 * Figma renders the last entry, "Questions fréquentes", at Poppins Bold 40 —
 * the section-title style leaking into a list item. Built like the other nine.
 */
export function Rail() {
  const t = useTranslations("ArticlePage.rail");
  const page = useTranslations("NewArticlePage.rail");
  const [active, setActive] = useState<string>(toc[0]);

  useEffect(() => {
    const targets = toc
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const spy = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-10% 0px -75% 0px" },
    );

    targets.forEach((el) => spy.observe(el));
    return () => spy.disconnect();
  }, []);

  return (
    <aside className="no-scrollbar sticky top-6 hidden max-h-[calc(100vh-3rem)] w-75 shrink-0 self-start overflow-y-auto bg-white pb-24 xl:block">
      <nav className="pb-4" aria-label={t("tocLabel")}>
        <p className="text-button font-poppins text-encre/62">{t("tocLabel")}</p>
        <ol className="pt-3.5">
          {toc.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={cn(
                  "text-small text-encre/62 hover:text-encre block border-l-2 py-2 pl-4 transition-colors",
                  active === id ? "border-gold" : "border-encre/10",
                )}
              >
                {t(`toc.${id}`)}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div aria-hidden="true" className="bg-encre/10 h-px w-full" />

      <div className="flex flex-col gap-3.5 pt-4">
        <div className="rounded-card bg-lilas-2 flex flex-col gap-2 p-5">
          <p className="text-h4 font-poppins text-encre">{t("ctaTitle")}</p>
          <p className="text-small text-encre/62">{t("ctaBody")}</p>
          {/* Inert, like every CTA on the site until its route exists. */}
          <ConsultTrigger className="text-button font-poppins bg-gold w-full rounded-full py-3 text-center text-white">
            {t("ctaButton")}
          </ConsultTrigger>
          <p className="text-small text-encre/62">{t("ctaNote")}</p>
        </div>

        <div className="rounded-note-lg border-encre/8 flex flex-col items-center border bg-white p-7">
          <div className="relative h-35 w-full overflow-hidden rounded-tl-[59.854px] rounded-tr-[2.993px] rounded-br-[29.927px] rounded-bl-[17.956px]">
            <Image
              src={railPortrait}
              alt={t("authorPhotoAlt")}
              fill
              sizes="244px"
              className="object-cover"
            />
          </div>
          <span aria-hidden="true" className="h-3" />
          <p className="text-h3 font-poppins text-encre text-center">
            {t("authorName")}
          </p>
          <p className="text-small text-encre/62 text-center">{t("authorRole")}</p>
          <span aria-hidden="true" className="h-2.5" />
          <ConsultTrigger className="text-button font-poppins text-encre border-encre w-full rounded-full border-[1.5px] px-4.5 py-2.75 text-center">
            {t("authorCta")}
          </ConsultTrigger>
        </div>

        {/* Figma drops the old "Signaler une inexactitude" link, and writes the
            masculine "Vérifié". */}
        <p className="text-body-strong text-encre flex items-center justify-center gap-2.5">
          <SealRibbon aria-hidden="true" width={19.13} height={30} />
          {page("verified")}
        </p>
      </div>
    </aside>
  );
}
