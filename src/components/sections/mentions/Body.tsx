import { useTranslations } from "next-intl";
import { Section } from "@/components/sections/mentions/Section";
import { Toc } from "@/components/sections/mentions/Toc";
import { Container } from "@/components/ui/Container";
import { type Block, sectionKeys } from "@/lib/mentions";

/**
 * Figma `13852:940` — the document itself, 48 above and 96 below.
 *
 * A 765 content column beside the 384 table of contents. **The row takes no
 * gap**: 765 + 384 is 1149 inside the 1245 container, which `justify-between`
 * spaces by exactly 96 — the arithmetic seven other sections on this build use.
 * It splits at `xl`, since 1149 plus the container's padding needs 1213 and at
 * `lg` the content column would be squeezed to 576.
 *
 * The fourteen sections sit on a uniform **28px gap**, with a uniform 20 inside
 * each, and **every one opens on its own `stone` rule** carrying 28 beneath it
 * — the cookie policy's arrangement, except that this document rules its first
 * section too.
 */
export function Body() {
  const t = useTranslations("MentionsPage");

  return (
    <Container className="pt-12 pb-16 lg:pb-24">
      <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-0">
        <div className="flex min-w-0 flex-col gap-7 xl:w-191.25">
          {sectionKeys.map((key) => (
            <Section
              key={key}
              /* Prefixed so the anchor is unique to this document:
                 `#contact` belongs to the site-wide contact popup, and
                 three of these four documents have a Contact section. */
              id={`ml-${key}`}
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
