import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";

import { logoutAction } from "@/app/admin/auth-actions";
import { AdminNav, type AdminNavItem } from "@/components/admin/admin-nav";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/auth";
import { COLLECTIONS } from "@/lib/admin/registry";
import type { Tint } from "@/lib/tints";

export const metadata: Metadata = {
  title: { absolute: "Admin" },
  robots: { index: false, follow: false },
};

/** Admin is always rendered per-request — never prerendered at build time. */
export const dynamic = "force-dynamic";

/** Admin shell: ice-blue sidebar with tint-node nav, topbar with session. */
export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await requireAdmin();

  const nav: AdminNavItem[] = [
    { href: "/admin", label: "Dashboard", icon: "target", tint: "sage" },
    ...COLLECTIONS.map((c) => ({
      href: `/admin/content/${c.key}`,
      label: c.label,
      icon: c.icon,
      tint: c.tint as Tint,
    })),
    { href: "/admin/submissions", label: "Submissions", icon: "mail", tint: "blush" },
    { href: "/admin/settings", label: "Site settings", icon: "lock", tint: "cream" },
  ];

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <aside className="shrink-0 border-b border-brand-100 bg-brand-50 lg:sticky lg:top-0 lg:h-svh lg:w-64 lg:overflow-y-auto lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between border-b border-brand-100 px-4 py-4">
          <Link
            href="/admin"
            className="outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <BrandLogo name="Admin" />
          </Link>
        </div>
        <AdminNav items={nav} />
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between gap-3 border-b border-border bg-white px-5 py-3 lg:px-8">
          <p className="truncate text-sm text-muted-foreground">
            Signed in as <span className="font-semibold text-foreground">{session.email}</span>
          </p>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href="/" target="_blank">
                View site
                <ExternalLink data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <form action={logoutAction}>
              <Button size="sm" variant="ghost" type="submit">
                <LogOut data-icon="inline-start" aria-hidden="true" />
                Log out
              </Button>
            </form>
          </div>
        </header>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
