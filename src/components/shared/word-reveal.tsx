"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_SOFT } from "@/lib/motion";

/**
 * Word-by-word headline reveal: each word rises out of its own overflow mask
 * (mask + y translate). Runs once on mount — meant for above-the-fold
 * headlines. Static under prefers-reduced-motion. Words stay natural wrap
 * units; the tiny pb/-mb pair gives descenders room inside the mask.
 */
export function WordReveal({
  text,
  delay = 0,
  stagger = 0.055,
  className,
}: {
  text: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.trim().split(/\s+/).filter(Boolean);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.55, delay: delay + i * stagger, ease: EASE_SOFT }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
