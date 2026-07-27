import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/content/jobs";
import type { PostContent, SectionIntro } from "@/types/content";

export function BlogPreview({
  intro,
  cta,
  posts,
  readMore,
  minuteReadSuffix,
}: {
  intro: SectionIntro;
  cta: { label: string; href: string };
  posts: PostContent[];
  readMore: string;
  minuteReadSuffix: string;
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          description={intro.description}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-lift group flex h-full flex-col rounded-2xl border bg-card p-7 shadow-xs"
              >
                <Badge variant="secondary" className="mb-4 w-fit">
                  {post.category}
                </Badge>
                <h3 className="font-display text-lg leading-snug font-semibold group-hover:text-brand-700">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-4 border-t pt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="size-3.5" aria-hidden="true" />
                    {post.readMinutes} {minuteReadSuffix}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 font-medium text-brand-600">
                    {readMore}
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
