import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase } from "lucide-react";

import { GridPattern } from "@/components/graphics/grid-pattern";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import type { HomePageContent } from "@/types/pages";

/** Home hero: value proposition + trust stats + floating role-card graphic. */
export function Hero({ content }: { content: HomePageContent["hero"] }) {
  return (
    <section className="bg-hero-wash relative overflow-hidden">
      <GridPattern />
      <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-10 lg:py-28">
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-xs">
              <BadgeCheck className="size-4 text-brand-500" aria-hidden="true" />
              {content.badge}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-xl text-display text-balance">
              {content.heading}{" "}
              <span className="relative whitespace-nowrap text-brand-600">
                {content.headingHighlight}
                <svg
                  viewBox="0 0 240 12"
                  className="absolute -bottom-2 left-0 h-3 w-full text-cta-400"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9c40-6 158-8 234-4"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-muted-foreground">
              {content.subheading}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
                <Link href={content.primaryCta.href}>
                  {content.primaryCta.label}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white">
                <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
              </Button>
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

        {/* Decorative graphic: floating role cards + verification chip */}
        <Reveal delay={0.2} className="relative hidden lg:block" y={32}>
          <div aria-hidden="true" className="relative mx-auto h-[480px] max-w-md">
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-brand-100/80 via-transparent to-cta-100/60 blur-2xl" />
            <div className="absolute inset-x-6 top-0 bottom-16 rounded-3xl border border-brand-100 bg-gradient-to-b from-white to-brand-50/60 shadow-xl" />
            <div className="absolute inset-x-0 top-10 space-y-4 px-2">
              {content.cardRoles.map((role, i) => (
                <div
                  key={role.title}
                  className={
                    i === 1
                      ? "relative animate-float-delayed rounded-2xl border border-brand-200 bg-white p-5 shadow-lg"
                      : "relative rounded-2xl border border-border bg-white/90 p-5 shadow-md"
                  }
                  style={{ marginLeft: i === 1 ? "2.5rem" : i === 2 ? "1rem" : 0 }}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
                      <Briefcase className="size-5" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-foreground">
                        {role.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{role.meta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute right-0 bottom-6 flex animate-float items-center gap-3 rounded-2xl border border-brand-200 bg-white p-4 shadow-xl">
              <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-sm font-bold text-white">
                {content.cardMatch.percent}
              </span>
              <div>
                <p className="flex items-center gap-1.5 font-display text-sm font-semibold">
                  <BadgeCheck className="size-4 text-brand-600" />
                  {content.cardMatch.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{content.cardMatch.subtitle}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
