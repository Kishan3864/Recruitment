import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage } from "@/components/shared/legal-page";
import { getLegalPageBySlug } from "@/lib/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPageBySlug("cookie-policy");
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function CookiePolicyPage() {
  const page = await getLegalPageBySlug("cookie-policy");
  if (!page) notFound();
  return <LegalPage page={page} />;
}
