import { clientLogos } from "@/data/seed/logos";
import { footerGroups, headerNav, legalNav, siteSettings } from "@/data/seed/site";
import type {
  ClientLogoContent,
  FooterGroupContent,
  NavItemContent,
  SiteSettingsContent,
} from "@/types/content";

/**
 * Content access layer — the ONLY modules components may read content through.
 * Backed by typed seed data today; swaps to Prisma later without any
 * component changing (all accessors are async for that reason).
 */

export async function getSiteSettings(): Promise<SiteSettingsContent> {
  return siteSettings;
}

export async function getHeaderNav(): Promise<NavItemContent[]> {
  return [...headerNav].sort((a, b) => a.order - b.order);
}

export async function getFooterGroups(): Promise<FooterGroupContent[]> {
  return footerGroups;
}

export async function getLegalNav(): Promise<NavItemContent[]> {
  return [...legalNav].sort((a, b) => a.order - b.order);
}

export async function getClientLogos(): Promise<ClientLogoContent[]> {
  return clientLogos;
}

/** Interpolates the copyright template from SiteSetting. */
export function formatCopyright(settings: SiteSettingsContent): string {
  return settings.copyright
    .replaceAll("{year}", String(new Date().getFullYear()))
    .replaceAll("{brand}", settings.brandName);
}
