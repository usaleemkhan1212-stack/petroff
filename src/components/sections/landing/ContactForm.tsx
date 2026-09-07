import ChevronDown from "@/assets/icons/chevron-down.svg";

import { CountrySelect } from "./CountrySelect";

/**
 * The lead-capture form, shared by the hero card (`14221:10033`) and the
 * sliding drawer (`14221:9786`).
 *
 * **Those two nodes are the same form.** Field for field, string for string,
 * they differ only in the wrapper's corners — the hero card rounds all four
 * (80/18/60/18) where the drawer rounds only its left pair (80 top, 18 bottom),
 * because it sits flush against the right edge of the viewport. So the body
 * lives here once and each caller supplies its own shell.
 *
 * `idPrefix` keeps the two instances' input ids and labels distinct: both are
 * in the DOM at the same time, and a duplicate `id` breaks every `<label for>`
 * on the second one.
 */

/**
 * Figma gives both dropdowns a placeholder, a chevron and **no option list**.
 * A lead form whose dropdowns cannot be opened would be a broken page, so these
 * are real `<select>`s and the bands below are ours, not the comp's — neutral
 * structure carrying no legal claim. **They need the firm's own lists.**
 */
const AMOUNTS = [
  "Under €50,000",
  "€50,000 – €250,000",
  "€250,000 – €1m",
  "Over €1m",
];

const HOLDINGS = [
  "A signed contract or invoices",
  "A French court judgment",
  "A foreign judgment or award",
  "Nothing in writing yet",
];

/** Figma's field: white, `encre/20` at 1px, 12px radius, 16/1.5 placeholder. */
const field =
  "text-small border-encre/20 text-encre placeholder:text-encre/62 " +
  "rounded-field block w-full border bg-white leading-[1.5] " +
  "focus:border-periwinkle focus:outline-none";

export function LandingContactForm({
  idPrefix,
  firstFieldRef,
}: {
  idPrefix: string;
  /** The drawer moves focus here on open; the hero passes nothing. */
  firstFieldRef?: React.Ref<HTMLTextAreaElement>;
}) {
  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    /* `data-lp-form` is the box CountrySelect clamps its panel inside. */
    <div data-lp-form className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {/*
          Two runs: the label in Poppins SemiBold and the qualifier in Inter
          Regular, both brique, both uppercased in CSS and both carrying the
          overline's tracking.
        */}
        <p className="text-overline font-poppins text-brique uppercase">
          First assessment
          {/*
            The export puts `uppercase` and the overline's tracking on the
            parent, so the generated code inherits both into this run — but
            Figma's own render draws it "— free, 15 min", in normal case with no
            tracking, because the run carries Petroff/Small 16 and that style
            has no transform. The render is what to follow.
          */}
          <span className="text-small font-inter tracking-normal normal-case">
            {" "}
            — free, 15 min
          </span>
        </p>
        <p className="text-h3 font-poppins text-encre">
          Tell us about the debtor
        </p>
        <p className="text-small text-encre/62">
          A Paris Bar lawyer replies within 24 h with the route available, the
          timing and a firm fee quote.
        </p>
      </div>

      {/*
        Real, labelled controls but deliberately not inside a `<form>` — with no
        submit handler Enter would reload the page, which is the call every
        other form on this site makes.
      */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor={id("situation")} className="sr-only">
              The situation in a few lines
            </label>
            {/*
              A textarea is inline-block by default, so its wrapper picks up a
              line-box descender; the `block` in `field` is what keeps the
              card's arithmetic honest. Its height is Figma's own 155.
            */}
            <textarea
              ref={firstFieldRef}
              id={id("situation")}
              rows={4}
              placeholder="The situation in a few lines"
              className={`${field} h-[155px] resize-none px-[18px] py-4`}
            />
          </div>

          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="min-w-0 flex-1">
              <label htmlFor={id("name")} className="sr-only">
                Your name
              </label>
              <input
                id={id("name")}
                type="text"
                placeholder="Your name"
                className={`${field} px-3 py-4`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <label htmlFor={id("company")} className="sr-only">
                Company / Country
              </label>
              <input
                id={id("company")}
                type="text"
                placeholder="Company / Country"
                className={`${field} px-[18px] py-4`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1">
              <label htmlFor={id("email")} className="sr-only">
                E-mail
              </label>
              <input
                id={id("email")}
                type="email"
                placeholder="E-mail"
                className={`${field} px-3 py-4`}
              />
            </div>
            {/*
              The dial-code prefix is drawn inside the field, so the control is
              a bordered row holding the flag and a borderless input. Its 26px
              flag line is what makes this field 58 where the others are 56 —
              Figma's own difference, and the row is items-start so it shows.
            */}
            <div className="min-w-0 flex-1">
              <label htmlFor={id("phone")} className="sr-only">
                Phone
              </label>
              <div className="border-encre/20 rounded-field focus-within:border-periwinkle flex w-full items-center gap-2 border bg-white px-[18px] py-4">
                {/* Flags are SVG artwork in a listbox — see CountrySelect. */}
                <CountrySelect name={id("dial")} />
                <input
                  id={id("phone")}
                  type="tel"
                  placeholder="Phone"
                  className="text-small text-encre placeholder:text-encre/62 min-w-0 flex-1 border-0 bg-transparent leading-[1.5] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row">
            <LandingSelect
              id={id("amount")}
              label="Amount at stake"
              options={AMOUNTS}
            />
            <LandingSelect
              id={id("holding")}
              label="You already hold..."
              options={HOLDINGS}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="text-button font-poppins bg-red w-full rounded-full px-9 py-[14px] leading-[22px] text-white transition-opacity hover:opacity-90"
          >
            Assess my case — reply within 24 h
          </button>
          <p className="text-encre/62 text-[14px] leading-[1.5]">
            <span className="text-small-strong font-inter text-encre">
              Covered by lawyer–client privilege{" "}
            </span>
            (Art. 66-5, Law of 31 December 1971). Your details are used only to
            handle this request. This form is not a secure channel — send
            documents only after we have confirmed the engagement.
          </p>
        </div>
      </div>
    </div>
  );
}

/** A field with Figma's chevron drawn inside it, at the comp's 12px sides. */
function LandingSelect({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: readonly string[];
}) {
  return (
    <div className="relative min-w-0 flex-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        defaultValue=""
        className={`${field} text-encre/62 appearance-none py-4 pr-[29px] pl-3`}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-encre">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="text-encre pointer-events-none absolute top-1/2 right-3 size-[17px] -translate-y-1/2"
      />
    </div>
  );
}
