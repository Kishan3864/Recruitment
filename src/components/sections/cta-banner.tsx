import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GridPattern } from "@/components/graphics/grid-pattern";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import type { HomePageContent } from "@/types/pages";

export function CtaBanner({ content }: { content: HomePageContent["ctaBanner"] }) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="section-navy relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 lg:py-20">
            <GridPattern className="text-white/10" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-display-sm text-balance text-white">{content.heading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-100/85">
                {content.description}
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
                  <Link href={content.primaryCta.href}>
                    {content.primaryCta.label}
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-brand-200/70">{content.note}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
