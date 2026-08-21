import LawyerFigure from "@/assets/icons/lawyer-figure.svg";

/**
 * Figma's `seam`: a lilas strip with a gold left edge that breaks up the long
 * runs of prose, carrying an illustrated figure, two lines and a link.
 *
 * The figure is one composed asset — Figma builds it from 29 separately
 * inset vectors, the same shape as the Bibliotheque hero's skyline, so it is
 * flattened into `lawyer-figure.svg` at their exact insets rather than
 * reproduced as 29 positioned elements.
 */
export function Seam({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="bg-lilas border-gold flex flex-wrap items-center justify-between gap-5 rounded-r-2xl border-l-4 px-7 py-5">
      <div className="flex min-w-0 flex-1 items-center gap-5">
        <LawyerFigure
          aria-hidden="true"
          width={50.125}
          height={84.202}
          className="hidden shrink-0 sm:block"
        />
        {/*
          Flexed, not a fixed measure. Both seams are exactly 124.2 tall in the
          comp — the 84.2px figure plus its padding drives the height, and the
          text is meant to fit beside it. Figma gives the two text frames
          different widths (421 and 375); pinning either one wraps the other
          onto a fourth line and pushes that seam to 144.
        */}
        <p className="text-encre min-w-0 flex-1">
          <span className="text-body-strong">{title}</span>
          <br />
          <span className="text-body">{body}</span>
        </p>
      </div>
      <span className="text-button font-poppins text-periwinkle shrink-0">
        {cta}
      </span>
    </div>
  );
}
