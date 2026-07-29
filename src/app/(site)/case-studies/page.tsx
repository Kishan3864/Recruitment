import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { getCaseStudies } from "@/lib/content/collections";
import { getCaseStudiesPage } from "@/lib/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCaseStudiesPage();
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function CaseStudiesPage() {
  const [page, studies] = await Promise.all([getCaseStudiesPage(), getCaseStudies()]);

  return (
    <>
      <PageHero content={page.hero} />
      <section className="py-16 lg:py-24">
        <Container className="space-y-8">
          {studies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="card-lift group grid gap-8 rounded-3xl border bg-card p-8 shadow-xs lg:grid-cols-[1fr_320px] lg:p-10"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant="secondary" className="bg-brand-50 text-brand-700">
                      {study.industry}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{study.client}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold group-hover:text-brand-700">
                    {study.headline}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{study.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                    {page.readCaseStudy}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <dl className="grid grid-cols-2 gap-4 self-center">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl bg-surface-sunken p-4">
                      <dd className="font-display text-2xl font-bold text-brand-700">
                        {metric.value}
                      </dd>
                      <dt className="mt-1 text-xs leading-snug text-muted-foreground">
                        {metric.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
