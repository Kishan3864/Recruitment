import { Container } from "@/components/shared/container";
import type { ClientLogoContent } from "@/types/content";

/**
 * Client "logo" strip: text-mark tiles in a CSS marquee (no carousel library).
 * The list is duplicated once; the keyframe translates -50% for a seamless loop.
 */
export function LogoMarquee({ heading, logos }: { heading: string; logos: ClientLogoContent[] }) {
  const loop = [...logos, ...logos];

  return (
    <section className="border-y bg-surface-sunken py-10">
      <Container>
        <p className="mb-7 text-center text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {heading}
        </p>
      </Container>
      <div
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-hidden="true"
      >
        <ul className="flex w-max animate-marquee items-center gap-14 pr-14">
          {loop.map((logo, i) => (
            <li
              key={`${logo.name}-${i}`}
              className="flex items-center gap-2 font-display text-lg font-semibold whitespace-nowrap text-neutral-400 transition-colors hover:text-brand-600"
            >
              <span className="inline-block size-2.5 rounded-sm bg-current opacity-60" />
              {logo.short}
            </li>
          ))}
        </ul>
      </div>
      <p className="sr-only">{logos.map((l) => l.name).join(", ")}</p>
    </section>
  );
}
