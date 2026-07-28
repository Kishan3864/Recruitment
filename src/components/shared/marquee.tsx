import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * CSS marquee: renders children twice in a w-max track and translates -50%
 * for a seamless loop (each half carries its own trailing gap). Pauses on
 * hover; static under prefers-reduced-motion (keyframe killed in globals).
 */
export function Marquee({
  children,
  className,
  gapClassName = "gap-14 pr-14",
  speed = 36,
  edgeFade = true,
  decorative = false,
}: {
  children: ReactNode;
  className?: string;
  /** Gap between items AND trailing padding — keep the two values equal. */
  gapClassName?: string;
  /** Seconds per loop. */
  speed?: number;
  /** Fade content in/out at the edges. */
  edgeFade?: boolean;
  /** Hide from assistive tech (provide an sr-only alternative). */
  decorative?: boolean;
}) {
  return (
    <div
      aria-hidden={decorative || undefined}
      className={cn(
        "group/marquee relative overflow-hidden",
        edgeFade &&
          "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <div
        className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className={cn("flex shrink-0 items-center", gapClassName)}>{children}</div>
        <div className={cn("flex shrink-0 items-center", gapClassName)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
