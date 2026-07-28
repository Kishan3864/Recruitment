import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Blob } from "@/components/graphics/blobs";
import { GridPattern } from "@/components/graphics/grid-pattern";
import { Container } from "@/components/shared/container";
import { Magnetic } from "@/components/shared/magnetic";
import { NodeBadge } from "@/components/shared/node-badge";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import type { HomePageContent } from "@/types/pages";

/** Ink CTA band: node badge docked on the top edge, magnetic primary CTA. */
export function CtaBanner({ content }: { content: HomePageContent["ctaBanner"] }) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="section-navy relative overflow-visible rounded-lg px-6 py-16 text-center shadow-xl sm:px-12 lg:py-20">
            <div className="absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
              <GridPattern className="text-white/10" />
              <Blob className="absolute -top-24 -left-20 w-72 rotate-45 animate-float text-white/5" />
              <Blob className="absolute -right-24 -bottom-28 w-80 animate-float-delayed text-white/5" />
            </div>
            <NodeBadge
              tint="cream"
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Sparkles className="size-4" aria-hidden="true" />
            </NodeBadge>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-display-sm text-balance text-white">{content.heading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-100/85">
                {content.description}
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Magnetic className="w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-cta text-cta-foreground hover:bg-cta/90 sm:w-auto"
                  >
                    <Link href={content.primaryCta.href}>
                      {content.primaryCta.label}
                      <ArrowRight data-icon="inline-end" aria-hidden="true" />
                    </Link>
                  </Button>
                </Magnetic>
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
