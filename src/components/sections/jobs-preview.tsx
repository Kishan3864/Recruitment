import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { JobCard } from "@/components/shared/job-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import type { JobContent, SectionIntro } from "@/types/content";

export function JobsPreview({
  intro,
  cta,
  jobs,
  viewLabel,
  featuredLabel,
  postedPrefix,
}: {
  intro: SectionIntro;
  cta: { label: string; href: string };
  jobs: JobContent[];
  viewLabel: string;
  featuredLabel: string;
  postedPrefix: string;
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          description={intro.description}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <Reveal key={job.slug} delay={(i % 3) * 0.08}>
              <JobCard
                job={job}
                viewLabel={viewLabel}
                featuredLabel={featuredLabel}
                postedPrefix={postedPrefix}
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
