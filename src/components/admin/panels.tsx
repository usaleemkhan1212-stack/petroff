"use client";

import {
  QUICK_ACTIONS,
  REDIRECT_STATS,
  SECTION_TITLES,
  type SectionKey,
} from "@/lib/admin";

import { useAuth } from "./AuthProvider";
import { Icon, type IconName } from "./icons";
import {
  Bar,
  BigStat,
  Btn,
  Card,
  CardTitle,
  Chip,
  Chips,
  EmptyState,
  Field,
  FormGrid,
  SearchBox,
  Select,
  StatRow,
  SwitchRow,
  fieldInput,
} from "./ui";

/**
 * The seven sections.
 *
 * **No sample rows anywhere**: every list shows its empty state and counts
 * render as a middle dot, which is what the live panel shows before its API
 * answers. Inventing plausible enquiries or pages would make the prototype
 * read as data rather than as chrome.
 */

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export function Dashboard({ go }: { go: (k: SectionKey) => void }) {
  const { user } = useAuth();
  const firstName = user?.name?.trim().split(/\s+/)[0] ?? "";

  return (
    <Panel>
      {/*
        The banner's encre-to-periwinkle ramp: both ends are tokens and the
        middle stop is simply the line between them, so it keeps the comp's
        depth without inventing a colour.
      */}
      <div className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,var(--color-encre)_0%,#1d3b73_55%,var(--color-periwinkle)_100%)] px-7 py-7 text-white shadow-[0_22px_44px_-22px_rgba(18,42,76,0.5)]">
        <div className="font-poppins text-[11px] font-bold tracking-[1.5px] text-white/50">
          DASHBOARD OVERVIEW
        </div>
        <h2 className="font-poppins mt-2.5 text-[26px] font-semibold tracking-[-0.5px]">
          {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        </h2>
        <p className="mt-1.5 text-[14px] text-white/62">
          You are signed in to the Petroff Avocats content manager.
        </p>
      </div>

      <Card className="px-5 py-5">
        <div className="mb-3.5 flex items-center gap-3.5">
          <div className="flex-1">
            <CardTitle>Redirects</CardTitle>
          </div>
          <Btn onClick={() => go("redirects")}>Open redirects</Btn>
        </div>
        <StatRow>
          {REDIRECT_STATS.map((s) => (
            <BigStat key={s} label={s} />
          ))}
        </StatRow>
      </Card>

      <Card className="rounded-[18px] px-5 py-5">
        <div className="mb-3.5">
          <CardTitle>Quick actions</CardTitle>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.key}
              type="button"
              onClick={() => go(a.key)}
              className="border-encre/6 hover:border-gold/50 flex w-full cursor-pointer items-center gap-3.5 rounded-[14px] border bg-white px-4 py-3.5 text-left transition-colors"
            >
              <span className="bg-gold/16 text-brique flex size-10 shrink-0 items-center justify-center rounded-[11px]">
                <Icon name={a.icon as IconName} size={20} />
              </span>
              <span className="min-w-0 leading-[1.3]">
                <b className="font-poppins text-encre block text-[13.5px] font-semibold">
                  {SECTION_TITLES[a.key]}
                </b>
                <span className="text-encre/62 mt-0.5 block text-[11.5px]">
                  {a.note}
                </span>
              </span>
            </button>
          ))}
        </div>
      </Card>
    </Panel>
  );
}

export function Pages() {
  return (
    <Panel>
      <Bar>
        <SearchBox placeholder="Search pages by title or slug…" />
        <Btn variant="icon" icon="refresh" title="Refresh" />
        <Btn variant="primary" icon="plus">
          New page
        </Btn>
      </Bar>

      <Chips>
        <Chip active count>
          All pages
        </Chip>
        <Chip count>Expertise pages</Chip>
        <Chip count>Service pages</Chip>
        <Chip count>Lawyer pages</Chip>
        <Chip count>Legal pages</Chip>
        <Chip count>Other pages</Chip>
      </Chips>

      <EmptyState icon="doc" title="No pages to show">
        Expertise, service, lawyer and legal pages appear here once they load. Use New
        page to create one.
      </EmptyState>
    </Panel>
  );
}

export function Articles() {
  return (
    <Panel>
      <Bar>
        <SearchBox placeholder="Search articles by title or slug…" />
        <Select options={["All categories"]} />
        <Chip tone="alert" count>
          Uncategorised
        </Chip>
        <Btn variant="icon" icon="refresh" title="Refresh" />
        <Btn variant="primary" icon="plus">
          New article
        </Btn>
      </Bar>

      <Chips>
        <Chip active count>
          All
        </Chip>
        <Chip count>Published</Chip>
        <Chip count>Draft</Chip>
      </Chips>

      <EmptyState icon="article" title="No articles to show">
        Published and draft articles appear here — guides, fiches &amp; FAQ and modèles.
        The red Uncategorised filter lists any article not yet filed under a domain.
      </EmptyState>
    </Panel>
  );
}

