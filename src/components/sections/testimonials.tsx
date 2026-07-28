import { Quote } from "lucide-react";

import { AvatarInitials } from "@/components/shared/avatar-initials";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { StarRating } from "@/components/shared/star-rating";
import { TiltCard } from "@/components/shared/tilt-card";
import { TINT, tintAt } from "@/lib/tints";
import { cn } from "@/lib/utils";
import type { SectionIntro, TestimonialContent } from "@/types/content";

/**
 * Testimonials: CSS scroll-snap carousel on mobile, hand-placed tint-card
 * grid on desktop (no carousel library). 90ms sibling stagger on reveal.
 */
export function Testimonials({
  intro,
  testimonials,
  sunken = false,
}: {
  intro: SectionIntro;
  testimonials: TestimonialContent[];
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
      </Container>
      <Container className="max-w-none lg:max-w-7xl">
        <ul className="flex snap-x snap-mandatory [scrollbar-width:thin] gap-6 overflow-x-auto pt-2 pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {testimonials.map((t, i) => {
            const tint = tintAt(i);
            const tt = TINT[tint];
            return (
              <li key={t.author} className="w-[85%] shrink-0 snap-start sm:w-[420px] lg:w-auto">
                <Reveal delay={(i % 3) * 0.09} className="h-full">
                  <TiltCard tint={tint} index={i} className="flex h-full flex-col p-7">
                    <Quote className={cn("size-7", tt.text)} aria-hidden="true" />
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90 lg:text-base">
                      “{t.quote}”
                    </blockquote>
                    <div className={cn("mt-6 flex items-center gap-3.5 border-t pt-5", tt.border)}>
                      <AvatarInitials name={t.author} />
                      <div className="min-w-0">
                        <p className="truncate font-display text-sm font-semibold">{t.author}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {t.role} · {t.company}
                        </p>
                      </div>
                      <StarRating rating={t.rating} className="ml-auto shrink-0" />
                    </div>
                  </TiltCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
