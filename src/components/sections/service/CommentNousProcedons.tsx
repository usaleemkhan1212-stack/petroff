import { Bullet } from "@/components/ui/Bullet";
import Image from "next/image";
import { useTranslations } from "next-intl";
import photo from "@/assets/images/associee-tablet.jpg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";

/** The six steps, in Figma's order. */
const steps = [
  "evaluer",
  "securiser",
  "negocier",
  "proteger",
  "plaider",
  "cloturer",
] as const;

/**
 * Figma `13445:21438` — "Comment nous vous aidons à résoudre un litige".
 *
 * A 470 photo beside a 679 column on a **96px gap** — here Figma states the
 * gap rather than leaving `justify-between` to produce it, though the sum is
 * the same 1245. Splits at `xl`: at 1024 the column would be 418.
 *
 * Its six rows carry **no gap of their own** — each closes on its own
 * `encre/10` rule, so they sit flush.
 */
export function CommentNousProcedons() {
  const t = useTranslations("ServicePage.procedons");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-24">
          {/*
            Sticky from xl, as the Mission card and the three e-commerce cards
            are: 548 of photo against a ~1028 column, so it pins at 24 and
            rides the six steps past, then leaves with its row. `self-start`
            is the load-bearing half — the row is already items-start, but
            without it a later change to that alignment would stretch the
            photo and leave nothing to stick. Figma draws it static.
          */}
          <div className="aspect-[470/548] w-full max-w-117.5 shrink-0 overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px] xl:sticky xl:top-6 xl:w-117.5 xl:self-start">
            <Image
              src={photo}
              alt={t("imageAlt")}
              sizes="(min-width: 1280px) 470px, 100vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-9">
            <div className="flex flex-col gap-3">
              <p className="text-overline font-poppins text-brique uppercase">
                {t("overline")}
              </p>
              <h2 className="text-h2 text-encre">{t("title")}</h2>
              <p className="text-body text-encre/62">{t("lead")}</p>
            </div>

            <ul className="flex flex-col">
              {steps.map((key) => (
                <li
                  key={key}
                  className="border-encre/10 flex items-start gap-4.5 border-b py-4.5"
                >
                  <Bullet />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="text-h4 font-poppins text-encre">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-body text-encre/62">{t(`items.${key}.body`)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <ConsultButton size="lg" variant="gold" className="self-start">
              {t("cta")}
            </ConsultButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
