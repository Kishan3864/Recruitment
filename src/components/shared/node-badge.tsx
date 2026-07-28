"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_SOFT } from "@/lib/motion";
import { TINT, type Tint } from "@/lib/tints";
import { cn } from "@/lib/utils";

/**
 * Filled accent circle that docks on a card's top edge: white ring + soft
 * accent glow (.node-badge in globals), subtle 1 → 1.12 → 1 pulse when it
 * enters the viewport. Decorative unless a `label` is provided. Position it
 * from the caller (e.g. `absolute -top-4 left-8`).
 */
export function NodeBadge({
  tint,
  className,
  children,
  label,
}: {
  tint: Tint;
  className?: string;
  /** Icon or short text rendered inside the circle. */
  children?: ReactNode;
  /** Screen-reader text; omitting marks the badge decorative. */
  label?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className={cn(
        "node-badge z-10 inline-flex size-9 items-center justify-center rounded-full font-display text-sm font-bold text-white",
        TINT[tint].node,
        className
      )}
      aria-hidden={label ? undefined : true}
      whileInView={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.2 }}
    >
      {label ? <span className="sr-only">{label}</span> : null}
      {children}
    </motion.span>
  );
}
