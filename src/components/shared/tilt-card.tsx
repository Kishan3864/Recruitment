import type { CSSProperties, ReactNode } from "react";

import { TINT, type Tint } from "@/lib/tints";
import { cn } from "@/lib/utils";

/**
 * Pastel "hand-placed" card: per-card tint surface, hairline border in the
 * tint's darker shade, layered shadow, and a slight alternating rotation
 * (desktop only) that eases to 0deg with a -4px lift on hover/focus.
 * Pure CSS (.tilt-card in globals) — safe to use inside server components.
 * Exposes `group/tilt` so children can react to hover (icon wiggle etc.).
 */
export function TiltCard({
  tint,
  index = 0,
  tilt,
  className,
  children,
}: {
  tint: Tint;
  /** Position in the sequence — derives the alternating tilt direction. */
  index?: number;
  /** Explicit tilt in degrees (overrides the alternating default). */
  tilt?: number;
  className?: string;
  children: ReactNode;
}) {
  const deg = tilt ?? (index % 2 === 0 ? -1.5 : 1.5);

  return (
    <div
      className={cn(
        "tilt-card group/tilt relative rounded-lg border shadow-card",
        TINT[tint].surface,
        className
      )}
      style={{ "--tilt": `${deg}deg` } as CSSProperties}
    >
      {children}
    </div>
  );
}
