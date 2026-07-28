import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Banknote, Briefcase, Clock, MapPin } from "lucide-react";

import { NodeBadge } from "@/components/shared/node-badge";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatSalary } from "@/lib/content/jobs";
import { TINT, tintAt } from "@/lib/tints";
import { cn } from "@/lib/utils";
import type { JobContent } from "@/types/content";

/**
 * Job card on the tint system: the whole card is the link, hand-placed ±1°
 * tilt that straightens on hover (.tilt-card), mini node dot on the top edge
 * (the connector motif without the path), deep-accent meta. `index` cycles
 * the tint and alternates the tilt direction.
 */
export function JobCard({
  job,
  viewLabel,
  featuredLabel,
  postedPrefix,
  index = 0,
}: {
  job: JobContent;
  viewLabel: string;
  featuredLabel: string;
  postedPrefix: string;
  index?: number;
}) {
  const tint = tintAt(index);
  const t = TINT[tint];

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className={cn(
        "tilt-card group/tilt relative flex h-full flex-col rounded-lg border p-6 shadow-card",
        t.surface
      )}
      style={{ "--tilt": `${index % 2 === 0 ? -1 : 1}deg` } as CSSProperties}
    >
      <NodeBadge tint={tint} className="absolute -top-3 right-7 size-6" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={cn("text-eyebrow uppercase", t.deep)}>{job.department}</p>
          <h3 className="mt-1.5 font-display text-lg font-semibold">{job.title}</h3>
        </div>
        {job.isFeatured && (
          <Badge className="shrink-0 bg-cta-100 text-cta-700">{featuredLabel}</Badge>
        )}
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className={cn("size-4", t.deep)} strokeWidth={1.75} aria-hidden="true" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className={cn("size-4", t.deep)} strokeWidth={1.75} aria-hidden="true" />
          {job.workMode}
        </span>
        <span className="flex items-center gap-1.5">
          <Banknote className={cn("size-4", t.deep)} strokeWidth={1.75} aria-hidden="true" />
          {formatSalary(job)}
        </span>
      </div>

      <div className={cn("mt-5 flex items-center justify-between border-t pt-4", t.border)}>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" aria-hidden="true" />
          {postedPrefix} {formatDate(job.postedAt)}
        </span>
        <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", t.deep)}>
          {viewLabel}
          <ArrowRight
            className="size-4 transition-transform group-hover/tilt:translate-x-1 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
