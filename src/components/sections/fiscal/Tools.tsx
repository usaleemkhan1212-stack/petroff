import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tools } from "@/lib/fiscal";

export function Tools() {
  const t = useTranslations("FiscalPage.tools");

  return (
    <section className="bg-encre">
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            lead={t("lead")}
            tone="onDark"
            className="max-w-170 gap-3"
            leadClassName="max-w-170"
          />

          {/* Four tools, 2 -> 1, cards equal height per row. */}
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {tools.map((key) => (
              <li key={key} className="flex">
                {/* min-w-0: the input's default size=20 would otherwise stop
                    the card shrinking — see CLAUDE.md. */}
                <div className="rounded-card flex min-w-0 flex-1 flex-col gap-3 border border-white/14 bg-white/6 p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-h3 text-white">{t(`items.${key}.title`)}</h3>
                    {/* text-button here, not the text-badge the Contentieux
                        page uses: Figma sets these SemiBold with no tracking. */}
                    <span className="text-button font-poppins text-rose bg-encre/80 rounded-full px-3 py-1">
                      {t(`items.${key}.badge`)}
                    </span>
                  </div>

                  <p className="text-small text-white/70">
                    {t(`items.${key}.description`)}
                  </p>

                  {/* Inert, and deliberately not a <form>: with no submit
                      handler Enter would reload the page. */}
                  <div className="rounded-field flex w-full items-center gap-2 bg-white py-2 pr-2 pl-5">
                    <label htmlFor={`fiscal-tool-${key}`} className="sr-only">
                      {t(`items.${key}.title`)}
                    </label>
                    <input
                      id={`fiscal-tool-${key}`}
                      type="text"
                      placeholder={t(`items.${key}.placeholder`)}
                      className="text-body text-encre placeholder:text-encre/55 min-w-0 flex-1 bg-transparent text-ellipsis outline-none"
                    />
                    <Button variant="gold" size="sm" className="py-2">
                      {t(`items.${key}.submit`)}
                    </Button>
                  </div>

                  {/* 18px here, against the Contentieux page's 10px. */}
                  <div className="rounded-note-lg w-full bg-white/9 px-4 py-3">
                    <p className="text-small text-white/70">{t("result")}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
