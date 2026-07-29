import { CookieConsent } from "@/components/consent/cookie-consent";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { PwaSetup } from "@/components/pwa/pwa-setup";
import { getSiteSettings } from "@/lib/content/site";

/** Marketing-site chrome: header, footer, smooth scroll, consent, PWA. */
export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <>
      <SkipLink label={settings.ui.skipToContent} />
      <SmoothScroll>
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </SmoothScroll>
      <CookieConsent />
      <PwaSetup brandName={settings.brandName} />
    </>
  );
}
