import { GridPattern } from "@/components/graphics/grid-pattern";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { SectionIntro, StatContent } from "@/types/content";

/** Deep-navy verified-stats band with animated counters. */
export function StatsBand({ intro, stats }: { intro: SectionIntro; stats: StatContent[] }) {
  return (
    <section className="section-navy relative overflow-hidden py-20 lg:py-28">
      <GridPattern className="text-white/10" />
      <Container className="relative">
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          description={intro.description}
          dark
        />
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="border-l-2 border-cta-400/70 pl-5">
                <dd className="font-display text-4xl font-bold text-white lg:text-5xl">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </dd>
                <dt className="mt-2 font-medium text-brand-100">{stat.label}</dt>
                {stat.description && (
                  <dd className="mt-1 text-sm text-brand-200/70">{stat.description}</dd>
                )}
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
