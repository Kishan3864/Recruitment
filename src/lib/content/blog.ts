import { desc } from "drizzle-orm";

import { safeQuery, schema } from "@/db/client";
import { posts as seedPosts } from "@/data/seed/blog";
import type { PostContent } from "@/types/content";

export async function getPosts(): Promise<PostContent[]> {
  const rows = await safeQuery((db) =>
    db.select().from(schema.posts).orderBy(desc(schema.posts.publishedAt))
  );
  if (!rows) return [...seedPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    author: r.author,
    authorRole: r.authorRole,
    publishedAt: r.publishedAt,
    readMinutes: r.readMinutes,
    body: r.body,
    metaTitle: r.metaTitle,
    metaDescription: r.metaDescription,
  }));
}

export async function getRecentPosts(limit = 3): Promise<PostContent[]> {
  return (await getPosts()).slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<PostContent | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}
