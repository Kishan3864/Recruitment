import type { Metadata, Viewport } from "next";

import { getSiteSettings } from "@/lib/content/site";
import { fontDisplay, fontText } from "@/lib/fonts";

import "./globals.css";

/**
 * Slim root layout: document shell + fonts + metadata only.
 * Marketing chrome (header/footer/Lenis/consent/PWA) lives in (site)/layout;
 * the admin panel under /admin brings its own shell.
 */
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontText.variable} ${fontDisplay.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
