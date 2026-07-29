import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { ArrowRight, Database } from "lucide-react";

import { ContentIcon } from "@/components/shared/icon";
import { getDb, schema } from "@/db/client";
import { COLLECTIONS } from "@/lib/admin/registry";
import { TINT } from "@/lib/tints";
import { cn } from "@/lib/utils";

/** Dashboard: content counts per collection + latest submissions. */
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

  let counts: { def: (typeof COLLECTIONS)[number]; rows: number }[];
  let newSubmissions: number;
  let recent: (typeof schema.submissions.$inferSelect)[];
  try {
    counts = await Promise.all(
      COLLECTIONS.map(async (def) => ({ def, rows: (await def.list(db)).length }))
    );
    [{ value: newSubmissions }] = await db
      .select({ value: sql<number>`count(*)::int` })
      .from(schema.submissions)
      .where(eq(schema.submissions.status, "new"));
    recent = await db
      .select()
      .from(schema.submissions)
      .orderBy(desc(schema.submissions.createdAt))
      .limit(5);
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

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything the site shows is managed from here.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {counts.map(({ def, rows }) => {
          const t = TINT[def.tint];
          return (
            <Link
              key={def.key}
              href={`/admin/content/${def.key}`}
              className={cn(
                "group relative rounded-lg border p-5 transition-shadow outline-none hover:shadow-card focus-visible:ring-2 focus-visible:ring-ring/60",
                t.surface
              )}
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-md bg-white/70",
                  t.deep
                )}
              >
                <ContentIcon name={def.icon} className="size-4.5" />
              </span>
              <p className="mt-4 font-display text-3xl font-bold">{rows}</p>
              <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-muted-foreground">
                {def.label}
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </p>
            </Link>
          );
        })}
        <Link
          href="/admin/submissions"
          className="group relative rounded-lg border border-line-blush bg-tint-blush p-5 transition-shadow outline-none hover:shadow-card focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-white/70 text-deep-blush">
            <ContentIcon name="mail" className="size-4.5" />
          </span>
          <p className="mt-4 font-display text-3xl font-bold">{newSubmissions}</p>
          <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-muted-foreground">
            New submissions
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </p>
        </Link>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold">Latest submissions</h2>
        {recent.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Nothing yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border rounded-lg border bg-white">
            {recent.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 text-sm"
              >
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
                <span className="font-semibold">{s.fullName}</span>
                <span className="text-muted-foreground">{s.email}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {s.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
