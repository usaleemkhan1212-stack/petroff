import type { FC, SVGProps } from "react";
import type { ReactNode } from "react";

/**
 * Figma's `vigil` (`13318:2818`): four habits that weaken an otherwise regular
 * contract, as ruled rows — no gap between them, 18 of padding above and
 * below, an 18px gap to the 24px glyph, and an `encre/10` rule under each.
 */
export function Vigil({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col">{children}</ul>;
}

export function VigilRow({
  Icon,
  children,
}: {
  Icon: FC<SVGProps<SVGSVGElement>>;
  children: ReactNode;
}) {
  return (
    <li className="border-encre/10 flex items-start gap-4.5 border-b py-4.5">
      <Icon
        aria-hidden="true"
        width={24}
        height={24}
        className="text-encre mt-0.5 shrink-0"
      />
      <p className="text-body text-encre min-w-0 flex-1">{children}</p>
    </li>
  );
}
