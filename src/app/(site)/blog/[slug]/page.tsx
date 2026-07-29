import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";

import { AvatarInitials } from "@/components/shared/avatar-initials";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getPosts } from "@/lib/content/blog";
import { formatDate } from "@/lib/content/jobs";
import { getBlogPage } from "@/lib/content/pages";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.metaTitle, description: post.metaDescription };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, page] = await Promise.all([getPostBySlug(slug), getBlogPage()]);
  if (!post) notFound();

  return (
    <article>
      <section className="bg-hero-wash relative overflow-hidden border-b">
        <Container className="relative max-w-3xl py-14 lg:py-20">
          <Reveal>
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {page.backToBlog}
            </Link>
            <Badge variant="secondary" className="mb-4 bg-brand-50 text-brand-700">
              {post.category}
            </Badge>
            <h1 className="text-display-sm text-balance">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="flex items-center gap-2.5">
                <AvatarInitials name={post.author} className="size-9 text-xs" />
                <span className="text-sm">
                  <span className="font-medium">{post.author}</span>
                  <span className="block text-xs text-muted-foreground">{post.authorRole}</span>
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="size-4" aria-hidden="true" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock3 className="size-4" aria-hidden="true" />
                {post.readMinutes} {page.minuteReadSuffix}
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container className="max-w-3xl space-y-9">
          {post.body.map((section, i) => (
            <Reveal key={section.heading ?? i}>
              <div className="space-y-4">
                {section.heading && (
                  <h2 className="font-display text-2xl font-bold">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="leading-relaxed text-foreground/85">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="ml-1 list-inside list-disc space-y-2 leading-relaxed text-foreground/85 marker:text-brand-500">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </article>
  );
}
