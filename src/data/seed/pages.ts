import type {
  AboutPageContent,
  BlogPageContent,
  CandidatesPageContent,
  CaseStudiesPageContent,
  ContactPageContent,
  FaqPageContent,
  JobsPageContent,
  NotFoundContent,
  ServicesPageContent,
} from "@/types/pages";
import { applyFormCopy, contactFormCopy, registerFormCopy } from "./forms";

export const aboutPage: AboutPageContent = {
  hero: {
    eyebrow: "About us",
    heading: "Recruitment, done the way it should have always been done",
    description:
      "Recruitment exists because both of our founders were hired badly — and knew the industry could do better than resume roulette.",
  },
  story: {
    eyebrow: "Our story",
    heading: "From a two-desk office to 6,200 placements",
    paragraphs: [
      "Recruitment started in 2017 in a two-desk office in Mumbai with an unfashionable idea: measure a recruiter by how long their hires stay, not by how fast a fee gets booked. Our first client was a twelve-person startup; our first placement is now their VP of Engineering.",
      "That idea forced everything else. If retention is the metric, screening has to be real — so we built four-stage verification when the industry norm was a keyword search and a phone call. If retention is the metric, candidates have to actually want the jobs — so we banned profile-blasting and made per-role consent the rule.",
      "Nine years later we're 85 people across three offices, with desks in eight industries and more than 6,200 placements made. The metric hasn't changed: 96% of our placements pass their 90-day mark, and we publish that number because we're held to it.",
    ],
  },
  mission: {
    title: "Our mission",
    body: "To make every placement a long-term success story — by verifying rigorously, matching honestly, and staying accountable long after the joining date.",
  },
  vision: {
    title: "Our vision",
    body: "A hiring market where candidates are treated like people, employers get evidence instead of noise, and 'recruitment agency' is a term of trust.",
  },
  values: {
    eyebrow: "What we stand for",
    heading: "Four values, applied daily",
    description:
      "Values only matter when they cost you something. These have cost us fees, mandates and easy shortcuts — and built everything we have.",
    items: [
      {
        icon: "shield-check",
        title: "Truth over placement",
        description:
          "If a candidate isn't right, we say so — even when staying quiet would close the deal. We've lost fees to this value and gained every long-term client because of it.",
      },
      {
        icon: "user-check",
        title: "Candidates are clients too",
        description:
          "No fees, no spam, no ghosting. Every candidate gets honest feedback and a consultant who actually knows their market — whether or not we place them this time.",
      },
      {
        icon: "trending-up",
        title: "Evidence beats instinct",
        description:
          "Scorecards over gut feel, live market data over stale surveys, structured interviews over vibes. We bring the receipts to every recommendation.",
      },
      {
        icon: "handshake",
        title: "Accountable after the offer",
        description:
          "The placement isn't done at the joining date. Structured 30/60/90-day check-ins and real guarantees keep us invested in the outcome.",
      },
    ],
  },
  timeline: {
    eyebrow: "Milestones",
    heading: "Nine years, briefly",
    milestones: [
      {
        year: "2017",
        title: "Founded in Mumbai",
        description: "Two desks, one rule: never send a profile you wouldn't hire yourself.",
      },
      {
        year: "2019",
        title: "1,000th placement",
        description: "Technology and BFSI desks established; four-stage screening formalised.",
      },
      {
        year: "2021",
        title: "Healthcare practice launched",
        description: "Clinical screening panel and direct licence verification set a new bar.",
      },
      {
        year: "2022",
        title: "Bengaluru & Gurugram offices",
        description: "RPO practice launched with our first embedded 120-hire engagement.",
      },
      {
        year: "2024",
        title: "5,000th placement",
        description: "Payroll & compliance practice crosses 10,000 workers paid monthly.",
      },
      {
        year: "2026",
        title: "6,200+ placements and counting",
        description: "85 people, 8 industry desks, 300+ active hiring partners.",
      },
    ],
  },
  team: {
    eyebrow: "Leadership",
    heading: "The people behind the placements",
    description:
      "Every leader at Recruitment has worked inside the industries they now hire for. That's not a coincidence — it's the hiring bar.",
  },
  trust: {
    eyebrow: "Trust & compliance",
    heading: "The standards we operate under",
    description:
      "Handling careers and hiring plans is a responsibility. These are the commitments every engagement inherits automatically.",
    badges: [
      {
        icon: "lock",
        label: "Encrypted data handling",
        description:
          "India-hosted, encrypted at rest and in transit, access-controlled by mandate.",
      },
      {
        icon: "user-check",
        label: "Consent-first process",
        description:
          "No profile leaves our system without the candidate's explicit per-role approval.",
      },
      {
        icon: "file-text",
        label: "NDA-protected engagements",
        description:
          "Client mandates and candidate identities protected by strict confidentiality.",
      },
      {
        icon: "scale",
        label: "Full statutory compliance",
        description: "PF, ESI, PT and labour-law obligations met with a zero-penalty record.",
      },
    ],
  },
  metaTitle: "About Recruitment",
  metaDescription:
    "The story, values and team behind Recruitment — 6,200+ placements, 96% 90-day success, and a nine-year zero-penalty compliance record.",
};

