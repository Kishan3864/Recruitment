import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { IndustryCard } from "@/components/shared/industry-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import type { IndustryContent, SectionIntro } from "@/types/content";

export function IndustriesGrid({
  intro,
  cta,
  industries,
  placementsSuffix,
}: {
  intro: SectionIntro;
  cta?: { label: string; href: string };
  industries: IndustryContent[];
  placementsSuffix: string;
}) {
  return (
    <section className="bg-surface-sunken py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          description={intro.description}
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 4) * 0.06}>
              <IndustryCard industry={industry} placementsSuffix={placementsSuffix} />
            </Reveal>
          ))}
        </div>
        {cta && (
          <Reveal className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="bg-white">
              <Link href={cta.href}>
                {cta.label}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
