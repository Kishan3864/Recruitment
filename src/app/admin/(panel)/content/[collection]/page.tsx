import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";

import { deleteItem } from "@/app/admin/content-actions";
import { DataTable, type DataTableRow } from "@/components/admin/data-table";
import { ContentIcon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db/client";
import { getCollection, type Row } from "@/lib/admin/registry";
import { TINT } from "@/lib/tints";
import { cn } from "@/lib/utils";

function cell(value: unknown): string {
  if (typeof value === "boolean") return value ? "✓" : "—";
  if (Array.isArray(value)) return `${value.length} items`;
  const s = String(value ?? "");
  return s.length > 60 ? `${s.slice(0, 57)}…` : s;
}

function rowLabel(row: Row): string {
  return String(row.title ?? row.name ?? row.author ?? row.question ?? row.client ?? `#${row.id}`);
}

export default async function CollectionListPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const def = getCollection(collection);
  if (!def) notFound();
  const db = getDb();
  let rows: Row[] = [];
  let dbError = false;
  if (db) {
    try {
      rows = await def.list(db);
    } catch (err) {
      console.error(`[admin] ${def.key} list query failed:`, err);
      dbError = true;
    }
  }
  const t = TINT[def.tint];

  const tableRows: DataTableRow[] = rows.map((row) => ({
    id: row.id,
    cells: def.listColumns.map((col) => cell(row[col.name])),
    editHref: `/admin/content/${def.key}/${row.id}`,
    deleteAction: deleteItem.bind(null, def.key, row.id),
    deleteLabel: rowLabel(row),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn("flex size-10 items-center justify-center rounded-md", t.surface, t.deep)}
          >
            <ContentIcon name={def.icon} className="size-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold">{def.label}</h1>
            <p className="text-sm text-muted-foreground">
              {rows.length} {rows.length === 1 ? "entry" : "entries"}
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/admin/content/${def.key}/new`}>
            <Plus data-icon="inline-start" aria-hidden="true" />
            New {def.singular.toLowerCase()}
          </Link>
        </Button>
      </div>

      {!db ? (
        <p className="rounded-lg border border-line-cream bg-tint-cream p-4 text-sm">
          Database not connected — content is read-only seed data right now.
        </p>
      ) : dbError ? (
        <p className="rounded-lg border border-line-blush bg-tint-blush p-4 text-sm">
          Database connection failed — check the credentials, then restart the app.
        </p>
      ) : rows.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No {def.label.toLowerCase()} yet — create the first one.
        </p>
      ) : (
        <DataTable
          columns={def.listColumns.map((c) => c.label)}
          rows={tableRows}
          searchPlaceholder={`Search ${def.label.toLowerCase()}…`}
        />
      )}
    </div>
  );
}
