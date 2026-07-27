import type { HomePageContent } from "@/types/pages";

export const homePage: HomePageContent = {
  hero: {
    badge: "Trusted by 300+ employers across India",
    heading: "Hiring that moves careers and",
    headingHighlight: "companies forward",
    subheading:
      "We connect employers with rigorously verified professionals — and candidates with roles that actually fit. Transparent process, real screening, zero noise.",
    primaryCta: { label: "Hire Talent", href: "/for-employers" },
    secondaryCta: { label: "Browse Open Roles", href: "/jobs" },
    stats: [
      { value: 6200, suffix: "+", label: "successful placements" },
      { value: 300, suffix: "+", label: "hiring partners" },
      { value: 96, suffix: "%", label: "placements pass 90 days" },
    ],
    cardRoles: [
      { title: "Senior Frontend Engineer", meta: "Bengaluru · Hybrid · ₹24–38 LPA" },
      { title: "Product Manager — Lending", meta: "Mumbai · On-site · ₹30–45 LPA" },
      { title: "Regional Sales Manager", meta: "Delhi NCR · ₹18–28 LPA" },
    ],
    cardMatch: {
      title: "Profile verified",
      subtitle: "References · Skills · Documents",
      percent: "98%",
    },
  },
  logoStrip: {
    heading: "Teams that hire with us",
  },
  services: {
    eyebrow: "What we do",
    heading: "Six ways we solve hiring",
    description:
      "From a single critical hire to an entire embedded recruitment engine — pick the engagement that fits, and we bring the network, screening and speed.",
    cta: { label: "Explore all services", href: "/services" },
  },
  audience: {
    intro: {
      eyebrow: "Two audiences, one standard",
      heading: "Built for employers. Loved by candidates.",
      description:
        "Great placements happen when both sides are treated with the same rigour and respect. That's the whole model.",
    },
    employers: {
      title: "For Employers",
      description:
        "Stop filtering noise. Get a shortlist of three to five interview-ready, reference-checked candidates within five working days.",
      bullets: [
        "Shortlist in 5 working days",
        "Four-stage screening on every profile",
        "90-day free replacement guarantee",
        "One accountable point of contact",
      ],
      cta: { label: "Start hiring", href: "/for-employers" },
    },
    candidates: {
      title: "For Candidates",
      description:
        "No spam, no ghosting, no fees — ever. A consultant who knows your market, preps you for every round and negotiates on your side.",
      bullets: [
        "Zero cost to you, always",
        "Your profile shared only with your consent",
        "Interview prep before every round",
        "Salary negotiation handled for you",
      ],
      cta: { label: "Find your next role", href: "/for-candidates" },
    },
  },
  stats: {
    eyebrow: "Proof, not promises",
    heading: "The numbers we're held to",
    description:
      "Every metric below is tracked per client and reviewed monthly. When you work with us, you'll see yours.",
    items: [
      {
        value: 6200,
        suffix: "+",
        label: "placements made",
        description: "across 8 industries since 2017",
      },
      {
        value: 5,
        suffix: " days",
        label: "average time to shortlist",
        description: "for professional roles",
      },
      {
        value: 92,
        suffix: "%",
        label: "offer-to-join rate",
        description: "against a market norm near 65%",
      },
      {
        value: 96,
        suffix: "%",
        label: "pass the 90-day mark",
        description: "replacement rate under 4%",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    heading: "A process you can see into",
    description:
      "No black box. Every engagement follows four transparent steps, and you know exactly where things stand at each one.",
    steps: [
      {
        icon: "clipboard-list",
        title: "Understand",
        description:
          "A structured intake call maps the role's real success criteria — outcomes, team, culture and constraints — into a scorecard we both sign off.",
      },
      {
        icon: "search",
        title: "Source & screen",
        description:
          "We search our 75,000-strong verified network and headhunt actively. Every candidate clears skills assessment, behavioural interview, references and document checks.",
      },
      {
        icon: "users",
        title: "Shortlist & interview",
        description:
          "You receive 3–5 interview-ready profiles with scorecards and salary expectations within five working days. We coordinate every round end to end.",
      },
      {
        icon: "badge-check",
        title: "Offer & onboard",
        description:
          "We handle negotiation, notice management and counter-offer risk, then stay engaged through onboarding with structured 30/60/90-day check-ins.",
      },
    ],
  },
  industries: {
    eyebrow: "Where we specialise",
    heading: "Deep desks, not generalists",
    description:
      "Each industry desk is run by consultants who've worked in that sector — because you can't screen what you don't understand.",
    cta: { label: "View all industries", href: "/industries" },
  },
  whyUs: {
    eyebrow: "Why Northbridge",
    heading: "What makes our placements stick",
    description:
      "Anyone can send resumes. We're built to be accountable for what happens after the joining date.",
    features: [
      {
        icon: "shield-check",
        title: "Verification you can audit",
        description:
          "Skills assessments, two phone references, and identity, education and employment checks on every single profile — with documentation you can review.",
      },
      {
        icon: "timer",
        title: "Speed without shortcuts",
        description:
          "Five-day shortlists and 48-hour contractor deployment come from a pre-verified network and disciplined process — not from skipping steps.",
      },
      {
        icon: "handshake",
        title: "Guarantees with teeth",
        description:
          "90-day free replacement on permanent hires, 12 months on retained search, backfill on contracts. Our replacement rate is under 4%.",
      },
      {
        icon: "lock",
        title: "Data privacy by default",
        description:
          "Candidate data lives on encrypted India-hosted infrastructure, is shared only with per-role consent, and is deleted on request. Always.",
      },
      {
        icon: "trending-up",
        title: "Market data, not guesswork",
        description:
          "Salary guidance from live offers we closed this month — so bands are realistic, offers land, and nobody wastes six weeks discovering the market moved.",
      },
      {
        icon: "message-square",
        title: "Radical transparency",
        description:
          "Shared dashboards, honest feedback in both directions, and a consultant who tells you when a search is hard instead of going quiet.",
      },
    ],
  },
  jobsPreview: {
    eyebrow: "Open roles",
    heading: "Featured opportunities",
    description:
      "A snapshot of what's live right now. Every role lists real salary bands — because transparency shouldn't stop at the job title.",
    cta: { label: "View all jobs", href: "/jobs" },
    applyLabel: "View & apply",
  },
  testimonials: {
    eyebrow: "In their words",
    heading: "Employers and candidates on working with us",
    description:
      "We measure success in retention and relationships. Here's what that looks like from both sides of the table.",
  },
  trust: {
    eyebrow: "Your data, protected",
    heading: "Trust is our operating system",
    description:
      "Handling resumes and hiring plans means handling sensitive information. Here's the standard we hold ourselves to.",
    badges: [
      {
        icon: "lock",
        label: "Encrypted infrastructure",
        description:
          "All candidate and client data encrypted at rest and in transit, hosted in India.",
      },
      {
        icon: "user-check",
        label: "Consent-first sharing",
        description: "Profiles reach employers only after explicit per-role candidate approval.",
      },
      {
        icon: "file-text",
        label: "NDA-protected mandates",
        description: "Confidential searches run under strict NDAs with sequenced disclosure.",
      },
      {
        icon: "shield-check",
        label: "Verified, always",
        description: "Identity, education and employment verification on every placed candidate.",
      },
    ],
  },
  blogPreview: {
    eyebrow: "Insights",
    heading: "Straight talk on hiring and careers",
    description:
      "No recycled listicles — practical writing from the people who close offers every week.",
    cta: { label: "Read the blog", href: "/blog" },
    readMore: "Read article",
  },
  ctaBanner: {
    heading: "Ready when you are",
    description:
      "Whether you're hiring your next critical role or searching for your own — start with a conversation, not a form-filling marathon.",
    primaryCta: { label: "Hire Talent", href: "/for-employers" },
    secondaryCta: { label: "Browse Open Roles", href: "/jobs" },
    note: "Employers hear back within 4 business hours. Candidates within 2 working days.",
  },
};