export const candidatesPage: CandidatesPageContent = {
  hero: {
    eyebrow: "For candidates",
    heading: "A job search where someone is actually on your side",
    description:
      "No fees, no spam, no ghosting. A consultant who knows your market, tells you the salary band upfront, preps you for every round and negotiates for you — that's how it works here.",
    primaryCta: { label: "Submit your resume", href: "#register" },
    stats: [
      { value: 2, suffix: " days", label: "to first response" },
      { value: 0, prefix: "₹", label: "cost to you, ever" },
      { value: 100, suffix: "%", label: "consent before sharing" },
    ],
  },
  process: {
    eyebrow: "How we place you",
    heading: "From resume to offer, step by step",
    description:
      "You'll always know what's happening and why. Here's the journey every candidate goes through with us.",
    steps: [
      {
        icon: "file-text",
        title: "Profile review",
        description:
          "A consultant from your sector desk — not a generic screener — reviews your resume within two working days and calls if there's a genuine match to discuss.",
      },
      {
        icon: "message-square",
        title: "Honest conversation",
        description:
          "We discuss the role with full transparency: company name, salary band, interview stages and timeline. You decide if we proceed — your profile moves only with your consent.",
      },
      {
        icon: "graduation-cap",
        title: "Prep for every round",
        description:
          "Before each interview you get a prep call covering the panel, the format, and what this employer actually evaluates. No candidate of ours walks in blind.",
      },
      {
        icon: "trending-up",
        title: "Offer & beyond",
        description:
          "We benchmark and negotiate your offer, guide your resignation and notice period, and stay in touch through your first months in the new role.",
      },
    ],
  },
  promises: {
    eyebrow: "Our promises to you",
    heading: "What every candidate can hold us to",
    items: [
      {
        icon: "shield-check",
        title: "Free. Always.",
        description:
          "Employers pay our fees — you never do. Anyone asking you for money in our name is a fraud; report them to us immediately.",
      },
      {
        icon: "lock",
        title: "Your consent rules",
        description:
          "Your profile is never sent to any employer without your explicit approval for that specific role. Your current employer never finds out you're looking.",
      },
      {
        icon: "message-square",
        title: "Feedback, both ways",
        description:
          "Rejected? You'll hear why, in useful terms. We chase every employer for real feedback within 48 hours of your interview.",
      },
      {
        icon: "banknote",
        title: "The band, upfront",
        description:
          "We tell you the salary range before you invest a minute in the process — so you never discover at offer stage that the maths doesn't work.",
      },
    ],
  },
  resumeTips: {
    eyebrow: "Free resources",
    heading: "Make your resume screen-proof",
    description:
      "Our screening team reads hundreds of resumes a week. These five fixes cover most of what separates a callback from silence.",
    tips: [
      {
        title: "Lead with outcomes, not duties",
        description:
          "Rewrite each bullet to answer 'what changed because you were there?' — growth, savings, speed, quality. Numbers beat adjectives every time.",
      },
      {
        title: "Quantify your scale",
        description:
          "Team size, budget, revenue touched, users served. Scale context lets a screener place you accurately in seconds.",
      },
      {
        title: "Cut the skills graveyard",
        description:
          "List the eight skills you'd happily be interviewed on tomorrow — not thirty you've brushed against. Depth reads stronger than breadth.",
      },
      {
        title: "Explain your gaps in one line",
        description:
          "Career breaks are normal. One honest line closes the question; an unexplained gap invites worse assumptions than the truth.",
      },
      {
        title: "Write the summary last",
        description:
          "Three lines at the top: who you are, your superpower, what you want next. Specific beats impressive — it sets the frame for everything below.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Candidate stories",
    heading: "People we've placed, in their own words",
  },
  form: registerFormCopy,
  metaTitle: "Find a Job — For Candidates",
  metaDescription:
    "Zero fees, consent-first profile sharing, interview prep and salary negotiation on your side. Submit your resume and hear back within 2 working days.",
};

export const jobsPage: JobsPageContent = {
  hero: {
    eyebrow: "Open roles",
    heading: "Find your next role",
    description:
      "Every listing shows the real salary band and the actual interview process — because your time deserves that respect.",
  },
  filters: {
    searchPlaceholder: "Search by title, skill or keyword…",
    locationLabel: "Location",
    workModeLabel: "Work mode",
    typeLabel: "Job type",
    allOption: "All",
    searchButton: "Search",
    clearButton: "Clear filters",
  },
  list: {
    resultsSingular: "role found",
    resultsPlural: "roles found",
    emptyTitle: "No roles match those filters",
    emptyBody:
      "Try broadening your search — or submit your resume and we'll reach out the moment a matching role opens.",
    featuredBadge: "Featured",
    viewJob: "View details",
    postedPrefix: "Posted",
  },
  detail: {
    overviewHeading: "About the role",
    responsibilitiesHeading: "What you'll do",
    requirementsHeading: "What you'll bring",
    benefitsHeading: "Benefits & perks",
    skillsHeading: "Key skills",
    factsHeading: "Role snapshot",
    facts: {
      department: "Department",
      location: "Location",
      workMode: "Work mode",
      type: "Employment type",
      experience: "Experience",
      salary: "Salary band",
      posted: "Posted",
      closes: "Applications close",
    },
    experienceTemplate: "{min}–{max} years",
    applyCta: "Apply for this role",
    backToJobs: "All open roles",
    shareHeading: "Know someone perfect for this?",
  },
  applyForm: applyFormCopy,
  metaTitle: "Open Jobs & Career Opportunities",
  metaDescription:
    "Browse verified open roles with real salary bands across technology, finance, healthcare, sales and operations. Apply in minutes.",
};

export const contactPage: ContactPageContent = {
  hero: {
    eyebrow: "Contact us",
    heading: "Talk to a human, fast",
    description:
      "Employers hear back within 4 business hours. Candidates within 2 working days. Everyone gets a straight answer.",
  },
  offices: {
    eyebrow: "Our offices",
    heading: "Where to find us",
    locations: [
      {
        city: "Mumbai (HQ)",
        address: "Level 8, One Horizon Center, Bandra Kurla Complex, Mumbai 400051",
        phone: "+91 22 4890 2210",
        email: "hello@recruitment.in",
      },
      {
        city: "Bengaluru",
        address: "4th Floor, Prestige Atlanta, Koramangala 1st Block, Bengaluru 560034",
        phone: "+91 80 4712 5540",
        email: "bengaluru@recruitment.in",
      },
      {
        city: "Gurugram",
        address: "Tower B, DLF Cyber Park, Sector 20, Gurugram 122008",
        phone: "+91 124 466 0925",
        email: "ncr@recruitment.in",
      },
    ],
  },
  reachUs: {
    heading: "Reach us directly",
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Head office",
    hoursLabel: "Working hours",
    hours: "Monday–Saturday, 9:00–19:00 IST",
    responsePromise:
      "Response promise: employer enquiries within 4 business hours; candidate applications within 2 working days.",
  },
  form: contactFormCopy,
  metaTitle: "Contact Recruitment",
  metaDescription:
    "Reach our Mumbai, Bengaluru or Gurugram offices. Employer enquiries answered within 4 business hours; candidates within 2 working days.",
};

export const faqPage: FaqPageContent = {
  hero: {
    eyebrow: "FAQ",
    heading: "Questions, answered honestly",
    description:
      "The things employers and candidates actually ask us — including the awkward ones about fees, guarantees and data.",
  },
  contactPrompt: {
    text: "Didn't find your answer? We reply to every message within one working day.",
    cta: { label: "Contact us", href: "/contact" },
  },
  metaTitle: "Frequently Asked Questions",
  metaDescription:
    "Honest answers on fees, timelines, guarantees, confidentiality and data protection — for both employers and candidates.",
};

export const servicesPage: ServicesPageContent = {
  hero: {
    eyebrow: "Our services",
    heading: "Six ways we solve hiring",
    description:
      "From a single critical hire to a fully embedded recruitment engine — every service runs on the same verified network and four-stage screening standard.",
  },
  learnMore: "Learn more",
  featuresHeading: "What's included",
  outcomesHeading: "Typical outcomes",
  otherServicesHeading: "Other services",
  ctaBanner: {
    heading: "Not sure which model fits?",
    description:
      "Tell us what you're hiring and a specialist will recommend the right engagement — with honest trade-offs, in one call.",
    cta: { label: "Request a callback", href: "/contact" },
  },
  metaTitle: "Recruitment & Staffing Services",
  metaDescription:
    "Permanent recruitment, contract staffing, executive search, RPO, payroll & compliance and HR advisory — one screening standard across all six.",
};

export const caseStudiesPage: CaseStudiesPageContent = {
  hero: {
    eyebrow: "Case studies",
    heading: "Proof, in detail",
    description:
      "Real engagements with real numbers — how the process performs when the stakes are high.",
  },
  challengeHeading: "The challenge",
  solutionHeading: "What we did",
  resultsHeading: "The results",
  readCaseStudy: "Read case study",
  backToCaseStudies: "All case studies",
  metaTitle: "Case Studies & Success Stories",
  metaDescription:
    "Detailed recruitment case studies: GCC engineering build-outs, confidential CXO searches and clinical staffing — with verified outcomes.",
};

export const blogPage: BlogPageContent = {
  hero: {
    eyebrow: "Blog & insights",
    heading: "Straight talk on hiring and careers",
    description:
      "Practical writing from consultants who close offers every week — no recycled listicles, no fluff.",
  },
  readMore: "Read article",
  minuteReadSuffix: "min read",
  byPrefix: "By",
  backToBlog: "All articles",
  metaTitle: "Blog — Hiring & Career Insights",
  metaDescription:
    "Salary negotiation, resume strategy, structured interviewing and hiring-market insight from practising recruiters.",
};

export const notFoundContent: NotFoundContent = {
  code: "404",
  heading: "This page has moved on to a new opportunity",
  description:
    "The page you're looking for doesn't exist or has been relocated. Let's get you somewhere useful.",
  homeCta: { label: "Back to home", href: "/" },
  jobsCta: { label: "Browse open roles", href: "/jobs" },
};
