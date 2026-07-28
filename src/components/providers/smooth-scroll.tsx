"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Global "slippery" smooth scrolling via Lenis.
 * - Skipped entirely under prefers-reduced-motion (native scroll remains),
 *   and reacts live if the OS preference flips mid-session.
 * - Lenis animates the native window scroll, so Framer Motion's useScroll /
 *   whileInView keep working unchanged.
 * - The RAF loop lives here for now; when GSAP ScrollTrigger lands (pinned
 *   sections) it takes over via gsap.ticker + lenis.on("scroll", update).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let rafId = 0;

    const start = () => {
      if (lenis) return;
      // Long exponential ease-out tail = the "slippery" coast after each
      // wheel input. Raise duration for more glide, lower for tighter feel.
      lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const stop = () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = null;
    };

    const sync = () => (media.matches ? stop() : start());
    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return <>{children}</>;
}
