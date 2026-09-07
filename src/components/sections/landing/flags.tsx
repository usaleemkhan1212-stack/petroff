/**
 * Flags for the phone field's country selector, drawn as SVG.
 *
 * **Emoji flags cannot be relied on.** Chrome on Windows ships no
 * regional-indicator glyphs at all, so `🇫🇷` degrades to the letters "FR"; macOS,
 * iOS and Android draw it. A landing page cannot look different on Windows, so
 * the flags are artwork rather than characters — which also means they can sit
 * in a listbox, where a native `<select>` could only ever render text.
 *
 * Every flag is drawn in a **21x14 box (3:2)**, the common proportion for these,
 * with Switzerland's square and Nepal-like shapes avoided entirely. Details too
 * small to read at 21px — Spain's arms, Portugal's armillary sphere — are
 * omitted, which is what every flag-icon set does at this size; but no flag is
 * *approximated wrongly*. Countries whose flags cannot be rendered faithfully at
 * this size (Saudi Arabia's shahada, Qatar's serration, Hong Kong's bauhinia)
 * are deliberately **left out of the list** rather than drawn badly.
 */
export type CountryCode =
  | "FR"
  | "GB"
  | "US"
  | "DE"
  | "ES"
  | "IT"
  | "NL"
  | "BE"
  | "CH"
  | "IE"
  | "LU"
  | "BG"
  | "AE"
  | "JP"
  | "CN"
  | "IN";

/** Three equal vertical bands, hoist first. */
function Vertical({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <>
      <rect width="7" height="14" fill={a} />
      <rect x="7" width="7" height="14" fill={b} />
      <rect x="14" width="7" height="14" fill={c} />
    </>
  );
}

/** Three equal horizontal bands, top first. */
function Horizontal({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <>
      <rect width="21" height="4.667" fill={a} />
      <rect y="4.667" width="21" height="4.666" fill={b} />
      <rect y="9.333" width="21" height="4.667" fill={c} />
    </>
  );
}

const ART: Record<CountryCode, React.ReactNode> = {
  FR: <Vertical a="#002654" b="#FFFFFF" c="#CE1126" />,
  IT: <Vertical a="#009246" b="#F1F2F1" c="#CE2B37" />,
  BE: <Vertical a="#000000" b="#FAE042" c="#ED2939" />,
  IE: <Vertical a="#169B62" b="#FFFFFF" c="#FF883E" />,
  DE: <Horizontal a="#000000" b="#DD0000" c="#FFCE00" />,
  NL: <Horizontal a="#AE1C28" b="#FFFFFF" c="#21468B" />,
  LU: <Horizontal a="#ED2939" b="#FFFFFF" c="#00A1DE" />,
  BG: <Horizontal a="#FFFFFF" b="#00966E" c="#D62612" />,
  ES: (
    <>
      <rect width="21" height="14" fill="#AA151B" />
      <rect y="3.5" width="21" height="7" fill="#F1BF00" />
    </>
  ),
  CH: (
    <>
      <rect width="21" height="14" fill="#DA291C" />
      <rect x="9" y="3" width="3" height="8" fill="#FFFFFF" />
      <rect x="6.5" y="5.5" width="8" height="3" fill="#FFFFFF" />
    </>
  ),
  JP: (
    <>
      <rect width="21" height="14" fill="#FFFFFF" />
      <circle cx="10.5" cy="7" r="4.2" fill="#BC002D" />
    </>
  ),
  AE: (
    <>
      <rect width="21" height="4.667" fill="#00732F" />
      <rect y="4.667" width="21" height="4.666" fill="#FFFFFF" />
      <rect y="9.333" width="21" height="4.667" fill="#000000" />
      <rect width="5.25" height="14" fill="#FF0000" />
    </>
  ),
  IN: (
    <>
      <rect width="21" height="4.667" fill="#FF9933" />
      <rect y="4.667" width="21" height="4.666" fill="#FFFFFF" />
      <rect y="9.333" width="21" height="4.667" fill="#138808" />
      <circle
        cx="10.5"
        cy="7"
        r="1.9"
        fill="none"
        stroke="#000080"
        strokeWidth="0.5"
      />
      <circle cx="10.5" cy="7" r="0.4" fill="#000080" />
    </>
  ),
  CN: (
    <>
      <rect width="21" height="14" fill="#EE1C25" />
      <path
        d="M4.2 2.1 4.83 4.03 6.86 4.03 5.22 5.23 5.85 7.16 4.2 5.97 2.55 7.16 3.18 5.23 1.54 4.03 3.57 4.03Z"
        fill="#FFDE00"
      />
      <circle cx="8.4" cy="1.75" r="0.62" fill="#FFDE00" />
      <circle cx="10.15" cy="3.5" r="0.62" fill="#FFDE00" />
      <circle cx="10.15" cy="5.95" r="0.62" fill="#FFDE00" />
      <circle cx="8.4" cy="7.7" r="0.62" fill="#FFDE00" />
    </>
  ),
  GB: (
    <>
      <rect width="21" height="14" fill="#012169" />
      {/* white saltire, then the red saltire offset inside it */}
      <path d="M0 0 21 14M21 0 0 14" stroke="#FFFFFF" strokeWidth="2.8" />
      <path d="M0 0 21 14M21 0 0 14" stroke="#C8102E" strokeWidth="1.4" />
      {/* white cross, then the red cross inside it */}
      <path d="M10.5 0V14M0 7H21" stroke="#FFFFFF" strokeWidth="4.6" />
      <path d="M10.5 0V14M0 7H21" stroke="#C8102E" strokeWidth="2.8" />
    </>
  ),
  US: (
    <>
      <rect width="21" height="14" fill="#FFFFFF" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect
          key={i}
          y={(i * 14) / 13}
          width="21"
          height={14 / 13}
          fill="#B31942"
        />
      ))}
      <rect width="9" height={(7 * 14) / 13} fill="#0A3161" />
      {/* the star field, read as dots at this size */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={1 + col * 1.85 + (row % 2 ? 0.92 : 0)}
            cy={1.1 + row * 1.75}
            r="0.42"
            fill="#FFFFFF"
          />
        )),
      )}
    </>
  ),
};

export function CountryFlag({
  code,
  className,
}: {
  code: CountryCode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 21 14"
      width={21}
      height={14}
      aria-hidden="true"
      className={className}
      /* A hairline keeps white-edged flags (Japan, Switzerland's neighbours)
         from dissolving into a white field. */
      style={{ borderRadius: 2, boxShadow: "0 0 0 0.5px rgba(18,42,76,0.15)" }}
    >
      {ART[code]}
    </svg>
  );
}
