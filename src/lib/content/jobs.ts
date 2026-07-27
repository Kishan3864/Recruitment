import { jobs } from "@/data/seed/jobs";
import type { JobContent } from "@/types/content";

export interface JobFilters {
  q?: string;
  location?: string;
  workMode?: string;
  type?: string;
}

export async function getJobs(filters: JobFilters = {}): Promise<JobContent[]> {
  const q = filters.q?.trim().toLowerCase();
  return jobs
    .filter((job) => {
      if (q) {
        const haystack = [job.title, job.department, job.summary, ...job.skills]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.location && job.location !== filters.location) return false;
      if (filters.workMode && job.workMode !== filters.workMode) return false;
      if (filters.type && job.employmentType !== filters.type) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      return b.postedAt.localeCompare(a.postedAt);
    });
}

export async function getFeaturedJobs(limit = 3): Promise<JobContent[]> {
  const featured = jobs.filter((j) => j.isFeatured);
  const rest = jobs.filter((j) => !j.isFeatured);
  return [...featured, ...rest].slice(0, limit);
}

export async function getJobBySlug(slug: string): Promise<JobContent | undefined> {
  return jobs.find((j) => j.slug === slug);
}

export async function getJobLocations(): Promise<string[]> {
  return [...new Set(jobs.map((j) => j.location))].sort();
}

export async function getJobWorkModes(): Promise<string[]> {
  return [...new Set(jobs.map((j) => j.workMode))];
}

export async function getJobTypes(): Promise<string[]> {
  return [...new Set(jobs.map((j) => j.employmentType))];
}

/** "₹24–38 LPA" */
export function formatSalary(job: JobContent): string {
  return `${job.currency}${job.salaryMin}–${job.salaryMax} ${job.salaryPeriod}`;
}

/** "14 Jul 2026" */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
