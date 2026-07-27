import { Quote } from "lucide-react";

import { AvatarInitials } from "@/components/shared/avatar-initials";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { StarRating } from "@/components/shared/star-rating";
import type { SectionIntro, TestimonialContent } from "@/types/content";

/** Testimonial carousel built with CSS scroll-snap (no carousel library). */
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
        <Reveal>
          <ul className="flex snap-x snap-mandatory [scrollbar-width:thin] gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {testimonials.map((t) => (
              <li
                key={t.author}
                className="card-lift flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border bg-card p-7 shadow-xs sm:w-[420px] lg:w-auto"
              >
                <Quote className="size-7 text-brand-200" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90 lg:text-base">
                  “{t.quote}”
                </blockquote>
                <div className="mt-6 flex items-center gap-3.5 border-t pt-5">
                  <AvatarInitials name={t.author} />
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-semibold">{t.author}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </p>
                  </div>
                  <StarRating rating={t.rating} className="ml-auto shrink-0" />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
