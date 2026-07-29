import Link from "next/link";
import { ArrowRight, Database } from "lucide-react";

import { ContentIcon } from "@/components/shared/icon";
import { getDb } from "@/db/client";
import { COLLECTIONS } from "@/lib/admin/registry";
import { TINT } from "@/lib/tints";
import { cn } from "@/lib/utils";

/**
 * Content index — the "Content" tab's home: every collection as a tint card
 * with its live count. Mirrors the dashboard's card language.
 */
export default async function ContentIndexPage() {
  const db = getDb();

  let counts: number[] | null = null;
  if (db) {
    try {
      counts = await Promise.all(COLLECTIONS.map(async (def) => (await def.list(db)).length));
    } catch (err) {
      console.error("[admin] content index query failed:", err);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Content</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything the public site shows, one collection per card.
        </p>
      </div>

      {!db ? (
        <p className="rounded-lg border border-line-cream bg-tint-cream p-4 text-sm">
          Database not connected — content is read-only seed data right now.
        </p>
      ) : counts === null ? (
        <p className="flex items-center gap-2 rounded-lg border border-line-blush bg-tint-blush p-4 text-sm">
          <Database className="size-4 shrink-0 text-deep-blush" aria-hidden="true" />
          Database connection failed — check the credentials, then restart the app.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {COLLECTIONS.map((def, i) => {
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
                <p className="mt-4 font-display text-3xl font-bold tabular-nums">
                  {counts?.[i] ?? 0}
                </p>
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
        </div>
      )}
    </div>
  );
}
