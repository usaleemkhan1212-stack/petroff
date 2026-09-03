import Image from "next/image";
import { useTranslations } from "next-intl";
import Factory from "@/assets/icons/factory.svg";
import Flask from "@/assets/icons/flask.svg";
import Gem from "@/assets/icons/gem.svg";
import GlobeMeridians from "@/assets/icons/globe-meridians.svg";
import MonitorCode from "@/assets/icons/monitor-code.svg";
import ShoppingBag from "@/assets/icons/shopping-bag.svg";
import Truck from "@/assets/icons/truck.svg";
import Warehouse from "@/assets/icons/warehouse.svg";
import photo from "@/assets/images/city-square-steps.jpg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";
import { secteurRows } from "@/lib/le-cabinet";
import { cn } from "@/lib/utils";

const icons = {
  transport: Truck,
  commerce: GlobeMeridians,
  industrie: Factory,
  ecommerce: ShoppingBag,
  pharma: Flask,
  tech: MonitorCode,
  b2b: Warehouse,
  consommation: Gem,
} as const;

/**
 * Figma `13701:23684` — "Secteurs", a white band on `py-96`: the head, then a
 * 470 photo column beside a 679 list of eight sectors.
 *
 * **The row takes no gap.** 470 + 679 is 1149 inside the 1245 container, which
 * `justify-between` spaces by exactly 96 — the arithmetic this build now uses
 * in eight places.
 *
 * Its eight 24px icons are all new, at `stroke-width` 1.8 — the library's 1.95
 * at the documented 24/26 — so they take `currentColor` like every other line
 * glyph and are coloured at the call site.
 */
export function Secteurs() {
  const t = useTranslations("CabinetPage.secteurs");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-10 lg:gap-12">
          <div className="flex flex-col gap-4">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62 max-w-250">{t("lead")}</p>
          </div>

          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex flex-col gap-9 xl:w-117.5 xl:shrink-0 xl:items-end">
              <Image
                src={photo}
                alt={t("photoAlt")}
                sizes="(min-width: 1280px) 470px, 100vw"
                className="h-137 w-full rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px] object-cover"
              />

              {/* Figma types two spaces after the weighted lead-in, which HTML
                  would otherwise collapse. */}
              <p className="border-red text-small text-encre/62 w-full border-l-3 py-0.5 pl-4 whitespace-pre-wrap">
                {t.rich("angle", {
                  s: (chunks) => (
                    <span className="text-button font-poppins text-encre">
                      {chunks}
                    </span>
                  ),
                })}
              </p>

              {/* `Button` sets `whitespace-nowrap` in its base class, so a 340px
                  label has to be allowed to wrap rather than the class simply
                  omitted — it overran a 320 viewport by 40. */}
              <ConsultButton
                size="lg"
                className="w-full self-start whitespace-normal sm:w-auto sm:whitespace-nowrap xl:self-end"
              >
                {t("cta")}
              </ConsultButton>
            </div>

            <ul className="flex min-w-0 flex-col gap-4 xl:w-169.75 xl:shrink-0">
              {secteurRows.map((key, i) => {
                const Icon = icons[key];
                return (
                  <li
                    key={key}
                    className="border-encre/10 flex gap-4.5 border-b py-4.5"
                  >
                    <Icon
                      aria-hidden="true"
                      width={24}
                      height={24}
                      className="text-periwinkle shrink-0"
                    />
                    {/* Figma gives the first row a 12px inner gap and the other
                        seven 8 — reproduced; see the note in lib. */}
                    <div
                      className={cn(
                        "flex min-w-0 flex-1 flex-col justify-center",
                        i === 0 ? "gap-3" : "gap-2",
                      )}
                    >
                      <p className="text-h4 font-poppins text-encre">
                        {t(`rows.${key}.title`)}
                      </p>
                      <p className="text-body text-encre/62">{t(`rows.${key}.body`)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
