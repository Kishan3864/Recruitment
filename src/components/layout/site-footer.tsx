import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { ContentIcon } from "@/components/shared/icon";
import { formatCopyright, getFooterGroups, getLegalNav, getSiteSettings } from "@/lib/content/site";

/** Site footer. Server Component — all groups, links and labels from the content layer. */
export async function SiteFooter() {
  const [settings, groups, legal] = await Promise.all([
    getSiteSettings(),
    getFooterGroups(),
    getLegalNav(),
  ]);

  return (
    <footer className="border-t bg-surface-sunken">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <Link href="/" aria-label={settings.brandName} className="inline-block">
              <BrandLogo name={settings.brandName} />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {settings.description}
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{settings.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{settings.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <nav
            aria-label={settings.ui.footerNavLabel}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8"
          >
            {groups.map((group) => (
              <div key={group.heading}>
                <h2 className="mb-4 text-sm font-semibold">{group.heading}</h2>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">{formatCopyright(settings)}</p>
          <div className="flex items-center gap-6">
            <nav aria-label={settings.ui.legalNavLabel} className="flex gap-4">
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ul aria-label={settings.ui.socialNavLabel} className="flex gap-1">
              {settings.socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ContentIcon name={social.icon} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
