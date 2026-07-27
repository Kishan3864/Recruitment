import { cn } from "@/lib/utils";

const gradients = [
  "from-brand-500 to-brand-700",
  "from-brand-400 to-brand-600",
  "from-brand-600 to-brand-900",
  "from-cta-400 to-cta-600",
];

/** Deterministic initials avatar — no photos needed for testimonials/team. */
export function AvatarInitials({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  const gradient = gradients[name.length % gradients.length];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display text-sm font-semibold text-white",
        gradient,
        className
      )}
    >
      {initials}
    </span>
  );
}
