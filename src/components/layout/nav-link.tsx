"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/**
 * Desktop nav link with animated underline (scaleX on hover / active route).
 * Client component only because active state depends on the current pathname.
 */
export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative px-1 py-2 text-sm font-medium transition-colors",
        "after:absolute after:inset-x-1 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100 motion-reduce:after:transition-none",
        active ? "text-foreground after:scale-x-100" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
