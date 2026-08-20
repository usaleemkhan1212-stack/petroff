import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware replacements for next/link and next/navigation.
 *
 * Always import Link, useRouter, usePathname and redirect from HERE, never
 * from "next/link" or "next/navigation" — these keep the active locale on
 * every navigation. Using the plain Next versions silently drops the locale.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
