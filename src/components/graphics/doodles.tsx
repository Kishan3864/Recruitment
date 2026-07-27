import { cn } from "@/lib/utils";

/**
 * Hand-authored decorative doodles (jobspot-style squiggles, arrows, rings).
 * All are aria-hidden, stroke currentColor, and scale with their container.
 */

export function SquiggleUnderline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 14"
      preserveAspectRatio="none"
      className={cn("h-3 w-full text-cta-400", className)}
      aria-hidden="true"
    >
      <path
        d="M3 10c30-6 60 4 90-3s60-2 90-4 40 2 54 4"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={cn("size-16 text-brand-300", className)} aria-hidden="true">
      <path
        d="M6 8c26 4 46 14 56 38"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
        fill="none"
      />
      <path
        d="M52 44l10 4 2-12"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function DottedRing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("text-brand-200", className)} aria-hidden="true">
      <circle
        cx="100"
        cy="100"
        r="92"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="2 14"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SparkleDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-8 text-cta-400", className)} aria-hidden="true">
      <path
        d="M20 4c1.5 8 4 12.5 16 16-12 3.5-14.5 8-16 16-1.5-8-4-12.5-16-16 12-3.5 14.5-8 16-16Z"
        fill="currentColor"
      />
    </svg>
  );
}
