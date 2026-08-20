import { useTranslations } from "next-intl";
import { CabinetCollage } from "@/components/sections/CabinetCollage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cabinetStats } from "@/lib/cabinet";

export function Cabinet() {
  const t = useTranslations("Cabinet");

  return (
    <section className="bg-white">
      <Container className="py-24">
        {/* Copy and collage sit side by side from xl; below that the collage
            is hidden and the copy takes the full width. */}
        <div className="grid items-center gap-16 xl:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeading
              overline={t("overline")}
              title={t("title")}
              lead={t("lead")}
            />

            <dl className="flex flex-wrap gap-9">
              {cabinetStats.map((key) => (
                <div key={key} className="flex flex-col gap-1">
                  <dt className="text-stat font-poppins text-encre">
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

          <CabinetCollage />
        </div>
      </Container>
    </section>
  );
}
