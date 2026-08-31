import { useTranslations } from "next-intl";
import DocStack from "@/assets/icons/doc-stack.svg";
import Key from "@/assets/icons/key.svg";
import CalendarDots from "@/assets/icons/calendar-dots.svg";
import Clock from "@/assets/icons/clock.svg";
import Inbox from "@/assets/icons/inbox.svg";
import Monument from "@/assets/icons/monument.svg";
import PageCorner from "@/assets/icons/page-corner.svg";
import BalanceScales from "@/assets/icons/balance-scales.svg";
import OpenCode from "@/assets/icons/open-code.svg";
import ShieldBadge from "@/assets/icons/shield-badge.svg";
import WarningCircle from "@/assets/icons/warning-circle.svg";
import ScalesTiny from "@/assets/icons/scales-tiny.svg";
import { Rail } from "@/components/sections/new-article/Rail";
import { AnswerBox } from "@/components/sections/new-article/blocks/AnswerBox";
import { ArticleFaq } from "@/components/sections/new-article/blocks/ArticleFaq";
import { Callout } from "@/components/sections/new-article/blocks/Callout";
import { ComparisonTable } from "@/components/sections/new-article/blocks/ComparisonTable";
import { Ladder } from "@/components/sections/new-article/blocks/Ladder";
import { Seam } from "@/components/sections/new-article/blocks/Seam";
import {
  Timeline,
  TimelineItem,
} from "@/components/sections/new-article/blocks/Timeline";
import { JurCard, JurList } from "@/components/sections/new-article/blocks/JurList";
import { RefList, RefRow } from "@/components/sections/new-article/blocks/RefList";
import { Triage } from "@/components/sections/new-article/blocks/Triage";
import { Vigil, VigilRow } from "@/components/sections/new-article/blocks/Vigil";
import { Prose, proseTags } from "@/components/sections/new-article/blocks/Prose";
import { SectionTitle } from "@/components/sections/new-article/blocks/SectionTitle";
import { Takeaways } from "@/components/sections/new-article/blocks/Takeaways";
import { Simulator } from "@/components/sections/new-article/blocks/Simulator";
import { Container } from "@/components/ui/Container";

/**
 * The article body, derived from `13318:2503`.
 *
 * **Its rhythm is a flat stack.** The column is twenty blocks on a uniform
 * **48px** gap — every wrapper's end plus 48 is exactly the next one's start,
 * all the way to its 14170.57 — with a uniform **24** inside each block. That
 * replaces the per-block spacer frames the original page carries (18, 56, 16,
 * 30). So this is one `gap-12` column of `gap-6` blocks.
 *
 * **Figma puts the column band at x=402.5, not the container's 337.5.** Its
 * Corps frame is an auto-layout row whose first child is a stray 1px `marks`
 * frame, and 337.5 + 1 + 64 is exactly 402.5 — the offset is that artefact,
 * not a design intent, and it would push the 1245 band 65px past the
 * container. The standard `Container` is kept, as with every other oversized
 * frame on this build.
 *
 * Being built block by block; the list grows as each lands.
 */
const refKeys = [
  "a1365",
  "a1366",
  "a1367",
  "eidas",
  "a1368",
  "a1369",
  "a1373",
  "a1374",
  "a1375",
  "a1376",
  "a1379",
  "a1356",
  "a1359",
] as const;

const jurKeys = ["bail", "scannee", "verification", "cjue", "mention"] as const;

