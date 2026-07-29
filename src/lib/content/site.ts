import { asc, eq } from "drizzle-orm";

import { safeQuery, schema } from "@/db/client";
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
  const row = await safeQuery(async (db) => {
    const [found] = await db.select().from(schema.settings).where(eq(schema.settings.key, "site"));
    return found ?? null;
  });
  if (!row) return siteSettings;
  // Deep-merge over the seed so newly added keys always have values.
  const stored = row.value as Partial<SiteSettingsContent>;
  return {
    ...siteSettings,
    ...stored,
    ui: { ...siteSettings.ui, ...(stored.ui ?? {}) },
    seo: { ...siteSettings.seo, ...(stored.seo ?? {}) },
    ctaEmployers: { ...siteSettings.ctaEmployers, ...(stored.ctaEmployers ?? {}) },
    ctaCandidates: { ...siteSettings.ctaCandidates, ...(stored.ctaCandidates ?? {}) },
    socialLinks: stored.socialLinks ?? siteSettings.socialLinks,
  };
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
  const rows = await safeQuery((db) =>
    db.select().from(schema.clientLogos).orderBy(asc(schema.clientLogos.sort))
  );
  return rows ? rows.map((r) => ({ name: r.name, short: r.short })) : clientLogos;
}

/** Interpolates the copyright template from SiteSetting. */
export function formatCopyright(settings: SiteSettingsContent): string {
  return settings.copyright
    .replaceAll("{year}", String(new Date().getFullYear()))
    .replaceAll("{brand}", settings.brandName);
}
