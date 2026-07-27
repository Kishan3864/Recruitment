import type { Metadata } from "next";
import { Compass, Target } from "lucide-react";

import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { TrustBadges } from "@/components/sections/trust-badges";
import { AvatarInitials } from "@/components/shared/avatar-initials";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { getTeam } from "@/lib/content/collections";
import { getAboutPage } from "@/lib/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function AboutPage() {
  const [page, team] = await Promise.all([getAboutPage(), getTeam()]);

  return (
    <>
      <PageHero content={page.hero} />

      {/* Story + mission/vision */}
      <section className="py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={page.story.eyebrow}
              heading={page.story.heading}
              align="left"
              className="mb-8"
            />
            <Reveal className="space-y-5">
              {page.story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
          <div className="space-y-6 lg:pt-10">
            <Reveal delay={0.1}>
              <div className="section-navy rounded-3xl p-8">
                <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-white/10 text-cta-300">
                  <Target className="size-5.5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-bold text-white">{page.mission.title}</h3>
                <p className="mt-3 leading-relaxed text-brand-100/85">{page.mission.body}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-3xl border bg-brand-50/60 p-8">
                <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
                  <Compass className="size-5.5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-bold">{page.vision.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{page.vision.body}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FeatureGrid intro={page.values} features={page.values.items} columns={2} sunken />

      {/* Timeline */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow={page.timeline.eyebrow} heading={page.timeline.heading} />
          <ol className="relative mx-auto max-w-3xl space-y-10 border-l-2 border-brand-200 pl-8">
            {page.timeline.milestones.map((milestone, i) => (
              <Reveal key={milestone.year} delay={i * 0.06}>
                <li className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 -left-[2.45rem] size-4 rounded-full border-4 border-white bg-brand-600 shadow-sm"
                  />
                  <Badge variant="secondary" className="mb-2 bg-brand-50 text-brand-700">
                    {milestone.year}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold">{milestone.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-surface-sunken py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow={page.team.eyebrow}
            heading={page.team.heading}
            description={page.team.description}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={(i % 4) * 0.08}>
                <div className="card-lift h-full rounded-2xl border bg-card p-7 text-center shadow-xs">
                  <AvatarInitials name={member.name} className="mx-auto size-16 text-xl" />
                  <h3 className="mt-5 font-display text-lg font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-600">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {member.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <TrustBadges intro={page.trust} badges={page.trust.badges} />
    </>
  );
}
