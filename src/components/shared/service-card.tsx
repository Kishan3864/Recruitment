import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ContentIcon } from "@/components/shared/icon";
import type { ServiceContent } from "@/types/content";

export function ServiceCard({
  service,
  learnMore,
}: {
  service: ServiceContent;
  learnMore: string;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-lift group flex h-full flex-col rounded-2xl border bg-card p-7 shadow-xs"
    >
      <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <ContentIcon name={service.icon} className="size-6" />
      </span>
      <h3 className="font-display text-lg font-semibold">{service.title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.shortDesc}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
        {learnMore}
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
