import { useTranslations } from "next-intl";
import DocStack from "@/assets/icons/doc-stack.svg";
import Key from "@/assets/icons/key.svg";
import ScalesTiny from "@/assets/icons/scales-tiny.svg";
import BalanceScales from "@/assets/icons/balance-scales.svg";
import Clock from "@/assets/icons/clock.svg";
import Inbox from "@/assets/icons/inbox.svg";
import Monument from "@/assets/icons/monument.svg";
import OpenCode from "@/assets/icons/open-code.svg";
import PageCorner from "@/assets/icons/page-corner.svg";
import ShieldBadge from "@/assets/icons/shield-badge.svg";
import WarningCircle from "@/assets/icons/warning-circle.svg";
import { AnswerBox } from "@/components/sections/article/blocks/AnswerBox";
import { ArticleFaq } from "@/components/sections/article/blocks/ArticleFaq";
import { Consult } from "@/components/sections/article/blocks/Consult";
import { ComparisonTable } from "@/components/sections/article/blocks/ComparisonTable";
import { Ladder } from "@/components/sections/article/blocks/Ladder";
import { Seam } from "@/components/sections/article/blocks/Seam";
import {
  Timeline,
  TimelineItem,
} from "@/components/sections/article/blocks/Timeline";
import { JurCard, JurList } from "@/components/sections/article/blocks/JurList";
import { RefList, RefRow } from "@/components/sections/article/blocks/RefList";
import { Vigil, VigilRow } from "@/components/sections/article/blocks/Vigil";
import { Prose, proseTags } from "@/components/sections/article/blocks/Prose";
import { Callout } from "@/components/sections/article/blocks/Callout";
import { Simulator } from "@/components/sections/article/blocks/Simulator";
import { Takeaways } from "@/components/sections/article/blocks/Takeaways";
import { Triage } from "@/components/sections/article/blocks/Triage";
import { SectionTitle } from "@/components/sections/article/blocks/SectionTitle";
import { Rail } from "@/components/sections/article/Rail";
import { Container } from "@/components/ui/Container";

/**
 * The article body: an 881px column of prose and set-piece blocks, with a
 * 300px rail beside it. Figma spaces the blocks with explicit spacer frames
 * of varying height rather than one rhythm, so the gaps are margins on each
 * block rather than a single `gap` on the column.
 *
 * Built in passes — see the section table in CLAUDE.md for what has landed.
 */
const refKeys = [
  "a1365", "a1366", "a1367", "eidas", "a1368", "a1369", "a1373",
  "a1374", "a1375", "a1376", "a1379", "a1356", "a1359",
] as const;

const jurKeys = ["bail", "scannee", "verification", "cjue", "mention"] as const;

