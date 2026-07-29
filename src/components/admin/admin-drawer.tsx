"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

import { AdminNav, type AdminNavGroup } from "@/components/admin/admin-nav";
import { BrandLogo } from "@/components/shared/brand-logo";

/**
 * Mobile/tablet drawer — hamburger in the topbar opens the full grouped
 * sidebar (every collection, badges and all) as a left sheet. Closes itself
 * on navigation. Desktop keeps the permanent rail; this never renders ≥lg.
 */
export function AdminDrawer({ groups }: { groups: AdminNavGroup[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Open menu"
          className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-brand-100 bg-white outline-none transition-transform [touch-action:manipulation] active:scale-95 focus-visible:ring-2 focus-visible:ring-ring/60 lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-950/40 backdrop-blur-xs lg:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col border-r border-brand-100 bg-brand-50 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] outline-none select-none motion-safe:animate-drawer lg:hidden"
        >
          <Dialog.Title className="sr-only">Admin menu</Dialog.Title>
          <div className="flex shrink-0 items-center justify-between border-b border-brand-100 px-4 py-4">
            <BrandLogo name="Admin" />
            <Dialog.Close asChild>
              <button
                aria-label="Close menu"
                className="rounded-sm p-1.5 text-muted-foreground outline-none [touch-action:manipulation] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <AdminNav groups={groups} variant="drawer" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
