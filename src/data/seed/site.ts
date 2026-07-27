import type { FooterGroupContent, NavItemContent, SiteSettingsContent } from "@/types/content";

/**
 * Site-wide content. Consumed only through src/lib/content/site.ts.
 * Later phases move this into the SiteSetting / NavItem tables — the shapes
 * are already database-ready.
 */

export const siteSettings: SiteSettingsContent = {
  brandName: "Recruitment",
  tagline: "The right people, verified and ready.",
  description:
    "Recruitment is a specialist recruitment partner connecting employers with rigorously vetted professionals across technology, finance, healthcare, manufacturing and more — with a process built on transparency and speed.",
  phone: "+91 22 4890 2210",
  email: "hello@recruitment.in",
  address: "Level 8, One Horizon Center, Bandra Kurla Complex, Mumbai 400051",
  socialLinks: [
    { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com" },
    { icon: "twitter", label: "X (Twitter)", href: "https://x.com" },
    { icon: "instagram", label: "Instagram", href: "https://www.instagram.com" },
    { icon: "facebook", label: "Facebook", href: "https://www.facebook.com" },
  ],
  ctaEmployers: { label: "Contact Us", href: "/contact" },
  ctaCandidates: { label: "Browse Jobs", href: "/jobs" },
  copyright: "© {year} {brand}. All rights reserved.",
  ui: {
    skipToContent: "Skip to main content",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    mainNavLabel: "Main navigation",
    footerNavLabel: "Footer navigation",
    legalNavLabel: "Legal",
    socialNavLabel: "Social media",
    breadcrumbLabel: "Breadcrumb",
    backToTop: "Back to top",
  },
  seo: {
    titleTemplate: "%s | Recruitment",
    defaultTitle: "Recruitment — Hiring & Staffing Made Simple",
    defaultDescription:
      "Specialist recruitment agency placing verified professionals in technology, finance, healthcare, manufacturing and operations roles across India. Trusted by 300+ employers.",
  },
};

export const headerNav: NavItemContent[] = [
  { label: "Services", href: "/services", order: 1, location: "header" },
  { label: "Jobs", href: "/jobs", order: 2, location: "header" },
  { label: "Candidates", href: "/for-candidates", order: 3, location: "header" },
  { label: "About", href: "/about", order: 4, location: "header" },
  { label: "Blog", href: "/blog", order: 5, location: "header" },
  { label: "FAQ", href: "/faq", order: 6, location: "header" },
  { label: "Contact", href: "/contact", order: 7, location: "header" },
];

export const footerGroups: FooterGroupContent[] = [
  {
    heading: "Company",
    items: [
      { label: "About us", href: "/about", order: 1, location: "footer" },
      { label: "Case studies", href: "/case-studies", order: 2, location: "footer" },
      { label: "Blog & insights", href: "/blog", order: 3, location: "footer" },
      { label: "FAQ", href: "/faq", order: 4, location: "footer" },
      { label: "Contact", href: "/contact", order: 5, location: "footer" },
    ],
  },
  {
    heading: "Services",
    items: [
      { label: "All services", href: "/services", order: 1, location: "footer" },
      {
        label: "Permanent recruitment",
        href: "/services/permanent-recruitment",
        order: 2,
        location: "footer",
      },
      {
        label: "Contract staffing",
        href: "/services/contract-staffing",
        order: 3,
        location: "footer",
      },
      {
        label: "Executive search",
        href: "/services/executive-search",
        order: 4,
        location: "footer",
      },
    ],
  },
  {
    heading: "For Candidates",
    items: [
      { label: "Browse jobs", href: "/jobs", order: 1, location: "footer" },
      { label: "How we place you", href: "/for-candidates", order: 2, location: "footer" },
      { label: "Career advice", href: "/blog", order: 3, location: "footer" },
      {
        label: "Submit your resume",
        href: "/for-candidates#register",
        order: 4,
        location: "footer",
      },
    ],
  },
];

export const legalNav: NavItemContent[] = [
  { label: "Privacy Policy", href: "/privacy-policy", order: 1, location: "legal" },
  { label: "Terms of Service", href: "/terms", order: 2, location: "legal" },
  { label: "Cookie Policy", href: "/cookie-policy", order: 3, location: "legal" },
];
