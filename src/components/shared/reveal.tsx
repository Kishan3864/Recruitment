"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-reveal wrapper: fades + rises once when entering the viewport.
 * Respects prefers-reduced-motion (renders static). Use `delay` for stagger.
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
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.65, 0.32, 0.95] }}
    >
      {children}
    </motion.div>
  );
}
