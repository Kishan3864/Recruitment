"use client";

import { useId, useRef, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Dashed SVG connector that "draws itself" as it scrolls through the
 * viewport: a solid mask path, scrubbed by scroll progress (pathLength),
 * progressively reveals the static dashed stroke beneath — so the dash
 * pattern itself never distorts. Decorative (aria-hidden). Renders the full
 * path under reduced motion. Hide on mobile from the caller (`hidden lg:block`).
 */
export function DashedConnector({
  d,
  viewBox,
  className,
  stroke = "var(--color-neutral-300)",
  strokeWidth = 2,
  dash = "0.01 1.5",
  preserveAspectRatio = "none",
  offset = ["start 0.75", "end 0.4"],
}: {
  /** SVG path data in `viewBox` coordinates. */
  d: string;
  viewBox: string;
  className?: string;
  /** Any CSS color, e.g. `var(--color-accent-lavender)`. */
  stroke?: string;
  strokeWidth?: number;
  /**
   * stroke-dasharray in 1/100ths of the total path length (the visual path
   * is normalized with pathLength=100, so dashes stay even when the viewBox
   * is stretched). "0.01 1.5" = round dots; "1 1.5" = dashes.
   */
  dash?: string;
  preserveAspectRatio?: string;
  /** useScroll offset — when the draw starts/finishes relative to viewport. */
  offset?: ScrollOffset;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const maskId = useId();
  const reduceMotion = useReducedMotion();
  // Framer types target as HTMLElement, but SVG elements work at runtime.
  const { scrollYProgress } = useScroll({
    target: ref as unknown as RefObject<HTMLElement | null>,
    offset,
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      {!reduceMotion && (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <motion.path
              d={d}
              stroke="#ffffff"
              strokeWidth={strokeWidth * 6}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength }}
            />
          </mask>
        </defs>
      )}
      <path
        d={d}
        pathLength={100}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dash}
        vectorEffect="non-scaling-stroke"
        mask={reduceMotion ? undefined : `url(#${maskId})`}
      />
    </svg>
  );
}
