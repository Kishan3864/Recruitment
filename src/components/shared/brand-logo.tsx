import { cn } from "@/lib/utils";

/**
 * Hand-authored brand mark: three ascending bars (career growth) crowned by
 * an amber point (the candidate reaching their goal), on a navy gradient
 * tile. Pure inline SVG — no external assets.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-9", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="brand-tile"
          x1="0"
          y1="0"
          x2="34"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-brand-500)" />
          <stop offset="1" stopColor="var(--color-brand-800)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="32" height="32" rx="9" fill="url(#brand-tile)" />
      <rect x="8" y="19" width="4" height="7" rx="2" fill="#ffffff" opacity="0.55" />
      <rect x="15" y="14.5" width="4" height="11.5" rx="2" fill="#ffffff" opacity="0.8" />
      <rect x="22" y="10" width="4" height="16" rx="2" fill="#ffffff" />
      <circle cx="24" cy="6.4" r="2.4" fill="var(--color-cta-400)" />
    </svg>
  );
}

export function BrandLogo({
  name,
  className,
  dark = false,
}: {
  name: string;
  className?: string;
  /** For use on navy contrast sections */
  dark?: boolean;
}) {
  const [first, ...rest] = name.split(" ");
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      <span
        className={cn(
          "font-display text-lg leading-none font-bold tracking-tight",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {first}
        {rest.length > 0 && (
          <span className={dark ? "text-brand-300" : "text-brand-600"}> {rest.join(" ")}</span>
        )}
      </span>
    </span>
  );
}
