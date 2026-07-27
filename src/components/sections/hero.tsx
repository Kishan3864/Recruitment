import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, Sparkles } from "lucide-react";

import heroPhoto from "../../../public/images/hero.jpg";
import { ArrowDoodle, DottedRing, SquiggleUnderline } from "@/components/graphics/doodles";
import { GridPattern } from "@/components/graphics/grid-pattern";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import type { HomePageContent } from "@/types/pages";

/** Home hero: value proposition + stats on the left, photo with floating proof cards on the right. */
export function Hero({ content }: { content: HomePageContent["hero"] }) {
  return (
    <section className="bg-hero-wash relative overflow-hidden">
      <GridPattern />
      <Container className="relative grid items-center gap-14 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-xs">
              <Sparkles className="size-4 text-cta-500" aria-hidden="true" />
              {content.badge}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-xl text-display text-balance">
              {content.heading}{" "}
              <span className="relative inline-block text-brand-600">
                {content.headingHighlight}
                <SquiggleUnderline className="absolute -bottom-2 left-0" />
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-muted-foreground">
              {content.subheading}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
                <Link href={content.primaryCta.href}>
                  {content.primaryCta.label}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white">
                <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
              </Button>
              <ArrowDoodle className="absolute -top-14 right-8 hidden rotate-12 xl:block" />
            </div>
          </Reveal>
          <Reveal delay={0.32}>
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

        {/* Photo with floating proof cards */}
        <Reveal delay={0.2} className="relative mx-auto w-full max-w-md lg:max-w-lg" y={32}>
          <div className="relative">
            <DottedRing className="absolute -top-10 -right-10 size-40 motion-safe:animate-[spin_40s_linear_infinite]" />
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-brand-200/70 via-transparent to-cta-200/60 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-xl">
              <Image
                src={heroPhoto}
                alt=""
                priority
                sizes="(min-width: 1024px) 32rem, (min-width: 640px) 28rem, 100vw"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-950/35 via-transparent to-transparent"
              />
            </div>

            <div className="absolute top-8 -left-4 hidden max-w-56 animate-float items-start gap-3 rounded-2xl border border-brand-100 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex lg:-left-10">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
                <Briefcase className="size-4.5" aria-hidden="true" />
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

            <div className="absolute -right-3 bottom-10 flex animate-float-delayed items-center gap-3 rounded-2xl border border-brand-100 bg-white/95 p-4 shadow-lg backdrop-blur lg:-right-8">
              <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-xs font-bold text-white">
                {content.cardMatch.percent}
              </span>
              <span>
                <span className="flex items-center gap-1.5 font-display text-sm font-semibold">
                  <BadgeCheck className="size-4 text-brand-600" aria-hidden="true" />
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
