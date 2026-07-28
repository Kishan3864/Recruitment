"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { Container } from "@/components/shared/container";
import { ContentIcon } from "@/components/shared/icon";
import { NodeBadge } from "@/components/shared/node-badge";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TiltCard } from "@/components/shared/tilt-card";
import { EASE_SOFT } from "@/lib/motion";
import { TINT, tintAt } from "@/lib/tints";
import { cn } from "@/lib/utils";
import type { ProcessStepContent, SectionIntro } from "@/types/content";

/**
 * "How it works" — pinned on desktop: the section sticks below the header
 * while scroll progress advances the active step (list + spine on the left,
 * crossfading tint card on the right). Mobile and reduced-motion get a
 * static vertical timeline instead (gated purely in CSS: no hydration flash).
 */
export function ProcessSteps({
  intro,
  steps,
  sunken = false,
}: {
  intro: SectionIntro;
  steps: ProcessStepContent[];
  sunken?: boolean;
}) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  return (
    <section className={sunken ? "bg-surface-sunken" : undefined}>
      {/* ── Pinned scroll-driven variant (lg+, motion allowed) ── */}
      <div
        ref={runwayRef}
        className="hidden lg:motion-safe:block"
        style={{ height: `${steps.length * 85}vh` }}
      >
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center overflow-hidden">
          <Container className="grid w-full grid-cols-12 items-center gap-10">
            <div className="col-span-5">
              <SectionHeading
                eyebrow={intro.eyebrow}
                heading={intro.heading}
                description={intro.description}
                align="left"
                className="mb-10"
              />
              <ol className="relative space-y-6">
                {/* progress spine, filled by scroll */}
                <div
                  aria-hidden="true"
                  className="absolute top-2 bottom-2 left-4 w-0.5 -translate-x-1/2 bg-border"
                />
                <motion.div
                  aria-hidden="true"
                  className="absolute top-2 bottom-2 left-4 w-0.5 origin-top -translate-x-1/2 bg-brand-600"
                  style={{ scaleY: scrollYProgress }}
                />
                {steps.map((step, i) => (
                  <li key={step.title} className="relative flex items-center gap-4 pl-0">
                    <span
                      className={cn(
                        "z-10 flex size-8 shrink-0 items-center justify-center rounded-full border font-display text-sm font-bold transition-colors duration-300",
                        active >= i
                          ? cn("border-transparent text-white", TINT[tintAt(i)].fill)
                          : "border-border bg-card text-muted-foreground"
                      )}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        "font-display text-base font-semibold transition-colors duration-300",
                        active === i ? "text-foreground" : "text-muted-foreground"
                      )}
                      aria-current={active === i ? "step" : undefined}
                    >
                      {step.title}
                    </span>
                    <span className="sr-only">{step.description}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative col-span-7 h-[24rem] xl:h-[26rem]">
              {steps.map((step, i) => {
                const tint = tintAt(i);
                const t = TINT[tint];
                return (
                  <motion.div
                    key={step.title}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      y: active === i ? 0 : 28,
                      scale: active === i ? 1 : 0.97,
                    }}
                    transition={{ duration: 0.45, ease: EASE_SOFT }}
                    style={{ pointerEvents: active === i ? "auto" : "none" }}
                    aria-hidden={active !== i}
                  >
                    <TiltCard
                      tint={tint}
                      index={i}
                      className="flex h-full flex-col justify-center p-10"
                    >
                      <NodeBadge tint={tint} className="absolute -top-4 left-10">
                        {i + 1}
                      </NodeBadge>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none absolute top-6 right-8 font-display text-7xl font-bold opacity-15",
                          t.text
                        )}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={cn(
                          "flex size-14 items-center justify-center rounded-md",
                          t.wash,
                          t.text
                        )}
                      >
                        <ContentIcon name={step.icon} className="size-7" />
                      </span>
                      <h3 className="mt-6 font-display text-2xl font-bold xl:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </div>
      </div>

      {/* ── Static timeline (mobile, and any reduced-motion viewport) ── */}
      <div className="py-20 lg:py-28 lg:motion-safe:hidden">
        <Container>
          <SectionHeading
            eyebrow={intro.eyebrow}
            heading={intro.heading}
            description={intro.description}
          />
          <ol className="relative mx-auto max-w-2xl space-y-8">
            <div
              aria-hidden="true"
              className="absolute top-4 bottom-4 left-4 -translate-x-1/2 border-l-2 border-dashed border-neutral-300"
            />
            {steps.map((step, i) => {
              const tint = tintAt(i);
              const t = TINT[tint];
              return (
                <li key={step.title} className="relative flex gap-5">
                  <span
                    className={cn(
                      "z-10 flex size-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white",
                      t.fill
                    )}
                  >
                    {i + 1}
                  </span>
                  <Reveal className="flex-1" delay={0.09}>
                    <TiltCard tint={tint} index={i} className="p-6">
                      <span
                        className={cn(
                          "mb-4 flex size-11 items-center justify-center rounded-md",
                          t.wash,
                          t.text
                        )}
                      >
                        <ContentIcon name={step.icon} className="size-5.5" />
                      </span>
                      <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </TiltCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </div>
    </section>
  );
}
