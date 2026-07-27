import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/** Consistent section intro: eyebrow chip + heading + optional description. */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "center",
  dark = false,
  className,
}: {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 max-w-2xl lg:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "mb-4 inline-block rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wide uppercase",
          dark
            ? "border-white/20 bg-white/10 text-brand-200"
            : "border-brand-200 bg-brand-50 text-brand-700"
        )}
      >
        {eyebrow}
      </p>
      <h2 className={cn("text-display-sm text-balance", dark && "text-white")}>{heading}</h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-pretty lg:text-lg",
            dark ? "text-brand-100/80" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
