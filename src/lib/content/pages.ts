import { homePage } from "@/data/seed/home";
import { legalPages } from "@/data/seed/legal";
import {
  aboutPage,
  blogPage,
  candidatesPage,
  caseStudiesPage,
  contactPage,
  faqPage,
  jobsPage,
  notFoundContent,
  servicesPage,
} from "@/data/seed/pages";
import type { LegalPageContent } from "@/types/content";
import type {
  AboutPageContent,
  BlogPageContent,
  CandidatesPageContent,
  CaseStudiesPageContent,
  ContactPageContent,
  FaqPageContent,
  HomePageContent,
  JobsPageContent,
  NotFoundContent,
  ServicesPageContent,
} from "@/types/pages";

export async function getHomePage(): Promise<HomePageContent> {
  return homePage;
}

export async function getAboutPage(): Promise<AboutPageContent> {
  return aboutPage;
}

export async function getCandidatesPage(): Promise<CandidatesPageContent> {
  return candidatesPage;
}

export async function getJobsPage(): Promise<JobsPageContent> {
  return jobsPage;
}

export async function getContactPage(): Promise<ContactPageContent> {
  return contactPage;
}

export async function getFaqPage(): Promise<FaqPageContent> {
  return faqPage;
}

export async function getServicesPage(): Promise<ServicesPageContent> {
  return servicesPage;
}

export async function getCaseStudiesPage(): Promise<CaseStudiesPageContent> {
  return caseStudiesPage;
}

export async function getBlogPage(): Promise<BlogPageContent> {
  return blogPage;
}

export async function getLegalPages(): Promise<LegalPageContent[]> {
  return legalPages;
}

export async function getLegalPageBySlug(slug: string): Promise<LegalPageContent | undefined> {
  return legalPages.find((p) => p.slug === slug);
}

export async function getNotFoundContent(): Promise<NotFoundContent> {
  return notFoundContent;
}
