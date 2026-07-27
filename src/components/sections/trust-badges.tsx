import { Container } from "@/components/shared/container";
import { ContentIcon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { SectionIntro, TrustBadgeContent } from "@/types/content";

/** "How we protect your data" badge row. */
export function TrustBadges({
  intro,
  badges,
}: {
  intro: SectionIntro;
  badges: TrustBadgeContent[];
}) {
  return (
    <section className="border-y bg-brand-50/50 py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          description={intro.description}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, i) => (
            <Reveal key={badge.label} delay={i * 0.07}>
              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-white text-brand-700 shadow-xs">
                  <ContentIcon name={badge.icon} className="size-5.5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold">{badge.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
