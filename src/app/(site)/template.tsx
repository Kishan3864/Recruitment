"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_SOFT } from "@/lib/motion";

/*
 * True only after the first client render — the initial page load renders
 * static (SSR paint stays visible, no LCP/FCP penalty); only client-side
 * navigations get the transition. Never true on the server.
 */
let hasNavigated = false;

/** Page transition: fade + 8px rise, 300ms, on client-side route changes. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const isFirstLoad = !hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (reduceMotion || isFirstLoad) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  );
}
