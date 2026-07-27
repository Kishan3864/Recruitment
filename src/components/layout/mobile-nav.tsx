"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavItemContent } from "@/types/content";

interface MobileNavProps {
  brandName: string;
  items: NavItemContent[];
  cta: { label: string; href: string };
  openLabel: string;
  navLabel: string;
}

export function MobileNav({ brandName, items, cta, openLabel, navLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label={openLabel}>
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="font-display">{brandName}</SheetTitle>
        </SheetHeader>
        <nav aria-label={navLabel} className="flex flex-col gap-1 px-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="lg" className="mt-4 bg-cta text-cta-foreground hover:bg-cta/90">
            <Link href={cta.href} onClick={() => setOpen(false)}>
              {cta.label}
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
