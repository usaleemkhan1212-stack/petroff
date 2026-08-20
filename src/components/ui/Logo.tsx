import LogoMark from "@/assets/icons/logo-mark.svg";
import LogoTagline from "@/assets/icons/logo-tagline.svg";
import LogoWordmark from "@/assets/icons/logo-wordmark.svg";
import { cn } from "@/lib/utils";

type Tone = "onLight" | "onDark";

/** Only the wordmark changes between surfaces; mark and tagline hold their brand colours. */
const wordmarkTones: Record<Tone, string> = {
  onLight: "text-encre",
  onDark: "text-white",
};

/**
 * Petroff lockup: circular mark + PETROFF wordmark + "BUSINESS LAW FIRM".
 * The three SVGs use currentColor, so each part takes its brand colour from
 * a token class rather than a hex baked into the file. Their intrinsic
 * width/height are left untouched to preserve the designed geometry.
 */
export function Logo({
  className,
  tone = "onLight",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <span className={className}>
      <span className="flex items-center gap-2">
        <LogoMark className="text-periwinkle shrink-0" aria-hidden="true" />
        <span className="flex flex-col gap-1">
          <LogoWordmark className={cn(wordmarkTones[tone])} aria-hidden="true" />
          <LogoTagline className="text-gold" aria-hidden="true" />
        </span>
      </span>
    </span>
  );
}
