import { footerGroups, headerNav, homePlaceholder, legalNav, siteSettings } from "@/data/seed/site";
import type {
  FooterGroupContent,
  HomePlaceholderContent,
  NavItemContent,
  SiteSettingsContent,
} from "@/types/content";

/**
 * Content access layer — the ONLY module components may read content through.
 *
 * Phase 1: backed by the typed seed data.
 * Phase 2: these functions switch to Prisma queries (with React `cache()`),
 * without any component changing. Keep every accessor async for that reason.
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

export async function getHomePlaceholder(): Promise<HomePlaceholderContent> {
  return homePlaceholder;
}

/** Interpolates the copyright template from SiteSetting. */
export function formatCopyright(settings: SiteSettingsContent): string {
  return settings.copyright
    .replaceAll("{year}", String(new Date().getFullYear()))
    .replaceAll("{brand}", settings.brandName);
}