export function Corps() {
  const t = useTranslations("ArticlePage.corps");
  const seam = useTranslations("ArticlePage.seam1");
  const trap = useTranslations("ArticlePage.trap");
  const tl = useTranslations("ArticlePage.timeline");
  const seam2 = useTranslations("ArticlePage.seam2");
  const vigil = useTranslations("ArticlePage.vigil");
  const ref = useTranslations("ArticlePage.reflist");
  const jur = useTranslations("ArticlePage.jurList");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex items-start gap-16">
          <div className="min-w-0 flex-1">
            <SectionTitle id="answer" Icon={DocStack} iconWidth={52} iconHeight={45.5}>{t("answerTitle")}
            </SectionTitle>

            <div className="mt-4.5">
              <AnswerBox>
                <p>{t.rich("answer1", proseTags)}</p>
                <p>{t.rich("answer2", proseTags)}</p>
                <p>{t.rich("answer3", proseTags)}</p>
              </AnswerBox>
            </div>

            <div className="mt-14">
              <SectionTitle id="ecrit">{t("ecritTitle")}</SectionTitle>
            </div>

            <div className="mt-4.5">
              <Prose>{t.rich("ecrit1", proseTags)}</Prose>
            </div>
            <div className="mt-4">
              <Prose>{t.rich("ecrit2", proseTags)}</Prose>
            </div>
            <div className="mt-4">
              <Prose>{t.rich("ecrit3", proseTags)}</Prose>
            </div>

            <div className="mt-7.5">
              <Callout
                tag={t("rule1Tag")}
                title={t("rule1Title")}
                Icon={ScalesTiny}
              >
                {t("rule1Body")}
              </Callout>
            </div>

            <div className="mt-8">
              <Simulator />
            </div>

            <div className="mt-14">
              <SectionTitle id="niveaux" Icon={Key} iconWidth={52} iconHeight={31.778}>{t("niveauxTitle")}
              </SectionTitle>
            </div>

            <div className="mt-4.5">
              <Prose>{t.rich("niveaux1", proseTags)}</Prose>
            </div>
            <div className="mt-4">
              <Prose>{t.rich("niveaux2", proseTags)}</Prose>
            </div>
            <div className="mt-4">
              <Prose>{t.rich("niveaux3", proseTags)}</Prose>
            </div>
            <div className="mt-4">
              <Prose>{t.rich("niveaux4", proseTags)}</Prose>
            </div>

            <div className="mt-6">
              <Ladder />
            </div>

            <div className="mt-14">
              <SectionTitle id="cmp">{t("cmpTitle")}</SectionTitle>
            </div>

            <div className="mt-4.5">
              <ComparisonTable />
            </div>

            <div className="mt-7.5">
              <Seam
                title={seam("title")}
                body={seam("body")}
                cta={seam("cta")}
              />
            </div>

            <div className="mt-14">
              <SectionTitle id="juge">{t("jugeTitle")}</SectionTitle>
            </div>
            <div className="mt-4.5">
              <Prose>{t.rich("juge1", proseTags)}</Prose>
            </div>

            <h3 className="text-h3 text-encre mt-7">{t("dossierTitle")}</h3>
            <div className="mt-2.5">
              <Prose>{t.rich("dossier1", proseTags)}</Prose>
            </div>

            <div className="mt-7.5">
              <Callout
                variant="trap"
                tag={trap("tag")}
                title={trap("title")}
                Icon={WarningCircle}
              >
                {trap("body")}
              </Callout>
            </div>

            <div className="mt-14">
              <SectionTitle id="denie">{t("denieTitle")}</SectionTitle>
            </div>
            <div className="mt-4.5">
              <Prose>{t.rich("denie1", proseTags)}</Prose>
            </div>

            <div className="mt-6">
              <Timeline>
                {(["s1", "s2", "s3", "s4"] as const).map((key) => (
                  <TimelineItem
                    key={key}
                    step={tl(`${key}.step`)}
                    title={tl(`${key}.title`)}
                  >
                    {tl.rich(`${key}.body`, proseTags)}
                  </TimelineItem>
                ))}
              </Timeline>
            </div>

            <div className="mt-14">
              <SectionTitle id="forme">{t("formeTitle")}</SectionTitle>
            </div>
            <div className="mt-4.5">
              <Prose>{t.rich("forme0", proseTags)}</Prose>
            </div>
            <div className="mt-4">
              <Prose>{t.rich("forme1", proseTags)}</Prose>
            </div>
            <div className="mt-4">
              <Prose>{t.rich("forme2", proseTags)}</Prose>
            </div>
            <div className="mt-4">
              <Prose>{t.rich("forme3", proseTags)}</Prose>
            </div>

            <div className="mt-7.5">
              <Seam
                title={seam2("title")}
                body={seam2("body")}
                cta={seam2("cta")}
              />
            </div>

            <div className="mt-14">
              <SectionTitle id="organiser">{t("organiserTitle")}</SectionTitle>
            </div>
            {(["organiser1", "organiser2", "organiser3", "organiser4", "organiser5"] as const).map(
              (key, index) => (
                <div key={key} className={index === 0 ? "mt-4.5" : "mt-4"}>
                  <Prose>{t.rich(key, proseTags)}</Prose>
                </div>
              ),
            )}

            <div className="mt-14">
              <SectionTitle Icon={ShieldBadge} iconWidth={50} iconHeight={53.571}>
                {t("vigilTitle")}
              </SectionTitle>
            </div>
            <p className="text-body text-encre mt-2.5">{t("vigilLead")}</p>

            <div className="mt-3">
              <Vigil>
                <VigilRow Icon={Inbox}>{vigil.rich("boite", proseTags)}</VigilRow>
                <VigilRow Icon={PageCorner}>
                  {vigil.rich("export", proseTags)}
                </VigilRow>
                <VigilRow Icon={Monument}>
                  {vigil.rich("doubler", proseTags)}
                </VigilRow>
                <VigilRow Icon={Clock}>
                  {vigil.rich("niveau", proseTags)}
                </VigilRow>
              </Vigil>
            </div>

            <div className="mt-14">
              <SectionTitle id="textes" Icon={OpenCode} iconWidth={50} iconHeight={37.5}>{t("refTitle")}
              </SectionTitle>
            </div>
            <div className="mt-2.5">
              <RefList more={ref("more")}>
                {refKeys.slice(0, 4).map((key) => (
                  <RefRow
                    key={key}
                    reference={ref(`items.${key}.ref`)}
                    summary={ref(`items.${key}.summary`)}
                    cta={ref("cta")}
                  />
                ))}
              </RefList>
            </div>

            <div className="mt-14">
              <SectionTitle Icon={BalanceScales} iconWidth={48} iconHeight={48}>
                {t("jurTitle")}
              </SectionTitle>
            </div>
            <div className="mt-4.5">
              <JurList>
                {jurKeys.map((key) => (
                  <JurCard
                    key={key}
                    citation={jur(`${key}.citation`)}
                    title={jur(`${key}.title`)}
                  >
                    {jur.rich(`${key}.body`, proseTags)}
                  </JurCard>
                ))}
              </JurList>
            </div>

            <div className="mt-8">
              <Triage />
            </div>

            <div className="mt-14">
              <SectionTitle id="faq">{t("faqTitle")}</SectionTitle>
            </div>
            <div className="mt-4.5">
              <ArticleFaq />
            </div>

            <div className="mt-9">
              <Consult />
            </div>

            <div className="mt-14">
              <Takeaways title={t("takeawaysTitle")} />
            </div>
          </div>

          <Rail />
        </div>
      </Container>
    </section>
  );
}
