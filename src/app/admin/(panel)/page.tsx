import Link from "next/link";
import { desc } from "drizzle-orm";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Database,
  Inbox,
  Layers,
  Mail,
  Plus,
} from "lucide-react";

import {
  AreaChart,
  BarList,
  Donut,
  Sparkline,
  type BarItem,
  type SeriesPoint,
} from "@/components/admin/charts";
import { Button } from "@/components/ui/button";
import { getDb, schema } from "@/db/client";
import { COLLECTIONS } from "@/lib/admin/registry";
import { TINT, type Tint } from "@/lib/tints";
import { cn } from "@/lib/utils";

const TZ = "Asia/Kolkata";
const DAY_MS = 86_400_000;

const dayKey = (d: Date) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);

const dayLabel = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: TZ });

function timeAgo(d: Date): string {
  const mins = Math.floor((Date.now() - d.getTime()) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: TZ });
}

function greeting(): string {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: TZ }).format(
      new Date()
    )
  );
  if (hour < 5) return "Working late";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/** Command-center dashboard: live KPIs, 30-day trend, breakdowns, activity. */
export default async function AdminDashboard() {
  const db = getDb();

  if (!db) {
    return (
      <div className="max-w-xl rounded-lg border border-line-cream bg-tint-cream p-6">
        <p className="flex items-center gap-2 font-display font-bold">
          <Database className="size-5 text-deep-cream" aria-hidden="true" />
          Database not connected
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          DATABASE_URL is not configured, so the site is serving seed content and the admin panel is
          read-only. Set DATABASE_URL, run the migrations and seed script, then reload.
        </p>
      </div>
    );
  }

  let collectionData: { def: (typeof COLLECTIONS)[number]; rows: Record<string, unknown>[] }[];
  let subs: (typeof schema.submissions.$inferSelect)[];
  try {
    [collectionData, subs] = await Promise.all([
      Promise.all(COLLECTIONS.map(async (def) => ({ def, rows: await def.list(db) }))),
      db.select().from(schema.submissions).orderBy(desc(schema.submissions.createdAt)),
    ]);
  } catch (err) {
    console.error("[admin] dashboard query failed:", err);
    return (
      <div className="max-w-xl rounded-lg border border-line-blush bg-tint-blush p-6">
        <p className="flex items-center gap-2 font-display font-bold">
          <Database className="size-5 text-deep-blush" aria-hidden="true" />
          Database connection failed
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          DATABASE_URL is set but the database rejected the connection (check the credentials, then
          restart the app). The public site keeps running on fallback content.
        </p>
      </div>
    );
  }

  /* ---- derive everything in one pass over submissions ---- */
  const now = Date.now();
  const newSubs = subs.filter((s) => s.status === "new").length;
  const apps = subs.filter((s) => s.kind === "application");
  const messages = subs.length - apps.length;

  const perDay = new Map<string, number>();
  for (const s of subs) {
    const key = dayKey(s.createdAt);
    perDay.set(key, (perDay.get(key) ?? 0) + 1);
  }
  const days30: SeriesPoint[] = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now - (29 - i) * DAY_MS);
    return { label: dayLabel(d), value: perDay.get(dayKey(d)) ?? 0 };
  });
  const spark14 = days30.slice(-14).map((p) => p.value);
  const last7 = days30.slice(-7).reduce((sum, p) => sum + p.value, 0);
  const prev7 = days30.slice(-14, -7).reduce((sum, p) => sum + p.value, 0);
  const subs30 = days30.reduce((sum, p) => sum + p.value, 0);

  const jobsRows = collectionData.find(({ def }) => def.key === "jobs")?.rows ?? [];
  const activeJobs = jobsRows.filter((j) => j.isActive === true).length;
  const jobTitle = new Map(jobsRows.map((j) => [String(j.slug), String(j.title)]));

  const appsPerJob = new Map<string, number>();
  for (const s of apps) {
    if (s.jobSlug) appsPerJob.set(s.jobSlug, (appsPerJob.get(s.jobSlug) ?? 0) + 1);
  }
  const topJobs: BarItem[] = [...appsPerJob.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([slug, count], i) => ({
      label: jobTitle.get(slug) ?? slug,
      value: count,
      barClass: TINT[(["sage", "lavender", "peach", "mint", "blush"] as Tint[])[i]].fillDeep,
      href: "/admin/submissions?kind=application",
    }));

  const totalContent = collectionData.reduce((sum, { rows }) => sum + rows.length, 0);
  const contentBars: BarItem[] = collectionData.map(({ def, rows }) => ({
    label: def.label,
    value: rows.length,
    barClass: TINT[def.tint].fillDeep,
    href: `/admin/content/${def.key}`,
  }));

  const recent = subs.slice(0, 6);

  const kpis = [
    {
      label: "Total submissions",
      value: subs.length,
      sub: `${last7 >= prev7 ? "+" : ""}${last7 - prev7} vs last week`,
      icon: Mail,
      tint: "sage" as Tint,
      href: "/admin/submissions",
      spark: spark14,
    },
    {
      label: "Awaiting review",
      value: newSubs,
      sub: `of ${subs.length} total`,
      icon: Inbox,
      tint: "blush" as Tint,
      href: "/admin/submissions?status=new",
    },
    {
      label: "Active jobs",
      value: activeJobs,
      sub: `of ${jobsRows.length} roles`,
      icon: Briefcase,
      tint: "mint" as Tint,
      href: "/admin/content/jobs",
    },
    {
      label: "Content entries",
      value: totalContent,
      sub: `across ${COLLECTIONS.length} collections`,
      icon: Layers,
      tint: "lavender" as Tint,
      href: "/admin/content/services",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">{greeting()}.</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              timeZone: TZ,
            })}
            {" — here's how the site is doing."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline">
            <Link href="/admin/content/posts/new">
              <Plus data-icon="inline-start" aria-hidden="true" />
              New post
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-primary text-primary-foreground">
            <Link href="/admin/content/jobs/new">
              <Plus data-icon="inline-start" aria-hidden="true" />
              New job
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const t = TINT[kpi.tint];
          return (
            <Link
              key={kpi.label}
              href={kpi.href}
              className={cn(
                "group relative overflow-hidden rounded-lg border p-5 transition-shadow outline-none hover:shadow-card focus-visible:ring-2 focus-visible:ring-ring/60",
                t.surface
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-md bg-white/70",
                    t.deep
                  )}
                >
                  <kpi.icon className="size-4.5" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-4 font-display text-3xl font-bold tabular-nums">{kpi.value}</p>
              <p className="mt-0.5 text-sm font-medium text-muted-foreground">{kpi.label}</p>
              <p className={cn("mt-1 text-xs font-semibold", t.deep)}>{kpi.sub}</p>
              {kpi.spark && (
                <div className="absolute right-4 bottom-4 hidden w-24 sm:block">
                  <Sparkline values={kpi.spark} color={`var(--color-accent-${kpi.tint})`} />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Trend + breakdown */}
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-lg border bg-white p-5 xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-bold">Submissions — last 30 days</h2>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{subs30}</span> in this window
            </p>
          </div>
          <div className="mt-4">
            <AreaChart
              points={days30}
              ariaLabel={`Daily submissions over the last 30 days, ${subs30} in total`}
            />
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5">
          <h2 className="font-display text-lg font-bold">Breakdown</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">All submissions, by type.</p>
          <div className="mt-5">
            {subs.length === 0 ? (
              <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                Nothing to chart yet — submissions will appear here.
              </p>
            ) : (
              <Donut
                ariaLabel={`${subs.length} submissions: ${apps.length} applications, ${messages} messages`}
                centerLabel="all time"
                segments={[
                  {
                    label: "Job applications",
                    value: apps.length,
                    color: "var(--color-accent-sage)",
                  },
                  {
                    label: "Contact messages",
                    value: messages,
                    color: "var(--color-accent-lavender)",
                  },
                ]}
              />
            )}
          </div>
          <div className="mt-5 border-t border-border pt-4">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Handled</span>
              <span className="font-semibold tabular-nums">{subs.length - newSubs}</span>
            </p>
            <p className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Awaiting review</span>
              <span className="font-semibold text-deep-blush tabular-nums">{newSubs}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content + jobs + activity */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-lg border bg-white p-5">
          <h2 className="font-display text-lg font-bold">Content overview</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {totalContent} entries — click through to manage.
          </p>
          <div className="mt-5">
            <BarList items={contentBars} />
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5">
          <h2 className="font-display text-lg font-bold">Top jobs by applications</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Where candidates are applying.</p>
          <div className="mt-5">
            {topJobs.length === 0 ? (
              <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                No applications yet — they&apos;ll rank here as they come in.
              </p>
            ) : (
              <BarList items={topJobs} />
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5 lg:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-lg font-bold">Latest activity</h2>
            <Link
              href="/admin/submissions"
              className="flex items-center gap-1 text-sm font-medium text-brand-700 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              View all
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="mt-5 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
              Nothing yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-1">
              {recent.map((s) => (
                <li key={s.id}>
                  <Link
                    href="/admin/submissions"
                    className="flex items-center gap-3 rounded-sm px-2 py-2 outline-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        s.status === "new" ? "bg-accent-cream" : "bg-accent-mint"
                      )}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{s.fullName}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {s.kind === "application"
                          ? `Applied — ${jobTitle.get(s.jobSlug ?? "") ?? s.jobSlug ?? "job"}`
                          : (s.subject ?? "Contact message")}
                      </span>
                    </span>
                    <span className="ml-auto shrink-0 text-xs text-muted-foreground tabular-nums">
                      {timeAgo(s.createdAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
