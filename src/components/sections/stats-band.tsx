import { GridPattern } from "@/components/graphics/grid-pattern";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import type { SectionIntro, StatContent } from "@/types/content";

/* Per-stat accent — bright accents read well on the ink band. Static literals
   so Tailwind's scanner sees them. */
const STAT_ACCENTS = [
  { border: "border-accent-cream", dot: "bg-accent-cream" },
  { border: "border-accent-lavender", dot: "bg-accent-lavender" },
  { border: "border-accent-blush", dot: "bg-accent-blush" },
  { border: "border-accent-mint", dot: "bg-accent-mint" },
];

/** Deep-ink verified-stats band: count-up numbers, one accent per stat. */
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
          {stats.map((stat, i) => {
            const accent = STAT_ACCENTS[i % STAT_ACCENTS.length];
            return (
              <Reveal key={stat.label} delay={(i % 4) * 0.09}>
                <div className={cn("border-l-2 pl-5", accent.border)}>
                  <dd className="font-display text-4xl font-bold text-white lg:text-5xl">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-2 flex items-center gap-2 font-medium text-brand-100">
                    <span
                      className={cn("size-2 shrink-0 rounded-full", accent.dot)}
                      aria-hidden="true"
                    />
                    {stat.label}
                  </dt>
                  {stat.description && (
                    <dd className="mt-1 text-sm text-brand-200/70">{stat.description}</dd>
                  )}
                </div>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
