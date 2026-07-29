import Link from "next/link";
import { desc } from "drizzle-orm";
import { CheckCircle2, RotateCcw, Search, X } from "lucide-react";

import { deleteSubmission, setSubmissionStatus } from "@/app/admin/content-actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDb, schema } from "@/db/client";
import { cn } from "@/lib/utils";

type Filters = { status?: string; kind?: string; q?: string };

function withQuery(filters: Filters): string {
  const sp = new URLSearchParams();
  if (filters.status) sp.set("status", filters.status);
  if (filters.kind) sp.set("kind", filters.kind);
  if (filters.q) sp.set("q", filters.q);
  const s = sp.toString();
  return `/admin/submissions${s ? `?${s}` : ""}`;
}

function FilterTab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-sm px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        active
          ? "bg-brand-950 font-semibold text-white"
          : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

/** Next delivers repeated query params as arrays — take the first value. */
const first = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

/** Inbox: contact + application submissions with status/kind filters + search. */
export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawStatus = first(params.status);
  const rawKind = first(params.kind);
  const status = rawStatus === "new" || rawStatus === "handled" ? rawStatus : undefined;
  const kind = rawKind === "application" || rawKind === "contact" ? rawKind : undefined;
  const q = (first(params.q) ?? "").trim();

  const db = getDb();
  let all: (typeof schema.submissions.$inferSelect)[] = [];
  let dbError = false;
  if (db) {
    try {
      all = await db.select().from(schema.submissions).orderBy(desc(schema.submissions.createdAt));
    } catch (err) {
      console.error("[admin] submissions query failed:", err);
      dbError = true;
    }
  }

  const counts = {
    all: all.length,
    new: all.filter((s) => s.status === "new").length,
    handled: all.filter((s) => s.status !== "new").length,
  };

  const needle = q.toLowerCase();
  const rows = all.filter((s) => {
    if (status && s.status !== status) return false;
    if (kind && s.kind !== kind) return false;
    if (needle) {
      const haystack = [s.fullName, s.email, s.subject, s.jobSlug, ...Object.values(s.payload)]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });

  const filtered = Boolean(status || kind || q);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Submissions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact messages and job applications from the site.
        </p>
      </div>

      {!db ? (
        <p className="rounded-lg border border-line-cream bg-tint-cream p-4 text-sm">
          Database not connected.
        </p>
      ) : dbError ? (
        <p className="rounded-lg border border-line-blush bg-tint-blush p-4 text-sm">
          Database connection failed — check the credentials, then restart the app.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-lg border bg-white p-3">
            <div className="flex items-center gap-1" role="group" aria-label="Filter by status">
              <FilterTab href={withQuery({ kind, q })} active={!status}>
                All <span className="font-normal tabular-nums">{counts.all}</span>
              </FilterTab>
              <FilterTab href={withQuery({ status: "new", kind, q })} active={status === "new"}>
                New <span className="font-normal tabular-nums">{counts.new}</span>
              </FilterTab>
              <FilterTab
                href={withQuery({ status: "handled", kind, q })}
                active={status === "handled"}
              >
                Handled <span className="font-normal tabular-nums">{counts.handled}</span>
              </FilterTab>
            </div>

            <span aria-hidden="true" className="hidden h-5 w-px bg-border sm:block" />

            <div className="flex items-center gap-1" role="group" aria-label="Filter by type">
              <FilterTab href={withQuery({ status, q })} active={!kind}>
                All types
              </FilterTab>
              <FilterTab
                href={withQuery({ status, kind: "application", q })}
                active={kind === "application"}
              >
                Applications
              </FilterTab>
              <FilterTab
                href={withQuery({ status, kind: "contact", q })}
                active={kind === "contact"}
              >
                Messages
              </FilterTab>
            </div>

            <form action="/admin/submissions" method="GET" className="ml-auto flex items-center gap-2">
              {status && <input type="hidden" name="status" value={status} />}
              {kind && <input type="hidden" name="kind" value={kind} />}
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Search name, email, job…"
                  aria-label="Search submissions"
                  className="w-56 pl-8"
                />
              </div>
              <Button type="submit" size="sm" variant="outline">
                Search
              </Button>
              {filtered && (
                <Button asChild size="sm" variant="ghost">
                  <Link href="/admin/submissions">
                    <X data-icon="inline-start" aria-hidden="true" />
                    Clear
                  </Link>
                </Button>
              )}
            </form>
          </div>

          {rows.length === 0 ? (
            <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              {filtered ? "Nothing matches these filters." : "No submissions yet."}
            </p>
          ) : (
            <>
              {filtered && (
                <p className="text-sm text-muted-foreground tabular-nums">
                  Showing {rows.length} of {counts.all}
                </p>
              )}
              <ul className="space-y-3">
                {rows.map((s) => (
                  <li
                    key={s.id}
                    className={cn(
                      "rounded-lg border bg-white p-4",
                      s.status === "new" && "border-line-sage bg-tint-sage/40"
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-semibold",
                          s.kind === "application"
                            ? "bg-tint-sage text-deep-sage"
                            : "bg-tint-lavender text-deep-lavender"
                        )}
                      >
                        {s.kind}
                      </span>
                      {s.status === "new" && (
                        <span className="rounded-full bg-tint-cream px-2 py-0.5 text-xs font-semibold text-deep-cream">
                          new
                        </span>
                      )}
                      <span className="font-display font-semibold">{s.fullName}</span>
                      <a
                        href={`mailto:${s.email}`}
                        className="text-sm text-brand-700 hover:underline"
                      >
                        {s.email}
                      </a>
                      {s.jobSlug && (
                        <span className="text-sm text-muted-foreground">→ {s.jobSlug}</span>
                      )}
                      {s.subject && (
                        <span className="text-sm text-muted-foreground">{s.subject}</span>
                      )}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {s.createdAt.toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Asia/Kolkata",
                        })}
                      </span>
                    </div>

                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs font-medium text-muted-foreground select-none">
                        Details
                      </summary>
                      <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                        {Object.entries(s.payload).map(([key, value]) => (
                          <div key={key} className="flex gap-2">
                            <dt className="shrink-0 font-medium text-muted-foreground">{key}:</dt>
                            <dd className="break-words">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </details>

                    <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                      {s.status === "new" ? (
                        <form action={setSubmissionStatus.bind(null, s.id, "handled")}>
                          <Button size="sm" variant="outline" type="submit">
                            <CheckCircle2 data-icon="inline-start" aria-hidden="true" />
                            Mark handled
                          </Button>
                        </form>
                      ) : (
                        <form action={setSubmissionStatus.bind(null, s.id, "new")}>
                          <Button size="sm" variant="ghost" type="submit">
                            <RotateCcw data-icon="inline-start" aria-hidden="true" />
                            Reopen
                          </Button>
                        </form>
                      )}
                      <DeleteButton
                        action={deleteSubmission.bind(null, s.id)}
                        label={`submission from ${s.fullName}`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
