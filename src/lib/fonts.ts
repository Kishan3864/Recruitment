import { Poppins } from "next/font/google";

/**
 * Poppins across the whole site (client request): regular weights for text,
 * semibold/bold for display. Self-hosted via next/font, `display: swap` +
 * size-adjusted fallback prevents font-driven layout shift.
 */
export const fontText = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const fontDisplay = Poppins({
  variable: "--font-poppins-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
