"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ApiError } from "@/lib/api";
import { ADMIN_HOME, takeLoginNotice } from "@/lib/admin-auth";
import { cn } from "@/lib/utils";

import { useAuth } from "./AuthProvider";
import { AdminLockup, Icon } from "./icons";

/**
 * The content manager's sign-in screen.
 *
 * It posts to `POST /api/admin/login` and, on success, stores the token and
 * walks on to the admin. The server is the authority on everything but
 * "is this box empty" — the fields carry `required` and nothing else, because
 * a client that decides for itself what a valid password looks like only ever
 * disagrees with the API.
 *
 * How each failure is shown, per the API contract:
 *
 * | status | shown as |
 * |---|---|
 * | 422 | the top-level `message` in the banner, plus `errors.<field>` under its own input |
 * | 403 | the server's `message`, as-is — inactive or forbidden accounts |
 * | 429 | a cool-down banner with the submit disabled until it runs out |
 * | network / other | one generic line; the API's own words if it sent any |
 *
 * **No copy here ever says whether an address is known.** The API answers an
 * unknown address and a wrong password with the same 422, and this only ever
 * repeats what it said.
 *
 * `useRouter` is `next/navigation`, **not** `@/i18n/navigation`: the admin sits
 * outside next-intl — its own root layout, and a path the proxy's locale
 * pattern excludes — so the localised router would rewrite this to
 * `/fr/admin`, which has no route.
 */

/** The reassurances on the dark panel — this site's own, not generic CMS copy. */
const POINTS = [
  "Enquiries from every form on the site, in one inbox",
  "Pages, articles and media, edited without a deploy",
  "Redirects recorded so a renamed URL keeps its traffic",
];

/**
 * What to wait after a 429 when the API's own `Retry-After` cannot be read.
 *
 * CORS hides every non-simple response header from script unless the server
 * lists it in `Access-Control-Expose-Headers`, so cross-origin this is usually
 * the number in play. The limit is 5 attempts a minute, so a minute clears it.
 */
const RETRY_FALLBACK_SECONDS = 60;

const field =
  "border-encre/13 text-encre placeholder:text-encre/45 focus:border-gold/60 w-full rounded-[11px] border bg-white py-3 pr-3 pl-10 text-[14px] outline-none transition-colors";

export function LoginCard() {
  const router = useRouter();
  const { status, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);
  const [remember, setRemember] = useState(true);

  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState<{
    tone: "error" | "notice";
    text: string;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [cooldown, setCooldown] = useState(0);

  /* Whatever ended the last session says why, once. `sessionStorage` does not
     exist until the page is mounted, so reading it is necessarily a
     post-render state change. */
  useEffect(() => {
    const notice = takeLoginNotice();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (notice) setBanner({ tone: "notice", text: notice });
  }, []);

  /* Signed in already — the proxy normally catches this, but a session that
     resolves while this page is open has to move too. */
  useEffect(() => {
    if (status === "authenticated") router.replace(ADMIN_HOME);
  }, [status, router]);

  /* The 429 cool-down, ticked in whole seconds. */
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const locked = busy || cooldown > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (locked) return;

    setBusy(true);
    setBanner(null);
    setFieldErrors({});

    try {
      await signIn(email, password, remember);
      router.replace(ADMIN_HOME);
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;

      if (err.status === 429) {
        const wait = err.retryAfter ?? RETRY_FALLBACK_SECONDS;
        setCooldown(wait);
        setBanner({
          tone: "error",
          text: "Too many attempts. Please wait a moment and try again.",
        });
      } else {
        setFieldErrors(err.errors);
        setBanner({ tone: "error", text: err.message });
      }
      /* Never leave a password sitting in the DOM after a rejection. */
      setPassword("");
    } finally {
      setBusy(false);
    }
  }

  const emailError = fieldErrors.email?.[0];
  const passwordError = fieldErrors.password?.[0];

  /*
    A 422 for bad credentials repeats one sentence in both `message` and
    `errors.email`, so printing both put "Invalid credentials." on screen twice.
    The field keeps its red outline either way — only the duplicated *sentence*
    is dropped. A real validation 422 ("The email field is required." under a
    generic banner) still shows both, because the two differ.
  */
  const showEmailError = emailError && emailError !== banner?.text;
  const showPasswordError = passwordError && passwordError !== banner?.text;

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
      <main className="bg-lilas admin-content flex min-w-0 flex-1 flex-col items-center justify-center-safe overflow-y-auto px-5 py-10">
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

            {banner ? (
              <p
                role="alert"
                className={cn(
                  "mt-5 rounded-[11px] border px-3.5 py-3 text-[13px] leading-[1.45]",
                  banner.tone === "error"
                    ? "border-red/30 bg-pale-rose/25 text-encre"
                    : "border-gold/40 bg-pale-gold/60 text-encre",
                )}
              >
                {banner.text}
                {cooldown > 0 ? (
                  <span className="text-encre/62">
                    {" "}
                    You can try again in {cooldown}s.
                  </span>
                ) : null}
              </p>
            ) : null}

            <form
              className="mt-7 flex flex-col gap-4"
              onSubmit={onSubmit}
              noValidate={false}
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
                    autoFocus
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setFieldErrors((f) => ({ ...f, email: [] }));
                    }}
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={showEmailError ? "admin-email-error" : undefined}
                    placeholder="you@petroff.law"
                    className={cn(field, emailError && "border-red/60")}
                  />
                </div>
                {showEmailError ? (
                  <span id="admin-email-error" className="text-red text-[12px]">
                    {emailError}
                  </span>
                ) : null}
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError)
                        setFieldErrors((f) => ({ ...f, password: [] }));
                    }}
                    aria-invalid={Boolean(passwordError)}
                    aria-describedby={
                      showPasswordError ? "admin-password-error" : undefined
                    }
                    placeholder="Your password"
                    className={cn(field, "pr-11", passwordError && "border-red/60")}
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
                {showPasswordError ? (
                  <span id="admin-password-error" className="text-red text-[12px]">
                    {passwordError}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
                {/*
                  This is the session's lifetime, not a convenience: the API
                  issues tokens that never expire, so on it stores a 30-day
                  cookie and off stores one that dies with the browser.
                */}
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
                  navigates to a page that does not exist, and password reset is
                  out of scope for this phase.
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
                disabled={locked}
                className="bg-gold text-encre hover:bg-brique font-poppins mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[11px] px-4 py-3 text-[14px] font-semibold transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[var(--color-gold)] disabled:hover:text-[var(--color-encre)]"
              >
                {busy ? (
                  <span
                    aria-hidden="true"
                    className="border-encre/30 border-t-encre size-4 animate-spin rounded-full border-2"
                  />
                ) : null}
                {busy
                  ? "Signing in…"
                  : cooldown > 0
                    ? `Try again in ${cooldown}s`
                    : "Sign in"}
              </button>
            </form>
          </div>

          {/*
            `next/link`, not `@/i18n/navigation`'s: that one is the localised
            router and would rewrite this to `/fr/`. Crossing from the admin's
            root layout to the site's is a full document load either way.
          */}
          <Link
            href="/"
            className="text-encre/62 hover:text-brique mt-6 flex items-center justify-center gap-1.5 text-[13px] transition-colors"
          >
            <Icon name="arrowLeft" size={15} />
            Back to the site
          </Link>
        </div>
      </main>
    </div>
  );
}
