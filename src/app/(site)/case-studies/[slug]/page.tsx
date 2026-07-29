import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CircleCheck } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content/collections";
import { getCaseStudiesPage } from "@/lib/content/pages";

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};
  return { title: study.metaTitle, description: study.metaDescription };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [study, page] = await Promise.all([getCaseStudyBySlug(slug), getCaseStudiesPage()]);
  if (!study) notFound();

  const narrative: { heading: string; paragraphs: string[] }[] = [
    { heading: page.challengeHeading, paragraphs: study.challenge },
    { heading: page.solutionHeading, paragraphs: study.solution },
  ];

  return (
    <>
      <section className="bg-hero-wash relative overflow-hidden border-b">
        <Container className="relative py-14 lg:py-20">
          <Reveal>
            <Link
              href="/case-studies"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {page.backToCaseStudies}
            </Link>
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="secondary" className="bg-brand-50 text-brand-700">
                {study.industry}
              </Badge>
              <span className="text-sm text-muted-foreground">{study.client}</span>
            </div>
            <h1 className="mt-3 max-w-3xl text-display-sm text-balance">{study.headline}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {study.summary}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border bg-white p-4 shadow-xs">
                  <dd className="font-display text-2xl font-bold text-brand-700">{metric.value}</dd>
                  <dt className="mt-1 text-xs leading-snug text-muted-foreground">
                    {metric.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl space-y-12">
          {narrative.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="font-display text-2xl font-bold">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal>
            <h2 className="font-display text-2xl font-bold">{page.resultsHeading}</h2>
            <ul className="mt-5 space-y-3.5">
              {study.results.map((result) => (
                <li key={result} className="flex items-start gap-3 leading-relaxed">
                  <CircleCheck className="mt-1 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  {result}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
