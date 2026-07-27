import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { getHeaderNav, getSiteSettings } from "@/lib/content/site";

/** Sticky site header. Server Component — nav and labels come from the content layer. */
export async function SiteHeader() {
  const [settings, nav] = await Promise.all([getSiteSettings(), getHeaderNav()]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={settings.brandName} className="shrink-0">
          <BrandLogo name={settings.brandName} />
        </Link>

        <nav aria-label={settings.ui.mainNavLabel} className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle label={settings.ui.toggleTheme} />
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
