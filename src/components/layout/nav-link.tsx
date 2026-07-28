"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import { TINT, tintAt } from "@/lib/tints";
import { cn } from "@/lib/utils";

/**
 * Desktop nav link on the ink "Signal Band". The active route carries the
 * site's node badge docked on the dotted wire; it FLIPs along the bar on
 * route change via layoutId — rendered inside each link's own wrapper, so no
 * measurement or resize listeners. Hover/focus shows a faint "ghost node"
 * preview, never under the active link. `index` picks the route's tint.
 */
export function NavLink({
  href,
  label,
  index = 0,
}: {
  href: string;
  label: string;
  index?: number;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/nav relative flex h-full items-center px-1 text-[13.5px] font-medium transition-colors duration-200 outline-none xl:text-sm",
        "focus-visible:rounded-xs focus-visible:ring-2 focus-visible:ring-white/70",
        active ? "font-semibold text-white" : "text-neutral-400 hover:text-white",
        TINT[tintAt(index)].node
      )}
    >
      {label}
      {!active && (
        <span
          aria-hidden="true"
          className="absolute bottom-[11px] left-1/2 -ml-1 size-2 translate-y-1 rounded-full bg-(--node-accent) opacity-0 transition-all duration-200 group-hover/nav:translate-y-0 group-hover/nav:opacity-50 group-focus-visible/nav:translate-y-0 group-focus-visible/nav:opacity-50 motion-reduce:transition-none"
        />
      )}
      {active && (
        <motion.span
          layoutId="nav-node"
          aria-hidden="true"
          transition={
            reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 30 }
          }
          className="absolute bottom-[10px] left-1/2 -ml-[5px] size-2.5 rounded-full bg-(--node-accent) shadow-[0_0_0_2px_#ffffff,0_0_12px_1px_var(--node-accent)]"
        />
      )}
    </Link>
  );
}
