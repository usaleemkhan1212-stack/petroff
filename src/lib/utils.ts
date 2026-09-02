import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Our type tokens (text-display, text-body, text-button, ...) look exactly
 * like colour utilities to tailwind-merge, which would drop them whenever a
 * text colour is merged in — silently stripping a heading's typography.
 * Registering them as font-size classes keeps size and colour independent.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "article-title",
            "h2",
            "h2-sm",
            "h3",
            "h4",
            "lead",
            "body",
            "small",
            "small-strong",
            "body-strong",
            "overline",
            "overline-tight",
            "button",
            "badge",
            "price",
            "tag",
            "stat",
          ],
        },
      ],
    },
  },
});

/** Merge conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
