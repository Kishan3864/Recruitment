import { cn } from "@/lib/utils";

/**
 * Organic blob shape for ambient pastel backgrounds. Fill follows
 * currentColor — set a tint via `text-tint-*`. Decorative only; pair with
 * animate-float/animate-float-delayed for slow ambient drift.
 */
export function Blob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={cn("pointer-events-none text-tint-lavender", className)}
    >
      <path
        fill="currentColor"
        d="M45.7,-58.2C57.9,-49.3,65.5,-33.6,68.6,-17.2C71.7,-0.8,70.2,16.3,62.4,29.7C54.6,43.1,40.4,52.8,25.1,58.9C9.8,65,-6.7,67.5,-22.3,63.4C-37.9,59.3,-52.6,48.6,-61.1,34.2C-69.6,19.8,-71.9,1.7,-67.8,-14.2C-63.7,-30.1,-53.2,-43.8,-40.2,-52.6C-27.2,-61.4,-11.7,-65.3,3.2,-69.1C18.1,-72.9,33.5,-67.1,45.7,-58.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
