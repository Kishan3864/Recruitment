"use client";

/**
 * Root error boundary — replaces the entire document, so it is fully
 * self-contained (inline styles, no imports from the app tree).
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          background: "#f6f7fb",
          color: "#16233d",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <p style={{ fontSize: "3.5rem", fontWeight: 700, color: "#bfdbfe", margin: 0 }}>500</p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Something went wrong</h1>
        <p style={{ color: "#5a6478", maxWidth: "26rem", lineHeight: 1.65, margin: 0 }}>
          A temporary glitch stopped the site from loading. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "0.75rem",
            background: "#c98a16",
            color: "#16233d",
            fontWeight: 600,
            padding: "0.6rem 1.4rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
