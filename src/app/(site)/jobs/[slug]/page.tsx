import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleCheck } from "lucide-react";

import { ApplyForm } from "@/components/forms/apply-form";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatSalary, getJobBySlug, getJobs } from "@/lib/content/jobs";
import { getJobsPage } from "@/lib/content/pages";

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};
  return {
    title: `${job.title} — ${job.location}`,
    description: job.summary,
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [job, page] = await Promise.all([getJobBySlug(slug), getJobsPage()]);
  if (!job) notFound();

  const detail = page.detail;
  const facts: { label: string; value: string }[] = [
    { label: detail.facts.department, value: job.department },
    { label: detail.facts.location, value: job.location },
    { label: detail.facts.workMode, value: job.workMode },
    { label: detail.facts.type, value: job.employmentType },
    {
      label: detail.facts.experience,
      value: detail.experienceTemplate
        .replace("{min}", String(job.experienceMin))
        .replace("{max}", String(job.experienceMax)),
    },
    { label: detail.facts.salary, value: formatSalary(job) },
    { label: detail.facts.posted, value: formatDate(job.postedAt) },
    { label: detail.facts.closes, value: formatDate(job.closesAt) },
  ];

  const lists: { heading: string; items: string[] }[] = [
    { heading: detail.responsibilitiesHeading, items: job.responsibilities },
    { heading: detail.requirementsHeading, items: job.requirements },
    { heading: detail.benefitsHeading, items: job.benefits },
  ];

  return (
    <>
      <section className="bg-hero-wash relative overflow-hidden border-b">
        <Container className="relative py-14 lg:py-20">
          <Reveal>
            <Link
              href="/jobs"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {detail.backToJobs}
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">
                {job.department}
              </p>
              {job.isFeatured && (
                <Badge className="bg-cta-100 text-cta-700">{page.list.featuredBadge}</Badge>
              )}
            </div>
            <h1 className="mt-2 max-w-2xl text-display-sm text-balance">{job.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {job.summary}
            </p>
            <Button asChild size="lg" className="mt-7 bg-cta text-cta-foreground hover:bg-cta/90">
              <Link href="#apply">
                {detail.applyCta}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            <Reveal>
              <h2 className="font-display text-xl font-semibold">{detail.overviewHeading}</h2>
              <div className="mt-4 space-y-4">
                {job.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {lists.map((section) => (
              <Reveal key={section.heading}>
                <Separator className="my-8" />
                <h2 className="font-display text-xl font-semibold">{section.heading}</h2>
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <CircleCheck
                        className="mt-0.5 size-4.5 shrink-0 text-brand-600"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal>
              <Separator className="my-8" />
              <h2 className="font-display text-xl font-semibold">{detail.skillsHeading}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-brand-50 text-brand-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Facts sidebar */}
          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-3xl border bg-surface-sunken p-7">
                <h2 className="font-display text-lg font-semibold">{detail.factsHeading}</h2>
                <dl className="mt-5 space-y-4">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                      <dd className="text-right text-sm font-medium">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <Button
                  asChild
                  size="lg"
                  className="mt-7 w-full bg-cta text-cta-foreground hover:bg-cta/90"
                >
                  <Link href="#apply">
                    {detail.applyCta}
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>

      {/* Apply form */}
      <section id="apply" className="scroll-mt-20 border-t bg-surface-sunken py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-display-xs">{page.applyForm.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{page.applyForm.subtitle}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
              <ApplyForm copy={page.applyForm} jobSlug={job.slug} />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