export function Corps() {
  const t = useTranslations("ArticlePage.corps");
  const page = useTranslations("NewArticlePage");
  const seam = useTranslations("ArticlePage.seam1");
  const seam2 = useTranslations("ArticlePage.seam2");
  const trap = useTranslations("ArticlePage.trap");
  const tl = useTranslations("ArticlePage.timeline");
  const vigil = useTranslations("ArticlePage.vigil");
  const ref = useTranslations("ArticlePage.reflist");
  const jur = useTranslations("ArticlePage.jurList");

  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16 lg:py-24">
        {/* 881 of column, 64, 300 of rail — the container's whole 1245. */}
        <div className="flex items-start gap-16">
          <div className="flex min-w-0 flex-1 flex-col gap-8 lg:gap-12">
            {/* 1 — La réponse en bref */}
            <div className="flex flex-col gap-6">
              <SectionTitle
                id="answer"
                Icon={DocStack}
                iconWidth={52}
                iconHeight={45.5}
              >
                {t("answerTitle")}
              </SectionTitle>
              <AnswerBox>
                <p>{t.rich("answer1", proseTags)}</p>
                <p>{t.rich("answer2", proseTags)}</p>
                <p>{t.rich("answer3", proseTags)}</p>
              </AnswerBox>
            </div>

            {/* 2 — Ce que le droit appelle un écrit. Its heading carries no
                    glyph, unlike the three that do. */}
            <div className="flex flex-col gap-6">
              <SectionTitle id="ecrit">{t("ecritTitle")}</SectionTitle>
              <Prose>{t.rich("ecrit1", proseTags)}</Prose>
              <Prose>{t.rich("ecrit2", proseTags)}</Prose>
              <Prose>{t.rich("ecrit3", proseTags)}</Prose>
            </div>

            {/* 3 — the rule callout, a block of its own on the 48 rhythm. */}
            <Callout tag={t("rule1Tag")} title={t("rule1Title")} Icon={ScalesTiny}>
              {t("rule1Body")}
            </Callout>

            {/* 4 — the simulator, the column's largest single block. */}
            <Simulator />

            {/* 5 — Les niveaux de signature */}
            <div className="flex flex-col gap-6">
              <SectionTitle id="niveaux" Icon={Key} iconWidth={52} iconHeight={31.778}>
                {t("niveauxTitle")}
              </SectionTitle>
              <Prose>{t.rich("niveaux1", proseTags)}</Prose>
              <Prose>{t.rich("niveaux2", proseTags)}</Prose>
              <Prose>{t.rich("niveaux3", proseTags)}</Prose>
              <Prose>{t.rich("niveaux4", proseTags)}</Prose>
            </div>

            {/* 6 — the four levels, a block of its own on the 48 rhythm. */}
            <Ladder />

            {/* 7 — Ce que chaque niveau vous donne */}
            <div className="flex flex-col gap-6">
              <SectionTitle id="cmp">{t("cmpTitle")}</SectionTitle>
              <ComparisonTable />
            </div>

            {/* 8 */}
            <Seam title={seam("title")} body={seam("body")} cta={page("seam1.cta")} />

            {/* 9 — Ce que le juge vérifie. Two paragraphs straight, where the
                    original page breaks them with a sub-heading. */}
            <div className="flex flex-col gap-6">
              <SectionTitle id="juge">{t("jugeTitle")}</SectionTitle>
              <Prose>{t.rich("juge1", proseTags)}</Prose>
              <Prose>{t.rich("dossier1", proseTags)}</Prose>
              <Callout
                variant="trap"
                tag={trap("tag")}
                title={trap("title")}
                Icon={WarningCircle}
              >
                {trap("body")}
              </Callout>
            </div>

            {/* 10 — Quand le cocontractant dénie sa signature. Its wrapper
                     nests the heading and its paragraph as one group and then
                     leaves **36** before the timeline, not the block-standard
                     24 — the only inner gap on the column that is not 24. */}
            <div className="flex flex-col gap-6 lg:gap-9">
              <div className="flex flex-col gap-6">
                <SectionTitle
                  id="denie"
                  Icon={CalendarDots}
                  iconWidth={46}
                  iconHeight={46}
                >
                  {t("denieTitle")}
                </SectionTitle>
                <Prose>{t.rich("denie1", proseTags)}</Prose>
              </div>
              <Timeline>
                {(["s1", "s2", "s3", "s4"] as const).map((key) => (
                  <TimelineItem
                    key={key}
                    step={tl(`${key}.step`)}
                    title={tl(`${key}.title`)}
                  >
                    {/* Step 4's stored copy drops a clause and reads
                        ungrammatically; the frame has it in full. */}
                    {key === "s4"
                      ? page.rich("timeline.s4Body", proseTags)
                      : tl.rich(`${key}.body`, proseTags)}
                  </TimelineItem>
                ))}
              </Timeline>
            </div>

            {/* 11 — Les actes qui appellent une autre forme */}
            <div className="flex flex-col gap-6">
              <SectionTitle id="forme">{t("formeTitle")}</SectionTitle>
              <Prose>{t.rich("forme0", proseTags)}</Prose>
              <Prose>{t.rich("forme1", proseTags)}</Prose>
              <Prose>{t.rich("forme2", proseTags)}</Prose>
              <Prose>{t.rich("forme3", proseTags)}</Prose>
            </div>

            {/* 12 */}
            <Seam title={seam2("title")} body={seam2("body")} cta={page("seam2.cta")} />

            {/* 13 — Organiser sa preuve avant le litige */}
            <div className="flex flex-col gap-6">
              <SectionTitle id="organiser">{t("organiserTitle")}</SectionTitle>
              {(
                [
                  "organiser1",
                  "organiser2",
                  "organiser3",
                  "organiser4",
                  "organiser5",
                ] as const
              ).map((key) => (
                <Prose key={key}>{t.rich(key, proseTags)}</Prose>
              ))}
            </div>

            {/* 14 — Points de vigilance */}
            <div className="flex flex-col gap-6">
              <SectionTitle Icon={ShieldBadge} iconWidth={50} iconHeight={53.571}>
                {t("vigilTitle")}
              </SectionTitle>
              <p className="text-body text-encre">{t("vigilLead")}</p>
              <Vigil>
                <VigilRow Icon={Inbox}>{vigil.rich("boite", proseTags)}</VigilRow>
                <VigilRow Icon={PageCorner}>{vigil.rich("export", proseTags)}</VigilRow>
                <VigilRow Icon={Monument}>{vigil.rich("doubler", proseTags)}</VigilRow>
                <VigilRow Icon={Clock}>{vigil.rich("niveau", proseTags)}</VigilRow>
              </Vigil>
            </div>

            {/* 15 — Les textes. Figma shows four of the thirteen and puts the
                     rest behind the "+9" button. */}
            <div className="flex flex-col gap-6">
              <SectionTitle
                id="textes"
                Icon={OpenCode}
                iconWidth={50}
                iconHeight={37.5}
              >
                {t("refTitle")}
              </SectionTitle>
              <RefList id="reflist-new-article" more={ref("more")} less={ref("less")}>
                {refKeys.map((key) => (
                  <RefRow
                    key={key}
                    reference={ref(`items.${key}.ref`)}
                    summary={ref(`items.${key}.summary`)}
                    cta={ref("cta")}
                  />
                ))}
              </RefList>
            </div>

            {/* 16 — La jurisprudence */}
            <div className="flex flex-col gap-6">
              <SectionTitle Icon={BalanceScales} iconWidth={48} iconHeight={48}>
                {t("jurTitle")}
              </SectionTitle>
              <JurList>
                {jurKeys.map((key) => (
                  <JurCard
                    key={key}
                    citation={jur(`${key}.citation`)}
                    title={jur(`${key}.title`)}
                  >
                    {/* Figma weights the lead-in at full encre inside an encre/62
                        line; `proseTags`' own `b` carries no colour, so here it
                        would inherit the 62%. */}
                    {jur.rich(`${key}.body`, {
                      ...proseTags,
                      b: (chunks) => (
                        <span className="text-h4 font-poppins text-encre">
                          {chunks}
                        </span>
                      ),
                    })}
                  </JurCard>
                ))}
              </JurList>
            </div>

            {/* 17 — the triage tool, a block of its own on the 48 rhythm. */}
            <Triage />

            {/* 18 — Questions fréquentes */}
            <div className="flex flex-col gap-6">
              <SectionTitle id="faq">{t("faqTitle")}</SectionTitle>
              <ArticleFaq />
            </div>

            {/* 20 — the closing summary, under a heading of its own. */}
            <div className="flex flex-col gap-6">
              <SectionTitle>{page("corps.takeawaysHeading")}</SectionTitle>
              <Takeaways />
            </div>
          </div>

          <Rail />
        </div>
      </Container>
    </section>
  );
}
