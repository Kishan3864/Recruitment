import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GridPattern } from "@/components/graphics/grid-pattern";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { getNotFoundContent } from "@/lib/content/pages";

export default async function NotFound() {
  const content = await getNotFoundContent();

  return (
    <section className="bg-hero-wash relative overflow-hidden">
      <GridPattern />
      <Container className="relative flex flex-col items-center py-28 text-center lg:py-40">
        <p className="font-display text-7xl font-bold text-brand-200">{content.code}</p>
        <h1 className="mt-4 text-display-xs text-balance">{content.heading}</h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{content.description}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={content.homeCta.href}>{content.homeCta.label}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white">
            <Link href={content.jobsCta.href}>
              {content.jobsCta.label}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
