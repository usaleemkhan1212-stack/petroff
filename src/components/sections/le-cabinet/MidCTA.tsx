import { useTranslations } from "next-intl";
import { MidCta } from "@/components/contact/MidCta";

/** Figma `13701:24190` — the shared callback band with this page's own copy. */
export function MidCTA() {
  const t = useTranslations("CabinetPage.midCta");
  return <MidCta title={t("title")} lead={t("lead")} />;
}
