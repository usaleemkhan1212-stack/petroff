import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { footerColumns } from "@/lib/footer";
import { cn } from "@/lib/utils";

export function Footer() {
  const t = useTranslations("Footer");

  /* Figma writes every string in this footer at white 70%: the legal line,
     the language list, the column titles, the links and the bottom row. */
  return (
    <footer className="bg-encre">
      <Container className="pt-12 pb-9 lg:pt-16">
        <div className="flex flex-col gap-12">
          {/* Brand block left, link columns right; they stack below lg. */}
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex max-w-82 flex-col gap-5">
              <div className="flex flex-col gap-3">
                <Logo tone="onDark" />
                <p className="text-small text-white/70">{t("legal")}</p>
              </div>
              <p className="text-overline font-poppins text-white/70">
                {t("languages")}
              </p>
            </div>

            <nav
              aria-label={t("navLabel")}
              /*
                Grid while the columns stack, flex once they sit in a row —
                equal grid tracks would force the third column to the same
                232px as the first two, which Figma leaves at content width.
              */
              className="grid grid-cols-2 gap-x-9 gap-y-10 sm:grid-cols-3 xl:flex"
            >
              {footerColumns.map((key, i) => (
                /*
                  Figma fixes the first two columns at 233.6px and lets the
                  third size to its content, which is what spreads the group
                  across the right half. 232px is the nearest scale value.
                  Only from xl — below that the container is too narrow to
                  hold three 232px columns beside the brand block.
                */
                <div
                  key={key}
                  className={cn(
                    "flex flex-col gap-2",
                    i < footerColumns.length - 1 && "xl:w-58",
                  )}
                >
                  <h2 className="text-overline font-poppins text-white/70">
                    {t(`columns.${key}.title`)}
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {(t.raw(`columns.${key}.items`) as string[]).map((label) => (
                      <li key={label}>
                        {/* Reads as a link but does not navigate — no route yet. */}
                        <span className="text-small text-white/70">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
            <p className="text-small text-white/70">{t("copyright")}</p>
            <p className="text-small text-white/70">
              {t.rich("legalLinks", {
                /* Confidentialité is a real page now; the other two are not. */
                c: (chunks) => (
                  <MaybeLink
                    href="/confidentialite"
                    className="transition-colors hover:text-white"
                  >
                    {chunks}
                  </MaybeLink>
                ),
              })}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
