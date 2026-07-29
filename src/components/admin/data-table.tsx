"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";

import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface DataTableRow {
  id: number;
  /** Pre-rendered display strings, aligned with `columns` */
  cells: string[];
  editHref: string;
  /** Bound server action */
  deleteAction: () => Promise<void>;
  deleteLabel: string;
}

/** Numeric compare when both cells read as numbers; locale compare otherwise. */
function compareCells(a: string, b: string): number {
  const na = Number(a);
  const nb = Number(b);
  if (a !== "" && b !== "" && !Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  return a.localeCompare(b, undefined, { sensitivity: "base", numeric: true });
}

/**
 * Client-side table over server-fetched rows: instant search across every
 * column plus click-to-sort headers. Row data arrives pre-rendered as strings,
 * so the server keeps owning formatting and the wire payload stays small.
 */
export function DataTable({
  columns,
  rows,
  searchPlaceholder = "Search…",
}: {
  columns: string[];
  rows: DataTableRow[];
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ col: number; dir: 1 | -1 } | null>(null);

  const view = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? rows.filter((row) => row.cells.some((c) => c.toLowerCase().includes(q)))
      : [...rows];
    if (sort) {
      filtered.sort((a, b) => compareCells(a.cells[sort.col], b.cells[sort.col]) * sort.dir);
    }
    return filtered;
  }, [rows, query, sort]);

  const toggleSort = (col: number) =>
    setSort((prev) =>
      prev?.col !== col ? { col, dir: 1 } : prev.dir === 1 ? { col, dir: -1 } : null
    );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="pl-8"
          />
        </div>
        <p className="text-sm text-muted-foreground tabular-nums">
          {view.length === rows.length ? (
            <>{rows.length} {rows.length === 1 ? "entry" : "entries"}</>
          ) : (
            <>
              {view.length} of {rows.length}
            </>
          )}
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              {columns.map((label, i) => {
                const active = sort?.col === i;
                const Icon = !active ? ArrowUpDown : sort.dir === 1 ? ArrowUp : ArrowDown;
                return (
                  <th
                    key={label}
                    className="px-2 py-1.5"
                    aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : undefined}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort(i)}
                      aria-label={`Sort by ${label}`}
                      className={cn(
                        "flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-eyebrow font-semibold uppercase transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60",
                        active ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {label}
                      <Icon
                        className={cn("size-3.5", !active && "opacity-40")}
                        aria-hidden="true"
                      />
                    </button>
                  </th>
                );
              })}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {view.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No matches for &ldquo;{query}&rdquo;.
                </td>
              </tr>
            ) : (
              view.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-50">
                  {row.cells.map((value, i) => (
                    <td key={i} className={cn("px-4 py-3", i === 0 && "font-semibold")}>
                      {value}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={row.editHref}>Edit</Link>
                      </Button>
                      <DeleteButton action={row.deleteAction} label={row.deleteLabel} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
