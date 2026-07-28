import { Container } from "@/components/shared/container";
import { DashedConnector } from "@/components/shared/dashed-connector";
import { ContentIcon } from "@/components/shared/icon";
import { NodeBadge } from "@/components/shared/node-badge";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TiltCard } from "@/components/shared/tilt-card";
import { TINT, tintAt, type Tint } from "@/lib/tints";
import { cn } from "@/lib/utils";
import type { FeatureContent, SectionIntro } from "@/types/content";

/** Card innards shared by both layouts: node dot, accent line-icon, copy. */
function FeatureBody({ feature, tint }: { feature: FeatureContent; tint: Tint }) {
  const t = TINT[tint];
  return (
    <>
      <NodeBadge tint={tint} className="absolute -top-3.5 left-1/2 size-7 -translate-x-1/2" />
      <span
        className={cn("mb-5 flex size-11 items-center justify-center rounded-md", t.wash, t.text)}
      >
        <ContentIcon
          name={feature.icon}
          className="size-5.5 motion-safe:group-hover/tilt:animate-icon-wiggle"
        />
      </span>
      <h3 className="font-display text-base font-semibold lg:text-lg">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
    </>
  );
}

/**
 * Feature section — the signature zig-zag: tilted tint cards ladder left /
 * right down the page (one per row, DOM order preserved), a scroll-drawn
 * dotted connector flowing diagonally between their node badges behind them.
 * Mobile: single straight column, connector hidden. Falls back to a tint-card
 * grid when there are more than six features (`columns` applies there).
 */
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
  const zigzag = features.length <= 6;
  const gridClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  // Connector nodes: card centers in wrapper-percent space. Endpoints tuck
  // behind the cards, so approximate (auto-height rows) docking is invisible.
  const nodes = features.map((_, i) => ({
    x: i % 2 === 0 ? 23.5 : 76.5,
    y: (i * 100) / features.length + 1.5,
  }));
  const connectorPath = nodes
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = nodes[i - 1];
      const midY = (prev.y + p.y) / 2;
      return `C ${prev.x} ${midY} ${p.x} ${midY} ${p.x} ${p.y}`;
    })
    .join(" ");

  return (
    <section className={sunken ? "bg-surface-sunken py-20 lg:py-28" : "py-20 lg:py-28"}>
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          description={intro.description}
        />

        {zigzag ? (
          <div className="relative mx-auto max-w-5xl pt-2">
            <DashedConnector
              d={connectorPath}
              viewBox="0 0 100 100"
              className="absolute inset-0 hidden size-full lg:block"
              stroke="var(--color-neutral-300)"
              strokeWidth={2}
            />
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className={cn("lg:col-start-1", i % 2 === 1 && "lg:col-start-2")}
                  style={{ gridRowStart: i + 1 }}
                >
                  <Reveal delay={(i % 2) * 0.09}>
                    <TiltCard tint={tintAt(i)} index={i} className="h-full p-7">
                      <FeatureBody feature={feature} tint={tintAt(i)} />
                    </TiltCard>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={cn("grid gap-8 pt-2", gridClass)}>
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={(i % columns) * 0.09} className="h-full">
                <TiltCard tint={tintAt(i)} index={i} className="h-full p-7">
                  <FeatureBody feature={feature} tint={tintAt(i)} />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
