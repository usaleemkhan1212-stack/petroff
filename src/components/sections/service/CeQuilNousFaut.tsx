import { Fragment } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ClockIcon from "@/assets/icons/clock.svg";
import DocumentIcon from "@/assets/icons/document.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import TrendingUpIcon from "@/assets/icons/trending-up.svg";
import photo from "@/assets/images/associe-laptop-columns.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * The four families of documents, in Figma's order.
 *
 * **Figma draws these icons as SF Symbols placeholders too** — `text.document`,
 * `menucard`, `chart.line.uptrend.xyaxis`, `clock` — at 22px, so no artwork is
 * exported. Mapped to the nearest library glyphs and rendered at their native
 * 26, which is what every other 52px tile on the site carries. **Needs the
 * designer's own choices**, like the nine in "Quand faire appel".
 */
const families = [
  { key: "statuts", Icon: DocumentIcon, tone: "bg-pale-blue" },
  { key: "registre", Icon: FileLinesIcon, tone: "bg-pale-gold" },
  { key: "comptes", Icon: TrendingUpIcon, tone: "bg-pale-mint" },
  { key: "objectif", Icon: ClockIcon, tone: "bg-pink-soft/40" },
] as const;

/**
 * Figma `13445:21585` — "Ce qu'il nous faut pour résoudre votre litige".
 *
 * Four columns split by dashed rules, then a 610 photo beside a closing block.
 * The section carries no fill of its own, so it sits on the page's lilas.
 */
export function CeQuilNousFaut() {
  const t = useTranslations("ServicePage.documents");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="flex flex-col gap-3">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62 max-w-170">{t("lead")}</p>
          </div>

          {/* Four columns on a 36px gap with a dashed rule between each — the
              rule is its own flex item in Figma, so the visual space around it
              is 36 either side. Below xl the rules drop and it becomes a grid. */}
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:flex xl:gap-9">
            {families.map(({ key, Icon, tone }, i) => (
              <Fragment key={key}>
                {i > 0 && (
                  <li
                    aria-hidden="true"
                    className="border-encre/10 hidden self-stretch border-l border-dashed xl:block"
                  />
                )}
                <li className="flex flex-col items-start gap-4 xl:flex-1">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "rounded-tile flex size-13 shrink-0 items-center justify-center",
                      tone,
                    )}
                  >
                    <Icon className="text-encre" />
                  </span>
                  <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                  <p className="text-body text-encre/62">
                    {t(`items.${key}.body`)}
                  </p>
                </li>
              </Fragment>
            ))}
          </ul>

          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-16">
            <div className="aspect-[610/280] w-full max-w-152.5 shrink-0 overflow-hidden rounded-tl-[120px] rounded-tr-[10px] rounded-br-[60px] rounded-bl-[20px] xl:w-152.5">
              <Image
                src={photo}
                alt={t("imageAlt")}
                sizes="(min-width: 1280px) 610px, 100vw"
                className="h-full w-full object-cover"
              />
            </div>

            {/* No overline on this one — Figma gives it a title and lead only. */}
            <div className="flex min-w-0 flex-1 flex-col gap-9">
              <div className="flex flex-col gap-3">
                <h2 className="text-h2 text-encre">{t("closing.title")}</h2>
                <p className="text-body text-encre/62">{t("closing.lead")}</p>
              </div>
              <Button size="lg" className="self-start">
                {t("closing.cta")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
