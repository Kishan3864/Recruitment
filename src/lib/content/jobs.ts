import { asc, eq } from "drizzle-orm";

import { safeQuery, schema } from "@/db/client";
import { jobs as seedJobs } from "@/data/seed/jobs";
import type { JobContent, WorkMode, EmploymentType } from "@/types/content";

export interface JobFilters {
  q?: string;
  location?: string;
  workMode?: string;
  type?: string;
}

type JobRow = typeof schema.jobs.$inferSelect;

const toJob = (r: JobRow): JobContent => ({
  slug: r.slug,
  title: r.title,
  department: r.department,
  location: r.location,
  workMode: r.workMode as WorkMode,
  employmentType: r.employmentType as EmploymentType,
  experienceMin: r.experienceMin,
  experienceMax: r.experienceMax,
  salaryMin: r.salaryMin,
  salaryMax: r.salaryMax,
  currency: r.currency,
  salaryPeriod: r.salaryPeriod,
  summary: r.summary,
  description: r.description,
  responsibilities: r.responsibilities,
  requirements: r.requirements,
  benefits: r.benefits,
  skills: r.skills,
  isFeatured: r.isFeatured,
  postedAt: r.postedAt,
  closesAt: r.closesAt,
});

/** All active jobs (DB when configured, seed fallback otherwise). */
async function allJobs(): Promise<JobContent[]> {
  const rows = await safeQuery((db) =>
    db
      .select()
      .from(schema.jobs)
      .where(eq(schema.jobs.isActive, true))
      .orderBy(asc(schema.jobs.slug))
  );
  return rows ? rows.map(toJob) : seedJobs;
}

export async function getJobs(filters: JobFilters = {}): Promise<JobContent[]> {
  const jobs = await allJobs();
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
  const jobs = await allJobs();
  const featured = jobs.filter((j) => j.isFeatured);
  const rest = jobs.filter((j) => !j.isFeatured);
  return [...featured, ...rest].slice(0, limit);
}

export async function getJobBySlug(slug: string): Promise<JobContent | undefined> {
  return (await allJobs()).find((j) => j.slug === slug);
}

export async function getJobLocations(): Promise<string[]> {
  return [...new Set((await allJobs()).map((j) => j.location))].sort();
}

export async function getJobWorkModes(): Promise<string[]> {
  return [...new Set((await allJobs()).map((j) => j.workMode))];
}

export async function getJobTypes(): Promise<string[]> {
  return [...new Set((await allJobs()).map((j) => j.employmentType))];
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
