import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Shopfront from "@/assets/icons/shopfront.svg";
import ShoppingCart from "@/assets/icons/shopping-cart-scene.svg";
import balconyPhoto from "@/assets/images/balcony-call-laptop.jpg";
import shoppingPhoto from "@/assets/images/online-shopping-laptop.jpg";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * The 280px tiles and both seams share one set of corners; the flourished
 * service cards mirror it on the other diagonal. Ornament values, so literal
 * px — the sanctioned exception.
 */
const tileCorners =
  "rounded-tl-[120px] rounded-tr-[10px] rounded-br-[60px] rounded-bl-[20px]";

/*
  Literal key unions, not `string`. Widening a key to `string` turns
  t(`services.${key}.title`) into a plain template string, which next-intl's
  typed catalogue rejects — the trap `resultatsItems` and the Ladder hit.
*/
const serviceKeys = [
  "cgv",
  "retractation",
  "prix",
  "avis",
  "abonnements",
  "securite",
  "precontractuel",
  "garanties",
  "publicite",
  "marketplace",
  "donnees",
  "transfrontalier",
] as const;

type ServiceKey = (typeof serviceKeys)[number];
type SeamKey = "fiches" | "prix";
type Tone = "mint" | "rose";
type PhotoKey = "balcony" | "shopping";

/**
 * Figma's `13331:11970`: twelve service cards in two independent columns,
 * broken up by two photographs, two illustrated tiles and two CTA seams.
 *
 * The columns are lists, not rows — Figma gives them their own sequences and
 * they do not line up — so they stack one after the other below `lg` rather
 * than interleaving.
 *
 * **Figma's own grid is 1268 wide inside the 1245 band** (610 + 48 + 610), so
 * it overhangs the container by 23px. The columns are equal grid tracks here,
 * which puts them at 598.5 — the same call every other oversized frame on this
 * build gets.
 */
export function CommentNousAidons() {
  const t = useTranslations("EcommercePage.aide");

  /** A service card: title, lead, four checks, a result and its CTA. */
  const Service = ({
    itemKey,
    flourish = false,
  }: {
    itemKey: ServiceKey;
    flourish?: boolean;
  }) => (
    <Card
      className={cn(
        "flex flex-col gap-3 p-6 sm:p-9",
        // Figma mirrors the tiles' big corner on some cards, and gives those
        // the deeper bottom padding that makes room for it.
        flourish && "rounded-bl-[120px] pb-12 sm:pb-16",
      )}
    >
      <h3 className="text-h3 text-encre">{t(`services.${itemKey}.title`)}</h3>
      <p className="text-body text-encre/62">{t(`services.${itemKey}.lead`)}</p>

      <p className="text-h4 font-poppins text-encre">{t("examine")}</p>
      <ul className="flex flex-col gap-2">
        {(t.raw(`services.${itemKey}.bullets`) as string[]).map((line) => (
          <li key={line} className="flex items-center gap-2">
            {/* A 10px rose circle — a span, not a file, as elsewhere. */}
            <span
              aria-hidden="true"
              className="bg-rose size-2.5 shrink-0 rounded-full"
            />
            <span className="text-small text-encre/62 min-w-0 flex-1">
              {line}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-h4 font-poppins text-encre">{t("result")}</p>
      <p className="text-body text-encre/62">{t(`services.${itemKey}.result`)}</p>

      <div className="flex w-full flex-col gap-4">
        <span aria-hidden="true" className="bg-encre/10 h-px w-full" />
        {/* Inert, like every CTA on the site until its route exists. */}
        <span className="text-button font-poppins border-gold text-brique w-fit rounded-full border-[1.5px] px-7 py-4">
          {t(`services.${itemKey}.cta`)}
        </span>
      </div>
    </Card>
  );

  /** A 610x280 photograph in the tiles' corner set. */
  const Photo = ({
    src,
    itemKey,
  }: {
    src: StaticImageData;
    itemKey: PhotoKey;
  }) => (
    <div className={cn("relative aspect-[610/280] w-full overflow-hidden", tileCorners)}>
      <Image
        src={src}
        alt={t(`photoAlt.${itemKey}`)}
        fill
        sizes="(min-width: 1280px) 599px, 100vw"
        className="object-cover"
      />
    </div>
  );

  /** A 610x280 tile carrying one centred illustration. */
  const Art = ({
    ground,
    children,
  }: {
    ground: "lilas-2" | "pale-gold";
    children: React.ReactNode;
  }) => (
    <div
      aria-hidden="true"
      className={cn(
        "flex aspect-[610/280] w-full items-center justify-center",
        tileCorners,
        ground === "lilas-2" ? "bg-lilas-2" : "bg-pale-gold",
      )}
    >
      {children}
    </div>
  );

  /**
   * One of the two CTA seams. They differ in exactly one value — the ground —
   * and are pale mint and pale rose at 30%.
   *
   * **`get_design_context` reports the rose one as `bg-[#122a4c]` with white
   * copy**, which is wrong: the node renders `#f3e5ea`, i.e. pale-rose at 30%
   * over lilas, with a gold overline, an encre title and a gold button —
   * exactly the mint seam's tone set. Settled by counting pixels in
   * `get_screenshot`, the same way the Methode badge fill was.
   */
  const Seam = ({ itemKey, tone }: { itemKey: SeamKey; tone: Tone }) => (
    <div
      className={cn(
        "flex flex-col items-start gap-6 p-6 sm:pt-12 sm:pr-9 sm:pb-9 sm:pl-12",
        tileCorners,
        tone === "mint" ? "bg-pale-mint" : "bg-pale-rose/30",
      )}
    >
      <p className="text-overline font-poppins text-gold uppercase">
        {t(`seams.${itemKey}.overline`)}
      </p>
      <h3 className="text-price text-encre">{t(`seams.${itemKey}.title`)}</h3>
      <p className="text-body text-encre/62">{t(`seams.${itemKey}.body`)}</p>
      <span className="text-button font-poppins bg-gold rounded-full px-7 py-4 text-white">
        {t(`seams.${itemKey}.cta`)}
      </span>
    </div>
  );

  return (
    <section className="bg-lilas">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <p className="text-overline font-poppins text-brique uppercase">
              {t("overline")}
            </p>
            <h2 className="text-h2 text-encre">{t("title")}</h2>
            {/* Figma's frame is 820 inside the 1245 band. */}
            <p className="text-body text-encre/62 max-w-205">{t("lead")}</p>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-6">
              <Service itemKey="cgv" flourish />
              <Art ground="lilas-2">
                <Shopfront width={142} height={160} />
              </Art>
              <Service itemKey="retractation" />
              <Service itemKey="prix" flourish />
              <Seam itemKey="fiches" tone="mint" />
              <Service itemKey="avis" flourish />
              <Photo src={balconyPhoto} itemKey="balcony" />
              <Service itemKey="abonnements" />
              <Service itemKey="securite" />
            </div>

            <div className="flex flex-col gap-6">
              <Service itemKey="precontractuel" />
              <Service itemKey="garanties" />
              <Service itemKey="publicite" flourish />
              <Photo src={shoppingPhoto} itemKey="shopping" />
              <Service itemKey="marketplace" />
              <Service itemKey="donnees" />
              <Seam itemKey="prix" tone="rose" />
              <Service itemKey="transfrontalier" flourish />
              <Art ground="pale-gold">
                <ShoppingCart width={137} height={160} />
              </Art>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
