"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { AdminLockup, Icon } from "./icons";

/**
 * The content manager's sign-in screen.
 *
 * **It is a picture of a login, not a login.** There is no authentication on
 * this site yet, so nothing is checked and nothing is stored: submitting walks
 * on to `/admin`, which is already reachable without it. That is a deliberate
 * placeholder — the one line it needs when auth lands is marked below, and
 * everything else here is the finished screen.
 *
 * `useRouter` comes from `next/navigation`, **not** `@/i18n/navigation`: the
 * admin sits outside next-intl entirely — its own root layout, and a path the
 * proxy matcher excludes — so the localised router would rewrite this to
 * `/fr/admin`, which has no route.
 */

/** The reassurances on the dark panel — this site's own, not generic CMS copy. */
const POINTS = [
  "Enquiries from every form on the site, in one inbox",
  "Pages, articles and media, edited without a deploy",
  "Redirects recorded so a renamed URL keeps its traffic",
];

const field =
  "border-encre/13 text-encre placeholder:text-encre/45 focus:border-gold/60 w-full rounded-[11px] border bg-white py-3 pr-3 pl-10 text-[14px] outline-none transition-colors";

export function LoginCard() {
  const router = useRouter();
  const [reveal, setReveal] = useState(false);
  const [remember, setRemember] = useState(true);

  /*
    `h-dvh`, not `min-h-dvh`, and the fix is load-bearing. The admin's root
    layout sets `overflow-hidden` on `body`, so the page itself never scrolls;
    with `min-h-dvh` this row simply grew past the viewport on a short one and
    took the Sign in button off screen with no way to reach it. Bounded to the
    viewport, the column below is what scrolls.
  */
  return (
    <div className="flex h-dvh">
      {/*
        A flat encre panel, like the shell's rail and unlike the dashboard
        banner: the site never gradients a dark surface that carries copy, and
        this one carries four lines of it.
      */}
      <aside className="bg-encre hidden w-[44%] max-w-[520px] shrink-0 flex-col justify-between border-r border-white/5 px-12 py-11 lg:flex">
        <div className="flex flex-col items-start gap-2.5">
          <AdminLockup />
          <span className="font-poppins text-[10.5px] font-semibold tracking-[0.6px] text-white/42">
            CONTENT MANAGER
          </span>
        </div>

        <div>
          <h2 className="font-poppins text-[28px] leading-[1.25] font-semibold tracking-[-0.5px] text-white">
            The site, in one place.
          </h2>
          <ul className="mt-7 flex flex-col gap-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="bg-gold/16 text-gold mt-px flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Icon name="check" size={14} />
                </span>
                <span className="text-[13.5px] leading-[1.5] text-white/66">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[12px] text-white/42">
          Petroff Avocats · 182 rue de Rivoli, 75001 Paris
        </p>
      </aside>

      {/*
        `justify-center-safe`, not `justify-center`: centring an item that is
        taller than its scroll container pushes its top out of reach, so the
        safe keyword falls back to start alignment exactly when it overflows.
      */}
      <main className="bg-lilas admin-content justify-center-safe flex min-w-0 flex-1 flex-col items-center overflow-y-auto px-5 py-10">
        <div className="w-full max-w-[420px]">
          {/* The panel is hidden below lg, so the lockup comes with the card there. */}
          <div className="mb-6 flex justify-center lg:hidden">
            <AdminLockup tone="onLight" />
          </div>

          <div className="border-encre/7 rounded-[16px] border bg-white px-7 py-8 shadow-[0_1px_2px_rgba(18,42,76,0.04)] sm:px-9">
            <h1 className="font-poppins text-encre text-[22px] font-semibold tracking-[-0.4px]">
              Sign in
            </h1>
            <p className="text-encre/62 mt-1.5 text-[13.5px]">
              Use the address the firm issued you.
            </p>

            <form
              className="mt-7 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                /* When auth lands, the credentials go from here. */
                router.push("/admin");
              }}
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="admin-email"
                  className="text-encre text-[12.5px] font-semibold"
                >
                  Email address
                </label>
                <div className="relative">
                  <Icon
                    name="mail"
                    size={16}
                    className="text-encre/42 absolute top-1/2 left-3.5 -translate-y-1/2"
                  />
                  <input
                    id="admin-email"
                    type="email"
                    name="email"
                    autoComplete="username"
                    required
                    placeholder="contact@petroff.law"
                    className={field}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="admin-password"
                  className="text-encre text-[12.5px] font-semibold"
                >
                  Password
                </label>
                <div className="relative">
                  <Icon
                    name="lock"
                    size={16}
                    className="text-encre/42 absolute top-1/2 left-3.5 -translate-y-1/2"
                  />
                  <input
                    id="admin-password"
                    type={reveal ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Your password"
                    className={cn(field, "pr-11")}
                  />
                  <button
                    type="button"
                    onClick={() => setReveal((v) => !v)}
                    aria-label={reveal ? "Hide password" : "Show password"}
                    aria-pressed={reveal}
                    className="text-encre/42 hover:text-brique absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 transition-colors"
                  >
                    <Icon name={reveal ? "eyeOff" : "eye"} size={17} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={remember}
                  onClick={() => setRemember((v) => !v)}
                  className="text-encre flex cursor-pointer items-center gap-2.5 text-[13px]"
                >
                  <span
                    className={cn(
                      "flex size-[18px] shrink-0 items-center justify-center rounded-[6px] border transition-colors",
                      remember
                        ? "bg-gold border-gold text-encre"
                        : "border-encre/20 bg-white",
                    )}
                  >
                    {remember ? <Icon name="check" size={12} /> : null}
                  </span>
                  Keep me signed in
                </button>

                {/*
                  Inert until there is a reset route: nothing on this site
                  navigates to a page that does not exist.
                */}
                <button
                  type="button"
                  className="text-brique cursor-pointer text-[13px] font-semibold hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="bg-gold text-encre hover:bg-brique font-poppins mt-2 w-full cursor-pointer rounded-[11px] px-4 py-3 text-[14px] font-semibold transition-colors hover:text-white"
              >
                Sign in
              </button>
            </form>
          </div>

          <a
            href="/"
            className="text-encre/62 hover:text-brique mt-6 flex items-center justify-center gap-1.5 text-[13px] transition-colors"
          >
            <Icon name="arrowLeft" size={15} />
            Back to the site
          </a>
        </div>
      </main>
    </div>
  );
}
