import Link from "next/link";
import { ArrowRight, Building2, CircleCheck, UserRound } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import type { HomePageContent } from "@/types/pages";

/** Dual-audience split: employers vs candidates, equal billing. */
export function AudienceSplit({ content }: { content: HomePageContent["audience"] }) {
  const panels = [
    { data: content.employers, icon: Building2, featured: true },
    { data: content.candidates, icon: UserRound, featured: false },
  ];

  return (
    <section className="bg-surface-sunken py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={content.intro.eyebrow}
          heading={content.intro.heading}
          description={content.intro.description}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {panels.map(({ data, icon: Icon, featured }, i) => (
            <Reveal key={data.title} delay={i * 0.1}>
              <div
                className={
                  featured
                    ? "card-lift flex h-full flex-col rounded-3xl border border-brand-800 bg-gradient-to-br from-brand-900 to-brand-950 p-8 text-white shadow-lg lg:p-10"
                    : "card-lift flex h-full flex-col rounded-3xl border bg-card p-8 shadow-xs lg:p-10"
                }
              >
                <span
                  className={
                    featured
                      ? "mb-6 flex size-13 items-center justify-center rounded-2xl bg-white/10 text-cta-300"
                      : "mb-6 flex size-13 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-700"
                  }
                >
                  <Icon className="size-6.5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-2xl font-bold">{data.title}</h3>
                <p
                  className={
                    featured
                      ? "mt-3 leading-relaxed text-brand-100/85"
                      : "mt-3 leading-relaxed text-muted-foreground"
                  }
                >
                  {data.description}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {data.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm">
                      <CircleCheck
                        className={
                          featured
                            ? "mt-0.5 size-4.5 shrink-0 text-cta-400"
                            : "mt-0.5 size-4.5 shrink-0 text-brand-600"
                        }
                        aria-hidden="true"
                      />
                      <span className={featured ? "text-brand-50" : undefined}>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className={
                      featured
                        ? "bg-cta text-cta-foreground hover:bg-cta/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/85"
                    }
                  >
                    <Link href={data.cta.href}>
                      {data.cta.label}
                      <ArrowRight data-icon="inline-end" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
