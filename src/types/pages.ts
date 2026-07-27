import type {
  CtaContent,
  FeatureContent,
  MilestoneContent,
  ProcessStepContent,
  SectionIntro,
  StatContent,
  TrustBadgeContent,
} from "./content";

/* ── Form copy ──────────────────────────────────────────────────────────── */

export interface FieldCopy {
  label: string;
  placeholder?: string;
}

export interface FormMessages {
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  /** Shown under a field that fails validation */
  fieldInvalid: string;
  /** Shown when the uploaded resume is missing, too large or the wrong type */
  resumeInvalid: string;
}

export interface ApplyFormCopy {
  title: string;
  subtitle: string;
  fields: {
    fullName: FieldCopy;
    email: FieldCopy;
    phone: FieldCopy;
    location: FieldCopy;
    experienceYears: FieldCopy;
    currentRole: FieldCopy;
    expectedSalary: FieldCopy;
    noticePeriod: FieldCopy;
    linkedin: FieldCopy;
    resume: FieldCopy & { help: string };
    coverNote: FieldCopy;
  };
  noticePeriodOptions: string[];
  consent: string;
  messages: FormMessages;
}

export interface ContactFormCopy {
  title: string;
  subtitle: string;
  fields: {
    fullName: FieldCopy;
    email: FieldCopy;
    subject: FieldCopy;
    message: FieldCopy;
  };
  messages: FormMessages;
}

/* ── Page shapes ────────────────────────────────────────────────────────── */

export interface HomePageContent {
  hero: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    primaryCta: CtaContent;
    secondaryCta: CtaContent;
    stats: StatContent[];
    cardRoles: { title: string; meta: string }[];
    cardMatch: { title: string; subtitle: string; percent: string };
  };
  logoStrip: { heading: string };
  services: SectionIntro & { cta: CtaContent };
  stats: SectionIntro & { items: StatContent[] };
  process: SectionIntro & { steps: ProcessStepContent[] };
  whyUs: SectionIntro & { features: FeatureContent[] };
  jobsPreview: SectionIntro & { cta: CtaContent; applyLabel: string };
  testimonials: SectionIntro;
  trust: SectionIntro & { badges: TrustBadgeContent[] };
  blogPreview: SectionIntro & { cta: CtaContent; readMore: string };
  ctaBanner: {
    heading: string;
    description: string;
    primaryCta: CtaContent;
    secondaryCta: CtaContent;
    note: string;
  };
}

export interface PageHero {
  eyebrow: string;
  heading: string;
  description: string;
}

export interface AboutPageContent {
  hero: PageHero;
  story: SectionIntro & { paragraphs: string[] };
  mission: { title: string; body: string };
  vision: { title: string; body: string };
  values: SectionIntro & { items: FeatureContent[] };
  timeline: SectionIntro & { milestones: MilestoneContent[] };
  team: SectionIntro;
  trust: SectionIntro & { badges: TrustBadgeContent[] };
  metaTitle: string;
  metaDescription: string;
}

export interface CandidatesPageContent {
  hero: PageHero & { primaryCta: CtaContent; stats: StatContent[] };
  process: SectionIntro & { steps: ProcessStepContent[] };
  promises: SectionIntro & { items: FeatureContent[] };
  resumeTips: SectionIntro & { tips: { title: string; description: string }[] };
  testimonials: SectionIntro;
  form: ApplyFormCopy;
  metaTitle: string;
  metaDescription: string;
}

export interface JobsPageContent {
  hero: PageHero;
  filters: {
    searchPlaceholder: string;
    locationLabel: string;
    workModeLabel: string;
    typeLabel: string;
    allOption: string;
    searchButton: string;
    clearButton: string;
  };
  list: {
    resultsSingular: string;
    resultsPlural: string;
    emptyTitle: string;
    emptyBody: string;
    featuredBadge: string;
    viewJob: string;
    postedPrefix: string;
  };
  detail: {
    overviewHeading: string;
    responsibilitiesHeading: string;
    requirementsHeading: string;
    benefitsHeading: string;
    skillsHeading: string;
    factsHeading: string;
    facts: {
      department: string;
      location: string;
      workMode: string;
      type: string;
      experience: string;
      salary: string;
      posted: string;
      closes: string;
    };
    experienceTemplate: string;
    applyCta: string;
    backToJobs: string;
    shareHeading: string;
  };
  applyForm: ApplyFormCopy;
  metaTitle: string;
  metaDescription: string;
}

export interface ContactPageContent {
  hero: PageHero;
  offices: SectionIntro & {
    locations: { city: string; address: string; phone: string; email: string }[];
  };
  reachUs: {
    heading: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    hoursLabel: string;
    hours: string;
    responsePromise: string;
  };
  form: ContactFormCopy;
  metaTitle: string;
  metaDescription: string;
}

export interface FaqPageContent {
  hero: PageHero;
  contactPrompt: { text: string; cta: CtaContent };
  metaTitle: string;
  metaDescription: string;
}

export interface ListingPageContent {
  hero: PageHero;
  metaTitle: string;
  metaDescription: string;
}

export interface BlogPageContent extends ListingPageContent {
  readMore: string;
  minuteReadSuffix: string;
  byPrefix: string;
  backToBlog: string;
}

export interface CaseStudiesPageContent extends ListingPageContent {
  challengeHeading: string;
  solutionHeading: string;
  resultsHeading: string;
  readCaseStudy: string;
  backToCaseStudies: string;
}

export interface ServicesPageContent extends ListingPageContent {
  learnMore: string;
  featuresHeading: string;
  outcomesHeading: string;
  otherServicesHeading: string;
  ctaBanner: { heading: string; description: string; cta: CtaContent };
}

export interface NotFoundContent {
  code: string;
  heading: string;
  description: string;
  homeCta: CtaContent;
  jobsCta: CtaContent;
}
