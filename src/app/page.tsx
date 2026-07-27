import { AudienceSplit } from "@/components/sections/audience-split";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Hero } from "@/components/sections/hero";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { JobsPreview } from "@/components/sections/jobs-preview";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsBand } from "@/components/sections/stats-band";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustBadges } from "@/components/sections/trust-badges";
import { getRecentPosts } from "@/lib/content/blog";
import { getIndustries, getServices, getTestimonials } from "@/lib/content/collections";
import { getFeaturedJobs } from "@/lib/content/jobs";
import {
  getBlogPage,
  getHomePage,
  getIndustriesPage,
  getJobsPage,
  getServicesPage,
} from "@/lib/content/pages";
import { getClientLogos } from "@/lib/content/site";

/** Home — statically rendered composition of content-driven sections. */
export default async function HomePage() {
  const [home, services, industries, logos, featuredJobs, testimonials, posts] = await Promise.all([
    getHomePage(),
    getServices(),
    getIndustries(),
    getClientLogos(),
    getFeaturedJobs(3),
    getTestimonials(),
    getRecentPosts(3),
  ]);
  const [servicesPage, industriesPage, jobsPage, blogPage] = await Promise.all([
    getServicesPage(),
    getIndustriesPage(),
    getJobsPage(),
    getBlogPage(),
  ]);

  return (
    <>
      <Hero content={home.hero} />
      <LogoMarquee heading={home.logoStrip.heading} logos={logos} />
      <ServicesGrid
        intro={home.services}
        cta={home.services.cta}
        services={services}
        learnMore={servicesPage.learnMore}
      />
      <AudienceSplit content={home.audience} />
      <StatsBand intro={home.stats} stats={home.stats.items} />
      <ProcessSteps intro={home.process} steps={home.process.steps} />
      <IndustriesGrid
        intro={home.industries}
        cta={home.industries.cta}
        industries={industries}
        placementsSuffix={industriesPage.placementsSuffix}
      />
      <FeatureGrid intro={home.whyUs} features={home.whyUs.features} />
      <JobsPreview
        intro={home.jobsPreview}
        cta={home.jobsPreview.cta}
        jobs={featuredJobs}
        viewLabel={jobsPage.list.viewJob}
        featuredLabel={jobsPage.list.featuredBadge}
        postedPrefix={jobsPage.list.postedPrefix}
      />
      <Testimonials intro={home.testimonials} testimonials={testimonials} sunken />
      <TrustBadges intro={home.trust} badges={home.trust.badges} />
      <BlogPreview
        intro={home.blogPreview}
        cta={home.blogPreview.cta}
        posts={posts}
        readMore={home.blogPreview.readMore}
        minuteReadSuffix={blogPage.minuteReadSuffix}
      />
      <CtaBanner content={home.ctaBanner} />
    </>
  );
}
