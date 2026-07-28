import localFont from "next/font/local";

/**
 * Self-hosted Fontshare faces (src/fonts — zero external requests at runtime):
 * - Satoshi 400/500/700 — body + UI text
 * - Cabinet Grotesk 500/700 — display, headings
 * `display: swap` + next/font's size-adjusted automatic fallback keep CLS at 0.
 * Note: CSS `font-weight: 600` (font-semibold) resolves to the 700 file.
 */
export const fontText = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "../fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/satoshi-700.woff2", weight: "700", style: "normal" },
  ],
});

export const fontDisplay = localFont({
  variable: "--font-display-face",
  display: "swap",
  src: [
    { path: "../fonts/cabinet-grotesk-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cabinet-grotesk-700.woff2", weight: "700", style: "normal" },
  ],
});
