import { caseStudies } from "@/data/seed/case-studies";
import { faqs } from "@/data/seed/faqs";
import { services } from "@/data/seed/services";
import { team } from "@/data/seed/team";
import { testimonials } from "@/data/seed/testimonials";
import type {
  CaseStudyContent,
  FaqContent,
  ServiceContent,
  TeamMemberContent,
  TestimonialContent,
} from "@/types/content";

/** Services */
export async function getServices(): Promise<ServiceContent[]> {
  return [...services].sort((a, b) => a.order - b.order);
}

export async function getServiceBySlug(slug: string): Promise<ServiceContent | undefined> {
  return services.find((s) => s.slug === slug);
}

/** Testimonials */
export async function getTestimonials(
  audience?: TestimonialContent["audience"]
): Promise<TestimonialContent[]> {
  return audience ? testimonials.filter((t) => t.audience === audience) : testimonials;
}

/** Case studies */
export async function getCaseStudies(): Promise<CaseStudyContent[]> {
  return caseStudies;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyContent | undefined> {
  return caseStudies.find((c) => c.slug === slug);
}

/** Team */
export async function getTeam(): Promise<TeamMemberContent[]> {
  return team;
}

/** FAQs, grouped by category preserving seed order */
export async function getFaqs(): Promise<FaqContent[]> {
  return faqs;
}

export async function getFaqCategories(): Promise<{ category: string; items: FaqContent[] }[]> {
  const grouped = new Map<string, FaqContent[]>();
  for (const faq of faqs) {
    const list = grouped.get(faq.category) ?? [];
    list.push(faq);
    grouped.set(faq.category, list);
  }
  return [...grouped.entries()].map(([category, items]) => ({ category, items }));
}
