import { useTranslations } from "next-intl";
import FlagFr from "@/assets/icons/flag-fr.svg";
import ShieldCheck from "@/assets/icons/shield-check.svg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";

/**
 * The mid-page callback band — Figma `13445:23733` on the service page and
 * `13701:24190` on Le Cabinet, which are the same drawing to the pixel: a
 * lilas-2 strip on 24 of padding holding a 661 copy column and a 450 phone
 * field, spaced by `justify-between` inside the 1245 band (which gives 134).
 *
 * Unlike the two domain pages' MidCTA — one line of copy and a button — this
 * one carries a real field, so it is closer to SearchBand than to those. Do
 * not reach for either when building the other.
 *
 * **Four of its six strings are character-identical across the two frames**,
 * so the field label, placeholder, CTA and note live in the shared top-level
 * `MidCta` namespace and each page passes only its own title and lead — the
 * split `ContactCta` established.
 *
 * The field is inert like every other form on the site, and deliberately not
 * wrapped in a `<form>`: with no submit handler Enter would reload the page.
 */
export function MidCta({ title, lead }: { title: string; lead: string }) {
  const t = useTranslations("MidCta");

  return (
    <section className="bg-lilas-2">
      <Container className="py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex flex-col gap-2 lg:w-165.25">
            <h2 className="text-h3 text-encre">{title}</h2>
            <p className="text-body text-encre/62">{lead}</p>
          </div>

          <div className="flex flex-col gap-1.25 lg:w-112.5">
            {/*
              Figma's pill: 24 left, 8 right, 8 top and bottom, on a 36px
              radius. Below sm the button drops under the field — at 375 the
              flag, placeholder and a 180px button cannot share one row.
            */}
            <div className="border-encre/10 flex flex-col gap-2 rounded-[24px] border bg-white p-2 sm:flex-row sm:items-center sm:gap-3 sm:rounded-[36px] sm:py-2 sm:pr-2 sm:pl-6">
              <div className="flex min-w-0 flex-1 items-center gap-3 max-sm:px-4 max-sm:pt-2">
                <FlagFr
                  aria-hidden="true"
                  width={21}
                  height={16}
                  className="shrink-0"
                />
                <label htmlFor="midcta-phone" className="sr-only">
                  {t("fieldLabel")}
                </label>
                <input
                  id="midcta-phone"
                  type="text"
                  placeholder={t("placeholder")}
                  className="text-small text-encre placeholder:text-encre/62 min-w-0 flex-1 bg-transparent text-ellipsis outline-none"
                />
              </div>
              <ConsultButton
                variant="gold"
                size="sm"
                className="shrink-0 px-6 max-sm:w-full"
              >
                {t("cta")}
              </ConsultButton>
            </div>

            <p className="text-small text-encre/62 flex items-center gap-2">
              {/* Figma draws an SF Symbols `shield` placeholder here. */}
              <ShieldCheck
                aria-hidden="true"
                width={16}
                height={16}
                className="shrink-0"
              />
              {t("note")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
