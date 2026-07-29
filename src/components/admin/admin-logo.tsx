import { cn } from "@/lib/utils";

/**
 * Admin mark — the installed app icon in miniature: ink tile, dotted route
 * running corner to corner, amber junction node with a white ring. Plain
 * fills only (no gradients/url() ids), so it renders identically everywhere —
 * including when other copies sit inside display:none subtrees.
 */
export function AdminMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-9", className)}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="32" height="32" rx="9" fill="var(--color-brand-950)" />
      <circle cx="8" cy="26" r="1.8" fill="var(--color-brand-400)" opacity="0.9" />
      <circle cx="12.4" cy="21.6" r="1.1" fill="var(--color-brand-300)" opacity="0.7" />
      <circle cx="21.6" cy="12.4" r="1.1" fill="var(--color-brand-300)" opacity="0.7" />
      <circle cx="26" cy="8" r="1.8" fill="var(--color-brand-400)" opacity="0.9" />
      <circle
        cx="17"
        cy="17"
        r="5.4"
        fill="var(--color-cta-400)"
        stroke="#ffffff"
        strokeWidth="1.6"
      />
      <circle cx="17" cy="17" r="1.9" fill="#ffffff" />
    </svg>
  );
}

/** Mark + wordmark for the admin shell (topbar, sidebar, drawer, login). */
export function AdminLogo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <AdminMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          Admin
        </span>
        <span className="mt-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
          Recruitment
        </span>
      </span>
    </span>
  );
}
