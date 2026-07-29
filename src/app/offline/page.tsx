import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Offline" };
export const dynamic = "force-static";

/**
 * Offline fallback, precached by the service worker. Deliberately
 * self-contained (inline styles, inline SVG) so it renders perfectly even
 * when no stylesheet is cached.
 */
export default function OfflinePage() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "4rem 1.5rem",
        textAlign: "center",
        background: "#f6f7fb",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <svg viewBox="0 0 34 34" width="56" height="56" aria-hidden="true">
        <defs>
          <linearGradient id="ot" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1e3a78" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="32" height="32" rx="9" fill="url(#ot)" />
        <rect x="8" y="19" width="4" height="7" rx="2" fill="#ffffff" opacity="0.55" />
        <rect x="15" y="14.5" width="4" height="11.5" rx="2" fill="#ffffff" opacity="0.8" />
        <rect x="22" y="10" width="4" height="16" rx="2" fill="#ffffff" />
        <circle cx="24" cy="6.4" r="2.4" fill="#daa83a" />
      </svg>
      <h1 style={{ color: "#16233d", fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
        You&rsquo;re offline
      </h1>
      <p style={{ color: "#5a6478", maxWidth: "26rem", lineHeight: 1.65, margin: 0 }}>
        It looks like the connection dropped. Check your network and try again — previously visited
        pages may still work.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "0.75rem",
          display: "inline-block",
          background: "#c98a16",
          color: "#16233d",
          fontWeight: 600,
          padding: "0.6rem 1.2rem",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Try again
      </Link>
    </div>
  );
}
