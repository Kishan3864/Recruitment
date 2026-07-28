import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/shared/container";
import { JobCard } from "@/components/shared/job-card";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { getJobLocations, getJobs, getJobTypes, getJobWorkModes } from "@/lib/content/jobs";
import { getJobsPage } from "@/lib/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getJobsPage();
  return { title: page.metaTitle, description: page.metaDescription };
}

/**
 * Jobs listing — dynamically rendered: filters are driven by URL searchParams
 * so results are shareable, crawlable and work without client JS.
 */
export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; workMode?: string; type?: string }>;
}) {
  const filters = await searchParams;
  const [page, jobs, locations, workModes, types] = await Promise.all([
    getJobsPage(),
    getJobs(filters),
    getJobLocations(),
    getJobWorkModes(),
    getJobTypes(),
  ]);

  const hasFilters = Boolean(filters.q || filters.location || filters.workMode || filters.type);
  const selectClass =
    "h-9 rounded-sm border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

  return (
    <>
      <PageHero content={page.hero}>
        {/* GET form → SSR filtering via searchParams */}
        <form
          method="get"
          className="relative mt-8 grid max-w-4xl gap-3 rounded-lg border bg-card p-4 shadow-card sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto]"
        >
          <input
            type="search"
            name="q"
            defaultValue={filters.q ?? ""}
            placeholder={page.filters.searchPlaceholder}
            className="h-9 rounded-sm border border-input bg-background px-3.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label={page.filters.searchPlaceholder}
          />
          <select
            name="location"
            defaultValue={filters.location ?? ""}
            aria-label={page.filters.locationLabel}
            className={selectClass}
          >
            <option value="">
              {page.filters.locationLabel}: {page.filters.allOption}
            </option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            name="workMode"
            defaultValue={filters.workMode ?? ""}
            aria-label={page.filters.workModeLabel}
            className={selectClass}
          >
            <option value="">
              {page.filters.workModeLabel}: {page.filters.allOption}
            </option>
            {workModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          <select
            name="type"
            defaultValue={filters.type ?? ""}
            aria-label={page.filters.typeLabel}
            className={selectClass}
          >
            <option value="">
              {page.filters.typeLabel}: {page.filters.allOption}
            </option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Button type="submit" className="h-9">
            {page.filters.searchButton}
          </Button>
        </form>
      </PageHero>

      <section className="py-14 lg:py-20">
        <Container>
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-display text-lg font-bold text-foreground">{jobs.length}</span>{" "}
              {jobs.length === 1 ? page.list.resultsSingular : page.list.resultsPlural}
            </p>
            {hasFilters && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/jobs">{page.filters.clearButton}</Link>
              </Button>
            )}
          </div>

          {jobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, i) => (
                <Reveal key={job.slug} delay={(i % 3) * 0.09} className="h-full">
                  <JobCard
                    job={job}
                    viewLabel={page.list.viewJob}
                    featuredLabel={page.list.featuredBadge}
                    postedPrefix={page.list.postedPrefix}
                    index={i}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md rounded-lg border border-dashed p-12 text-center">
              <SearchX className="mx-auto size-10 text-muted-foreground/50" aria-hidden="true" />
              <h2 className="mt-5 font-display text-lg font-semibold">{page.list.emptyTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {page.list.emptyBody}
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
