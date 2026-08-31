import type { FC, SVGProps } from "react";
import { useTranslations } from "next-intl";
import BalanceScale from "@/assets/icons/balance-scale.svg";
import FileLines from "@/assets/icons/file-lines.svg";
import ShieldCheck from "@/assets/icons/shield-check-wide.svg";
import { Container } from "@/components/ui/Container";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { cn } from "@/lib/utils";

/*
  Left `as const satisfies` so the keys stay literal — a `key: string` widens
  `t(`items.${key}.title`)` into a plain template string, which next-intl's
  typed catalogue rejects.

  `price` is the middle card's terms line only: Figma sets that one in H4
  encre because it is an amount, where the other two are ordinary body copy.
*/
const prestations = [
  {
    key: "cadrage",
    Icon: FileLines,
    tone: "bg-pale-blue",
    href: "/prestations/cadrage-signature",
    price: false,
  },
  {
    key: "audit",
    Icon: ShieldCheck,
    tone: "bg-pale-gold",
    href: "/prestations/audit-preuve",
    price: true,
  },
  {
    key: "defense",
    Icon: BalanceScale,
    tone: "bg-pale-blue",
    href: "/prestations/defense-acte",
    price: false,
  },
] as const satisfies readonly {
  key: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  tone: string;
  href: string;
  price: boolean;
}[];

/**
 * The article's Cabinet band: what the firm actually does about signature,
 * as three prestations with their billing stated, over a footnote row.
 *
 * Its head is written out rather than using `SectionHeading` — Figma puts
 * 10px under the overline and 14px under the title where that component uses
 * one gap for both, and its lead is `text-small` at full width, not the
 * `text-body max-w-160` default.
 */
export function Cabinet() {
  const t = useTranslations("ArticlePage.cabinet");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <p className="text-overline font-poppins text-brique uppercase">
          {t("overline")}
        </p>
        <h2 className="text-h2 text-encre mt-2.5">{t("title")}</h2>
        <p className="text-small text-encre/62 mt-3.5">{t("lead")}</p>

        {/* 3 -> 1. Figma clips the row; the cards flex to equal height. */}
        <ul className="mt-11 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {prestations.map(({ key, Icon, tone, href, price }) => (
            <li key={key} className="flex">
              <div className="rounded-note-lg border-encre/8 flex min-w-0 flex-1 flex-col gap-2 border bg-white p-5 sm:p-7">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-2xl",
                    tone,
                  )}
                >
                  <Icon className="text-encre" width={26} height={26} />
                </span>
                <span aria-hidden="true" className="h-2" />

                <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                <p className="text-body text-encre/62">
                  {t(`items.${key}.description`)}
                </p>
                <span aria-hidden="true" className="h-1.5" />

                <p
                  className={
                    price
                      ? "text-h4 font-poppins text-encre"
                      : "text-body text-encre/62"
                  }
                >
                  {t(`items.${key}.terms`)}
                </p>
                <p className="text-body text-encre/62">{t(`items.${key}.note`)}</p>

                <MaybeLink
                  href={href}
                  className="text-button font-poppins text-brique hover:text-encre inline-flex items-center gap-2 self-start transition-colors"
                >
                  {t("cta")}
                  <span aria-hidden="true">&rarr;</span>
                </MaybeLink>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-6 pt-6.5">
          <p className="text-body-strong text-encre/62 min-w-0 flex-1">
            {t("footnote")}
          </p>
          <MaybeLink
            href="/prestations"
            className="text-button font-poppins text-brique hover:text-encre inline-flex items-center gap-2 transition-colors"
          >
            {t("allLink")}
            <span aria-hidden="true">&rarr;</span>
          </MaybeLink>
        </div>
      </Container>
    </section>
  );
}
