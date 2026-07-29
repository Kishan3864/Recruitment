import { asc } from "drizzle-orm";

import { safeQuery, schema } from "@/db/client";
import { caseStudies as seedCaseStudies } from "@/data/seed/case-studies";
import { faqs as seedFaqs } from "@/data/seed/faqs";
import { services as seedServices } from "@/data/seed/services";
import { team as seedTeam } from "@/data/seed/team";
import { testimonials as seedTestimonials } from "@/data/seed/testimonials";
import type {
  CaseStudyContent,
  FaqContent,
  ServiceContent,
  TeamMemberContent,
  TestimonialContent,
} from "@/types/content";

/** Services */
export async function getServices(): Promise<ServiceContent[]> {
  const rows = await safeQuery((db) =>
    db.select().from(schema.services).orderBy(asc(schema.services.sort))
  );
  if (!rows) return [...seedServices].sort((a, b) => a.order - b.order);
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    icon: r.icon,
    shortDesc: r.shortDesc,
    longDesc: r.longDesc,
    features: r.features,
    outcomes: r.outcomes,
    order: r.sort,
    metaTitle: r.metaTitle,
    metaDescription: r.metaDescription,
  }));
}

export async function getServiceBySlug(slug: string): Promise<ServiceContent | undefined> {
  return (await getServices()).find((s) => s.slug === slug);
}

/** Testimonials */
export async function getTestimonials(
  audience?: TestimonialContent["audience"]
): Promise<TestimonialContent[]> {
  const rows = await safeQuery((db) =>
    db.select().from(schema.testimonials).orderBy(asc(schema.testimonials.sort))
  );
  const list: TestimonialContent[] = rows
    ? rows.map((r) => ({
        quote: r.quote,
        author: r.author,
        role: r.role,
        company: r.company,
        rating: r.rating,
        audience: r.audience as TestimonialContent["audience"],
      }))
    : seedTestimonials;
  return audience ? list.filter((t) => t.audience === audience) : list;
}

/** Case studies */
export async function getCaseStudies(): Promise<CaseStudyContent[]> {
  const rows = await safeQuery((db) => db.select().from(schema.caseStudies));
  if (!rows) return seedCaseStudies;
  return rows.map((r) => ({
    slug: r.slug,
    client: r.client,
    industry: r.industry,
    headline: r.headline,
    summary: r.summary,
    challenge: r.challenge,
    solution: r.solution,
    results: r.results,
    metrics: r.metrics,
    metaTitle: r.metaTitle,
    metaDescription: r.metaDescription,
  }));
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyContent | undefined> {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}

/** Team */
export async function getTeam(): Promise<TeamMemberContent[]> {
  const rows = await safeQuery((db) =>
    db.select().from(schema.teamMembers).orderBy(asc(schema.teamMembers.sort))
  );
  if (!rows) return seedTeam;
  return rows.map((r) => ({
    name: r.name,
    role: r.role,
    bio: r.bio,
    specialties: r.specialties,
  }));
}

/** FAQs, grouped by category preserving order */
export async function getFaqs(): Promise<FaqContent[]> {
  const rows = await safeQuery((db) =>
    db.select().from(schema.faqs).orderBy(asc(schema.faqs.sort))
  );
  if (!rows) return seedFaqs;
  return rows.map((r) => ({ category: r.category, question: r.question, answer: r.answer }));
}

export async function getFaqCategories(): Promise<{ category: string; items: FaqContent[] }[]> {
  const faqs = await getFaqs();
  const grouped = new Map<string, FaqContent[]>();
  for (const faq of faqs) {
    const list = grouped.get(faq.category) ?? [];
    list.push(faq);
    grouped.set(faq.category, list);
  }
  return [...grouped.entries()].map(([category, items]) => ({ category, items }));
}
