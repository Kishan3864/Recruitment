import { Container } from "@/components/shared/container";
import { ContentIcon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ProcessStepContent, SectionIntro } from "@/types/content";

/** Numbered process timeline with connecting line (desktop). */
export function ProcessSteps({
  intro,
  steps,
  sunken = false,
}: {
  intro: SectionIntro;
  steps: ProcessStepContent[];
  sunken?: boolean;
}) {
  return (
    <section className={sunken ? "bg-surface-sunken py-20 lg:py-28" : "py-20 lg:py-28"}>
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          description={intro.description}
        />
        <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* connecting line */}
          <div
            aria-hidden="true"
            className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 lg:block"
          />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <li className="relative">
                <div className="relative mb-5 inline-flex">
                  <span className="flex size-14 items-center justify-center rounded-2xl border border-brand-200 bg-white text-brand-700 shadow-sm">
                    <ContentIcon name={step.icon} className="size-6" />
                  </span>
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-cta-400 font-display text-xs font-bold text-cta-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
