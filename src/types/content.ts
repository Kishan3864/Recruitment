/**
 * Content-layer types.
 *
 * In Phase 2 these become the return shapes of the Prisma-backed content
 * access layer (src/lib/content/*). Components depend on these types only —
 * never on the storage mechanism.
 */

export type NavLocation = "header" | "footer" | "legal";

export interface NavItemContent {
  label: string;
  href: string;
  order: number;
  location: NavLocation;
  children?: NavItemContent[];
}

export interface FooterGroupContent {
  heading: string;
  items: NavItemContent[];
}

export interface SocialLinkContent {
  /** lucide icon name, resolved via the icon registry */
  icon: string;
  label: string;
  href: string;
}

export interface SiteSettingsContent {
  brandName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: SocialLinkContent[];
  /** Global CTA labels (header / mobile bar) */
  ctaEmployers: { label: string; href: string };
  ctaCandidates: { label: string; href: string };
  /** Template, `{year}` and `{brand}` are interpolated */
  copyright: string;
  /** UI strings that must remain editable without code changes */
  ui: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    mainNavLabel: string;
    footerNavLabel: string;
    legalNavLabel: string;
    socialNavLabel: string;
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
  };
}

export interface HomePlaceholderContent {
  badge: string;
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  note: string;
}
