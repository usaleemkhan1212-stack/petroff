import type { FC, SVGProps } from "react";

/**
 * Figma calls this `hdico`: a 40px section title with an optional illustrated
 * glyph beside it. The glyph is decorative — the heading carries the meaning.
 */
export function SectionTitle({
  id,
  children,
  Icon,
  iconWidth,
  iconHeight,
}: {
  /** Anchor target for the rail's table of contents. */
  id?: string;
  children: React.ReactNode;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  iconWidth?: number;
  iconHeight?: number;
}) {
  return (
    <h2 id={id} className="text-h2 text-encre flex scroll-mt-6 items-center gap-4">
      {Icon ? (
        <Icon
          aria-hidden="true"
          width={iconWidth}
          height={iconHeight}
          className="shrink-0"
        />
      ) : null}
      <span className="min-w-0 flex-1">{children}</span>
    </h2>
  );
}
