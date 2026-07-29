import type { NextConfig } from "next";

/**
 * Baseline security headers (Phase 1).
 * A full nonce-based CSP is added in Phase 9 (hardening) via middleware,
 * because nonces require per-request generation.
 * HSTS is also set at the Nginx layer in production; harmless to double up.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

/**
 * Redirects will be data-driven (Phase 7): a Redirect table read at build
 * time populates this array for 301s from legacy paths.
 */
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // The service worker must never be cached stale.
      {
        source: "/sw.js",
        headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
