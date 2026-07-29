import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, Sparkles } from "lucide-react";

import heroPhoto from "../../../public/images/hero.jpg";
import { Blob } from "@/components/graphics/blobs";
import { ArrowDoodle, DottedRing, SquiggleUnderline } from "@/components/graphics/doodles";
import { GridPattern } from "@/components/graphics/grid-pattern";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Container } from "@/components/shared/container";
import { Magnetic } from "@/components/shared/magnetic";
import { NodeBadge } from "@/components/shared/node-badge";
import { Reveal } from "@/components/shared/reveal";
import { WordReveal } from "@/components/shared/word-reveal";
import { Button } from "@/components/ui/button";
import type { HomePageContent } from "@/types/pages";

/**
 * Home hero: word-by-word headline + staged CTA/stats on the left, a
 * hand-placed (slightly tilted) photo with floating tint proof-cards on the
 * right, ambient pastel blobs drifting behind everything.
 */
export function Hero({ content }: { content: HomePageContent["hero"] }) {
  const headingWordCount = content.heading.trim().split(/\s+/).length;

  return (
    <section className="bg-hero-wash relative overflow-hidden">
      <GridPattern />
      {/* Ambient pastel blobs — slow float, killed under reduced motion */}
      <Blob className="absolute -top-24 -left-24 w-80 animate-float text-tint-lavender" />
      <Blob className="absolute top-1/3 -right-28 w-96 rotate-180 animate-float-delayed text-tint-blush" />
      <Container className="relative grid items-center gap-14 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-xs">
              <Sparkles className="size-4 text-accent-cream" aria-hidden="true" />
              {content.badge}
            </p>
          </Reveal>
          <h1 className="max-w-xl text-display text-balance">
            <WordReveal text={content.heading} delay={0.08} />{" "}
            <span className="relative inline-block text-brand-600">
              <WordReveal text={content.headingHighlight} delay={0.08 + headingWordCount * 0.055} />
              <span className="absolute -bottom-2 left-0 w-full motion-safe:animate-in motion-safe:duration-700 motion-safe:fill-mode-backwards motion-safe:[animation-delay:900ms] motion-safe:fade-in">
                <SquiggleUnderline />
              </span>
            </span>
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-muted-foreground">
              {content.subheading}
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic className="w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="sheen w-full bg-cta text-cta-foreground hover:bg-cta/90 sm:w-auto"
                >
                  <Link href={content.primaryCta.href}>
                    {content.primaryCta.label}
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild size="lg" variant="outline" className="bg-white">
                <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
              </Button>
              <ArrowDoodle className="absolute -top-14 right-8 hidden rotate-12 xl:block" />
            </div>
          </Reveal>
          <Reveal delay={0.55}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              {content.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-bold text-brand-700 sm:text-3xl">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </dd>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Hand-placed photo with floating tint proof cards */}
        <Reveal delay={0.3} className="relative mx-auto w-full max-w-md lg:max-w-lg" y={32}>
          <div className="relative">
            <DottedRing className="absolute -top-10 -right-10 size-40 motion-safe:animate-[spin_40s_linear_infinite]" />
            {/* White mat + hairline + slight tilt = photo pinned to the page */}
            <div className="relative rotate-[1.2deg] rounded-lg border bg-white p-2 shadow-card">
              <NodeBadge tint="blush" className="absolute -top-4 left-8">
                <Sparkles className="size-4" aria-hidden="true" strokeWidth={2} />
              </NodeBadge>
              <Image
                src={heroPhoto}
                alt=""
                priority
                sizes="(min-width: 1024px) 32rem, (min-width: 640px) 28rem, 100vw"
                className="aspect-[4/5] w-full rounded-sm object-cover object-top"
              />
            </div>

            <div className="absolute top-8 -left-4 hidden max-w-56 -rotate-[1.5deg] animate-float items-start gap-3 rounded-lg border border-line-lavender bg-tint-lavender p-4 shadow-card sm:flex lg:-left-10">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-accent-lavender/10 text-accent-lavender">
                <Briefcase className="size-4.5" aria-hidden="true" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block font-display text-sm font-semibold">
                  {content.cardRoles[0]?.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {content.cardRoles[0]?.meta}
                </span>
              </span>
            </div>

            <div className="absolute -right-3 bottom-10 flex rotate-[1.5deg] animate-float-delayed items-center gap-3 rounded-lg border border-line-mint bg-tint-mint p-4 shadow-card lg:-right-8">
              <span className="flex size-10 items-center justify-center rounded-full bg-deep-mint font-display text-xs font-bold text-white">
                {content.cardMatch.percent}
              </span>
              <span>
                <span className="flex items-center gap-1.5 font-display text-sm font-semibold">
                  <BadgeCheck className="size-4 text-accent-mint" aria-hidden="true" />
                  {content.cardMatch.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {content.cardMatch.subtitle}
                </span>
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
