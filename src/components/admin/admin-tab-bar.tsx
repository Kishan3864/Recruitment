"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ContentIcon } from "@/components/shared/icon";
import { TINT, type Tint } from "@/lib/tints";
import { cn } from "@/lib/utils";

export interface AdminTab {
  href: string;
  label: string;
  icon: string;
  tint: Tint;
  badge?: number;
}

/**
 * Mobile bottom tab bar — the native-app spine of the admin panel on phones
 * and tablets. Sits as the app frame's pinned footer (the frame owns the
 * viewport; only <main> scrolls). Active tab lights its tint node exactly
 * like the sidebar does on desktop; taps get a native press-scale response.
 */
export function AdminTabBar({ tabs }: { tabs: AdminTab[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin sections"
      className="shrink-0 border-t border-brand-100 bg-brand-50 pb-[env(safe-area-inset-bottom)] select-none lg:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-stretch">
        {tabs.map((tab) => {
          const active =
            tab.href === "/admin" ? pathname === "/admin" : pathname.startsWith(tab.href);
          return (
            <li key={tab.href} className="min-w-0 flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex flex-col items-center gap-1 px-1 pt-2.5 pb-2 outline-none [touch-action:manipulation] focus-visible:ring-2 focus-visible:ring-ring/60",
                  TINT[tab.tint].node
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1 size-1.5 rounded-full bg-(--node-accent) transition-opacity",
                    active
                      ? "opacity-100 shadow-[0_0_0_2px_#ffffff,0_0_8px_1px_var(--node-accent)]"
                      : "opacity-0"
                  )}
                />
                <span className="relative transition-transform duration-100 group-active:scale-90">
                  <ContentIcon
                    name={tab.icon}
                    className={cn(
                      "size-5",
                      active ? TINT[tab.tint].deep : "text-muted-foreground"
                    )}
                  />
                  {tab.badge ? (
                    <span className="absolute -top-1.5 -right-2.5 rounded-full bg-deep-blush px-1 text-[10px] leading-4 font-bold text-white tabular-nums">
                      {tab.badge > 99 ? "99+" : tab.badge}
                    </span>
                  ) : null}
                </span>
                <span
                  className={cn(
                    "max-w-full truncate text-[11px] leading-none",
                    active ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
