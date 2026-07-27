/**
 * Content-layer types.
 *
 * These are the return shapes of the content access layer (src/lib/content/*).
 * Components depend on these types only — never on the storage mechanism
 * (typed seed data today, Prisma later).
 */

export type NavLocation = "header" | "footer" | "legal";

export interface NavItemContent {
  label: string;
  href: string;
  order: number;
  location: NavLocation;
  children?: NavItemContent[];
}

export interface FooterGroupContent {
  heading: string;
  items: NavItemContent[];
}

export interface SocialLinkContent {
  icon: string;
  label: string;
  href: string;
}

export interface SiteSettingsContent {
  brandName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: SocialLinkContent[];
  ctaEmployers: { label: string; href: string };
  ctaCandidates: { label: string; href: string };
  copyright: string;
  ui: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    mainNavLabel: string;
    footerNavLabel: string;
    legalNavLabel: string;
    socialNavLabel: string;
    breadcrumbLabel: string;
    backToTop: string;
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
  };
}

/* ── Shared building blocks ─────────────────────────────────────────────── */

export interface CtaContent {
  label: string;
  href: string;
}

export interface StatContent {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
}

export interface ProcessStepContent {
  title: string;
  description: string;
  icon: string;
}

export interface FeatureContent {
  icon: string;
  title: string;
  description: string;
}

export interface TrustBadgeContent {
  icon: string;
  label: string;
  description: string;
}

export interface SectionIntro {
  eyebrow: string;
  heading: string;
  description?: string;
}

/* ── Models ─────────────────────────────────────────────────────────────── */

export interface ServiceContent {
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  longDesc: string[];
  features: string[];
  outcomes: { value: string; label: string }[];
  order: number;
  metaTitle: string;
  metaDescription: string;
}

export interface IndustryContent {
  slug: string;
  name: string;
  icon: string;
  shortDesc: string;
  longDesc: string[];
  roles: string[];
  placementCount: number;
  order: number;
  metaTitle: string;
  metaDescription: string;
}

export type WorkMode = "On-site" | "Hybrid" | "Remote";
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";

export interface JobContent {
  slug: string;
  title: string;
  department: string;
  location: string;
  workMode: WorkMode;
  employmentType: EmploymentType;
  experienceMin: number;
  experienceMax: number;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  salaryPeriod: string;
  summary: string;
  description: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  isFeatured: boolean;
  postedAt: string; // ISO date
  closesAt: string; // ISO date
}

export interface TestimonialContent {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  audience: "employer" | "candidate";
}

export interface CaseStudyContent {
  slug: string;
  client: string;
  industry: string;
  headline: string;
  summary: string;
  challenge: string[];
  solution: string[];
  results: string[];
  metrics: { value: string; label: string }[];
  metaTitle: string;
  metaDescription: string;
}

export interface TeamMemberContent {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
}

export interface FaqContent {
  category: string;
  question: string;
  answer: string;
}

export interface PostSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface PostContent {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  body: PostSection[];
  metaTitle: string;
  metaDescription: string;
}

export interface ClientLogoContent {
  name: string;
  /** short mark shown in the text-logo tile */
  short: string;
}

export interface MilestoneContent {
  year: string;
  title: string;
  description: string;
}

export interface LegalPageContent {
  slug: string;
  title: string;
  updatedAt: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  metaTitle: string;
  metaDescription: string;
}
