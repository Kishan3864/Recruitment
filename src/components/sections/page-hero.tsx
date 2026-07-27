import { GridPattern } from "@/components/graphics/grid-pattern";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import type { PageHero as PageHeroContent } from "@/types/pages";

/** Inner-page hero: eyebrow + heading + description on a soft brand wash. */
export function PageHero({
  content,
  children,
}: {
  content: PageHeroContent;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-hero-wash relative overflow-hidden border-b">
      <GridPattern />
      <Container className="relative py-16 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="mb-4 inline-block rounded-full border border-brand-200 bg-white px-3.5 py-1 text-xs font-semibold tracking-wide text-brand-700 uppercase shadow-xs">
            {content.eyebrow}
          </p>
          <h1 className="text-display-sm text-balance lg:text-display">{content.heading}</h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            {content.description}
          </p>
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
