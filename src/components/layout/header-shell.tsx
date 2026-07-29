"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { Magnetic } from "@/components/shared/magnetic";
import { Button } from "@/components/ui/button";
import { EASE_SOFT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { NavItemContent, SiteSettingsContent } from "@/types/content";

/**
 * "Junction Rail" header — two floating white islands on the open page:
 * a brand plate (left) and a nav rail (right) whose amber CTA is fused on as
 * the rail's end-cap; a dotted connector bridges the gap between them, with
 * a node parked at its midpoint. On scroll (hysteresis 24/8px) the islands
 * dissolve into ONE floating capsule — implemented as a crossfade + height
 * tween (no FLIP layout animation), so nothing can shimmer or mis-measure.
 *
 * Geometry contract: the flow wrapper is a constant 88px (zero CLS); the
 * condensed capsule sits at top 8px and is 56px tall, so its bottom edge
 * lands at exactly 64px — pinned sections keep their sticky top-16 offset.
 */
export function HeaderShell({
  settings,
  nav,
}: {
  settings: SiteSettingsContent;
  nav: NavItemContent[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  // Page-progress node: rides the bridge from start (top of page) to end
  // (bottom). Scroll-linked state, so it also tracks under reduced motion.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const nodeLeft = useTransform(progress, (v) => `${v * 100}%`);
  const trailClip = useTransform(progress, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 8 : y > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Entrance beat: islands and their contents animate; space is reserved (no CLS). */
  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.32, delay, ease: EASE_SOFT },
        };

  /* Island surface at rest → dissolves when the capsule takes over. */
  const island = (extra?: string) =>
    cn(
      "ease-soft shadow-island flex h-full items-center border border-brand-100 bg-brand-50 transition-all duration-300",
      scrolled && "border-transparent bg-transparent shadow-none",
      extra
    );

  return (
    <header className="pointer-events-none sticky top-0 z-40">
      <div className="h-22">
        <Container className="h-full">
          {/* Capsule parent: invisible at rest, becomes the fused bar on scroll */}
          <div
            className={cn(
              "pointer-events-auto flex items-center justify-between gap-3 border transition-all duration-300 ease-soft",
              scrolled
                ? "mt-2 h-14 rounded-md border-brand-100 bg-brand-50/90 px-2 shadow-island backdrop-blur-md"
                : "mt-3 h-16 border-transparent"
            )}
          >
            {/* Brand island */}
            <motion.div {...enter(0)} className="h-full">
              <div className={island("rounded-md px-4")}>
                <Link
                  href="/"
                  aria-label={settings.brandName}
                  className="block shrink-0 transition-[rotate,translate] duration-200 outline-none focus-visible:rounded-xs focus-visible:ring-2 focus-visible:ring-ring/60 motion-safe:hover:-translate-y-px motion-safe:hover:[rotate:-1.5deg]"
                >
                  <BrandLogo name={settings.brandName} />
                </Link>
              </div>
            </motion.div>

            {/* Bridge: dotted connector spanning the gap in BOTH states — the
                amber node rides it start→end with total page scroll progress */}
            {/* Visible from sm up — on tablet it spans brand → mobile island,
                so the signature (and the progress node) never disappears */}
            <div aria-hidden="true" className="hidden h-full flex-1 items-center px-4 sm:flex">
              <div className="relative flex w-full items-center">
                <motion.div
                  className="h-0.5 w-full bg-[radial-gradient(circle,var(--color-neutral-300)_1px,transparent_1.4px)] bg-[length:8px_2px] bg-repeat-x"
                  initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0 0 0)" }}
                  transition={{ duration: 0.6, delay: 0.26, ease: EASE_SOFT }}
                />
                {/* traversed dots light up blue behind the traveling node */}
                <motion.div
                  style={{ clipPath: trailClip }}
                  className="absolute inset-0 h-0.5 bg-[radial-gradient(circle,var(--color-brand-400)_1px,transparent_1.4px)] bg-[length:8px_2px] bg-repeat-x"
                />
                <motion.span
                  style={{ left: nodeLeft }}
                  className="absolute top-1/2 size-2.5 -translate-1/2 rounded-full bg-accent-cream shadow-[0_0_0_2px_#ffffff,0_0_10px_1px_var(--color-accent-cream)]"
                  {...(reduceMotion
                    ? {}
                    : {
                        initial: { scale: 0 },
                        animate: { scale: 1 },
                        transition: { duration: 0.32, delay: 0.6, ease: EASE_SOFT },
                      })}
                />
              </div>
            </div>

            {/* Nav rail island: pill tabs + fused amber CTA end-cap */}
            <div className={island("hidden gap-1 rounded-md py-2 pr-2 pl-2.5 lg:flex")}>
              <nav
                aria-label={settings.ui.mainNavLabel}
                className="flex items-center gap-0.5 xl:gap-1"
              >
                {nav.map((item, i) => (
                  <motion.div key={item.href} {...enter(0.16 + i * 0.04)}>
                    <NavLink href={item.href} label={item.label} index={i} />
                  </motion.div>
                ))}
              </nav>
              <span aria-hidden="true" className="mx-1.5 h-6 w-px shrink-0 bg-brand-100" />
              <motion.div {...enter(0.48)}>
                <Magnetic strength={5}>
                  <Button
                    asChild
                    className="sheen relative h-10 overflow-hidden rounded-sm bg-cta px-4 text-cta-foreground hover:bg-cta/90"
                  >
                    <Link href={settings.ctaEmployers.href}>
                      {/* white panel retracts to reveal the amber fill (terminus wipe) */}
                      {!reduceMotion && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 origin-right bg-brand-50"
                          initial={{ scaleX: 1 }}
                          animate={{ scaleX: 0 }}
                          transition={{ duration: 0.32, delay: 0.56, ease: EASE_SOFT }}
                        />
                      )}
                      <motion.span
                        className="relative z-10 inline-flex items-center gap-1.5"
                        {...(reduceMotion
                          ? {}
                          : {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              transition: { duration: 0.22, delay: 0.68 },
                            })}
                      >
                        {settings.ctaEmployers.label}
                        <ArrowRight
                          className="size-4 transition-transform group-hover/button:translate-x-0.5 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      </motion.span>
                    </Link>
                  </Button>
                </Magnetic>
              </motion.div>
            </div>

            {/* Mobile island: compact CTA + junction-map trigger */}
            <motion.div {...enter(0.15)} className="h-full lg:hidden">
              <div className={island("gap-2 rounded-md py-2 pr-2 pl-2.5")}>
                <Button
                  asChild
                  size="sm"
                  className="hidden bg-cta text-cta-foreground hover:bg-cta/90 sm:inline-flex"
                >
                  <Link href={settings.ctaEmployers.href}>{settings.ctaEmployers.label}</Link>
                </Button>
                <MobileNav
                  brandName={settings.brandName}
                  items={nav}
                  cta={settings.ctaEmployers}
                  openLabel={settings.ui.openMenu}
                  closeLabel={settings.ui.closeMenu}
                  navLabel={settings.ui.mainNavLabel}
                  email={settings.email}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </header>
  );
}
