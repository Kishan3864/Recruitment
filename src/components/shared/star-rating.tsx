import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating ? "fill-cta-400 text-cta-400" : "fill-neutral-200 text-neutral-200"
          )}
        />
      ))}
    </span>
  );
}
