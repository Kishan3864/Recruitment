import type { Metadata, Viewport } from "next";

import { AdminPwaSetup } from "@/components/admin/admin-pwa-setup";

/**
 * Segment layout for everything under /admin (login + panel): links the
 * admin-specific web-app manifest so the panel installs as its own "Admin"
 * app (start_url /admin, junction-node icon), separate from the public site.
 */
/* Native-app viewport: status bar merges with the white topbar and pinch
 * zoom is off — the panel scales type fluidly instead, like a real app. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
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
