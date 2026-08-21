import type { FC, SVGProps } from "react";
import type { ReactNode } from "react";

/**
 * Figma's `vigil`: a ruled list of habits that weaken a signed contract. Rules
 * above and below every row, so the block opens with a `border-t` and each row
 * carries its own `border-b`.
 */
export function Vigil({ children }: { children: ReactNode }) {
  return <ul className="border-encre/10 border-t">{children}</ul>;
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
