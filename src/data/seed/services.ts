import type { ServiceContent } from "@/types/content";

export const services: ServiceContent[] = [
  {
    slug: "permanent-recruitment",
    title: "Permanent Recruitment",
    icon: "user-check",
    order: 1,
    shortDesc:
      "End-to-end hiring for full-time roles — sourced, screened, reference-checked and interview-ready within days, not months.",
    longDesc: [
      "Permanent hires shape your company for years, which is why our permanent recruitment desk goes far beyond keyword matching. Every search starts with a structured intake call where we map the role's real success criteria — the outcomes the hire must deliver in their first year, not just the skills on the description.",
      "Our sourcing team combines a 75,000-strong pre-verified talent network with active headhunting in your sector. Each shortlisted candidate clears a four-stage screen: technical or functional assessment, structured behavioural interview, two professional reference checks and document verification.",
      "You receive a shortlist of three to five interview-ready candidates within five working days, complete with assessment scorecards, salary expectations and notice periods — so your hiring managers spend time deciding, not filtering.",
    ],
    features: [
      "Role scorecard built with your hiring manager before sourcing begins",
      "Shortlist of 3–5 vetted candidates within 5 working days",
      "Four-stage screening: skills, behaviour, references, documents",
      "Salary benchmarking report included with every mandate",
      "90-day free replacement guarantee on every placement",
      "Dedicated account manager as a single point of contact",
    ],
    outcomes: [
      { value: "5 days", label: "average time to shortlist" },
      { value: "92%", label: "offer-to-join rate" },
      { value: "96%", label: "placements passing 90 days" },
    ],
    metaTitle: "Permanent Recruitment Services",
    metaDescription:
      "End-to-end permanent hiring: vetted shortlists in 5 days, four-stage screening, salary benchmarking and a 90-day replacement guarantee.",
  },
  {
    slug: "contract-staffing",
    title: "Contract & Temporary Staffing",
    icon: "clock",
    order: 2,
    shortDesc:
      "Deploy vetted contractors in as little as 48 hours — fully compliant payroll, timesheets and statutory obligations handled by us.",
    longDesc: [
      "Project peaks, maternity cover, seasonal demand or a critical skill gap — sometimes you need capable people fast, without adding permanent headcount. Our contract staffing bench holds thousands of professionals who have already cleared our screening and can be deployed in as little as 48 hours.",
      "We act as the employer of record where required: contracts, payroll, PF, ESI, professional tax, insurance and statutory compliance are all handled by our in-house team, so your finance and legal departments have nothing extra to manage.",
      "Every contractor is supported by a dedicated engagement manager through onboarding, timesheet management and offboarding — and if you decide to convert a contractor to a permanent employee, our contract-to-hire terms make that simple and affordable.",
    ],
    features: [
      "Deployment in as little as 48 hours from approved requirement",
      "Employer-of-record option with full statutory compliance",
      "Automated timesheets and consolidated monthly invoicing",
      "Contract-to-hire conversion terms on every engagement",
      "Backfill guarantee if a contractor leaves mid-assignment",
      "Single monthly invoice across all contractors and locations",
    ],
    outcomes: [
      { value: "48 hrs", label: "fastest deployment" },
      { value: "1,800+", label: "contractors on active assignment" },
      { value: "100%", label: "statutory compliance record" },
    ],
    metaTitle: "Contract & Temporary Staffing",
    metaDescription:
      "Vetted contractors deployed within 48 hours with fully compliant payroll, timesheets and statutory management handled end to end.",
  },
  {
    slug: "executive-search",
    title: "Executive Search",
    icon: "target",
    order: 3,
    shortDesc:
      "Confidential, research-led search for CXO, VP and director-level leaders — mapped against your strategy, not just your org chart.",
    longDesc: [
      "Leadership hires carry the highest stakes and the smallest margin for error. Our executive search practice runs research-led, fully confidential mandates for CXO, VP and director-level roles across our specialist sectors.",
      "Each mandate begins with a leadership brief that captures strategy, culture and the specific inflection point your business faces. Our researchers then map the entire relevant talent landscape — including leaders who aren't looking — and approach them discreetly on your behalf.",
      "Shortlisted leaders complete psychometric profiling, structured competency interviews and thorough 360-degree referencing. We stay engaged through offer negotiation, resignation management and the first six months of onboarding, because a search is only successful when the leader succeeds.",
    ],
    features: [
      "Full talent-landscape mapping of your sector before outreach",
      "Discreet approaches — your brand stays confidential until you choose",
      "Psychometric profiling and 360-degree referencing as standard",
      "Offer negotiation and counter-offer management support",
      "Structured onboarding check-ins for the first 6 months",
      "12-month replacement commitment on retained mandates",
    ],
    outcomes: [
      { value: "40+", label: "leadership placements each year" },
      { value: "6 wks", label: "average search completion" },
      { value: "94%", label: "leaders still in seat at 2 years" },
    ],
    metaTitle: "Executive Search",
    metaDescription:
      "Research-led, confidential executive search for CXO, VP and director roles — with psychometric profiling, 360° referencing and 12-month commitment.",
  },
  {
    slug: "recruitment-process-outsourcing",
    title: "Recruitment Process Outsourcing",
    icon: "layers",
    order: 4,
    shortDesc:
      "Your embedded talent-acquisition team — we run part or all of your hiring engine with your brand, our people and shared dashboards.",
    longDesc: [
      "When you're hiring at scale — a new centre, a rapid growth phase, or simply a volume your internal team can't absorb — recruitment process outsourcing gives you a complete talent-acquisition engine without the fixed cost of building one.",
      "Our RPO teams embed inside your business, working under your employer brand with your tools or ours. We take ownership of agreed stages of the funnel: sourcing, screening, scheduling, offer management, onboarding — or the entire process end to end.",
      "Everything is measured. You get a live dashboard covering time-to-fill, source effectiveness, funnel conversion, diversity mix and cost-per-hire, reviewed with you every fortnight so the engine keeps getting faster and cheaper.",
    ],
    features: [
      "Embedded recruiters working under your employer brand",
      "Flexible scope — single stage, single function, or end to end",
      "Live dashboard: time-to-fill, conversion, cost-per-hire, diversity",
      "Scales up or down with 30 days' notice",
      "Employer-brand and candidate-experience playbooks included",
      "Fortnightly performance reviews with agreed SLAs",
    ],
    outcomes: [
      { value: "38%", label: "average reduction in cost-per-hire" },
      { value: "2×", label: "faster time-to-fill within 2 quarters" },
      { value: "3,000+", label: "hires delivered through RPO" },
    ],
    metaTitle: "Recruitment Process Outsourcing (RPO)",
    metaDescription:
      "Embedded RPO teams that run your hiring engine under your brand — measured on time-to-fill, conversion, diversity and cost-per-hire.",
  },
  {
    slug: "payroll-compliance",
    title: "Payroll & Compliance",
    icon: "shield-check",
    order: 5,
    shortDesc:
      "Accurate, on-time payroll and airtight statutory compliance for your contingent and outsourced workforce — audited and error-free.",
    longDesc: [
      "Managing a contingent workforce means managing payroll cycles, PF, ESI, professional tax, labour-law filings, gratuity and insurance — across states with different rules. Our payroll and compliance practice takes the entire burden off your desk.",
      "Salaries are processed on a guaranteed calendar with full payslip transparency for every worker. Statutory deposits and filings are completed ahead of deadlines and documented in a compliance calendar you can audit at any time.",
      "Our in-house compliance team tracks regulatory changes across every state you operate in, adjusts processes proactively, and represents you during inspections — with a zero-penalty track record we're proud of.",
    ],
    features: [
      "Guaranteed payroll calendar with digital payslips for every worker",
      "PF, ESI, PT, LWF, gratuity and insurance fully administered",
      "State-wise labour-law compliance tracked by an in-house team",
      "Audit-ready documentation and monthly compliance certificates",
      "Inspection representation and liaison handled for you",
      "Zero-penalty record across nine years of operation",
    ],
    outcomes: [
      { value: "99.98%", label: "payroll accuracy rate" },
      { value: "0", label: "compliance penalties, ever" },
      { value: "12k+", label: "workers paid every month" },
    ],
    metaTitle: "Payroll & Compliance Management",
    metaDescription:
      "On-time payroll and airtight statutory compliance for contingent workforces — PF, ESI, PT and labour law handled with a zero-penalty record.",
  },
  {
    slug: "hr-advisory",
    title: "HR Advisory & Talent Consulting",
    icon: "users",
    order: 6,
    shortDesc:
      "Salary benchmarking, org design, competency frameworks and hiring-process audits — data your talent decisions can stand on.",
    longDesc: [
      "The best hiring outcomes start before a role is ever advertised. Our advisory practice helps leadership teams make talent decisions backed by real market data rather than instinct.",
      "Engagements range from rapid salary benchmarking for a single critical role to full organisation design: competency frameworks, levelling structures, interview process audits, employer-value-proposition research and attrition diagnostics.",
      "Every engagement ends with an actionable playbook — not a slide deck that gathers dust. And because we place people in these markets every day, our data reflects what candidates are actually accepting, not what surveys said last year.",
    ],
    features: [
      "Salary benchmarking from live offer data, refreshed monthly",
      "Organisation design and levelling frameworks",
      "Interview process audits with structured scorecard design",
      "Attrition diagnostics and retention playbooks",
      "Employer-value-proposition research with candidate panels",
      "Practical playbooks, not theoretical decks",
    ],
    outcomes: [
      { value: "120+", label: "advisory engagements delivered" },
      { value: "18%", label: "average attrition reduction for clients" },
      { value: "30 days", label: "typical engagement length" },
    ],
    metaTitle: "HR Advisory & Talent Consulting",
    metaDescription:
      "Salary benchmarking from live offer data, org design, interview audits and attrition diagnostics — talent decisions backed by evidence.",
  },
];
