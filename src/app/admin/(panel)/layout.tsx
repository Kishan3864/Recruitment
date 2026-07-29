import type { Metadata } from "next";
import Link from "next/link";
import { eq, sql } from "drizzle-orm";
import { ExternalLink, LogOut } from "lucide-react";

import { logoutAction } from "@/app/admin/auth-actions";
import { AdminNav, type AdminNavGroup } from "@/components/admin/admin-nav";
import { AdminPwaSetup } from "@/components/admin/admin-pwa-setup";
import { AdminTabBar, type AdminTab } from "@/components/admin/admin-tab-bar";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { safeQuery, schema } from "@/db/client";
import { requireAdmin } from "@/lib/admin/auth";
import { COLLECTIONS } from "@/lib/admin/registry";
import type { Tint } from "@/lib/tints";

export const metadata: Metadata = {
  title: { absolute: "Admin" },
  robots: { index: false, follow: false },
};

/** Admin is always rendered per-request — never prerendered at build time. */
export const dynamic = "force-dynamic";

/** Admin shell: grouped ice-blue sidebar with tint-node nav + avatar topbar. */
export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await requireAdmin();

  const newSubmissions =
    (await safeQuery(async (db) => {
      const [row] = await db
        .select({ n: sql<number>`count(*)::int` })
        .from(schema.submissions)
        .where(eq(schema.submissions.status, "new"));
      return row.n;
    })) ?? 0;

  const groups: AdminNavGroup[] = [
    {
      title: "Overview",
      items: [{ href: "/admin", label: "Dashboard", icon: "layout-dashboard", tint: "sage" }],
    },
    {
      title: "Content",
      items: COLLECTIONS.map((c) => ({
        href: `/admin/content/${c.key}`,
        label: c.label,
        icon: c.icon,
        tint: c.tint as Tint,
      })),
    },
    {
      title: "Inbox",
      items: [
        {
          href: "/admin/submissions",
          label: "Submissions",
          icon: "inbox",
          tint: "blush",
          badge: newSubmissions,
        },
      ],
    },
    {
      title: "System",
      items: [
        { href: "/admin/settings", label: "Site settings", icon: "settings", tint: "cream" },
        { href: "/admin/account", label: "Account", icon: "key-round", tint: "peach" },
      ],
    },
  ];

  const tabs: AdminTab[] = [
    { href: "/admin", label: "Dashboard", icon: "layout-dashboard", tint: "sage" },
    { href: "/admin/content", label: "Content", icon: "layers", tint: "lavender" },
    { href: "/admin/submissions", label: "Inbox", icon: "inbox", tint: "blush", badge: newSubmissions },
    { href: "/admin/settings", label: "Settings", icon: "settings", tint: "cream" },
    { href: "/admin/account", label: "Account", icon: "key-round", tint: "peach" },
  ];

  const initial = (session.name || session.email).charAt(0).toUpperCase();

  return (
    /* App frame: the shell itself never scrolls — only <main> does. Chrome
       (topbar, rail, tab bar) stays pinned exactly like a native app. */
    <div className="flex h-dvh flex-col overflow-hidden [-webkit-tap-highlight-color:transparent] lg:flex-row">
      {/* Desktop rail — phones/tablets use the bottom tab bar instead. */}
      <aside className="hidden shrink-0 border-brand-100 bg-brand-50 select-none lg:block lg:h-full lg:w-64 lg:overflow-y-auto lg:border-r">
        <div className="flex items-center justify-between border-b border-brand-100 px-4 py-4">
          <Link
            href="/admin"
            className="outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <BrandLogo name="Admin" />
          </Link>
        </div>
        <AdminNav groups={groups} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-white px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 select-none lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/admin"
              className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 lg:hidden"
            >
              <BrandLogo name="Admin" />
            </Link>
            <span aria-hidden="true" className="h-6 w-px shrink-0 bg-border lg:hidden" />
            <Link
              href="/admin/account"
              className="group flex min-w-0 items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-950 font-display text-sm font-bold text-white"
              >
                {initial}
              </span>
              <span className="hidden min-w-0 md:block">
                <span className="block truncate text-sm font-semibold group-hover:text-brand-700">
                  {session.name}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {session.email}
                </span>
              </span>
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href="/" target="_blank" aria-label="View site (opens in a new tab)">
                <span className="hidden sm:inline">View site</span>
                <ExternalLink data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <form action={logoutAction}>
              <Button size="sm" variant="ghost" type="submit" aria-label="Log out">
                <LogOut data-icon="inline-start" aria-hidden="true" />
                <span className="hidden sm:inline">Log out</span>
              </Button>
            </form>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 pb-8 [touch-action:manipulation] sm:p-5 lg:p-8">
          {children}
        </main>

        <AdminTabBar tabs={tabs} />
      </div>

      {/* Install popup — after login only, every device, until installed. */}
      <AdminPwaSetup />
    </div>
  );
}
