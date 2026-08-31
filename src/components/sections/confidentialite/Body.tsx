import { useTranslations } from "next-intl";
import { Section } from "@/components/sections/confidentialite/Section";
import { Toc } from "@/components/sections/confidentialite/Toc";
import { Container } from "@/components/ui/Container";
import { type Block, sectionKeys } from "@/lib/confidentialite";

/**
 * Figma `13550:1042` — the document itself, 48 above and 96 below.
 *
 * A 765 content column beside the 384 table of contents. **The row takes no
 * gap**: 765 + 384 is 1149 inside the 1245 container, which `justify-between`
 * spaces by exactly 96 — the arithmetic four other sections on this build use.
 * It splits at `xl`: 1149 plus the container's own padding needs 1213, so at
 * `lg` the content column would be squeezed to 576. Below that the TOC leads
 * and the sections follow.
 *
 * The eighteen sections sit on a uniform **48px gap** with a uniform 20 inside
 * each, and every one but the first opens on its own `stone` rule.
 */
export function Body() {
  const t = useTranslations("ConfidentialitePage");

  return (
    <Container className="pt-12 pb-16 lg:pb-24">
      <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-0">
        <div className="flex min-w-0 flex-col gap-12 xl:w-191.25">
          {sectionKeys.map((key, i) => (
            <Section
              key={key}
              id={key}
              rule={i > 0}
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
