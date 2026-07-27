import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GridPattern } from "@/components/graphics/grid-pattern";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { getHomePlaceholder } from "@/lib/content/site";

/**
 * Home — placeholder hero previewing the design system.
 * Replaced in Phase 3 by <SectionRenderer /> composing DB-driven sections.
 * SSG by default (no dynamic APIs used); ISR arrives with the DB in Phase 2.
 */
export default async function HomePage() {
  const content = await getHomePlaceholder();

  return (
    <section className="relative overflow-hidden">
      <GridPattern />
      <Container className="relative flex flex-col items-center py-24 text-center lg:py-36">
        <p className="mb-6 rounded-full border border-accent-foreground/15 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
          {content.badge}
        </p>
        <h1 className="max-w-3xl text-display text-balance">{content.heading}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {content.subheading}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
            <Link href={content.primaryCta.href}>
              {content.primaryCta.label}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
          </Button>
        </div>
        <p className="mt-16 text-sm text-muted-foreground/70">{content.note}</p>
      </Container>
    </section>
  );
}
