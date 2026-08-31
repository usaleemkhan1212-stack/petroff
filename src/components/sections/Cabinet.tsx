import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import signingTable from "@/assets/images/signing-table-overhead.jpg";
import { cabinetStats } from "@/lib/cabinet";

export function Cabinet() {
  const t = useTranslations("Cabinet");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        {/* Copy and photo sit side by side from xl, stacking below it. */}
        <div className="grid items-center gap-10 xl:grid-cols-2 xl:gap-16">
          <div className="flex flex-col gap-5">
            <SectionHeading
              overline={t("overline")}
              title={t("title")}
              lead={t("lead")}
            />

            {/*
              Figma marks this row `flex-nowrap` with `whitespace-nowrap` and
              `shrink-0` on all three, so the counters are never meant to break
              onto a second line — and they only just fit, needing 565.8 of the
              column's 590.5 (576 at xl). That 4% of slack is inside the
              difference between Inter and the metric-adjusted fallback shown
              while the webfont loads, which is why the row wrapped on some
              machines and not others.

              It is `flex-nowrap` from `sm` so the three always share one row,
              with `min-w-0` on each so a label wraps inside its own column
              rather than pushing the page wide. Below `sm` the column is 335
              against the row's 566, so there it still wraps.
            */}
            <dl className="flex flex-wrap gap-9 sm:flex-nowrap">
              {cabinetStats.map((key) => (
                <div key={key} className="flex min-w-0 flex-col gap-1">
                  {/* Poppins Bold 40 — text-h2, not text-stat's 28. Both this
                      frame and the one it replaces specify 40 here. */}
                  <dt className="text-h2 font-poppins text-encre">
                    {t(`stats.${key}.value`)}
                  </dt>
                  <dd className="text-small text-encre/62">
                    {t(`stats.${key}.label`)}
                  </dd>
                </div>
              ))}
            </dl>

            <Button variant="outline" size="lg" className="self-start">
              {t("cta")}
            </Button>
          </div>

          {/*
            Figma pins the photo to the right edge of its 590.5px column
            (left 72.5 + 518 = 590.5) and gives it four different corner
            radii. Unlike the collage it replaces it is not hidden below xl —
            one photo scales down cleanly where five stacked ornaments could
            not. The four radii are literal design geometry with no token,
            the same call CabinetCollage made for its 6px polaroid corners.
          */}
          {/* Figma's stage is 600 tall with the 592 photo at its top, so the
              extra 8px is real and sets the section height. */}
          <div className="flex items-start justify-end xl:h-150">
            <div className="relative aspect-[518/592] w-full max-w-129.5 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
              <Image
                src={signingTable}
                alt=""
                fill
                sizes="(min-width: 1280px) 518px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
