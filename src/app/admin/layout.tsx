import type { Metadata, Viewport } from "next";

import { AdminPwaSetup } from "@/components/admin/admin-pwa-setup";

/**
 * Segment layout for everything under /admin (login + panel): links the
 * admin-specific web-app manifest so the panel installs as its own "Admin"
 * app (start_url /admin, junction-node icon), separate from the public site.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eff6ff",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  applicationName: "Recruitment Admin",
  manifest: "/admin-manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Admin",
    statusBarStyle: "default",
  },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <AdminPwaSetup />
    </>
  );
}
