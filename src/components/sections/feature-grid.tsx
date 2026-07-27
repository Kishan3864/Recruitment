import { Container } from "@/components/shared/container";
import { ContentIcon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { FeatureContent, SectionIntro } from "@/types/content";

/** Generic icon-feature grid — used for "why us", values, guarantees, promises. */
export function FeatureGrid({
  intro,
  features,
  columns = 3,
  sunken = false,
}: {
  intro: SectionIntro;
  features: FeatureContent[];
  columns?: 2 | 3 | 4;
  sunken?: boolean;
}) {
  const gridClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={sunken ? "bg-surface-sunken py-20 lg:py-28" : "py-20 lg:py-28"}>
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          description={intro.description}
        />
        <div className={`grid gap-6 ${gridClass}`}>
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % columns) * 0.08}>
              <div className="card-lift h-full rounded-2xl border bg-card p-7 shadow-xs">
                <span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
                  <ContentIcon name={feature.icon} className="size-5.5" />
                </span>
                <h3 className="font-display text-base font-semibold lg:text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
