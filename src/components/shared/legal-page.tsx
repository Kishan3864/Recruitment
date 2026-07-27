import { Container } from "@/components/shared/container";
import { formatDate } from "@/lib/content/jobs";
import type { LegalPageContent } from "@/types/content";

/** Shared renderer for legal pages (privacy / terms / cookies). */
export function LegalPage({ page }: { page: LegalPageContent }) {
  return (
    <>
      <section className="bg-hero-wash border-b">
        <Container className="max-w-3xl py-14 lg:py-18">
          <h1 className="text-display-sm">{page.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{formatDate(page.updatedAt)}</p>
          <p className="mt-5 leading-relaxed text-muted-foreground">{page.intro}</p>
        </Container>
      </section>
      <section className="py-12 lg:py-16">
        <Container className="max-w-3xl space-y-9">
          {page.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-semibold">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-3 ml-1 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground marker:text-brand-500">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 40)}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
