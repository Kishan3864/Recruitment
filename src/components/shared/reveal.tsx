"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_SOFT, REVEAL_VIEWPORT } from "@/lib/motion";

/**
 * Scroll-reveal wrapper: opacity 0→1, y 24→0, blur 4→0 — once, at 20%
 * viewport entry, on the shared soft ease. Respects prefers-reduced-motion
 * (renders static). Use `delay` for sibling stagger (90ms steps).
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: DURATION.reveal, delay, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  );
}
