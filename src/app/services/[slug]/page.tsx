import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck } from "lucide-react";

import { Container } from "@/components/shared/container";
import { ContentIcon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { ServiceCard } from "@/components/shared/service-card";
import { Button } from "@/components/ui/button";
import { getServiceBySlug, getServices } from "@/lib/content/collections";
import { getServicesPage } from "@/lib/content/pages";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.metaTitle, description: service.metaDescription };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, page, services] = await Promise.all([
    getServiceBySlug(slug),
    getServicesPage(),
    getServices(),
  ]);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="bg-hero-wash relative overflow-hidden border-b">
        <Container className="relative py-16 lg:py-24">
          <Reveal className="max-w-2xl">
            <span className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md">
              <ContentIcon name={service.icon} className="size-7" />
            </span>
            <h1 className="text-display-sm text-balance">{service.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
              {service.shortDesc}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_360px]">
          <Reveal className="space-y-5">
            {service.longDesc.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <div className="pt-4">
              <h2 className="font-display text-xl font-semibold">{page.featuresHeading}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <CircleCheck
                      className="mt-0.5 size-4.5 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <aside className="space-y-6 lg:sticky lg:top-24">
              <div className="section-navy rounded-3xl p-7">
                <h2 className="font-display text-lg font-semibold text-white">
                  {page.outcomesHeading}
                </h2>
                <dl className="mt-5 space-y-5">
                  {service.outcomes.map((outcome) => (
                    <div key={outcome.label} className="border-l-2 border-cta-400/70 pl-4">
                      <dd className="font-display text-2xl font-bold text-white">
                        {outcome.value}
                      </dd>
                      <dt className="mt-0.5 text-sm text-brand-100/80">{outcome.label}</dt>
                    </div>
                  ))}
                </dl>
                <Button
                  asChild
                  size="lg"
                  className="mt-7 w-full bg-cta text-cta-foreground hover:bg-cta/90"
                >
                  <Link href={page.ctaBanner.cta.href}>
                    {page.ctaBanner.cta.label}
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section className="border-t bg-surface-sunken py-16 lg:py-20">
        <Container>
          <h2 className="mb-8 font-display text-xl font-semibold">{page.otherServicesHeading}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <ServiceCard key={other.slug} service={other} learnMore={page.learnMore} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
