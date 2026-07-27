import type {
  FooterGroupContent,
  HomePlaceholderContent,
  NavItemContent,
  SiteSettingsContent,
} from "@/types/content";

/**
 * Placeholder site content for Phase 1.
 *
 * From Phase 2 onward this file seeds the SiteSetting / NavItem tables and the
 * content layer reads from the database instead. All copy here is believable
 * placeholder text intended to be replaced in the admin panel — nothing is
 * referenced directly by components.
 */

export const siteSettings: SiteSettingsContent = {
  brandName: "Northbridge Talent",
  tagline: "The right people, verified and ready.",
  description:
    "Northbridge Talent is a specialist recruitment partner connecting employers with rigorously vetted professionals across technology, finance, healthcare and operations.",
  phone: "+44 20 7946 0810",
  email: "hello@northbridgetalent.example",
  address: "14 Draymarket Lane, London EC2A 4PX, United Kingdom",
  socialLinks: [
    { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com" },
    { icon: "twitter", label: "X (Twitter)", href: "https://x.com" },
    { icon: "facebook", label: "Facebook", href: "https://www.facebook.com" },
  ],
  ctaEmployers: { label: "Hire Talent", href: "/for-employers" },
  ctaCandidates: { label: "Find a Job", href: "/jobs" },
  copyright: "© {year} {brand}. All rights reserved.",
  ui: {
    skipToContent: "Skip to main content",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    toggleTheme: "Toggle color theme",
    mainNavLabel: "Main navigation",
    footerNavLabel: "Footer navigation",
    legalNavLabel: "Legal",
    socialNavLabel: "Social media",
  },
  seo: {
    titleTemplate: "%s | Northbridge Talent",
    defaultTitle: "Northbridge Talent — Specialist Recruitment & Staffing",
    defaultDescription:
      "Specialist recruitment agency placing verified professionals in technology, finance, healthcare and operations roles. Trusted by employers, championed by candidates.",
  },
};

export const headerNav: NavItemContent[] = [
  { label: "Services", href: "/services", order: 1, location: "header" },
  { label: "Industries", href: "/industries", order: 2, location: "header" },
  { label: "Jobs", href: "/jobs", order: 3, location: "header" },
  { label: "For Employers", href: "/for-employers", order: 4, location: "header" },
  { label: "For Candidates", href: "/for-candidates", order: 5, location: "header" },
  { label: "About", href: "/about", order: 6, location: "header" },
  { label: "Contact", href: "/contact", order: 7, location: "header" },
];

export const footerGroups: FooterGroupContent[] = [
  {
    heading: "Company",
    items: [
      { label: "About us", href: "/about", order: 1, location: "footer" },
      { label: "Case studies", href: "/case-studies", order: 2, location: "footer" },
      { label: "Blog", href: "/blog", order: 3, location: "footer" },
      { label: "Contact", href: "/contact", order: 4, location: "footer" },
    ],
  },
  {
    heading: "For Employers",
    items: [
      { label: "Hiring solutions", href: "/for-employers", order: 1, location: "footer" },
      { label: "Our services", href: "/services", order: 2, location: "footer" },
      { label: "Industries we serve", href: "/industries", order: 3, location: "footer" },
    ],
  },
  {
    heading: "For Candidates",
    items: [
      { label: "Browse jobs", href: "/jobs", order: 1, location: "footer" },
      { label: "How we place you", href: "/for-candidates", order: 2, location: "footer" },
      { label: "FAQ", href: "/faq", order: 3, location: "footer" },
    ],
  },
];

export const legalNav: NavItemContent[] = [
  { label: "Privacy Policy", href: "/privacy-policy", order: 1, location: "legal" },
  { label: "Terms of Service", href: "/terms", order: 2, location: "legal" },
  { label: "Cookie Policy", href: "/cookie-policy", order: 3, location: "legal" },
];

export const homePlaceholder: HomePlaceholderContent = {
  badge: "Specialist recruitment, done properly",
  heading: "Hiring that moves careers and companies forward",
  subheading:
    "We connect employers with rigorously vetted professionals — and candidates with roles that actually fit. Transparent process, verified references, no noise.",
  primaryCta: { label: "Hire Talent", href: "/for-employers" },
  secondaryCta: { label: "Browse Open Roles", href: "/jobs" },
  note: "Full site sections arrive in Phase 3 — this page previews the design system.",
};
