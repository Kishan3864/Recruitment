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
  /** Count pill (e.g. new submissions) — hidden when 0 */
  badge?: number;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

/**
 * Admin sidebar nav — the site's junction language: every item carries its
 * tint node dot; the active route's node lights up with ring + glow.
 * variant "sidebar" is the desktop rail (headings appear at lg);
 * variant "drawer" is always vertical with headings, for the mobile drawer.
 */
export function AdminNav({
  groups,
  variant = "sidebar",
}: {
  groups: AdminNavGroup[];
  variant?: "sidebar" | "drawer";
}) {
  const pathname = usePathname();
  const drawer = variant === "drawer";

  return (
    <nav
      aria-label="Admin"
      className={cn(
        drawer
          ? "flex flex-col gap-5 p-4"
          : "flex gap-4 overflow-x-auto p-3 lg:flex-col lg:gap-5 lg:overflow-visible lg:p-4"
      )}
    >
      {groups.map((group) => (
        <div key={group.title} className={cn("flex gap-1", drawer ? "flex-col" : "shrink-0 lg:flex-col")}>
          <p
            className={cn(
              "px-3 pb-1.5 text-eyebrow font-semibold text-muted-foreground uppercase",
              drawer ? "block" : "hidden lg:block"
            )}
          >
            {group.title}
          </p>
          {group.items.map((item) => {
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
                    active
                      ? "shadow-[0_0_0_2px_#ffffff,0_0_8px_1px_var(--node-accent)]"
                      : "opacity-40"
                  )}
                />
                <ContentIcon
                  name={item.icon}
                  className={cn("size-4", active && TINT[item.tint].deep)}
                />
                {item.label}
                {item.badge ? (
                  <span className="ml-auto rounded-full bg-deep-blush px-1.5 py-px text-[11px] leading-4 font-bold text-white tabular-nums">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
