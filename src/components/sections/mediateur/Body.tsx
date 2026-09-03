import { useTranslations } from "next-intl";
import { Section } from "@/components/sections/mediateur/Section";
import { Toc } from "@/components/sections/mediateur/Toc";
import { Container } from "@/components/ui/Container";
import { type Block, sectionKeys } from "@/lib/mediateur";

/** S03 alone carries a Poppins SemiBold 20 title where the other six are Bold
    30 — reproduced from the frame and flagged as a likely slip. */
const SMALL_TITLE: (typeof sectionKeys)[number] = "reclamation";

/**
 * Figma `13833:439` — the document itself, 48 above and 96 below.
 *
 * A 765 content column beside the 384 table of contents. **The row takes no
 * gap**: 765 + 384 is 1149 inside the 1245 container, which `justify-between`
 * spaces by exactly 96 — the arithmetic six other sections on this build use.
 * It splits at `xl`, since 1149 plus the container's padding needs 1213 and at
 * `lg` the content column would be squeezed to 576.
 *
 * The seven sections sit on a uniform **28px gap** and carry **28 of padding
 * above and below** (16 above on the first), so the rule that opens each one
 * has 28 either side of it. That is the third arrangement across three legal
 * frames; see the note on `Section`.
 */
export function Body() {
  const t = useTranslations("MediateurPage");

  return (
    <Container className="pt-12 pb-16 lg:pb-24">
      <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-0">
        <div className="flex min-w-0 flex-col gap-7 xl:w-191.25">
          {sectionKeys.map((key, i) => (
            <Section
              key={key}
              /* Prefixed so the anchor is unique to this document:
                 `#contact` belongs to the site-wide contact popup, and
                 three of these four documents have a Contact section. */
              id={`med-${key}`}
              first={i === 0}
              smallTitle={key === SMALL_TITLE}
              num={t(`sections.${key}.num`)}
              title={t(`sections.${key}.title`)}
              blocks={t.raw(`sections.${key}.blocks`) as Block[]}
            />
          ))}
        </div>

        <Toc />
      </div>
    </Container>
  );
}
