import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck } from "lucide-react";

import { Container } from "@/components/shared/container";
import { ContentIcon } from "@/components/shared/icon";
import { IndustryCard } from "@/components/shared/industry-card";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { getIndustries, getIndustryBySlug } from "@/lib/content/collections";
import { getIndustriesPage } from "@/lib/content/pages";

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};
  return { title: industry.metaTitle, description: industry.metaDescription };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [industry, page, industries] = await Promise.all([
    getIndustryBySlug(slug),
    getIndustriesPage(),
    getIndustries(),
  ]);
  if (!industry) notFound();

  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 4);

  return (
    <>
      <section className="bg-hero-wash relative overflow-hidden border-b">
        <Container className="relative py-16 lg:py-24">
          <Reveal className="max-w-2xl">
            <span className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md">
              <ContentIcon name={industry.icon} className="size-7" />
            </span>
            <h1 className="text-display-sm text-balance">{industry.name}</h1>
            <p className="mt-3 font-display text-lg font-semibold text-brand-600">
              {industry.placementCount.toLocaleString("en-IN")}+ {page.placementsSuffix}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
              {industry.shortDesc}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_360px]">
          <Reveal className="space-y-5">
            {industry.longDesc.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-3xl border bg-surface-sunken p-7">
                <h2 className="font-display text-lg font-semibold">{page.rolesHeading}</h2>
                <ul className="mt-5 space-y-3">
                  {industry.roles.map((role) => (
                    <li key={role} className="flex items-start gap-2.5 text-sm">
                      <CircleCheck
                        className="mt-0.5 size-4.5 shrink-0 text-brand-600"
                        aria-hidden="true"
                      />
                      {role}
                    </li>
                  ))}
                </ul>
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
          <h2 className="mb-8 font-display text-xl font-semibold">{page.otherIndustriesHeading}</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {others.map((other) => (
              <IndustryCard
                key={other.slug}
                industry={other}
                placementsSuffix={page.placementsSuffix}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
