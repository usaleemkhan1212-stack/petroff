import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/** The five milestones, in Figma's order. */
const milestones = ["m2commerce", "m2tech", "llm", "paris", "sofia"] as const;

/** The three working languages, in Figma's order. */
const languages = ["fr", "en", "bg"] as const;

/** The two memberships, in Figma's order. */
const memberships = ["paris", "aamti"] as const;

/**
 * Figma `13495:30380` — "Formation, barreaux et langues".
 *
 * A 679 timeline beside a 329 side column. **The row takes no gap**: Figma
 * spaces the two with `justify-between`, which gives 237 inside the 1245
 * container. The side column carries its own `pr-96`, so its content is 233
 * wide and its right edge sits 96 in from the container.
 *
 * It splits at `xl`: 679 + 277 needs 956 plus a real gap, which the container
 * cannot give at `lg`.
 */
export function Parcours() {
  const t = useTranslations("PersonalPage.parcours");

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-3">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
          </div>

          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-0">
            {/* Five rows on a 12px gap, each closing on its own encre/10 rule. */}
            <ul className="flex min-w-0 flex-col gap-3 xl:w-169.75">
              {milestones.map((key) => (
                <li
                  key={key}
                  className="border-encre/10 flex flex-col gap-4 border-b py-4.5 sm:flex-row sm:items-start sm:gap-9"
                >
                  {/* Figma gives the year a fixed **100px** column, so every
                      title starts on the same left edge; it had sized to
                      content, which stepped them in and out. */}
                  <p className="text-price font-poppins text-pale-periwinkle shrink-0 sm:w-25">
                    {t(`items.${key}.year`)}
                  </p>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="text-h3 text-encre">{t(`items.${key}.title`)}</h3>
                    <p className="text-body text-encre/62">
                      {t(`items.${key}.detail`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Figma's `vigil` column is **277** wide at x=968, so it closes on
                the container's right edge. Its Barreaux and Membre blocks hug
                narrower (233 and 125) because their own copy is shorter — that
                233 is a child's hug width, not the column's. */}
            <div className="flex min-w-0 flex-col gap-6 xl:w-69.25">
              <div className="flex flex-col">
                <p className="text-overline font-poppins text-brique uppercase">
                  {t("barreaux.title")}
                </p>
                <div className="border-encre/10 flex flex-col gap-4 border-b py-6">
                  {(["paris", "sofia"] as const).map((key) => (
                    <div key={key} className="flex flex-col">
                      <p className="text-small-strong text-encre">
                        {t(`barreaux.${key}.name`)}
                      </p>
                      {/* One line, with room now: the longer of the two needs
                          233 in the column's 277. It used to be pinned with a
                          nowrap against a 233 column, which was that child
                          frame's own hug width rather than the column's. */}
                      <p className="text-small text-encre/62">
                        {t(`barreaux.${key}.detail`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-overline font-poppins text-brique uppercase">
                  {t("languages.title")}
                </p>
                {/* One line, exactly: Figma lays the three labels at x=0/106/202
                    at 82/72/75, i.e. a 24px gap summing to the column's own
                    277. It fits with nothing to spare, so `xl:flex-nowrap`
                    pins it at the width the comp specifies; below `xl` the
                    column is the container and it may wrap. */}
                <div className="border-encre/10 flex flex-wrap gap-x-6 gap-y-2 border-b py-6 xl:flex-nowrap">
                  {languages.map((key) => (
                    <p key={key} className="text-small-strong text-encre uppercase">
                      {t(`languages.${key}`)}
                    </p>
                  ))}
                </div>
              </div>

              {/* No rule under the last block. */}
              <div className="flex flex-col">
                <p className="text-overline font-poppins text-brique uppercase">
                  {t("membership.title")}
                </p>
                <div className="flex flex-col gap-4 py-6">
                  {memberships.map((key) => (
                    <p key={key} className="text-small text-encre">
                      {t(`membership.${key}`)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
