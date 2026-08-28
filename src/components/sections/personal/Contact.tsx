import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "@/assets/images/lawyer-portrait-card.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** The three reassurance marks, in Figma's order. */
const marks = ["reponse", "evaluation", "prix"] as const;

/** The four short fields, in Figma's order — two rows of two on a 24px gap. */
const fields = [
  ["nom", "email"],
  ["telephone", "societe"],
] as const;

/** Shared by the textarea and the four inputs. */
const field =
  /*
    Two explicit bits. `leading-[1.4]` because a form control does not inherit
    the token's line-height, and `block` because a textarea is inline-block by
    default — its wrapper then picks up ~6px of line-box descender, which is
    invisible until you measure the group.
  */
  "text-body leading-[1.4] text-encre placeholder:text-encre/62 border-encre/20 block w-full rounded-field border bg-white px-4.5 py-4 outline-none " +
  "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * Figma `13544:34906` — the page's closing contact card.
 *
 * A 1245 white card on a full-width lilas band, inset **120 above and 99
 * below**. Its four corner radii and its `0px 14px 34px` shadow are the
 * Interlocuteurs lawcard's, and like that one the shadow is **hover only** —
 * the comp draws it lifted, but every Figma-drawn shadow on this build has
 * turned out to be the hover state, and it is one card with no sibling to
 * settle it either way. Asked for.
 *
 * Its inputs are real and labelled but deliberately **not wrapped in a
 * `<form>`** — with no submit handler, Enter would reload the page. The same
 * call Tools, SearchBand and the article's consult block make.
 */
export function Contact() {
  const t = useTranslations("PersonalPage.contact");

  return (
    <section className="bg-lilas">
      <Container className="pt-16 pb-12 lg:pt-30 lg:pb-24.75">
        <div className="border-encre/8 flex flex-col gap-10 rounded-tl-[80px] rounded-tr-[18px] rounded-br-[60px] rounded-bl-[18px] border bg-white p-6 transition-shadow hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.1)] sm:p-10 lg:flex-row lg:gap-16 lg:p-16">
          <div className="flex flex-col gap-7 lg:w-55.25 lg:shrink-0">
            <Image
              src={portrait}
              alt={t("photoAlt")}
              sizes="221px"
              className="h-66.25 w-full rounded-tl-[80px] rounded-tr-[4px] rounded-br-[20px] rounded-bl-[20px] object-cover lg:w-55.25"
            />

            <div className="flex flex-col gap-1">
              <p className="text-h3 font-poppins text-encre">{t("name")}</p>
              <p className="text-small text-encre/62">
                {t.rich("address", { br: () => <br /> })}
              </p>
            </div>

            {/* A rule above, then the first mark's own 16px of clearance. */}
            <ul className="border-encre/10 flex flex-col gap-4 border-t pt-4">
              {marks.map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  {/* Inter Bold on a 26px line box, periwinkle — a heavier
                      tick than the green ones elsewhere on the site. */}
                  <span
                    aria-hidden="true"
                    className="text-small text-periwinkle shrink-0 leading-[26px] font-bold"
                  >
                    ✓
                  </span>
                  <p className="text-small text-encre/62 min-w-0 flex-1 leading-[26px]">
                    {t.rich(`marks.${key}`, {
                      s: (chunks) => (
                        <span className="text-button font-poppins text-periwinkle leading-[26px]">
                          {chunks}
                        </span>
                      ),
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-9">
            <div className="flex flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
              <p className="text-body text-encre/62">{t("lead")}</p>
            </div>

            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-7">
                <div>
                  <label htmlFor="personal-situation" className="sr-only">
                    {t("fields.situation")}
                  </label>
                  <textarea
                    id="personal-situation"
                    rows={4}
                    placeholder={t("fields.situation")}
                    className={`${field} h-38.75 resize-none`}
                  />
                </div>

                {fields.map((row, i) => (
                  <div key={i} className="flex flex-col gap-6 sm:flex-row">
                    {row.map((key) => (
                      <div key={key} className="min-w-0 flex-1">
                        <label htmlFor={`personal-${key}`} className="sr-only">
                          {t(`fields.${key}`)}
                        </label>
                        <input
                          id={`personal-${key}`}
                          type="text"
                          placeholder={t(`fields.${key}`)}
                          className={`${field} text-ellipsis`}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Button
                    variant="red"
                    className="px-9 py-3.5 leading-[22px] whitespace-normal sm:whitespace-nowrap"
                  >
                    {t("cta")}
                  </Button>
                  <p className="text-body text-encre/62">
                    {t.rich("phone", {
                      s: (chunks) => (
                        <span className="text-body-strong text-encre">
                          {chunks}
                        </span>
                      ),
                      n: (chunks) => (
                        <span className="text-body-strong text-red">
                          {chunks}
                        </span>
                      ),
                    })}
                  </p>
                </div>
                <p className="text-small text-encre/62 leading-6">
                  {t("secret")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
