import { Container } from "@/components/shared/container";
import { Marquee } from "@/components/shared/marquee";
import type { ClientLogoContent } from "@/types/content";

/**
 * Client "logo" strip: text-mark tiles in a CSS marquee (no carousel library)
 * via the shared <Marquee> primitive — pauses on hover, static under
 * reduced motion, sr-only list carries the real content.
 */
export function LogoMarquee({ heading, logos }: { heading: string; logos: ClientLogoContent[] }) {
  return (
    <section className="border-y bg-surface-sunken py-10">
      <Container>
        <p className="mb-7 text-center text-eyebrow font-medium text-muted-foreground uppercase">
          {heading}
        </p>
      </Container>
      <Marquee decorative>
        {logos.map((logo) => (
          <span
            key={logo.name}
            className="flex items-center gap-2 font-display text-lg font-semibold whitespace-nowrap text-neutral-400 transition-colors hover:text-brand-600"
          >
            <span className="inline-block size-2.5 rounded-xs bg-current opacity-60" />
            {logo.short}
          </span>
        ))}
      </Marquee>
      <p className="sr-only">{logos.map((l) => l.name).join(", ")}</p>
    </section>
  );
}
