import { HeaderShell } from "@/components/layout/header-shell";
import { getHeaderNav, getSiteSettings } from "@/lib/content/site";

/** Server wrapper: fetches content, renders the animated client header. */
export async function SiteHeader() {
  const [settings, nav] = await Promise.all([getSiteSettings(), getHeaderNav()]);
  return <HeaderShell settings={settings} nav={nav} />;
}
