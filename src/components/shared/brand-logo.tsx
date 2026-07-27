import { cn } from "@/lib/utils";

/**
 * Hand-authored brand mark: two converging chevrons forming a bridge/arrow —
 * connection between employer and candidate. Pure inline SVG, inherits
 * currentColor so it adapts to both themes; accent bar uses the CTA token.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="30" height="30" rx="8" className="fill-primary" />
      <path
        d="M9 22V13.5L16 9l7 4.5V22"
        stroke="var(--primary-foreground)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12.5 22v-4.2l3.5-2.3 3.5 2.3V22"
        stroke="var(--color-cta-400)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function BrandLogo({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      <span className="font-display text-lg leading-none font-bold tracking-tight">{name}</span>
    </span>
  );
}
