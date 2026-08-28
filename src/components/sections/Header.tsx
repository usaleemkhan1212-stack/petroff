import { useTranslations } from "next-intl";
import PhoneIcon from "@/assets/icons/phone.svg";
import { NavMenu } from "@/components/layout/NavMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { navItems } from "@/lib/nav";

export function Header() {
  const t = useTranslations("Nav");

  /*
   * z-30 keeps the header above the page: the sections below it are positioned
   * too, so without it the mobile panel and the Expertises dropdown paint
   * underneath them.
   */
  return (
    <header className="border-encre/8 bg-lilas/20 relative z-30 border-b">
      <Container>
        <div className="flex h-18 items-center justify-between gap-3">
          <MaybeLink
            href="/"
            className="focus-visible:outline-gold shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <Logo />
            <span className="sr-only">{t("homeLabel")}</span>
          </MaybeLink>

          {/*
            The desktop nav appears at xl (1280), where the container gives it
            1216. With three dropdowns its content needs ~1237, so these three
            gaps tighten by a total of 24 between xl and 2xl and return to the
            Figma numbers at 2xl — the header is pixel-specified at 1920 and
            must not move there.
          */}
          <div className="flex flex-1 items-center justify-end gap-4 xl:gap-3 2xl:gap-4">
            <nav aria-label={t("mainLabel")} className="hidden xl:block">
              <ul className="flex shrink-0 items-center gap-3 2xl:gap-4">
                {navItems.map((item) => (
                  <li key={item.key}>
                    {item.children?.length ? (
                      <NavMenu
                        id={item.key}
                        label={t(item.key)}
                        menuLabel={t(item.submenuLabel ?? "domainsLabel")}
                        href={item.href}
                        items={item.children}
                      />
                    ) : (
                      <MaybeLink
                        href={item.href}
                        className="text-small text-encre hover:text-periwinkle whitespace-nowrap transition-colors"
                      >
                        {t(item.key)}
                      </MaybeLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2 xl:gap-1.5 2xl:gap-2">
              <LanguageSwitcher className="hidden xl:flex" />

              <Button className="hidden sm:inline-flex">{t("appointment")}</Button>

              <span className="border-encre/10 text-encre flex size-9.5 shrink-0 items-center justify-center rounded-full border bg-white">
                <PhoneIcon aria-hidden="true" />
                <span className="sr-only">{t("phoneLabel")}</span>
              </span>

              <MobileNav items={navItems} />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
