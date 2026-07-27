import Link from "next/link";

import { ContentIcon } from "@/components/shared/icon";
import type { IndustryContent } from "@/types/content";

export function IndustryCard({
  industry,
  placementsSuffix,
}: {
  industry: IndustryContent;
  placementsSuffix: string;
}) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="card-lift group flex h-full flex-col rounded-2xl border bg-card p-5 shadow-xs lg:p-6"
    >
      <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <ContentIcon name={industry.icon} className="size-5.5" />
      </span>
      <h3 className="font-display text-sm font-semibold sm:text-base">{industry.name}</h3>
      <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
        {industry.placementCount.toLocaleString("en-IN")}+ {placementsSuffix}
      </p>
    </Link>
  );
}
