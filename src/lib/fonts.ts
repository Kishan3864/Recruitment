import { Inter, Sora } from "next/font/google";

/**
 * Self-hosted via next/font (downloaded at build time, served from /_next/static).
 * `display: swap` + automatic size-adjusted fallbacks prevent font-driven layout shift.
 */
export const fontText = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const fontDisplay = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
