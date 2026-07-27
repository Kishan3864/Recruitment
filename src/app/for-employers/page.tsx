import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Testimonials } from "@/components/sections/testimonials";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Container } from "@/components/shared/container";
import { ContentIcon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/graphics/grid-pattern";
import { getTestimonials } from "@/lib/content/collections";
import { getEmployersPage } from "@/lib/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEmployersPage();
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function ForEmployersPage() {
  const [page, testimonials] = await Promise.all([getEmployersPage(), getTestimonials("employer")]);

  return (
    <>
      {/* Hero with stats */}
      <section className="bg-hero-wash relative overflow-hidden border-b">
        <GridPattern />
        <Container className="relative py-16 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="mb-4 inline-block rounded-full border border-brand-200 bg-white px-3.5 py-1 text-xs font-semibold tracking-wide text-brand-700 uppercase shadow-xs">
              {page.hero.eyebrow}
            </p>
            <h1 className="text-display-sm text-balance lg:text-display">{page.hero.heading}</h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
              {page.hero.description}
            </p>
            <Button asChild size="lg" className="mt-8 bg-cta text-cta-foreground hover:bg-cta/90">
              <Link href={page.hero.primaryCta.href}>
                {page.hero.primaryCta.label}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t pt-8">
              {page.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-2xl font-bold text-brand-700 sm:text-3xl">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <ProcessSteps intro={page.process} steps={page.process.steps} />

      {/* Engagement models */}
      <section className="bg-surface-sunken py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow={page.models.eyebrow}
            heading={page.models.heading}
            description={page.models.description}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.models.items.map((model, i) => (
              <Reveal key={model.title} delay={(i % 4) * 0.08}>
                <div className="card-lift flex h-full flex-col rounded-2xl border bg-card p-7 shadow-xs">
                  <span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
                    <ContentIcon name={model.icon} className="size-5.5" />
                  </span>
                  <h3 className="font-display text-base font-semibold lg:text-lg">{model.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {model.description}
                  </p>
                  <p className="mt-4 border-t pt-3 text-xs font-medium text-brand-600">
                    {model.bestFor}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FeatureGrid intro={page.guarantees} features={page.guarantees.items} columns={4} />

      <Testimonials intro={page.testimonials} testimonials={testimonials} sunken />

      {/* Enquiry form */}
      <section id="enquiry" className="scroll-mt-20 py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-display-xs">{page.form.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{page.form.subtitle}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
              <LeadForm copy={page.form} />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
