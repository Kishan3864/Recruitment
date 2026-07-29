import type { Metadata, Viewport } from "next";

import { CookieConsent } from "@/components/consent/cookie-consent";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { PwaSetup } from "@/components/pwa/pwa-setup";
import { getSiteSettings } from "@/lib/content/site";
import { fontDisplay, fontText } from "@/lib/fonts";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f7fb",
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: {
      default: settings.seo.defaultTitle,
      template: settings.seo.titleTemplate,
    },
    description: settings.seo.defaultDescription,
    applicationName: settings.brandName,
    appleWebApp: {
      capable: true,
      title: settings.brandName,
      statusBarStyle: "default",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${fontText.variable} ${fontDisplay.variable}`}>
      <body className="antialiased">
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
      </body>
    </html>
  );
}
