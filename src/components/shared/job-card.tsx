import Link from "next/link";
import { ArrowRight, Banknote, Briefcase, Clock, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatDate, formatSalary } from "@/lib/content/jobs";
import type { JobContent } from "@/types/content";

export function JobCard({
  job,
  viewLabel,
  featuredLabel,
  postedPrefix,
}: {
  job: JobContent;
  viewLabel: string;
  featuredLabel: string;
  postedPrefix: string;
}) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="card-lift group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-xs"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
            {job.department}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-semibold group-hover:text-brand-700">
            {job.title}
          </h3>
        </div>
        {job.isFeatured && (
          <Badge className="shrink-0 bg-cta-100 text-cta-700">{featuredLabel}</Badge>
        )}
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-4 text-brand-500" aria-hidden="true" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="size-4 text-brand-500" aria-hidden="true" />
          {job.workMode}
        </span>
        <span className="flex items-center gap-1.5">
          <Banknote className="size-4 text-brand-500" aria-hidden="true" />
          {formatSalary(job)}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" aria-hidden="true" />
          {postedPrefix} {formatDate(job.postedAt)}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
          {viewLabel}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
