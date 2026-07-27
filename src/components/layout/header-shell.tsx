"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItemContent, SiteSettingsContent } from "@/types/content";

/**
 * Sticky header with smooth scroll behaviour: slides down on load, then
 * shrinks + gains shadow once the page scrolls. Pure CSS transitions.
 */
export function HeaderShell({
  settings,
  nav,
}: {
  settings: SiteSettingsContent;
  nav: NavItemContent[];
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-300 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top",
        scrolled
          ? "border-border bg-background/95 shadow-md backdrop-blur-xl"
          : "border-transparent bg-background/70 backdrop-blur-md"
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-4 transition-all duration-300",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Link href="/" aria-label={settings.brandName} className="shrink-0">
          <BrandLogo name={settings.brandName} />
        </Link>

        <nav aria-label={settings.ui.mainNavLabel} className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Button
            asChild
            className="hidden bg-cta text-cta-foreground hover:bg-cta/90 sm:inline-flex"
          >
            <Link href={settings.ctaEmployers.href}>{settings.ctaEmployers.label}</Link>
          </Button>
          <MobileNav
            brandName={settings.brandName}
            items={nav}
            cta={settings.ctaEmployers}
            openLabel={settings.ui.openMenu}
            navLabel={settings.ui.mainNavLabel}
          />
        </div>
      </Container>
    </header>
  );
}
