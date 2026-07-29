import { getSiteSettings } from "@/lib/content/site";

/**
 * Site web-app manifest. A route handler (not the manifest.ts file
 * convention) so the /admin subtree can link its OWN manifest via metadata —
 * the file convention would inject this one on every page and the admin app
 * could never install separately.
 */
export async function GET() {
  const settings = await getSiteSettings();

  const manifest = {
    id: "/",
    name: settings.brandName,
    short_name: settings.brandName,
    description: settings.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f6f7fb",
    theme_color: "#f6f7fb",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
