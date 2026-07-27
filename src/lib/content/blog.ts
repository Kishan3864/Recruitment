import { posts } from "@/data/seed/blog";
import type { PostContent } from "@/types/content";

export async function getPosts(): Promise<PostContent[]> {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getRecentPosts(limit = 3): Promise<PostContent[]> {
  return (await getPosts()).slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<PostContent | undefined> {
  return posts.find((p) => p.slug === slug);
}
