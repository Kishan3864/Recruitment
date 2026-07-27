import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/content/blog";
import { formatDate } from "@/lib/content/jobs";
import { getBlogPage } from "@/lib/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage();
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function BlogPage() {
  const [page, posts] = await Promise.all([getBlogPage(), getPosts()]);

  return (
    <>
      <PageHero content={page.hero} />
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card-lift group flex h-full flex-col rounded-2xl border bg-card p-8 shadow-xs"
                >
                  <Badge variant="secondary" className="mb-4 w-fit">
                    {post.category}
                  </Badge>
                  <h2 className="font-display text-xl leading-snug font-bold group-hover:text-brand-700">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-xs text-muted-foreground">
                    <span>
                      {page.byPrefix} {post.author} · {post.authorRole}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="size-3.5" aria-hidden="true" />
                      {post.readMinutes} {page.minuteReadSuffix}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 font-medium text-brand-600">
                      {page.readMore}
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
        </Container>
      </section>
    </>
  );
}
