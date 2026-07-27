import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/shared/container";
import { IndustryCard } from "@/components/shared/industry-card";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { getIndustries } from "@/lib/content/collections";
import { getIndustriesPage } from "@/lib/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getIndustriesPage();
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function IndustriesPage() {
  const [page, industries] = await Promise.all([getIndustriesPage(), getIndustries()]);

  return (
    <>
      <PageHero content={page.hero} />
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 4) * 0.06}>
                <IndustryCard industry={industry} placementsSuffix={page.placementsSuffix} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <div className="section-navy relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
              <h2 className="text-display-xs text-white">{page.ctaBanner.heading}</h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-brand-100/85">
                {page.ctaBanner.description}
              </p>
              <Button asChild size="lg" className="mt-7 bg-cta text-cta-foreground hover:bg-cta/90">
                <Link href={page.ctaBanner.cta.href}>
                  {page.ctaBanner.cta.label}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
