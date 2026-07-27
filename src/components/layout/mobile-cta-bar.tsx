import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/content/site";

/** Mobile-only sticky bottom bar with the two primary journeys. */
export async function MobileCtaBar() {
  const settings = await getSiteSettings();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur-md sm:hidden">
      <div className="flex gap-3">
        <Button asChild variant="outline" className="h-11 flex-1">
          <Link href={settings.ctaCandidates.href}>{settings.ctaCandidates.label}</Link>
        </Button>
        <Button asChild className="h-11 flex-1 bg-cta text-cta-foreground hover:bg-cta/90">
          <Link href={settings.ctaEmployers.href}>{settings.ctaEmployers.label}</Link>
        </Button>
      </div>
    </div>
  );
}
