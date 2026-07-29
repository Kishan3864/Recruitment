import { desc } from "drizzle-orm";
import { CheckCircle2, RotateCcw } from "lucide-react";

import { deleteSubmission, setSubmissionStatus } from "@/app/admin/content-actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { getDb, schema } from "@/db/client";
import { cn } from "@/lib/utils";

/** Contact + application submissions: newest first, expandable payloads. */
export default async function SubmissionsPage() {
  const db = getDb();
  const rows = db
    ? await db.select().from(schema.submissions).orderBy(desc(schema.submissions.createdAt))
    : [];

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
      ) : rows.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No submissions yet.
        </p>
      ) : (
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
                <span className="font-display font-semibold">{s.fullName}</span>
                <a href={`mailto:${s.email}`} className="text-sm text-brand-700 hover:underline">
                  {s.email}
                </a>
                {s.jobSlug && <span className="text-sm text-muted-foreground">→ {s.jobSlug}</span>}
                {s.subject && <span className="text-sm text-muted-foreground">{s.subject}</span>}
                <span className="ml-auto text-xs text-muted-foreground">
                  {s.createdAt.toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
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
      )}
    </div>
  );
}
