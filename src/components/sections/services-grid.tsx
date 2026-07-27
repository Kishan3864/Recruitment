import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { Button } from "@/components/ui/button";
import type { SectionIntro, ServiceContent } from "@/types/content";

export function ServicesGrid({
  intro,
  cta,
  services,
  learnMore,
}: {
  intro: SectionIntro;
  cta?: { label: string; href: string };
  services: ServiceContent[];
  learnMore: string;
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          description={intro.description}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.08}>
              <ServiceCard service={service} learnMore={learnMore} />
            </Reveal>
          ))}
        </div>
        {cta && (
          <Reveal className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
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
