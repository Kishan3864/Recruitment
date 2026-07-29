"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import { TINT, tintAt, type Tint } from "@/lib/tints";
import { cn } from "@/lib/utils";

/* Per-route pastel tab tints — literal classes so Tailwind's scanner sees them. */
const TAB: Record<Tint, { hover: string; active: string }> = {
  cream: { hover: "hover:bg-tint-cream", active: "bg-tint-cream" },
  lavender: { hover: "hover:bg-tint-lavender", active: "bg-tint-lavender" },
  blush: { hover: "hover:bg-tint-blush", active: "bg-tint-blush" },
  sage: { hover: "hover:bg-tint-sage", active: "bg-tint-sage" },
  mint: { hover: "hover:bg-tint-mint", active: "bg-tint-mint" },
  peach: { hover: "hover:bg-tint-peach", active: "bg-tint-peach" },
};

/**
 * Junction Rail nav tab: a pill that tints to its route's pastel on
 * hover/active. The active route docks the signature node badge half-off the
 * tab's top edge and FLIPs it between tabs on navigation (layoutId — no
 * measurement, degrades to a pop on remount). Hover shows a faint ghost node
 * preview — never under the active tab.
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
  const tint = tintAt(index);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/nav relative flex h-9 items-center rounded-full px-3 text-[13.5px] font-medium transition-colors duration-200 outline-none xl:px-3.5 xl:text-sm",
        "focus-visible:ring-2 focus-visible:ring-ring/60",
        active
          ? cn("font-semibold text-foreground", TAB[tint].active)
          : cn("text-muted-foreground hover:text-foreground", TAB[tint].hover),
        TINT[tint].node
      )}
    >
      {label}
      {!active && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 left-1/2 -ml-1 size-2 translate-y-1 rounded-full bg-(--node-accent) opacity-0 transition-all duration-200 group-hover/nav:translate-y-0 group-hover/nav:opacity-50 group-focus-visible/nav:translate-y-0 group-focus-visible/nav:opacity-50 motion-reduce:transition-none"
        />
      )}
      {active && (
        <motion.span
          layoutId="nav-node"
          aria-hidden="true"
          transition={
            reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 30 }
          }
          className="absolute -top-[5px] left-1/2 -ml-[5px] size-2.5 rounded-full bg-(--node-accent) shadow-[0_0_0_2px_#ffffff,0_0_10px_1px_var(--node-accent)]"
        />
      )}
    </Link>
  );
}
