import { cn } from "@/lib/utils";

/**
 * Subtle dotted-grid background — hand-authored SVG pattern, token-driven
 * color, masked so it fades out radially. Decorative only.
 */
export function GridPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 size-full text-border",
        "[mask-image:radial-gradient(ellipse_60%_60%_at_50%_35%,black,transparent)]",
        className
      )}
    >
      <defs>
        <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>
  );
}
