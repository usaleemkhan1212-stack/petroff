import Image from "next/image";
import { useTranslations } from "next-intl";
import BriefcaseIcon from "@/assets/icons/briefcase.svg";
import DocumentIcon from "@/assets/icons/document.svg";
import FileLinesIcon from "@/assets/icons/file-lines.svg";
import OfficeBuildingIcon from "@/assets/icons/office-building.svg";
import PeopleDisputeIcon from "@/assets/icons/people-dispute.svg";
import PercentIcon from "@/assets/icons/percent.svg";
import PersonIcon from "@/assets/icons/person.svg";
import ShieldCheckIcon from "@/assets/icons/shield-check.svg";
import TrendingUpIcon from "@/assets/icons/trending-up.svg";
import photo from "@/assets/images/associes-walking.jpg";
import { ConsultButton } from "@/components/consultation/ConsultButton";
import { Container } from "@/components/ui/Container";

/**
 * The nine situations, in Figma's order.
 *
 * **Figma draws these icons as SF Symbols placeholders** — `dollarsign`,
 * `text.justify.left`, `arrow.up`, `text.document`, `person`, `building.2`,
 * `rectangle.portrait.and.arrow.right`, `bag`, `checkmark.shield` — so the
 * comp exports no artwork for them and the designer has not chosen real ones.
 * Each is mapped to the nearest icon already in the library, all of which are
 * 26px `currentColor` line glyphs at stroke 1.95 rendered at 24, which is the
 * documented 24/26. **Needs the designer's own choices before launch.**
 *
 * `gap` is Figma's own per-row value: the first row is 12 and the other eight
 * are 8. That is almost certainly a slip — the same shape as the Contrats
 * `transparence` card's 8px gap — so it is reproduced and flagged, not tidied.
 */
const situations = [
  { key: "dividendes", Icon: PercentIcon, gap: "gap-3" },
  { key: "gestion", Icon: FileLinesIcon, gap: "gap-2" },
  { key: "dilution", Icon: TrendingUpIcon, gap: "gap-2" },
  { key: "information", Icon: DocumentIcon, gap: "gap-2" },
  { key: "dirigeant", Icon: PersonIcon, gap: "gap-2" },
  { key: "assemblee", Icon: OfficeBuildingIcon, gap: "gap-2" },
  { key: "exclusion", Icon: PeopleDisputeIcon, gap: "gap-2" },
  { key: "cession", Icon: BriefcaseIcon, gap: "gap-2" },
  { key: "pacte", Icon: ShieldCheckIcon, gap: "gap-2" },
] as const satisfies readonly {
  key: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  gap: string;
}[];

/**
 * Figma `13445:28048` — "Vous êtes confronté à l'une de ces situations ?".
 *
 * A 470 photo column beside a 679 list. **The row takes no gap**: 470 + 679 is
 * 1149 inside the 1245 container, which `justify-between` spaces by exactly
 * 96 — the same trap the Bibliotheque hero and the two FAQ bands hit.
 */
export function QuandFaireAppel() {
  const t = useTranslations("ServicePage.quand");

  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* A flat 16 under both the overline and the title. */}
          <div className="flex flex-col gap-4">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            <p className="text-body text-encre/62 max-w-250">{t("lead")}</p>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
            {/*
              items-end so the button hugs the column's right edge, as Figma
              draws it at x=245 in the 470. The photo and the note are both
              full width, so only the button is actually moved.

              Sticky from lg, as the three e-commerce cards are: this column is
              795 against the list's 1332, so it pins at 24 and rides the nine
              situations past. `self-start` is the load-bearing half — the row
              is already items-start, but without it a future change to the
              row's alignment would stretch the column and leave nothing to
              stick. Figma draws it static; asked for.
            */}
            <div className="flex flex-col gap-9 lg:sticky lg:top-6 lg:w-117.5 lg:items-end lg:self-start">
              <div className="aspect-[470/548] w-full overflow-hidden rounded-tl-[200px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[60px]">
                <Image
                  src={photo}
                  alt={t("imageAlt")}
                  sizes="(min-width: 1024px) 470px, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* A 3px red left edge, like the Interlocuteurs angle note on
                  the article and e-commerce pages. Full width of the column:
                  Figma's angle frame is the whole 470 with its text at x=16,
                  so the border sits inside that 16 — hence pl-3.25, which
                  lands the text on 454 rather than 451. */}
              <p className="text-small text-encre/62 border-red w-full border-l-3 py-0.5 pl-3.25">
                {t.rich("note", {
                  s: (chunks) => (
                    <span className="text-button font-poppins text-encre">
                      {chunks}
                    </span>
                  ),
                })}
              </p>

              <ConsultButton size="lg">{t("cta")}</ConsultButton>
            </div>

            <ul className="flex flex-col gap-4 lg:w-169.75">
              {situations.map(({ key, Icon, gap }) => (
                <li
                  key={key}
                  className="border-encre/10 flex items-start gap-4.5 border-b py-4.5"
                >
                  <span aria-hidden="true" className="text-brique shrink-0">
                    <Icon width={24} height={24} />
                  </span>
                  <div className={`flex min-w-0 flex-1 flex-col ${gap}`}>
                    <h3 className="text-h4 font-poppins text-encre">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-body text-encre/62">
                      {t.rich(`items.${key}.body`, {
                        b: (chunks) => (
                          <span className="text-body-strong">{chunks}</span>
                        ),
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
