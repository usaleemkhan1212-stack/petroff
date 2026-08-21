"use client";

import { useState } from "react";
import LinkIcon from "@/assets/icons/link.svg";
import PrinterIcon from "@/assets/icons/printer.svg";

const action =
  "border-encre/12 text-button font-poppins text-encre flex cursor-pointer items-center gap-2.25 " +
  "rounded-full border bg-white px-4.5 py-2.25 transition-colors hover:bg-lilas-2 " +
  "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * The article's two utilities. Both do real work — copying the canonical URL
 * and opening the print dialog — which is why this is the hero's only client
 * piece. The copy button reports back in place rather than through a toast.
 */
export function ArticleActions({
  copyLabel,
  printLabel,
}: {
  copyLabel: string;
  printLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard denied (insecure origin, or the user said no) — say nothing
         rather than claiming a copy that did not happen. */
    }
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      <button type="button" onClick={copy} className={action}>
        <LinkIcon aria-hidden="true" width={17} height={17} />
        {copyLabel}
      </button>
      <button type="button" onClick={() => window.print()} className={action}>
        <PrinterIcon aria-hidden="true" width={17} height={17} />
        {printLabel}
      </button>
      {/* Announced, not drawn: the comp has no copied state. */}
      <span role="status" className="sr-only">
        {copied ? copyLabel : ""}
      </span>
    </div>
  );
}
