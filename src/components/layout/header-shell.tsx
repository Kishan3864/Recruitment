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
 * "Signal Band" header — the site's deep-ink punctuation bar.
 * - The nav sits on a dotted "wire" that draws itself on load and doubles as
 *   a scroll-progress constellation (bright dots light up as you read).
 * - The active route's node badge is docked on the wire and travels along it
 *   between pages (layoutId FLIP in nav-link).
 * - The amber CTA is the wire's terminus: ink fill-wipe entrance, the one
 *   magnetic element in the header.
 * - Scroll state uses hysteresis (engage >24px, release <8px) so the band
 *   can't flap while Lenis eases; condensed height is exactly 64px, keeping
 *   the sticky top-16 contract of pinned sections intact.
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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const progressClip = useTransform(progress, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 8 : y > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Entrance beat: children animate, the bar itself paints at frame 0 (no CLS). */
  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.32, delay, ease: EASE_SOFT },
        };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-brand-950 text-white transition-all duration-300",
        scrolled
          ? "border-b border-cta-500/35 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-brand-950/90"
          : "border-b border-transparent"
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-6 transition-all duration-300",
          scrolled ? "h-16" : "h-19"
        )}
      >
        <motion.div {...enter(0)}>
          <Link
            href="/"
            aria-label={settings.brandName}
            className="block shrink-0 transition-[rotate,translate] duration-200 outline-none focus-visible:rounded-xs focus-visible:ring-2 focus-visible:ring-white/70 motion-safe:hover:-translate-y-px motion-safe:hover:[rotate:-1.5deg]"
          >
            <BrandLogo name={settings.brandName} dark />
          </Link>
        </motion.div>

        {/* Right cluster: nav + CTA riding the wire */}
        <div className="relative hidden h-full items-center gap-4 lg:flex xl:gap-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-[14px] left-0"
          >
            {/* base wire — draws left→right on load */}
            <motion.div
              className="h-0.5 w-full bg-[radial-gradient(circle,rgb(255_255_255/0.18)_1px,transparent_1.4px)] bg-[length:8px_2px] bg-repeat-x"
              initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.6, delay: 0.26, ease: EASE_SOFT }}
            />
            {/* scroll-progress constellation — brighter dots light up as you read */}
            {!reduceMotion && (
              <motion.div
                style={{ clipPath: progressClip }}
                className="absolute inset-0 h-0.5 bg-[radial-gradient(circle,rgb(255_255_255/0.5)_1px,transparent_1.4px)] bg-[length:8px_2px] bg-repeat-x"
              />
            )}
          </div>

          <nav
            aria-label={settings.ui.mainNavLabel}
            className="flex h-full items-center gap-4 xl:gap-6"
          >
            {nav.map((item, i) => (
              <motion.div key={item.href} className="h-full" {...enter(0.2 + i * 0.04)}>
                <NavLink href={item.href} label={item.label} index={i} />
              </motion.div>
            ))}
          </nav>

          <motion.div {...enter(0.48)}>
            <Magnetic strength={5}>
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden bg-cta text-cta-foreground hover:bg-cta/90"
              >
                <Link href={settings.ctaEmployers.href}>
                  {/* ink panel retracts to reveal the amber fill (terminus wipe) */}
                  {!reduceMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 origin-right bg-brand-950"
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
                          transition: { duration: 0.22, delay: 0.7 },
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

        {/* Mobile cluster */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <motion.div {...enter(0.15)} className="hidden sm:block">
            <Button asChild size="sm" className="bg-cta text-cta-foreground hover:bg-cta/90">
              <Link href={settings.ctaEmployers.href}>{settings.ctaEmployers.label}</Link>
            </Button>
          </motion.div>
          <motion.div {...enter(0.25)}>
            <MobileNav
              brandName={settings.brandName}
              items={nav}
              cta={settings.ctaEmployers}
              openLabel={settings.ui.openMenu}
              closeLabel={settings.ui.closeMenu}
              navLabel={settings.ui.mainNavLabel}
              email={settings.email}
            />
          </motion.div>
        </div>
      </Container>
    </header>
  );
}