export function Media() {
  return (
    <Panel>
      <Bar>
        <SearchBox placeholder="Search files by name…" />
        <Select options={["All folders"]} />
        <Btn variant="icon" icon="refresh" title="Refresh" />
        <Btn icon="folder">New folder</Btn>
        <Btn variant="primary" icon="upload">
          Upload
        </Btn>
      </Bar>

      <Chips>
        <Chip active count>
          All
        </Chip>
        <Chip count>Images</Chip>
        <Chip count>Documents</Chip>
      </Chips>

      <EmptyState icon="image" title="No media yet">
        Drop files here or use Upload. Images, SVGs and documents added from the editors
        also collect in this library.
      </EmptyState>
    </Panel>
  );
}

/**
 * The site's real configuration, from the `Site` namespace that generates the
 * live `<title>` and the footer's legal line — not placeholder shapes.
 */
export function Settings() {
  return (
    <Panel>
      <Chips>
        <Chip active>General</Chip>
        <Chip>Contact</Chip>
        <Chip>Social</Chip>
        <Chip>Analytics</Chip>
      </Chips>

      <Card className="px-5 py-5">
        <div className="mb-3.5">
          <CardTitle>Site</CardTitle>
        </div>
        <FormGrid>
          <Field id="s-name" label="Site name">
            <input id="s-name" className={fieldInput} defaultValue="Petroff" />
          </Field>
          <Field id="s-tag" label="Tagline">
            <input id="s-tag" className={fieldInput} defaultValue="Avocats" />
          </Field>
          <Field
            id="s-desc"
            label="Meta description"
            hint="Aim for 150–160 characters."
            full
          >
            <textarea
              id="s-desc"
              rows={3}
              className={`${fieldInput} block resize-y leading-[1.5]`}
              defaultValue="Conseil et contentieux pour les entreprises, en France et à l’international."
            />
          </Field>
          <Field id="s-lang" label="Default language">
            <Select id="s-lang" options={["Français", "English"]} />
          </Field>
          <Field id="s-tz" label="Time zone">
            <Select id="s-tz" options={["Europe/Paris", "UTC"]} />
          </Field>
        </FormGrid>
      </Card>

      <Card className="px-5 py-5">
        <div className="mb-3.5">
          <CardTitle>Contact details</CardTitle>
        </div>
        <FormGrid>
          <Field id="s-phone" label="Phone">
            <input
              id="s-phone"
              className={fieldInput}
              defaultValue="+33 (0) 1 78 90 46 46"
            />
          </Field>
          <Field id="s-email" label="Enquiries email">
            <input
              id="s-email"
              className={fieldInput}
              defaultValue="contact@petroff.law"
            />
          </Field>
          <Field id="s-addr" label="Office address" full>
            <input
              id="s-addr"
              className={fieldInput}
              defaultValue="182 rue de Rivoli, 75001 Paris"
            />
          </Field>
        </FormGrid>
      </Card>

      <Card className="px-5 py-2">
        <div className="py-3.5">
          <CardTitle>Behaviour</CardTitle>
        </div>
        <SwitchRow title="Maintenance mode" note="Show a holding page to visitors" />
        <SwitchRow
          title="Cookie banner"
          note="Ask for consent before analytics load"
          defaultOn
        />
        <SwitchRow
          title="Enquiry notifications"
          note="Email the team on every form submission"
          defaultOn
        />
      </Card>

      <Card className="sticky bottom-0 flex flex-wrap items-center gap-2.5 px-4 py-3.5">
        <span className="text-encre/62 flex-1 text-[13px]">No changes to save</span>
        <Btn>Discard</Btn>
        <Btn variant="primary">Save changes</Btn>
      </Card>
    </Panel>
  );
}

export function Redirects() {
  return (
    <Panel>
      <Card className="px-5 py-5">
        <div className="mb-3.5">
          <CardTitle>Summary</CardTitle>
        </div>
        <StatRow>
          {REDIRECT_STATS.map((s) => (
            <BigStat key={s} label={s} />
          ))}
        </StatRow>
      </Card>

      <Card className="px-5 py-5">
        <div className="mb-3.5">
          <CardTitle>Add a redirect</CardTitle>
        </div>
        <div className="grid items-end gap-4 lg:grid-cols-[1fr_1fr_170px_auto]">
          <Field id="r-from" label="From">
            <input id="r-from" className={fieldInput} placeholder="/old-path" />
          </Field>
          <Field id="r-to" label="To">
            <input id="r-to" className={fieldInput} placeholder="/new-path" />
          </Field>
          <Field id="r-reason" label="Reason">
            <Select
              id="r-reason"
              options={["Renamed", "Deleted", "Merged", "Manual"]}
            />
          </Field>
          <Btn variant="primary" icon="plus">
            Add
          </Btn>
        </div>
      </Card>

      <Bar>
        <SearchBox placeholder="Search by old or new path…" />
        <Btn variant="icon" icon="refresh" title="Refresh" />
      </Bar>

      <Chips>
        <Chip active count>
          All
        </Chip>
        {REDIRECT_STATS.slice(1).map((r) => (
          <Chip key={r} count>
            {r}
          </Chip>
        ))}
      </Chips>

      <EmptyState icon="redirect" title="No redirects yet">
        When a page is renamed or removed its old URL is recorded here so the traffic
        and the rankings follow it.
      </EmptyState>
    </Panel>
  );
}
