import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles } from "@/lib/actus";
import { cn } from "@/lib/utils";

const thumbTones = {
  periwinkle: "bg-pale-periwinkle",
  gold: "bg-pale-gold",
  blue: "bg-lilas-2",
} as const;

export function Actus() {
  const t = useTranslations("Actus");

  return (
    <section className="bg-lilas">
      <Container className="py-24">
        <div className="flex flex-col gap-12">
          {/* Heading and the see-all link share a row; the link drops below
              the heading once they no longer fit. */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionHeading overline={t("overline")} title={t("title")} />
            {/* Reads as a link but does not navigate — no route yet. */}
            <span className="text-button font-poppins text-brique inline-flex items-center gap-2">
              {t("all")}
              <span aria-hidden="true">&rarr;</span>
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {articles.map(({ key, Icon, tone }) => (
              <li key={key} className="flex">
                <Card className="flex flex-1 flex-col overflow-hidden">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-35 shrink-0 items-center justify-center",
                      thumbTones[tone],
                    )}
                  >
                    <Icon />
                  </span>
                  <div className="flex flex-col gap-2 px-6 pt-6 pb-7">
                    <p className="text-small-strong text-brique">
                      {t(`items.${key}.kicker`)}
                    </p>
                    <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                    <p className="text-small text-encre/62">{t(`items.${key}.meta`)}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
