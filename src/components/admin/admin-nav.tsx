"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ContentIcon } from "@/components/shared/icon";
import { TINT, type Tint } from "@/lib/tints";
import { cn } from "@/lib/utils";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: string;
  tint: Tint;
}

/**
 * Admin sidebar nav — the site's junction language: every item carries its
 * tint node dot; the active route's node lights up with ring + glow.
 */
export function AdminNav({ items }: { items: AdminNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto p-3 lg:flex-col lg:p-4">
      {items.map((item) => {
        const active =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
              active
                ? "bg-white font-semibold text-foreground shadow-xs"
                : "text-muted-foreground hover:bg-white/60 hover:text-foreground",
              TINT[item.tint].node
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "size-2 shrink-0 rounded-full bg-(--node-accent)",
                active ? "shadow-[0_0_0_2px_#ffffff,0_0_8px_1px_var(--node-accent)]" : "opacity-40"
              )}
            />
            <ContentIcon
              name={item.icon}
              className={cn("size-4", active && TINT[item.tint].deep)}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
